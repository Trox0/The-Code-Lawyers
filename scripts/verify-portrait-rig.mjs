import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const base = process.env.TEST_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
const files = {
  'three.module.js': 'node_modules/three/build/three.module.js',
  'three.core.js': 'node_modules/three/build/three.core.js',
  'lamp-reference.js': 'lib/lamp-reference.js',
  'lamp-anatomy.js': 'lib/lamp-anatomy.js',
};
await page.route('**/__portrait-test/**', async route => {
  const name = new URL(route.request().url()).pathname.split('/').pop();
  if (!files[name]) return route.fulfill({ status: 404, body: 'Not found' });
  const source = (await readFile(files[name], 'utf8')).replaceAll("from 'three'", "from './three.module.js'");
  await route.fulfill({ contentType: 'text/javascript', body: source });
});
await page.route('**/__portrait-test', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Portrait rig verification</title>' }));
try {
  await page.goto(`${base}/__portrait-test`);
  const frames = await page.evaluate(async () => {
    const THREE = await import('/__portrait-test/three.module.js');
    const { createReferencePortrait } = await import('/__portrait-test/lamp-reference.js');
    const bytes = await (await fetch('/lamp/models/reference-portrait.bin')).arrayBuffer();
    const uniforms = { uPixel: { value: 1.5 }, uTime: { value: 0 }, uExposure: { value: 1 }, uPulse: { value: 0 } };
    const portrait = createReferencePortrait(bytes, uniforms, false);
    const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
    renderer.setSize(1000, 1000); renderer.setClearColor(0x000000);
    const scene = new THREE.Scene(); scene.add(portrait);
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    camera.position.set(0, .25, 8);
    const poses = [['front', 0, 0], ['eyes-left', 0, 0], ['eyes-right', 0, 0], ['upper-left', -.48, -.24], ['upper-right', .48, -.24], ['lower-left', -.48, .24], ['lower-right', .48, .24], ['profile', Math.PI/2, 0], ['back', Math.PI, 0]];
    const frames = [];
    for (const [name, yaw, pitch] of poses) {
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(pitch, yaw, 0));
      if (uniforms.uHeadQuaternion) uniforms.uHeadQuaternion.value.set(q.x, q.y, q.z, q.w);
      else portrait.quaternion.copy(q);
      if (uniforms.uGaze) uniforms.uGaze.value.set(name === 'eyes-left' ? -.32 : name === 'eyes-right' ? .32 : 0, 0);
      renderer.render(scene, camera);
      frames.push({ name, png: renderer.domElement.toDataURL('image/png').split(',')[1] });
    }
    portrait.traverse(node=>{node.geometry?.dispose();node.material?.dispose();}); renderer.dispose();
    return frames;
  });
  await mkdir('test-results', { recursive: true });
  let front, fixedShoulders;
  for (const { name, png } of frames) {
    const bytes = Buffer.from(png, 'base64');
    await sharp(bytes).toFile(`test-results/rig-${name}.png`);
    const raw = await sharp(bytes).removeAlpha().raw().toBuffer();
    const shoulders = await sharp(bytes).extract({ left: 250, top: 800, width: 500, height: 30 }).removeAlpha().raw().toBuffer();
    if (name === 'front') {
      front = raw; fixedShoulders = shoulders;
      assert.ok(shoulders.filter(value => value > 8).length > 500, 'Shoulder crop must contain rendered particles');
    } else {
      if (name.startsWith('eyes-')) {
        assert.ok(!raw.equals(front), `${name}: eyes must track independently`);
        assert.ok(shoulders.equals(fixedShoulders), `${name}: gaze must not change shoulders`);
        continue;
      }
      assert.ok(!shoulders.equals(fixedShoulders), `${name}: shoulders should move with the portrait`);
      if(name==='back'){
        let frontLight=0,backLight=0;
        for(let y=360;y<530;y++)for(let x=420;x<580;x++){
          const at=(y*1000+x)*3;
          frontLight+=front[at];backLight+=raw[at];
        }
        assert.ok(backLight<frontLight*.45,'Rear cranium must hide the bright reference face');
      }
      let changed = 0;
      for (let i = 0; i < raw.length; i++) if (Math.abs(raw[i] - front[i]) > 8) changed++;
      assert.ok(changed > 5000, `${name}: head shader did not turn`);
    }
  }
  console.log('PASS GPU portrait: tracking eyes, moving shoulders, side volume and rear face occlusion');
} finally { await browser.close(); }

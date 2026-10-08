import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createReferencePortrait } from '../lib/lamp-reference.js';

const file = await readFile('public/lamp/models/reference-portrait.bin');
const bytes = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
const portrait = createReferencePortrait(bytes, {}, false);
const positions = portrait.geometry.attributes.position.array;
assert.ok(portrait.geometry.attributes.aNormal, 'Volume needs surface normals for depth lighting');
assert.ok(portrait.geometry.attributes.aShell, 'Portrait needs a rounded rear head volume');
const core=portrait.getObjectByName('Closed cranium interior');
assert.ok(core?.isMesh && core.material.depthWrite, 'Closed head must occlude facial detail from behind');
const rearDepths=Array.from(positions).filter((_,index)=>index>=175000*3 && index%3===2);
assert.ok(Math.min(...rearDepths)<-1.1,'Back of head needs substantial depth');
const source = new Float32Array(bytes, 8);
// A nose should project modestly beyond the cheek, rather than forming a spike.
let nose = [], cheek = [];
const samples = [];
let seed = 8271;
for (let i = 0; i < Math.min(175000, source.length / 4); i++) {
  seed = seed * 16807 % 2147483647;
  const random = (seed - 1) / 2147483646;
  const at = Math.floor((i + random * .8) / Math.min(175000, source.length / 4) * (source.length / 4)) * 4;
  seed = seed * 16807 % 2147483647;
  const x = source[at] * 190 + 900, y = 550 - source[at + 1] * 190;
  samples.push({ x, y, index: i, z: positions[i * 3 + 2], tone: source[at + 3] });
  if (Math.abs(x - 888) < 10 && Math.abs(y - 611) < 10) nose.push(positions[i * 3 + 2]);
  if (Math.abs(x - 780) < 10 && Math.abs(y - 610) < 10) cheek.push(positions[i * 3 + 2]);
}
const mean = values => values.reduce((a, b) => a + b, 0) / values.length;
// Catch the pointed chin/shelf: depth must flow into the neck at the centre
// and off-centre, rather than dropping abruptly and bulging forward again.
for (const x of [890, 960]) {
  let previous;
  for (let y = 780; y <= 960; y += 10) {
    const band = samples.filter(point => Math.abs(point.x - x) < 5 && Math.abs(point.y - y) < 4);
    assert.ok(band.length, `Missing jaw/neck samples at ${x}, ${y}`);
    const depth = mean(band.map(point => point.z));
    if (previous !== undefined) {
      assert.ok(Math.abs(depth - previous) < .09,
        `Jaw/neck depth step at ${x}, ${y}: ${depth - previous}`);
      assert.ok(depth - previous < .025, `Neck bulges forward beneath the chin at ${x}, ${y}`);
    }
    previous = depth;
  }
}
const tones = portrait.geometry.attributes.aTone;
for (const point of samples) assert.equal(tones.getX(point.index), point.tone, 'Keep the original reference appearance, including the eyes');
assert.ok(nose.length && cheek.length);
assert.ok(mean(nose) - mean(cheek) < .35, `Nose protrusion too large: ${mean(nose) - mean(cheek)}`);
assert.ok(Array.from(positions).every(Number.isFinite));
portrait.traverse(node=>{node.geometry?.dispose();node.material?.dispose();});
console.log('PASS portrait: continuous jaw/neck depth, restrained nose and original reference appearance');

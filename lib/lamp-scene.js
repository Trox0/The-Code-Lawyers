import * as THREE from 'three';
import { fetchLampAsset, lampImage } from './lamp-assets.js';
import { createReferencePortrait } from './lamp-reference.js';

/**
 * Mount Lamp's sampled three-dimensional portrait. The promise resolves after
 * the complete model and all nine logos have been submitted to the GPU.
 * Every resource and subscription belongs to this mount, including in Strict Mode.
 */
export async function initLampScene(container, options = {}) {
 const { signal, onProgress = () => {}, onError = () => {} } = options;
 const controller = new AbortController();
 const assetSignal = controller.signal;
 const resources = new Set();
 const listeners = [];
 const frameWaiters = new Map();
 let disposed = false, renderer, resizeObserver, intersectionObserver;
 let raf = 0, last = 0, time = 0, px = 0, py = 0, pulseAmount = 0;
 let paused = Boolean(options.paused), visible = true, mobile = false, desktop = false;
 let baseCameraZ = 10, scrollProgress = 0;
 const scene = new THREE.Scene();
 const own = resource => { resources.add(resource); return resource; };
 const listen = (target, type, callback, settings) => {
  target.addEventListener(type, callback, settings);
  listeners.push(() => target.removeEventListener(type, callback, settings));
 };
 function collect(object) {
  object?.traverse(node => {
   if (node.geometry) own(node.geometry);
   for (const material of [node.material].flat().filter(Boolean)) {
    own(material);
    for (const value of Object.values(material)) if (value?.isTexture) own(value);
   }
  });
 }
 function stop() { cancelAnimationFrame(raf); raf = 0; last = 0; }
 function dispose() {
  if (disposed) return;
  disposed = true;
  controller.abort(); stop();
  for (const [id, reject] of frameWaiters) {
   cancelAnimationFrame(id); reject(new DOMException('Lamp mount cancelled', 'AbortError'));
  }
  frameWaiters.clear();
  resizeObserver?.disconnect(); intersectionObserver?.disconnect();
  listeners.splice(0).forEach(remove => remove());
  collect(scene);
  for (const resource of resources) resource.dispose?.();
  resources.clear(); scene.clear();
  if (renderer) { renderer.domElement.remove(); renderer.dispose(); renderer.forceContextLoss(); }
  if (container.dataset.lampMount === mountId) {
   container.classList.remove('webgl-ready');
   delete container.dataset.lampMount;
   delete container.dataset.lampReady;
  }
 }
 const mountId = String(performance.now()) + Math.random();
 const checkAlive = () => { if (disposed || signal?.aborted) throw new DOMException('Lamp mount cancelled', 'AbortError'); };
 function nextFrame() {
  checkAlive();
  return new Promise((resolve, reject) => {
   const id = requestAnimationFrame(() => { frameWaiters.delete(id); resolve(); });
   frameWaiters.set(id, reject);
  });
 }
 if (signal?.aborted) { dispose(); throw new DOMException('Lamp mount cancelled', 'AbortError'); }
 if (signal) listen(signal, 'abort', dispose, { once: true });
 try {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  renderer.setPixelRatio(dpr); renderer.setClearColor(0x050608, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
  camera.position.set(0, .25, 10);
  const portrait = new THREE.Group(); scene.add(portrait);
  const uniforms = { uExposure: {value: 1}, uTime: {value: 0}, uPulse: {value: 0}, uPixel: {value: dpr}, uMap: {value: null} };
  const bytes=await fetchLampAsset('/lamp/models/reference-portrait.bin',assetSignal,value=>onProgress(value*.60));
  checkAlive(); await nextFrame(); checkAlive();
  const head=createReferencePortrait(bytes,uniforms,matchMedia('(max-width:600px)').matches);
  collect(head); portrait.add(head);
  let seed=73821;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483647};
  container.dataset.hairstyle='reference-swept-back';
  container.dataset.character='adult-woman';
  container.dataset.reconstruction='reference-depth-particles';
  onProgress(.72); await nextFrame(); checkAlive();
 onProgress(.78);
 let iconsLoaded = 0;
 const satellites = new THREE.Group(); scene.add(satellites);
 const tools = ['n8n', 'openai', 'claude', 'gemini', 'zapier', 'make', 'langchain', 'openclaw', 'hermes'];
 // Decode every mask before constructing GPU resources, so cancellation cannot
 // leave a late-finishing image task mutating an already disposed scene.
 const masks = await Promise.all(tools.map(name => lampImage('/lamp/tools/' + name + '.svg', 'image/svg+xml', assetSignal)));
 checkAlive();
 const objects = masks.map((image, i) => {
  const mask = document.createElement('canvas'); mask.width = mask.height = 128;
  const ctx = mask.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Lamp icon canvas unavailable');
  ctx.drawImage(image, 4, 4, 120, 120);
  const pixels = ctx.getImageData(0, 0, 128, 128).data, positions = [], colors = [];
  for (let y = 0; y < 128; y += 1.25) for (let x = 0; x < 128; x += 1.25) {
   const at = (Math.floor(y) * 128 + Math.floor(x)) * 4;
   const brightness = Math.max(pixels[at], pixels[at + 1], pixels[at + 2]) / 255;
   if (pixels[at + 3] < 80 || brightness < .15 || random() > .7) continue;
   positions.push((x / 128 - .5) * .82, (.5 - y / 128) * .82, (random() - .5) * .065);
   const light = (pixels[at] + pixels[at + 1] + pixels[at + 2]) / 765;
   const shade = .25 + Math.pow(light, 2) * .75;
   colors.push(shade * .7, shade * .68, shade);
  }
  if (!positions.length) throw new Error('Empty Lamp icon mask: ' + tools[i]);
  const geometry = own(new THREE.BufferGeometry())
   .setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
   .setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const icon = new THREE.Points(geometry, own(new THREE.PointsMaterial({ vertexColors: true, size: .014, transparent: true, opacity: .8, depthWrite: false, depthTest: false })));
  icon.name = tools[i]; icon.renderOrder = 3;
  const left = i < 4;
  icon.userData = { side: left ? -1 : 1, row: left ? i : i - 4, phase: i * 1.7 };
  satellites.add(icon); onProgress(.78 + (++iconsLoaded / 9) * .17);
  return icon;
 });
 container.dataset.particleTools = tools.join(',');
 const dustPositions = new Float32Array(650 * 3);
 for (let i = 0; i < 650; i++) {
  dustPositions[i * 3] = (random() - .5) * 18;
  dustPositions[i * 3 + 1] = (random() - .5) * 10;
  dustPositions[i * 3 + 2] = -2 - random() * 4;
 }
 scene.add(new THREE.Points(own(new THREE.BufferGeometry()).setAttribute('position', new THREE.BufferAttribute(dustPositions, 3)), own(new THREE.PointsMaterial({ color: 0x9890c0, size: .012, opacity: .28, transparent: true, depthWrite: false }))));
 checkAlive();
 container.dataset.lampMount = mountId;
 container.appendChild(renderer.domElement); onProgress(.95);
 function render(immediateGaze = false, elapsed = 1 / 60) {
  if (disposed) return;
  const zoom = paused ? 0 : scrollProgress;
  camera.position.z = baseCameraZ / (1 + zoom * .85);
  camera.position.y = .25 + zoom * .85;
  uniforms.uExposure.value = 1 + zoom * 1.35;
  container.dataset.cameraZoom = (baseCameraZ / camera.position.z).toFixed(3);
  container.dataset.exposure = uniforms.uExposure.value.toFixed(3);
  uniforms.uTime.value = time; uniforms.uPulse.value = pulseAmount;
  const turnEase = 1 - Math.pow(1 - .045, elapsed * 60);
  portrait.rotation.y += (px * .48 * (1 - zoom * .6) - portrait.rotation.y) * turnEase;
  portrait.rotation.x += (py * .24 * (1 - zoom * .6) - portrait.rotation.x) * turnEase;
  // Follow the pointer within the eye sockets; preserve all portrait geometry.
  const gazeEase = immediateGaze ? 1 : 1 - Math.pow(1 - .12, elapsed * 60);
  uniforms.uGaze.value.x += (px * .32 - uniforms.uGaze.value.x) * gazeEase;
  uniforms.uGaze.value.y += (py * .22 - uniforms.uGaze.value.y) * gazeEase;
  portrait.position.y = (desktop ? -.35 : -.15) + Math.sin(time * .65) * .035;
  objects.forEach(icon => {
   const { side, row, phase } = icon.userData;
   let x, y;
   if (desktop) {
    const arcs = side < 0
     ? [[-.46, .66], [-.66, .30], [-.72, -.10], [-.68, -.38]]
     : [[.46, .70], [.65, .38], [.74, .02], [.69, -.37], [.65, -.58]];
    const [nx, ny] = arcs[row];
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(21)) * (baseCameraZ + .2);
    x = nx * halfHeight * camera.aspect; y = .25 + ny * halfHeight;
   } else {
    const phoneArc = side < 0 ? [2.12, 2.30, 2.38, 2.18] : [2.10, 2.26, 2.38, 2.28, 2.15];
    x = side * (mobile ? phoneArc[row] : 3.65) + (mobile ? 0 : .18 * Math.sin(phase));
    y = (mobile ? 2.7 : 2.8) - row * (side < 0 ? (mobile ? 1.4 : 1.44) : (mobile ? 1.06 : 1.08));
   }
   icon.position.set(x, y + Math.sin(time * .4 + phase) * .065, -.2);
   icon.scale.setScalar(mobile ? .62 : desktop ? 1.1 : 1);
   icon.material.opacity = .8 * (mobile ? 1 - THREE.MathUtils.smoothstep(zoom, .08, .48) : 1 - zoom * .85);
   icon.rotation.set(Math.sin(time * .3 + phase) * .13, Math.sin(time * .25 + phase) * .25 + px * .1, Math.sin(time * .2 + phase) * .1);
  });
  container.dataset.lookYaw = portrait.rotation.y.toFixed(3);
  container.dataset.lookPitch = portrait.rotation.x.toFixed(3);
  renderer.render(scene, camera);
 }
 function frame(now) {
  raf = 0;
  if (disposed || paused || !visible || document.hidden) { last = 0; return; }
  const elapsed = last ? Math.min((now - last) / 1000, .5) : 1 / 60;
  if (last) time += Math.min(elapsed, .04);
  last = now; pulseAmount *= .94; render(false, elapsed); raf = requestAnimationFrame(frame);
 }
 function start() { if (!disposed && !paused && visible && !document.hidden && !raf) raf = requestAnimationFrame(frame); }
 function resize() {
  if (disposed) return;
  const width = container.clientWidth, height = container.clientHeight;
  if (!width || !height) return;
  mobile = width < 650; desktop = matchMedia('(min-width:1024px)').matches;
  renderer.setSize(width, height, false); camera.aspect = width / height;
  baseCameraZ = Math.max(desktop ? 9.8 : mobile ? 8.8 : 9.6, (mobile ? 5.8 : 9.3) / (2 * Math.tan(THREE.MathUtils.degToRad(21)) * camera.aspect));
  camera.updateProjectionMatrix(); portrait.scale.setScalar(mobile ? 1.32 : 1.28);
  portrait.position.x = mobile || desktop ? 0 : .15;
  container.dataset.layout = desktop ? 'desktop-arcs' : mobile ? 'mobile-arcs' : 'tablet';
  render();
 }
 function aim(event) {
  const bounds = container.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  px = THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1);
  py = THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1);
 }
 listen(window, 'pointermove', event => { if (!paused && visible) aim(event); }, { passive: true });
 // Listen in capture phase so a decorative canvas container can have pointer-events:none.
 listen(window, 'pointerdown', event => {
  if (!visible || !['touch', 'pen'].includes(event.pointerType) || event.target.closest?.('a,button,input,textarea,select')) return;
  const bounds = container.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
  aim(event);
  if (paused) { portrait.rotation.y = px * .48; portrait.rotation.x = py * .24; render(true); }
  else start();
 }, { passive: true, capture: true });
 listen(document.documentElement, 'pointerleave', event => { if (event.pointerType === 'mouse') px = py = 0; });
 listen(document, 'visibilitychange', () => document.hidden ? stop() : start());
 listen(renderer.domElement, 'webglcontextlost', event => {
  event.preventDefault();
  if (disposed) return;
  dispose(); onError(new Error('Lamp graphics context lost'));
 });
 intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? start() : stop(); }, { rootMargin: '60px' });
 intersectionObserver.observe(container);
 resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);
 resize();
 await nextFrame(); checkAlive(); render();
 await nextFrame(); checkAlive();
 if (renderer.getContext().isContextLost()) throw new Error('Lamp graphics context lost');
 container.classList.add('webgl-ready'); container.dataset.lampReady = 'true'; onProgress(1); start();
 return {
  dispose,
  setPaused(value) { if (disposed) return; paused = Boolean(value); if (paused) { stop(); render(); } else start(); },
  pulse() {
   if (disposed) return;
   if (paused) { portrait.rotation.y = portrait.rotation.y > .1 ? -.25 : .3; px = portrait.rotation.y / .48; render(); }
   else { pulseAmount = 1; start(); }
  },
  setScrollProgress(value) {
   if (disposed) return;
   scrollProgress = THREE.MathUtils.clamp(Number(value) || 0, 0, 1);
   container.dataset.scrollZoom = String(scrollProgress);
   if (paused || !visible) render();
  },
 };
 } catch (error) { dispose(); throw error; }
}

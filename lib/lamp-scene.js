import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import { fetchLampAsset, lampImage } from './lamp-assets.js';
import { createLampBob } from './lamp-bob.js';

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
  const loaded = await Promise.allSettled([
   fetchLampAsset('/lamp/models/head.glb', assetSignal, value => onProgress(value * .35))
    .then(bytes => new GLTFLoader().parseAsync(bytes, '/lamp/models/')),
   lampImage('/lamp/models/head-color.jpg', 'image/jpeg', assetSignal)
  ]);
  const model = loaded[0].status === 'fulfilled' ? loaded[0].value : null;
  if (model) collect(model.scene);
  if (loaded.some(result => result.status === 'rejected')) {
   for (const resource of resources) resource.dispose?.();
   resources.clear();
   throw loaded.find(result => result.status === 'rejected').reason;
  }
  // A GLTF parse can finish after abort; explicitly release its newly arrived resources.
  if (disposed) { for (const resource of resources) resource.dispose?.(); resources.clear(); }
  checkAlive();
  const texture = own(new THREE.Texture(loaded[1].value)); texture.needsUpdate = true;
  texture.flipY = false; uniforms.uMap.value = texture;
  let source; model.scene.traverse(node => { if (node.isMesh && !source) source = node; });
  if (!source) throw new Error('Lamp model contains no mesh');
  onProgress(.45); await nextFrame(); checkAlive();
 const geo=own(source.geometry.clone());geo.computeBoundingBox();const center=geo.boundingBox.getCenter(new THREE.Vector3()),size=geo.boundingBox.getSize(new THREE.Vector3());geo.translate(-center.x,-center.y,-center.z);geo.scale(5.6/size.y,5.6/size.y,5.6/size.y);// Sculpt a softer round face, rounded jaw and refined facial proportions.
 const vertices=geo.getAttribute('position');
 for(let i=0;i<vertices.count;i++){
  const x=vertices.getX(i),y=vertices.getY(i),z=vertices.getZ(i),ax=Math.abs(x);
  const front=THREE.MathUtils.smoothstep(z,.1,1.1);
  const jaw=Math.exp(-Math.pow((y+.05)/.75,2));
  const brow=Math.exp(-Math.pow((y-1.45)/.22,2));
  const nose=Math.exp(-Math.pow(x/.30,2)-Math.pow((y-.9)/.52,2));
  const lips=Math.exp(-Math.pow(x/.4,2)-Math.pow((y-.22)/.17,2));
  const cheek=Math.exp(-Math.pow((ax-.60)/.3,2)-Math.pow((y-.83)/.38,2));
  const faceWidth=.80-.065*jaw;
  const neckWidth=.72;
  const width=THREE.MathUtils.lerp(neckWidth,faceWidth,THREE.MathUtils.smoothstep(y,-.8,-.25));
  vertices.setX(i,x*width);
  const faceZ=z+front*(-.10*brow-.17*nose+.085*lips+.015*cheek);
  // Preserve the continuous bare-neck surface; no collar geometry is added.
  vertices.setZ(i,faceZ);
 }
 vertices.needsUpdate=true;geo.computeVertexNormals();
 const sampler=new MeshSurfaceSampler(new THREE.Mesh(geo, own(new THREE.MeshBasicMaterial()))).build();
 // Fixed seed keeps the portrait stable across resize, screenshots and preference changes.
 let seed=73821;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};sampler.setRandomGenerator(random);
 const count=matchMedia('(max-width:600px)').matches?85000:145000;
 const positions=new Float32Array(count*3),normals=new Float32Array(count*3),uvs=new Float32Array(count*2),randoms=new Float32Array(count);
 const pos=new THREE.Vector3(),normal=new THREE.Vector3(),uv=new THREE.Vector2();
 for(let i=0;i<count;i++){sampler.sample(pos,normal,undefined,uv);pos.toArray(positions,i*3);normal.toArray(normals,i*3);uv.toArray(uvs,i*2);randoms[i]=random();}
 const pointsGeo=own(new THREE.BufferGeometry());pointsGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));pointsGeo.setAttribute('normal',new THREE.BufferAttribute(normals,3));pointsGeo.setAttribute('uv',new THREE.BufferAttribute(uvs,2));pointsGeo.setAttribute('aRandom',new THREE.BufferAttribute(randoms,1));
 const material=own(new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:true,vertexShader:`
  attribute float aRandom; uniform float uTime,uPulse,uPixel; varying float vLight,vRandom,vFacing,vHeight; varying vec2 vUv;
  void main(){vUv=uv;vRandom=aRandom;vHeight=position.y;vec3 p=position;float wave=sin(position.y*3.0+uTime*1.7+aRandom*5.0);p+=normal*(uPulse*(.18+aRandom*.7)+wave*.007);vec4 mv=modelViewMatrix*vec4(p,1.0);vec3 n=normalize(normalMatrix*normal);vFacing=n.z;float key=max(dot(n,normalize(vec3(-1.3,.8,1.6))),0.0);float rim=pow(1.0-abs(n.z),2.0);vLight=.19+key*.8+rim*.3;if(position.y>1.4+max(position.z,0.0)*.6)vLight*=.15;gl_Position=projectionMatrix*mv;gl_PointSize=clamp((1.0+aRandom*.9)*uPixel*(8.5/-mv.z),.65,4.0);}
 `,fragmentShader:`
  uniform sampler2D uMap;uniform float uTime,uExposure; varying float vLight,vRandom,vFacing,vHeight;varying vec2 vUv;
  void main(){if(vFacing<.05)discard;float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 tex=texture2D(uMap,vUv).rgb;float tone=mix(.67,dot(tex,vec3(.299,.587,.114)),.18);vec3 tint=mix(vec3(.34,.39,.65),vec3(.79,.73,1.0),vLight);float twinkle=.87+.13*sin(uTime*1.4+vRandom*60.0);float light=vLight*(.35+tone*.95)*twinkle;gl_FragColor=vec4(tint*light*1.5*uExposure,smoothstep(.5,.2,d)*(.65+vRandom*.35)*smoothstep(-2.8,-1.15,vHeight));}
 `}));
 const depthMaterial=own(new THREE.ShaderMaterial({uniforms,vertexShader:material.vertexShader,fragmentShader: `uniform sampler2D uMap;uniform float uExposure;varying float vLight,vHeight;varying vec2 vUv;void main(){float tone=.67;gl_FragColor=vec4(vec3(.24,.24,.42)*vLight*uExposure*(.15+tone*.32),smoothstep(-2.8,-1.15,vHeight));}`,transparent:true,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:2}));
 const base=new THREE.Mesh(geo,depthMaterial);portrait.add(base);
 const head=new THREE.Points(pointsGeo,material);head.renderOrder=1;portrait.add(head);
 onProgress(.62);
 await nextFrame();
 checkAlive();
 // A short straight bob frames the adult feminine portrait.
 const hair = createLampBob(uniforms.uExposure);
 portrait.add(hair); collect(hair);
 container.dataset.hairstyle = 'short-straight-bob';
 container.dataset.character = 'adult-woman';
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
 function render() {
  if (disposed) return;
  const zoom = paused ? 0 : scrollProgress;
  camera.position.z = baseCameraZ / (1 + zoom * .85);
  camera.position.y = .25 + zoom * .85;
  uniforms.uExposure.value = 1 + zoom * 1.35;
  container.dataset.cameraZoom = (baseCameraZ / camera.position.z).toFixed(3);
  container.dataset.exposure = uniforms.uExposure.value.toFixed(3);
  uniforms.uTime.value = time; uniforms.uPulse.value = pulseAmount;
  portrait.rotation.y += (px * .48 * (1 - zoom * .6) - portrait.rotation.y) * .045;
  portrait.rotation.x += (py * .24 * (1 - zoom * .6) - portrait.rotation.x) * .045;
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
  if (last) time += Math.min((now - last) / 1000, .04);
  last = now; pulseAmount *= .94; render(); raf = requestAnimationFrame(frame);
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
  portrait.scale.y *= .83; portrait.position.x = mobile || desktop ? 0 : .15;
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
  if (paused) { portrait.rotation.y = px * .48; portrait.rotation.x = py * .24; render(); }
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

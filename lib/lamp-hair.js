import * as THREE from 'three';

/** Sculpted, individually separated locs. Anchors are projected onto the scalp;
 * the curves give each lock weight and a rounded tip instead of a fuzzy spike. */
export function createLampLocs(scalpGeometry, exposure) {
  const hair = new THREE.Group();
  hair.name = 'lamp-sculpted-locs';
  let seed = 71934;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
  const scalpMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const scalp = new THREE.Mesh(scalpGeometry, scalpMaterial);
  scalp.updateMatrixWorld(true);
  const ray = new THREE.Raycaster();
  const down = new THREE.Vector3(0, -1, 0);
  const anchor = (x, z) => {
    ray.set(new THREE.Vector3(x, 4.5, z), down);
    const hit = ray.intersectObject(scalp)[0];
    // A ray outside the skull can hit an ear/shoulder lower down the bust.
    return hit && hit.point.y > 1.65 ? hit.point.clone().addScaledVector(hit.face.normal, .035) : null;
  };
  const positions = [], normals = [], shades = [];
  const bodyMaterial = new THREE.ShaderMaterial({
    uniforms: { uExposure: exposure },
    vertexShader: `varying vec3 vNormal; varying vec2 vUv;
      void main(){vNormal=normalize(normalMatrix*normal);vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float uExposure;varying vec3 vNormal;varying vec2 vUv;
      void main(){float key=max(dot(normalize(vNormal),normalize(vec3(-.9,.8,1.6))),0.);
        float ridge=.95+.05*sin(vUv.x*90.+vUv.y*19.);
        gl_FragColor=vec4(vec3(.036,.034,.061)*(.28+key*.65)*ridge*min(uExposure,1.7),1.);}`,
  });
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: { uExposure: exposure, uPixel: { value: Math.min(devicePixelRatio || 1, 1.6) } },
    transparent: true,
    depthWrite: false,
    vertexShader: `attribute float aShade;uniform float uPixel;varying float vShade;
      void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vec3 n=normalize(normalMatrix*normal);
        float key=max(dot(n,normalize(vec3(-.9,.8,1.6))),0.);
        vShade=aShade*(.35+.90*key);gl_Position=projectionMatrix*mv;
        gl_PointSize=clamp(uPixel*8.4/-mv.z,.7,2.2);}`,
    fragmentShader: `uniform float uExposure;varying float vShade;
      void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
        gl_FragColor=vec4(vec3(.74,.69,.95)*vShade*min(uExposure,1.9),smoothstep(.5,.16,d)*.92);}`,
  });

  function loc(points, radius, index) {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const steps = 100;
    const frames = curve.computeFrenetFrames(steps, false);
    const tube = new THREE.TubeGeometry(curve, steps, radius, 10, false);
    const vertex = tube.attributes.position;
    const centre = new THREE.Vector3(), point = new THREE.Vector3();
    // Round off each rope, with a subtle irregular thickness along its length.
    const widthAt = t => (.76 + .24 * Math.sin(Math.PI * Math.min(t / .14, 1) / 2))
      * Math.sqrt(Math.max(.006, 1 - Math.pow(Math.max(0, (t - .88) / .12), 2)))
      * (1 + .07 * Math.sin(t * 27 + index * 1.4));
    for (let ring = 0; ring <= steps; ring++) {
      const t = ring / steps;
      curve.getPointAt(t, centre);
      for (let spoke = 0; spoke <= 10; spoke++) {
        const i = ring * 11 + spoke;
        point.fromBufferAttribute(vertex, i).sub(centre).multiplyScalar(widthAt(t)).add(centre);
        vertex.setXYZ(i, point.x, point.y, point.z);
      }
    }
    vertex.needsUpdate = true; tube.computeVertexNormals();
    const body = new THREE.Mesh(tube, bodyMaterial);
    body.renderOrder = 2; hair.add(body);
    const sample = new THREE.Vector3(), surfaceNormal = new THREE.Vector3();
    for (let ring = 0; ring <= steps; ring++) {
      const t = ring / steps;
      curve.getPointAt(t, centre);
      for (let spoke = 0; spoke < 28; spoke++) {
        const phase = 2 * Math.PI * (spoke + random() * .8) / 28;
        const twist = phase + t * Math.PI * (15 + index % 4);
        // Three fine spiral ridges suggest the intertwined fibres of a loc.
        const ridge = .5 + .5 * Math.sin(twist * 3);
        const r = radius * widthAt(t) * (1.015 + ridge * .065 + random() * .065);
        surfaceNormal.copy(frames.normals[ring]).multiplyScalar(Math.cos(phase))
          .addScaledVector(frames.binormals[ring], Math.sin(phase));
        sample.copy(centre).addScaledVector(surfaceNormal, r);
        positions.push(sample.x, sample.y, sample.z);
        normals.push(surfaceNormal.x, surfaceNormal.y, surfaceNormal.z);
        shades.push((.45 + random() * .44) * (.64 + ridge * .36));
      }
    }
  }

  let count = 0;
  // Forehead fringe: unequal lengths, small gaps, and a loose side sweep.
  const fringe = [
    [-.94,.57,-1.08,1.30,1.30], [-.72,.79,-.82,1.40,1.46],
    [-.45,.96,-.58,1.55,1.66], [-.18,1.03,-.30,1.63,1.70],
    [.13,1.02,.05,1.79,1.70], [.43,.94,.39,1.60,1.68],
    [.72,.76,.72,1.59,1.43], [.95,.47,1.02,1.20,1.20],
  ];
  for (const [x,z,endX,endY,endZ] of fringe) {
    const root = anchor(x,z); if (!root) continue;
    loc([root, root.clone().add(new THREE.Vector3(-.07,.28,.10)),
      new THREE.Vector3(endX-.06,root.y+.08,endZ-.12),
      new THREE.Vector3(endX,endY,endZ)], .047 + random() * .015, count++);
  }
  // Crown locks rise gently, then bend forward. Avoid a uniform helmet silhouette.
  for (let row = 0; row < 3; row++) for (let column = 0; column < 6; column++) {
    const x = (column - 2.5) * .34 + (row % 2 ? .08 : -.02);
    const z = .44 - row * .38;
    const root = anchor(x,z); if (!root) continue;
    const sweep = -.18 + random() * .16;
    const length = .40 + random() * .24;
    const lift = .20 + random() * .20;
    loc([root, root.clone().add(new THREE.Vector3(sweep*.3,lift,.14)),
      root.clone().add(new THREE.Vector3(sweep,lift*.75,length*.7)),
      root.clone().add(new THREE.Vector3(sweep-.05,lift*.16,length))],
      .048 + random() * .017, count++);
  }
  // Compact side locks frame the temples without a long braid hanging on the left.
  for (const side of [-1,1]) for (let row = 0; row < 5; row++) {
    if (side < 0 && row === 1) continue;
    const root = anchor(side * (1.05 - row * .04), .38 - row * .30);
    if (!root) continue;
    const length = (side < 0 ? .42 : .58) + random() * .22;
    loc([root, root.clone().add(new THREE.Vector3(side*.18,.19,.05)),
      root.clone().add(new THREE.Vector3(side*.30,-length*.44,.13)),
      root.clone().add(new THREE.Vector3(side*.25,-length,.20))],
      .045 + random() * .017, count++);
  }
  scalpMaterial.dispose();
  const fibres = new THREE.BufferGeometry()
    .setAttribute('position', new THREE.Float32BufferAttribute(positions,3))
    .setAttribute('normal', new THREE.Float32BufferAttribute(normals,3))
    .setAttribute('aShade', new THREE.Float32BufferAttribute(shades,1));
  const surface = new THREE.Points(fibres, particleMaterial);
  surface.renderOrder = 3; hair.add(surface);
  hair.userData.locs = count;
  return hair;
}

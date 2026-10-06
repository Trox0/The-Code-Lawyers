import * as THREE from 'three';

// A parted crown flowing into straight, jaw-length sides. Each sampled line
// follows the haircut rather than forming coils or thick individual ropes.
export function createLampBob(exposure, scalpGeometry) {
  const group = new THREE.Group();
  const positions = [], shades = [];
  let seed = 9284;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed-1)/2147483646; };
  // Sample the already sculpted head: roots follow its surface, not a separate cap.
  const scalpMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const scalp = new THREE.Mesh(scalpGeometry, scalpMaterial);
  const ray = new THREE.Raycaster();
  const surface = (x,z) => {
    ray.set(new THREE.Vector3(x,4,z),new THREE.Vector3(0,-1,0));
    const hit=ray.intersectObject(scalp,false)[0];
    return hit ? hit.point.clone().addScaledVector(hit.face.normal,.045).add(new THREE.Vector3(0,.018,0)) : null;
  };
  const curves = [[],[]];
  for(let half=0;half<2;half++)for(let i=0;i<=75;i++){
    const side=half===0?-1:1, u=i/75;
    const z=-1.12+u*2.46;
    const root=surface(-.075,z);
    const fallback=new THREE.Vector3(-.075,2.48,z);
    const crown=root||fallback;
    const controls=[crown];
    for(const x of [.30,.58,.80]){
      const hit=surface(side*x,z);
      if(hit && hit.y>1.48) controls.push(hit);
    }
    const last=controls[controls.length-1];
    // The fall stays close to the temples before loosening at the jaw.
    const edge=Math.max(.88,Math.abs(last.x)+.055);
    controls.push(new THREE.Vector3(side*edge,Math.min(last.y-.18,1.65),z-.015));
    controls.push(new THREE.Vector3(side*(edge+.035),.81,z+.015));
    controls.push(new THREE.Vector3(side*(edge+.065),.23+.022*Math.sin(u*29),z+.035));
    curves[half].push(new THREE.CatmullRomCurve3(controls,false,'centripetal'));
  }
  scalpMaterial.dispose();
  const point = (angle,t) => {
    const half=angle<Math.PI?0:1;
    const u=half===0?angle/Math.PI:(angle-Math.PI)/Math.PI;
    const sample=Math.min(u*75,75), index=Math.min(Math.floor(sample),74);
    return curves[half][index].getPoint(t).lerp(curves[half][index+1].getPoint(t),sample-index);
  };
  // Directional fibres carry the silhouette; no solid helmet-shaped shell.
  const linePositions=[],lineShades=[];
  for(let strand=0;strand<280;strand++){
    const angle=(strand+random()*.55)/280*Math.PI*2;
    const shade=.26+Math.pow(random(),2)*.66;
    const length=.86+random()*.14;
    let previous=null;
    for(let j=0;j<=64;j++){
      const t=j/64*length;
      const p=point(angle,t);
      const side=angle<Math.PI?-1:1;
      p.x+=side*.016*Math.sin(t*5+angle*17)*Math.sin(Math.PI*t);
      p.y+=.01;p.z+=Math.sign(p.z)*.012;
      if(previous){linePositions.push(previous.x,previous.y,previous.z,p.x,p.y,p.z);lineShades.push(shade,shade);}
      previous=p;
    }
  }
  const linesGeometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(linePositions,3)).setAttribute('aShade',new THREE.Float32BufferAttribute(lineShades,1));
  const linesMaterial=new THREE.ShaderMaterial({uniforms:{uExposure:exposure},transparent:true,depthWrite:false,depthTest:true,
    vertexShader:`attribute float aShade;varying float vShade;void main(){vShade=aShade;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform float uExposure;varying float vShade;void main(){gl_FragColor=vec4(vec3(.72,.67,.94)*vShade*min(uExposure,1.8),.44);}`});
  const strands=new THREE.LineSegments(linesGeometry,linesMaterial);strands.renderOrder=3;group.add(strands);
  for(let strand=0;strand<460;strand++){
    const angle=(strand+random()*.7)/460*Math.PI*2;
    const brightness=.12+Math.pow(random(),2)*.52;
    for(let j=2;j<70;j++){
      const t=(j+random())/74;
      const p=point(angle,t);
      p.x*=1.018;p.z+=Math.sign(p.z)*.012;p.y+=.018;
      positions.push(p.x,p.y,p.z);
      shades.push(brightness*(.82+.18*Math.sin(angle-1)));
    }
  }
  const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3)).setAttribute('aShade',new THREE.Float32BufferAttribute(shades,1));
  const fibres=new THREE.ShaderMaterial({uniforms:{uExposure:exposure,uPixel:{value:Math.min(devicePixelRatio||1,1.6)}},transparent:true,depthWrite:false,depthTest:true,
    vertexShader:`attribute float aShade;uniform float uPixel;varying float vShade;void main(){vShade=aShade;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(uPixel*7.5/-p.z,.6,2.);}`,
    fragmentShader:`uniform float uExposure;varying float vShade;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vec3(.72,.67,.94)*vShade*min(uExposure,1.8),smoothstep(.5,.15,d));}`});
  const hair=new THREE.Points(geometry,fibres);hair.renderOrder=3;group.add(hair);
  return group;
}

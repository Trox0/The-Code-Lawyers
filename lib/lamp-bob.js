import * as THREE from 'three';

// A parted crown flowing into straight, jaw-length sides. Each sampled line
// follows the haircut rather than forming coils or thick individual ropes.
export function createLampBob(exposure) {
  const group = new THREE.Group();
  const positions = [], shades = [];
  let seed = 9284;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed-1)/2147483646; };
  const point = (angle, t) => {
    // Two curtains start at an off-centre part, sweep over the crown, then
    // fall freely beside the cheeks. The forehead stays open: no fringe.
    const side=angle<Math.PI ? -1 : 1;
    const u=angle<Math.PI ? angle/Math.PI : (angle-Math.PI)/Math.PI;
    const z=-1.12+u*2.48;
    const rootY=1.65+1.27*Math.sqrt(Math.max(.05,1-Math.pow((z-.05)/1.53,2)));
    const root=new THREE.Vector3(-.13,rootY,z);
    const outer=.97+.045*Math.sin(u*Math.PI);
    const endY=.12+.045*Math.sin(u*19)+.035*Math.sin(u*43);
    const front=u>.77;
    const curve=new THREE.CatmullRomCurve3([
      root,
      new THREE.Vector3(side*.48-.05,rootY+.015,z+.02),
      new THREE.Vector3(side*outer,1.73,z+(front?-.13:.02)),
      new THREE.Vector3(side*(outer+.025),.84,z+(front?-.16:.035)),
      new THREE.Vector3(side*(outer+.055),endY,z+.06)
    ],false,'centripetal');
    const p=curve.getPoint(t);
    p.x+=side*.014*Math.sin(t*7+u*23)*Math.sin(Math.PI*t);
    return p;
  };
  const rows=90, columns=150;
  const vertices=[],indices=[];
  for(let i=0;i<=columns;i++)for(let j=0;j<=rows;j++){
    const p=point(i/columns*Math.PI*2,j/rows);
    vertices.push(p.x,p.y,p.z);
    if(i<columns&&i!==columns/2-1&&j<rows){const a=i*(rows+1)+j,b=a+rows+1;indices.push(a,b,a+1,b,b+1,a+1);}
  }
  const shell=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  shell.setIndex(indices);shell.computeVertexNormals();
  const material=new THREE.MeshBasicMaterial({color:0x050508,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(shell,material);mesh.renderOrder=2;group.add(mesh);
  for(let strand=0;strand<1100;strand++){
    const angle=(strand+random()*.7)/1100*Math.PI*2;
    const brightness=.24+random()*.52;
    for(let j=2;j<100;j++){
      const t=(j+random())/100;
      const p=point(angle,t);
      p.x*=1.012;p.z+=.009;p.y+=.016;
      positions.push(p.x,p.y,p.z);
      shades.push(brightness*(.82+.18*Math.sin(angle-1)));
    }
  }
  const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3)).setAttribute('aShade',new THREE.Float32BufferAttribute(shades,1));
  const fibres=new THREE.ShaderMaterial({uniforms:{uExposure:exposure,uPixel:{value:Math.min(devicePixelRatio||1,1.6)}},transparent:true,depthWrite:false,depthTest:false,
    vertexShader:`attribute float aShade;uniform float uPixel;varying float vShade;void main(){vShade=aShade;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(uPixel*7.5/-p.z,.6,2.);}`,
    fragmentShader:`uniform float uExposure;varying float vShade;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vec3(.72,.67,.94)*vShade*min(uExposure,1.8),smoothstep(.5,.15,d));}`});
  const hair=new THREE.Points(geometry,fibres);hair.renderOrder=3;group.add(hair);
  return group;
}

import * as THREE from 'three';

// A parted crown flowing into straight, jaw-length sides. Each sampled line
// follows the haircut rather than forming coils or thick individual ropes.
export function createLampBob(exposure) {
  const group = new THREE.Group();
  const positions = [], shades = [];
  let seed = 9284;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed-1)/2147483646; };
  const point = (angle, t) => {
    const front = Math.cos(angle);
    const side = Math.sin(angle);
    const fringe=THREE.MathUtils.smoothstep(front,.50,.82);
    const endY=1.66+.32*fringe;
    const crown = Math.min(t/.53,1)*Math.acos((endY-1.66)/1.28);
    const radius = Math.sin(crown);
    let x = 1.12*side*radius;
    let y = 1.66+1.28*Math.cos(crown);
    let z = .16+1.46*front*radius;
    if(t>.53){
      const drop=(t-.53)/.47;

      const length=THREE.MathUtils.lerp(1.50,.22+.055*side,fringe);
      y=endY-drop*length;
      x=1.12*side*radius*(1+.025*Math.sin(drop*Math.PI)-.025*drop);
      z=.16+1.46*front*radius+.04*Math.sin(drop*Math.PI);
      z+=.08*drop*fringe;
      x+=.045*drop*fringe;
    }
    return new THREE.Vector3(x,y,z);
  };
  const rows=90, columns=150;
  const vertices=[],indices=[];
  for(let i=0;i<=columns;i++)for(let j=0;j<=rows;j++){
    const p=point(i/columns*Math.PI*2,j/rows);
    vertices.push(p.x,p.y,p.z);
    if(i<columns&&j<rows){const a=i*(rows+1)+j,b=a+rows+1;indices.push(a,b,a+1,b,b+1,a+1);}
  }
  const shell=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  shell.setIndex(indices);shell.computeVertexNormals();
  const material=new THREE.MeshBasicMaterial({color:0x090911,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(shell,material);mesh.renderOrder=2;group.add(mesh);
  for(let strand=0;strand<1100;strand++){
    const angle=(strand+random()*.7)/1100*Math.PI*2;
    const brightness=.18+random()*.48;
    for(let j=2;j<100;j++){
      const t=(j+random())/100;
      const p=point(angle,t);
      p.x*=1.009;p.z+=Math.cos(angle)*.012;p.y+=.013;
      positions.push(p.x,p.y,p.z);
      shades.push(brightness*(.65+.35*Math.sin(angle-1)));
    }
  }
  const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3)).setAttribute('aShade',new THREE.Float32BufferAttribute(shades,1));
  const fibres=new THREE.ShaderMaterial({uniforms:{uExposure:exposure,uPixel:{value:Math.min(devicePixelRatio||1,1.6)}},transparent:true,depthWrite:false,
    vertexShader:`attribute float aShade;uniform float uPixel;varying float vShade;void main(){vShade=aShade;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(uPixel*7.5/-p.z,.6,2.);}`,
    fragmentShader:`uniform float uExposure;varying float vShade;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vec3(.72,.67,.94)*vShade*min(uExposure,1.8),smoothstep(.5,.15,d));}`});
  const hair=new THREE.Points(geometry,fibres);hair.renderOrder=3;group.add(hair);
  return group;
}

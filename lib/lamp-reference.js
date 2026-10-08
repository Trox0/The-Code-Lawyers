import * as THREE from 'three';
import { portraitDepth, portraitImageY } from './lamp-anatomy.js';

/** Image-guided portrait with continuous facial depth and bounded eye tracking. */
export function createReferencePortrait(bytes, uniforms, mobile) {
  const header=new DataView(bytes);
  if(new TextDecoder().decode(new Uint8Array(bytes,0,4))!=='LMP2')throw new Error('Invalid Lamp portrait');
  const total=header.getUint32(4,true);
  if(bytes.byteLength!==8+total*16)throw new Error('Incomplete Lamp portrait');
  const source=new Float32Array(bytes,8);
  const count=Math.min(total,mobile?95000:175000);
  const shellCount=mobile?18000:32000, vertexCount=count+shellCount;
  const positions=new Float32Array(vertexCount*3),tones=new Float32Array(vertexCount),randoms=new Float32Array(vertexCount);
  const eyes=new Float32Array(vertexCount*2), normals=new Float32Array(vertexCount*3), shells=new Float32Array(vertexCount);
  uniforms.uGaze ??= { value: new THREE.Vector2() };
  let seed=8271;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
  for(let i=0;i<count;i++){
    const at=Math.floor((i+random()*.8)/count*total)*4;
    const x = source[at] * 190 + 900, y = 550 - source[at + 1] * 190;
    const z = portraitDepth(x, y, source[at + 2]);
    const projection=1-z*.125;
    positions[i*3]=source[at]*projection*.84;
    const imageY = (550 - portraitImageY(y)) / 190;
    positions[i*3+1]=((imageY-.45)*projection+.45)*.84+.42;
    positions[i*3+2]=z;
    // Wrap flat reference hair over the front of the cranium instead of
    // allowing the interior to cut through the original hairstyle.
    for(let wrap=0;wrap<3;wrap++){
      const vy=(positions[i*3+1]-.98)/1.66;
      const taper=vy<0?1+vy*.16:1;
      const vx=(positions[i*3]+.04)/(1.32*taper);
      const r2=vx*vx+vy*vy;
      if(r2>=1)break;
      const surface=.12+.68*Math.sqrt(1-r2)+.035;
      if(positions[i*3+2]>=surface)break;
      const scale=1-surface*.125;
      positions[i*3]=source[at]*scale*.84;
      positions[i*3+1]=((imageY-.45)*scale+.45)*.84+.42;
      positions[i*3+2]=surface;
    }
    tones[i]=source[at+3];randoms[i]=random();
    // Local eye coordinates affect tone only, leaving the 3D surface untouched.
    const left = Math.abs(x - 774) < Math.abs(x - 994);
    eyes[i*2]=(x-(left?774:994))/58;
    eyes[i*2+1]=(y-(left?501:497))/20;
    const dx=(portraitDepth(x+2,y,source[at+2])-portraitDepth(x-2,y,source[at+2]))/(4/190*.84);
    const dy=(portraitDepth(x,y-2,source[at+2])-portraitDepth(x,y+2,source[at+2]))/(4/190*.84);
    const normal=new THREE.Vector3(-dx,-dy,1).normalize();
    normals.set(normal.toArray(),i*3);
  }
  // An actual rear hemisphere supplies cranium volume rather than stretching
  // the nose or face. Its dark hair particles stay behind the reference face.
  for(let j=0;j<shellCount;j++){
    const i=count+j, vertical=random()*2-1, angle=random()*Math.PI*2;
    const ring=Math.sqrt(1-vertical*vertical);
    const taper=vertical<0?1+vertical*.16:1;
    const x=Math.cos(angle)*ring*1.32*taper;
    const y=.98+vertical*1.66;
    const facing=Math.sin(angle), depth=facing>0?.68:1.35;
    const z=.12+facing*ring*depth;
    positions.set([x-.04,y,z],i*3);
    const normal=new THREE.Vector3(x/(1.32*1.32),vertical/1.66,(z-.12)/(1.35*1.35)).normalize();
    normals.set(normal.toArray(),i*3);
    const strand=.5+.5*Math.sin(angle*38+vertical*12+Math.sin(vertical*4)*3);
    tones[i]=.20+strand*.12+random()*.035;randoms[i]=random();shells[i]=1;
    eyes.set([10,10],i*2);
  }
  const geometry=new THREE.BufferGeometry()
    .setAttribute('position',new THREE.BufferAttribute(positions,3))
    .setAttribute('aTone',new THREE.BufferAttribute(tones,1))
    .setAttribute('aRandom',new THREE.BufferAttribute(randoms,1));
  geometry.setAttribute('aEye',new THREE.BufferAttribute(eyes,2));
  geometry.setAttribute('aNormal',new THREE.BufferAttribute(normals,3));
  geometry.setAttribute('aShell',new THREE.BufferAttribute(shells,1));
  const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:true,depthTest:true,
    vertexShader:`attribute float aTone,aRandom,aShell;attribute vec3 aNormal;attribute vec2 aEye;uniform vec2 uGaze;uniform float uPixel,uTime,uPulse;varying float vTone,vRandom,vHeight,vLight;
    void main(){vTone=aTone;vRandom=aRandom;vHeight=position.y;vec3 p=position;
    float aperture=1.-smoothstep(.72,1.,length(aEye));
    vec2 gaze=clamp(uGaze,vec2(-.32,-.22),vec2(.32,.22));
    float oldIris=1.-smoothstep(.26,.44,length(aEye*vec2(1.,.42)));
    float newIris=1.-smoothstep(.26,.44,length((aEye-gaze)*vec2(1.,.42)));
    vTone=clamp(aTone+.55*aperture*(oldIris-newIris),0.,1.);
    vec3 n=normalize(normalMatrix*aNormal);
    vLight=.66+.38*max(0.,dot(n,normalize(vec3(-.55,.65,1.))));
    vLight=mix(vLight,.65+.35*abs(n.x),aShell);
    p+=normalize(vec3(p.xy,.6))*(uPulse*(.10+aRandom*.25));
    p.z+=sin(uTime*.7+aRandom*6.28)*.004;
    vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
    gl_PointSize=clamp(uPixel*(1.5+aRandom*.8)*7.3/-mv.z,.65,3.);}`,
    fragmentShader:`uniform float uExposure,uTime;varying float vTone,vRandom,vHeight,vLight;
    void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
    float shimmer=.95+.05*sin(uTime*.8+vRandom*30.);
    float tone=pow(vTone,.90)*1.75*uExposure*shimmer*vLight;
    float edge=smoothstep(-1.94,-1.35,vHeight);
    gl_FragColor=vec4(vec3(.76,.73,1.)*tone,smoothstep(.5,.14,d)*edge*.91);}`});
  const portrait=new THREE.Points(geometry,material);
  // A closed interior blocks see-through facial detail from the rear and
  // joins the side hair volume. It sits just inside the hair particles.
  const coreGeometry=new THREE.SphereGeometry(1,48,40);
  const corePositions=coreGeometry.attributes.position;
  for(let i=0;i<corePositions.count;i++){
    const x=corePositions.getX(i), y=corePositions.getY(i), z=corePositions.getZ(i);
    corePositions.setXYZ(i,x*1.32*(y<0?1+y*.16:1)*.992-.04,
      .98+y*1.66*.992,.12+z*(z>0?.68:1.35)*.992);
  }
  coreGeometry.computeVertexNormals();
  const core=new THREE.Mesh(coreGeometry,new THREE.MeshBasicMaterial({color:0x0d0c14}));
  core.name='Closed cranium interior';
  portrait.add(core);
  portrait.name='Lamp reference portrait';
  return portrait;
}

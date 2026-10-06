import * as THREE from 'three';

/** Image-guided relief reconstruction; bounded head turns preserve its silhouette. */
export function createReferencePortrait(bytes, uniforms, mobile) {
  const header=new DataView(bytes);
  if(new TextDecoder().decode(new Uint8Array(bytes,0,4))!=='LMP2')throw new Error('Invalid Lamp portrait');
  const total=header.getUint32(4,true);
  if(bytes.byteLength!==8+total*16)throw new Error('Incomplete Lamp portrait');
  const source=new Float32Array(bytes,8);
  const count=Math.min(total,mobile?95000:175000);
  const positions=new Float32Array(count*3),tones=new Float32Array(count),randoms=new Float32Array(count);
  let seed=8271;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
  for(let i=0;i<count;i++){
    const at=Math.floor((i+random()*.8)/count*total)*4;
    const z=source[at+2],projection=1-z*.125;
    positions[i*3]=source[at]*projection*.84;
    positions[i*3+1]=((source[at+1]-.45)*projection+.45)*.84+.42;
    positions[i*3+2]=z;
    tones[i]=source[at+3];randoms[i]=random();
  }
  const geometry=new THREE.BufferGeometry()
    .setAttribute('position',new THREE.BufferAttribute(positions,3))
    .setAttribute('aTone',new THREE.BufferAttribute(tones,1))
    .setAttribute('aRandom',new THREE.BufferAttribute(randoms,1));
  const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,depthTest:true,
    vertexShader:`attribute float aTone,aRandom;uniform float uPixel,uTime,uPulse;varying float vTone,vRandom,vHeight;
    void main(){vTone=aTone;vRandom=aRandom;vHeight=position.y;vec3 p=position;
    p+=normalize(vec3(p.xy,.6))*(uPulse*(.10+aRandom*.25));
    p.z+=sin(uTime*.7+aRandom*6.28)*.004;
    vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
    gl_PointSize=clamp(uPixel*(1.5+aRandom*.8)*7.3/-mv.z,.65,3.);}`,
    fragmentShader:`uniform float uExposure,uTime;varying float vTone,vRandom,vHeight;
    void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
    float shimmer=.95+.05*sin(uTime*.8+vRandom*30.);
    float tone=pow(vTone,.90)*1.75*uExposure*shimmer;
    float edge=smoothstep(-1.94,-1.35,vHeight);
    gl_FragColor=vec4(vec3(.76,.73,1.)*tone,smoothstep(.5,.14,d)*edge*.91);}`});
  const portrait=new THREE.Points(geometry,material);
  portrait.name='Lamp reference portrait';
  return portrait;
}

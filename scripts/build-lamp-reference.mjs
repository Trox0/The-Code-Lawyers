import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/build-lamp-reference.mjs <front-reference.jpg>');
const input = await readFile(source);
const {data,info} = await sharp(input).removeAlpha().raw().toBuffer({resolveWithObject:true});
if(info.width!==1920||info.height!==1080) throw new Error('Expected the supplied 1920×1080 front reference.');
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
const gauss=(x,y,cx,cy,sx,sy)=>Math.exp(-.5*((x-cx)**2/sx**2+(y-cy)**2/sy**2));
const profile=[[180,135],[240,175],[330,221],[450,238],[550,223],[650,200],[735,166],[800,111],[858,12]];
function faceWidth(y){for(let i=1;i<profile.length;i++){if(y<=profile[i][0]){const [ay,aw]=profile[i-1],[by,bw]=profile[i];return aw+(bw-aw)*smooth(ay,by,y)}}return 12;}
function depth(x,y){
 const center=890, w=faceWidth(y), nx=(x-center)/w;
 const faceMask=(1-smooth(.88,1.08,Math.abs(nx)))*smooth(175,245,y)*(1-smooth(830,870,y));
 const hair=-.18+.72*Math.sqrt(Math.max(0,1-((x-center)/365)**2));
 let face=.62+.54*Math.sqrt(Math.max(0,1-nx*nx));
 face+=.47*gauss(x,y,888,611,39,57)+.23*gauss(x,y,887,551,25,80);
 face-=.16*gauss(x,y,773,491,62,31)+.16*gauss(x,y,1006,491,62,31);
 face+=.09*gauss(x,y,758,582,64,60)+.09*gauss(x,y,1021,582,64,60);
 face+=.11*gauss(x,y,884,735,79,24)+.07*gauss(x,y,889,805,58,30);
 const neck=.19+.57*Math.sqrt(Math.max(0,1-((x-900)/139)**2));
 const body=.04+.27*gauss(x,y,900,1020,350,150);
 const lower=(neck*(1-smooth(982,1065,y))+body*smooth(982,1065,y));
 const skin=smooth(845,910,y);
 const neckMask=(1-smooth(115,177,Math.abs(x-900)))*skin;
 let z=hair*(1-faceMask)+face*faceMask;
 z=z*(1-neckMask)+lower*neckMask;
 if(y>990) z=z*(1-smooth(990,1080,y))+body*smooth(990,1080,y);
 return z;
}
let seed=91337;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
const points=[];
for(let y=10;y<1080;y+=1.55)for(let x=310;x<1480;x+=1.55){
 const sx=x+random()*1.4,sy=y+random()*1.4;
 const ix=Math.floor(sx),iy=Math.floor(sy),k=(iy*info.width+ix)*3;
 const r=data[k],g=data[k+1],b=data[k+2],luma=(r*.2126+g*.7152+b*.0722)/255;
 // The supplied render has a cool background and warm skin/hair. This keeps
 // actual flyaway fibres and excludes the background without a rectangular crop.
 const insideFace=sy>245&&sy<850&&Math.abs(sx-890)<faceWidth(sy)*.95;
 const mask=insideFace?1:smooth(-1,7,r-b)*smooth(.065,.13,luma);
 if(random()>mask || luma<.035)continue;
 const tone=Math.pow(luma,.86);
 points.push((sx-900)/190,(550-sy)/190,depth(sx,sy),tone);
}
const count=points.length/4, buffer=Buffer.alloc(8+points.length*4);
buffer.write('LMP2');buffer.writeUInt32LE(count,4);
for(let i=0;i<points.length;i++)buffer.writeFloatLE(points[i],8+i*4);
await mkdir('public/lamp/models',{recursive:true});
await writeFile('public/lamp/models/reference-portrait.bin',buffer);
await writeFile('public/lamp/models/reference-portrait.json',JSON.stringify({format:'LMP2',points:count,sourceSha256:createHash('sha256').update(input).digest('hex'),method:'Reference-coloured 3D relief point cloud. Facial depth and silhouette proportions fitted to the supplied front and three-quarter reference images. Intended for limited interactive head turns; not a recovered full 360-degree model.'},null,2)+'\n');
console.log(JSON.stringify({points:count,bytes:buffer.length}));

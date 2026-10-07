import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
await mkdir('public/brand',{recursive:true});
const svg=await readFile('app/icon.svg');
await writeFile('public/icon.svg',svg);
await writeFile('public/placeholder-logo.svg',svg);
const exports=[
 ['public/brand/favicon-1024.png',1024],['public/brand/apple-touch-180.png',180],
 ['public/apple-icon.png',180],['public/icon-dark-32x32.png',32],
 ['public/icon-light-32x32.png',32],['public/placeholder-logo.png',180]
];
for(const [path,size] of exports)await sharp(svg,{density:600}).resize(size,size).png().toFile(path);
const black=svg.toString().replace(/<rect width="180" height="180" rx="24" fill="#0a0a0a"\/>/,'').replaceAll('#a855f7','#000000').replaceAll('stroke="white"','stroke="#000000"');
await sharp(Buffer.from(black),{density:600}).resize(1024,1024).png().toFile('public/brand/logo-black-1024.png');
console.log('Exported The Code Lawyers icons and signature PNGs.');

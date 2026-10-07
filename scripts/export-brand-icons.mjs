import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
// The signature asset is the approved white header logo on black.
const source=await readFile('public/brand/favicon-1024.png');
for(const [path,size] of [
 ['app/icon.png',192],['public/brand/apple-touch-180.png',180],
 ['public/apple-icon.png',180],['public/icon-dark-32x32.png',32],
 ['public/icon-light-32x32.png',32],['public/placeholder-logo.png',180]
])await sharp(source).resize(size,size).png().toFile(path);
const icon=await sharp(source).resize(192,192).png().toBuffer();
const svg='<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,'+icon.toString('base64')+'"/></svg>';
await writeFile('public/icon.svg',svg);
await writeFile('public/placeholder-logo.svg',svg);
console.log('Updated all browser and Apple icons to the approved header logo.');

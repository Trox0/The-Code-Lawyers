import * as THREE from 'three';

const smooth = (a, b, value) => THREE.MathUtils.smoothstep(value, a, b);
const gaussian = (x, y, cx, cy, sx, sy) => Math.exp(-.5 * (((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));

// Reference-image coordinates. The jaw stays rounded and broad beneath the
// mouth, then meets the neck; it never collapses to the old 12px chin tip.
const widths = [
  [180, 135], [240, 175], [330, 221], [450, 238], [550, 223],
  [650, 202], [735, 174], [800, 139], [850, 110], [885, 116],
  [950, 136], [1010, 144], [1080, 390],
];
const frontDepths = [
  [180, .86], [300, 1.00], [450, 1.02], [600, 1.00], [740, .96],
  [805, .94], [835, .91], [865, .82], [900, .73], [950, .68],
  [990, .55], [1080, .28],
];
function profile(table, y) {
  if (y <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    const [ay, av] = table[i - 1], [by, bv] = table[i];
    if (y <= by) return THREE.MathUtils.lerp(av, bv, smooth(ay, by, y));
  }
  return table[table.length - 1][1];
}

export function portraitDepth(x, y, sourceDepth) {
  const nx = (x - 890) / profile(widths, y);
  const skin = (1 - smooth(.72, 1.12, Math.abs(nx)))
    * smooth(175, 245, y) * (1 - smooth(1010, 1080, y));
  let z = profile(frontDepths, y) * Math.sqrt(Math.max(0, 1 - .80 * nx * nx));
  // Features sit on one continuous craniofacial surface. Modest relief avoids
  // a projecting nose, deep eye holes, swollen cheeks or a separate chin spike.
  z += .15 * gaussian(x, y, 888, 611, 39, 57)
    + .075 * gaussian(x, y, 887, 551, 25, 80)
    - .060 * gaussian(x, y, 774, 501, 62, 31)
    - .060 * gaussian(x, y, 994, 497, 62, 31)
    + .035 * gaussian(x, y, 758, 582, 64, 60)
    + .035 * gaussian(x, y, 1021, 582, 64, 60)
    + .065 * gaussian(x, y, 884, 735, 79, 24)
    + .012 * gaussian(x, y, 889, 805, 75, 30);
  return THREE.MathUtils.lerp(sourceDepth, z, skin);
}

export function portraitImageY(y) {
  // Compact the exposed neck without moving any facial landmarks. Ease the
  // shortening in below the chin so there is no cut or crease at the junction.
  return y - Math.max(0, y - 850) * .18 * smooth(850, 920, y);
}

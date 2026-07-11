import sharp from 'sharp';
import { mkdirSync } from 'fs';

const DL = 'C:/Users/krzys/Downloads';
const ROOT = 'C:/Users/krzys/Documents/lensbylna-portfolio';
mkdirSync(`${ROOT}/src/assets`, { recursive: true });
mkdirSync(`${ROOT}/public`, { recursive: true });

// 1. Optimized full logo (trim transparent margins, keep alpha)
await sharp(`${DL}/nowelogo.png`)
  .trim({ threshold: 10 })
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${ROOT}/src/assets/logo.png`);

// White version of the full logo for dark backgrounds (footer)
const { data: logoBuf } = await sharp(`${DL}/nowelogo.png`).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
await sharp(logoBuf)
  .resize({ width: 900, withoutEnlargement: true })
  .ensureAlpha()
  // recolor every opaque pixel to white while preserving alpha
  .composite([{ input: Buffer.from([255, 255, 255, 255]), raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: 'in' }])
  .png({ compressionLevel: 9 })
  .toFile(`${ROOT}/src/assets/logo-white.png`);

// 2. Favicon: white lens mark (favicon.png) on ink rounded square
const INK = '#1c1915';
const makeIcon = async (size, out) => {
  const pad = Math.round(size * 0.18);
  const inner = size - pad * 2;
  const radius = Math.round(size * 0.22);
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${INK}"/></svg>`,
  );
  const mark = await sharp(`${DL}/favicon.png`).trim({ threshold: 10 }).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  await sharp(bg).composite([{ input: mark, gravity: 'center' }]).png().toFile(out);
};
await makeIcon(32, `${ROOT}/public/favicon.png`);
await makeIcon(180, `${ROOT}/public/apple-touch-icon.png`);

console.log('logo + favicons generated');

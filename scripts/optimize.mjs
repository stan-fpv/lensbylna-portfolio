import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'fs';
import { join, relative, extname } from 'path';

const SRC = 'C:/Users/krzys/Documents/strona lensbylna/Strona';
const OUT = 'C:/Users/krzys/Documents/lensbylna-portfolio/photos-out';

function walk(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(jpe?g|png|webp)$/i.test(f) ? [p] : [];
  });
}

const slug = s => s.toLowerCase().normalize('NFD').replace(/[ł]/g, 'l').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

mkdirSync(join(OUT, 'full'), { recursive: true });
mkdirSync(join(OUT, 'thumb'), { recursive: true });

const files = walk(SRC);
const manifest = [];
const seen = new Set();

for (const f of files) {
  const rel = relative(SRC, f).replace(/\\/g, '/');
  const parts = rel.split('/');
  const category = slug(parts[0]);
  const group = slug(parts.slice(1, -1).join(' ')) || category;
  const base = slug(parts[parts.length - 1].replace(extname(f), ''));
  let name = `${category}-${group}-${base}`;
  let i = 2;
  while (seen.has(name)) name = `${category}-${group}-${base}-${i++}`;
  seen.add(name);

  const img = sharp(f).rotate();
  const meta = await img.metadata();
  const fullBuf = await img.clone().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const fullMeta = await sharp(fullBuf).metadata();
  await sharp(fullBuf).toFile(join(OUT, 'full', name + '.jpg'));
  await img.clone().resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 75, mozjpeg: true }).toFile(join(OUT, 'thumb', name + '.jpg'));

  manifest.push({ name: name + '.jpg', category, group, w: fullMeta.width, h: fullMeta.height });
  process.stdout.write('.');
}

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} photos processed`);

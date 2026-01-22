import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../public/og-image.svg');
const pngPath = join(__dirname, '../public/og-image.png');

console.log('Converting SVG to PNG...');

try {
  const svgBuffer = readFileSync(svgPath);
  
  await sharp(svgBuffer)
    .resize(1200, 630)
    .png()
    .toFile(pngPath);
  
  console.log('✓ Successfully converted to PNG:', pngPath);
} catch (error) {
  console.error('✗ Error converting image:', error.message);
  process.exit(1);
}

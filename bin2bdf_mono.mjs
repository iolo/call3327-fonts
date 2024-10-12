import fs from 'node:fs';
import { parseRawFont, generateUnicodeGlyphs, initBitmap, scaleBitmap, generateBdfChar, generateBdfFont } from './font.mjs';

const binFile = process.argv[2] || 'font.bin';
const bdfFile = process.argv[3] || 'mono.bdf';
const romFile = process.argv[4] || 'apple2e-rom-font.bin';

const font = parseRawFont(fs.readFileSync(binFile));
const romFont = parseRawFont(fs.readFileSync(romFile));

const glyphs = generateUnicodeGlyphs(font, romFont);

// ascii: scale vert 2x : 7x8 -> 7x16
for (let i = 0; i < 0xff; i++) {
  const glyph = glyphs[i];
  if (glyph.code >= 0x20 && glyph.code <= 0x80) {
    const bitmap = initBitmap(glyph.width, glyph.height * 2);
    scaleBitmap(glyph.bitmap, glyph.width, glyph.height, bitmap, 0, 0, 1, 2);
    glyph.bitmap = bitmap;
    glyph.width = 7;
    glyph.height = 16;
  }
}

fs.writeFileSync(
  bdfFile,
  generateBdfFont({
    family: 'CALL3327_m',
    pixelSize: 16,
    pointSize: 160,
    averageWidth: 70,
    size: [16, 75, 75],
    fontBoundingBox: [7, 16, 0, 0],
    fontAscent: 16,
    fontDescent: 0,
    chars: glyphs.map((glyph) => generateBdfChar(glyph, { swidth: [glyph.width > 7 ? 1000 : 500] })),
  })
);

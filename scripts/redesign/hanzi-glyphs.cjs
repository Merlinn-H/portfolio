const opentype = require('opentype.js'); const fs = require('fs');
const map = { '英': 121, '雄': 120, '本': 123, '色': 122 };
const out = {};
for (const [ch, n] of Object.entries(map)) {
  const buf = fs.readFileSync(`node_modules/@fontsource/noto-serif-tc/files/noto-serif-tc-${n}-700-normal.woff`);
  const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  const g = font.charToGlyph(ch);
  // em 1000, draw at baseline y=880 so glyph fits in 0..1000 box
  const path = g.getPath(0, 880, 1000);
  out[ch] = { d: path.toPathData(1), adv: g.advanceWidth };
}
fs.writeFileSync(process.argv[2], `// Generated from Noto Serif TC Bold (SIL Open Font License 1.1) — scripts/redesign (glyph outlines only).\n// 英雄本色 = original title of "A Better Tomorrow" (John Woo, 1986).\nexport const HANZI_GLYPHS = ${JSON.stringify(Object.entries(out).map(([c, v]) => ({ char: c, d: v.d })), null, 1)} as const;\n`);
console.log(Object.values(out).map(v=>v.d.length));

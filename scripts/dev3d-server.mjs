// Tiny helper for the 3D dev pages (src/three/dev): they render pictures in the
// browser and POST them here to be written to disk.
//   POST /save?file=renders/<name>.png   → .renders/3d/<name>.png      (check pictures)
//   POST /save?file=thumbs/<scene>/<x>   → public/models/thumbs/<scene>/<x>  (game pictures)
// Run:  node scripts/dev3d-server.mjs   (listens on http://localhost:5199)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOTS = { renders: path.join(root, '.renders', '3d'), thumbs: path.join(root, 'public', 'models', 'thumbs') };
const PORT = Number(process.env.PORT || 5199);

function target(file) {
  const [kind, ...rest] = String(file || '').split('/');
  const base = ROOTS[kind];
  if (!base || !rest.length) return null;
  const full = path.resolve(base, rest.join('/'));
  // Never write outside the two folders above.
  if (!full.startsWith(base + path.sep) || !/\.(png|jpg|webp|json|txt)$/.test(full)) return null;
  return full;
}

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.writeHead(204).end();
      return;
    }
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (req.method !== 'POST' || url.pathname !== '/save') {
      res.writeHead(404).end('not found');
      return;
    }
    const full = target(url.searchParams.get('file'));
    if (!full) {
      res.writeHead(400).end('bad file');
      return;
    }
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      let body = Buffer.concat(chunks);
      const text = body.subarray(0, 40).toString('latin1');
      // The page sends canvas.toDataURL() output; store the decoded bytes.
      if (text.startsWith('data:')) body = Buffer.from(body.toString('latin1').split(',')[1], 'base64');
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, body);
      console.log(`saved ${path.relative(root, full)} (${body.length} bytes)`);
      res.writeHead(200).end('ok');
    });
  })
  .listen(PORT, () => console.log(`dev3d save server on http://localhost:${PORT}`));

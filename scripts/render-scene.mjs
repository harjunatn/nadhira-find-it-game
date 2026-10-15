// Renders scenes to PNG with headless Chrome so they can be checked by eye.
// Usage: npm run render -- <sceneId|all>
// Writes, per scene, into .renders/:
//   <id>.png         the picture as players see it
//   <id>-debug.png   with every tap area outlined and labelled
//   <id>-cards.png   every object on its own, as shown on the "Find the …" card
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { importBundled, outDir } from './bundle.mjs';

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => fs.existsSync(p));

const target = process.argv[2] || 'all';

const mod = await importBundled(
  `
import { renderToStaticMarkup } from 'react-dom/server';
import { BUILTIN_SCENES } from '../src/scenes/index.js';
import { SceneBackground, SceneObjects, DebugLayer, ObjectArt } from '../src/components/SceneGraphics.jsx';

export const ids = BUILTIN_SCENES.map((s) => s.id);

export function scene(id, debug) {
  const s = BUILTIN_SCENES.find((x) => x.id === id);
  return renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
      <SceneBackground scene={s} />
      <SceneObjects scene={s} />
      {debug && <DebugLayer scene={s} />}
    </svg>
  );
}

export function cards(id) {
  const s = BUILTIN_SCENES.find((x) => x.id === id);
  return renderToStaticMarkup(
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, padding: 16, fontFamily: 'sans-serif' }}>
      {s.objects.map((o) => (
        <div key={o.id} style={{ background: '#fff7d6', borderRadius: 16, padding: 8, textAlign: 'center' }}>
          <ObjectArt scene={s} obj={o} size={200} />
          <div style={{ fontSize: 26, fontWeight: 800 }}>{o.word}</div>
        </div>
      ))}
    </div>
  );
}
`,
  'render',
);

function shoot(html, png, width, height) {
  const file = path.join(outDir, path.basename(png).replace(/\.png$/, '.html'));
  fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#fff">${html}</body></html>`);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'findit-chrome-'));
  try {
    execFileSync(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        '--no-default-browser-check',
        `--user-data-dir=${profile}`,
        '--force-device-scale-factor=1',
        `--window-size=${width},${height}`,
        `--screenshot=${png}`,
        `file://${file}`,
      ],
      { stdio: 'ignore', timeout: 60000 },
    );
  } finally {
    fs.rmSync(profile, { recursive: true, force: true });
    fs.rmSync(file, { force: true });
  }
}

if (!CHROME) {
  console.error('Google Chrome not found; cannot render.');
  process.exit(1);
}

const list = target === 'all' ? mod.ids : [target];
for (const id of list) {
  if (!mod.ids.includes(id)) {
    console.error(`No scene "${id}". Known: ${mod.ids.join(', ')}`);
    process.exit(1);
  }
  const base = path.join(outDir, id);
  shoot(mod.scene(id, false), `${base}.png`, 1600, 1200);
  shoot(mod.scene(id, true), `${base}-debug.png`, 1600, 1200);
  shoot(mod.cards(id), `${base}-cards.png`, 1600, 1200);
  console.log(`rendered ${id}: ${base}.png, ${base}-debug.png, ${base}-cards.png`);
}

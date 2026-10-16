// Records every line the game says with the Kokoro TTS model and writes
// public/voice/<id>.m4a plus public/voice/manifest.json ({ text: id }).
// Only new or changed lines are recorded, so re-running after editing a scene is quick.
//
// Usage (from this folder): npm install && node generate.mjs
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { KokoroTTS } from 'kokoro-js';
import { importBundled, root } from '../../scripts/bundle.mjs';

const VOICE = 'af_heart';
const SPEED = 0.92;
const OUT = path.join(root, 'public', 'voice');

const { BUILTIN_SCENES, FIXED, sceneLines } = await importBundled(
  `export { BUILTIN_SCENES } from '../src/scenes/index.js'; export { FIXED, sceneLines } from '../src/lib/phrases.js';`,
  'voice',
);

const lines = [...new Set([...Object.values(FIXED), ...BUILTIN_SCENES.flatMap(sceneLines)].map((s) => s.trim()).filter(Boolean))];
const idOf = (text) => crypto.createHash('sha1').update(`${VOICE}|${SPEED}|${text}`).digest('hex').slice(0, 12);
const fileOf = (text) => path.join(OUT, `${idOf(text)}.m4a`);

fs.mkdirSync(OUT, { recursive: true });
const todo = lines.filter((t) => !fs.existsSync(fileOf(t)));
console.log(`${lines.length} lines, ${todo.length} to record`);

if (todo.length) {
  const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'findit-voice-'));
  const started = Date.now();
  for (let i = 0; i < todo.length; i++) {
    const text = todo[i];
    const wav = path.join(tmp, 'line.wav');
    const audio = await tts.generate(text, { voice: VOICE, speed: SPEED });
    await audio.save(wav);
    execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', '-b', '40000', '-c', '1', wav, fileOf(text)]);
    if ((i + 1) % 25 === 0 || i + 1 === todo.length) {
      const eta = Math.round((((Date.now() - started) / (i + 1)) * (todo.length - i - 1)) / 1000);
      console.log(`${i + 1}/${todo.length}  (about ${eta}s left)`);
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}

const manifest = {};
for (const text of [...lines].sort()) manifest[text] = idOf(text);
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest));

// Remove clips for lines that no longer exist.
const keep = new Set(Object.values(manifest).map((id) => `${id}.m4a`));
let removed = 0;
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.m4a') && !keep.has(f)) {
    fs.rmSync(path.join(OUT, f));
    removed++;
  }
}
const bytes = fs.readdirSync(OUT).reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0);
console.log(`manifest: ${lines.length} lines, removed ${removed} old clips, total ${(bytes / 1e6).toFixed(1)} MB`);

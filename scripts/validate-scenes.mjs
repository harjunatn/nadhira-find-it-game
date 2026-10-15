// Checks the built-in scenes for missing text, objects that can't be tapped, crowding, etc.
// Usage: npm run validate            (all scenes)
//        npm run validate -- zoo     (one scene)
import { importBundled } from './bundle.mjs';
import { hitShape, hitTest } from '../src/lib/geometry.js';

const W = 1600;
const H = 1200;
const only = process.argv[2];

const { BUILTIN_SCENES } = await importBundled(`export { BUILTIN_SCENES } from '../src/scenes/index.js';`, 'validate');

const REQUIRED = ['id', 'word', 'wordId', 'sentence', 'sentenceId', 'question', 'questionId', 'answer', 'answerId'];
const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

let totalErrors = 0;
const ids = new Set();

for (const scene of BUILTIN_SCENES) {
  if (only && scene.id !== only) continue;
  const errors = [];
  const warnings = [];
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);

  if (ids.has(scene.id)) err(`duplicate scene id "${scene.id}"`);
  ids.add(scene.id);
  for (const f of ['id', 'title', 'titleId', 'icon']) if (!scene[f]) err(`scene is missing "${f}"`);
  if (typeof scene.Background !== 'function') err('scene.Background must be a React component');
  const objects = scene.objects || [];
  if (objects.length < 12) err(`only ${objects.length} objects (need at least 16)`);
  else if (objects.length < 16) warn(`only ${objects.length} objects (aim for 18-24)`);

  const seenIds = new Set();
  const seenWords = new Set();
  for (const o of objects) {
    const name = `"${o.id || o.word || '?'}"`;
    for (const f of REQUIRED) if (typeof o[f] !== 'string' || !o[f].trim()) err(`${name}: missing text field "${f}"`);
    if (seenIds.has(o.id)) err(`${name}: duplicate id`);
    seenIds.add(o.id);
    const w = (o.word || '').toLowerCase();
    if (seenWords.has(w)) err(`${name}: duplicate word "${o.word}"`);
    seenWords.add(w);
    if (o.word && o.word !== o.word.toLowerCase()) warn(`${name}: word should be lowercase ("${o.word}")`);
    if (!!o.emoji === !!o.art) err(`${name}: needs exactly one of "emoji" or "art"`);
    if (o.art && typeof o.art !== 'function') err(`${name}: "art" must be a React component`);
    if (o.emoji && [...segmenter.segment(o.emoji)].length !== 1) warn(`${name}: emoji "${o.emoji}" is more than one character`);
    for (const f of ['x', 'y', 'size']) if (typeof o[f] !== 'number' || Number.isNaN(o[f])) err(`${name}: "${f}" must be a number`);
    if (o.x < 0 || o.x > W || o.y < 0 || o.y > H) err(`${name}: centre (${o.x}, ${o.y}) is outside the 1600x1200 picture`);
    if (o.size < 70) warn(`${name}: size ${o.size} is small for a 5-year-old (try >= 80)`);
    if (o.size > 800) warn(`${name}: size ${o.size} is very large`);

    const s = hitShape(o);
    const ext = s.type === 'rect' ? { l: s.cx - s.hw, r: s.cx + s.hw, t: s.cy - s.hh, b: s.cy + s.hh } : { l: s.cx - s.r, r: s.cx + s.r, t: s.cy - s.r, b: s.cy + s.r };
    if (ext.l < -20 || ext.t < -20 || ext.r > W + 20 || ext.b > H + 20) warn(`${name}: tap area goes outside the picture`);

    if (o.sentence) {
      if (words(o.sentence) > 9) warn(`${name}: sentence has ${words(o.sentence)} words; keep it <= 8 for a 5-year-old`);
      if (!/[.!?]$/.test(o.sentence.trim())) warn(`${name}: sentence should end with . or !`);
    }
    if (o.question && !o.question.trim().endsWith('?')) err(`${name}: question must end with "?"`);
    if (o.question && words(o.question) > 9) warn(`${name}: question has ${words(o.question)} words; keep it short`);
    if (o.answer && words(o.answer) > 9) warn(`${name}: answer has ${words(o.answer)} words; keep it short`);

    // The object must win a tap on its own centre, and should win most taps near the centre.
    const hit = hitTest(objects, s.cx, s.cy);
    if (hit !== o) err(`${name}: a tap on its centre selects "${hit ? hit.id : 'nothing'}" instead`);
    const k = 0.5;
    const probes = s.type === 'rect'
      ? [[s.cx + s.hw * k, s.cy], [s.cx - s.hw * k, s.cy], [s.cx, s.cy + s.hh * k], [s.cx, s.cy - s.hh * k]]
      : [[s.cx + s.r * k, s.cy], [s.cx - s.r * k, s.cy], [s.cx, s.cy + s.r * k], [s.cx, s.cy - s.r * k]];
    const wins = probes.filter(([px, py]) => hitTest(objects, px, py) === o).length;
    if (wins < 2) warn(`${name}: crowded — only ${wins}/4 taps halfway out from its centre select it`);
  }

  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const a = objects[i];
      const b = objects[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 70 && !a.hit && !b.hit) warn(`"${a.id}" and "${b.id}" are only ${Math.round(d)} apart`);
    }
  }

  totalErrors += errors.length;
  const status = errors.length ? '❌' : warnings.length ? '⚠️ ' : '✅';
  console.log(`\n${status} ${scene.id} — ${objects.length} objects, ${errors.length} errors, ${warnings.length} warnings`);
  errors.forEach((m) => console.log(`   ERROR  ${m}`));
  warnings.forEach((m) => console.log(`   warn   ${m}`));
}

if (only && !ids.has(only)) {
  console.log(`No scene with id "${only}". Known: ${BUILTIN_SCENES.map((s) => s.id).join(', ')}`);
  process.exit(1);
}
process.exit(totalErrors ? 1 : 0);

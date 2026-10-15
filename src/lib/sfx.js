// Tiny sound effects made with Web Audio, so the game needs no sound files.

let ctx = null;
let enabled = true;

export function configureSfx(opts) {
  if (opts.enabled !== undefined) enabled = opts.enabled;
}

export function unlockAudio() {
  try {
    // Let sounds play even when the iPad is in silent mode (Safari 16.4+).
    if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback';
  } catch {
    /* ignore */
  }
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    /* ignore */
  }
}

function tone(freq, start, dur, { type = 'sine', gain = 0.2, slideTo } = {}) {
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function play(fn) {
  if (!enabled) return;
  unlockAudio();
  if (!ctx) return;
  try {
    fn();
  } catch {
    /* ignore */
  }
}

export const sfx = {
  tap: () => play(() => tone(900, 0, 0.07, { gain: 0.06 })),
  pop: () => play(() => tone(500, 0, 0.12, { gain: 0.14, slideTo: 1100 })),
  wrong: () =>
    play(() => {
      tone(330, 0, 0.14, { type: 'triangle', gain: 0.2, slideTo: 240 });
      tone(240, 0.13, 0.2, { type: 'triangle', gain: 0.18, slideTo: 170 });
    }),
  correct: () =>
    play(() => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.075, 0.28, { type: 'triangle', gain: 0.22 }));
      tone(1568, 0.32, 0.4, { gain: 0.08 });
    }),
  star: () => play(() => [1318.5, 1568, 2093].forEach((f, i) => tone(f, i * 0.06, 0.22, { gain: 0.12 }))),
  tick: () => play(() => tone(1200, 0, 0.05, { type: 'square', gain: 0.04 })),
  go: () => play(() => tone(880, 0, 0.25, { type: 'triangle', gain: 0.2 })),
  fanfare: () =>
    play(() => {
      const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 659.25, 783.99, 1046.5];
      const times = [0, 0.12, 0.24, 0.36, 0.6, 0.78, 0.9, 1.05];
      notes.forEach((f, i) => tone(f, times[i], i === notes.length - 1 ? 0.7 : 0.22, { type: 'triangle', gain: 0.2 }));
    }),
};

// English text-to-speech using the browser's built-in voices (Web Speech API).
// iPad Safari only allows speech after the first tap, so unlockSpeech() must be
// called from inside a tap handler once; after that the game can talk freely.

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

let enabled = true;
let rate = 0.85;
let preferredName = '';
let voice = null;
let unlocked = false;
let pendingTimer = null;
const listeners = new Set();

// Apple ships joke voices (Bubbles, Zarvox, ...) that are no good for teaching.
const NOVELTY =
  /(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Ralph|Fred|Kathy|Grandma|Grandpa|Eddy|Flo|Reed|Rocko|Sandy|Shelley)/i;
const FAVOURITES = ['Samantha', 'Ava', 'Allison', 'Susan', 'Nicky', 'Karen', 'Serena', 'Daniel', 'Moira', 'Tessa', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny'];

export function englishVoices() {
  if (!synth) return [];
  return synth.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang) && !NOVELTY.test(v.name));
}

function score(v) {
  let s = 0;
  if (/en[-_]US/i.test(v.lang)) s += 10;
  else if (/en[-_](GB|AU|IE|CA)/i.test(v.lang)) s += 6;
  const fav = FAVOURITES.findIndex((name) => v.name.startsWith(name));
  if (fav >= 0) s += 20 - fav;
  if (/(Enhanced|Premium|Neural|Natural)/i.test(v.name)) s += 8;
  if (v.localService) s += 2;
  return s;
}

function pickVoice() {
  const voices = englishVoices();
  if (!voices.length) {
    voice = null;
    return;
  }
  voice = (preferredName && voices.find((v) => v.name === preferredName)) || [...voices].sort((a, b) => score(b) - score(a))[0];
  listeners.forEach((fn) => fn());
}

if (synth) {
  pickVoice();
  if (synth.addEventListener) synth.addEventListener('voiceschanged', pickVoice);
  else synth.onvoiceschanged = pickVoice;
}

export function onVoicesChanged(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function currentVoiceName() {
  return voice ? voice.name : '';
}

export function speechSupported() {
  return !!synth;
}

export function configureSpeech(opts) {
  if (opts.enabled !== undefined) enabled = opts.enabled;
  if (opts.rate !== undefined) rate = opts.rate;
  if (opts.voiceName !== undefined && opts.voiceName !== preferredName) {
    preferredName = opts.voiceName;
    pickVoice();
  }
  if (!enabled) stopSpeech();
}

export function unlockSpeech() {
  if (!synth || unlocked) return;
  unlocked = true;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    synth.speak(u);
  } catch {
    /* ignore */
  }
}

export function stopSpeech() {
  if (!synth) return;
  clearTimeout(pendingTimer);
  try {
    if (synth.speaking || synth.pending) synth.cancel();
  } catch {
    /* ignore */
  }
}

function utter(text, opts = {}) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = voice ? voice.lang : 'en-US';
  if (voice) u.voice = voice;
  u.rate = opts.rate ?? rate;
  u.pitch = opts.pitch ?? 1.05;
  return u;
}

// Say one or more lines in order. Anything still being spoken is cut off first.
export function speak(lines, opts = {}) {
  if (!synth || !enabled) return;
  const list = (Array.isArray(lines) ? lines : [lines]).filter(Boolean);
  if (!list.length) return;
  const say = () => {
    try {
      if (synth.paused) synth.resume();
      list.forEach((line) => synth.speak(utter(line, opts)));
    } catch {
      /* ignore */
    }
  };
  clearTimeout(pendingTimer);
  if (synth.speaking || synth.pending) {
    // Safari sometimes drops an utterance queued in the same tick as cancel().
    stopSpeech();
    pendingTimer = setTimeout(say, 80);
  } else {
    say();
  }
}

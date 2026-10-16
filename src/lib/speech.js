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
  return !!synth || !!player;
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

// ---------- Recorded voice ----------
// Most lines are pre-recorded with a natural voice (tools/voice → public/voice).
// Anything without a recording (photo scenes, unusual text) falls back to the
// device's text-to-speech.

const player = typeof Audio !== 'undefined' ? new Audio() : null;
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
let clips = null;
let audioUnlocked = false;
let run = 0;
let cancelCurrent = null;

if (typeof fetch !== 'undefined') {
  fetch('voice/manifest.json')
    .then((r) => (r.ok ? r.json() : null))
    .then((m) => {
      clips = m;
    })
    .catch(() => {});
}

function clipUrl(text) {
  return clips && clips[text] ? `voice/${clips[text]}.m4a` : null;
}

// Warm the browser cache for lines that are about to be needed.
export function prefetchLines(lines) {
  const urls = [...new Set(lines.map(clipUrl).filter(Boolean))];
  let i = 0;
  const next = () => {
    if (i >= urls.length) return;
    fetch(urls[i++])
      .catch(() => {})
      .finally(next);
  };
  for (let k = 0; k < 4; k++) next();
}

export function unlockSpeech() {
  // iPad Safari: a media element that played once inside a tap may play later on its own.
  if (player && !audioUnlocked) {
    audioUnlocked = true;
    if (player.paused) {
      try {
        player.src = SILENT;
        const p = player.play();
        if (p) p.catch(() => {});
      } catch {
        /* ignore */
      }
    }
  }
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
  run++;
  clearTimeout(pendingTimer);
  if (cancelCurrent) cancelCurrent();
  if (player) {
    try {
      player.pause();
    } catch {
      /* ignore */
    }
  }
  if (!synth) return;
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

function playClip(url) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      cancelCurrent = null;
      resolve(ok);
    };
    cancelCurrent = () => finish(true);
    player.onended = () => finish(true);
    player.onerror = () => finish(false);
    // Recordings are made at "normal" speed; slow/fast settings stretch them (pitch is kept).
    const speed = Math.min(1.3, Math.max(0.7, rate / 0.85));
    player.defaultPlaybackRate = speed;
    player.src = url;
    player.playbackRate = speed;
    try {
      const p = player.play();
      if (p) p.catch(() => finish(false));
    } catch {
      finish(false);
    }
  });
}

function sayWithDevice(text, opts) {
  return new Promise((resolve) => {
    if (!synth) {
      resolve();
      return;
    }
    let done = false;
    let timer = null;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      cancelCurrent = null;
      resolve();
    };
    cancelCurrent = finish;
    const u = utter(text, opts);
    u.onend = finish;
    u.onerror = finish;
    // Safari sometimes never fires onend.
    timer = setTimeout(finish, 1500 + text.length * 110);
    const go = () => {
      try {
        if (synth.paused) synth.resume();
        synth.speak(u);
      } catch {
        finish();
      }
    };
    if (synth.speaking || synth.pending) {
      // Safari sometimes drops an utterance queued in the same tick as cancel().
      synth.cancel();
      pendingTimer = setTimeout(go, 80);
    } else {
      go();
    }
  });
}

async function playLines(list, myRun, opts) {
  for (const text of list) {
    if (myRun !== run) return;
    const url = player && clipUrl(text);
    const played = url ? await playClip(url) : false;
    if (myRun !== run) return;
    if (!played) await sayWithDevice(text, opts);
  }
}

// Say one or more lines in order. Anything still being spoken is cut off first.
export function speak(lines, opts = {}) {
  if (!enabled) return;
  const list = (Array.isArray(lines) ? lines : [lines]).map((l) => (l || '').trim()).filter(Boolean);
  if (!list.length) return;
  stopSpeech();
  playLines(list, run, opts);
}

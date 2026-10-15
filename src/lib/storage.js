// Settings and sticker-book progress live in localStorage; photo scenes (which
// contain an image) live in IndexedDB because localStorage is only ~5 MB.

const SETTINGS_KEY = 'findit.settings.v1';
const PROGRESS_KEY = 'findit.progress.v1';

export const AVATARS = ['🧒', '👧', '👦', '👶', '👩', '👨', '👵', '👴', '🐱', '🐶', '🦁', '🐼', '🦄', '🦖', '🐰', '🐸', '🐵', '🐯'];
export const PLAYER_COLORS = ['#ff7a59', '#4f8df5', '#9b6dff', '#2fbf71', '#ff5fa2', '#f5a623'];

export const DEFAULT_SETTINGS = {
  players: [
    { name: 'Kiddo', avatar: '🧒', color: '#ff7a59' },
    { name: 'Mommy', avatar: '👩', color: '#4f8df5' },
  ],
  rounds: 8,
  mode: 'together',
  showIndonesian: true,
  showPicture: true,
  voice: true,
  sfx: true,
  speechRate: 0.85,
  voiceName: '',
  headStart: 3,
  autoHint: 15,
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or storage full: the game still works, it just forgets */
  }
}

export function loadSettings() {
  const saved = readJSON(SETTINGS_KEY, {}) || {};
  const players =
    Array.isArray(saved.players) && saved.players.length === 2
      ? saved.players.map((p, i) => ({ ...DEFAULT_SETTINGS.players[i], ...p }))
      : DEFAULT_SETTINGS.players;
  return { ...DEFAULT_SETTINGS, ...saved, players };
}

export function saveSettings(settings) {
  writeJSON(SETTINGS_KEY, settings);
}

// { [sceneId]: { [objectId]: timesFound } }
export function loadProgress() {
  return readJSON(PROGRESS_KEY, {}) || {};
}

export function recordFound(sceneId, objectId) {
  const progress = loadProgress();
  progress[sceneId] = progress[sceneId] || {};
  progress[sceneId][objectId] = (progress[sceneId][objectId] || 0) + 1;
  writeJSON(PROGRESS_KEY, progress);
  return progress;
}

export function resetProgress() {
  writeJSON(PROGRESS_KEY, {});
}

// ---------- Photo scenes (IndexedDB) ----------

const DB_NAME = 'findit';
const STORE = 'photoScenes';

function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not available'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore(mode, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => {
      db.close();
      resolve(req ? req.result : undefined);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
    tx.onabort = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export async function listPhotoScenes() {
  const all = (await withStore('readonly', (s) => s.getAll())) || [];
  return all.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
}

export function savePhotoScene(scene) {
  return withStore('readwrite', (s) => s.put(scene));
}

export function deletePhotoScene(id) {
  return withStore('readwrite', (s) => s.delete(id));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Could not read that picture'));
    el.src = src;
  });
}

// Copy the part `rect` of an image into a JPEG data URL no bigger than `maxSide`.
// `scale` says how much smaller the result is than the source rectangle.
function drawToDataURL(img, rect, maxSide) {
  const scale = Math.min(1, maxSide / Math.max(rect.w, rect.h));
  const width = Math.max(1, Math.round(rect.w * scale));
  const height = Math.max(1, Math.round(rect.h * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h, 0, 0, width, height);
  return { image: canvas.toDataURL('image/jpeg', 0.86), width, height, scale };
}

// Read a photo file, shrinking it to at most `maxSide` pixels.
export async function photoToDataURL(file, maxSide = 1600) {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    return drawToDataURL(img, { x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight }, maxSide);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Cut `rect` (in the image's own pixels) out of a data URL image.
export async function cropDataURL(dataUrl, rect, maxSide = 1600) {
  const img = await loadImage(dataUrl);
  return drawToDataURL(img, rect, maxSide);
}

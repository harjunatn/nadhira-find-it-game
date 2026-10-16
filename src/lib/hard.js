// "Hard" mode: things are drawn smaller and about half of them are partly hidden
// behind a box, bush or rock. The covers are scenery only (they are not in the hit
// test), so tapping the visible part of a hidden thing still finds it.

const INDOOR = ['📦', '🛍️', '🎁', '🧺'];
const OUTDOOR = ['🌿', '🪨', '🪵', '📦', '🌳'];
const OUTDOOR_SCENES = new Set(['zoo', 'street', 'playground']);

const SHRINK = 0.72;
const MAX_HIDE_SIZE = 220; // big furniture is never hidden or shrunk

export function makeHard(scene) {
  if (scene.kind === 'photo') return scene;
  const used = new Set(scene.objects.map((o) => o.emoji).filter(Boolean));
  const pool = (OUTDOOR_SCENES.has(scene.id) ? OUTDOOR : INDOOR).filter((e) => !used.has(e));
  if (!pool.length) pool.push('📦');

  const covers = [];
  const objects = scene.objects.map((o) => {
    if (o.hit || o.size > MAX_HIDE_SIZE) return o;
    const size = Math.round(o.size * SHRINK);
    if (Math.random() < 0.55) {
      const side = Math.random() < 0.5 ? -1 : 1;
      covers.push({
        id: `cover-${o.id}`,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        x: o.x + side * size * 0.42,
        y: o.y + size * 0.22,
        size: Math.round(size * 0.8),
        rotate: Math.round((Math.random() - 0.5) * 16),
      });
    }
    return { ...o, size };
  });
  return { ...scene, objects, covers, hard: true };
}

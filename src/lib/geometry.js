// Hit testing for scene objects. All numbers are in scene units
// (built-in scenes are 1600 x 1200; photo scenes use the photo's own size).

export const DEFAULT_W = 1600;
export const DEFAULT_H = 1200;
export const MIN_HIT_R = 60;

export function sceneSize(scene) {
  return { W: scene.width || DEFAULT_W, H: scene.height || DEFAULT_H };
}

// The tappable area of an object: a rectangle when `hit` is given, otherwise a circle.
export function hitShape(obj) {
  if (obj.hit) {
    const hw = obj.hit.w / 2;
    const hh = obj.hit.h / 2;
    return {
      type: 'rect',
      cx: obj.x + (obj.hit.dx || 0),
      cy: obj.y + (obj.hit.dy || 0),
      hw,
      hh,
      R: Math.sqrt(hw * hh),
    };
  }
  const r = obj.r ?? Math.max((obj.size || 100) * 0.55, MIN_HIT_R);
  return { type: 'circle', cx: obj.x, cy: obj.y, r, R: r };
}

// 0 at the centre of the shape, 1 on its edge.
export function normDist(shape, px, py) {
  const dx = px - shape.cx;
  const dy = py - shape.cy;
  if (shape.type === 'rect') return Math.max(Math.abs(dx) / shape.hw, Math.abs(dy) / shape.hh);
  return Math.hypot(dx, dy) / shape.r;
}

// Which object did the player mean? Among the shapes that contain the point,
// prefer small objects (a teddy bear sitting on a bed should win over the bed)
// and, among similar sizes, the one whose centre is closest.
export function hitTest(objects, px, py) {
  let best = null;
  let bestScore = Infinity;
  for (const obj of objects) {
    const shape = hitShape(obj);
    const d = normDist(shape, px, py);
    if (d > 1) continue;
    const score = shape.R * (0.5 + d);
    if (score < bestScore) {
      best = obj;
      bestScore = score;
    }
  }
  return best;
}

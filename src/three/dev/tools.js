// Helpers for the developer pages: take pictures of the canvas and send them to
// scripts/dev3d-server.mjs, which writes them to disk.
import * as THREE from 'three';

export const SAVE = 'http://localhost:5199/save';

export async function post(file, dataUrl) {
  const res = await fetch(`${SAVE}?file=${encodeURIComponent(file)}`, { method: 'POST', body: dataUrl });
  if (!res.ok) throw new Error(`save failed: ${res.status}`);
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Draw the WebGL picture into a 2D canvas (the copy must happen right after gl.render, in the same task).
export function snap(gl, scene, camera, width, height) {
  gl.setPixelRatio(1);
  gl.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  gl.render(scene, camera);
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  c.getContext('2d').drawImage(gl.domElement, 0, 0, width, height);
  return c;
}

export function drawLabel(ctx, text, x, y, size = 15) {
  ctx.font = `bold ${size}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ffffff';
  ctx.strokeText(text, x, y);
  ctx.fillStyle = '#111111';
  ctx.fillText(text, x, y);
}

export function project(camera, at, width, height) {
  const v = new THREE.Vector3(...at).project(camera);
  return [(v.x * 0.5 + 0.5) * width, (-v.y * 0.5 + 0.5) * height];
}

// Put the camera on a sphere around the middle of the room. az 0 = looking from the south.
export function orbit(camera, { az = 35, pol = 55, dist = 9, target = [0, 0.42, 0] }) {
  const a = THREE.MathUtils.degToRad(az);
  const p = THREE.MathUtils.degToRad(pol);
  camera.position.set(target[0] + dist * Math.sin(p) * Math.sin(a), target[1] + dist * Math.cos(p), target[2] + dist * Math.sin(p) * Math.cos(a));
  camera.lookAt(...target);
  camera.updateMatrixWorld(true);
}

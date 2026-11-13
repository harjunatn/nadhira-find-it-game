// Camera maths shared by the game view and the developer pictures.
import * as THREE from 'three';

export const FOV = 32;
export const TARGET = new THREE.Vector3(0, 0.42, 0);
export const START = { az: 0.62, pol: 0.96 }; // radians: seen from the south-east, a little from above

const WALL_H = 1.29;

// Put the camera on a sphere around the middle of the room. az 0 = looking from the south.
export function placeCamera(camera, az, pol, dist) {
  camera.position.set(TARGET.x + dist * Math.sin(pol) * Math.sin(az), TARGET.y + dist * Math.cos(pol), TARGET.z + dist * Math.sin(pol) * Math.cos(az));
  camera.lookAt(TARGET);
  camera.updateMatrixWorld(true);
}

const probe = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
const v = new THREE.Vector3();

// The closest distance from which the whole room (board, walls, tall trees) stays on
// screen while it is turned all the way around.
export function fitDistance(room, aspect) {
  const hx = room.w / 2 + 0.15;
  const hz = room.d / 2 + 0.15;
  const top = room.outdoor ? 0.9 : WALL_H;
  const corners = [];
  for (const x of [-hx, hx]) for (const z of [-hz, hz]) for (const y of [-0.2, top]) corners.push([x, y, z]);
  probe.aspect = aspect;
  probe.updateProjectionMatrix();
  const fits = (dist) => {
    for (let az = 0; az < Math.PI * 2; az += Math.PI / 8) {
      placeCamera(probe, az, START.pol, dist);
      probe.matrixWorldInverse.copy(probe.matrixWorld).invert();
      for (const c of corners) {
        v.set(c[0], c[1], c[2]).project(probe);
        if (Math.abs(v.x) > 0.95 || Math.abs(v.y) > 0.93) return false;
      }
    }
    return true;
  };
  let lo = 2;
  let hi = 60;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}

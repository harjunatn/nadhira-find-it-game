// ?dev3d=sheet&scene=<id>    the room from several angles in one picture (.renders/3d/<id>-sheet.png)
//      &views=35:52,215:52   own list of "azimuth:polar[:distance]" views
//      &cell=1200x900&cols=1 size of each view and how many per row
//      &labels=1             write every item's id on every view (the map view always has them)
// ?dev3d=thumbs&scene=<id>   the pictures the game shows: one per findable thing + the room
//                            (public/models/thumbs/<id>/...)
import { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Model } from '../Model.jsx';
import { Lights, RoomScene, worldPosition } from '../RoomScene.jsx';
import { SCENES_3D } from '../scenes/index.js';
import { FOV, fitDistance } from '../camera.js';
import { drawLabel, orbit, post, project, snap, wait } from './tools.js';

const params = new URLSearchParams(window.location.search);
// Same framing as the game at an iPad-like 4:3 view.
const fit = (room) => fitDistance(room, 4 / 3);

function SheetShots({ scene, views, cell, cols, file, labelAll }) {
  const { gl, scene: world, camera } = useThree();
  useEffect(() => {
    let live = true;
    (async () => {
      await wait(1200);
      if (!live) return;
      const [cw, ch] = cell;
      const rows = Math.ceil(views.length / cols);
      const sheet = document.createElement('canvas');
      sheet.width = cw * cols;
      sheet.height = ch * rows;
      const ctx = sheet.getContext('2d');
      ctx.fillStyle = '#cfe9fb';
      ctx.fillRect(0, 0, sheet.width, sheet.height);
      for (let i = 0; i < views.length; i++) {
        const v = views[i];
        orbit(camera, v);
        await wait(500); // let the walls slide into place
        if (!live) return;
        const shot = snap(gl, world, camera, cw, ch);
        const x = (i % cols) * cw;
        const y = Math.floor(i / cols) * ch;
        ctx.drawImage(shot, x, y);
        drawLabel(ctx, v.name, x + 90, y + 24, 17);
        if (v.labels || labelAll) {
          for (const it of scene.items) {
            const p = worldPosition(scene.room, it);
            const [px, py] = project(camera, [p[0], (p[1] || 0) + 0.02, p[2]], cw, ch);
            drawLabel(ctx, it.id, x + px, y + py, 13);
          }
        }
      }
      await post(`renders/${file}.png`, sheet.toDataURL('image/png'));
      document.title = `saved ${file}`;
    })();
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function Sheet({ scene }) {
  const dist = fit(scene.room);
  const custom = params.get('views');
  const views = custom
    ? custom.split(',').map((s) => {
        const [az, pol, d] = s.split(':').map(Number);
        return { az, pol, dist: d || dist, name: `az ${az} pol ${pol}` };
      })
    : [
        ...[35, 95, 155, 215, 275, 335].map((az) => ({ az, pol: 55, dist, name: `az ${az}` })),
        { az: 0, pol: 0.5, dist: dist * 1.25, name: 'map (north up)', labels: true },
      ];
  const cell = (params.get('cell') || '800x600').split('x').map(Number);
  const cols = Number(params.get('cols') || 3);
  return (
    <Canvas shadows camera={{ fov: FOV, near: 0.1, far: 100 }} gl={{ toneMapping: THREE.NeutralToneMapping }} style={{ width: cell[0], height: cell[1] }}>
      <Suspense fallback={null}>
        <RoomScene scene={scene} />
        <SheetShots scene={scene} views={views} cell={cell} cols={cols} file={params.get('file') || `${scene.id}-sheet`} labelAll={params.has('labels')} />
      </Suspense>
    </Canvas>
  );
}

// ---------- thumbnails ----------

function ThumbShot({ scene, item, onDone }) {
  const { gl, scene: world, camera } = useThree();
  const [bounds, setBounds] = useState(null);
  const scale = item.scale || 1;
  useEffect(() => {
    if (!bounds) return undefined;
    // A hot reload re-runs this effect and the next thing replaces this one: a shot that is
    // still waiting must then give up, or it would photograph the wrong thing under this name.
    let live = true;
    (async () => {
      await wait(350);
      if (!live) return;
      const size = bounds.size.clone().multiplyScalar(scale);
      const r = size.length() / 2;
      orbit(camera, { az: 32, pol: 62, dist: (r / Math.sin(THREE.MathUtils.degToRad(FOV / 2))) * 1.08, target: [0, size.y / 2, 0] });
      gl.setClearColor(0x000000, 0);
      const shot = snap(gl, world, camera, 256, 256);
      await post(`thumbs/${scene.id}/${item.id}.png`, shot.toDataURL('image/png'));
      if (live) onDone();
    })();
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds]);
  const tint = item.segment ? { _defaultMat: scene.room.wallColor || '#ffffff', ...(item.tint || {}) } : item.tint;
  return <Model model={item.model} scale={scale} tint={tint} onBounds={setBounds} />;
}

function RoomShot({ scene, onDone }) {
  const { gl, scene: world, camera } = useThree();
  useEffect(() => {
    let live = true;
    (async () => {
      await wait(1200);
      if (!live) return;
      orbit(camera, { az: 35, pol: 55, dist: fit(scene.room) });
      await wait(600);
      if (!live) return;
      const shot = snap(gl, world, camera, 800, 600);
      const out = document.createElement('canvas');
      out.width = 800;
      out.height = 600;
      const ctx = out.getContext('2d');
      const sky = ctx.createLinearGradient(0, 0, 0, 600);
      sky.addColorStop(0, '#9fd8ff');
      sky.addColorStop(1, '#e3f5ff');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 800, 600);
      ctx.drawImage(shot, 0, 0);
      await post(`thumbs/${scene.id}/room.jpg`, out.toDataURL('image/jpeg', 0.86));
      if (live) onDone();
    })();
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RoomScene scene={scene} />;
}

function Thumbs({ scene }) {
  // -1 = the whole room, then one findable thing after another
  const [index, setIndex] = useState(-1);
  const item = scene.objects[index];
  const done = index >= scene.objects.length;
  useEffect(() => {
    if (done) {
      post(`thumbs/${scene.id}/done.txt`, `${scene.objects.length} thumbs`).then(() => {
        document.title = 'saved thumbs';
      });
    }
  }, [done, scene]);
  if (done) return <p>done</p>;
  return (
    <Canvas shadows camera={{ fov: FOV, near: 0.05, far: 100 }} gl={{ toneMapping: THREE.NeutralToneMapping }} style={{ width: 400, height: 400 }}>
      <Suspense fallback={null}>
        {index === -1 ? (
          <RoomShot key="room" scene={scene} onDone={() => setIndex(0)} />
        ) : (
          <>
            <Lights size={2} />
            <ThumbShot key={item.id} scene={scene} item={item} onDone={() => setIndex((i) => i + 1)} />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}

export default function SheetPage({ mode, sceneId }) {
  const scene = SCENES_3D.find((s) => s.id === sceneId);
  if (!scene) return <p>No 3D scene "{sceneId}". Known: {SCENES_3D.map((s) => s.id).join(', ')}</p>;
  return mode === 'thumbs' ? <Thumbs scene={scene} /> : <Sheet scene={scene} />;
}

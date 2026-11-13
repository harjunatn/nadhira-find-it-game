// Developer-only pages for building 3D rooms (never part of the production build).
// They render pictures and POST them to scripts/dev3d-server.mjs, which writes them to disk.
//
//   ?dev3d=catalog&models=furniture/bear,food/apple&file=catalog   models side by side with sizes
//   ?dev3d=sheet&scene=bedroom-3d                                   the room from 6 angles + a labelled map
//   ?dev3d=thumbs&scene=bedroom-3d                                  the pictures the game shows (per object + room)
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Model } from '../Model.jsx';
import { modelUrl } from '../kit.js';
import { Lights } from '../RoomScene.jsx';
import SheetPage from './SheetPage.jsx';
import { drawLabel, post, project, snap, wait } from './tools.js';

const params = new URLSearchParams(window.location.search);

// ---------- catalog ----------

function CatalogShot({ cells, file, width, height }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    (async () => {
      await wait(700);
      const c = snap(gl, scene, camera, width, height);
      const ctx = c.getContext('2d');
      for (const cell of cells) {
        const [x, y] = project(camera, [cell.x, 0, cell.z + cell.gap * 0.46], width, height);
        drawLabel(ctx, cell.name, x, y, 14);
        drawLabel(ctx, cell.size, x, y + 15, 12);
      }
      await post(`renders/${file}.png`, c.toDataURL('image/png'));
      document.title = `saved ${file}`;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function Cell({ cell, onSize }) {
  return (
    <group position={[cell.x, 0, cell.z]}>
      <Model model={cell.model} scale={cell.scale} onBounds={(b) => onSize(cell, b)} />
      {/* red = +Z side, blue = +X side */}
      <mesh position={[0, 0.03, cell.gap * 0.36]}>
        <sphereGeometry args={[0.035]} />
        <meshBasicMaterial color="#ff2244" />
      </mesh>
      <mesh position={[cell.gap * 0.4, 0.03, 0]}>
        <sphereGeometry args={[0.035]} />
        <meshBasicMaterial color="#2255ff" />
      </mesh>
    </group>
  );
}

function Catalog() {
  const models = (params.get('models') || '').split(',').filter(Boolean);
  const cols = Number(params.get('cols') || 6);
  const gap = Number(params.get('gap') || 1.5);
  const scale = Number(params.get('scale') || 1);
  const rows = Math.ceil(models.length / cols);
  const cells = models.map((entry, i) => ({
    model: entry.split('@')[0],
    scale: Number(entry.split('@')[1] || scale),
    name: entry.split('/')[1],
    gap,
    size: '',
    x: ((i % cols) - (cols - 1) / 2) * gap,
    z: (Math.floor(i / cols) - (rows - 1) / 2) * gap,
  }));
  const onSize = (cell, b) => {
    cell.size = [b.size.x, b.size.y, b.size.z].map((v) => (v * cell.scale).toFixed(2)).join('×');
  };
  const gridW = cols * gap + 0.6;
  const gridD = rows * gap + 1.2;
  const width = 1500;
  const height = Math.round(Math.min(1400, Math.max(420, (width * (gridD * 0.62 + 1.2)) / gridW)));
  const fov = 18;
  const dir = new THREE.Vector3(0.22, 0.62, 0.75).normalize();
  const hHalf = Math.atan(Math.tan(THREE.MathUtils.degToRad(fov / 2)) * (width / height));
  const dist = Math.max(gridW / 2 / Math.tan(hHalf), (gridD * 0.62 + 1.2) / 2 / Math.tan(THREE.MathUtils.degToRad(fov / 2))) * 1.04;
  const span = Math.max(gridW, gridD);
  return (
    <Canvas shadows frameloop="demand" camera={{ fov, near: 0.1, far: 400, position: dir.multiplyScalar(dist).toArray() }} style={{ width, height, background: '#e8eef5' }}>
      <Lights size={span} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#dfe7ef" />
      </mesh>
      <gridHelper args={[60, 60 / gap, '#b9c6d4', '#cfd9e4']} position={[gap / 2, 0.002, gap / 2]} />
      <Suspense fallback={null}>
        {cells.map((cell) => (
          <Cell key={cell.name} cell={cell} onSize={onSize} />
        ))}
        <CatalogShot cells={cells} file={params.get('file') || 'catalog'} width={width} height={height} />
      </Suspense>
    </Canvas>
  );
}

export default function Dev3D() {
  const mode = params.get('dev3d');
  if (mode === 'catalog') return <Catalog />;
  if (mode === 'sheet' || mode === 'thumbs') return <SheetPage mode={mode} sceneId={params.get('scene')} />;
  return <p>Unknown dev3d mode. Preload example: {modelUrl('furniture/bear')}</p>;
}

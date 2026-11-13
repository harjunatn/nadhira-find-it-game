// The 3D view of a room as the game uses it: drag to turn, pinch to zoom, tap things.
import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { FOV, START, TARGET, fitDistance, placeCamera } from './camera.js';
import { RoomScene } from './RoomScene.jsx';

const SWEEP = 1.1; // the opening turn, so players see that the room is 3D

function Rig({ room, onTurn }) {
  const controls = useRef();
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const fit = fitDistance(room, size.width / size.height);
  const lastFit = useRef(0);
  const intro = useRef({ t: 0, done: false });

  // Keep the room filling the screen when the iPad is turned.
  useEffect(() => {
    if (!lastFit.current) {
      placeCamera(camera, START.az - SWEEP, START.pol, fit);
    } else {
      const dir = camera.position.clone().sub(TARGET);
      camera.position.copy(TARGET).add(dir.multiplyScalar(fit / lastFit.current));
    }
    lastFit.current = fit;
    if (controls.current) controls.current.update();
  }, [camera, fit]);

  useFrame((_, dt) => {
    const i = intro.current;
    if (i.done) return;
    i.t += Math.min(dt, 0.05);
    const p = Math.min(i.t / 2, 1);
    const ease = 1 - (1 - p) ** 3;
    placeCamera(camera, START.az - SWEEP * (1 - ease), START.pol, fit);
    if (controls.current) controls.current.update();
    if (p >= 1) i.done = true;
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      target={TARGET}
      minPolarAngle={0.4}
      maxPolarAngle={1.3}
      minDistance={fit * 0.45}
      maxDistance={fit * 1.15}
      enableDamping
      dampingFactor={0.12}
      rotateSpeed={0.85}
      zoomSpeed={0.7}
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      onStart={() => {
        intro.current.done = true;
        if (onTurn) onTurn();
      }}
    />
  );
}

function Loading() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="loading3d">
      <div className="loading3d-box">
        <div className="big-emoji">🧊</div>
        <div>Building the room… {Math.round(progress)}%</div>
      </div>
    </div>
  );
}

/**
 * scene   a 3D scene from src/three/scenes
 * states  { [itemId]: 'hint' | 'found' | 'wrong' }
 * bubble  { id, text } shown above one item
 * onTap   (item | null)
 * onTurn  called when the player starts turning the room
 */
export default function Stage3D({ scene, states, bubble, onTap, onTurn }) {
  return (
    <div className="stage3d">
      <Canvas shadows dpr={[1, 1.75]} camera={{ fov: FOV, near: 0.1, far: 80 }} gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}>
        <Suspense fallback={null}>
          <RoomScene scene={scene} states={states} bubble={bubble} onTap={onTap} />
        </Suspense>
        <Rig room={scene.room} onTurn={onTurn} />
      </Canvas>
      <Loading />
    </div>
  );
}

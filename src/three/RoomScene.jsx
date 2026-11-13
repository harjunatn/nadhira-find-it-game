// Everything that lives inside the 3D canvas: lights, the room shell and the things in it.
// Units are the Furniture Kit's own: one wall piece is 1 wide and 1.29 tall.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Model } from './Model.jsx';

export const WALL_H = 1.29;
const deg = (d) => ((d || 0) * Math.PI) / 180;

// The four walls. `ry` turns a wall so that its own +Z looks into the room;
// `sgn` converts a world coordinate along the wall into the wall's own X.
export const SIDES = {
  N: { ry: 0, sgn: 1, along: 'x' },
  S: { ry: Math.PI, sgn: -1, along: 'x' },
  W: { ry: Math.PI / 2, sgn: -1, along: 'z' },
  E: { ry: -Math.PI / 2, sgn: 1, along: 'z' },
};

export function wallOrigin(room, side) {
  if (side === 'N') return [0, 0, -room.d / 2];
  if (side === 'S') return [0, 0, room.d / 2];
  if (side === 'W') return [-room.w / 2, 0, 0];
  return [room.w / 2, 0, 0];
}

// Where an item is in the room (things on a wall are stored in the wall's own coordinates).
export function worldPosition(room, item) {
  if (item.segment) {
    const { side, index } = item.segment;
    const n = side === 'N' || side === 'S' ? room.w : room.d;
    const along = -n / 2 + 0.5 + index;
    const o = wallOrigin(room, side);
    return SIDES[side].along === 'x' ? [along, 0, o[2]] : [o[0], 0, along];
  }
  if (item.wall) {
    const [along, y = 0, out = 0] = item.at;
    const o = wallOrigin(room, item.wall);
    const inward = { N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0] }[item.wall];
    return SIDES[item.wall].along === 'x' ? [along, y, o[2] + inward[1] * out] : [o[0] + inward[0] * out, y, along];
  }
  return item.at;
}

// Soft studio lighting: an environment for gentle ambient shading plus one sun for shadows.
export function Lights({ size = 4, shadowSize = 2048 }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.6;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  const s = size * 0.9 + 1;
  return (
    <>
      <hemisphereLight args={['#ffffff', '#d8c8b8', 0.75]} />
      <directionalLight position={[size * 0.9, size * 2.2, size * 1.3]} intensity={1.55} castShadow shadow-mapSize={[shadowSize, shadowSize]} shadow-bias={-0.0003} shadow-normalBias={0.02}>
        <orthographicCamera attach="shadow-camera" args={[-s, s, s, -s, 0.1, size * 6]} />
      </directionalLight>
      {/* fill light from the other side so walls facing away from the sun are not gloomy */}
      <directionalLight position={[-size, size * 1.2, -size * 1.4]} intensity={0.55} />
    </>
  );
}

// ---------- floor ----------

function floorTexture({ type = 'wood', color = '#e2b07a', color2 }) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const g = c.getContext('2d');
  const base = new THREE.Color(color);
  const shade = (k) => `#${base.clone().multiplyScalar(k).getHexString()}`;
  g.fillStyle = color;
  g.fillRect(0, 0, 512, 512);
  if (type === 'wood') {
    // planks: 8 rows, staggered joints, slight colour differences
    for (let row = 0; row < 8; row++) {
      for (let k = 0; k < 3; k++) {
        const x = ((row % 2) * 128 + k * 256 + row * 37) % 512;
        g.fillStyle = shade(0.9 + ((row * 7 + k * 3) % 5) * 0.035);
        g.fillRect(x, row * 64, 256, 64);
        g.fillRect(x - 512, row * 64, 256, 64);
        g.fillStyle = shade(0.72);
        g.fillRect(x, row * 64, 3, 64);
        g.fillRect(x - 512, row * 64, 3, 64);
      }
      g.fillStyle = shade(0.72);
      g.fillRect(0, row * 64, 512, 3);
    }
  } else if (type === 'grass') {
    // soft patches of lighter and darker green (fixed pattern, so it never flickers)
    for (let i = 0; i < 70; i++) {
      const x = (i * 197) % 512;
      const y = (i * 331) % 512;
      const r = 26 + ((i * 53) % 40);
      g.fillStyle = shade(i % 2 ? 1.06 : 0.93);
      g.globalAlpha = 0.5;
      for (const [dx, dy] of [[0, 0], [512, 0], [-512, 0], [0, 512], [0, -512]]) {
        g.beginPath();
        g.ellipse(x + dx, y + dy, r, r * 0.6, (i % 5) * 0.6, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.globalAlpha = 1;
  } else if (type === 'tiles') {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        g.fillStyle = (i + j) % 2 ? color2 || shade(0.9) : color;
        g.fillRect(i * 128, j * 128, 128, 128);
      }
    }
    g.fillStyle = shade(0.78);
    for (let i = 0; i <= 4; i++) {
      g.fillRect(i * 128 - 2, 0, 4, 512);
      g.fillRect(0, i * 128 - 2, 512, 4);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function Floor({ room }) {
  const map = useMemo(() => {
    const t = floorTexture(room.floor || {});
    t.repeat.set(room.w / 2, room.d / 2);
    return t;
  }, [room]);
  useEffect(() => () => map.dispose(), [map]);
  const blob = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 40, 128, 128, 128);
    grad.addColorStop(0, 'rgba(40, 60, 90, 0.42)');
    grad.addColorStop(0.55, 'rgba(40, 60, 90, 0.2)');
    grad.addColorStop(1, 'rgba(40, 60, 90, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => blob.dispose(), [blob]);
  return (
    <group>
      {/* the wooden board the whole room stands on */}
      <mesh position={[0, -0.11, 0]} receiveShadow castShadow>
        <boxGeometry args={[room.w + 0.3, 0.2, room.d + 0.3]} />
        <meshStandardMaterial color={room.baseColor || (room.outdoor ? '#b98a5c' : '#f3e3cc')} roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.008, 0]} receiveShadow>
        <planeGeometry args={[room.w, room.d]} />
        <meshStandardMaterial map={map} roughness={0.85} />
      </mesh>
      {/* soft blob of shadow under the board */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.22, 0]}>
        <planeGeometry args={[room.w * 2.1, room.d * 2.1]} />
        <meshBasicMaterial map={blob} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

// ---------- things ----------

const HINT = '👇';

/**
 * One thing in the room. `state` is 'hint' | 'found' | 'wrong' | undefined.
 * Small findable things get an invisible, slightly bigger box around them so little fingers can hit them.
 */
function Item({ item, state, bubble, wallPiece = false }) {
  const anim = useRef(null);
  const since = useRef(0);
  const last = useRef(state);
  const [bounds, setBounds] = useState(null);
  const scale = item.scale || 1;

  useFrame(({ clock }) => {
    const g = anim.current;
    if (!g) return;
    const now = clock.elapsedTime;
    if (last.current !== state) {
      last.current = state;
      since.current = now;
    }
    const t = now - since.current;
    let y = 0;
    let ry = 0;
    let rz = 0;
    let s = 1;
    if (state === 'hint') {
      y = Math.abs(Math.sin(t * 4.2)) * 0.07;
      s = 1 + Math.abs(Math.sin(t * 4.2)) * 0.08;
    } else if (state === 'found') {
      const p = Math.min(t / 1.25, 1);
      const ease = 1 - (1 - p) ** 3;
      y = Math.sin(p * Math.PI) * 0.42 + (p >= 1 ? Math.sin((t - 1.25) * 3) * 0.015 + 0.02 : 0);
      ry = ease * Math.PI * 2;
      s = 1 + Math.sin(p * Math.PI) * 0.35;
    } else if (state === 'wrong') {
      const p = Math.min(t / 0.5, 1);
      rz = Math.sin(t * 34) * 0.13 * (1 - p);
    }
    // wall pieces stay put; only loose things jump and spin
    g.position.y = wallPiece ? 0 : y;
    g.rotation.y = wallPiece ? 0 : ry;
    g.rotation.z = rz;
    g.scale.setScalar(wallPiece ? 1 : s);
  });

  const size = bounds ? [bounds.size.x * scale, bounds.size.y * scale, bounds.size.z * scale] : null;
  const needsProxy = !!item.word && size && Math.max(size[0], size[2]) < 0.45;
  const top = size ? size[1] : 0.3;

  return (
    <group userData={{ itemId: item.id }}>
      <group ref={anim}>
        <Model model={item.model} scale={scale} tint={item.tint} animation={item.animation} castShadow={!wallPiece} onBounds={setBounds} />
      </group>
      {needsProxy && (
        <mesh visible={false} userData={{ proxy: true }} position={[0, Math.max(size[1] * 1.1, 0.3) / 2, 0]}>
          <boxGeometry args={[Math.max(size[0] * 1.25, 0.34), Math.max(size[1] * 1.1, 0.3), Math.max(size[2] * 1.25, 0.34)]} />
        </mesh>
      )}
      {state === 'found' && <Sparkles count={26} scale={[Math.max(top, 0.5) * 1.6, top + 0.7, Math.max(top, 0.5) * 1.6]} position={[0, top / 2 + 0.2, 0]} size={7} speed={0.9} color="#ffc93c" />}
      {state === 'hint' && (
        <Html position={[0, top + 0.16, 0]} center zIndexRange={[15, 0]} style={{ pointerEvents: 'none' }}>
          <div className="hint3d">{HINT}</div>
        </Html>
      )}
      {bubble && (
        <Html position={[0, top + 0.1, 0]} center zIndexRange={[16, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bubble3d">{bubble}</div>
        </Html>
      )}
    </group>
  );
}

// ---------- walls ----------

// A wall stands only while the camera is on the room side of it, so players can always look in.
function Wall({ room, side, items, states, bubble }) {
  const group = useRef();
  const shown = useRef(1);
  const n = side === 'N' || side === 'S' ? room.w : room.d;
  const origin = wallOrigin(room, side);
  const cfg = SIDES[side];
  const segments = useMemo(() => {
    const claimed = {};
    for (const it of items) if (it.segment && it.segment.side === side) claimed[it.segment.index] = it;
    return Array.from({ length: n }, (_, i) => claimed[i] || { id: `wall-${side}-${i}`, model: 'furniture/wall' });
  }, [items, side, n]);
  const hung = items.filter((it) => it.wall === side);
  const tintOf = (it) => ({ _defaultMat: room.wallColor || '#ffffff', ...(room.trimColor ? { wood: room.trimColor } : {}), ...(it.tint || {}) });

  useFrame(({ camera }, dt) => {
    const g = group.current;
    if (!g) return;
    const half = (cfg.along === 'x' ? room.d : room.w) / 2;
    const c = cfg.along === 'x' ? camera.position.z : camera.position.x;
    const outside = side === 'N' || side === 'W' ? c < -half : c > half;
    const k = Math.min(dt, 0.05) * 7;
    shown.current = THREE.MathUtils.clamp(shown.current + (outside ? -k : k), 0, 1);
    const e = shown.current * shown.current * (3 - 2 * shown.current);
    g.scale.y = Math.max(e, 0.0001);
    g.visible = shown.current > 0.02;
  });

  return (
    <group ref={group} position={origin} rotation-y={cfg.ry}>
      {segments.map((seg, i) => (
        <group key={seg.id} position={[(-n / 2 + 0.5 + i) * cfg.sgn, 0, -0.025]}>
          <Item item={{ ...seg, tint: tintOf(seg) }} state={states[seg.id]} bubble={bubble && bubble.id === seg.id ? bubble.text : null} wallPiece />
        </group>
      ))}
      {hung.map((it) => (
        <group key={it.id} position={[it.at[0] * cfg.sgn, it.at[1] || 0, it.at[2] || 0]} rotation-y={deg(it.ry)}>
          <Item item={it} state={states[it.id]} bubble={bubble && bubble.id === it.id ? bubble.text : null} />
        </group>
      ))}
    </group>
  );
}

// ---------- the whole room ----------

/**
 * scene   a 3D scene from src/three/scenes
 * states  { [itemId]: 'hint' | 'found' | 'wrong' }
 * bubble  { id, text } shown above one item
 * onTap   (item | null) — the thing that was tapped (null for floor, walls, scenery without a word)
 */
export function RoomScene({ scene, states = {}, bubble = null, onTap, shadowSize = 2048 }) {
  const { room, items } = scene;
  const byId = useMemo(() => Object.fromEntries(items.map((it) => [it.id, it])), [items]);
  const loose = items.filter((it) => !it.wall && !it.segment);

  function handleClick(e) {
    // Lowered walls (and what hangs on them) are invisible but still in the way of the ray: skip them.
    let itemId = null;
    for (let o = e.object; o; o = o.parent) {
      if (!o.visible && !o.userData.proxy) return;
      if (itemId === null && o.userData.itemId) itemId = o.userData.itemId;
    }
    e.stopPropagation();
    if (e.delta > 8 || !onTap) return;
    onTap(itemId && byId[itemId] ? byId[itemId] : null);
  }

  return (
    <>
      <Lights size={Math.max(room.w, room.d)} shadowSize={shadowSize} />
      <group onClick={handleClick}>
        <Floor room={room} />
        {!room.outdoor &&
          Object.keys(SIDES).map((side) => <Wall key={side} room={room} side={side} items={items} states={states} bubble={bubble} />)}
        {loose.map((it) => (
          <group key={it.id} position={it.at} rotation-y={deg(it.ry)}>
            <Item item={it} state={states[it.id]} bubble={bubble && bubble.id === it.id ? bubble.text : null} />
          </group>
        ))}
      </group>
    </>
  );
}

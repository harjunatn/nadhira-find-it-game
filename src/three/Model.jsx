import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneScene } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { modelUrl } from './kit.js';

const boundsCache = new Map();
const tintCache = new Map();
const prepared = new WeakSet();

// Kenney's Nature Kit greens are minty; these read better as grass and leaves.
const NATURE_COLOURS = { leafsGreen: '#56bf5b', leafsDark: '#3f9c50', grass: '#7bd168', leafsFall: '#f0a63a' };

// The Furniture and Nature Kit files store their colours as sRGB numbers where glTF
// expects linear ones, which makes everything look washed out. Fix each material once.
function prepare(model, scene) {
  if (prepared.has(scene)) return;
  prepared.add(scene);
  const nature = model.startsWith('nature/');
  if (!nature && !model.startsWith('furniture/')) return;
  const seen = new Set();
  scene.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (seen.has(m)) continue;
      seen.add(m);
      if (nature && NATURE_COLOURS[m.name]) m.color.set(NATURE_COLOURS[m.name]);
      else m.color.convertSRGBToLinear();
      if (m.name === 'lamp') {
        // lamp shades glow a little
        m.emissive = m.color.clone();
        m.emissiveIntensity = 0.35;
      }
    }
  });
}

// Size of a model file as it was authored (before our own position/scale).
export function modelBounds(url, scene) {
  let b = boundsCache.get(url);
  if (!b) {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    b = { min: box.min.clone(), max: box.max.clone(), size: box.getSize(new THREE.Vector3()), center: box.getCenter(new THREE.Vector3()) };
    boundsCache.set(url, b);
  }
  return b;
}

function tinted(material, color) {
  const key = `${material.uuid}|${color}`;
  let m = tintCache.get(key);
  if (!m) {
    m = material.clone();
    m.color = new THREE.Color(color);
    tintCache.set(key, m);
  }
  return m;
}

/**
 * One GLB model, re-centred so that its origin is the middle of its base:
 * `position` is where it stands and it turns around its own centre.
 *   tint       { materialName: '#rrggbb' } recolours parts (Furniture Kit materials are named)
 *   animation  name of a clip in the file to loop ("idle" for the Cube Pets)
 */
// "shape/disc" is a flat round plate one unit wide (ponds, puddles); tint.color sets its colour.
const DISC_BOUNDS = { min: new THREE.Vector3(-0.5, 0, -0.5), max: new THREE.Vector3(0.5, 0.012, 0.5), size: new THREE.Vector3(1, 0.012, 1), center: new THREE.Vector3(0, 0.006, 0) };

function Disc({ tint, onBounds, ...props }) {
  useEffect(() => {
    if (onBounds) onBounds(DISC_BOUNDS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <group {...props}>
      <mesh position={[0, 0.006, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.012, 40]} />
        <meshStandardMaterial color={(tint && tint.color) || '#4fb3ee'} roughness={0.18} metalness={0.05} />
      </mesh>
    </group>
  );
}

export function Model(props) {
  return props.model.startsWith('shape/') ? <Disc {...props} /> : <GlbModel {...props} />;
}

function GlbModel({ model, tint, animation, castShadow = true, receiveShadow = true, onBounds, children, ...props }) {
  const url = modelUrl(model);
  const gltf = useGLTF(url);
  const tintKey = tint ? JSON.stringify(tint) : '';

  const { object, bounds, mixer } = useMemo(() => {
    prepare(model, gltf.scene);
    const object = cloneScene(gltf.scene);
    object.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = castShadow;
      o.receiveShadow = receiveShadow;
      if (tint) {
        const swap = (m) => (tint[m.name] ? tinted(m, tint[m.name]) : m);
        o.material = Array.isArray(o.material) ? o.material.map(swap) : swap(o.material);
      }
    });
    const bounds = modelBounds(url, gltf.scene);
    let mixer = null;
    const clip = animation && gltf.animations.find((a) => a.name === animation);
    if (clip) {
      mixer = new THREE.AnimationMixer(object);
      mixer.clipAction(clip).play();
    }
    return { object, bounds, mixer };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf, url, tintKey, animation, castShadow, receiveShadow]);

  useEffect(() => {
    if (onBounds) onBounds(bounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds]);

  useFrame((_, dt) => {
    if (mixer) mixer.update(Math.min(dt, 0.1));
  });

  return (
    <group {...props}>
      <primitive object={object} position={[-bounds.center.x, -bounds.min.y, -bounds.center.z]} />
      {children}
    </group>
  );
}

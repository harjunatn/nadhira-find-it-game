import { useMemo, useRef } from 'react';
import { hitShape, hitTest, sceneSize } from '../lib/geometry.js';
import { clamp, useContainSize } from '../lib/util.js';
import { DebugLayer, SceneBackground, SceneObjects, ShapeOutline } from './SceneGraphics.jsx';

const DEBUG = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');

// Where to put a speech bubble for an object: just above it.
export function bubblePoint(obj) {
  const s = hitShape(obj);
  return { x: s.cx, y: s.cy - (s.type === 'rect' ? s.hh : s.r) * 0.75 };
}

/**
 * A scene that fills its parent (keeping its shape) and reports taps.
 * onTap(object | null, {x, y}) is called with the object that was tapped, in scene units.
 * `rotated` must be true when an ancestor is turned upside down (race mode, portrait).
 */
export default function SceneView({ scene, onTap, states, effects, rotated = false, interactive = true, className = '' }) {
  const { W, H } = sceneSize(scene);
  const outerRef = useRef(null);
  const boxRef = useRef(null);
  const { w, h } = useContainSize(outerRef, W / H);

  const rings = useMemo(
    () => (states ? scene.objects.filter((o) => states[o.id] === 'hint' || states[o.id] === 'found') : []),
    [scene, states],
  );

  function handlePointerDown(e) {
    if (!interactive || !onTap) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const rect = boxRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    let fx = (e.clientX - rect.left) / rect.width;
    let fy = (e.clientY - rect.top) / rect.height;
    if (rotated) {
      fx = 1 - fx;
      fy = 1 - fy;
    }
    const x = fx * W;
    const y = fy * H;
    onTap(hitTest(scene.objects, x, y), { x, y });
  }

  return (
    <div className={`scene-outer ${className}`} ref={outerRef}>
      <div className="scene-box" ref={boxRef} style={{ width: w, height: h }} onPointerDown={handlePointerDown}>
        <svg className="scene-svg" viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
          <SceneBackground scene={scene} />
          {/* glow under the object, outline over it so other things can't hide it */}
          {rings.map((o) => (
            <ShapeOutline key={o.id} obj={o} pad={1.08} className={`ring-fill ring-${states[o.id]}`} />
          ))}
          <SceneObjects scene={scene} states={states} />
          {rings.map((o) => (
            <ShapeOutline key={o.id} obj={o} pad={1.08} className={`ring ring-${states[o.id]}`} />
          ))}
          {DEBUG && <DebugLayer scene={scene} />}
        </svg>
        <div className="scene-fx">
          {rings
            .filter((o) => states[o.id] === 'hint')
            .map((o) => {
              const p = bubblePoint(o);
              return (
                <span key={o.id} className="hint-arrow" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>
                  👇
                </span>
              );
            })}
          {(effects || []).map((fx) => (
            <Effect key={fx.id} fx={fx} W={W} H={H} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BURST = ['⭐', '✨', '🌟', '🎉', '💛', '⭐', '✨', '🎈'];

function Burst({ style }) {
  const parts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
        const d = 80 + Math.random() * 90;
        return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, e: BURST[i % BURST.length], delay: Math.random() * 90, rot: Math.random() * 360 - 180 };
      }),
    [],
  );
  return (
    <div className="fx-burst" style={style}>
      {parts.map((p, i) => (
        <span key={i} style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--rot': `${p.rot}deg`, animationDelay: `${p.delay}ms` }}>
          {p.e}
        </span>
      ))}
    </div>
  );
}

function Effect({ fx, W, H }) {
  const left = (fx.x / W) * 100;
  const top = (fx.y / H) * 100;
  if (fx.type === 'ripple') return <span className="fx-ripple" style={{ left: `${left}%`, top: `${top}%` }} />;
  if (fx.type === 'burst') return <Burst style={{ left: `${left}%`, top: `${top}%` }} />;
  if (fx.type === 'plus') return <div className="fx-plus" style={{ left: `${left}%`, top: `${top}%` }}>{fx.text}</div>;
  if (fx.type === 'bubble') {
    const below = top < 18;
    return (
      <div className={`fx-bubble ${below ? 'below' : ''}`} style={{ left: `${clamp(left, 14, 86)}%`, top: `${clamp(top, 4, 96)}%` }}>
        <span>{fx.text}</span>
      </div>
    );
  }
  return null;
}

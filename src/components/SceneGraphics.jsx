// Pure SVG drawing of scenes and objects. Shared by the game and by
// scripts/render-scene.mjs, so keep it free of CSS imports and browser-only APIs.
import { memo } from 'react';
import { hitShape, sceneSize } from '../lib/geometry.js';

const EMOJI_FONT = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";

// An object's picture, drawn in a 100 x 100 box centred on (0, 0).
export function GlyphInner({ obj, upright = false }) {
  const Art = obj.art;
  const rotate = upright ? 0 : obj.rotate || 0;
  const flip = obj.flip ? -1 : 1;
  return (
    <g transform={`rotate(${rotate}) scale(${flip} 1)`}>
      {obj.emoji ? (
        <text x="0" y="0" fontSize="100" textAnchor="middle" dominantBaseline="central" fontFamily={EMOJI_FONT}>
          {obj.emoji}
        </text>
      ) : Art ? (
        <Art />
      ) : null}
    </g>
  );
}

export function ObjectGlyph({ obj, className }) {
  const s = (obj.size || 100) / 100;
  return (
    <g transform={`translate(${obj.x} ${obj.y}) scale(${s})`}>
      <g className={className}>
        <GlyphInner obj={obj} />
      </g>
    </g>
  );
}

export const SceneBackground = memo(function SceneBackground({ scene }) {
  const { W, H } = sceneSize(scene);
  if (scene.kind === 'photo') {
    return <image href={scene.image} x="0" y="0" width={W} height={H} preserveAspectRatio="none" />;
  }
  const Background = scene.Background;
  return Background ? <Background /> : <rect width={W} height={H} fill="#eef6ff" />;
});

export function SceneObjects({ scene, states }) {
  if (scene.kind === 'photo') return null;
  return (
    <g>
      {scene.objects.map((obj) => (
        <ObjectGlyph key={obj.id} obj={obj} className={states && states[obj.id] ? `obj-anim is-${states[obj.id]}` : 'obj-anim'} />
      ))}
    </g>
  );
}

export function ShapeOutline({ obj, pad = 1, ...rest }) {
  const shape = hitShape(obj);
  if (shape.type === 'rect') {
    return (
      <rect
        x={shape.cx - shape.hw * pad}
        y={shape.cy - shape.hh * pad}
        width={shape.hw * 2 * pad}
        height={shape.hh * 2 * pad}
        rx={Math.min(shape.hw, shape.hh) * 0.35}
        {...rest}
      />
    );
  }
  return <circle cx={shape.cx} cy={shape.cy} r={shape.r * pad} {...rest} />;
}

// Hit areas and names, for checking a scene by eye (add ?debug=1 to the URL).
export function DebugLayer({ scene }) {
  return (
    <g pointerEvents="none">
      {scene.objects.map((obj) => (
        <g key={obj.id}>
          <ShapeOutline obj={obj} fill="rgba(255,0,80,0.12)" stroke="#ff0050" strokeWidth="4" strokeDasharray="12 8" />
          <text
            x={obj.x}
            y={obj.y}
            fontSize="34"
            fontWeight="800"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff"
            stroke="#000"
            strokeWidth="8"
            paintOrder="stroke"
            fontFamily="sans-serif"
          >
            {obj.word}
          </text>
        </g>
      ))}
    </g>
  );
}

// Small picture of a whole scene (for menus).
export function SceneThumb({ scene, className }) {
  const { W, H } = sceneSize(scene);
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <SceneBackground scene={scene} />
      <SceneObjects scene={scene} />
    </svg>
  );
}

// Picture of a single object, for cards and the sticker book.
export function ObjectArt({ scene, obj, size = 120, className, style }) {
  if (scene && scene.kind === 'photo') {
    const r = hitShape(obj).R * 1.35;
    return (
      <svg
        className={className}
        style={style}
        width={size}
        height={size}
        viewBox={`${obj.x - r} ${obj.y - r} ${r * 2} ${r * 2}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <image href={scene.image} x="0" y="0" width={scene.width} height={scene.height} preserveAspectRatio="none" />
      </svg>
    );
  }
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-60 -60 120 120" aria-hidden="true">
      <GlyphInner obj={obj} upright />
    </svg>
  );
}

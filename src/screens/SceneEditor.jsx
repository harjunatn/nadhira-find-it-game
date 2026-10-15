import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from '../components/ui.jsx';
import { hitTest, sceneSize } from '../lib/geometry.js';
import { cropDataURL, savePhotoScene } from '../lib/storage.js';
import { clamp, uid, useContainSize, useMediaQuery } from '../lib/util.js';
import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

const MAX_SIDE = 1600;
const blank = (o) => !o.word || !o.word.trim();
const insetRect = (W, H, f = 0.04) => ({ x: W * f, y: H * f, w: W * (1 - 2 * f), h: H * (1 - 2 * f) });

// Move objects into a cropped/shrunk image's coordinates, dropping the ones that were cut off.
function remapObjects(objects, rect, scale) {
  return objects
    .filter((o) => o.x >= rect.x && o.x <= rect.x + rect.w && o.y >= rect.y && o.y <= rect.y + rect.h)
    .map((o) => ({ ...o, x: Math.round((o.x - rect.x) * scale), y: Math.round((o.y - rect.y) * scale), r: Math.max(12, Math.round(o.r * scale)) }));
}

export default function SceneEditor({ draft, isNew, go, refresh }) {
  const [scene, setScene] = useState(() => ({ ...draft, objects: draft.objects.map((o) => ({ ...o })) }));
  const [selectedId, setSelectedId] = useState(null);
  const [dirty, setDirty] = useState(isNew);
  const [cropping, setCropping] = useState(isNew);
  const [crop, setCrop] = useState(() => insetRect(draft.width, draft.height));
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const portrait = useMediaQuery('(orientation: portrait)');
  const { W, H } = sceneSize(scene);
  const outerRef = useRef(null);
  const boxRef = useRef(null);
  const wordRef = useRef(null);
  const drag = useRef(null);
  const focusNew = useRef(false);
  const { w, h } = useContainSize(outerRef, W / H);
  const big = Math.max(W, H);
  const defaultR = Math.round(big * 0.05);
  const labelSize = Math.round(big * 0.024);
  const handleR = big * 0.022;

  const selected = scene.objects.find((o) => o.id === selectedId) || null;
  const selectedIndex = selected ? scene.objects.indexOf(selected) : -1;

  useEffect(() => {
    if (focusNew.current && wordRef.current) {
      focusNew.current = false;
      wordRef.current.focus();
    }
  }, [selectedId]);

  function patchObj(id, patch) {
    setScene((s) => ({ ...s, objects: s.objects.map((o) => (o.id === id ? { ...o, ...patch } : o)) }));
    setDirty(true);
  }

  // Switching away from a marker that never got a name throws it away.
  function select(id) {
    setScene((s) => ({ ...s, objects: s.objects.filter((o) => o.id === id || o.id !== selectedId || !blank(o)) }));
    setSelectedId(id);
  }

  function toScene(e) {
    const rect = boxRef.current.getBoundingClientRect();
    return { x: clamp(((e.clientX - rect.left) / rect.width) * W, 0, W), y: clamp(((e.clientY - rect.top) / rect.height) * H, 0, H) };
  }

  function capture(e) {
    try {
      boxRef.current.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (busy) return;
    const p = toScene(e);

    if (cropping) {
      const corners = { tl: [crop.x, crop.y], tr: [crop.x + crop.w, crop.y], bl: [crop.x, crop.y + crop.h], br: [crop.x + crop.w, crop.y + crop.h] };
      let mode = null;
      let best = handleR * 2.2;
      for (const [k, [cx, cy]] of Object.entries(corners)) {
        const d = Math.hypot(p.x - cx, p.y - cy);
        if (d < best) {
          best = d;
          mode = k;
        }
      }
      if (!mode && p.x > crop.x && p.x < crop.x + crop.w && p.y > crop.y && p.y < crop.y + crop.h) mode = 'move';
      if (!mode) return;
      drag.current = { crop: true, mode, start: p, orig: crop, pointerId: e.pointerId };
      capture(e);
      return;
    }

    const hit = hitTest(scene.objects, p.x, p.y);
    if (hit) {
      if (hit.id !== selectedId) select(hit.id);
      drag.current = { id: hit.id, dx: hit.x - p.x, dy: hit.y - p.y, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, moved: false };
      capture(e);
      return;
    }
    const obj = { id: uid('o'), word: '', wordId: '', sentence: '', sentenceId: '', question: '', questionId: '', answer: '', x: Math.round(p.x), y: Math.round(p.y), r: defaultR };
    setScene((s) => ({ ...s, objects: [...s.objects.filter((o) => o.id !== selectedId || !blank(o)), obj] }));
    focusNew.current = true;
    setSelectedId(obj.id);
    setDirty(true);
    sfx.pop();
  }

  function onPointerMove(e) {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const p = toScene(e);

    if (d.crop) {
      const o = d.orig;
      const dx = p.x - d.start.x;
      const dy = p.y - d.start.y;
      const min = big * 0.1;
      if (d.mode === 'move') {
        setCrop({ ...o, x: clamp(o.x + dx, 0, W - o.w), y: clamp(o.y + dy, 0, H - o.h) });
        return;
      }
      let l = o.x;
      let t = o.y;
      let r = o.x + o.w;
      let b = o.y + o.h;
      if (d.mode.includes('l')) l = clamp(o.x + dx, 0, r - min);
      if (d.mode.includes('r')) r = clamp(o.x + o.w + dx, l + min, W);
      if (d.mode.includes('t')) t = clamp(o.y + dy, 0, b - min);
      if (d.mode.includes('b')) b = clamp(o.y + o.h + dy, t + min, H);
      setCrop({ x: l, y: t, w: r - l, h: b - t });
      return;
    }

    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < 6) return;
    d.moved = true;
    patchObj(d.id, { x: Math.round(clamp(p.x + d.dx, 0, W)), y: Math.round(clamp(p.y + d.dy, 0, H)) });
  }

  function onPointerUp(e) {
    if (drag.current && drag.current.pointerId === e.pointerId) drag.current = null;
  }

  function remove(id) {
    setScene((s) => ({ ...s, objects: s.objects.filter((o) => o.id !== id) }));
    setSelectedId(null);
    setDirty(true);
  }

  function startCrop() {
    select(null);
    setCrop({ x: 0, y: 0, w: W, h: H });
    setCropping(true);
  }

  async function applyCrop() {
    const rect = { x: Math.round(crop.x), y: Math.round(crop.y), w: Math.round(crop.w), h: Math.round(crop.h) };
    setBusy(true);
    setError('');
    try {
      const out = await cropDataURL(scene.image, rect, MAX_SIDE);
      setScene((s) => ({ ...s, image: out.image, width: out.width, height: out.height, objects: remapObjects(s.objects.filter((o) => !blank(o)), rect, out.scale) }));
      setCropping(false);
      setDirty(true);
      sfx.pop();
    } catch (err) {
      setError(`Could not crop (${err && err.message ? err.message : 'error'}).`);
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    setError('');
    try {
      let final = { ...scene, objects: scene.objects.filter((o) => !blank(o)) };
      // New photos are kept large while cropping; store at most 1600 px.
      if (Math.max(W, H) > MAX_SIDE) {
        const rect = { x: 0, y: 0, w: W, h: H };
        const out = await cropDataURL(scene.image, rect, MAX_SIDE);
        final = { ...final, image: out.image, width: out.width, height: out.height, objects: remapObjects(final.objects, rect, out.scale) };
      }
      final = {
        ...final,
        title: (final.title || '').trim() || 'My scene',
        updatedAt: Date.now(),
        objects: final.objects.map((o) => ({
          ...o,
          word: o.word.trim(),
          wordId: (o.wordId || '').trim(),
          sentence: (o.sentence || '').trim(),
          sentenceId: (o.sentenceId || '').trim(),
          question: (o.question || '').trim(),
          questionId: (o.questionId || '').trim(),
          answer: (o.answer || '').trim(),
        })),
      };
      await savePhotoScene(final);
      await refresh();
      sfx.star();
      go('photos');
    } catch (err) {
      setError(`Could not save (${err && err.message ? err.message : 'storage error'}).`);
    } finally {
      setBusy(false);
    }
  }

  const named = scene.objects.filter((o) => !blank(o));
  const corners = [
    [crop.x, crop.y],
    [crop.x + crop.w, crop.y],
    [crop.x, crop.y + crop.h],
    [crop.x + crop.w, crop.y + crop.h],
  ];

  return (
    <div className={`screen editor ${portrait ? 'portrait' : 'landscape'}`}>
      <header className="editor-top">
        <button type="button" className="icon-btn" aria-label="Back" onClick={() => (dirty ? setConfirmLeave(true) : go('photos'))}>
          ⬅️
        </button>
        <input
          className="title-input"
          value={scene.title}
          placeholder="Scene name (e.g. Busy Street)"
          maxLength={30}
          onChange={(e) => {
            setScene((s) => ({ ...s, title: e.target.value }));
            setDirty(true);
          }}
        />
        <button type="button" className="btn btn-play" disabled={busy || cropping} onClick={save}>
          {busy ? '⏳' : '💾 Save'}
        </button>
      </header>
      {error && <p className="error center">{error}</p>}

      <div className="editor-body">
        <div className="editor-stage" ref={outerRef}>
          <div
            className="scene-box editor-box"
            ref={boxRef}
            style={{ width: w, height: h }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
              <image href={scene.image} x="0" y="0" width={W} height={H} preserveAspectRatio="none" />
              {cropping ? (
                <g>
                  <path
                    d={`M0 0H${W}V${H}H0Z M${crop.x} ${crop.y}H${crop.x + crop.w}V${crop.y + crop.h}H${crop.x}Z`}
                    fill="rgba(15,20,40,0.62)"
                    fillRule="evenodd"
                  />
                  <rect className="crop-rect" x={crop.x} y={crop.y} width={crop.w} height={crop.h} />
                  {corners.map(([cx, cy], i) => (
                    <circle key={i} className="crop-handle" cx={cx} cy={cy} r={handleR} />
                  ))}
                </g>
              ) : (
                scene.objects.map((o, i) => (
                  <g key={o.id} className={`marker ${o.id === selectedId ? 'sel' : ''}`}>
                    <circle cx={o.x} cy={o.y} r={o.r} />
                    <text x={o.x} y={o.y - o.r - labelSize * 0.4} fontSize={labelSize} strokeWidth={labelSize * 0.22} textAnchor="middle">
                      {blank(o) ? `#${i + 1} ?` : o.word}
                    </text>
                  </g>
                ))
              )}
            </svg>
          </div>
        </div>

        <aside className="editor-panel">
          {cropping ? (
            <div className="editor-help">
              <h3>✂️ Crop the photo</h3>
              <p>Drag the yellow corners so the box holds only the picture.</p>
              <p className="id-text">Geser sudut kuning supaya kotak hanya berisi gambarnya (tanpa lantai/meja). Geser bagian tengah untuk memindahkan kotak.</p>
              <div className="row gap wrap">
                <button type="button" className="btn btn-play" disabled={busy} onClick={applyCrop}>
                  {busy ? '⏳' : '✓ Use this part'}
                </button>
                <button type="button" className="btn btn-plain small" disabled={busy} onClick={() => setCropping(false)}>
                  {isNew && !named.length ? 'Skip' : 'Cancel'}
                </button>
              </div>
              <button type="button" className="link-btn" onClick={() => setCrop({ x: 0, y: 0, w: W, h: H })}>
                Whole photo · Seluruh foto
              </button>
            </div>
          ) : selected ? (
            <div className="editor-form" key={selected.id}>
              <div className="row between">
                <h3>Thing #{selectedIndex + 1}</h3>
                <button type="button" className="btn btn-plain small" onClick={() => select(null)}>
                  ✓ Done
                </button>
              </div>
              <label className="field">
                <span className="field-label">English word * · Nama benda (Inggris)</span>
                <input ref={wordRef} value={selected.word} placeholder="e.g. bus" autoCapitalize="none" autoCorrect="off" maxLength={30} onChange={(e) => patchObj(selected.id, { word: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Arti (Indonesia)</span>
                <input value={selected.wordId || ''} placeholder="mis. bus" maxLength={30} onChange={(e) => patchObj(selected.id, { wordId: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Sentence · Kalimat (Inggris)</span>
                <input value={selected.sentence || ''} placeholder={`e.g. The ${selected.word || 'bus'} is big.`} maxLength={80} onChange={(e) => patchObj(selected.id, { sentence: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Arti kalimat</span>
                <input value={selected.sentenceId || ''} placeholder="mis. Busnya besar." maxLength={80} onChange={(e) => patchObj(selected.id, { sentenceId: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Question to talk about · Pertanyaan</span>
                <input value={selected.question || ''} placeholder={`e.g. What color is the ${selected.word || 'bus'}?`} maxLength={80} onChange={(e) => patchObj(selected.id, { question: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Arti pertanyaan</span>
                <input value={selected.questionId || ''} placeholder="mis. Busnya warna apa?" maxLength={80} onChange={(e) => patchObj(selected.id, { questionId: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Answer idea · Contoh jawaban</span>
                <input value={selected.answer || ''} placeholder={`e.g. The ${selected.word || 'bus'} is red.`} maxLength={80} onChange={(e) => patchObj(selected.id, { answer: e.target.value })} />
              </label>
              <label className="field">
                <span className="field-label">Circle size · Ukuran lingkaran</span>
                <input type="range" min={Math.round(defaultR * 0.4)} max={Math.round(defaultR * 4)} value={selected.r} onChange={(e) => patchObj(selected.id, { r: Number(e.target.value) })} />
              </label>
              <p className="id-text">Geser lingkaran untuk memindahkan. Lingkaran = area yang harus di-tap.</p>
              <div className="row gap wrap">
                <button type="button" className="btn btn-blue small" disabled={blank(selected)} onClick={() => speak([selected.word, selected.sentence].filter(Boolean))}>
                  🔊 Listen
                </button>
                <button type="button" className="btn btn-red small" onClick={() => remove(selected.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="editor-help">
              <h3>👆 Tap the picture to mark a thing</h3>
              <p className="id-text">Tap benda di foto, lalu ketik nama bahasa Inggrisnya. Tap lingkaran untuk mengubah, geser untuk memindahkan.</p>
              <div className="marked-list">
                {named.map((o) => (
                  <button type="button" key={o.id} className="chip" onClick={() => select(o.id)}>
                    {o.word}
                  </button>
                ))}
              </div>
              <p className="muted">
                {named.length} marked {named.length < 3 && '· mark at least 3 to make it fun!'}
              </p>
              <button type="button" className="btn btn-plain small" onClick={startCrop}>
                ✂️ Crop photo
              </button>
            </div>
          )}
        </aside>
      </div>

      {confirmLeave && (
        <ConfirmDialog
          title="Leave without saving?"
          message="Perubahan belum disimpan akan hilang."
          confirmText="Leave"
          cancelText="Stay"
          danger
          onCancel={() => setConfirmLeave(false)}
          onConfirm={() => go('photos')}
        />
      )}
    </div>
  );
}

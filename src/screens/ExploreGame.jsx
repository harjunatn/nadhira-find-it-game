import { useEffect, useMemo, useState } from 'react';
import SceneView, { bubblePoint } from '../components/SceneView.jsx';
import { FoundCard, sentenceOf } from '../components/GameParts.jsx';
import { useSettings } from '../settings.jsx';
import { speak, stopSpeech } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';
import { useEffectsLayer, useMediaQuery } from '../lib/util.js';

// No race: tap anything in the picture to hear its name. A calm warm-up before playing.
export default function ExploreGame({ scene, onExit }) {
  const { settings } = useSettings();
  const portrait = useMediaQuery('(orientation: portrait)');
  const [selected, setSelected] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const fx = useEffectsLayer();

  useEffect(() => {
    const t = setTimeout(() => speak(`Let's explore the ${scene.title.toLowerCase()}! Tap anything.`), 400);
    return () => {
      clearTimeout(t);
      stopSpeech();
    };
  }, [scene]);

  const states = useMemo(() => (selected ? { [selected.id]: 'found' } : {}), [selected]);

  function handleTap(obj, point) {
    if (!obj) {
      sfx.tap();
      fx.add({ type: 'ripple', ...point }, 700);
      return;
    }
    sfx.pop();
    setSelected(obj);
    setSeen((s) => new Set(s).add(obj.id));
    fx.add({ type: 'bubble', ...bubblePoint(obj), text: obj.word }, 1500);
    speak([`The ${obj.word}.`, sentenceOf(obj)]);
  }

  return (
    <div className={`screen game explore ${portrait ? 'portrait' : 'landscape'}`}>
      <header className="game-top">
        <button type="button" className="icon-btn" aria-label="Home" onClick={onExit}>
          🏠
        </button>
        <div className="explore-title">
          <div className="target-word">Tap anything! 👆</div>
          {settings.showIndonesian && <div className="id-text">Tap apa saja untuk dengar namanya</div>}
        </div>
        <div className="game-top-right">
          <div className="round-pill">
            👀 {seen.size}/{scene.objects.length}
          </div>
        </div>
      </header>
      <main className="explore-main">
        <SceneView scene={scene} onTap={handleTap} states={states} effects={fx.effects} />
        <aside className="explore-info">
          {selected ? (
            <FoundCard compact scene={scene} obj={selected} showIndonesian={settings.showIndonesian} />
          ) : (
            <div className="explore-empty">
              <div className="big-emoji">👆</div>
              <p>Tap something in the picture.</p>
              {settings.showIndonesian && <p className="id-text">Tap benda di gambar untuk mendengar namanya.</p>}
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

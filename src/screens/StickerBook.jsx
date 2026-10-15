import { useState } from 'react';
import { ObjectArt } from '../components/SceneGraphics.jsx';
import { FoundCard, sentenceOf } from '../components/GameParts.jsx';
import { Modal, TopBar } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { loadProgress } from '../lib/storage.js';
import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

// Every object found in a game becomes a sticker. Missing ones show as mystery shadows.
export default function StickerBook({ scenes, go }) {
  const { settings } = useSettings();
  const [progress] = useState(loadProgress);
  const list = scenes.filter((s) => s.objects.length > 0);
  const [sceneId, setSceneId] = useState(list[0] ? list[0].id : null);
  const [open, setOpen] = useState(null);
  const scene = list.find((s) => s.id === sceneId) || list[0];

  const gotIn = (s) => s.objects.filter((o) => (progress[s.id] || {})[o.id]).length;
  const total = list.reduce((n, s) => n + s.objects.length, 0);
  const got = list.reduce((n, s) => n + gotIn(s), 0);

  return (
    <div className="screen stickers scroll">
      <TopBar
        title="Sticker Book"
        subtitle="Koleksi stiker kata"
        onBack={() => go('home')}
        right={
          <div className="round-pill">
            ⭐ {got}/{total}
          </div>
        }
      />
      <div className="tabs">
        {list.map((s) => (
          <button
            type="button"
            key={s.id}
            className={`tab ${s.id === scene?.id ? 'on' : ''}`}
            onClick={() => {
              sfx.tap();
              setSceneId(s.id);
            }}
          >
            {s.icon || '📷'} {s.title} <span className="tab-count">{gotIn(s)}/{s.objects.length}</span>
          </button>
        ))}
      </div>

      {scene && (
        <div className="sticker-grid">
          {scene.objects.map((o) => {
            const n = (progress[scene.id] || {})[o.id] || 0;
            return (
              <button
                type="button"
                key={o.id}
                className={`sticker ${n ? 'got' : 'missing'}`}
                onClick={() => {
                  if (n) {
                    sfx.pop();
                    setOpen(o);
                    speak([o.word, sentenceOf(o)]);
                  } else {
                    sfx.tap();
                    speak(`Can you find me in the ${scene.title.toLowerCase()}?`);
                  }
                }}
              >
                <ObjectArt scene={scene} obj={o} size={84} className="sticker-art" />
                <span className="sticker-word">{n ? o.word : '???'}</span>
                {n > 1 && <span className="sticker-badge">×{n}</span>}
              </button>
            );
          })}
        </div>
      )}
      {!scene && <p className="center muted">No scenes yet.</p>}

      {open && scene && (
        <Modal onClose={() => setOpen(null)} className="sticker-modal">
          <FoundCard scene={scene} obj={open} title="⭐ Sticker" showIndonesian={settings.showIndonesian}>
            <button type="button" className="btn btn-blue" onClick={() => setOpen(null)}>
              Close
            </button>
          </FoundCard>
        </Modal>
      )}
    </div>
  );
}

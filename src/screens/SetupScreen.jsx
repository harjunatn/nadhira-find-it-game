import { useState } from 'react';
import { SceneThumb } from '../components/SceneGraphics.jsx';
import { Avatar, Chips, TopBar } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { loadProgress } from '../lib/storage.js';
import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

const MODES = [
  { id: 'together', icon: '🤝', title: 'Together', en: 'One big picture. Then pick who found it.', id_: 'Satu gambar besar, lalu pilih siapa yang menemukan.' },
  { id: 'race', icon: '🏁', title: 'Race!', en: 'Split screen. First tap wins!', id_: 'Layar dibagi dua, siapa cepat dia dapat!' },
  { id: 'explore', icon: '👀', title: 'Explore', en: 'Tap anything to hear its name.', id_: 'Tap apa saja untuk dengar namanya. Cocok untuk pemanasan.' },
];

export default function SetupScreen({ scenes, initialSceneId, go, onStart }) {
  const { settings, update } = useSettings();
  const [selectedId, setSelectedId] = useState(initialSceneId || null);
  const [progress] = useState(loadProgress);
  const playable = scenes.filter((s) => s.objects.length > 0);
  const selected = playable.find((s) => s.id === selectedId);

  function pick(scene) {
    sfx.pop();
    setSelectedId(scene.id);
    speak(scene.title);
  }

  return (
    <div className="screen setup scroll">
      <TopBar title="Where shall we play?" subtitle="Mau main di mana?" onBack={() => go('home')} />

      <div className="players-row">
        {settings.players.map((p, i) => (
          <button type="button" key={i} className="player-pill" style={{ '--pc': p.color }} onClick={() => go('settings')}>
            <Avatar player={p} /> {p.name}
          </button>
        ))}
        <button type="button" className="link-btn" onClick={() => go('settings')}>
          ✏️ Change names
        </button>
      </div>

      <div className="scene-grid">
        {playable.map((s) => {
          const got = Object.keys(progress[s.id] || {}).filter((id) => s.objects.some((o) => o.id === id)).length;
          return (
            <button type="button" key={s.id} className={`scene-card ${s.id === selectedId ? 'selected' : ''}`} onClick={() => pick(s)}>
              <SceneThumb scene={s} className="scene-thumb" />
              <div className="scene-card-body">
                <div className="scene-card-title">
                  {s.icon || '📷'} {s.title}
                </div>
                {settings.showIndonesian && s.titleId && <div className="id-text">{s.titleId}</div>}
                <div className="scene-progress">
                  ⭐ {got}/{s.objects.length}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="setup-footer">
        <div className="mode-grid">
          {MODES.map((m) => (
            <button
              type="button"
              key={m.id}
              className={`mode-card ${settings.mode === m.id ? 'on' : ''}`}
              onClick={() => {
                sfx.tap();
                update({ mode: m.id });
              }}
            >
              <span className="mode-icon">{m.icon}</span>
              <span className="mode-title">{m.title}</span>
              <span className="mode-desc">{m.en}</span>
              {settings.showIndonesian && <span className="id-text">{m.id_}</span>}
            </button>
          ))}
        </div>
        <div className="setup-actions">
          {settings.mode !== 'explore' && (
            <div className="rounds">
              <span className="rounds-label">Level</span>
              <Chips
                value={settings.difficulty}
                onChange={(v) => update({ difficulty: v })}
                options={[
                  { value: 'easy', label: '😊 Easy' },
                  { value: 'hard', label: '🔎 Hard' },
                ]}
              />
            </div>
          )}
          {settings.mode !== 'explore' && settings.difficulty === 'hard' && settings.showIndonesian && (
            <span className="id-text">Benda lebih kecil & ada yang tersembunyi di balik kardus/semak</span>
          )}
          {settings.mode !== 'explore' && (
            <div className="rounds">
              <span className="rounds-label">How many?</span>
              <Chips
                value={settings.rounds}
                onChange={(v) => update({ rounds: v })}
                options={[
                  { value: 5, label: '5' },
                  { value: 8, label: '8' },
                  { value: 12, label: '12' },
                  { value: 'all', label: 'All' },
                ]}
              />
            </div>
          )}
          <button
            type="button"
            className="btn btn-big btn-play start-btn"
            disabled={!selected}
            onClick={() => {
              sfx.go();
              onStart(selected.id, settings.mode);
            }}
          >
            {selected ? `Start ▶` : 'Pick a place'}
          </button>
        </div>
      </div>
    </div>
  );
}

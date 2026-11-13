import { useState } from 'react';
import { Avatar, Chips, TopBar } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { loadProgress } from '../lib/storage.js';
import { sfx } from '../lib/sfx.js';

const MODES = [
  { id: 'together', icon: '🤝', title: 'Together', en: 'One big room. Then pick who found it.', id_: 'Satu ruangan besar, lalu pilih siapa yang menemukan.' },
  { id: 'race', icon: '🏁', title: 'Race!', en: 'Split screen. Each player turns their own room.', id_: 'Layar dibagi dua, masing-masing memutar ruangannya sendiri.' },
];

// Pick a 3D room for hide and seek.
export default function Setup3D({ scenes, initialSceneId, go, onStart }) {
  const { settings, update } = useSettings();
  const [selectedId, setSelectedId] = useState(initialSceneId || (scenes.length === 1 ? scenes[0].id : null));
  const [progress] = useState(loadProgress);
  const selected = scenes.find((s) => s.id === selectedId);

  function pick(scene) {
    sfx.pop();
    setSelectedId(scene.id);
  }

  return (
    <div className="screen setup scroll">
      <TopBar title="3D Hide & Seek" subtitle="Petak umpet 3D: putar ruangannya, cari bendanya" onBack={() => go('home')} />

      <div className="players-row">
        {settings.players.map((p, i) => (
          <button type="button" key={i} className="player-pill" style={{ '--pc': p.color }} onClick={() => go('settings')}>
            <Avatar player={p} /> {p.name}
          </button>
        ))}
      </div>

      <div className="scene-grid">
        {scenes.map((s) => {
          const got = Object.keys(progress[s.id] || {}).filter((id) => s.objects.some((o) => o.id === id)).length;
          return (
            <button type="button" key={s.id} className={`scene-card ${s.id === selectedId ? 'selected' : ''}`} onClick={() => pick(s)}>
              <img className="scene-thumb" src={s.thumb} alt="" />
              <div className="scene-card-body">
                <div className="scene-card-title">
                  {s.icon} {s.title} <span className="badge-3d">3D</span>
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
        <div className="mode-3d">
          <div className="mode-grid two">
            {MODES.map((m) => (
              <button
                type="button"
                key={m.id}
                className={`mode-card ${settings.mode3d === m.id ? 'on' : ''}`}
                onClick={() => {
                  sfx.tap();
                  update({ mode3d: m.id });
                }}
              >
                <span className="mode-icon">{m.icon}</span>
                <span className="mode-title">{m.title}</span>
                <span className="mode-desc">{m.en}</span>
                {settings.showIndonesian && <span className="id-text">{m.id_}</span>}
              </button>
            ))}
          </div>
          <div className="tips-3d">
            <b>👆 Drag</b> to turn the room · <b>🤏 Pinch</b> to zoom · <b>Tap</b> what you find
          </div>
        </div>
        <div className="setup-actions">
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
          <button
            type="button"
            className="btn btn-big btn-play start-btn"
            disabled={!selected}
            onClick={() => {
              sfx.go();
              onStart(selected.id, settings.mode3d);
            }}
          >
            {selected ? 'Start ▶' : 'Pick a room'}
          </button>
        </div>
      </div>
    </div>
  );
}

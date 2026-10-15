import { useEffect, useState } from 'react';
import { Avatar, Chips, ConfirmDialog, TopBar, Toggle } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { AVATARS, PLAYER_COLORS, resetProgress } from '../lib/storage.js';
import { currentVoiceName, englishVoices, onVoicesChanged, speak, speechSupported } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

export default function SettingsScreen({ go }) {
  const { settings, update } = useSettings();
  const [voices, setVoices] = useState(englishVoices);
  const [voiceName, setVoiceName] = useState(currentVoiceName);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  useEffect(
    () =>
      onVoicesChanged(() => {
        setVoices(englishVoices());
        setVoiceName(currentVoiceName());
      }),
    [],
  );

  function setPlayer(i, patch) {
    update((s) => ({ players: s.players.map((p, j) => (j === i ? { ...p, ...patch } : p)) }));
  }

  return (
    <div className="screen settings scroll">
      <TopBar title="Settings" subtitle="Pengaturan" onBack={() => go('home')} />

      <section className="panel">
        <h2 className="section-title">Players · Pemain</h2>
        <div className="players-edit">
          {settings.players.map((p, i) => (
            <div key={i} className="player-edit" style={{ '--pc': p.color }}>
              <div className="row gap">
                <Avatar player={p} size="lg" />
                <label className="field grow">
                  <span className="field-label">Player {i + 1} name {i === 0 ? '(the little one)' : '(grown-up)'}</span>
                  <input value={p.name} maxLength={14} onChange={(e) => setPlayer(i, { name: e.target.value })} onBlur={(e) => !e.target.value.trim() && setPlayer(i, { name: `Player ${i + 1}` })} />
                </label>
              </div>
              <div className="avatar-picker">
                {AVATARS.map((a) => (
                  <button type="button" key={a} className={`avatar-opt ${p.avatar === a ? 'on' : ''}`} onClick={() => { sfx.tap(); setPlayer(i, { avatar: a }); }}>
                    {a}
                  </button>
                ))}
              </div>
              <div className="color-picker">
                {PLAYER_COLORS.map((c) => (
                  <button type="button" key={c} aria-label={`Colour ${c}`} className={`color-opt ${p.color === c ? 'on' : ''}`} style={{ background: c }} onClick={() => setPlayer(i, { color: c })} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2 className="section-title">Game · Permainan</h2>
        <Toggle label="Show Indonesian meaning" sub="Tampilkan arti bahasa Indonesia" checked={settings.showIndonesian} onChange={(v) => update({ showIndonesian: v })} />
        <Toggle label="Show the picture of what to find" sub="Matikan untuk mode sulit: hanya kata & suara" checked={settings.showPicture} onChange={(v) => update({ showPicture: v })} />
        <div className="setting-row">
          <div>
            <div className="toggle-label">Glowing hint after…</div>
            <div className="id-text">Benda berkedip sebagai petunjuk setelah beberapa detik</div>
          </div>
          <Chips value={settings.autoHint} onChange={(v) => update({ autoHint: v })} options={[{ value: 0, label: 'Off' }, { value: 10, label: '10s' }, { value: 15, label: '15s' }, { value: 25, label: '25s' }]} />
        </div>
        <div className="setting-row">
          <div>
            <div className="toggle-label">Race: {settings.players[1].name} waits…</div>
            <div className="id-text">Beri {settings.players[0].name} kesempatan mencari duluan (mode Race)</div>
          </div>
          <Chips value={settings.headStart} onChange={(v) => update({ headStart: v })} options={[{ value: 0, label: '0s' }, { value: 3, label: '3s' }, { value: 5, label: '5s' }, { value: 8, label: '8s' }]} />
        </div>
      </section>

      <section className="panel">
        <h2 className="section-title">Sound · Suara</h2>
        <Toggle label="English voice" sub="Suara pembaca bahasa Inggris" checked={settings.voice} onChange={(v) => update({ voice: v })} />
        <Toggle label="Sound effects" sub="Efek suara" checked={settings.sfx} onChange={(v) => update({ sfx: v })} />
        {speechSupported() ? (
          <>
            <div className="setting-row">
              <div>
                <div className="toggle-label">Voice</div>
                <div className="id-text">Pilih suara. Di iPad bisa unduh suara lebih bagus: Settings › Accessibility › Spoken Content › Voices › English.</div>
              </div>
              <select
                className="select"
                value={voices.some((v) => v.name === voiceName) ? voiceName : ''}
                onChange={(e) => {
                  update({ voiceName: e.target.value });
                  setTimeout(() => setVoiceName(currentVoiceName()), 0);
                }}
              >
                <option value="">Automatic</option>
                {voices.map((v) => (
                  <option key={v.voiceURI || v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
            <div className="setting-row">
              <div>
                <div className="toggle-label">Speaking speed</div>
                <div className="id-text">Kecepatan bicara</div>
              </div>
              <Chips value={settings.speechRate} onChange={(v) => update({ speechRate: v })} options={[{ value: 0.7, label: '🐢 Slow' }, { value: 0.85, label: '🙂 Normal' }, { value: 1, label: '🐇 Fast' }]} />
            </div>
            <button type="button" className="btn btn-blue" onClick={() => speak('Hello! Can you find the lamp? The lamp can turn on.')}>
              🔊 Test voice
            </button>
          </>
        ) : (
          <p className="muted">This browser cannot speak. Try Safari or Chrome.</p>
        )}
      </section>

      <section className="panel">
        <h2 className="section-title">Sticker Book</h2>
        <button type="button" className="btn btn-red" onClick={() => setConfirmReset(true)}>
          🗑️ Clear all stickers
        </button>
        {resetDone && <p className="muted">Sticker book is empty again.</p>}
      </section>

      <section className="panel tips">
        <h2 className="section-title">Tips 💡</h2>
        <ul>
          <li>Buka di Safari iPad, lalu tekan tombol Share › <b>Add to Home Screen</b> supaya tampil penuh seperti aplikasi.</li>
          <li>Matikan mode Silent / naikkan volume agar suara terdengar.</li>
          <li>Setelah objek ketemu, ajak si kecil menjawab pertanyaan “Let&apos;s talk!” dengan kalimat lengkap.</li>
          <li>Mode Race di iPad tegak (portrait): duduk berhadapan. iPad miring (landscape): duduk bersebelahan.</li>
        </ul>
      </section>

      {confirmReset && (
        <ConfirmDialog
          danger
          title="Clear all stickers?"
          message="Semua stiker yang sudah dikumpulkan akan dihapus."
          confirmText="Clear"
          cancelText="Cancel"
          onCancel={() => setConfirmReset(false)}
          onConfirm={() => {
            resetProgress();
            setConfirmReset(false);
            setResetDone(true);
          }}
        />
      )}
    </div>
  );
}

import { useRef, useState } from 'react';
import { ConfirmDialog, TopBar } from '../components/ui.jsx';
import { deletePhotoScene, photoToDataURL } from '../lib/storage.js';
import { uid } from '../lib/util.js';
import { sfx } from '../lib/sfx.js';

// Parents can turn a photo (a picture-book page, the child's own room, a toy box...) into a scene.
export default function PhotoScenes({ photoScenes, refresh, go, onPlay }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [toDelete, setToDelete] = useState(null);

  async function onPick(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      // Keep extra detail for now; the editor crops and shrinks it to 1600 px when saving.
      const { image, width, height } = await photoToDataURL(file, 2400);
      const draft = { id: uid('photo'), kind: 'photo', title: '', titleId: '', icon: '📷', image, width, height, objects: [], createdAt: Date.now() };
      go('editor', { draft, isNew: true });
    } catch (err) {
      setError(err.message || 'Could not open that photo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen photos scroll">
      <TopBar title="Photo Scenes" subtitle="Buat level sendiri dari foto" onBack={() => go('home')} />

      <section className="panel how">
        <ol>
          <li>Take a photo of a picture-book page, a toy box, or your own room. <span className="id-text block">Foto halaman buku bergambar, kotak mainan, atau kamar sendiri.</span></li>
          <li>Crop it to just the picture. <span className="id-text block">Potong supaya hanya gambarnya yang terlihat.</span></li>
          <li>Tap each thing in the photo and type its English name. <span className="id-text block">Tap setiap benda lalu ketik nama bahasa Inggrisnya.</span></li>
          <li>Save, then play! <span className="id-text block">Simpan, lalu main!</span></li>
        </ol>
        <button type="button" className="btn btn-big btn-green" disabled={busy} onClick={() => fileRef.current && fileRef.current.click()}>
          {busy ? '⏳ Opening…' : '📷 New scene from a photo'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="visually-hidden" onChange={onPick} />
        {error && <p className="error">{error}</p>}
      </section>

      <div className="scene-grid">
        {photoScenes.map((s) => (
          <div key={s.id} className="scene-card photo-card">
            <img className="scene-thumb" src={s.image} alt="" />
            <div className="scene-card-body">
              <div className="scene-card-title">📷 {s.title || 'My scene'}</div>
              <div className="muted">
                {s.objects.length} {s.objects.length === 1 ? 'thing' : 'things'} marked
              </div>
              <div className="row gap wrap">
                <button type="button" className="btn btn-play small" disabled={!s.objects.length} onClick={() => onPlay(s.id)}>
                  ▶ Play
                </button>
                <button type="button" className="btn btn-blue small" onClick={() => { sfx.tap(); go('editor', { draft: s, isNew: false }); }}>
                  ✏️ Edit
                </button>
                <button type="button" className="btn btn-plain small" aria-label="Delete" onClick={() => setToDelete(s)}>
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!photoScenes.length && <p className="center muted">No photo scenes yet. · Belum ada scene foto.</p>}

      {toDelete && (
        <ConfirmDialog
          danger
          title={`Delete “${toDelete.title || 'My scene'}”?`}
          message="Scene ini akan dihapus dari iPad."
          confirmText="Delete"
          cancelText="Cancel"
          onCancel={() => setToDelete(null)}
          onConfirm={async () => {
            try {
              await deletePhotoScene(toDelete.id);
            } catch {
              /* ignore */
            }
            setToDelete(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

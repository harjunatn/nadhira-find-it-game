import { sfx } from '../lib/sfx.js';
import { speak } from '../lib/speech.js';
import { FIXED } from '../lib/phrases.js';

const FLOATERS = ['🦁', '🛁', '🛋️', '🧸', '🚌', '🐘', '💡', '🍎', '🦒', '🚗', '🌟', '🎈'];

export default function HomeScreen({ go }) {
  const tap = (name) => () => {
    sfx.pop();
    go(name);
  };
  return (
    <div className="screen home">
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map((e, i) => (
          <span key={i} style={{ '--i': i }}>
            {e}
          </span>
        ))}
      </div>
      <div className="home-card">
        <button type="button" className="logo" onClick={() => speak(FIXED.welcome)}>
          <span className="logo-glass">🔍</span>
          <span className="logo-text">Find It!</span>
        </button>
        <p className="home-sub">Play &amp; learn English together</p>
        <p className="id-text">Main sambil belajar bahasa Inggris bareng</p>
        <div className="home-buttons">
          <button type="button" className="btn btn-big btn-play" onClick={tap('setup')}>
            ▶ Play
          </button>
          <div className="home-row">
            <button type="button" className="btn btn-yellow" onClick={tap('stickers')}>
              📒 Sticker Book
            </button>
            <button type="button" className="btn btn-green" onClick={tap('photos')}>
              📷 Photo Scenes
            </button>
            <button type="button" className="btn btn-plain" onClick={tap('settings')}>
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo } from 'react';
import { ObjectArt } from '../components/SceneGraphics.jsx';
import { sentenceOf } from '../components/GameParts.jsx';
import { Avatar, Stars } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

const CONFETTI = ['🎉', '⭐', '🎈', '✨', '🌟', '🎊'];

export default function ResultsScreen({ scene, result, onAgain, onChoose, onHome }) {
  const { settings } = useSettings();
  const { players } = settings;
  const [a, b] = result.scores;
  const winner = a === b ? null : a > b ? 0 : 1;
  const headline = winner === null ? "It's a tie! 🤝" : `${players[winner].name} wins! 🏆`;

  const words = result.found.map((f) => ({ ...f, obj: scene.objects.find((o) => o.id === f.id) })).filter((f) => f.obj);

  useEffect(() => {
    sfx.fanfare();
    const t = setTimeout(() => speak([headline.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').trim(), 'Great job, everyone!']), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confetti = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ e: CONFETTI[i % CONFETTI.length], left: Math.random() * 100, delay: Math.random() * 2.5, dur: 3 + Math.random() * 2.5 })),
    [],
  );

  return (
    <div className="screen results scroll">
      <div className="confetti" aria-hidden="true">
        {confetti.map((c, i) => (
          <span key={i} style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}>
            {c.e}
          </span>
        ))}
      </div>
      <div className="results-card">
        <h1 className="results-title">{headline}</h1>
        <p className="id-text">Hebat! Kalian semua pintar!</p>
        <div className="results-players">
          {players.map((p, i) => (
            <div key={i} className={`results-player ${winner === i ? 'champ' : ''}`} style={{ '--pc': p.color }}>
              {winner === i && <div className="crown">👑</div>}
              <Avatar player={p} size="xl" />
              <div className="score-name">{p.name}</div>
              <div className="results-score">{result.scores[i]}</div>
              <Stars count={result.scores[i]} max={8} />
            </div>
          ))}
        </div>

        {words.length > 0 && (
          <>
            <h2 className="section-title">Words we found today 📚</h2>
            {settings.showIndonesian && <p className="id-text">Tap untuk dengar lagi</p>}
            <div className="word-chips">
              {words.map(({ obj }) => (
                <button type="button" key={obj.id} className="word-chip" onClick={() => speak([obj.word, sentenceOf(obj)])}>
                  <ObjectArt scene={scene} obj={obj} size={44} />
                  <span>{obj.word}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="results-buttons">
          <button type="button" className="btn btn-big btn-play" onClick={onAgain}>
            🔁 Play again
          </button>
          <button type="button" className="btn btn-yellow" onClick={onChoose}>
            🗺️ Another place
          </button>
          <button type="button" className="btn btn-plain" onClick={onHome}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

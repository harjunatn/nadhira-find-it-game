import { useEffect, useMemo, useState } from 'react';
import SceneView, { bubblePoint } from '../components/SceneView.jsx';
import { FoundCard, ScoreCard, TargetBanner, WhoFound } from '../components/GameParts.jsx';
import { line, objectLines } from '../lib/phrases.js';
import { ConfirmDialog } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { prefetchLines, speak, stopSpeech } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';
import { recordFound } from '../lib/storage.js';
import { useEffectsLayer, useMediaQuery, useTimers } from '../lib/util.js';

// One big picture. Whoever spots the object taps it, then the grown-up picks who found it.
export default function TogetherGame({ scene, queue, onExit, onFinish }) {
  const { settings } = useSettings();
  const { players } = settings;
  const portrait = useMediaQuery('(orientation: portrait)');
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('seek'); // seek | celebrate | found | advancing
  const [scores, setScores] = useState([0, 0]);
  const [found, setFound] = useState([]);
  const [hint, setHint] = useState(false);
  const [wrongId, setWrongId] = useState(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const fx = useEffectsLayer();
  const { later, cancel } = useTimers();
  const target = queue[round];

  useEffect(() => {
    setPhase('seek');
    setHint(false);
    setWrongId(null);
    const say = later(() => speak(line.find(target)), 450);
    const hintTimer = settings.autoHint ? later(() => setHint(true), settings.autoHint * 1000) : null;
    return () => {
      cancel(say);
      if (hintTimer) cancel(hintTimer);
    };
    // A new round starts only when `round` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    prefetchLines(queue.flatMap(objectLines));
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lets automated checks find the current target (development builds only).
  useEffect(() => {
    if (import.meta.env.DEV) window.__findit = { target, phase };
  });

  const states = useMemo(() => {
    const s = {};
    if (phase === 'seek' && hint) s[target.id] = 'hint';
    if (phase !== 'seek') s[target.id] = 'found';
    if (wrongId && wrongId !== target.id) s[wrongId] = 'wrong';
    return s;
  }, [phase, hint, wrongId, target]);

  function handleTap(obj, point) {
    if (phase !== 'seek') return;
    if (!obj) {
      sfx.tap();
      fx.add({ type: 'ripple', ...point }, 700);
      return;
    }
    if (obj.id === target.id) {
      sfx.correct();
      fx.add({ type: 'burst', x: obj.x, y: obj.y }, 1300);
      setPhase('celebrate');
      recordFound(scene.id, obj.id);
      speak([line.found(obj), line.sentence(obj)]);
      later(() => setPhase((p) => (p === 'celebrate' ? 'found' : p)), 1100);
      return;
    }
    sfx.wrong();
    setWrongId(obj.id);
    later(() => setWrongId((id) => (id === obj.id ? null : id)), 650);
    fx.add({ type: 'bubble', ...bubblePoint(obj), text: `That's the ${obj.word}!` }, 1700);
    speak(line.oops(obj));
  }

  function giveHint() {
    if (phase !== 'seek') return;
    sfx.pop();
    setHint(true);
    speak(line.find(target));
  }

  function award(who) {
    if (phase !== 'found') return;
    setPhase('advancing');
    sfx.star();
    const nextScores = scores.map((s, i) => (who === 'both' || who === i ? s + 1 : s));
    const nextFound = [...found, { id: target.id, who }];
    setScores(nextScores);
    setFound(nextFound);
    if (round + 1 >= queue.length) onFinish({ scores: nextScores, found: nextFound });
    else setRound((r) => r + 1);
  }

  return (
    <div className={`screen game together ${portrait ? 'portrait' : 'landscape'}`}>
      <header className="game-top">
        <button type="button" className="icon-btn" aria-label="Stop" onClick={() => setConfirmExit(true)}>
          🏠
        </button>
        <TargetBanner scene={scene} obj={target} showPicture={settings.showPicture} showIndonesian={settings.showIndonesian} />
        <div className="game-top-right">
          <div className="round-pill">
            {round + 1}/{queue.length}
          </div>
          <button type="button" className="icon-btn" aria-label="Hint" onClick={giveHint}>
            💡
          </button>
        </div>
      </header>
      <main className="game-main">
        <ScoreCard className="p0" player={players[0]} score={scores[0]} />
        <SceneView scene={scene} onTap={handleTap} states={states} effects={fx.effects} />
        <ScoreCard className="p1" player={players[1]} score={scores[1]} />
      </main>

      {phase === 'found' && (
        <div className="sheet-backdrop">
          <FoundCard scene={scene} obj={target} title="🎉 You found it!" showIndonesian={settings.showIndonesian}>
            <WhoFound players={players} onPick={award} />
          </FoundCard>
        </div>
      )}

      {confirmExit && (
        <ConfirmDialog
          title="Stop playing?"
          message="Berhenti main dan kembali ke menu?"
          confirmText="Stop"
          cancelText="Keep playing"
          onCancel={() => setConfirmExit(false)}
          onConfirm={onExit}
        />
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import Stage3D from '../three/Stage3D.jsx';
import { FoundCard, ScoreCard, TargetBanner, WhoFound } from '../components/GameParts.jsx';
import { ConfirmDialog } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { line, objectLines } from '../lib/phrases.js';
import { hasRecording, prefetchLines, speak, stopSpeech } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';
import { recordFound } from '../lib/storage.js';
import { useMediaQuery, useTimers } from '../lib/util.js';

// Hide and seek in a 3D room: turn the room around to find the thing, tap it,
// then pick who found it. Same rounds and scoring as the flat "Together" game.
export default function Hunt3D({ scene, queue, onExit, onFinish }) {
  const { settings } = useSettings();
  const { players } = settings;
  const portrait = useMediaQuery('(orientation: portrait)');
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('seek'); // seek | celebrate | found | advancing
  const [scores, setScores] = useState([0, 0]);
  const [found, setFound] = useState([]);
  const [hint, setHint] = useState(false);
  const [foundItem, setFoundItem] = useState(null);
  const [wrong, setWrong] = useState(null); // { id, text, key }
  const [turned, setTurned] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const { later, cancel } = useTimers();
  const target = queue[round];

  // A room talks only when all of its lines have been recorded (tools/voice), so the
  // voice never switches between natural, stiff and silent from one round to the next.
  const voiced = useMemo(() => scene.objects.every((o) => objectLines(o).every(hasRecording)), [scene]);
  const say = (lines) => {
    if (voiced) speak(lines);
  };

  useEffect(() => {
    setPhase('seek');
    setHint(false);
    setWrong(null);
    setFoundItem(null);
    const first = later(() => say(line.find(target)), 450);
    // Turning the room takes time, so the hint waits a little longer than in flat scenes.
    const hintTimer = settings.autoHint ? later(() => setHint(true), (settings.autoHint + 10) * 1000) : null;
    return () => {
      cancel(first);
      if (hintTimer) cancel(hintTimer);
    };
    // A new round starts only when `round` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (voiced) prefetchLines(queue.flatMap(objectLines));
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const states = useMemo(() => {
    const s = {};
    if (phase === 'seek' && hint) {
      for (const it of scene.items) if (it.findId === target.id) s[it.id] = 'hint';
    }
    if (phase !== 'seek' && foundItem) s[foundItem] = 'found';
    if (wrong && wrong.id !== foundItem) s[wrong.id] = 'wrong';
    return s;
  }, [scene, phase, hint, foundItem, wrong, target]);

  function handleTap(item) {
    if (phase !== 'seek') return;
    if (!item || !item.word) {
      sfx.tap();
      return;
    }
    if (item.findId === target.id) {
      sfx.correct();
      setFoundItem(item.id);
      setPhase('celebrate');
      recordFound(scene.id, target.id);
      say([line.found(target), line.sentence(target)]);
      later(() => setPhase((p) => (p === 'celebrate' ? 'found' : p)), 1500);
      return;
    }
    sfx.wrong();
    const key = Date.now();
    setWrong({ id: item.id, text: `That's the ${item.word}!`, key });
    later(() => setWrong((w) => (w && w.key === key ? null : w)), 1700);
    say(line.oops(item));
  }

  // Lets automated checks play a round without aiming at the 3D picture (development builds only).
  useEffect(() => {
    if (import.meta.env.DEV) window.__hunt3d = { target, phase, tapTarget: () => handleTap(scene.items.find((it) => it.findId === target.id)) };
  });

  function giveHint() {
    if (phase !== 'seek') return;
    sfx.pop();
    setHint(true);
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
    <div className={`screen game together hunt3d ${portrait ? 'portrait' : 'landscape'}`}>
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
        <div className="stage3d-wrap">
          <Stage3D scene={scene} states={states} bubble={wrong ? { id: wrong.id, text: wrong.text } : null} onTap={handleTap} onTurn={() => setTurned(true)} />
          {!turned && (
            <div className="turn-tip">
              👆 Drag to turn the room{settings.showIndonesian && <span className="id-text"> · Geser untuk memutar ruangan</span>}
            </div>
          )}
        </div>
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

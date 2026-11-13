import { useEffect, useMemo, useRef, useState } from 'react';
import Stage3D from '../three/Stage3D.jsx';
import { FoundCard, TargetBanner } from '../components/GameParts.jsx';
import { Avatar, ConfirmDialog } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { line, objectLines } from '../lib/phrases.js';
import { hasRecording, prefetchLines, speak, stopSpeech } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';
import { recordFound } from '../lib/storage.js';
import { useMediaQuery, useTimers } from '../lib/util.js';

// Split-screen race in a 3D room: each player has their own view of the same room,
// turns it on their own and the first correct tap wins the round.
// iPad upright (portrait): the top half is upside down so players can sit facing each other.
// iPad sideways (landscape): left and right halves, players sit side by side.
export default function Race3D({ scene, queue, onExit, onFinish }) {
  const { settings } = useSettings();
  const { players } = settings;
  const portrait = useMediaQuery('(orientation: portrait)');
  const [round, setRound] = useState(0);
  const [phase, setPhaseState] = useState('seek'); // seek | celebrate | found | advancing
  const phaseRef = useRef('seek');
  const [winner, setWinner] = useState(null);
  const [foundItem, setFoundItem] = useState(null);
  const [scores, setScores] = useState([0, 0]);
  const [found, setFound] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [hint, setHint] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const { later, cancel } = useTimers();
  const target = queue[round];

  // A room talks only when all of its lines have been recorded (see Hunt3D).
  const voiced = useMemo(() => scene.objects.every((o) => objectLines(o).every(hasRecording)), [scene]);
  const say = (lines) => {
    if (voiced) speak(lines);
  };

  // Kept in a ref too, so two taps landing in the same instant cannot both win.
  const setPhase = (p) => {
    phaseRef.current = p;
    setPhaseState(p);
  };

  useEffect(() => {
    setPhase('seek');
    setWinner(null);
    setFoundItem(null);
    setHint(false);
    const wait = settings.headStart || 0;
    setCountdown(wait);
    const timers = [later(() => say(line.find(target)), 450)];
    for (let i = 1; i <= wait; i++) timers.push(later(() => setCountdown(wait - i), i * 1000));
    if (settings.autoHint) timers.push(later(() => setHint(true), (settings.autoHint + 10 + wait) * 1000));
    return () => timers.forEach(cancel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (voiced) prefetchLines(queue.flatMap(objectLines));
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tryTap(index, item) {
    if (phaseRef.current !== 'seek') return 'ignored';
    if (index === 1 && countdown > 0) return 'ignored';
    if (!item || !item.word) return 'miss';
    if (item.findId !== target.id) return 'wrong';
    setPhase('celebrate');
    setWinner(index);
    setFoundItem(item.id);
    setScores((s) => s.map((v, i) => (i === index ? v + 1 : v)));
    setFound((f) => [...f, { id: target.id, who: index }]);
    recordFound(scene.id, target.id);
    sfx.correct();
    say([line.there(target), line.sentence(target)]);
    later(() => {
      if (phaseRef.current === 'celebrate') setPhase('found');
    }, 1700);
    return 'correct';
  }

  function next() {
    if (phaseRef.current !== 'found') return;
    setPhase('advancing');
    sfx.tap();
    if (round + 1 >= queue.length) onFinish({ scores, found });
    else setRound((r) => r + 1);
  }

  // Lets automated checks play a round without aiming at the 3D picture (development builds only).
  useEffect(() => {
    if (import.meta.env.DEV) window.__race3d = { target, phase, countdown, tap: (index) => tryTap(index, scene.items.find((it) => it.findId === target.id)) };
  });

  // Top (or left) half first.
  const order = portrait ? [1, 0] : [0, 1];

  return (
    <div className={`screen race race3d ${portrait ? 'portrait' : 'landscape'}`}>
      {order.map((index, pos) => (
        <Half
          key={index}
          index={index}
          rotated={portrait && pos === 0}
          players={players}
          scene={scene}
          target={target}
          phase={phase}
          winner={winner}
          foundItem={foundItem}
          hint={hint}
          locked={index === 1 && countdown > 0 && phase === 'seek'}
          countdown={countdown}
          score={scores[index]}
          settings={settings}
          isLast={round + 1 >= queue.length}
          onTap={tryTap}
          onNext={next}
        />
      ))}
      <div className="race-mid">
        <button type="button" className="icon-btn small" aria-label="Stop" onClick={() => setConfirmExit(true)}>
          🏠
        </button>
        <div className="round-pill">
          {round + 1}/{queue.length}
        </div>
      </div>
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

function Half({ index, rotated, players, scene, target, phase, winner, foundItem, hint, locked, countdown, score, settings, isLast, onTap, onNext }) {
  const player = players[index];
  const other = players[1 - index];
  const [wrong, setWrong] = useState(null); // { id, text, key }
  const [cool, setCool] = useState(false);
  const [turned, setTurned] = useState(false);
  const { later } = useTimers();

  useEffect(() => {
    setWrong(null);
    setCool(false);
  }, [target.id]);

  const states = useMemo(() => {
    const s = {};
    if (phase === 'seek' && hint) {
      for (const it of scene.items) if (it.findId === target.id) s[it.id] = 'hint';
    }
    // the thing that was found celebrates in both views, so the other player sees where it was
    if (phase !== 'seek' && foundItem) s[foundItem] = 'found';
    if (wrong && wrong.id !== foundItem) s[wrong.id] = 'wrong';
    return s;
  }, [scene, phase, hint, foundItem, wrong, target]);

  function handleTap(item) {
    if (cool || locked) return;
    const result = onTap(index, item);
    if (result === 'miss') {
      sfx.tap();
    } else if (result === 'wrong') {
      sfx.wrong();
      const key = Date.now();
      setWrong({ id: item.id, text: `That's the ${item.word}!`, key });
      setCool(true);
      later(() => setCool(false), 700);
      later(() => setWrong((w) => (w && w.key === key ? null : w)), 1500);
    }
  }

  const title = winner === index ? '⭐ You found it!' : winner !== null ? `${players[winner].name} found it!` : '';

  return (
    <section className={`race-half ${rotated ? 'rotated' : ''} ${winner === index ? 'winner' : ''}`} style={{ '--pc': player.color }}>
      <div className="race-head">
        <div className="race-player">
          <Avatar player={player} />
          <div>
            <div className="score-name">{player.name}</div>
            <div className="score-num">⭐ {score}</div>
          </div>
        </div>
        <TargetBanner compact scene={scene} obj={target} showPicture={settings.showPicture} showIndonesian={settings.showIndonesian} />
      </div>
      <div className="race-stage">
        <div className="stage3d-wrap">
          <Stage3D scene={scene} states={states} bubble={wrong ? { id: wrong.id, text: wrong.text } : null} onTap={handleTap} onTurn={() => setTurned(true)} flip={rotated} lite />
          {!turned && !locked && phase === 'seek' && <div className="turn-tip">👆 Drag to turn</div>}
        </div>
        {locked && (
          <div className="race-lock">
            <div className="lock-num">{countdown}</div>
            <div className="lock-text">Wait! Let {other.name} look first 👀</div>
          </div>
        )}
      </div>
      {phase === 'found' && (
        <div className="race-sheet">
          <FoundCard compact scene={scene} obj={target} title={title} showIndonesian={settings.showIndonesian}>
            <button type="button" className="btn btn-play next-btn" onClick={onNext}>
              {isLast ? 'See results 🏆' : 'Next ▶'}
            </button>
          </FoundCard>
        </div>
      )}
    </section>
  );
}

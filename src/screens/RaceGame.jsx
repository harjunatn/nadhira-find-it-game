import { useEffect, useMemo, useRef, useState } from 'react';
import SceneView, { bubblePoint } from '../components/SceneView.jsx';
import { FoundCard, TargetBanner } from '../components/GameParts.jsx';
import { line, objectLines } from '../lib/phrases.js';
import { Avatar, ConfirmDialog } from '../components/ui.jsx';
import { useSettings } from '../settings.jsx';
import { prefetchLines, speak, stopSpeech } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';
import { recordFound } from '../lib/storage.js';
import { useEffectsLayer, useMediaQuery, useTimers } from '../lib/util.js';

// Split screen: each player gets their own copy of the picture and the first correct tap wins.
// iPad upright (portrait): the top half is turned upside down so players can sit facing each other.
// iPad sideways (landscape): left and right halves, players sit side by side.
export default function RaceGame({ scene, queue, onExit, onFinish }) {
  const { settings } = useSettings();
  const { players } = settings;
  const portrait = useMediaQuery('(orientation: portrait)');
  const [round, setRound] = useState(0);
  const [phase, setPhaseState] = useState('seek'); // seek | celebrate | found | advancing
  const phaseRef = useRef('seek');
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState([0, 0]);
  const [found, setFound] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [hint, setHint] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const { later, cancel } = useTimers();
  const target = queue[round];

  // Kept in a ref too, so two taps landing in the same instant cannot both win.
  const setPhase = (p) => {
    phaseRef.current = p;
    setPhaseState(p);
  };

  useEffect(() => {
    setPhase('seek');
    setWinner(null);
    setHint(false);
    const wait = settings.headStart || 0;
    setCountdown(wait);
    const timers = [later(() => speak(line.find(target)), 450)];
    for (let i = 1; i <= wait; i++) timers.push(later(() => setCountdown(wait - i), i * 1000));
    if (settings.autoHint) timers.push(later(() => setHint(true), (settings.autoHint + wait) * 1000));
    return () => timers.forEach(cancel);
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

  function tryTap(index, obj) {
    if (phaseRef.current !== 'seek') return 'ignored';
    if (index === 1 && countdown > 0) return 'ignored';
    if (!obj) return 'miss';
    if (obj.id !== target.id) return 'wrong';
    setPhase('celebrate');
    setWinner(index);
    setScores((s) => s.map((v, i) => (i === index ? v + 1 : v)));
    setFound((f) => [...f, { id: target.id, who: index }]);
    recordFound(scene.id, target.id);
    sfx.correct();
    speak([line.there(target), line.sentence(target)]);
    later(() => {
      if (phaseRef.current === 'celebrate') setPhase('found');
    }, 1200);
    return 'correct';
  }

  function next() {
    if (phaseRef.current !== 'found') return;
    setPhase('advancing');
    sfx.tap();
    if (round + 1 >= queue.length) onFinish({ scores, found });
    else setRound((r) => r + 1);
  }

  // Top (or left) half first.
  const order = portrait ? [1, 0] : [0, 1];

  return (
    <div className={`screen race ${portrait ? 'portrait' : 'landscape'}`}>
      {order.map((index, pos) => (
        <RaceHalf
          key={index}
          index={index}
          rotated={portrait && pos === 0}
          players={players}
          scene={scene}
          target={target}
          phase={phase}
          winner={winner}
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

function RaceHalf({ index, rotated, players, scene, target, phase, winner, hint, locked, countdown, score, settings, isLast, onTap, onNext }) {
  const player = players[index];
  const other = players[1 - index];
  const fx = useEffectsLayer();
  const [wrongId, setWrongId] = useState(null);
  const [cool, setCool] = useState(false);
  const { later } = useTimers();

  useEffect(() => {
    fx.clear();
    setWrongId(null);
    setCool(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.id]);

  const states = useMemo(() => {
    const s = {};
    if (phase === 'seek' && hint) s[target.id] = 'hint';
    if (phase !== 'seek') s[target.id] = 'found';
    if (wrongId && wrongId !== target.id) s[wrongId] = 'wrong';
    return s;
  }, [phase, hint, wrongId, target]);

  function handleTap(obj, point) {
    if (cool || locked) return;
    const result = onTap(index, obj);
    if (result === 'miss') {
      sfx.tap();
      fx.add({ type: 'ripple', ...point }, 700);
    } else if (result === 'wrong') {
      sfx.wrong();
      setWrongId(obj.id);
      setCool(true);
      later(() => {
        setWrongId(null);
        setCool(false);
      }, 700);
      fx.add({ type: 'bubble', ...bubblePoint(obj), text: `That's the ${obj.word}!` }, 1500);
    } else if (result === 'correct') {
      fx.add({ type: 'burst', x: target.x, y: target.y }, 1300);
      fx.add({ type: 'plus', ...bubblePoint(target), text: '+1 ⭐' }, 1300);
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
        <SceneView scene={scene} onTap={handleTap} states={states} effects={fx.effects} rotated={rotated} />
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

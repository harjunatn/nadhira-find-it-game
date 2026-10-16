import { ObjectArt } from './SceneGraphics.jsx';
import { Avatar, SpeakButton, Stars } from './ui.jsx';
import { line } from '../lib/phrases.js';

export const findLine = line.find;
export const sentenceOf = line.sentence;

// Photo scenes made by parents may leave the talk prompt empty; give them a simple one.
export function talkOf(obj) {
  if (obj.question) return { q: obj.question, qId: obj.questionId, a: obj.answer, aId: obj.answerId };
  return { q: `Can you point to the ${obj.word}?`, qId: `Bisa tunjuk ${obj.wordId || obj.word}?`, a: `Here is the ${obj.word}!`, aId: '' };
}

export function TargetBanner({ scene, obj, showPicture, showIndonesian, compact = false }) {
  return (
    <div className={`target-banner ${compact ? 'compact' : ''}`} key={obj.id}>
      {showPicture && (
        <div className="target-art">
          <ObjectArt scene={scene} obj={obj} size={compact ? 52 : 76} />
        </div>
      )}
      <div className="target-text">
        <div className="target-label">Find the</div>
        <div className="target-word">{obj.word}</div>
        {showIndonesian && obj.wordId && <div className="id-text">{obj.wordId}</div>}
      </div>
      <SpeakButton text={findLine(obj)} />
    </div>
  );
}

function Line({ text, textId, showIndonesian, className = '', quote = false }) {
  if (!text) return null;
  return (
    <div className={`line ${className}`}>
      <SpeakButton text={text} />
      <div>
        <p className="en">{quote ? `“${text}”` : text}</p>
        {showIndonesian && textId && <p className="id-text">{textId}</p>}
      </div>
    </div>
  );
}

export function FoundCard({ scene, obj, title, showIndonesian, compact = false, children }) {
  const talk = talkOf(obj);
  return (
    <div className={`found-card ${compact ? 'compact' : ''}`}>
      <div className="found-head">
        <div className="found-art">
          <ObjectArt scene={scene} obj={obj} size={compact ? 70 : 104} />
        </div>
        <div className="found-head-text">
          {title && <div className="found-title">{title}</div>}
          <div className="found-word">
            {obj.word} <SpeakButton text={obj.word} />
          </div>
          {showIndonesian && obj.wordId && <div className="id-text">{obj.wordId}</div>}
        </div>
      </div>
      <Line className="sentence" text={sentenceOf(obj)} textId={obj.sentenceId} showIndonesian={showIndonesian} />
      <div className="talk">
        <div className="talk-label">💬 Let&apos;s talk!</div>
        <Line text={talk.q} textId={talk.qId} showIndonesian={showIndonesian} />
        {talk.a && <Line className="answer" text={talk.a} textId={talk.aId} showIndonesian={showIndonesian} quote />}
      </div>
      {children}
    </div>
  );
}

export function ScoreCard({ player, score, active = false, className = '' }) {
  return (
    <div className={`score-card ${active ? 'active' : ''} ${className}`} style={{ '--pc': player.color }}>
      <Avatar player={player} size="lg" />
      <div className="score-name">{player.name}</div>
      <div className="score-num">⭐ {score}</div>
      <Stars count={score} max={6} />
    </div>
  );
}

export function WhoFound({ players, onPick }) {
  return (
    <div className="who-found">
      <div className="who-title">Who found it? <span className="id-text">Siapa yang menemukan?</span></div>
      <div className="who-buttons">
        <button type="button" className="btn who-btn" style={{ '--pc': players[0].color }} onClick={() => onPick(0)}>
          <Avatar player={players[0]} /> {players[0].name}
        </button>
        <button type="button" className="btn who-btn both" onClick={() => onPick('both')}>
          🤝 Both
        </button>
        <button type="button" className="btn who-btn" style={{ '--pc': players[1].color }} onClick={() => onPick(1)}>
          <Avatar player={players[1]} /> {players[1].name}
        </button>
      </div>
    </div>
  );
}

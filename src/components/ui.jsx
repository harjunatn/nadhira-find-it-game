import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sfx.js';

export function SpeakButton({ text, className = '', label = 'Listen' }) {
  return (
    <button
      type="button"
      className={`speak-btn ${className}`}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
    >
      🔊
    </button>
  );
}

export function Modal({ children, onClose, className = '' }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, confirmText = 'Yes', cancelText = 'No', onConfirm, onCancel, danger = false }) {
  return (
    <Modal onClose={onCancel} className="confirm">
      <h2>{title}</h2>
      {message && <p className="muted">{message}</p>}
      <div className="row gap center">
        <button type="button" className="btn btn-plain" onClick={onCancel}>
          {cancelText}
        </button>
        <button type="button" className={`btn ${danger ? 'btn-red' : 'btn-blue'}`} onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

export function TopBar({ title, subtitle, onBack, right }) {
  return (
    <header className="topbar">
      {onBack ? (
        <button
          type="button"
          className="icon-btn"
          aria-label="Back"
          onClick={() => {
            sfx.tap();
            onBack();
          }}
        >
          ⬅️
        </button>
      ) : (
        <span className="icon-btn-spacer" />
      )}
      <div className="topbar-title">
        <h1>{title}</h1>
        {subtitle && <div className="id-text">{subtitle}</div>}
      </div>
      <div className="topbar-right">{right || <span className="icon-btn-spacer" />}</div>
    </header>
  );
}

export function Avatar({ player, size = 'md' }) {
  return (
    <span className={`avatar avatar-${size}`} style={{ '--pc': player.color }}>
      {player.avatar}
    </span>
  );
}

export function Stars({ count, max = 10 }) {
  if (count > max) {
    return (
      <span className="stars">
        ⭐ × {count}
      </span>
    );
  }
  return <span className="stars">{count ? '⭐'.repeat(count) : <span className="muted">—</span>}</span>;
}

export function Chips({ options, value, onChange }) {
  return (
    <div className="chips">
      {options.map((o) => (
        <button
          type="button"
          key={String(o.value)}
          className={`chip ${o.value === value ? 'on' : ''}`}
          onClick={() => {
            sfx.tap();
            onChange(o.value);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label, sub }) {
  return (
    <label className="toggle-row">
      <span>
        <span className="toggle-label">{label}</span>
        {sub && <span className="id-text block">{sub}</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle" aria-hidden="true" />
    </label>
  );
}

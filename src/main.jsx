import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Little fingers pinch and double-tap a lot; keep the page from zooming.
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => {
  if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) e.preventDefault();
});

// iPad Safari slides the whole page up to make room for the on-screen keyboard and
// sometimes leaves it there after the keyboard closes: the top bar (with the back
// button) ends up off-screen and an empty white band appears at the bottom.
// The game never scrolls the page itself, so put it back whenever the keyboard is gone.
const keyboardOpen = () => {
  const vv = window.visualViewport;
  const el = document.activeElement;
  const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.type !== 'range' && el.type !== 'checkbox';
  return typing && (!vv || vv.height < window.innerHeight * 0.9);
};
const resetPage = () => {
  if (keyboardOpen()) return;
  if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
  if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
};
const resetSoon = () => setTimeout(resetPage, 150);
document.addEventListener('focusout', resetSoon);
window.addEventListener('scroll', resetSoon, { passive: true });
window.addEventListener('orientationchange', resetSoon);
if (window.visualViewport) window.visualViewport.addEventListener('resize', resetSoon);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

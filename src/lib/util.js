import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// crypto.randomUUID only exists on secure (https) pages, and the game is often
// opened over plain http on the home Wi-Fi, so build ids by hand.
export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Measures `ref` and returns the biggest {w, h} with the given aspect ratio that fits inside it.
export function useContainSize(ref, aspect) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = (width, height) => {
      let w = width;
      let h = width / aspect;
      if (h > height) {
        h = height;
        w = height * aspect;
      }
      setSize((prev) => {
        const next = { w: Math.floor(w), h: Math.floor(h) };
        return prev.w === next.w && prev.h === next.h ? prev : next;
      });
    };
    // clientWidth/Height ignore CSS transforms, so this also works inside a rotated half.
    fit(el.clientWidth, el.clientHeight);
    const ro = new ResizeObserver(([entry]) => fit(entry.contentRect.width, entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, aspect]);
  return size;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

// setTimeout that is cleared automatically when the component unmounts.
export function useTimers() {
  const ids = useRef(new Set());
  useEffect(() => {
    const set = ids.current;
    return () => {
      set.forEach(clearTimeout);
      set.clear();
    };
  }, []);
  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      ids.current.delete(id);
      fn();
    }, ms);
    ids.current.add(id);
    return id;
  }, []);
  const cancel = useCallback((id) => {
    clearTimeout(id);
    ids.current.delete(id);
  }, []);
  return { later, cancel };
}

// Short-lived visual effects drawn on top of a scene (ripples, speech bubbles, star bursts).
export function useEffectsLayer() {
  const [effects, setEffects] = useState([]);
  const { later } = useTimers();
  const add = useCallback(
    (effect, ttl = 1200) => {
      const id = uid('fx');
      setEffects((list) => [...list.slice(-8), { ...effect, id }]);
      later(() => setEffects((list) => list.filter((e) => e.id !== id)), ttl);
    },
    [later],
  );
  const clear = useCallback(() => setEffects([]), []);
  return { effects, add, clear };
}

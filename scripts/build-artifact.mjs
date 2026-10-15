// Builds the whole game into one HTML page (React from cdnjs, everything else inline)
// so it can be published as a claude.ai Artifact and opened on the iPad from anywhere.
// Usage: node scripts/build-artifact.mjs <output.html>
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { root } from './bundle.mjs';

const out = process.argv[2] || path.join(root, 'dist-artifact', 'find-it.html');
const REACT = 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js';
const REACT_DOM = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js';

// Point `react`, `react-dom/client` and the JSX runtime at the UMD globals.
const reactGlobals = {
  name: 'react-globals',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?(\/.*)?$/ }, (args) => ({ path: args.path, namespace: 'react-global' }));
    b.onLoad({ filter: /.*/, namespace: 'react-global' }, (args) => {
      const sources = {
        react: `const R = window.React; export default R;
export const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useContext, createContext, memo, StrictMode, Fragment, createElement } = R;`,
        'react/jsx-runtime': `const R = window.React;
const make = (type, props, key) => R.createElement(type, key === undefined ? props : { ...props, key });
export const jsx = make; export const jsxs = make; export const Fragment = R.Fragment;`,
        'react-dom/client': `export const createRoot = (...a) => window.ReactDOM.createRoot(...a);`,
      };
      if (!(args.path in sources)) throw new Error(`No browser global for ${args.path}`);
      return { contents: sources[args.path], loader: 'js' };
    });
  },
};

const result = await build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  write: false,
  format: 'iife',
  minify: true,
  target: ['safari15', 'chrome100'],
  jsx: 'automatic',
  loader: { '.jsx': 'jsx', '.js': 'jsx' },
  define: { 'import.meta.env.DEV': 'false', 'process.env.NODE_ENV': '"production"' },
  outdir: 'out',
  plugins: [reactGlobals],
  logLevel: 'warning',
});

const js = result.outputFiles.find((f) => f.path.endsWith('.js')).text;
const css = result.outputFiles.find((f) => f.path.endsWith('.css')).text;
const safe = (s) => s.replace(/<\/(script|style)/gi, '<\\/$1');

const html = `<title>Find It! English</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#8fd3ff">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap">
<style>${safe(css)}</style>
<div id="root"></div>
<script src="${REACT}"></script>
<script src="${REACT_DOM}"></script>
<script>${safe(js)}</script>
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);

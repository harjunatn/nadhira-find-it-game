// Bundles JSX from src/ so plain Node scripts can import scenes and components.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const outDir = path.join(root, '.renders');

export async function importBundled(entryCode, name) {
  fs.mkdirSync(outDir, { recursive: true });
  const unique = `${name}-${process.pid}-${Date.now()}`;
  const entry = path.join(outDir, `${unique}.entry.jsx`);
  const outfile = path.join(outDir, `${unique}.bundle.mjs`);
  fs.writeFileSync(entry, entryCode);
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
      logLevel: 'error',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(entry, { force: true });
    fs.rmSync(outfile, { force: true });
  }
}

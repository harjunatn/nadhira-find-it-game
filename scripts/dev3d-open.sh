#!/bin/bash
# Opens a ?dev3d=... page in headless Chrome and waits until it has saved its pictures.
# Needs `npm run dev` and `node scripts/dev3d-server.mjs` running.
#   scripts/dev3d-open.sh "<query string>" <file to wait for, relative to project> [timeout seconds]
QUERY="$1"; WAIT_FOR="$2"; TIMEOUT="${3:-40}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE="$(mktemp -d)"
rm -f "$ROOT/$WAIT_FOR"
"$CHROME" --headless=new --no-first-run --no-default-browser-check --user-data-dir="$PROFILE" \
  --window-size=1600,1300 --force-device-scale-factor=1 --enable-webgl --ignore-gpu-blocklist \
  "http://localhost:5173/?$QUERY" >/dev/null 2>&1 &
PID=$!
for i in $(seq 1 $((TIMEOUT * 2))); do
  [ -s "$ROOT/$WAIT_FOR" ] && break
  sleep 0.5
done
sleep 0.5
kill $PID 2>/dev/null; wait $PID 2>/dev/null
rm -rf "$PROFILE"
if [ -s "$ROOT/$WAIT_FOR" ]; then echo "ok: $WAIT_FOR"; else echo "TIMEOUT waiting for $WAIT_FOR"; exit 1; fi

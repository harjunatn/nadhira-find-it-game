// Farm scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// A sunny farmyard: the red barn on the left, a wooden fence across the middle with the
// farmer and the scarecrow standing behind it in the field, animals in the yard in front.

const WOOD = '#e2a86a';
const WOOD_2 = '#d6995a';
const WOOD_DARK = '#9a6233';

// Fence layout (picture units). Planks are FENCE_PLANK wide, starting at FENCE_X0,
// so the Background and the Foreground draw exactly the same planks.
const FENCE_X0 = 590;
const FENCE_PLANK = 40;
const FENCE_TOP = 620;
const FENCE_BOT = 708;

function FencePlanks({ from, to }) {
  const planks = [];
  for (let x = FENCE_X0; x < to; x += FENCE_PLANK) {
    if (x < from) continue;
    const i = (x - FENCE_X0) / FENCE_PLANK;
    planks.push(
      <g key={x}>
        <path
          d={`M ${x} ${FENCE_BOT} L ${x} ${FENCE_TOP} Q ${x + FENCE_PLANK / 2} ${FENCE_TOP - 28} ${x + FENCE_PLANK} ${FENCE_TOP} L ${x + FENCE_PLANK} ${FENCE_BOT} Z`}
          fill={i % 2 ? WOOD_2 : WOOD}
          stroke={WOOD_DARK}
          strokeWidth="3.5"
        />
        <path d={`M ${x + 12} ${FENCE_TOP + 4} L ${x + 12} ${FENCE_TOP + 22}`} stroke="#f3c993" strokeWidth="4" opacity="0.8" />
        <circle cx={x + FENCE_PLANK / 2} cy="647" r="3" fill={WOOD_DARK} />
        <circle cx={x + FENCE_PLANK / 2} cy="687" r="3" fill={WOOD_DARK} />
      </g>,
    );
  }
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {planks}
      <rect x={from} y="640" width={to - from} height="14" fill="#c98a4f" />
      <rect x={from} y="680" width={to - from} height="14" fill="#c98a4f" />
      <g stroke={WOOD_DARK} strokeWidth="3">
        <line x1={from} x2={to} y1="640" y2="640" />
        <line x1={from} x2={to} y1="654" y2="654" />
        <line x1={from} x2={to} y1="680" y2="680" />
        <line x1={from} x2={to} y1="694" y2="694" />
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="4" cy="30" rx="96" ry="14" fill="#a9dcf5" opacity="0.6" />
      <g fill="#ffffff">
        <ellipse cx="0" cy="18" rx="96" ry="26" />
        <circle cx="-46" cy="6" r="34" />
        <circle cx="4" cy="-12" r="48" />
        <circle cx="52" cy="6" r="32" />
      </g>
    </g>
  );
}

function GrassTuft({ x, y, s = 1, color = '#5aaa45' }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M -24 0 Q -22 -22 -30 -38 Q -12 -22 -10 0 Q -6 -30 0 -48 Q 6 -30 10 0 Q 14 -22 30 -38 Q 22 -22 24 0 Z"
      fill={color}
      strokeLinejoin="round"
    />
  );
}

function Daisy({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g fill="#ffffff">
        <circle cx="0" cy="-6" r="5" />
        <circle cx="6" cy="0" r="5" />
        <circle cx="0" cy="6" r="5" />
        <circle cx="-6" cy="0" r="5" />
      </g>
      <circle cx="0" cy="0" r="4" fill="#ffd23f" />
    </g>
  );
}

function Shadow({ x, y, rx, ry = 14, o = 0.1 }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#000" opacity={o} />;
}

function Background() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="farm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cc4ff" />
          <stop offset="1" stopColor="#d4f1ff" />
        </linearGradient>
        <linearGradient id="farm-yard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86cf5e" />
          <stop offset="1" stopColor="#9bdc70" />
        </linearGradient>
        <linearGradient id="farm-pond" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd3f5" />
          <stop offset="1" stopColor="#45a9e0" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1600" height="640" fill="url(#farm-sky)" />
      <Cloud x={520} y={78} s={0.55} />
      <Cloud x={930} y={120} s={0.85} />
      <Cloud x={1230} y={62} s={0.6} />

      {/* far hills with fields */}
      <path d="M 0 440 C 160 360 340 370 520 420 C 700 360 900 350 1080 400 C 1260 340 1460 350 1600 400 L 1600 720 L 0 720 Z" fill="#c4e89c" />
      <g fill="none" stroke="#b3dd8a" strokeWidth="6" opacity="0.9">
        <path d="M 40 452 C 180 400 340 404 500 440" />
        <path d="M 640 440 C 760 400 900 392 1060 425" />
        <path d="M 1120 410 C 1260 372 1420 376 1600 418" />
      </g>
      <path d="M 0 500 C 200 462 420 470 640 492 C 860 470 1100 466 1320 486 C 1460 476 1540 474 1600 480 L 1600 720 L 0 720 Z" fill="#addd7f" />
      {/* furrows in the field behind the fence */}
      <g fill="none" stroke="#96cf68" strokeWidth="7" opacity="0.9">
        <path d="M 0 540 C 300 515 700 525 1000 520 C 1250 516 1450 515 1600 520" />
        <path d="M 0 578 C 300 556 700 566 1000 560 C 1250 556 1450 556 1600 560" />
        <path d="M 600 600 C 800 594 1000 598 1600 596" />
      </g>

      {/* apple tree behind the fence (the apple is an object) */}
      <path d="M 1432 640 Q 1442 520 1436 400 L 1474 400 Q 1468 520 1480 640 Z" fill="#a0693a" stroke="#6e4422" strokeWidth="4" />
      <path d="M 1452 470 Q 1500 440 1518 396" fill="none" stroke="#6e4422" strokeWidth="18" />
      <path d="M 1452 470 Q 1500 440 1518 396" fill="none" stroke="#a0693a" strokeWidth="10" />
      <g stroke="#3d8b34" strokeWidth="5">
        <circle cx="1372" cy="330" r="70" fill="#4fae46" />
        <circle cx="1530" cy="330" r="64" fill="#4fae46" />
        <circle cx="1410" cy="222" r="70" fill="#5bbb4f" />
        <circle cx="1505" cy="218" r="70" fill="#5bbb4f" />
        <circle cx="1455" cy="285" r="108" fill="#5bbb4f" />
      </g>
      <circle cx="1455" cy="285" r="104" fill="#5bbb4f" />
      <g fill="#7fd06a" opacity="0.8">
        <circle cx="1405" cy="205" r="24" />
        <circle cx="1500" cy="200" r="20" />
        <circle cx="1470" cy="262" r="26" />
        <circle cx="1350" cy="315" r="18" />
      </g>

      {/* front yard */}
      <path d="M 0 700 C 400 690 1000 694 1600 700 L 1600 1200 L 0 1200 Z" fill="url(#farm-yard)" />

      {/* the long fence (the part in front of the farmer is drawn again in the Foreground) */}
      <Shadow x={1095} y={712} rx={520} ry={10} o={0.08} />
      <FencePlanks from={FENCE_X0} to={1640} />

      {/* dirt yard in front of the barn */}
      <ellipse cx="335" cy="770" rx="300" ry="66" fill="#e7cf98" />
      <ellipse cx="335" cy="770" rx="250" ry="44" fill="#eedaa8" />
      <Shadow x={350} y={704} rx={260} ry={14} o={0.12} />

      {/* pond */}
      <ellipse cx="250" cy="1062" rx="222" ry="92" fill="#6db84f" />
      <ellipse cx="250" cy="1058" rx="206" ry="78" fill="url(#farm-pond)" stroke="#3b95c9" strokeWidth="5" />
      <path d="M 110 1040 Q 140 1030 170 1040 M 330 1095 Q 360 1085 390 1095 M 360 1030 Q 385 1022 410 1030" fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.6" />
      <ellipse cx="255" cy="1088" rx="78" ry="13" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
      <path d="M 108 1086 a 24 10 0 1 1 6 8 L 100 1086 Z" fill="#4cbf4c" stroke="#3a9a3a" strokeWidth="2" />
      <path d="M 392 1060 a 20 8 0 1 1 5 7 L 385 1060 Z" fill="#4cbf4c" stroke="#3a9a3a" strokeWidth="2" />
      <GrassTuft x={44} y={1040} s={1.1} color="#4f9e3a" />
      <GrassTuft x={70} y={1060} s={0.8} color="#5aaa45" />
      <GrassTuft x={462} y={1050} s={0.9} color="#4f9e3a" />

      {/* mud puddle for the pig */}
      <ellipse cx="738" cy="914" rx="108" ry="26" fill="#a7774b" />
      <ellipse cx="730" cy="910" rx="80" ry="15" fill="#8b5e3a" />
      <circle cx="660" cy="922" r="8" fill="#a7774b" />
      <circle cx="830" cy="924" r="6" fill="#a7774b" />

      {/* little straw nest for the egg */}
      <ellipse cx="1300" cy="1132" rx="56" ry="17" fill="#c98a3a" stroke="#9a6233" strokeWidth="3" />
      <ellipse cx="1300" cy="1127" rx="38" ry="9" fill="#8b5e2b" />
      <g fill="none" stroke="#f0c25a" strokeWidth="3.5">
        <path d="M 1248 1130 Q 1262 1142 1280 1146" />
        <path d="M 1290 1148 Q 1310 1150 1330 1144" />
        <path d="M 1322 1146 Q 1342 1140 1354 1128" />
        <path d="M 1252 1124 Q 1258 1116 1272 1114" />
        <path d="M 1330 1114 Q 1344 1116 1350 1124" />
      </g>

      {/* soft shadows */}
      <Shadow x={800} y={694} rx={125} ry={14} o={0.12} />
      <Shadow x={630} y={706} rx={40} ry={8} />
      <Shadow x={175} y={893} rx={80} />
      <Shadow x={465} y={907} rx={90} />
      <Shadow x={968} y={906} rx={72} />
      <Shadow x={1185} y={900} rx={66} />
      <Shadow x={1470} y={882} rx={115} ry={16} />
      <Shadow x={560} y={1140} rx={66} />
      <Shadow x={775} y={1131} rx={68} />
      <Shadow x={985} y={1116} rx={52} ry={12} />
      <Shadow x={1215} y={1105} rx={40} ry={10} />
      <Shadow x={1470} y={1120} rx={55} ry={12} />

      {/* grass and daisies */}
      <GrassTuft x={40} y={760} s={0.9} />
      <GrassTuft x={640} y={800} s={0.8} />
      <GrassTuft x={860} y={760} s={0.7} />
      <GrassTuft x={1080} y={760} s={0.8} />
      <GrassTuft x={1300} y={930} s={0.8} />
      <GrassTuft x={1570} y={960} s={0.9} />
      <GrassTuft x={880} y={980} s={0.8} />
      <GrassTuft x={660} y={1000} s={0.7} />
      <GrassTuft x={1120} y={1000} s={0.8} />
      <GrassTuft x={60} y={1180} s={0.9} />
      <GrassTuft x={680} y={1190} s={0.8} />
      <GrassTuft x={1120} y={1190} s={0.9} />
      <GrassTuft x={1560} y={1185} s={0.9} />
      <Daisy x={60} y={940} />
      <Daisy x={520} y={960} />
      <Daisy x={900} y={1170} />
      <Daisy x={1380} y={960} />
      <Daisy x={1560} y={1060} />
      <Daisy x={1060} y={940} />
      <Daisy x={420} y={1180} />
    </g>
  );
}

// The fence in front of the farmer and the scarecrow, so they stand behind it.
function Foreground() {
  return <FencePlanks from={950} to={1390} />;
}

function Barn() {
  // top edge of the front wall at x, for the plank lines
  const top = (x) => {
    const a = Math.abs(x);
    return a <= 31 ? -43 + (a / 31) * 14 : -29 + ((a - 31) / 9) * 25;
  };
  const planks = [-34, -27, -20, -13, -6, 6, 13, 20, 27, 34];
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* roof */}
      <path d="M -47 0 L -37 -33 L 0 -50 L 37 -33 L 47 0 Z" fill="#8f2f26" stroke="#6a1f19" strokeWidth="1.4" />
      <path d="M -40 -30 L 0 -46 L 40 -30" fill="none" stroke="#b5463b" strokeWidth="1.6" />
      {/* front wall */}
      <path d="M -40 50 L -40 -4 L -31 -29 L 0 -43 L 31 -29 L 40 -4 L 40 50 Z" fill="#e2483a" />
      {planks.map((x) => (
        <line key={x} x1={x} y1={top(x) + 2} x2={x} y2="48" stroke="#c43a2e" strokeWidth="0.9" />
      ))}
      <path d="M -40 50 L -40 -4 L -31 -29 L 0 -43 L 31 -29 L 40 -4 L 40 50" fill="none" stroke="#ffffff" strokeWidth="2.6" />
      {/* stone base */}
      <rect x="-41" y="46" width="82" height="5" rx="1.5" fill="#b9b2a8" stroke="#8c857c" strokeWidth="0.8" />
      {/* loft door with hay */}
      <rect x="-9" y="-31" width="18" height="17" rx="1" fill="#ffffff" />
      <rect x="-7" y="-29" width="14" height="13" fill="#5a2f1f" />
      <path d="M -7 -16 Q -5 -22 -2 -17 Q 0 -23 3 -17 Q 5 -22 7 -16 Z" fill="#f4c542" stroke="#c9952a" strokeWidth="0.6" />
      <circle cx="0" cy="-37" r="2.6" fill="#ffffff" />
      <circle cx="0" cy="-37" r="1.5" fill="#5a2f1f" />
      {/* side windows */}
      {[-33, 23].map((x) => (
        <g key={x}>
          <rect x={x} y="-2" width="10" height="11" rx="1" fill="#ffffff" />
          <rect x={x + 1.4} y="-0.6" width="7.2" height="8.2" fill="#9fdcff" />
          <line x1={x + 5} y1="-0.6" x2={x + 5} y2="7.6" stroke="#ffffff" strokeWidth="1" />
          <line x1={x + 1.4} y1="3.5" x2={x + 8.6} y2="3.5" stroke="#ffffff" strokeWidth="1" />
        </g>
      ))}
      {/* big double door */}
      <rect x="-20" y="12" width="40" height="35" fill="#c63b2f" stroke="#ffffff" strokeWidth="2.4" />
      <line x1="0" y1="12" x2="0" y2="47" stroke="#ffffff" strokeWidth="2" />
      <path d="M -20 12 L 0 47 M 0 12 L -20 47 M 0 12 L 20 47 M 20 12 L 0 47" stroke="#ffffff" strokeWidth="1.8" />
    </g>
  );
}

function Haystack() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -46 40 Q -50 6 -34 -14 Q -18 -36 0 -38 Q 18 -36 34 -14 Q 50 6 46 40 Q 0 46 -46 40 Z" fill="#f4c542" stroke="#c9952a" strokeWidth="1.6" />
      <path d="M -47 30 Q 0 40 47 30 L 46 40 Q 0 46 -46 40 Z" fill="#e5ad33" />
      <g fill="none" stroke="#d9a032" strokeWidth="1.4">
        <path d="M -30 -6 Q -26 -14 -20 -18" />
        <path d="M -12 -24 Q -6 -28 2 -28" />
        <path d="M 14 -18 Q 22 -14 26 -6" />
        <path d="M -36 14 Q -30 6 -24 4" />
        <path d="M -8 4 Q 0 0 8 2" />
        <path d="M 22 10 Q 30 12 36 18" />
        <path d="M -20 24 Q -14 20 -8 22" />
        <path d="M 6 22 Q 12 18 18 22" />
      </g>
      <g fill="none" stroke="#fbe08a" strokeWidth="1.3">
        <path d="M -40 20 Q -36 12 -30 10" />
        <path d="M -24 -2 Q -18 -8 -12 -8" />
        <path d="M 10 -10 Q 16 -6 18 0" />
        <path d="M 28 24 Q 34 26 40 30" />
        <path d="M -2 14 Q 4 10 12 12" />
      </g>
      <path d="M -26 -16 Q -14 -30 2 -32" fill="none" stroke="#fff1b0" strokeWidth="3" />
      <g fill="none" stroke="#e0a83a" strokeWidth="1.4">
        <path d="M -4 -38 L -8 -45 M 2 -38 L 3 -46 M 7 -37 L 12 -43" />
      </g>
      <g fill="none" stroke="#c9952a" strokeWidth="1.3">
        <path d="M -42 41 L -46 46 M -30 43 L -31 48 M -14 44 L -12 49 M 4 44 L 2 49 M 20 43 L 23 48 M 36 42 L 41 46" />
      </g>
    </g>
  );
}

function Pumpkin() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M 2 -18 Q 2 -30 10 -36" fill="none" stroke="#4f7a24" strokeWidth="7" />
      <path d="M 4 -24 Q 20 -34 32 -26 Q 22 -14 4 -22 Z" fill="#5fae3a" stroke="#3f8a26" strokeWidth="1.4" />
      <path d="M -6 -22 Q -16 -30 -10 -36 Q -4 -40 -8 -46" fill="none" stroke="#5fae3a" strokeWidth="2" />
      <ellipse cx="-26" cy="10" rx="20" ry="27" fill="#f7851a" stroke="#c95f08" strokeWidth="1.6" />
      <ellipse cx="26" cy="10" rx="20" ry="27" fill="#f7851a" stroke="#c95f08" strokeWidth="1.6" />
      <ellipse cx="-11" cy="10" rx="19" ry="30" fill="#ff9a2e" stroke="#c95f08" strokeWidth="1.6" />
      <ellipse cx="11" cy="10" rx="19" ry="30" fill="#ff9a2e" stroke="#c95f08" strokeWidth="1.6" />
      <ellipse cx="0" cy="10" rx="13" ry="31" fill="#ffa94a" stroke="#c95f08" strokeWidth="1.6" />
      <path d="M -6 -10 Q -8 4 -6 18" fill="none" stroke="#ffd29a" strokeWidth="3" />
      <ellipse cx="2" cy="-20" rx="6" ry="3" fill="#4f7a24" />
    </g>
  );
}

function Scarecrow() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* pole and arm stick */}
      <rect x="-3.5" y="-8" width="7" height="58" rx="2" fill="#a0693a" stroke="#6e4422" strokeWidth="1.2" />
      {/* straw hands */}
      <g stroke="#e8b73a" strokeWidth="2.6">
        <path d="M -38 -10 L -48 -16 M -38 -9 L -49 -9 M -38 -8 L -47 -2" />
        <path d="M 38 -10 L 48 -16 M 38 -9 L 49 -9 M 38 -8 L 47 -2" />
      </g>
      {/* shirt */}
      <path d="M -39 -16 L -13 -18 L 13 -18 L 39 -16 L 39 -3 L 16 -4 L 18 26 L -18 26 L -16 -4 L -39 -3 Z" fill="#4f8df5" stroke="#2f62c0" strokeWidth="1.4" />
      <g stroke="#7fb0ff" strokeWidth="1.2">
        <line x1="-30" y1="-16" x2="-30" y2="-3" />
        <line x1="-22" y1="-17" x2="-22" y2="-4" />
        <line x1="22" y1="-17" x2="22" y2="-4" />
        <line x1="30" y1="-16" x2="30" y2="-3" />
        <line x1="-9" y1="-18" x2="-10" y2="26" />
        <line x1="9" y1="-18" x2="10" y2="26" />
        <line x1="-17" y1="6" x2="17" y2="6" />
        <line x1="-18" y1="16" x2="18" y2="16" />
      </g>
      <rect x="2" y="7" width="10" height="9" rx="1" fill="#ffd23f" stroke="#c99f00" strokeWidth="1" transform="rotate(8 7 11)" />
      {/* rope belt and straw */}
      <path d="M -18 21 L 18 21" stroke="#a0693a" strokeWidth="2.6" />
      <g stroke="#e8b73a" strokeWidth="2.4">
        <path d="M -16 26 L -18 33 M -10 26 L -11 34 M -4 26 L -6 33 M 4 26 L 6 33 M 10 26 L 11 34 M 16 26 L 18 33" />
      </g>
      {/* head */}
      <path d="M -6 -18 L -9 -13 M 0 -18 L 0 -12 M 6 -18 L 9 -13" stroke="#e8b73a" strokeWidth="2.2" />
      <circle cx="0" cy="-27" r="12" fill="#f3d9a4" stroke="#c9a46a" strokeWidth="1.4" />
      <circle cx="-4.5" cy="-29" r="1.9" fill="#3a2a1a" />
      <circle cx="4.5" cy="-29" r="1.9" fill="#3a2a1a" />
      <circle cx="-7.5" cy="-24" r="2.2" fill="#ff9aa2" opacity="0.8" />
      <circle cx="7.5" cy="-24" r="2.2" fill="#ff9aa2" opacity="0.8" />
      <path d="M -5 -23 Q 0 -18.5 5 -23" fill="none" stroke="#8a5a2b" strokeWidth="1.4" />
      {/* straw hat */}
      <path d="M -10 -36 L -8 -47 Q 0 -51 8 -47 L 10 -36 Z" fill="#f4c542" stroke="#c9952a" strokeWidth="1.4" />
      <rect x="-9.6" y="-41" width="19.2" height="3.4" fill="#e2483a" />
      <ellipse cx="0" cy="-36" rx="21" ry="4.5" fill="#f4c542" stroke="#c9952a" strokeWidth="1.4" />
    </g>
  );
}

const scene = {
  id: 'farm',
  title: 'Farm',
  titleId: 'Peternakan',
  icon: '🐄',
  Background,
  Foreground,
  hideBehind: ['🌾', '🪵', '🌿', '🪣'],
  objects: [
    {
      id: 'barn', word: 'barn', wordId: 'kandang', art: Barn, x: 350, y: 420, size: 560, hit: { w: 470, h: 540 },
      sentence: 'The animals sleep in the barn.', sentenceId: 'Hewan-hewan tidur di kandang.',
      question: 'What color is the barn?', questionId: 'Kandangnya warna apa?',
      answer: 'The barn is red.', answerId: 'Kandangnya merah.',
    },
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '☀️', x: 130, y: 115, size: 150,
      sentence: 'The sun is hot and bright.', sentenceId: 'Mataharinya panas dan terang.',
      question: 'Is it day or night?', questionId: 'Sekarang siang atau malam?',
      answer: 'It is day.', answerId: 'Sekarang siang.',
    },
    {
      id: 'butterfly', word: 'butterfly', wordId: 'kupu-kupu', emoji: '🦋', x: 660, y: 210, size: 90,
      sentence: 'The butterfly flies over the farm.', sentenceId: 'Kupu-kupu terbang di atas peternakan.',
      question: 'Can you flap like a butterfly?', questionId: 'Bisa mengepakkan sayap seperti kupu-kupu?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'bee', word: 'bee', wordId: 'lebah', emoji: '🐝', x: 1010, y: 290, size: 90,
      sentence: 'The bee says buzz, buzz!', sentenceId: 'Lebah bilang bzzz, bzzz!',
      question: 'Can you buzz like a bee?', questionId: 'Bisa berdengung seperti lebah?',
      answer: 'Buzz, buzz, buzz!', answerId: 'Bzzz, bzzz, bzzz!',
    },
    {
      id: 'apple', word: 'apple', wordId: 'apel', emoji: '🍎', x: 1425, y: 300, size: 85,
      sentence: 'The apple grows on the tree.', sentenceId: 'Apelnya tumbuh di pohon.',
      question: 'Is the apple red or green?', questionId: 'Apelnya merah atau hijau?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'haystack', word: 'haystack', wordId: 'tumpukan jerami', art: Haystack, x: 800, y: 590, size: 250, hit: { w: 230, h: 180, dy: 12 },
      sentence: 'The hay is soft and yellow.', sentenceId: 'Jeraminya lembut dan kuning.',
      question: 'Is the haystack big or small?', questionId: 'Tumpukan jeraminya besar atau kecil?',
      answer: 'The haystack is big.', answerId: 'Tumpukan jeraminya besar.',
    },
    {
      id: 'rooster', word: 'rooster', wordId: 'ayam jago', emoji: '🐓', x: 795, y: 455, size: 130,
      sentence: 'The rooster says cock-a-doodle-doo!', sentenceId: 'Ayam jago berkokok kukuruyuk!',
      question: 'Can you crow like a rooster?', questionId: 'Bisa berkokok seperti ayam jago?',
      answer: 'Cock-a-doodle-doo!', answerId: 'Kukuruyuuuk!',
    },
    {
      id: 'sunflower', word: 'sunflower', wordId: 'bunga matahari', emoji: '🌻', x: 630, y: 640, size: 140,
      sentence: 'The sunflower loves the sun.', sentenceId: 'Bunga matahari suka sinar matahari.',
      question: 'Can you smell the sunflower?', questionId: 'Bisa cium bunga mataharinya?',
      answer: 'Sniff, sniff! It smells nice.', answerId: 'Hmm, wangi sekali!',
    },
    {
      id: 'farmer', word: 'farmer', wordId: 'petani', emoji: '🧑‍🌾', x: 1060, y: 530, size: 230,
      sentence: 'The farmer feeds the animals.', sentenceId: 'Petani memberi makan hewan-hewan.',
      question: 'Can you help the farmer?', questionId: 'Kamu bisa bantu petani?',
      answer: 'Yes, I can help!', answerId: 'Ya, aku bisa bantu!',
    },
    {
      id: 'scarecrow', word: 'scarecrow', wordId: 'orang-orangan sawah', art: Scarecrow, x: 1270, y: 470, size: 280, hit: { w: 210, h: 240, dy: -30 },
      sentence: 'The scarecrow keeps the birds away.', sentenceId: 'Orang-orangan sawah mengusir burung.',
      question: 'Can you stand like a scarecrow?', questionId: 'Bisa berdiri seperti orang-orangan sawah?',
      answer: 'Look, my arms are out wide!', answerId: 'Lihat, tanganku terentang lebar!',
    },
    {
      id: 'tractor', word: 'tractor', wordId: 'traktor', emoji: '🚜', x: 1470, y: 780, size: 240,
      sentence: 'The tractor goes vroom, vroom!', sentenceId: 'Traktornya berbunyi brum, brum!',
      question: 'What color is the tractor?', questionId: 'Traktornya warna apa?',
      answer: 'The tractor is green.', answerId: 'Traktornya hijau.',
    },
    {
      id: 'horse', word: 'horse', wordId: 'kuda', emoji: '🐎', x: 175, y: 805, size: 200,
      sentence: 'The horse says neigh!', sentenceId: 'Kuda meringkik, hiiih!',
      question: 'Can you gallop like a horse?', questionId: 'Bisa berlari seperti kuda?',
      answer: 'Clip-clop, clip-clop!', answerId: 'Tuk-tik-tak, tuk-tik-tak!',
    },
    {
      id: 'cow', word: 'cow', wordId: 'sapi', emoji: '🐄', x: 465, y: 815, size: 210,
      sentence: 'The cow says moo!', sentenceId: 'Sapi bilang mooo!',
      question: 'Does milk come from a cow?', questionId: 'Apakah susu berasal dari sapi?',
      answer: 'Yes, milk comes from a cow.', answerId: 'Ya, susu berasal dari sapi.',
    },
    {
      id: 'pig', word: 'pig', wordId: 'babi', emoji: '🐖', x: 738, y: 848, size: 160,
      sentence: 'The pig plays in the mud.', sentenceId: 'Babi bermain di lumpur.',
      question: 'Is the pig pink or blue?', questionId: 'Babinya merah muda atau biru?',
      answer: 'The pig is pink.', answerId: 'Babinya merah muda.',
    },
    {
      id: 'sheep', word: 'sheep', wordId: 'domba', emoji: '🐑', x: 968, y: 830, size: 170,
      sentence: 'The sheep has soft wool.', sentenceId: 'Domba punya bulu yang lembut.',
      question: 'Can you say baa like a sheep?', questionId: 'Bisa bilang mbeee seperti domba?',
      answer: 'Baa, baa!', answerId: 'Mbeee, mbeee!',
    },
    {
      id: 'goat', word: 'goat', wordId: 'kambing', emoji: '🐐', x: 1185, y: 830, size: 160,
      sentence: 'The goat likes to eat grass.', sentenceId: 'Kambing suka makan rumput.',
      question: 'Can you chew like a goat?', questionId: 'Bisa mengunyah seperti kambing?',
      answer: 'Munch, munch, munch!', answerId: 'Nyam, nyam, nyam!',
    },
    {
      id: 'duck', word: 'duck', wordId: 'bebek', emoji: '🦆', x: 255, y: 1030, size: 140,
      sentence: 'The duck says quack, quack!', sentenceId: 'Bebek bilang kwek, kwek!',
      question: 'Can the duck swim?', questionId: 'Bebek bisa berenang?',
      answer: 'Yes, the duck can swim.', answerId: 'Ya, bebek bisa berenang.',
    },
    {
      id: 'pumpkin', word: 'pumpkin', wordId: 'labu', art: Pumpkin, x: 560, y: 1085, size: 150,
      sentence: 'The pumpkin is big and orange.', sentenceId: 'Labunya besar dan oranye.',
      question: 'Is the pumpkin heavy or light?', questionId: 'Labunya berat atau ringan?',
      answer: 'The pumpkin is heavy.', answerId: 'Labunya berat.',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 775, y: 1060, size: 160,
      sentence: 'The dog helps the farmer.', sentenceId: 'Anjing membantu petani.',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof, woof!', answerId: 'Guk, guk!',
    },
    {
      id: 'rabbit', word: 'rabbit', wordId: 'kelinci', emoji: '🐇', x: 985, y: 1062, size: 135,
      sentence: 'The rabbit has long ears.', sentenceId: 'Kelinci punya telinga panjang.',
      question: 'Can you hop like a rabbit?', questionId: 'Bisa melompat seperti kelinci?',
      answer: 'Hop, hop, hop!', answerId: 'Lompat, lompat, lompat!',
    },
    {
      id: 'carrot', word: 'carrot', wordId: 'wortel', emoji: '🥕', x: 1078, y: 1105, size: 85, rotate: -20,
      sentence: 'The rabbit eats a crunchy carrot.', sentenceId: 'Kelinci makan wortel yang renyah.',
      question: 'What color is the carrot?', questionId: 'Wortelnya warna apa?',
      answer: 'The carrot is orange.', answerId: 'Wortelnya oranye.',
    },
    {
      id: 'chick', word: 'chick', wordId: 'anak ayam', emoji: '🐤', x: 1215, y: 1062, size: 100,
      sentence: 'The chick says cheep, cheep!', sentenceId: 'Anak ayam bilang ciap, ciap!',
      question: 'Is the chick big or small?', questionId: 'Anak ayamnya besar atau kecil?',
      answer: 'The chick is small.', answerId: 'Anak ayamnya kecil.',
    },
    {
      id: 'egg', word: 'egg', wordId: 'telur', emoji: '🥚', x: 1300, y: 1102, size: 80,
      sentence: 'A chick comes from an egg.', sentenceId: 'Anak ayam berasal dari telur.',
      question: 'How many eggs can you see?', questionId: 'Ada berapa telur yang kamu lihat?',
      answer: 'I can see one egg.', answerId: 'Aku lihat satu telur.',
    },
    {
      id: 'corn', word: 'corn', wordId: 'jagung', emoji: '🌽', x: 1470, y: 1065, size: 125,
      sentence: 'The corn is yellow and sweet.', sentenceId: 'Jagungnya kuning dan manis.',
      question: 'Do you like corn?', questionId: 'Kamu suka jagung?',
      answer: 'Yes, I like corn!', answerId: 'Ya, aku suka jagung!',
    },
  ],
};

export default scene;

// Kitchen scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

const COUNTER_TOP = 548; // top of the worktop
const COUNTER_FRONT = 574; // bottom of the worktop slab
const FLOOR = 800; // where the wall meets the floor

// A column of drawers under the worktop (plain background furniture).
function Drawers({ x, w, n = 2, top = COUNTER_FRONT + 6 }) {
  const bottom = FLOOR - 22;
  const h = (bottom - top) / n;
  const items = [];
  for (let i = 0; i < n; i++) {
    const y = top + i * h;
    items.push(
      <g key={i}>
        <rect x={x + 8} y={y + 5} width={w - 16} height={h - 10} rx="10" fill="#ffe27a" stroke="#e0b43a" strokeWidth="4" />
        <rect x={x + w / 2 - 32} y={y + 20} width="64" height="12" rx="6" fill="#ffffff" stroke="#e0b43a" strokeWidth="3" />
      </g>,
    );
  }
  return <g>{items}</g>;
}

function Background() {
  const floorTiles = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 16; c++) {
      if ((r + c) % 2 === 0) floorTiles.push(<rect key={`f${r}-${c}`} x={c * 100} y={FLOOR + r * 100} width="100" height="100" fill="#ffe9a6" />);
    }
  }
  const grout = [];
  for (let y = 380; y <= COUNTER_TOP; y += 56) {
    grout.push(<line key={`gh${y}`} x1="0" x2="1600" y1={y} y2={y} stroke="#cfe6da" strokeWidth="4" />);
  }
  for (let x = 0; x <= 1600; x += 56) {
    grout.push(<line key={`gv${x}`} x1={x} x2={x} y1="380" y2={COUNTER_TOP} stroke="#cfe6da" strokeWidth="4" />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="kitchen-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdeed6" />
          <stop offset="1" stopColor="#e3f9ee" />
        </linearGradient>
        <pattern id="kitchen-stripes" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="40" height="80" fill="#ffffff" opacity="0.28" />
        </pattern>
        <pattern id="kitchen-tiles" width="112" height="112" patternUnits="userSpaceOnUse" y="380">
          <rect width="112" height="112" fill="#fffdf2" />
          <rect width="56" height="56" fill="#fff4b8" />
          <rect x="56" y="56" width="56" height="56" fill="#fff4b8" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height={FLOOR} fill="url(#kitchen-wall)" />
      <rect width="1600" height={FLOOR} fill="url(#kitchen-stripes)" />
      <rect width="1600" height="26" fill="#8fdcbb" />

      {/* tiled backsplash behind the worktop */}
      <rect y="380" width="1600" height={COUNTER_TOP - 380} fill="url(#kitchen-tiles)" />
      {grout}
      <rect y="372" width="1600" height="10" rx="3" fill="#ffffff" opacity="0.9" />

      {/* floor */}
      <rect y={FLOOR} width="1600" height={1200 - FLOOR} fill="#fff8de" />
      {floorTiles}
      <rect y={FLOOR} width="1600" height="8" fill="#000" opacity="0.08" />

      {/* wall shelf on the right */}
      <path d="M 1395 366 L 1395 400 L 1420 366 Z" fill="#d9844a" />
      <path d="M 1550 366 L 1550 400 L 1525 366 Z" fill="#d9844a" />
      <rect x="1360" y="352" width="225" height="16" rx="6" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />

      {/* worktop + drawers, left of the stove */}
      <rect x="270" y={COUNTER_FRONT} width="372" height={FLOOR - COUNTER_FRONT} fill="#fff1b0" />
      <Drawers x={290} w={176} />
      <Drawers x={466} w={176} />
      <rect x="270" y={FLOOR - 22} width="372" height="22" fill="#e0b43a" />
      <rect x="262" y={COUNTER_TOP} width="384" height={COUNTER_FRONT - COUNTER_TOP} rx="8" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />

      {/* worktop + drawers, right of the stove */}
      <rect x="888" y={COUNTER_FRONT} width="712" height={FLOOR - COUNTER_FRONT} fill="#fff1b0" />
      <Drawers x={892} w={138} />
      <Drawers x={1030} w={200} n={1} top={656} />
      <Drawers x={1230} w={185} />
      <Drawers x={1415} w={185} />
      <rect x="888" y={FLOOR - 22} width="712" height="22" fill="#e0b43a" />
      <rect x="884" y={COUNTER_TOP} width="730" height={COUNTER_FRONT - COUNTER_TOP} rx="8" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />

      {/* soft shadows on the floor */}
      <ellipse cx="165" cy="804" rx="150" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="765" cy="806" rx="140" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="800" cy="1176" rx="300" ry="20" fill="#000" opacity="0.1" />
      <ellipse cx="1222" cy="1160" rx="95" ry="12" fill="#000" opacity="0.1" />
      <ellipse cx="305" cy="1150" rx="66" ry="10" fill="#000" opacity="0.08" />
      <ellipse cx="1372" cy="1166" rx="45" ry="8" fill="#000" opacity="0.08" />
    </g>
  );
}

function Fridge() {
  return (
    <g strokeLinejoin="round">
      <rect x="-20" y="44" width="6" height="6" rx="1.5" fill="#a83a3a" />
      <rect x="14" y="44" width="6" height="6" rx="1.5" fill="#a83a3a" />
      <rect x="-23" y="-48" width="46" height="94" rx="6" fill="#ff6b6b" stroke="#d64545" strokeWidth="0.9" />
      <rect x="-20.5" y="-45.5" width="41" height="25" rx="4" fill="#ff7f7f" stroke="#d64545" strokeWidth="0.7" />
      <rect x="-20.5" y="-17.5" width="41" height="61" rx="4" fill="#ff7f7f" stroke="#d64545" strokeWidth="0.7" />
      <rect x="12.5" y="-39" width="3.4" height="13" rx="1.7" fill="#ffffff" stroke="#e3d6d6" strokeWidth="0.4" />
      <rect x="12.5" y="-12" width="3.4" height="22" rx="1.7" fill="#ffffff" stroke="#e3d6d6" strokeWidth="0.4" />
      <path d="M -16.5 -41 L -16.5 -26" stroke="#ffb3b3" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M -16.5 -12 L -16.5 36" stroke="#ffb3b3" strokeWidth="1.6" strokeLinecap="round" />
      {/* magnets */}
      <circle cx="-5" cy="-36" r="2.4" fill="#ffd23f" />
      <circle cx="2" cy="-30" r="2" fill="#7cc6fe" />
      <circle cx="-3" cy="-2" r="2.2" fill="#8fe388" />
      <circle cx="4" cy="4" r="1.8" fill="#ffffff" />
    </g>
  );
}

function Cupboard() {
  return (
    <g strokeLinejoin="round">
      <rect x="-48" y="-40" width="96" height="8" rx="2.5" fill="#5aaef0" stroke="#3a8fd6" strokeWidth="1.4" />
      <rect x="-45" y="-33" width="90" height="68" rx="3" fill="#7cc6fe" stroke="#3a8fd6" strokeWidth="1.4" />
      <line x1="0" y1="-33" x2="0" y2="35" stroke="#3a8fd6" strokeWidth="1.4" />
      <rect x="-40" y="-28" width="35" height="58" rx="2.5" fill="none" stroke="#c4e6ff" strokeWidth="1.4" />
      <rect x="5" y="-28" width="35" height="58" rx="2.5" fill="none" stroke="#c4e6ff" strokeWidth="1.4" />
      <circle cx="-5.5" cy="2" r="2.6" fill="#ffd23f" stroke="#d9a400" strokeWidth="0.8" />
      <circle cx="5.5" cy="2" r="2.6" fill="#ffd23f" stroke="#d9a400" strokeWidth="0.8" />
      <rect x="-46" y="35" width="92" height="5" rx="2" fill="#5aaef0" stroke="#3a8fd6" strokeWidth="1.2" />
    </g>
  );
}

function Clock() {
  const ticks = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    ticks.push(<circle key={i} cx={Math.sin(a) * 29} cy={-Math.cos(a) * 29} r={i % 3 === 0 ? 3.2 : 1.9} fill="#5b6b7f" />);
  }
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle r="44" fill="#ff9f43" stroke="#e07b1a" strokeWidth="3" />
      <circle r="36" fill="#ffffff" stroke="#ffd7a8" strokeWidth="2" />
      {ticks}
      <line x1="0" y1="0" x2="10" y2="-15" stroke="#3d4552" strokeWidth="5" />
      <line x1="0" y1="0" x2="0" y2="-26" stroke="#3d4552" strokeWidth="3.5" />
      <circle r="4.5" fill="#ff6b6b" />
    </g>
  );
}

function KitchenWindow() {
  // a scalloped valance along the top
  let valance = 'M -46 -46 L 46 -46 L 46 -36';
  const n = 8;
  for (let i = 0; i < n; i++) {
    const x0 = 46 - (92 / n) * i;
    const x1 = 46 - (92 / n) * (i + 1);
    valance += ` Q ${(x0 + x1) / 2} -28 ${x1} -36`;
  }
  valance += ' Z';
  return (
    <g strokeLinejoin="round">
      <rect x="-34" y="-38" width="68" height="72" rx="4" fill="#ffffff" stroke="#cfe3da" strokeWidth="1" />
      <rect x="-30" y="-34" width="60" height="64" rx="2" fill="#9fdcff" />
      <circle cx="14" cy="-14" r="7.5" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="-17" cy="-8" r="4.5" />
        <circle cx="-11" cy="-11" r="6" />
        <circle cx="-5" cy="-8" r="4.5" />
        <rect x="-17" y="-8" width="12" height="4.5" />
      </g>
      <path d="M -30 30 Q -16 10 2 22 Q 16 12 30 20 L 30 30 Z" fill="#7ed957" />
      <path d="M -6 30 Q 10 18 30 26 L 30 30 Z" fill="#5cc73f" />
      <rect x="-1.5" y="-34" width="3" height="64" fill="#ffffff" />
      <rect x="-30" y="-3" width="60" height="3" fill="#ffffff" />
      <rect x="-40" y="32" width="80" height="6" rx="2" fill="#ffffff" stroke="#bfe0d1" strokeWidth="1" />
      {/* tied-back curtains */}
      <path d="M -46 -40 L -29 -40 Q -26 -14 -36 -4 Q -31 12 -35 32 L -46 32 Z" fill="#ffe066" stroke="#e0b400" strokeWidth="1" />
      <path d="M 46 -40 L 29 -40 Q 26 -14 36 -4 Q 31 12 35 32 L 46 32 Z" fill="#ffe066" stroke="#e0b400" strokeWidth="1" />
      <g fill="#ffffff" opacity="0.85">
        <circle cx="-40" cy="-30" r="1.6" />
        <circle cx="-35" cy="-18" r="1.6" />
        <circle cx="-41" cy="-8" r="1.6" />
        <circle cx="-40" cy="10" r="1.6" />
        <circle cx="-41" cy="24" r="1.6" />
        <circle cx="40" cy="-30" r="1.6" />
        <circle cx="35" cy="-18" r="1.6" />
        <circle cx="41" cy="-8" r="1.6" />
        <circle cx="40" cy="10" r="1.6" />
        <circle cx="41" cy="24" r="1.6" />
      </g>
      <rect x="-42" y="-6" width="9" height="4" rx="2" fill="#ff8fab" />
      <rect x="33" y="-6" width="9" height="4" rx="2" fill="#ff8fab" />
      <path d={valance} fill="#ffe066" stroke="#e0b400" strokeWidth="1" />
      <rect x="-48" y="-49" width="96" height="4" rx="2" fill="#a0613a" />
    </g>
  );
}

function Plate() {
  const dots = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    dots.push(<circle key={i} cx={Math.cos(a) * 37} cy={Math.sin(a) * 37} r="3" fill="#4a9be0" />);
  }
  return (
    <g>
      <circle r="45" fill="#ffffff" stroke="#9fb6d6" strokeWidth="3" />
      {dots}
      <circle r="27" fill="#f3f8fd" stroke="#cfdcec" strokeWidth="2.5" />
      <path d="M -20 -10 A 22 22 0 0 1 -6 -21" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Stove() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-44" y="43" width="8" height="7" rx="2" fill="#5b6b7f" />
      <rect x="36" y="43" width="8" height="7" rx="2" fill="#5b6b7f" />
      <rect x="-47" y="-38" width="94" height="83" rx="5" fill="#ffffff" stroke="#9aa9bb" strokeWidth="1.6" />
      {/* cooktop with two burners */}
      <path d="M -44 -50 L 44 -50 L 48 -38 L -48 -38 Z" fill="#4a5568" stroke="#2f3846" strokeWidth="1.6" />
      <ellipse cx="-22" cy="-44" rx="13" ry="3.4" fill="#2f3846" stroke="#7d8a9c" strokeWidth="1.2" />
      <ellipse cx="22" cy="-44" rx="13" ry="3.4" fill="#2f3846" stroke="#7d8a9c" strokeWidth="1.2" />
      {/* knobs */}
      <rect x="-43" y="-34" width="86" height="11" rx="3" fill="#eef2f7" stroke="#c3cdd9" strokeWidth="1" />
      {[-30, -12, 12, 30].map((kx) => (
        <g key={kx}>
          <circle cx={kx} cy="-28.5" r="3.8" fill="#3d4552" />
          <line x1={kx} y1="-28.5" x2={kx} y2="-31.5" stroke="#ffffff" strokeWidth="1.2" />
        </g>
      ))}
      {/* oven door */}
      <rect x="-42" y="-19" width="84" height="58" rx="4" fill="#f6f8fb" stroke="#9aa9bb" strokeWidth="1.4" />
      <rect x="-30" y="-16" width="60" height="5" rx="2.5" fill="#c3cdd9" stroke="#8a99ab" strokeWidth="1" />
      <rect x="-32" y="-6" width="64" height="38" rx="4" fill="#3d4552" />
      <path d="M -10 -2 L -5 -2 L -13 28 L -18 28 Z" fill="#ffffff" opacity="0.1" />
      <path d="M -26 -2 L -16 -2 L -24 28 L -30 28 Z" fill="#ffffff" opacity="0.15" />
    </g>
  );
}

function Kettle() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -20 -14 Q -22 -46 0 -46 Q 22 -46 20 -14" fill="none" stroke="#5b4636" strokeWidth="7" />
      <path d="M -27 16 L -49 -12 Q -51 -18 -45 -18 L -21 -2 Z" fill="#ff9f43" stroke="#e07b1a" strokeWidth="3.5" />
      <path d="M -36 40 Q -40 6 -22 -12 Q 0 -20 22 -12 Q 40 6 36 40 Z" fill="#ff9f43" stroke="#e07b1a" strokeWidth="3.5" />
      <rect x="-38" y="32" width="76" height="9" rx="4" fill="#e07b1a" />
      <ellipse cx="0" cy="-14" rx="16" ry="5" fill="#ffb86b" stroke="#e07b1a" strokeWidth="3" />
      <circle cx="0" cy="-21" r="5" fill="#5b4636" />
      <path d="M -22 4 Q -26 16 -24 26" fill="none" stroke="#ffd1a1" strokeWidth="4" />
    </g>
  );
}

function Sink() {
  const tap = 'M 0 -12 L 0 -36 Q 0 -46 11 -46 Q 22 -46 22 -36 L 22 -31';
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-5" y="-15" width="10" height="9" rx="2" fill="#b8c4d2" stroke="#7d8da1" strokeWidth="1.4" />
      <path d={tap} fill="none" stroke="#7d8da1" strokeWidth="8.5" />
      <path d={tap} fill="none" stroke="#d3dce6" strokeWidth="5.5" />
      <circle cx="-13" cy="-10" r="4.5" fill="#ff6b6b" stroke="#d94848" strokeWidth="1.2" />
      <circle cx="13" cy="-10" r="4.5" fill="#4a9be0" stroke="#2f78c0" strokeWidth="1.2" />
      <rect x="19.5" y="-30" width="5" height="28" rx="2.5" fill="#7cc6fe" opacity="0.9" />
      <rect x="-46" y="-6" width="92" height="12" rx="5" fill="#eef3f8" stroke="#8fa1b5" strokeWidth="1.6" />
      <rect x="-40" y="-3" width="80" height="6" rx="3" fill="#8fd3ff" stroke="#6aa9d6" strokeWidth="1" />
      <g fill="#ffffff" stroke="#9fd0f5" strokeWidth="0.8">
        <circle cx="-30" cy="-9" r="3.2" />
        <circle cx="-23" cy="-13" r="2.3" />
        <circle cx="-35" cy="-15" r="1.8" />
      </g>
      <path d="M -44 6 L 44 6 L 44 34 Q 44 42 36 42 L -36 42 Q -44 42 -44 34 Z" fill="#ffffff" stroke="#8fa1b5" strokeWidth="1.6" />
      <path d="M -36 13 L -36 33" stroke="#e3eaf2" strokeWidth="3" />
    </g>
  );
}

function Table() {
  // red-and-white checked tablecloth, drawn with stripes (no SVG ids needed)
  const stripes = [];
  for (let x = -47; x < 47; x += 8) {
    stripes.push(<rect key={`v${x}`} x={x} y="-21" width="4" height="16" fill="#ff6b6b" opacity="0.45" />);
  }
  for (let y = -21; y < -5; y += 8) {
    stripes.push(<rect key={`h${y}`} x="-47" y={y} width="94" height="4" fill="#ff6b6b" opacity="0.45" />);
  }
  const trim = [];
  for (let i = 0; i < 12; i++) {
    const cx = -47 + (94 / 12) * (i + 0.5);
    trim.push(<circle key={i} cx={cx} cy="-5" r={94 / 24} fill="#ff6b6b" />);
  }
  return (
    <g strokeLinejoin="round">
      {/* back legs */}
      <rect x="-35" y="-6" width="5" height="30" rx="2" fill="#c9773a" />
      <rect x="30" y="-6" width="5" height="30" rx="2" fill="#c9773a" />
      {/* front legs */}
      <rect x="-44" y="-6" width="6" height="34" rx="2.5" fill="#f4a261" stroke="#c9773a" strokeWidth="0.8" />
      <rect x="38" y="-6" width="6" height="34" rx="2.5" fill="#f4a261" stroke="#c9773a" strokeWidth="0.8" />
      {/* table top + cloth */}
      <rect x="-49" y="-26" width="98" height="6" rx="2" fill="#f4a261" stroke="#c9773a" strokeWidth="0.8" />
      {trim}
      <rect x="-47" y="-21" width="94" height="16" fill="#ffffff" />
      {stripes}
      <rect x="-47" y="-21" width="94" height="16" fill="none" stroke="#e05a5a" strokeWidth="0.6" />
    </g>
  );
}

function Chair() {
  const wood = '#4fc3a1';
  const dark = '#2f9e80';
  return (
    <g strokeLinejoin="round">
      <rect x="-21" y="6" width="5" height="38" rx="2" fill={dark} />
      <rect x="16" y="6" width="5" height="38" rx="2" fill={dark} />
      <rect x="-25" y="-46" width="6" height="50" rx="3" fill={wood} stroke={dark} strokeWidth="1.6" />
      <rect x="19" y="-46" width="6" height="50" rx="3" fill={wood} stroke={dark} strokeWidth="1.6" />
      <rect x="-27" y="-48" width="54" height="13" rx="5" fill={wood} stroke={dark} strokeWidth="1.6" />
      <rect x="-21" y="-27" width="42" height="6" rx="3" fill={wood} stroke={dark} strokeWidth="1.4" />
      <path d="M -24 -2 L 24 -2 L 30 8 L -30 8 Z" fill="#7ad9bd" stroke={dark} strokeWidth="1.6" />
      <path d="M -20 -4 Q 0 -9 20 -4 L 25 6 Q 0 9 -25 6 Z" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.2" />
      <rect x="-31" y="7" width="62" height="7" rx="2.5" fill={wood} stroke={dark} strokeWidth="1.6" />
      <rect x="-30" y="13" width="6" height="36" rx="2.5" fill={wood} stroke={dark} strokeWidth="1.6" />
      <rect x="24" y="13" width="6" height="36" rx="2.5" fill={wood} stroke={dark} strokeWidth="1.6" />
    </g>
  );
}

const kitchen = {
  id: 'kitchen',
  title: 'Kitchen',
  titleId: 'Dapur',
  icon: '🍳',
  Background,
  objects: [
    // --- big things ---
    {
      id: 'fridge', word: 'fridge', wordId: 'kulkas', art: Fridge, x: 165, y: 527, size: 560, hit: { w: 250, h: 520 },
      sentence: 'The fridge keeps food cold.', sentenceId: 'Kulkas bikin makanan tetap dingin.',
      question: 'Is the fridge hot or cold?', questionId: 'Kulkasnya panas atau dingin?',
      answer: 'The fridge is cold. Brrr!', answerId: 'Kulkasnya dingin. Brrr!',
    },
    {
      id: 'cupboard', word: 'cupboard', wordId: 'lemari dapur', art: Cupboard, x: 500, y: 212, size: 300, hit: { w: 280, h: 230 },
      sentence: 'Please open the cupboard.', sentenceId: 'Tolong buka lemarinya.',
      question: 'What color is the cupboard?', questionId: 'Lemarinya warna apa?',
      answer: 'The cupboard is blue.', answerId: 'Lemarinya biru.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: KitchenWindow, x: 1130, y: 262, size: 330, hit: { w: 280, h: 270, dy: -6 },
      sentence: 'I can see the sun outside.', sentenceId: 'Aku bisa lihat matahari di luar.',
      question: 'Is it day or night?', questionId: 'Sekarang siang atau malam?',
      answer: 'It is day.', answerId: 'Sekarang siang.',
    },
    {
      id: 'stove', word: 'stove', wordId: 'kompor', art: Stove, x: 765, y: 672, size: 260, hit: { w: 250, h: 250 },
      sentence: "The stove is hot. Don't touch!", sentenceId: 'Kompornya panas. Jangan dipegang!',
      question: 'Can you stir like a cook?', questionId: 'Bisa mengaduk seperti koki?',
      answer: 'Stir, stir, stir!', answerId: 'Aduk, aduk, aduk!',
    },
    {
      id: 'sink', word: 'sink', wordId: 'bak cuci piring', art: Sink, x: 1130, y: 561, size: 220, hit: { w: 210, h: 200, dy: -6 },
      sentence: 'We wash the dishes in the sink.', sentenceId: 'Kita cuci piring di bak cuci.',
      question: 'Can you wash your hands?', questionId: 'Bisa cuci tangan?',
      answer: 'Yes! Scrub, scrub, scrub!', answerId: 'Bisa! Gosok, gosok, gosok!',
    },
    {
      id: 'table', word: 'table', wordId: 'meja', art: Table, x: 800, y: 1040, size: 540, hit: { w: 530, h: 290, dy: 6 },
      sentence: 'We eat together at the table.', sentenceId: 'Kita makan bersama di meja.',
      question: 'What is on the table?', questionId: 'Ada apa di atas meja?',
      answer: 'A cake and an apple!', answerId: 'Ada kue dan apel!',
    },
    {
      id: 'chair', word: 'chair', wordId: 'kursi', art: Chair, x: 1222, y: 1030, size: 260, hit: { w: 170, h: 250 },
      sentence: 'I sit on the chair to eat.', sentenceId: 'Aku duduk di kursi kalau makan.',
      question: 'Can you sit down and stand up?', questionId: 'Bisa duduk lalu berdiri?',
      answer: 'Sit down! Stand up!', answerId: 'Duduk! Berdiri!',
    },

    // --- on the wall ---
    {
      id: 'clock', word: 'clock', wordId: 'jam dinding', art: Clock, x: 800, y: 185, size: 140,
      sentence: 'It is time to eat!', sentenceId: 'Sudah waktunya makan!',
      question: 'Is the clock round or square?', questionId: 'Jamnya bulat atau kotak?',
      answer: 'The clock is round.', answerId: 'Jamnya bulat.',
    },
    {
      id: 'plate', word: 'plate', wordId: 'piring', art: Plate, x: 1428, y: 293, size: 125,
      sentence: 'I put my food on a plate.', sentenceId: 'Aku taruh makananku di piring.',
      question: 'What do you eat on a plate?', questionId: 'Kamu makan apa pakai piring?',
      answer: 'I eat rice on a plate.', answerId: 'Aku makan nasi pakai piring.',
    },
    {
      id: 'cup', word: 'cup', wordId: 'cangkir', emoji: '☕', x: 1525, y: 318, size: 88,
      sentence: 'The cup is hot. Blow on it!', sentenceId: 'Cangkirnya panas. Tiup dulu!',
      question: 'Can you blow on the cup?', questionId: 'Bisa tiup cangkirnya?',
      answer: 'Whoo! Now it is cool.', answerId: 'Fuuh! Sekarang sudah tidak panas.',
    },
    {
      id: 'honey', word: 'honey', wordId: 'madu', emoji: '🍯', x: 125, y: 210, size: 95,
      sentence: 'Honey is sweet and sticky.', sentenceId: 'Madu itu manis dan lengket.',
      question: 'Is honey sweet or sour?', questionId: 'Madu itu manis atau asam?',
      answer: 'Honey is sweet.', answerId: 'Madu itu manis.',
    },

    // --- on the worktop and the stove ---
    {
      id: 'bread', word: 'bread', wordId: 'roti', emoji: '🍞', x: 385, y: 503, size: 100,
      sentence: 'I eat bread for breakfast.', sentenceId: 'Aku makan roti untuk sarapan.',
      question: 'Do you like bread with jam?', questionId: 'Kamu suka roti pakai selai?',
      answer: 'Yes, I love jam!', answerId: 'Ya, aku suka selai!',
    },
    {
      id: 'carrot', word: 'carrot', wordId: 'wortel', emoji: '🥕', x: 540, y: 500, size: 100,
      sentence: 'The carrot is orange and crunchy.', sentenceId: 'Wortelnya oranye dan renyah.',
      question: 'Can you crunch like a rabbit?', questionId: 'Bisa makan kriuk-kriuk seperti kelinci?',
      answer: 'Crunch, crunch, crunch!', answerId: 'Kriuk, kriuk, kriuk!',
    },
    {
      id: 'pan', word: 'pan', wordId: 'wajan', emoji: '🍳', x: 705, y: 520, size: 110,
      sentence: 'We cook an egg in the pan.', sentenceId: 'Kita masak telur di wajan.',
      question: 'Do you like eggs?', questionId: 'Kamu suka telur?',
      answer: 'Yes, I like eggs!', answerId: 'Ya, aku suka telur!',
    },
    {
      id: 'kettle', word: 'kettle', wordId: 'teko', art: Kettle, x: 822, y: 510, size: 120,
      sentence: 'The kettle boils the water.', sentenceId: 'Teko itu untuk masak air.',
      question: 'Can you whistle like a kettle?', questionId: 'Bisa bersiul seperti teko?',
      answer: 'Wheee! Wheee!', answerId: 'Wiii! Wiii!',
    },
    {
      id: 'banana', word: 'banana', wordId: 'pisang', emoji: '🍌', x: 1335, y: 505, size: 100,
      sentence: 'The banana is yellow.', sentenceId: 'Pisangnya kuning.',
      question: 'Do you like bananas?', questionId: 'Kamu suka pisang?',
      answer: 'Yes, I love bananas!', answerId: 'Ya, aku suka sekali pisang!',
    },
    {
      id: 'grapes', word: 'grapes', wordId: 'anggur', emoji: '🍇', x: 1480, y: 500, size: 105,
      sentence: 'The grapes are purple.', sentenceId: 'Anggurnya ungu.',
      question: 'Are grapes big or small?', questionId: 'Anggur itu besar atau kecil?',
      answer: 'Grapes are small.', answerId: 'Anggur itu kecil.',
    },

    // --- on the table ---
    {
      id: 'milk', word: 'milk', wordId: 'susu', emoji: '🥛', x: 725, y: 853, size: 95,
      sentence: 'Milk makes me strong!', sentenceId: 'Susu bikin aku kuat!',
      question: 'Can you show your strong arms?', questionId: 'Bisa tunjukkan otot tanganmu?',
      answer: 'Look! I am strong!', answerId: 'Lihat! Aku kuat!',
    },
    {
      id: 'cake', word: 'cake', wordId: 'kue', emoji: '🎂', x: 852, y: 845, size: 115,
      sentence: 'The birthday cake is yummy!', sentenceId: 'Kue ulang tahunnya enak!',
      question: 'Can you sing Happy Birthday?', questionId: 'Bisa nyanyi lagu Selamat Ulang Tahun?',
      answer: 'Happy birthday to you!', answerId: 'Selamat ulang tahun untukmu!',
    },
    {
      id: 'watermelon', word: 'watermelon', wordId: 'semangka', emoji: '🍉', x: 962, y: 510, size: 100,
      sentence: 'The watermelon is sweet and juicy.', sentenceId: 'Semangkanya manis dan segar.',
      question: 'Is it red or blue inside?', questionId: 'Dalamnya merah atau biru?',
      answer: 'It is red inside.', answerId: 'Dalamnya merah.',
    },
    {
      id: 'apple', word: 'apple', wordId: 'apel', emoji: '🍎', x: 980, y: 853, size: 100,
      sentence: 'I eat an apple. Yum!', sentenceId: 'Aku makan apel. Nyam!',
      question: 'What color is the apple?', questionId: 'Apelnya warna apa?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'cheese', word: 'cheese', wordId: 'keju', emoji: '🧀', x: 603, y: 857, size: 100,
      sentence: 'The mouse wants the cheese!', sentenceId: 'Tikus itu mau kejunya!',
      question: 'Can you say cheese and smile?', questionId: 'Bisa bilang cheese sambil senyum?',
      answer: 'Cheeese! Big smile!', answerId: 'Cheeese! Senyum lebar!',
    },

    // --- on the floor ---
    {
      id: 'broom', word: 'broom', wordId: 'sapu', emoji: '🧹', x: 1330, y: 1076, size: 180, flip: true, rotate: 21, hit: { w: 130, h: 220, dx: 20, dy: -6 },
      sentence: 'I sweep the floor with a broom.', sentenceId: 'Aku menyapu lantai pakai sapu.',
      question: 'Can you sweep like this?', questionId: 'Bisa menyapu seperti ini?',
      answer: 'Swish, swish, swish!', answerId: 'Srek, srek, srek!',
    },
    {
      id: 'mouse', word: 'mouse', wordId: 'tikus', emoji: '🐁', x: 305, y: 1100, size: 125, flip: true,
      sentence: 'The little mouse says squeak!', sentenceId: 'Tikus kecil bunyinya cit-cit!',
      question: 'Can you squeak like a mouse?', questionId: 'Bisa bunyi cit-cit seperti tikus?',
      answer: 'Squeak, squeak!', answerId: 'Cit, cit!',
    },
  ],
};

export default kitchen;

// Train Station scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// Side view of a platform: a roof canopy along the top, a train on the track at the back,
// the platform (with its yellow safety line) in front, and a ticket booth on the right.

const CANOPY = '#2fa38a';
const CANOPY_DARK = '#1f7f6b';
const RAIL_TOP = 610; // the train's wheels stand on this line
const EDGE = 660; // the platform edge
const BOOTH = { l: 1175, r: 1575, top: 405, bot: 940 };

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity="0.9">
      <ellipse cx="0" cy="12" rx="70" ry="22" />
      <circle cx="-28" cy="0" r="28" />
      <circle cx="10" cy="-12" r="36" />
      <circle cx="42" cy="4" r="24" />
    </g>
  );
}

function Background() {
  // track: sleepers under the rail and stones in the ballast
  const sleepers = [];
  for (let x = 10; x < 1600; x += 46) {
    sleepers.push(<rect key={`s${x}`} x={x} y={RAIL_TOP + 8} width="26" height="12" rx="2" fill="#8a6b52" />);
  }
  const stones = [];
  for (let i = 0; i < 70; i++) {
    const x = (i * 97) % 1600;
    const y = 638 + ((i * 37) % 20);
    stones.push(<ellipse key={`st${i}`} cx={x} cy={y} rx="7" ry="4" fill="#a89786" opacity="0.7" />);
  }

  // platform paving
  const paving = [];
  const rows = [730, 790, 860, 940, 1030, 1130];
  rows.forEach((y, r) => {
    paving.push(<line key={`pr${y}`} x1="0" x2="1600" y1={y} y2={y} stroke="#e0d2b8" strokeWidth="3" />);
    const next = rows[r + 1] || 1200;
    const step = 120 + r * 30;
    for (let x = (r % 2) * (step / 2); x < 1600; x += step) {
      paving.push(<line key={`pj${y}-${x}`} x1={x} x2={x} y1={y} y2={next} stroke="#e0d2b8" strokeWidth="3" />);
    }
  });

  // tactile bumps on the yellow safety line
  const bumps = [];
  for (let x = 14; x < 1600; x += 28) {
    bumps.push(<circle key={`b1${x}`} cx={x} cy="700" r="3.5" fill="#f0b400" />);
    bumps.push(<circle key={`b2${x}`} cx={x + 14} cy="712" r="3.5" fill="#f0b400" />);
  }

  // scalloped edge of the canopy
  const scallops = [];
  for (let x = 0; x < 1600; x += 50) {
    scallops.push(
      <path key={`sc${x}`} d={`M${x} 98 h50 v18 q-25 26 -50 0 Z`} fill="#fff6e0" stroke={CANOPY_DARK} strokeWidth="3" strokeLinejoin="round" />,
    );
  }
  const rafters = [];
  for (let x = 40; x < 1600; x += 120) {
    rafters.push(<rect key={`r${x}`} x={x} y="0" width="14" height="92" fill={CANOPY_DARK} opacity="0.45" />);
  }

  const shadow = (cx, cy, rx, ry = 13, o = 0.1) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#000" opacity={o} />;

  return (
    <g>
      <defs>
        <linearGradient id="train-station-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3ff" />
          <stop offset="1" stopColor="#e3f6ff" />
        </linearGradient>
        <linearGradient id="train-station-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e9d6" />
          <stop offset="1" stopColor="#f8f1e4" />
        </linearGradient>
      </defs>

      {/* sky and far hills, seen across the track */}
      <rect width="1600" height="640" fill="url(#train-station-sky)" />
      <Cloud x={300} y={340} s={0.6} />
      <Cloud x={1080} y={300} s={0.7} />
      <path d="M0 520 Q 200 440 420 500 Q 640 430 880 495 Q 1100 440 1320 500 Q 1480 450 1600 480 L1600 640 L0 640 Z" fill="#bfe6a8" />
      <path d="M0 565 Q 260 515 520 560 Q 800 510 1060 560 Q 1330 515 1600 555 L1600 640 L0 640 Z" fill="#9ed98a" />

      {/* track */}
      <rect y="596" width="1600" height={EDGE - 596} fill="#c7b8a6" />
      {stones}
      {sleepers}
      <rect y={RAIL_TOP} width="1600" height="10" fill="#8f9aab" />
      <rect y={RAIL_TOP} width="1600" height="3" fill="#dfe5ee" />

      {/* platform */}
      <rect y={EDGE} width="1600" height={1200 - EDGE} fill="url(#train-station-floor)" />
      {paving}
      <rect y={EDGE} width="1600" height="22" fill="#ddd5c6" />
      <rect y={EDGE} width="1600" height="5" fill="#a89f90" />
      <rect y="690" width="1600" height="30" fill="#ffd23f" />
      {bumps}

      {/* canopy roof along the top */}
      <rect width="1600" height="100" fill={CANOPY} />
      {rafters}
      <rect y="86" width="1600" height="14" fill={CANOPY_DARK} />
      {scallops}

      {/* soft shadows on the platform */}
      {shadow(140, 938, 90, 10)}
      {shadow(560, 926, 215, 14)}
      {shadow(600, 1150, 60, 10)}
      {shadow(1020, 900, 60, 10)}
      {shadow(170, 1124, 85)}
      {shadow(390, 1142, 65, 11)}
      {shadow(805, 1112, 85)}
      {shadow(1150, 1135, 70, 11)}
      {shadow(1375, 945, 220, 16, 0.12)}
      {shadow(1480, 1152, 80, 12)}

      {/* ticket booth (the counter in front of the conductor is in Foreground) */}
      <rect x={BOOTH.l} y={BOOTH.top} width={BOOTH.r - BOOTH.l} height={BOOTH.bot - BOOTH.top} rx="14" fill="#ff8a65" stroke="#d9603b" strokeWidth="6" />
      <rect x="1235" y="452" width="280" height="240" rx="10" fill="#fff3dc" stroke="#d9603b" strokeWidth="5" />
      <rect x="1245" y="462" width="260" height="60" rx="6" fill="#ffe7c2" />
      <rect x="1150" y="350" width="445" height="62" rx="18" fill={CANOPY} stroke={CANOPY_DARK} strokeWidth="5" />
      <rect x="1170" y="362" width="405" height="10" rx="5" fill="#ffffff" opacity="0.35" />
      {/* chain for the bell */}
      <line x1="1208" y1="412" x2="1208" y2="438" stroke="#8a6b52" strokeWidth="4" strokeLinecap="round" />

      {/* map board */}
      <rect x="82" y="860" width="12" height="76" rx="4" fill={CANOPY_DARK} />
      <rect x="186" y="860" width="12" height="76" rx="4" fill={CANOPY_DARK} />
      <rect x="55" y="712" width="170" height="156" rx="12" fill="#fff6e0" stroke={CANOPY} strokeWidth="7" />

      {/* flower pot */}
      <path d="M1428 1075 L1532 1075 L1518 1150 L1442 1150 Z" fill="#e07a4f" stroke="#b85a33" strokeWidth="4" strokeLinejoin="round" />
      <rect x="1416" y="1062" width="128" height="20" rx="8" fill="#f29468" stroke="#b85a33" strokeWidth="4" />
    </g>
  );
}

// The counter is drawn in front of the conductor so they stand behind it.
function BoothCounter() {
  return (
    <g strokeLinejoin="round">
      <rect x="1185" y="700" width="380" height="240" rx="10" fill="#ff8a65" stroke="#d9603b" strokeWidth="5" />
      <rect x="1220" y="738" width="310" height="164" rx="16" fill="#ffa486" />
      {[1282, 1344, 1406, 1468].map((x) => (
        <line key={x} x1={x} x2={x} y1="742" y2="898" stroke="#f08a66" strokeWidth="4" />
      ))}
      <rect x="1220" y="738" width="310" height="164" rx="16" fill="none" stroke="#e8764e" strokeWidth="4" />
      <rect x="1185" y="910" width="380" height="14" fill="#e8764e" opacity="0.6" />
      <rect x="1172" y="676" width="406" height="26" rx="8" fill="#fff6e0" stroke="#d9603b" strokeWidth="4" />
    </g>
  );
}

function Carriage({ x, w, body, dark }) {
  const win = (w - 8) / 3;
  return (
    <g>
      <rect x={x + 2} y="8" width={w - 4} height="2.6" fill="#4a4e69" />
      <rect x={x} y="-13" width={w} height="21.5" rx="2.5" fill={body} stroke={dark} strokeWidth="0.6" />
      <rect x={x - 1} y="-16" width={w + 2} height="4" rx="2" fill="#eef2f7" stroke={dark} strokeWidth="0.6" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 2 + i * (win + 2)} y="-10" width={win} height="7.5" rx="1.3" fill="#c9ecff" stroke={dark} strokeWidth="0.45" />
          <path d={`M ${x + 3.2 + i * (win + 2)} -4.5 L ${x + 5.5 + i * (win + 2)} -9`} stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      ))}
      <rect x={x} y="1.5" width={w} height="2" fill="#ffffff" opacity="0.55" />
      {[x + 7, x + w - 7].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="11" r="3" fill="#3d4459" stroke="#23283a" strokeWidth="0.4" />
          <circle cx={cx} cy="11" r="1.1" fill="#c9d1dc" />
        </g>
      ))}
    </g>
  );
}

// A puff of steam: overlapping circles with one soft outline around the whole puff.
function Puff({ circles }) {
  return (
    <g>
      {circles.map(([cx, cy, r], i) => (
        <circle key={`o${i}`} cx={cx} cy={cy} r={r + 0.5} fill="#cfdeeb" />
      ))}
      {circles.map(([cx, cy, r], i) => (
        <circle key={`f${i}`} cx={cx} cy={cy} r={r} fill="#ffffff" />
      ))}
    </g>
  );
}

function Train() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round" transform="translate(0 6)">
      {/* steam */}
      <Puff circles={[[18.5, -32, 2.2], [21.5, -33.2, 2.8], [24.5, -32, 2.2], [21.5, -30.8, 2.2]]} />
      <Puff circles={[[28, -29.5, 2.8], [31.5, -31, 3.4], [35, -29.5, 2.8], [31.5, -27.8, 2.8]]} />
      <Puff circles={[[39, -22.4, 2.3], [41.8, -23.8, 2.8], [44.4, -22.4, 2.2], [41.8, -20.4, 2.4]]} />
      <Carriage x={-50} w={31} body="#ffd23f" dark="#d19a00" />
      <rect x="-19.5" y="3" width="4" height="2" fill="#4a4e69" />
      <Carriage x={-16} w={31} body="#7ed957" dark="#45a832" />
      <rect x="14.5" y="3" width="3" height="2" fill="#4a4e69" />

      {/* locomotive */}
      <rect x="17" y="5.5" width="32" height="4" rx="1" fill="#2f3b4a" />
      <rect x="29" y="-8" width="17" height="14" rx="4.5" fill="#4f8df5" stroke="#2f62c0" strokeWidth="0.6" />
      <rect x="34" y="-8" width="1.4" height="14" fill="#ffd23f" />
      <rect x="40" y="-8" width="1.4" height="14" fill="#ffd23f" />
      <path d="M 31 -5.5 L 43 -5.5" stroke="#9fc2ff" strokeWidth="1" />
      <path d="M 30.5 -8 A 3 3 0 0 1 36.5 -8 Z" fill="#ffd23f" stroke="#d19a00" strokeWidth="0.5" />
      <path d="M 39.5 -8 L 39.5 -16 L 44 -16 L 44 -8 Z" fill="#2f3b4a" />
      <rect x="38" y="-19" width="7.5" height="3.4" rx="1" fill="#2f3b4a" />
      <rect x="45" y="-9" width="3.6" height="15" rx="1.5" fill="#2f3b4a" />
      <circle cx="46.8" cy="-4.5" r="1.6" fill="#fff3a0" stroke="#d19a00" strokeWidth="0.4" />
      <rect x="17" y="-15" width="12.5" height="21" rx="2" fill="#ff5a5f" stroke="#c43d42" strokeWidth="0.6" />
      <rect x="15.5" y="-18" width="15.5" height="4" rx="1.5" fill="#2f3b4a" />
      <rect x="19.5" y="-11.5" width="7.5" height="7" rx="1.2" fill="#c9ecff" stroke="#c43d42" strokeWidth="0.45" />
      <path d="M 20.5 -5.5 L 23 -10.5" stroke="#ffffff" strokeWidth="0.8" />
      <path d="M 45 6 L 50.5 13.5 L 44 13.5 Z" fill="#ff5a5f" stroke="#c43d42" strokeWidth="0.5" />
      {[
        [23, 9.5, 4.5],
        [33, 9.5, 4.5],
        [42.5, 11, 3],
      ].map(([cx, cy, r]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r={r} fill="#2f3b4a" />
          <circle cx={cx} cy={cy} r={r * 0.6} fill="#ff5a5f" />
          <circle cx={cx} cy={cy} r={r * 0.22} fill="#ffd23f" />
        </g>
      ))}
      <path d="M 23 9 L 33 9" stroke="#c9d1dc" strokeWidth="1" />
    </g>
  );
}

function SignalLight() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-7" y="44" width="14" height="4.5" rx="1.5" fill="#4a5666" />
      <rect x="-2" y="-16" width="4" height="62" rx="1" fill="#8a97a8" stroke="#5f6b7c" strokeWidth="0.6" />
      <rect x="-10" y="-47" width="20" height="34" rx="6" fill="#2f3b4a" stroke="#1f2733" strokeWidth="0.8" />
      <circle cx="0" cy="-23" r="9.5" fill="#8fffb0" opacity="0.35" />
      <circle cx="0" cy="-37.5" r="5.5" fill="#6e2a33" />
      <circle cx="0" cy="-23" r="5.5" fill="#3ce07a" stroke="#1fae55" strokeWidth="0.5" />
      <circle cx="-1.8" cy="-24.8" r="1.6" fill="#ffffff" opacity="0.9" />
      <circle cx="-1.8" cy="-39.3" r="1.2" fill="#ffffff" opacity="0.3" />
      <path d="M -7 -42 Q 0 -47 7 -42" fill="none" stroke="#1f2733" strokeWidth="1.6" />
      <path d="M -7 -27.5 Q 0 -32.5 7 -27.5" fill="none" stroke="#1f2733" strokeWidth="1.6" />
    </g>
  );
}

function StationClock() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const big = i % 3 === 0;
    const r1 = big ? 19 : 21;
    return (
      <line
        key={i}
        x1={Math.sin(a) * r1}
        y1={4 - Math.cos(a) * r1}
        x2={Math.sin(a) * 23.5}
        y2={4 - Math.cos(a) * 23.5}
        stroke="#2f3b4a"
        strokeWidth={big ? 2.2 : 1.2}
        strokeLinecap="round"
      />
    );
  });
  return (
    <g strokeLinejoin="round">
      <rect x="-1.8" y="-48" width="3.6" height="24" fill="#6c7a8c" />
      <rect x="-9" y="-50" width="18" height="5" rx="2" fill="#4a5666" />
      <circle cx="0" cy="4" r="30" fill="#e85d5d" stroke="#b83d3d" strokeWidth="1.2" />
      <circle cx="0" cy="4" r="25.5" fill="#ffffff" />
      <path d="M -18 -8 A 22 22 0 0 1 4 -17" fill="none" stroke="#e9eef5" strokeWidth="3" strokeLinecap="round" />
      {ticks}
      <line x1="0" y1="4" x2="-11" y2="-2.5" stroke="#2f3b4a" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="4" x2="15" y2="-9" stroke="#2f3b4a" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="0" cy="4" r="2.6" fill="#e85d5d" />
    </g>
  );
}

function Bench() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-41" y="-21" width="4" height="26" rx="1.5" fill="#5a6b7d" />
      <rect x="37" y="-21" width="4" height="26" rx="1.5" fill="#5a6b7d" />
      <rect x="-46" y="-21" width="92" height="6.5" rx="2.2" fill="#f4a261" stroke="#c9763a" strokeWidth="0.7" />
      <rect x="-46" y="-12" width="92" height="6.5" rx="2.2" fill="#f4a261" stroke="#c9763a" strokeWidth="0.7" />
      <path d="M -40 4 Q -44 14 -45 21 L -41 21 Q -39 13 -35 4 Z" fill="#5a6b7d" />
      <path d="M 40 4 Q 44 14 45 21 L 41 21 Q 39 13 35 4 Z" fill="#5a6b7d" />
      <rect x="-48" y="-2" width="96" height="6" rx="2.2" fill="#f4a261" stroke="#c9763a" strokeWidth="0.7" />
      <rect x="-47" y="3.5" width="94" height="3.5" rx="1.5" fill="#d9844a" />
      <rect x="-50" y="-9" width="8" height="3" rx="1.5" fill="#5a6b7d" />
      <rect x="42" y="-9" width="8" height="3" rx="1.5" fill="#5a6b7d" />
      <rect x="-48" y="-7" width="3" height="6" rx="1" fill="#5a6b7d" />
      <rect x="45" y="-7" width="3" height="6" rx="1" fill="#5a6b7d" />
      <path d="M -42 -19.5 L 40 -19.5" stroke="#ffd0a6" strokeWidth="1" />
    </g>
  );
}

const scene = {
  id: 'train-station',
  title: 'Train Station',
  titleId: 'Stasiun Kereta',
  icon: '🚆',
  Background,
  Foreground: BoothCounter,
  hideBehind: ['📦', '🛍️', '🧺', '🪧'],
  objects: [
    // big things first
    {
      id: 'train', word: 'train', wordId: 'kereta', art: Train, x: 450, y: 452, size: 800, hit: { w: 800, h: 250, dy: 40 },
      sentence: 'The train says choo, choo!', sentenceId: 'Keretanya berbunyi tut, tut!',
      question: 'Can you say choo, choo?', questionId: 'Bisa bilang tut, tut?',
      answer: 'Choo, choo!', answerId: 'Tut, tut!',
    },
    {
      id: 'signal', word: 'signal light', wordId: 'lampu sinyal', art: SignalLight, x: 960, y: 458, size: 380, hit: { w: 130, h: 370 },
      sentence: 'Green light means go!', sentenceId: 'Lampu hijau artinya jalan!',
      question: 'Is the light red or green?', questionId: 'Lampunya merah atau hijau?',
      answer: 'The light is green.', answerId: 'Lampunya hijau.',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam', art: StationClock, x: 470, y: 265, size: 240, hit: { w: 160, h: 160, dy: 10 },
      sentence: 'The big clock tells the time.', sentenceId: 'Jam besar itu menunjukkan waktu.',
      question: 'Is the clock round or square?', questionId: 'Jamnya bulat atau kotak?',
      answer: 'The clock is round.', answerId: 'Jamnya bulat.',
    },
    {
      id: 'bench', word: 'bench', wordId: 'bangku', art: Bench, x: 560, y: 840, size: 400, hit: { w: 400, h: 160, dy: 8 },
      sentence: 'We wait for the train here.', sentenceId: 'Kita menunggu kereta di sini.',
      question: 'Is the bench long or short?', questionId: 'Bangkunya panjang atau pendek?',
      answer: 'The bench is long.', answerId: 'Bangkunya panjang.',
    },

    // ticket booth
    {
      id: 'conductor', word: 'conductor', wordId: 'kondektur', emoji: '🧑‍✈️', x: 1390, y: 585, size: 230,
      sentence: 'The conductor says, stand behind the line!', sentenceId: 'Kondektur bilang, berdiri di belakang garis!',
      question: 'Can you stand behind the yellow line?', questionId: 'Bisa berdiri di belakang garis kuning?',
      answer: 'Yes, I can. I am safe!', answerId: 'Bisa. Aku aman!',
    },
    {
      id: 'ticket', word: 'ticket', wordId: 'tiket', emoji: '🎫', x: 1250, y: 655, size: 90,
      sentence: 'I show my ticket.', sentenceId: 'Aku menunjukkan tiketku.',
      question: 'Is the ticket yellow?', questionId: 'Apakah tiketnya kuning?',
      answer: 'Yes, it is yellow.', answerId: 'Ya, tiketnya kuning.',
    },
    {
      id: 'coffee', word: 'coffee', wordId: 'kopi', emoji: '☕', x: 1528, y: 640, size: 85,
      sentence: 'The coffee is very hot.', sentenceId: 'Kopinya panas sekali.',
      question: 'Is the coffee hot or cold?', questionId: 'Kopinya panas atau dingin?',
      answer: 'The coffee is hot.', answerId: 'Kopinya panas.',
    },
    {
      id: 'bell', word: 'bell', wordId: 'lonceng', emoji: '🔔', x: 1208, y: 482, size: 95,
      sentence: 'Ding, dong! The train is here!', sentenceId: 'Ting, tong! Keretanya sudah datang!',
      question: 'Can you say ding, dong?', questionId: 'Bisa bilang ting, tong?',
      answer: 'Ding, dong!', answerId: 'Ting, tong!',
    },

    // up in the sky
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 160, y: 265, size: 150,
      sentence: 'Oops! The red balloon floats away.', sentenceId: 'Ups! Balon merahnya terbang.',
      question: 'Can you catch the balloon?', questionId: 'Bisa tangkap balonnya?',
      answer: 'Jump! I got it!', answerId: 'Lompat! Dapat!',
    },
    {
      id: 'bird', word: 'bird', wordId: 'burung', emoji: '🕊️', x: 870, y: 215, size: 130,
      sentence: 'The white bird flies high.', sentenceId: 'Burung putih terbang tinggi.',
      question: 'Can you flap like a bird?', questionId: 'Bisa mengepakkan sayap seperti burung?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '☀️', x: 1420, y: 240, size: 150,
      sentence: 'The sun is bright and warm.', sentenceId: 'Mataharinya terang dan hangat.',
      question: 'Is it day or night?', questionId: 'Sekarang siang atau malam?',
      answer: 'It is daytime.', answerId: 'Sekarang siang hari.',
    },

    // on and around the bench
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 446, y: 782, size: 110,
      sentence: 'The teddy bear is going on a trip.', sentenceId: 'Boneka beruang mau jalan-jalan.',
      question: 'Do you bring a toy on trips?', questionId: 'Kamu bawa mainan kalau bepergian?',
      answer: 'Yes, I bring my teddy.', answerId: 'Ya, aku bawa bonekaku.',
    },
    {
      id: 'sandwich', word: 'sandwich', wordId: 'roti isi', emoji: '🥪', x: 562, y: 798, size: 95,
      sentence: 'I eat a sandwich on the train.', sentenceId: 'Aku makan roti isi di kereta.',
      question: 'Do you like sandwiches?', questionId: 'Kamu suka roti isi?',
      answer: 'Yes, I like sandwiches.', answerId: 'Ya, aku suka roti isi.',
    },
    {
      id: 'newspaper', word: 'newspaper', wordId: 'koran', emoji: '🗞️', x: 680, y: 790, size: 95,
      sentence: 'Daddy reads the newspaper on the train.', sentenceId: 'Ayah membaca koran di kereta.',
      question: 'Do you like to read?', questionId: 'Kamu suka membaca?',
      answer: 'Yes, I like to read.', answerId: 'Ya, aku suka membaca.',
    },
    {
      id: 'umbrella', word: 'umbrella', wordId: 'payung', emoji: '🌂', x: 815, y: 862, size: 135,
      sentence: 'The umbrella is purple.', sentenceId: 'Payungnya ungu.',
      question: 'Is it raining today?', questionId: 'Hari ini hujan?',
      answer: 'No, it is sunny!', answerId: 'Tidak, hari ini cerah!',
    },
    {
      id: 'map', word: 'map', wordId: 'peta', emoji: '🗺️', x: 140, y: 790, size: 140,
      sentence: 'The map shows where trains go.', sentenceId: 'Peta menunjukkan ke mana kereta pergi.',
      question: 'Can you find the blue sea?', questionId: 'Bisa menemukan laut yang biru?',
      answer: 'Here is the sea!', answerId: 'Ini lautnya!',
    },
    {
      id: 'trash', word: 'trash can', wordId: 'tempat sampah', emoji: '🗑️', x: 1020, y: 842, size: 125,
      sentence: 'Put your trash in the trash can.', sentenceId: 'Buang sampah di tempat sampah.',
      question: 'Do you keep the station clean?', questionId: 'Kamu menjaga stasiun tetap bersih?',
      answer: 'Yes, I keep it clean.', answerId: 'Ya, aku menjaganya tetap bersih.',
    },

    // front of the platform
    {
      id: 'suitcase', word: 'suitcase', wordId: 'koper', emoji: '🧳', x: 170, y: 1042, size: 180,
      sentence: 'My clothes are in the suitcase.', sentenceId: 'Bajuku ada di dalam koper.',
      question: 'Is the suitcase blue?', questionId: 'Apakah kopernya biru?',
      answer: 'Yes, it is blue.', answerId: 'Ya, kopernya biru.',
    },
    {
      id: 'backpack', word: 'backpack', wordId: 'tas ransel', emoji: '🎒', x: 390, y: 1086, size: 130,
      sentence: 'The backpack is pink.', sentenceId: 'Tas ranselnya merah muda.',
      question: 'What do you put in your backpack?', questionId: 'Kamu taruh apa di tas ranselmu?',
      answer: 'I put my snacks in it.', answerId: 'Aku taruh camilanku.',
    },
    {
      id: 'present', word: 'present', wordId: 'hadiah', emoji: '🎁', x: 600, y: 1098, size: 115,
      sentence: 'We bring a present for Grandma.', sentenceId: 'Kita bawa hadiah untuk Nenek.',
      question: 'Do you like presents?', questionId: 'Kamu suka hadiah?',
      answer: 'Yes, I love presents!', answerId: 'Ya, aku suka sekali hadiah!',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 805, y: 1052, size: 170,
      sentence: 'The dog says woof, woof!', sentenceId: 'Anjingnya menggonggong guk, guk!',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof, woof!', answerId: 'Guk, guk!',
    },
    {
      id: 'cat', word: 'cat', wordId: 'kucing', emoji: '🐈', x: 1150, y: 1080, size: 140,
      sentence: 'The station cat says meow!', sentenceId: 'Kucing stasiun bilang meong!',
      question: 'Is the cat orange or black?', questionId: 'Kucingnya oranye atau hitam?',
      answer: 'The cat is orange.', answerId: 'Kucingnya oranye.',
    },
    {
      id: 'flower', word: 'flower', wordId: 'bunga', emoji: '🌷', x: 1480, y: 1010, size: 140,
      sentence: 'The pink flower smells nice.', sentenceId: 'Bunga merah muda itu harum.',
      question: 'Can you smell the flower?', questionId: 'Bisa cium bunganya?',
      answer: 'Sniff, sniff! Mmm, nice!', answerId: 'Hmm, harum sekali!',
    },
  ],
};

export default scene;

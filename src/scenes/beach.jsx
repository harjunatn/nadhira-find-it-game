// Beach scene. Coordinates are in a 1600 x 1200 picture.
// Sky at the top, the sea in the middle (far things small near the horizon),
// warm sand at the bottom with a big palm tree on the left and a towel under an umbrella on the right.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

const HORIZON = 395;

// The water's edge: a gentle line that drops a little to the right, with round foamy scallops.
const shoreY = (x) => 655 + x * 0.05;
const SHORE_STEP = 160;

function shorePath(offset = 0) {
  let d = `M 0 ${shoreY(0) + offset}`;
  for (let x = 0; x < 1600; x += SHORE_STEP) {
    const nx = x + SHORE_STEP;
    d += ` Q ${x + SHORE_STEP / 2} ${shoreY(x + SHORE_STEP / 2) + offset + 26} ${nx} ${shoreY(nx) + offset}`;
  }
  return d;
}

function Background() {
  const ripples = [
    [250, 450, 50], [470, 430, 40], [1330, 430, 44], [1530, 470, 40],
    [360, 640, 60], [700, 560, 54], [880, 620, 46], [1220, 610, 56], [1560, 650, 40],
    [620, 480, 36], [1020, 470, 36],
  ];
  const footprints = [];
  for (let i = 0; i < 7; i++) {
    const x = 285 + i * 46;
    const y = 1192 - i * 30;
    const side = i % 2 ? -1 : 1;
    footprints.push(
      <g key={i} transform={`translate(${x + side * 7} ${y + side * 9}) rotate(56)`} fill="#e2b766" opacity="0.7">
        <ellipse cx="0" cy="0" rx="9" ry="15" />
        <ellipse cx="0" cy="-22" rx="7" ry="6" />
      </g>,
    );
  }
  return (
    <g>
      <defs>
        <linearGradient id="beach-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#62c2ff" />
          <stop offset="1" stopColor="#d4f1ff" />
        </linearGradient>
        <linearGradient id="beach-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a99fb" />
          <stop offset="0.23" stopColor="#52a2ff" />
          <stop offset="0.65" stopColor="#53a9ff" />
          <stop offset="1" stopColor="#7fd2fb" />
        </linearGradient>
        <linearGradient id="beach-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9e2a6" />
          <stop offset="1" stopColor="#f3cf85" />
        </linearGradient>
        <radialGradient id="beach-glow">
          <stop offset="0" stopColor="#fff8c4" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#fff8c4" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff8c4" stopOpacity="0" />
        </radialGradient>
        <pattern id="beach-grains" width="70" height="70" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="18" r="3" fill="#e4b968" opacity="0.55" />
          <circle cx="47" cy="40" r="2.5" fill="#e4b968" opacity="0.5" />
          <circle cx="28" cy="60" r="2" fill="#ffffff" opacity="0.5" />
        </pattern>
      </defs>

      {/* sky and a soft glow around the sun */}
      <rect width="1600" height={HORIZON + 10} fill="url(#beach-sky)" />
      <circle cx="1460" cy="120" r="190" fill="url(#beach-glow)" />

      {/* sand */}
      <rect y="600" width="1600" height="600" fill="url(#beach-sand)" />
      <rect y="600" width="1600" height="600" fill="url(#beach-grains)" />

      {/* wet sand just below the water */}
      <path d={`${shorePath(30)} L 1600 600 L 0 600 Z`} fill="#ecc57c" />

      {/* sea */}
      <path d={`${shorePath(0)} L 1600 ${HORIZON} L 0 ${HORIZON} Z`} fill="url(#beach-sea)" />
      <rect y={HORIZON - 3} width="1600" height="6" fill="#ffffff" opacity="0.55" />
      {ripples.map(([x, y, w]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${x - w / 2} ${y} q ${w / 4} -10 ${w / 2} 0 t ${w / 2} 0`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}

      {/* foam along the water's edge */}
      <path d={shorePath(-16)} fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
      <path d={shorePath(0)} fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />

      {/* splash where the dolphin jumps */}
      <path d="M 945 650 q 18 -22 36 0 M 1040 652 q 18 -22 36 0" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="1010" cy="655" rx="70" ry="10" fill="#ffffff" opacity="0.6" />

      {/* footprints walking up the beach */}
      {footprints}

      {/* soft shadows on the sand */}
      <ellipse cx="225" cy="878" rx="95" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="775" cy="992" rx="160" ry="20" fill="#000" opacity="0.1" />
      <ellipse cx="1295" cy="1035" rx="200" ry="46" fill="#000" opacity="0.1" />
      <ellipse cx="1010" cy="1078" rx="55" ry="10" fill="#000" opacity="0.1" />
    </g>
  );
}

// ---------- art ----------

function PalmTree() {
  // trunk centre line: a curve from the base up to the crown
  const P = (t) => {
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const c = t * t;
    return [a * -12 + b * -10 + c * 2, a * 48 + b * 6 + c * -30];
  };
  const half = (t) => 7.5 - 3.6 * t;
  const N = 14;
  const left = [];
  const right = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const [x, y] = P(t);
    left.push(`${(x - half(t)).toFixed(2)} ${y.toFixed(2)}`);
    right.unshift(`${(x + half(t)).toFixed(2)} ${y.toFixed(2)}`);
  }
  const trunk = `M ${left.join(' L ')} L ${right.join(' L ')} Z`;
  const rings = [];
  for (let i = 1; i < 10; i++) {
    const t = i / 10;
    const [x, y] = P(t);
    const w = half(t);
    rings.push(<path key={i} d={`M ${x - w + 0.6} ${y - 1.6} Q ${x} ${y + 2.4} ${x + w - 0.6} ${y - 1.6}`} fill="none" stroke="#8a5a2e" strokeWidth="0.8" strokeLinecap="round" />);
  }

  // one frond pointing right; mirrored and rotated for the others
  const frond = (L) => {
    const S = 12;
    const LOBES = 6;
    const rib = (t) => {
      const u = 1 - t;
      return [
        3 * u * u * t * (L * 0.35) + 3 * u * t * t * (L * 0.72) + t * t * t * L,
        3 * u * u * t * -13 + 3 * u * t * t * -11 + t * t * t * 7,
      ];
    };
    const h = (t) => 7.5 * Math.sin(Math.PI * Math.min(1, t * 1.08)) * (1 - 0.35 * t) + 0.4;
    const f = (v) => v.toFixed(2);
    // smooth upper edge
    const top = [];
    for (let i = 0; i <= S; i++) {
      const t = i / S;
      const [x, y] = rib(t);
      top.push(`${f(x)} ${f(y - h(t) * 0.55)}`);
    }
    // lower edge made of round leaflets, from the tip back to the stem
    const notch = (t) => {
      const [x, y] = rib(t);
      return `${f(x)} ${f(y + h(t) * 0.55)}`;
    };
    let lower = '';
    for (let k = LOBES; k > 0; k--) {
      const t1 = (k - 1) / LOBES;
      const tm = (k - 0.5) / LOBES;
      const [mx, my] = rib(tm);
      lower += ` Q ${f(mx)} ${f(my + h(tm) * 1.35)} ${notch(t1)}`;
    }
    const ribD = Array.from({ length: S + 1 }, (_, i) => rib(i / S).map(f).join(' ')).join(' L ');
    return { body: `M ${top.join(' L ')} L ${notch(1)}${lower} Z`, rib: `M ${ribD}` };
  };
  const long = frond(40);
  const short = frond(32);
  const leaves = [
    // [shape, angle, mirrored, back?]
    [long, -38, false, true],
    [long, -38, true, true],
    [short, -78, false, true],
    [long, 4, false, false],
    [long, 4, true, false],
    [short, 34, false, false],
    [short, 34, true, false],
    [short, -12, false, false],
    [short, -12, true, false],
  ];
  const leafEl = ([shape, angle, mirrored, back], i) => (
    <g key={`${back}-${i}`} transform={`translate(2 -31) ${mirrored ? 'scale(-1 1)' : ''} rotate(${angle})`}>
      <path d={shape.body} fill={back ? '#2fa548' : '#48c95a'} stroke="#1f7d36" strokeWidth="0.7" />
      <path d={shape.rib} fill="none" stroke={back ? '#1f7d36' : '#2a9a42'} strokeWidth="0.8" strokeLinecap="round" />
    </g>
  );
  return (
    <g strokeLinejoin="round">
      <path d={trunk} fill="#c88a4e" stroke="#8a5a2e" strokeWidth="0.9" />
      <path d={`M ${P(0.1)[0] + 3} ${P(0.1)[1]} Q ${P(0.5)[0] + 4} ${P(0.5)[1]} ${P(0.85)[0] + 2} ${P(0.85)[1]}`} fill="none" stroke="#e0aa70" strokeWidth="1.6" strokeLinecap="round" />
      {rings}
      <path d="M -24 49 Q -12 43 0 49 Z" fill="#c88a4e" stroke="#8a5a2e" strokeWidth="0.8" />
      {leaves.filter((l) => l[3]).map(leafEl)}
      <circle cx="2" cy="-30" r="3.4" fill="#8a5a2e" />
      {leaves.filter((l) => !l[3]).map(leafEl)}
    </g>
  );
}

function Sandcastle() {
  const sand = '#f4c46a';
  const line = '#c18a35';
  const shade = '#e3ab52';
  const crenels = (x, y, w, n) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x + (i * w) / n + w / n / 6} y={y - 5} width={((w / n) * 2) / 3} height="6" rx="1" fill={sand} stroke={line} strokeWidth="1.1" />
    ));
  return (
    <g strokeLinejoin="round">
      <ellipse cx="0" cy="42" rx="49" ry="8" fill={shade} stroke={line} strokeWidth="1.1" />
      {/* side towers */}
      <rect x="-45" y="-4" width="24" height="46" rx="2" fill={sand} stroke={line} strokeWidth="1.3" />
      {crenels(-45, -4, 24, 3)}
      <rect x="21" y="-4" width="24" height="46" rx="2" fill={sand} stroke={line} strokeWidth="1.3" />
      {crenels(21, -4, 24, 3)}
      {/* wall between */}
      <rect x="-24" y="14" width="48" height="28" fill={sand} stroke={line} strokeWidth="1.3" />
      {/* middle tower */}
      <rect x="-17" y="-26" width="34" height="68" rx="2" fill={sand} stroke={line} strokeWidth="1.3" />
      {crenels(-17, -26, 34, 4)}
      <rect x="-8" y="-42" width="16" height="17" rx="1.5" fill={sand} stroke={line} strokeWidth="1.3" />
      {crenels(-8, -42, 16, 2)}
      {/* flag */}
      <line x1="0" y1="-47" x2="0" y2="-62" stroke="#8a5a2e" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 0.5 -62 L 13 -57.5 L 0.5 -53 Z" fill="#ff5a5f" stroke="#d63a40" strokeWidth="1" />
      {/* door and windows */}
      <path d="M -8 42 L -8 28 Q 0 18 8 28 L 8 42 Z" fill="#b07a32" />
      <path d="M -4 -4 L -4 -10 Q 0 -15 4 -10 L 4 -4 Z" fill="#b07a32" />
      <path d="M -36 18 L -36 12 Q -33 8 -30 12 L -30 18 Z" fill="#b07a32" />
      <path d="M 30 18 L 30 12 Q 33 8 36 12 L 36 18 Z" fill="#b07a32" />
      {/* sandy texture */}
      <g fill={shade}>
        <circle cx="-38" cy="30" r="1.4" />
        <circle cx="-28" cy="6" r="1.2" />
        <circle cx="34" cy="30" r="1.4" />
        <circle cx="27" cy="4" r="1.2" />
        <circle cx="-10" cy="8" r="1.3" />
        <circle cx="11" cy="14" r="1.3" />
        <circle cx="-14" cy="34" r="1.2" />
        <circle cx="16" cy="36" r="1.2" />
      </g>
      <path d="M -42 0 L -42 36" stroke="#fff0c8" strokeWidth="2" strokeLinecap="round" />
      <path d="M -13 -20 L -13 10" stroke="#fff0c8" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function BeachUmbrella() {
  const apex = [0, -47];
  const xs = [-46, -30.7, -15.3, 0, 15.3, 30.7, 46];
  const base = -14;
  const edge = (x) => `Q ${(x * 0.86).toFixed(2)} ${-44 + Math.abs(x) * 0.02} ${x} ${base}`;
  const back = (x) => `Q ${(x * 0.86).toFixed(2)} ${-44 + Math.abs(x) * 0.02} ${apex[0]} ${apex[1]}`;
  const panels = [];
  for (let i = 0; i < xs.length - 1; i++) {
    const a = xs[i];
    const b = xs[i + 1];
    const red = i % 2 === 0;
    panels.push(
      <path
        key={i}
        d={`M ${apex[0]} ${apex[1]} ${edge(a)} Q ${(a + b) / 2} ${base + 7} ${b} ${base} ${back(b)} Z`}
        fill={red ? '#ff5a5f' : '#ffd23f'}
        stroke={red ? '#d63a40' : '#e0a800'}
        strokeWidth="1.3"
      />,
    );
  }
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* pole */}
      <path d="M -1.5 -44 L -12 48" stroke="#8a5a2e" strokeWidth="5" />
      <path d="M -1.5 -44 L -12 48" stroke="#f2f2f2" strokeWidth="2.6" />
      <ellipse cx="-12" cy="48" rx="6" ry="2" fill="#d7a85a" />
      {panels}
      <path d="M -30 -30 Q -18 -40 -6 -43" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      <circle cx={apex[0]} cy={apex[1] - 1} r="3" fill="#ffffff" stroke="#d63a40" strokeWidth="1.2" />
    </g>
  );
}

function Towel() {
  // a towel lying flat on the sand, seen a little from above
  const TL = [-47, -15];
  const TR = [41, -20];
  const BR = [48, 18];
  const BL = [-41, 23];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const stripe = (t0, t1) => {
    const a = lerp(TL, TR, t0);
    const b = lerp(TL, TR, t1);
    const c = lerp(BL, BR, t1);
    const d = lerp(BL, BR, t0);
    return `M ${a.join(' ')} L ${b.join(' ')} L ${c.join(' ')} L ${d.join(' ')} Z`;
  };
  const fringe = (p, q) =>
    Array.from({ length: 6 }, (_, i) => {
      const [x, y] = lerp(p, q, (i + 0.5) / 6);
      return <line key={i} x1={x} y1={y} x2={x + (p === TL ? -3.5 : 3.5)} y2={y} stroke="#e0608a" strokeWidth="1.2" />;
    });
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d={`M ${TL.join(' ')} L ${TR.join(' ')} L ${BR.join(' ')} L ${BL.join(' ')} Z`} fill="#ff8fb1" stroke="#e0608a" strokeWidth="1.4" />
      {[[0.12, 0.2], [0.32, 0.4], [0.6, 0.68], [0.8, 0.88]].map(([a, b]) => (
        <path key={a} d={stripe(a, b)} fill="#ffffff" />
      ))}
      <path d={`M ${TL.join(' ')} L ${TR.join(' ')} L ${BR.join(' ')} L ${BL.join(' ')} Z`} fill="none" stroke="#e0608a" strokeWidth="1.4" />
      {fringe(TL, BL)}
      {fringe(TR, BR)}
    </g>
  );
}

// ---------- scene ----------

const beach = {
  id: 'beach',
  title: 'Beach',
  titleId: 'Pantai',
  icon: '🏖️',
  Background,
  hideBehind: ['🪨', '🌿', '🪸', '🌊'],
  objects: [
    // big things first, so smaller things are drawn on top of them
    {
      id: 'palm-tree', word: 'palm tree', wordId: 'pohon kelapa', art: PalmTree, x: 300, y: 520, size: 720, hit: { w: 380, h: 750, dx: -15, dy: -15 },
      sentence: 'The palm tree is very tall.', sentenceId: 'Pohon kelapanya tinggi sekali.',
      question: 'Is the palm tree tall or short?', questionId: 'Pohon kelapanya tinggi atau pendek?',
      answer: 'The palm tree is tall.', answerId: 'Pohon kelapanya tinggi.',
    },
    {
      id: 'umbrella', word: 'beach umbrella', wordId: 'payung pantai', art: BeachUmbrella, x: 1275, y: 790, size: 380, hit: { w: 340, h: 300, dy: -40 },
      sentence: 'The umbrella keeps us cool.', sentenceId: 'Payungnya bikin kita tetap sejuk.',
      question: 'Is it hot or cool under the umbrella?', questionId: 'Di bawah payung panas atau sejuk?',
      answer: 'It is cool under the umbrella.', answerId: 'Di bawah payung sejuk.',
    },
    {
      id: 'towel', word: 'towel', wordId: 'handuk', art: Towel, x: 1310, y: 1015, size: 300, hit: { w: 290, h: 125 },
      sentence: 'I dry myself with a towel.', sentenceId: 'Aku mengeringkan badan dengan handuk.',
      question: 'What color is the towel?', questionId: 'Handuknya warna apa?',
      answer: 'The towel is pink and white.', answerId: 'Handuknya merah muda dan putih.',
    },
    {
      id: 'sandcastle', word: 'sandcastle', wordId: 'istana pasir', art: Sandcastle, x: 775, y: 880, size: 270, hit: { w: 250, h: 260, dy: -5 },
      sentence: 'I build a big sandcastle.', sentenceId: 'Aku membuat istana pasir yang besar.',
      question: 'Can you build a sandcastle?', questionId: 'Kamu bisa membuat istana pasir?',
      answer: 'Yes, I can build one!', answerId: 'Ya, aku bisa membuatnya!',
    },

    // sky
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '🌞', x: 1460, y: 120, size: 160,
      sentence: 'The sun is hot and bright.', sentenceId: 'Mataharinya panas dan terang.',
      question: 'Is it hot or cold today?', questionId: 'Hari ini panas atau dingin?',
      answer: 'It is hot today!', answerId: 'Hari ini panas!',
    },
    {
      id: 'cloud', word: 'cloud', wordId: 'awan', emoji: '☁️', x: 760, y: 115, size: 150,
      sentence: 'The cloud floats in the sky.', sentenceId: 'Awannya melayang di langit.',
      question: 'What color is the cloud?', questionId: 'Awannya warna apa?',
      answer: 'The cloud is white.', answerId: 'Awannya putih.',
    },
    {
      id: 'kite', word: 'kite', wordId: 'layang-layang', emoji: '🪁', x: 1080, y: 190, size: 135, rotate: -10,
      sentence: 'The kite flies in the wind.', sentenceId: 'Layang-layang terbang tertiup angin.',
      question: 'Is the kite up or down?', questionId: 'Layang-layangnya di atas atau di bawah?',
      answer: 'The kite is up high!', answerId: 'Layang-layangnya tinggi di atas!',
    },
    {
      id: 'parrot', word: 'parrot', wordId: 'burung nuri', emoji: '🦜', x: 470, y: 238, size: 110,
      sentence: 'The parrot is very colorful.', sentenceId: 'Burung nurinya warna-warni.',
      question: 'Can you say hello like a parrot?', questionId: 'Bisa bilang halo seperti burung nuri?',
      answer: 'Hello! Hello!', answerId: 'Halo! Halo!',
    },

    // sea, far away near the horizon
    {
      id: 'island', word: 'island', wordId: 'pulau', emoji: '🏝️', x: 660, y: 378, size: 115,
      sentence: 'The island is far away.', sentenceId: 'Pulaunya jauh sekali.',
      question: 'Is the island far or near?', questionId: 'Pulaunya jauh atau dekat?',
      answer: 'The island is far.', answerId: 'Pulaunya jauh.',
    },
    {
      id: 'sailboat', word: 'sailboat', wordId: 'perahu layar', emoji: '⛵', x: 900, y: 410, size: 125,
      sentence: 'The wind pushes the sailboat.', sentenceId: 'Angin mendorong perahu layar.',
      question: 'Can you blow like the wind?', questionId: 'Bisa meniup seperti angin?',
      answer: 'Whoosh! Whoosh!', answerId: 'Wus! Wus!',
    },
    {
      id: 'whale', word: 'whale', wordId: 'ikan paus', emoji: '🐳', x: 1180, y: 440, size: 120,
      sentence: 'The whale sprays water up high.', sentenceId: 'Ikan paus menyemburkan air tinggi-tinggi.',
      question: 'Is a whale big or small?', questionId: 'Ikan paus besar atau kecil?',
      answer: 'A whale is very big!', answerId: 'Ikan paus besar sekali!',
    },

    // sea, nearer
    {
      id: 'speedboat', word: 'speedboat', wordId: 'perahu motor', emoji: '🚤', x: 520, y: 545, size: 150,
      sentence: 'The speedboat goes very fast.', sentenceId: 'Perahu motornya melaju cepat sekali.',
      question: 'Can you say vroom like a boat?', questionId: 'Bisa bilang brum seperti perahu?',
      answer: 'Vroom, vroom!', answerId: 'Brum, brum!',
    },
    {
      id: 'dolphin', word: 'dolphin', wordId: 'lumba-lumba', emoji: '🐬', x: 1010, y: 580, size: 140,
      sentence: 'The dolphin jumps out of the water.', sentenceId: 'Lumba-lumba melompat keluar dari air.',
      question: 'Can you jump like a dolphin?', questionId: 'Bisa melompat seperti lumba-lumba?',
      answer: 'Yes, I can jump!', answerId: 'Ya, aku bisa melompat!',
    },
    {
      id: 'surfer', word: 'surfer', wordId: 'peselancar', emoji: '🏄', x: 1450, y: 545, size: 165,
      sentence: 'The surfer rides a big wave.', sentenceId: 'Peselancar menaiki ombak besar.',
      question: 'Can you stand like a surfer?', questionId: 'Bisa berdiri seperti peselancar?',
      answer: 'Yes, look at me!', answerId: 'Ya, lihat aku!',
    },
    {
      id: 'swim-ring', word: 'swim ring', wordId: 'pelampung', emoji: '🛟', x: 760, y: 650, size: 100,
      sentence: 'The swim ring floats on the water.', sentenceId: 'Pelampungnya mengapung di air.',
      question: 'What color is the swim ring?', questionId: 'Pelampungnya warna apa?',
      answer: 'It is red and white.', answerId: 'Warnanya merah dan putih.',
    },

    // sand
    {
      id: 'turtle', word: 'turtle', wordId: 'penyu', emoji: '🐢', x: 560, y: 790, size: 120,
      sentence: 'The turtle walks to the sea.', sentenceId: 'Penyu berjalan ke laut.',
      question: 'Is the turtle fast or slow?', questionId: 'Penyunya cepat atau lambat?',
      answer: 'The turtle is slow.', answerId: 'Penyunya lambat.',
    },
    {
      id: 'coconut', word: 'coconut', wordId: 'kelapa', emoji: '🥥', x: 355, y: 905, size: 100,
      sentence: 'Coconut water is sweet.', sentenceId: 'Air kelapa rasanya manis.',
      question: 'Do you like coconut water?', questionId: 'Kamu suka air kelapa?',
      answer: 'Yes, I love coconut water!', answerId: 'Ya, aku suka sekali air kelapa!',
    },
    {
      id: 'bucket', word: 'bucket', wordId: 'ember', emoji: '🪣', x: 1010, y: 1030, size: 115,
      sentence: 'The bucket is blue.', sentenceId: 'Embernya biru.',
      question: 'What do you put in the bucket?', questionId: 'Kamu masukkan apa ke ember?',
      answer: 'I put sand in the bucket.', answerId: 'Aku masukkan pasir ke ember.',
    },
    {
      id: 'sunglasses', word: 'sunglasses', wordId: 'kacamata hitam', emoji: '🕶️', x: 1230, y: 1005, size: 90,
      sentence: 'I wear sunglasses in the sun.', sentenceId: 'Aku pakai kacamata hitam saat panas.',
      question: 'Can you put on your sunglasses?', questionId: 'Bisa pakai kacamata hitammu?',
      answer: 'Yes! I look cool!', answerId: 'Ya! Aku keren!',
    },
    {
      id: 'ice-cream', word: 'ice cream', wordId: 'es krim', emoji: '🍦', x: 1390, y: 978, size: 110,
      sentence: 'The ice cream is cold and sweet.', sentenceId: 'Es krimnya dingin dan manis.',
      question: 'Do you like ice cream?', questionId: 'Kamu suka es krim?',
      answer: 'Yes, I love ice cream!', answerId: 'Ya, aku suka sekali es krim!',
    },
    {
      id: 'volleyball', word: 'volleyball', wordId: 'bola voli', emoji: '🏐', x: 1510, y: 860, size: 105,
      sentence: 'We play volleyball on the sand.', sentenceId: 'Kita main bola voli di pasir.',
      question: 'Can you throw the ball up high?', questionId: 'Bisa lempar bolanya tinggi-tinggi?',
      answer: 'Yes, up, up, up!', answerId: 'Ya, ke atas, ke atas, ke atas!',
    },
    {
      id: 'crab', word: 'crab', wordId: 'kepiting', emoji: '🦀', x: 150, y: 1080, size: 115,
      sentence: 'The crab walks sideways.', sentenceId: 'Kepiting berjalan menyamping.',
      question: 'Can you walk like a crab?', questionId: 'Bisa jalan seperti kepiting?',
      answer: 'Yes! Side, side, side!', answerId: 'Ya! Ke samping, ke samping!',
    },
    {
      id: 'shell', word: 'shell', wordId: 'kerang', emoji: '🐚', x: 690, y: 1110, size: 95, rotate: -10,
      sentence: 'I pick up a shell.', sentenceId: 'Aku memungut kerang.',
      question: 'Can you put the shell to your ear?', questionId: 'Bisa tempelkan kerangnya ke telinga?',
      answer: 'I can hear the sea!', answerId: 'Aku bisa dengar suara laut!',
    },
    {
      id: 'flip-flop', word: 'flip-flop', wordId: 'sandal jepit', emoji: '🩴', x: 1500, y: 1105, size: 100, rotate: 20,
      sentence: 'I wear flip-flops at the beach.', sentenceId: 'Aku pakai sandal jepit di pantai.',
      question: 'What color is the flip-flop?', questionId: 'Sandal jepitnya warna apa?',
      answer: 'The flip-flop is blue.', answerId: 'Sandal jepitnya biru.',
    },
  ],
};

export default beach;

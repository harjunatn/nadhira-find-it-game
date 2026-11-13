// Fire Station scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
//
// Layout: a brick wall with a big open garage door on the left (sky outside) and the fire
// truck parked in front of it; the shiny pole in the middle; the firefighter at the watch
// desk on the right; things to find on the walls and on the concrete floor.

function Background() {
  const bricks = [];
  for (let row = 0; row < 19; row++) {
    const y = 26 + row * 38;
    for (let col = -1; col < 17; col++) {
      const x = col * 100 + (row % 2 ? 50 : 0);
      const shade = (row * 7 + col * 3) % 5 === 0;
      bricks.push(
        <rect key={`${row}-${col}`} x={x + 3} y={y + 3} width="94" height="32" rx="7" fill={shade ? '#f6c9a2' : '#f9d7b8'} />,
      );
    }
  }
  const tiles = [];
  for (let row = 0; row < 5; row++) {
    const y = 766 + row * 90;
    tiles.push(<line key={`r${row}`} x1="0" x2="1600" y1={y} y2={y} stroke="#c3cad4" strokeWidth="3" opacity="0.6" />);
    for (let x = (row % 2) * 110; x < 1600; x += 220) {
      tiles.push(<line key={`c${row}-${x}`} x1={x} x2={x} y1={y} y2={y + 90} stroke="#c3cad4" strokeWidth="3" opacity="0.5" />);
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="fire-station-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc8ff" />
          <stop offset="1" stopColor="#d9f1ff" />
        </linearGradient>
        <linearGradient id="fire-station-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3d9e1" />
          <stop offset="1" stopColor="#e8ecf1" />
        </linearGradient>
      </defs>

      {/* brick wall */}
      <rect width="1600" height="770" fill="#fdecdb" />
      {bricks}
      <rect width="1600" height="26" fill="#e8574a" />
      <rect y="22" width="1600" height="6" fill="#c7392d" />

      {/* floor */}
      <rect y="760" width="1600" height="440" fill="url(#fire-station-floor)" />
      {tiles}
      <rect y="744" width="1600" height="22" fill="#b9c3cf" />
      <rect y="766" width="1600" height="6" fill="#a4afbd" opacity="0.6" />
      {/* yellow parking box for the truck */}
      <g fill="#ffd23f" opacity="0.9">
        <rect x="140" y="772" width="10" height="136" rx="5" />
        <rect x="930" y="772" width="10" height="136" rx="5" />
        <rect x="140" y="898" width="800" height="10" rx="5" />
      </g>

      {/* big open garage door with the sky outside */}
      <rect x="186" y="134" width="708" height="636" rx="12" fill="#ffffff" stroke="#c9d1dc" strokeWidth="5" />
      <rect x="208" y="156" width="664" height="608" fill="url(#fire-station-sky)" />
      <g fill="#ffffff" opacity="0.95">
        <ellipse cx="300" cy="330" rx="46" ry="20" />
        <ellipse cx="326" cy="314" rx="30" ry="22" />
        <ellipse cx="760" cy="300" rx="52" ry="20" />
        <ellipse cx="736" cy="286" rx="28" ry="20" />
        <ellipse cx="786" cy="288" rx="22" ry="16" />
      </g>
      {/* the rolled-up door */}
      <rect x="208" y="156" width="664" height="84" fill="#e6ebf1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="208" x2="872" y1={170 + i * 14} y2={170 + i * 14} stroke="#c3ccd8" strokeWidth="3" />
      ))}
      <rect x="208" y="236" width="664" height="12" rx="4" fill="#e8574a" />

      {/* hanger for the bell above the door */}
      <rect x="533" y="26" width="14" height="22" rx="4" fill="#8a97a8" />

      {/* shelves and stand on the left wall */}
      <rect x="35" y="154" width="130" height="14" rx="5" fill="#f4a261" stroke="#d9844a" strokeWidth="3" />
      <rect x="35" y="385" width="130" height="14" rx="5" fill="#f4a261" stroke="#d9844a" strokeWidth="3" />
      <rect x="45" y="660" width="110" height="14" rx="5" fill="#9aa6b4" stroke="#7d8a9c" strokeWidth="3" />
      <rect x="93" y="674" width="14" height="70" rx="4" fill="#9aa6b4" />

      {/* shelf for the radio and pegs on the right wall */}
      <rect x="1285" y="422" width="150" height="14" rx="5" fill="#f4a261" stroke="#d9844a" strokeWidth="3" />
      <circle cx="1525" cy="186" r="10" fill="#d9844a" />
      <circle cx="1525" cy="410" r="10" fill="#d9844a" />
      <rect x="1465" y="690" width="120" height="14" rx="5" fill="#f4a261" stroke="#d9844a" strokeWidth="3" />
      <path d="M1480 704 L1494 724 L1508 704 Z M1542 704 L1556 724 L1570 704 Z" fill="#d9844a" />

      {/* soft shadows */}
      <ellipse cx="545" cy="868" rx="345" ry="20" fill="#000" opacity="0.12" />
      <ellipse cx="1240" cy="846" rx="235" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="100" cy="1072" rx="70" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="290" cy="1162" rx="72" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="1320" cy="1137" rx="75" ry="12" fill="#000" opacity="0.08" />
    </g>
  );
}

// The watch desk is drawn in front of the firefighter.
function WatchDesk() {
  return (
    <g>
      <rect x="1030" y="700" width="420" height="140" rx="14" fill="#5aa7d6" stroke="#3d86b8" strokeWidth="5" />
      <rect x="1060" y="740" width="360" height="12" rx="6" fill="#ffffff" opacity="0.55" />
      <rect x="1060" y="764" width="360" height="12" rx="6" fill="#e8574a" opacity="0.85" />
      <rect x="1015" y="688" width="450" height="24" rx="8" fill="#9ad1f5" stroke="#3d86b8" strokeWidth="4" />
    </g>
  );
}

// Side view, facing left. The ladder and the siren are separate objects on its roof.
function FireTruck() {
  const arches = [-33, 20, 37];
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* ladder rests */}
      <rect x="-12" y="-14" width="3" height="6" rx="1" fill="#8a97a8" />
      <rect x="40" y="-14" width="3" height="6" rx="1" fill="#8a97a8" />
      {/* body */}
      <rect x="-23" y="-9" width="73" height="30" rx="3" fill="#ef3b36" stroke="#a81c1c" strokeWidth="1.2" />
      {/* cab */}
      <path d="M -47 21 L -47 -2 Q -47 -8 -44 -12 L -40 -18 Q -38.5 -20 -35 -20 L -21 -20 L -21 21 Z" fill="#ef3b36" stroke="#a81c1c" strokeWidth="1.2" />
      <path d="M -44 -4 L -39.6 -14.4 Q -38.6 -16.5 -36 -16.5 L -25 -16.5 L -25 -4 Z" fill="#9fdcff" stroke="#a81c1c" strokeWidth="1" />
      <path d="M -35 -14 L -39 -6.5" stroke="#ffffff" strokeWidth="1.6" opacity="0.85" />
      <path d="M -34 -1 L -34 18" fill="none" stroke="#a81c1c" strokeWidth="0.8" />
      <rect x="-31" y="0.5" width="4.5" height="1.8" rx="0.9" fill="#a81c1c" />
      {/* white stripe */}
      <rect x="-47" y="5" width="97" height="3.6" fill="#ffffff" />
      {/* side lockers */}
      {[-18, 3, 24].map((x) => (
        <g key={x}>
          <rect x={x} y="-5.5" width="18" height="8.5" rx="1.5" fill="#dfe6ee" stroke="#8a97a8" strokeWidth="0.8" />
          <line x1={x + 2} x2={x + 16} y1="-2.5" y2="-2.5" stroke="#b8c3cf" strokeWidth="0.8" />
          <line x1={x + 2} x2={x + 16} y1="0" y2="0" stroke="#b8c3cf" strokeWidth="0.8" />
        </g>
      ))}
      <rect x="-19" y="10.5" width="25" height="7" rx="1.5" fill="#dfe6ee" stroke="#8a97a8" strokeWidth="0.8" />
      <circle cx="-6.5" cy="14" r="1.6" fill="#ffd23f" stroke="#c99f00" strokeWidth="0.5" />
      {/* lights, bumper */}
      <rect x="46" y="-6" width="3" height="5" rx="1" fill="#ffb02e" />
      <rect x="-49.5" y="-0.5" width="3.2" height="4.2" rx="1" fill="#fff3a0" stroke="#e0a800" strokeWidth="0.6" />
      <rect x="-50" y="13" width="6" height="7" rx="2" fill="#dfe6ee" stroke="#8a97a8" strokeWidth="0.8" />
      {/* chassis and wheels */}
      <rect x="-46" y="20" width="94" height="3" rx="1.5" fill="#5b6472" />
      {arches.map((x) => (
        <path key={`a${x}`} d={`M ${x - 10} 21 A 10 10 0 0 1 ${x + 10} 21 Z`} fill="#8e1414" />
      ))}
      {arches.map((x) => (
        <g key={`w${x}`}>
          <circle cx={x} cy="21" r="8" fill="#3b3f4a" stroke="#23262d" strokeWidth="0.8" />
          <circle cx={x} cy="21" r="3.8" fill="#dfe6ee" />
          <circle cx={x} cy="21" r="1.3" fill="#8a97a8" />
        </g>
      ))}
    </g>
  );
}

// Drawn upright (for the card); the scene lays it on the truck with `rotate: 90`.
function Ladder() {
  const rungs = [-42, -30, -18, -6, 6, 18, 30, 42];
  return (
    <g strokeLinejoin="round">
      {rungs.map((y) => (
        <rect key={y} x="-8" y={y - 1.7} width="16" height="3.4" rx="1.7" fill="#c3ccd8" stroke="#7d8a9c" strokeWidth="0.6" />
      ))}
      <rect x="-11.5" y="-49" width="5" height="98" rx="2.5" fill="#eef2f6" stroke="#7d8a9c" strokeWidth="0.8" />
      <rect x="6.5" y="-49" width="5" height="98" rx="2.5" fill="#eef2f6" stroke="#7d8a9c" strokeWidth="0.8" />
    </g>
  );
}

function Pole() {
  return (
    <g strokeLinejoin="round">
      <ellipse cx="0" cy="46" rx="7.5" ry="2.4" fill="#ef3b36" stroke="#a81c1c" strokeWidth="0.5" />
      <ellipse cx="0" cy="45.6" rx="5" ry="1.4" fill="#f87b7e" />
      <rect x="-3" y="-48" width="6" height="94" rx="2.5" fill="#f2c14e" stroke="#c48f1c" strokeWidth="0.5" />
      <rect x="-1.4" y="-48" width="1.4" height="93" fill="#fff1b8" opacity="0.9" />
      <ellipse cx="0" cy="-48.5" rx="6.5" ry="1.5" fill="#5b6472" />
    </g>
  );
}

function FireHydrant() {
  return (
    <g strokeLinejoin="round">
      <rect x="-25" y="34" width="50" height="11" rx="3" fill="#ef3b36" stroke="#a81c1c" strokeWidth="2.5" />
      <rect x="-31" y="-6" width="14" height="16" rx="4" fill="#ef3b36" stroke="#a81c1c" strokeWidth="2.5" />
      <rect x="17" y="-6" width="14" height="16" rx="4" fill="#ef3b36" stroke="#a81c1c" strokeWidth="2.5" />
      <rect x="-35" y="-3" width="6" height="10" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="2" />
      <rect x="29" y="-3" width="6" height="10" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="2" />
      <rect x="-18" y="-20" width="36" height="56" rx="6" fill="#ef3b36" stroke="#a81c1c" strokeWidth="2.5" />
      <path d="M -18 -22 Q -18 -44 0 -44 Q 18 -44 18 -22 Z" fill="#ef3b36" stroke="#a81c1c" strokeWidth="2.5" />
      <rect x="-23" y="-26" width="46" height="9" rx="4" fill="#f87b7e" stroke="#a81c1c" strokeWidth="2.5" />
      <rect x="-5" y="-51" width="10" height="8" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="2" />
      <circle cx="0" cy="8" r="7" fill="#ffd23f" stroke="#c99f00" strokeWidth="2" />
      <rect x="-13" y="-14" width="5" height="44" rx="2.5" fill="#ffffff" opacity="0.35" />
    </g>
  );
}

function TrafficCone() {
  return (
    <g strokeLinejoin="round">
      <rect x="-36" y="36" width="72" height="10" rx="4" fill="#ff7a1a" stroke="#c4540a" strokeWidth="2.5" />
      <path d="M -7 -46 L 7 -46 L 27 37 L -27 37 Z" fill="#ff8a2a" stroke="#c4540a" strokeWidth="2.5" />
      <path d="M -11.5 -24 L 11.5 -24 L 14.5 -12 L -14.5 -12 Z" fill="#ffffff" />
      <path d="M -17 0 L 17 0 L 20 12 L -20 12 Z" fill="#ffffff" />
      <path d="M -2 -40 L -16 30" stroke="#ffb27a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

function Hose() {
  // A flat spiral coil with the brass nozzle on top.
  const pts = [];
  const turns = 3;
  for (let i = 0; i <= 216; i++) {
    const a = (i / 216) * turns * Math.PI * 2;
    const r = 6 + a * 1.8;
    pts.push(`${(Math.cos(a) * r - 6).toFixed(1)} ${(Math.sin(a) * r * 0.78 + 6).toFixed(1)}`);
  }
  const d = `M ${pts.join(' L ')} Q 42 -2 38 -16`;
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={d} stroke="#c98a00" strokeWidth="10" />
      <path d={d} stroke="#ffd23f" strokeWidth="7" />
      <path d={d} stroke="#fff3b0" strokeWidth="1.6" opacity="0.8" />
      <path d="M 35 -15 L 41 -36 L 47 -34 L 42 -14 Z" fill="#f2c14e" stroke="#b07d12" strokeWidth="2" />
      <ellipse cx="44" cy="-35.5" rx="3.4" ry="1.6" transform="rotate(16 44 -35.5)" fill="#8a6408" />
    </g>
  );
}

function FirstAidKit() {
  return (
    <g strokeLinejoin="round">
      <path d="M -15 -22 L -15 -31 Q -15 -36 -10 -36 L 10 -36 Q 15 -36 15 -31 L 15 -22" fill="none" stroke="#1f7a4a" strokeWidth="5" strokeLinecap="round" />
      <rect x="-44" y="-24" width="88" height="62" rx="10" fill="#34c472" stroke="#1f7a4a" strokeWidth="3" />
      <rect x="-38" y="-19" width="76" height="6" rx="3" fill="#7fe0a8" opacity="0.7" />
      <path d="M -8 -10 H 8 V 2 H 20 V 18 H 8 V 30 H -8 V 18 H -20 V 2 H -8 Z" fill="#ffffff" />
    </g>
  );
}

const onDesk = (size) => 700 - size * 0.42;

const fireStation = {
  id: 'fire-station',
  title: 'Fire Station',
  titleId: 'Pemadam Kebakaran',
  icon: '🚒',
  Background,
  Foreground: WatchDesk,
  hideBehind: ['📦', '🧥', '🛢️', '🪧'],
  objects: [
    // the big things
    {
      id: 'truck', word: 'fire truck', wordId: 'mobil pemadam kebakaran', art: FireTruck, x: 545, y: 660, size: 700, hit: { w: 690, h: 350, dy: 30 },
      sentence: 'The red fire truck goes to help.', sentenceId: 'Mobil pemadam kebakaran yang merah pergi menolong.',
      question: 'Is the fire truck big or small?', questionId: 'Mobil pemadam kebakarannya besar atau kecil?',
      answer: 'The fire truck is big!', answerId: 'Mobil pemadam kebakarannya besar!',
    },
    {
      id: 'ladder', word: 'ladder', wordId: 'tangga', art: Ladder, x: 650, y: 527, size: 420, rotate: 90, hit: { w: 420, h: 84 },
      sentence: 'The ladder goes up, up, up!', sentenceId: 'Tangganya naik, naik, naik!',
      question: 'Is the ladder long or short?', questionId: 'Tangganya panjang atau pendek?',
      answer: 'The ladder is long.', answerId: 'Tangganya panjang.',
    },
    {
      id: 'siren', word: 'siren', wordId: 'sirene', emoji: '🚨', x: 342, y: 486, size: 90,
      sentence: 'The siren goes wee-oo, wee-oo!', sentenceId: 'Sirene berbunyi nguing, nguing!',
      question: 'Can you make a siren sound?', questionId: 'Bisa menirukan bunyi sirene?',
      answer: 'Wee-oo, wee-oo!', answerId: 'Nguing, nguing!',
    },
    {
      id: 'pole', word: 'pole', wordId: 'tiang', art: Pole, x: 958, y: 418, size: 780, hit: { w: 110, h: 760 },
      sentence: 'Whoosh! Firefighters slide down the pole.', sentenceId: 'Wusss! Pemadam kebakaran meluncur turun lewat tiang.',
      question: 'Is the pole tall or short?', questionId: 'Tiangnya tinggi atau pendek?',
      answer: 'The pole is tall.', answerId: 'Tiangnya tinggi.',
    },
    {
      id: 'firefighter', word: 'firefighter', wordId: 'pemadam kebakaran', emoji: '🧑‍🚒', x: 1200, y: 578, size: 270,
      sentence: 'The firefighter helps people.', sentenceId: 'Pemadam kebakaran menolong orang.',
      question: 'Do you want to be a firefighter?', questionId: 'Kamu mau jadi pemadam kebakaran?',
      answer: 'Yes, I want to help!', answerId: 'Ya, aku mau menolong!',
    },

    // up on the walls and in the sky
    {
      id: 'bell', word: 'bell', wordId: 'lonceng', emoji: '🔔', x: 540, y: 86, size: 100,
      sentence: 'Clang, clang! The fire bell rings.', sentenceId: 'Teng, teng! Loncengnya berbunyi.',
      question: 'Is the bell loud or quiet?', questionId: 'Loncengnya keras atau pelan?',
      answer: 'The bell is loud!', answerId: 'Loncengnya keras!',
    },
    {
      id: 'helicopter', word: 'helicopter', wordId: 'helikopter', emoji: '🚁', x: 500, y: 340, size: 150,
      sentence: 'The helicopter flies high in the sky.', sentenceId: 'Helikopternya terbang tinggi di langit.',
      question: 'Can you fly like a helicopter?', questionId: 'Bisa terbang seperti helikopter?',
      answer: 'Whirr, whirr! I can fly!', answerId: 'Wuung, wuung! Aku bisa terbang!',
    },
    {
      id: 'clock', word: 'alarm clock', wordId: 'jam weker', emoji: '⏰', x: 100, y: 110, size: 110,
      sentence: 'The alarm clock wakes us up.', sentenceId: 'Jam weker membangunkan kita.',
      question: 'Do you wake up early?', questionId: 'Kamu bangun pagi-pagi?',
      answer: 'Yes, I wake up early.', answerId: 'Ya, aku bangun pagi.',
    },
    {
      id: 'rope', word: 'rope', wordId: 'tali', emoji: '🪢', x: 100, y: 335, size: 120,
      sentence: 'The rope has a big knot.', sentenceId: 'Talinya ada simpul besar.',
      question: 'Can you tie a knot?', questionId: 'Bisa membuat simpul?',
      answer: 'Yes, I can try!', answerId: 'Ya, aku bisa coba!',
    },
    {
      id: 'extinguisher', word: 'fire extinguisher', wordId: 'alat pemadam api', emoji: '🧯', x: 100, y: 598, size: 150,
      sentence: 'Only grown-ups use the fire extinguisher.', sentenceId: 'Hanya orang dewasa yang boleh memakai alat pemadam api.',
      question: 'Is it heavy or light?', questionId: 'Alatnya berat atau ringan?',
      answer: 'It is heavy.', answerId: 'Alatnya berat.',
    },
    {
      id: 'map', word: 'map', wordId: 'peta', emoji: '🗺️', x: 1215, y: 195, size: 170,
      sentence: 'The map shows the way.', sentenceId: 'Peta menunjukkan jalan.',
      question: 'Can you find the green land?', questionId: 'Bisa menemukan daratan yang hijau?',
      answer: 'Here is the green land!', answerId: 'Ini daratan yang hijau!',
    },
    {
      id: 'radio', word: 'radio', wordId: 'radio', emoji: '📻', x: 1360, y: 380, size: 110,
      sentence: 'We listen to music on the radio.', sentenceId: 'Kami mendengarkan musik di radio.',
      question: 'Can you dance to the music?', questionId: 'Bisa menari mengikuti musik?',
      answer: 'Yes, I can dance!', answerId: 'Ya, aku bisa menari!',
    },
    {
      id: 'helmet', word: 'helmet', wordId: 'helm', emoji: '⛑️', x: 1525, y: 240, size: 120,
      sentence: 'The helmet keeps my head safe.', sentenceId: 'Helm menjaga kepalaku tetap aman.',
      question: 'Do you wear a helmet on your bike?', questionId: 'Kamu pakai helm kalau naik sepeda?',
      answer: 'Yes, I wear a helmet.', answerId: 'Ya, aku pakai helm.',
    },
    {
      id: 'vest', word: 'vest', wordId: 'rompi', emoji: '🦺', x: 1525, y: 478, size: 140,
      sentence: 'The orange vest is easy to see.', sentenceId: 'Rompi oranye mudah terlihat.',
      question: 'What color is the vest?', questionId: 'Rompinya warna apa?',
      answer: 'The vest is orange.', answerId: 'Rompinya oranye.',
    },
    {
      id: 'phone', word: 'phone', wordId: 'telepon', emoji: '☎️', x: 1385, y: onDesk(95), size: 95,
      sentence: 'Ring, ring! Someone needs help.', sentenceId: 'Kring, kring! Ada yang butuh bantuan.',
      question: 'Who helps when there is a fire?', questionId: 'Siapa yang menolong kalau ada kebakaran?',
      answer: 'The firefighters help!', answerId: 'Pemadam kebakaran yang menolong!',
    },

    // on the floor
    {
      id: 'hydrant', word: 'fire hydrant', wordId: 'hidran', art: FireHydrant, x: 100, y: 985, size: 175,
      sentence: 'Water comes out of the fire hydrant.', sentenceId: 'Air keluar dari hidran.',
      question: 'What color is the fire hydrant?', questionId: 'Hidrannya warna apa?',
      answer: 'The fire hydrant is red.', answerId: 'Hidrannya merah.',
    },
    {
      id: 'cone', word: 'traffic cone', wordId: 'kerucut lalu lintas', art: TrafficCone, x: 290, y: 1090, size: 150,
      sentence: 'The cone tells cars to go slow.', sentenceId: 'Kerucut ini menyuruh mobil jalan pelan-pelan.',
      question: 'Can you count the white stripes?', questionId: 'Bisa hitung garis putihnya?',
      answer: 'One, two!', answerId: 'Satu, dua!',
    },
    {
      id: 'boot', word: 'boot', wordId: 'sepatu bot', emoji: '🥾', x: 470, y: 975, size: 115,
      sentence: 'The big boot goes stomp, stomp!', sentenceId: 'Sepatu bot besar bunyinya dug, dug!',
      question: 'Can you stomp your feet?', questionId: 'Bisa menghentakkan kaki?',
      answer: 'Stomp, stomp, stomp!', answerId: 'Dug, dug, dug!',
    },
    {
      id: 'hose', word: 'hose', wordId: 'selang', art: Hose, x: 680, y: 1080, size: 210, hit: { w: 210, h: 170, dy: 4 },
      sentence: 'The long hose sprays water.', sentenceId: 'Selang panjang menyemprotkan air.',
      question: 'Can you say splash, splash?', questionId: 'Bisa bilang byur, byur?',
      answer: 'Splash, splash!', answerId: 'Byur, byur!',
    },
    {
      id: 'bucket', word: 'bucket', wordId: 'ember', emoji: '🪣', x: 880, y: 975, size: 120,
      sentence: 'We wash the truck with a bucket.', sentenceId: 'Kami mencuci mobil pakai ember.',
      question: 'What color is the bucket?', questionId: 'Embernya warna apa?',
      answer: 'The bucket is blue.', answerId: 'Embernya biru.',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 1110, y: 1020, size: 170,
      sentence: 'The fire station dog says woof!', sentenceId: 'Anjing di pos pemadam kebakaran menggonggong, guk guk!',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof, woof!', answerId: 'Guk, guk!',
    },
    {
      id: 'first-aid', word: 'first aid kit', wordId: 'kotak P3K', art: FirstAidKit, x: 1320, y: 1085, size: 140,
      sentence: 'The first aid kit has bandages.', sentenceId: 'Kotak P3K berisi plester.',
      question: 'What color is the first aid kit?', questionId: 'Kotak P3K-nya warna apa?',
      answer: 'It is green.', answerId: 'Warnanya hijau.',
    },
    {
      id: 'cat', word: 'cat', wordId: 'kucing', emoji: '🐈', x: 1510, y: 1000, size: 140,
      sentence: 'Firefighters help cats, too!', sentenceId: 'Pemadam kebakaran juga menolong kucing!',
      question: 'Can you meow like a cat?', questionId: 'Bisa mengeong seperti kucing?',
      answer: 'Meow, meow!', answerId: 'Meong, meong!',
    },
    {
      id: 'flashlight', word: 'flashlight', wordId: 'senter', emoji: '🔦', x: 1532, y: 662, size: 110, rotate: -45,
      sentence: 'The flashlight helps us see in the dark.', sentenceId: 'Senter membantu kita melihat dalam gelap.',
      question: 'Is it dark at night?', questionId: 'Malam hari gelap, ya?',
      answer: 'Yes, it is dark.', answerId: 'Ya, gelap.',
    },
  ],
};

export default fireStation;

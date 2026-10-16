// Bathroom scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

const WALL_SPLIT = 470; // upper wall (small tiles) / lower wall (big aqua tiles)
const FLOOR_Y = 800;

function Background() {
  const lines = [];
  // upper wall: square tiles
  for (let x = 80; x < 1600; x += 80) {
    lines.push(<line key={`uv${x}`} x1={x} x2={x} y1="22" y2={WALL_SPLIT} stroke="#ffffff" strokeWidth="4" opacity="0.9" />);
  }
  for (let y = 102; y < WALL_SPLIT; y += 80) {
    lines.push(<line key={`uh${y}`} x1="0" x2="1600" y1={y} y2={y} stroke="#ffffff" strokeWidth="4" opacity="0.9" />);
  }
  // lower wall: brick-style tiles
  for (let row = 0; row < 5; row++) {
    const y = WALL_SPLIT + 34 + row * 58;
    lines.push(<line key={`lh${row}`} x1="0" x2="1600" y1={y} y2={y} stroke="#ffffff" strokeWidth="4" opacity="0.8" />);
    for (let x = row % 2 ? 60 : 0; x < 1600; x += 120) {
      lines.push(<line key={`lv${row}-${x}`} x1={x} x2={x} y1={y} y2={y + 58} stroke="#ffffff" strokeWidth="4" opacity="0.8" />);
    }
  }
  // floor: checkerboard
  const floor = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 16; col++) {
      if ((row + col) % 2) floor.push(<rect key={`f${row}-${col}`} x={col * 100} y={FLOOR_Y + row * 100} width="100" height="100" fill="#c4e8f7" />);
    }
  }
  const diamonds = [];
  for (let x = 30; x < 1600; x += 60) {
    diamonds.push(<path key={`d${x}`} d={`M ${x} ${WALL_SPLIT + 6} L ${x + 10} ${WALL_SPLIT + 17} L ${x} ${WALL_SPLIT + 28} L ${x - 10} ${WALL_SPLIT + 17} Z`} fill="#ffffff" opacity="0.85" />);
  }
  return (
    <g>
      {/* walls */}
      <rect width="1600" height={WALL_SPLIT} fill="#e3f7fa" />
      <rect y={WALL_SPLIT} width="1600" height={FLOOR_Y - WALL_SPLIT} fill="#a6e3ea" />
      {lines}
      <rect width="1600" height="22" fill="#7fd3dc" />
      <rect y={WALL_SPLIT} width="1600" height="34" fill="#4fbfcc" />
      {diamonds}

      {/* floor */}
      <rect y={FLOOR_Y} width="1600" height={1200 - FLOOR_Y} fill="#ffffff" />
      {floor}
      <rect y={FLOOR_Y - 14} width="1600" height="16" fill="#ffffff" />
      <rect y={FLOOR_Y} width="1600" height="5" fill="#8fd0e0" />

      {/* soft shadows on the floor */}
      <ellipse cx="210" cy="814" rx="125" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="650" cy="814" rx="80" ry="12" fill="#000" opacity="0.1" />
      <ellipse cx="905" cy="816" rx="55" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="1290" cy="902" rx="250" ry="18" fill="#000" opacity="0.1" />
      <ellipse cx="125" cy="1110" rx="70" ry="12" fill="#000" opacity="0.1" />
      <ellipse cx="450" cy="1037" rx="80" ry="12" fill="#000" opacity="0.1" />

      {/* toilet paper holder */}
      <rect x="352" y="668" width="96" height="9" rx="4" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="3" />
      <rect x="394" y="676" width="12" height="16" rx="3" fill="#b8c6d4" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <circle r="47" fill="#ffffff" stroke="#8fc0d4" strokeWidth="2" />
      <circle r="38" fill="#9fdcff" />
      <circle cx="15" cy="-15" r="9" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="-17" cy="-6" r="5" />
        <circle cx="-10" cy="-9" r="6.5" />
        <circle cx="-3" cy="-6" r="5" />
        <rect x="-17" y="-6" width="14" height="5" />
      </g>
      <path d="M -36.66 10 Q -12 -2 10 10 Q 24 2 37.5 6 A 38 38 0 0 1 -36.66 10 Z" fill="#7ed957" />
      <rect x="-2" y="-38" width="4" height="76" fill="#ffffff" />
      <rect x="-38" y="-2" width="76" height="4" fill="#ffffff" />
      <circle r="40" fill="none" stroke="#ffffff" strokeWidth="5" />
      <circle r="37.5" fill="none" stroke="#8fc0d4" strokeWidth="1" />
    </g>
  );
}

function Mirror() {
  return (
    <g strokeLinejoin="round">
      <path d="M -36 46 L -36 -12 A 36 36 0 0 1 36 -12 L 36 46 Z" fill="#ffd23f" stroke="#d9a800" strokeWidth="2" />
      <path d="M -29 40 L -29 -12 A 29 29 0 0 1 29 -12 L 29 40 Z" fill="#c9efff" stroke="#e0b400" strokeWidth="1" />
      <path d="M -22 6 L 6 -30 L 14 -26 L -14 10 Z" fill="#ffffff" opacity="0.75" />
      <path d="M -16 30 L 18 -12 L 22 -6 L -10 34 Z" fill="#ffffff" opacity="0.6" />
      <circle cx="0" cy="-49" r="3" fill="#d9a800" />
    </g>
  );
}

function Shelf() {
  return (
    <g strokeLinejoin="round">
      <path d="M -34 6 L -20 6 L -27 17 Z" fill="#d9844a" stroke="#b5652f" strokeWidth="1.4" />
      <path d="M 20 6 L 34 6 L 27 17 Z" fill="#d9844a" stroke="#b5652f" strokeWidth="1.4" />
      <path d="M -44 -10 L 44 -10 L 48 -4 L -48 -4 Z" fill="#ffc48a" stroke="#c9773a" strokeWidth="1.4" />
      <rect x="-48" y="-4" width="96" height="11" rx="3" fill="#f4a261" stroke="#c9773a" strokeWidth="1.6" />
    </g>
  );
}

function Towel() {
  return (
    <g strokeLinejoin="round">
      <rect x="-48" y="-43" width="96" height="6" rx="3" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.4" />
      <circle cx="-46" cy="-40" r="4.5" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.4" />
      <circle cx="46" cy="-40" r="4.5" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.4" />
      <path d="M -33 -40 Q 0 -44 33 -40 L 34 40 Q 0 44 -34 40 Z" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.6" />
      <path d="M -34 -42 Q 0 -50 34 -42 L 33 -30 Q 0 -35 -33 -30 Z" fill="#ffa9bf" stroke="#d45d7f" strokeWidth="1.4" />
      <path d="M -34 22 Q 0 26 34 22 L 34 28 Q 0 32 -34 28 Z" fill="#ffffff" />
      <path d="M -34 32 Q 0 36 34 32 L 34 35 Q 0 39 -34 35 Z" fill="#ffffff" />
      <g stroke="#d45d7f" strokeWidth="1.6" strokeLinecap="round">
        {[-28, -19, -10, -1, 8, 17, 26].map((x) => (
          <line key={x} x1={x} y1={42} x2={x} y2={47} />
        ))}
      </g>
    </g>
  );
}

const SHOWER_DROPS = [
  [-24, -8], [-12, -6], [0, -9], [8, -4],
  [-28, 8], [-16, 6], [-4, 10], [8, 12],
  [-22, 24], [-10, 22], [2, 27], [-30, 36], [-16, 38], [-2, 40],
];

function Shower() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <g fill="#4cb8f5" stroke="#2f95d6" strokeWidth="0.8">
        {SHOWER_DROPS.map(([x, y]) => (
          <path key={`${x},${y}`} d={`M ${x} ${y - 5} C ${x + 3.5} ${y - 1} ${x + 3.5} ${y + 3} ${x} ${y + 3} C ${x - 3.5} ${y + 3} ${x - 3.5} ${y - 1} ${x} ${y - 5} Z`} />
        ))}
      </g>
      <path d="M 32 34 L 32 -28 Q 32 -44 16 -44 L 2 -44" fill="none" stroke="#7d8da0" strokeWidth="8" />
      <path d="M 32 34 L 32 -28 Q 32 -44 16 -44 L 2 -44" fill="none" stroke="#dfe8f0" strokeWidth="4.5" />
      <path d="M 4 -44 L -4 -37" fill="none" stroke="#7d8da0" strokeWidth="6" />
      <path d="M -10 -40 Q -5 -42 0 -38 L 8 -22 Q -8 -17 -24 -22 Z" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.6" />
      <ellipse cx="-8" cy="-21" rx="16" ry="3.5" fill="#b8c6d4" stroke="#7d8da0" strokeWidth="1.2" />
      <circle cx="32" cy="36" r="8" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.6" />
      <circle cx="32" cy="36" r="3.5" fill="#ff6b6b" />
    </g>
  );
}

function Bathtub() {
  return (
    <g strokeLinejoin="round">
      <path d="M -36 20 Q -36 30 -43 35 Q -34 38 -27 33 Q -25 27 -25 20 Z" fill="#ffd23f" stroke="#d9a800" strokeWidth="1.2" />
      <path d="M 36 20 Q 36 30 43 35 Q 34 38 27 33 Q 25 27 25 20 Z" fill="#ffd23f" stroke="#d9a800" strokeWidth="1.2" />
      <path d="M -46 -6 L 46 -6 Q 46 20 30 26 L -30 26 Q -46 20 -46 -6 Z" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
      <path d="M -44 10 Q 0 15 44 10 Q 40 22 30 26 L -30 26 Q -40 22 -44 10 Z" fill="#dff1fa" />
      <path d="M -38 0 Q -36 12 -26 18" fill="none" stroke="#e8f6fc" strokeWidth="3" strokeLinecap="round" />
      <rect x="-50" y="-16" width="100" height="12" rx="6" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
      <rect x="-45" y="-13" width="90" height="6" rx="3" fill="#9fdcff" stroke="#5ab0e6" strokeWidth="1" />
      <path d="M -30 -10 Q -26 -12 -22 -10 M 14 -10 Q 18 -12 22 -10" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

function Sink() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -10 4 L 10 4 L 14 44 Q 0 47 -14 44 Z" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
      <ellipse cx="0" cy="45" rx="19" ry="4" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
      {/* tap */}
      <rect x="-4" y="-36" width="8" height="16" rx="2" fill="#dfe8f0" stroke="#7d8da0" strokeWidth="1.4" />
      <path d="M 0 -34 Q 0 -42 9 -41 Q 17 -40 17 -32" fill="none" stroke="#7d8da0" strokeWidth="6" />
      <path d="M 0 -34 Q 0 -42 9 -41 Q 17 -40 17 -32" fill="none" stroke="#dfe8f0" strokeWidth="3" />
      <circle cx="-12" cy="-26" r="3.6" fill="#ff6b6b" stroke="#d64545" strokeWidth="1.2" />
      <circle cx="12" cy="-26" r="3.6" fill="#4cb8f5" stroke="#2f95d6" strokeWidth="1.2" />
      {/* basin */}
      <path d="M -46 -18 L 46 -18 Q 44 4 20 6 L -20 6 Q -44 4 -46 -18 Z" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
      <path d="M -40 -8 Q -30 2 -16 3" fill="none" stroke="#dff1fa" strokeWidth="3" />
      <rect x="-49" y="-23" width="98" height="7" rx="3.5" fill="#ffffff" stroke="#7fb3cf" strokeWidth="1.6" />
    </g>
  );
}

function BathMat() {
  const bumps = [];
  for (let x = -40; x <= 40; x += 8) {
    bumps.push(<circle key={`t${x}`} cx={x} cy={-18} r="4.5" />, <circle key={`b${x}`} cx={x} cy={18} r="4.5" />);
  }
  for (let y = -10; y <= 10; y += 7) {
    bumps.push(<circle key={`l${y}`} cx={-48} cy={y} r="4.5" />, <circle key={`r${y}`} cx={48} cy={y} r="4.5" />);
  }
  return (
    <g strokeLinejoin="round">
      <g fill="#7ed957" stroke="#4caf50" strokeWidth="1.4">{bumps}</g>
      <rect x="-48" y="-18" width="96" height="36" rx="11" fill="#7ed957" />
      <rect x="-38" y="-10" width="76" height="20" rx="7" fill="#a6ec7e" />
      <rect x="-30" y="-4" width="60" height="8" rx="4" fill="#c9f7ad" />
    </g>
  );
}

function RubberDuck() {
  return (
    <g strokeLinejoin="round">
      <ellipse cx="0" cy="40" rx="44" ry="6" fill="#9fdcff" stroke="#5ab0e6" strokeWidth="1" />
      <path d="M -44 -10 Q -36 6 -24 8 L 4 8 Q 30 2 40 14 Q 44 36 10 38 L -20 38 Q -46 36 -44 -10 Z" fill="#ffd23f" stroke="#e0a800" strokeWidth="2" />
      <path d="M -20 18 Q -4 8 12 18 Q -2 30 -20 18 Z" fill="#ffc300" stroke="#e0a800" strokeWidth="1.6" />
      <circle cx="16" cy="-14" r="20" fill="#ffd23f" stroke="#e0a800" strokeWidth="2" />
      <path d="M 2 4 Q 16 10 30 2" fill="#ffd23f" />
      <path d="M 32 -18 Q 46 -19 48 -12 Q 46 -5 32 -6 Z" fill="#ff8c1a" stroke="#d96a00" strokeWidth="1.6" />
      <circle cx="22" cy="-20" r="3.8" fill="#2d2d2d" />
      <circle cx="23.3" cy="-21.3" r="1.3" fill="#ffffff" />
      <circle cx="26" cy="-9" r="3" fill="#ff9f9f" opacity="0.7" />
    </g>
  );
}

function Shampoo() {
  return (
    <g strokeLinejoin="round">
      <rect x="-10" y="-44" width="20" height="16" rx="4" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.6" />
      <rect x="-4" y="-48" width="8" height="6" rx="2" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.4" />
      <path d="M -14 -30 L 14 -30 Q 24 -24 24 -12 L 24 38 Q 24 44 18 44 L -18 44 Q -24 44 -24 38 L -24 -12 Q -24 -24 -14 -30 Z" fill="#b388ff" stroke="#7c4dff" strokeWidth="1.8" />
      <rect x="-16" y="-6" width="32" height="34" rx="6" fill="#ffffff" />
      <circle cx="-5" cy="8" r="6" fill="#c9efff" stroke="#5ab0e6" strokeWidth="1.2" />
      <circle cx="6" cy="16" r="4.5" fill="#c9efff" stroke="#5ab0e6" strokeWidth="1.2" />
      <circle cx="6" cy="2" r="3" fill="#c9efff" stroke="#5ab0e6" strokeWidth="1.2" />
      <path d="M -18 -18 Q -18 -24 -12 -26" fill="none" stroke="#d9c6ff" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Cup() {
  return (
    <g strokeLinejoin="round">
      <path d="M 16 -16 Q 40 -18 38 4 Q 36 20 14 20" fill="none" stroke="#d64545" strokeWidth="9" strokeLinecap="round" />
      <path d="M 16 -16 Q 40 -18 38 4 Q 36 20 14 20" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" />
      <path d="M -34 -30 L 22 -30 L 18 34 Q -6 40 -30 34 Z" fill="#ff6b6b" stroke="#d64545" strokeWidth="2" />
      <ellipse cx="-6" cy="-30" rx="28" ry="5" fill="#ffb3b3" stroke="#d64545" strokeWidth="2" />
      <g fill="#ffffff" opacity="0.9">
        <circle cx="-18" cy="-12" r="4" />
        <circle cx="4" cy="-8" r="4" />
        <circle cx="-8" cy="8" r="4" />
        <circle cx="-20" cy="22" r="4" />
        <circle cx="6" cy="22" r="4" />
      </g>
    </g>
  );
}

function Toothpaste() {
  return (
    <g strokeLinejoin="round">
      <path d="M -46 -15 L 18 -12 Q 26 -10 28 -5 L 28 5 Q 26 10 18 12 L -46 15 Z" fill="#ffffff" stroke="#5a8fd6" strokeWidth="1.8" />
      <path d="M -40 -14.7 L -40 14.7" stroke="#5a8fd6" strokeWidth="1.4" />
      <path d="M -26 -14.1 L -12 -13.4 L -12 13.4 L -26 14.1 Z" fill="#4c8df5" />
      <path d="M -8 -13.2 L 0 -12.9 L 0 12.9 L -8 13.2 Z" fill="#ff6b6b" />
      <rect x="27" y="-4" width="7" height="8" rx="1.5" fill="#4c8df5" stroke="#2f6bd0" strokeWidth="1.2" />
      <path d="M 34 -3 Q 44 -4 44 -12 Q 44 -20 36 -20 Q 30 -20 32 -26" fill="none" stroke="#2f9e8f" strokeWidth="8" strokeLinecap="round" />
      <path d="M 34 -3 Q 44 -4 44 -12 Q 44 -20 36 -20 Q 30 -20 32 -26" fill="none" stroke="#8ff0d8" strokeWidth="5" strokeLinecap="round" />
      <path d="M 34 -3 Q 44 -4 44 -12 Q 44 -20 36 -20 Q 30 -20 32 -26" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

const bathroom = {
  id: 'bathroom',
  title: 'Bathroom',
  titleId: 'Kamar Mandi',
  icon: '🛁',
  Background,
  objects: [
    {
      id: 'bathtub', word: 'bathtub', wordId: 'bak mandi', art: Bathtub, x: 1290, y: 700, size: 560, hit: { w: 540, h: 280, dy: 35 },
      sentence: 'I take a bath in the bathtub.', sentenceId: 'Aku mandi berendam di bak mandi.',
      question: 'Do you like bath time?', questionId: 'Kamu suka waktu mandi?',
      answer: 'Yes, I love bath time!', answerId: 'Ya, aku suka sekali mandi!',
    },
    {
      id: 'shower', word: 'shower', wordId: 'pancuran', art: Shower, x: 1430, y: 280, size: 360, hit: { w: 290, h: 330, dx: -5 },
      sentence: 'Water comes out of the shower.', sentenceId: 'Air keluar dari pancuran.',
      question: 'Is the water hot or cold?', questionId: 'Airnya panas atau dingin?',
      answer: 'The water is warm.', answerId: 'Airnya hangat.',
    },
    {
      id: 'sink', word: 'sink', wordId: 'wastafel', art: Sink, x: 650, y: 665, size: 320, hit: { w: 290, h: 290, dy: 5 },
      sentence: 'I wash my hands in the sink.', sentenceId: 'Aku cuci tangan di wastafel.',
      question: 'Do you wash your hands before eating?', questionId: 'Kamu cuci tangan sebelum makan?',
      answer: 'Yes, I wash my hands.', answerId: 'Ya, aku cuci tangan.',
    },
    {
      id: 'mirror', word: 'mirror', wordId: 'cermin', art: Mirror, x: 650, y: 250, size: 290, hit: { w: 220, h: 270 },
      sentence: 'I can see myself in the mirror!', sentenceId: 'Aku bisa melihat diriku di cermin!',
      question: 'Can you make a funny face?', questionId: 'Bisa bikin muka lucu?',
      answer: 'Yes! Look at my funny face!', answerId: 'Ya! Lihat muka lucuku!',
    },
    {
      id: 'shelf', word: 'shelf', wordId: 'rak', art: Shelf, x: 650, y: 470, size: 270, hit: { w: 260, h: 60, dy: 2 },
      sentence: 'The cup is on the shelf.', sentenceId: 'Gelasnya ada di atas rak.',
      question: 'Is the shelf up high or down low?', questionId: 'Raknya di atas atau di bawah?',
      answer: 'The shelf is up high.', answerId: 'Raknya di atas.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 215, y: 215, size: 270,
      sentence: 'The sun shines through the window.', sentenceId: 'Matahari bersinar lewat jendela.',
      question: 'Is it day or night?', questionId: 'Sekarang siang atau malam?',
      answer: 'It is day!', answerId: 'Sekarang siang!',
    },
    {
      id: 'towel', word: 'towel', wordId: 'handuk', art: Towel, x: 940, y: 440, size: 250, hit: { w: 180, h: 230, dy: 5 },
      sentence: 'I dry my body with a towel.', sentenceId: 'Aku mengeringkan badan pakai handuk.',
      question: 'Is the towel pink or blue?', questionId: 'Handuknya merah muda atau biru?',
      answer: 'The towel is pink.', answerId: 'Handuknya merah muda.',
    },
    {
      id: 'toilet', word: 'toilet', wordId: 'toilet', emoji: '🚽', x: 210, y: 695, size: 265, flip: true,
      sentence: 'Flush! The toilet goes whoosh!', sentenceId: 'Siram! Toiletnya berbunyi wusss!',
      question: 'Do you flush the toilet?', questionId: 'Kamu siram toiletnya?',
      answer: 'Yes, I always flush!', answerId: 'Ya, aku selalu siram!',
    },
    {
      id: 'bathmat', word: 'bath mat', wordId: 'keset', art: BathMat, x: 1270, y: 1055, size: 420, hit: { w: 420, h: 170 },
      sentence: 'I dry my feet on the bath mat.', sentenceId: 'Aku keringkan kakiku di keset.',
      question: 'Can you wiggle your toes?', questionId: 'Bisa goyang-goyangkan jari kakimu?',
      answer: 'Wiggle, wiggle, wiggle!', answerId: 'Goyang, goyang, goyang!',
    },
    {
      id: 'duck', word: 'rubber duck', wordId: 'bebek karet', art: RubberDuck, x: 1175, y: 597, size: 130,
      sentence: 'The rubber duck says quack!', sentenceId: 'Bebek karetnya bilang kwek!',
      question: 'Can you say quack like a duck?', questionId: 'Bisa bilang kwek seperti bebek?',
      answer: 'Quack, quack!', answerId: 'Kwek, kwek!',
    },
    {
      id: 'boat', word: 'toy boat', wordId: 'perahu mainan', emoji: '⛵', x: 1345, y: 585, size: 130,
      sentence: 'The toy boat floats on the water.', sentenceId: 'Perahu mainannya mengapung di air.',
      question: 'Can you blow like the wind?', questionId: 'Bisa meniup seperti angin?',
      answer: 'Whoosh, whoosh!', answerId: 'Wusss, wusss!',
    },
    {
      id: 'sponge', word: 'sponge', wordId: 'spons', emoji: '🧽', x: 1500, y: 600, size: 95,
      sentence: 'I wash my body with a sponge.', sentenceId: 'Aku menggosok badanku pakai spons.',
      question: 'What color is the sponge?', questionId: 'Sponsnya warna apa?',
      answer: 'The sponge is yellow.', answerId: 'Sponsnya kuning.',
    },
    {
      id: 'shampoo', word: 'shampoo', wordId: 'sampo', art: Shampoo, x: 1065, y: 572, size: 120,
      sentence: 'I wash my hair with shampoo.', sentenceId: 'Aku keramas pakai sampo.',
      question: 'Can you rub your head like this?', questionId: 'Bisa gosok kepalamu seperti ini?',
      answer: 'Scrub, scrub, scrub!', answerId: 'Gosok, gosok, gosok!',
    },
    {
      id: 'bubbles', word: 'bubbles', wordId: 'gelembung', emoji: '🫧', x: 1110, y: 225, size: 150,
      sentence: 'Pop, pop! I pop the bubbles.', sentenceId: 'Pop, pop! Aku pecahkan gelembungnya.',
      question: 'How many bubbles can you see?', questionId: 'Ada berapa gelembung yang kamu lihat?',
      answer: 'I can see three bubbles.', answerId: 'Aku bisa melihat tiga gelembung.',
    },
    {
      id: 'cup', word: 'cup', wordId: 'gelas', art: Cup, x: 735, y: 418, size: 95,
      sentence: 'I rinse my mouth with my cup.', sentenceId: 'Aku kumur-kumur pakai gelasku.',
      question: 'What color is the cup?', questionId: 'Gelasnya warna apa?',
      answer: 'The cup is red.', answerId: 'Gelasnya merah.',
    },
    {
      id: 'toothpaste', word: 'toothpaste', wordId: 'pasta gigi', art: Toothpaste, x: 565, y: 440, size: 110,
      sentence: 'I put toothpaste on my toothbrush.', sentenceId: 'Aku taruh pasta gigi di sikat gigiku.',
      question: 'Do you use a little or a lot?', questionId: 'Kamu pakai sedikit atau banyak?',
      answer: 'I use a little.', answerId: 'Aku pakai sedikit.',
    },
    {
      id: 'soap', word: 'soap', wordId: 'sabun', emoji: '🧼', x: 548, y: 580, size: 90,
      sentence: 'The soap makes lots of bubbles.', sentenceId: 'Sabunnya bikin banyak gelembung.',
      question: 'Is the soap pink or blue?', questionId: 'Sabunnya pink atau biru?',
      answer: 'The soap is pink.', answerId: 'Sabunnya pink.',
    },
    {
      id: 'toothbrush', word: 'toothbrush', wordId: 'sikat gigi', emoji: '🪥', x: 762, y: 578, size: 92, rotate: 42,
      sentence: 'I brush my teeth every day.', sentenceId: 'Aku sikat gigi setiap hari.',
      question: 'Can you pretend to brush your teeth?', questionId: 'Bisa pura-pura sikat gigi?',
      answer: 'Brush, brush, brush!', answerId: 'Sikat, sikat, sikat!',
    },
    {
      id: 'paper', word: 'toilet paper', wordId: 'tisu toilet', emoji: '🧻', x: 400, y: 625, size: 95,
      sentence: 'The toilet paper is soft and white.', sentenceId: 'Tisu toiletnya lembut dan putih.',
      question: 'Is the toilet paper white?', questionId: 'Apakah tisu toiletnya putih?',
      answer: 'Yes, it is white.', answerId: 'Ya, warnanya putih.',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 905, y: 752, size: 135,
      sentence: 'The plant has green leaves.', sentenceId: 'Tanamannya punya daun hijau.',
      question: 'Do plants need water?', questionId: 'Apakah tanaman butuh air?',
      answer: 'Yes, plants need water.', answerId: 'Ya, tanaman butuh air.',
    },
    {
      id: 'bucket', word: 'bucket', wordId: 'ember', emoji: '🪣', x: 125, y: 1050, size: 140,
      sentence: 'I fill the bucket with water.', sentenceId: 'Aku isi ember dengan air.',
      question: 'Is the bucket blue or red?', questionId: 'Embernya biru atau merah?',
      answer: 'The bucket is blue.', answerId: 'Embernya biru.',
    },
    {
      id: 'basket', word: 'basket', wordId: 'keranjang', emoji: '🧺', x: 450, y: 975, size: 150,
      sentence: 'Dirty clothes go in the basket.', sentenceId: 'Baju kotor masuk ke keranjang.',
      question: 'Can you put your clothes in it?', questionId: 'Bisa taruh bajumu di situ?',
      answer: 'Yes, I can!', answerId: 'Ya, aku bisa!',
    },
    {
      id: 'flipflop', word: 'flip-flop', wordId: 'sandal jepit', emoji: '🩴', x: 790, y: 1095, size: 120,
      sentence: 'My flip-flop goes flip, flop!', sentenceId: 'Sandal jepitku berbunyi flip, flop!',
      question: 'Can you say flip-flop fast?', questionId: 'Bisa bilang flip-flop dengan cepat?',
      answer: 'Flip-flop, flip-flop!', answerId: 'Flip-flop, flip-flop!',
    },
  ],
};

export default bathroom;

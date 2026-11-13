// Library scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// The tall bookshelf on the left is drawn at size 640 with its centre at (270, 480), so one
// art unit is 6.4 px there; its shelf boards (top surfaces) are at y = 384, 570 and 755.

const SHELF = { x: 270, y: 480, size: 640 };
const BOARDS = [-15, 14, 43]; // board tops in bookshelf art units
const boardY = (i) => SHELF.y + (BOARDS[i] * SHELF.size) / 100;
const onBoard = (i, size) => Math.round(boardY(i) - size * 0.43);

// Spine colours are soft yellow / purple / cream on purpose: the coloured books you find
// (red, green, blue, orange) must stand out from the decoration.
const SPINE_COLORS = [
  ['#bda8ee', '#8f74c9'],
  ['#f8d96a', '#d2aa2c'],
  ['#f6ecd2', '#cbb88e'],
  ['#8f6cc4', '#64479a'],
];

function Spines({ from, to, floor, maxH, start = 0 }) {
  const out = [];
  let x = from;
  let i = start;
  while (x < to) {
    const w = [3.8, 4.6, 3.4, 5, 4][i % 5];
    if (x + w > to + 0.1) break;
    const h = maxH - [0, 3, 1.5, 5, 2.5, 4][i % 6];
    const [fill, dark] = SPINE_COLORS[i % SPINE_COLORS.length];
    out.push(
      <g key={i}>
        <rect x={x} y={floor - h} width={w} height={h} rx="0.7" fill={fill} stroke={dark} strokeWidth="0.45" />
        <rect x={x + 0.7} y={floor - h + 2} width={w - 1.4} height="0.9" rx="0.4" fill={dark} opacity="0.55" />
        <rect x={x + 0.7} y={floor - 3.4} width={w - 1.4} height="0.9" rx="0.4" fill={dark} opacity="0.55" />
      </g>,
    );
    x += w + 0.35;
    i++;
  }
  return <g>{out}</g>;
}

function Bookshelf() {
  return (
    <g strokeLinejoin="round">
      {/* body */}
      <rect x="-35" y="-46" width="70" height="94.5" rx="2" fill="#c98b55" stroke="#9a5f33" strokeWidth="0.8" />
      <rect x="-37.5" y="-48.5" width="75" height="4.5" rx="1.6" fill="#dca06a" stroke="#9a5f33" strokeWidth="0.7" />
      <rect x="-32" y="-43" width="64" height="86" rx="1" fill="#8d5a34" />
      {/* boards */}
      {BOARDS.map((y) => (
        <g key={y}>
          <rect x="-32.5" y={y} width="65" height="3" rx="0.8" fill="#dca06a" stroke="#9a5f33" strokeWidth="0.5" />
          <rect x="-32" y={y - 1.2} width="64" height="1.2" fill="#6f4426" opacity="0.5" />
        </g>
      ))}
      <rect x="-35" y="46" width="70" height="2.5" rx="1" fill="#9a5f33" />
      {/* books on the shelves (gaps are left for the coloured books) */}
      <Spines from={-30.5} to={9} floor={BOARDS[0]} maxH={23} />
      <Spines from={-12} to={11} floor={BOARDS[1]} maxH={20} start={2} />
      <Spines from={-30.5} to={-4} floor={BOARDS[2]} maxH={20} start={1} />
      <Spines from={13.5} to={31} floor={BOARDS[2]} maxH={20} start={3} />
      {/* a leaning book */}
      <rect x="9.5" y={BOARDS[0] - 19} width="4" height="19" rx="0.7" fill="#bda8ee" stroke="#8f74c9" strokeWidth="0.45" transform={`rotate(14 13.5 ${BOARDS[0]})`} />
      {/* soft highlight on the side */}
      <rect x="-34" y="-44" width="1.4" height="90" rx="0.7" fill="#e8b585" opacity="0.8" />
    </g>
  );
}

function ArchedWindow() {
  return (
    <g strokeLinejoin="round">
      <path d="M -27 46 L -27 -21 A 27 27 0 0 1 27 -21 L 27 46 Z" fill="#ffffff" stroke="#e3c39c" strokeWidth="0.9" />
      <path d="M -23 42 L -23 -21 A 23 23 0 0 1 23 -21 L 23 42 Z" fill="#9fdcff" />
      <circle cx="10" cy="-27" r="6" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="-13" cy="-8" r="3.5" />
        <circle cx="-8.5" cy="-10" r="4.5" />
        <circle cx="-3.5" cy="-8" r="3.5" />
        <rect x="-13" y="-8" width="9.5" height="3.5" />
        <circle cx="12" cy="6" r="2.6" />
        <circle cx="15.5" cy="4.5" r="3.4" />
        <circle cx="19" cy="6" r="2.6" />
        <rect x="12" y="6" width="7" height="2.6" />
      </g>
      <path d="M -23 42 L -23 26 Q -9 16 4 24 Q 14 18 23 21 L 23 42 Z" fill="#7ed957" />
      <path d="M -23 42 L -23 34 Q -4 27 23 33 L 23 42 Z" fill="#5cc23f" />
      <rect x="-16.5" y="23" width="3" height="9" rx="1" fill="#8a4b2a" />
      <circle cx="-15" cy="20" r="6" fill="#4cbf4c" />
      <rect x="-1.2" y="-44" width="2.4" height="86" fill="#ffffff" />
      <rect x="-23" y="-3" width="46" height="2.4" fill="#ffffff" />
      <rect x="-23" y="20" width="46" height="2.4" fill="#ffffff" />
      <rect x="-31" y="42.5" width="62" height="5" rx="2" fill="#ffffff" stroke="#e3c39c" strokeWidth="0.7" />
    </g>
  );
}

function PendantLamp() {
  return (
    <g strokeLinejoin="round">
      <path d="M -22 12 L 22 12 L 40 48 L -40 48 Z" fill="#fff6a8" opacity="0.4" />
      <rect x="-1.5" y="-50" width="3" height="32" fill="#7a6a5a" />
      <rect x="-6" y="-22" width="12" height="6" rx="2" fill="#e0a800" />
      <path d="M -30 10 Q -30 -19 0 -19 Q 30 -19 30 10 Z" fill="#ffd23f" stroke="#e0a800" strokeWidth="2" />
      <path d="M -20 2 Q -19 -10 -6 -14" fill="none" stroke="#fff3b0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="14" r="7" fill="#fffbe0" stroke="#f2d36b" strokeWidth="1.5" />
      <rect x="-32" y="7" width="64" height="6" rx="3" fill="#ffb703" stroke="#e0a800" strokeWidth="1.2" />
    </g>
  );
}

function Rug() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="50" ry="17.5" fill="#ff9f80" stroke="#e07a5a" strokeWidth="0.6" />
      <ellipse cx="0" cy="0" rx="42" ry="14.5" fill="#ffd166" />
      <ellipse cx="0" cy="0" rx="33" ry="11.3" fill="#8fd9c8" />
      <ellipse cx="0" cy="0" rx="24" ry="8.2" fill="#b9b2ff" />
      <ellipse cx="0" cy="0" rx="14" ry="4.8" fill="#fff6e8" />
      <g fill="#e07a5a">
        {Array.from({ length: 18 }, (_, i) => {
          const a = (i / 18) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 16} r="0.9" />;
        })}
      </g>
    </g>
  );
}

function Beanbag() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="0" cy="42" rx="44" ry="5" fill="#000" opacity="0.12" />
      {/* a slouchy sack: the back is high on the left, the seat sinks in on the right */}
      <path
        d="M -44 34 Q -50 8 -38 -12 Q -28 -32 -12 -36 Q 4 -38 12 -26 Q 18 -14 32 -10 Q 48 -4 46 22 Q 46 42 0 44 Q -42 44 -44 34 Z"
        fill="#9b6dff"
        stroke="#6f45d6"
        strokeWidth="1.8"
      />
      <g fill="#c9b3ff">
        <circle cx="-34" cy="6" r="2.2" />
        <circle cx="-22" cy="-22" r="2.2" />
        <circle cx="-30" cy="28" r="2.2" />
        <circle cx="-8" cy="34" r="2.2" />
        <circle cx="18" cy="34" r="2.2" />
        <circle cx="38" cy="22" r="2.2" />
      </g>
      <path d="M -16 -4 Q 8 -14 36 -2 Q 34 12 10 15 Q -14 13 -16 -4 Z" fill="#7a4ee6" />
      <path d="M -18 -8 Q -14 -24 -2 -31" fill="none" stroke="#c9b3ff" strokeWidth="3" />
      <path d="M -32 20 Q 6 32 44 16" fill="none" stroke="#6f45d6" strokeWidth="1.5" />
      <path d="M -38 -6 Q -32 -22 -20 -30" fill="none" stroke="#e0d4ff" strokeWidth="3.2" opacity="0.9" />
    </g>
  );
}

function Background() {
  const stripes = [];
  for (let x = 40; x < 1600; x += 80) {
    stripes.push(<rect key={x} x={x} y="26" width="26" height="740" fill="#ffffff" opacity="0.22" />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="library-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffdcb8" />
          <stop offset="1" stopColor="#ffefdc" />
        </linearGradient>
        <linearGradient id="library-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9db5e2" />
          <stop offset="1" stopColor="#bcd0f2" />
        </linearGradient>
        <pattern id="library-carpet" width="70" height="50" patternUnits="userSpaceOnUse">
          <circle cx="18" cy="14" r="4" fill="#ffffff" opacity="0.18" />
          <circle cx="53" cy="39" r="4" fill="#ffffff" opacity="0.18" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height="780" fill="url(#library-wall)" />
      {stripes}
      <rect width="1600" height="26" fill="#e9a46a" />
      <rect y="26" width="1600" height="8" fill="#ffffff" opacity="0.7" />

      {/* carpet floor */}
      <rect y="780" width="1600" height="420" fill="url(#library-floor)" />
      <rect y="780" width="1600" height="420" fill="url(#library-carpet)" />
      <rect y="758" width="1600" height="24" fill="#ffffff" />
      <rect y="780" width="1600" height="5" fill="#8aa3d3" />

      {/* soft shadows */}
      <ellipse cx="270" cy="792" rx="250" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="800" cy="866" rx="260" ry="18" fill="#000" opacity="0.1" />
      <ellipse cx="1462" cy="792" rx="125" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="300" cy="1128" rx="250" ry="16" fill="#000" opacity="0.09" />
      <ellipse cx="755" cy="1108" rx="80" ry="12" fill="#000" opacity="0.1" />

      {/* little wall shelf for the clock */}
      <rect x="588" y="282" width="124" height="14" rx="5" fill="#dca06a" stroke="#9a5f33" strokeWidth="3" />
      <path d="M604 296 L620 318 L636 296 Z M664 296 L680 318 L696 296 Z" fill="#b97a45" />

      {/* lamp cord from the ceiling */}
      <rect x="927" y="26" width="6" height="50" fill="#7a6a5a" />

      {/* peg for the headphones */}
      <rect x="1440" y="150" width="60" height="20" rx="8" fill="#dca06a" stroke="#9a5f33" strokeWidth="3" />
      <circle cx="1470" cy="168" r="9" fill="#b97a45" />

      {/* low cupboard on the right, with the globe stand */}
      <rect x="1352" y="612" width="222" height="172" rx="12" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="5" />
      <line x1="1463" y1="622" x2="1463" y2="774" stroke="#4fb3a0" strokeWidth="4" />
      <circle cx="1446" cy="700" r="7" fill="#ffffff" />
      <circle cx="1480" cy="700" r="7" fill="#ffffff" />
      <rect x="1342" y="600" width="242" height="18" rx="7" fill="#b5ece0" stroke="#4fb3a0" strokeWidth="4" />
      <ellipse cx="1455" cy="597" rx="42" ry="9" fill="#b97a45" stroke="#8a5530" strokeWidth="3" />
      <rect x="1449" y="574" width="12" height="22" rx="4" fill="#c9a227" stroke="#a07f12" strokeWidth="2" />
      <path d="M1455 452 A 70 70 0 0 0 1455 592" fill="none" stroke="#c9a227" strokeWidth="9" strokeLinecap="round" />
      <circle cx="1455" cy="452" r="7" fill="#c9a227" />

      {/* children's reading table */}
      <rect x="95" y="990" width="20" height="135" rx="6" fill="#4fb3a0" />
      <rect x="485" y="990" width="20" height="135" rx="6" fill="#4fb3a0" />
      <rect x="60" y="972" width="480" height="26" rx="10" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="5" />
      <rect x="90" y="998" width="420" height="16" rx="6" fill="#6cc7b2" />
    </g>
  );
}

// The librarian's desk is drawn in front of the librarian.
function Desk() {
  return (
    <g strokeLinejoin="round">
      <rect x="560" y="694" width="480" height="166" rx="14" fill="#e0a46a" stroke="#b8773f" strokeWidth="5" />
      <rect x="600" y="724" width="180" height="104" rx="10" fill="#eab37e" stroke="#b8773f" strokeWidth="3" />
      <rect x="820" y="724" width="180" height="104" rx="10" fill="#eab37e" stroke="#b8773f" strokeWidth="3" />
      <circle cx="690" cy="776" r="8" fill="#fff3d6" stroke="#b8773f" strokeWidth="2" />
      <circle cx="910" cy="776" r="8" fill="#fff3d6" stroke="#b8773f" strokeWidth="2" />
      <rect x="545" y="680" width="510" height="26" rx="9" fill="#f2c08c" stroke="#b8773f" strokeWidth="4" />
    </g>
  );
}

const scene = {
  id: 'library',
  title: 'Library',
  titleId: 'Perpustakaan',
  icon: '📚',
  Background,
  Foreground: Desk,
  hideBehind: ['📚', '📦', '🧺', '🎒'],
  objects: [
    // the tall bookshelf and what is on it
    {
      id: 'bookshelf', word: 'bookshelf', wordId: 'rak buku', art: Bookshelf, x: SHELF.x, y: SHELF.y, size: SHELF.size, hit: { w: 450, h: 615, dy: 5 },
      sentence: 'The bookshelf is full of books.', sentenceId: 'Rak bukunya penuh buku.',
      question: 'Is the bookshelf tall or short?', questionId: 'Rak bukunya tinggi atau pendek?',
      answer: 'The bookshelf is tall.', answerId: 'Rak bukunya tinggi.',
    },
    {
      id: 'red-book', word: 'red book', wordId: 'buku merah', emoji: '📕', x: 392, y: onBoard(0, 125), size: 125,
      sentence: 'I pick the red book.', sentenceId: 'Aku pilih buku merah.',
      question: 'Do you like red?', questionId: 'Kamu suka warna merah?',
      answer: 'Yes, I like red.', answerId: 'Ya, aku suka merah.',
    },
    {
      id: 'green-book', word: 'green book', wordId: 'buku hijau', emoji: '📗', x: 140, y: onBoard(1, 120), size: 120,
      sentence: 'This book is green like grass.', sentenceId: 'Buku ini hijau seperti rumput.',
      question: 'What else is green?', questionId: 'Apa lagi yang hijau?',
      answer: 'The plant is green!', answerId: 'Tanamannya hijau!',
    },
    {
      id: 'blue-book', word: 'blue book', wordId: 'buku biru', emoji: '📘', x: 400, y: onBoard(1, 120), size: 120,
      sentence: 'This book is blue like the sky.', sentenceId: 'Buku ini biru seperti langit.',
      question: 'Can you see the blue sky?', questionId: 'Bisa lihat langit biru?',
      answer: 'Yes, the sky is blue.', answerId: 'Ya, langitnya biru.',
    },
    {
      id: 'orange-book', word: 'orange book', wordId: 'buku oranye', emoji: '📙', x: 300, y: onBoard(2, 120), size: 120,
      sentence: 'The orange book is on the bottom shelf.', sentenceId: 'Buku oranye ada di rak paling bawah.',
      question: 'Is the book orange or purple?', questionId: 'Bukunya oranye atau ungu?',
      answer: 'The book is orange.', answerId: 'Bukunya oranye.',
    },
    {
      id: 'owl', word: 'owl', wordId: 'burung hantu', emoji: '🦉', x: 140, y: 122, size: 120,
      sentence: 'The owl says hoo, hoo!', sentenceId: 'Burung hantu bilang huu, huu!',
      question: 'Can you hoot like an owl?', questionId: 'Bisa bersuara seperti burung hantu?',
      answer: 'Hoo, hoo!', answerId: 'Huu, huu!',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 395, y: 118, size: 128,
      sentence: 'The plant sits on the bookshelf.', sentenceId: 'Tanamannya ada di atas rak buku.',
      question: 'Can you water the plant?', questionId: 'Bisa menyiram tanamannya?',
      answer: 'Yes, I can water it.', answerId: 'Ya, aku bisa menyiramnya.',
    },

    // the wall
    {
      id: 'clock', word: 'clock', wordId: 'jam', emoji: '🕰️', x: 650, y: 230, size: 120,
      sentence: 'The clock goes tick, tock.', sentenceId: 'Jamnya berbunyi tik, tok.',
      question: 'Can you say tick, tock?', questionId: 'Bisa bilang tik, tok?',
      answer: 'Tick, tock, tick, tock!', answerId: 'Tik, tok, tik, tok!',
    },
    {
      id: 'lamp', word: 'lamp', wordId: 'lampu', art: PendantLamp, x: 930, y: 170, size: 200, hit: { w: 160, h: 130, dy: -10 },
      sentence: 'The lamp is warm and bright.', sentenceId: 'Lampunya hangat dan terang.',
      question: 'Is the lamp on or off?', questionId: 'Lampunya nyala atau mati?',
      answer: 'The lamp is on.', answerId: 'Lampunya nyala.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: ArchedWindow, x: 1185, y: 355, size: 480, hit: { w: 260, h: 450 },
      sentence: 'I read by the sunny window.', sentenceId: 'Aku membaca di dekat jendela yang cerah.',
      question: 'Is it sunny or rainy?', questionId: 'Cuacanya cerah atau hujan?',
      answer: 'It is sunny.', answerId: 'Cuacanya cerah.',
    },
    {
      id: 'headphones', word: 'headphones', wordId: 'headphone', emoji: '🎧', x: 1470, y: 222, size: 115,
      sentence: 'I listen to a story with headphones.', sentenceId: 'Aku mendengarkan cerita pakai headphone.',
      question: 'Can you listen quietly?', questionId: 'Bisa mendengarkan dengan tenang?',
      answer: 'Yes, I can listen quietly.', answerId: 'Ya, aku bisa mendengarkan dengan tenang.',
    },
    {
      id: 'globe', word: 'globe', wordId: 'bola dunia', emoji: '🌍', x: 1455, y: 522, size: 130,
      sentence: 'The globe shows land and sea.', sentenceId: 'Bola dunia menunjukkan daratan dan laut.',
      question: 'Is the sea blue or red?', questionId: 'Lautnya biru atau merah?',
      answer: 'The sea is blue.', answerId: 'Lautnya biru.',
    },

    // the librarian's desk
    {
      id: 'librarian', word: 'librarian', wordId: 'pustakawan', emoji: '🙋‍♀️', x: 815, y: 585, size: 270,
      sentence: 'The librarian helps us find books.', sentenceId: 'Pustakawan membantu kita mencari buku.',
      question: 'Can you say shh very softly?', questionId: 'Bisa bilang sst pelan-pelan?',
      answer: 'Shh! We read quietly.', answerId: 'Sst! Kita membaca dengan tenang.',
    },
    {
      id: 'computer', word: 'computer', wordId: 'komputer', emoji: '💻', x: 642, y: 627, size: 130,
      sentence: 'The librarian types on the computer.', sentenceId: 'Pustakawan mengetik di komputer.',
      question: 'Can you type tap, tap, tap?', questionId: 'Bisa mengetik tak, tak, tak?',
      answer: 'Tap, tap, tap!', answerId: 'Tak, tak, tak!',
    },
    {
      id: 'glasses', word: 'glasses', wordId: 'kacamata', emoji: '👓', x: 985, y: 666, size: 100,
      sentence: 'Glasses help us read.', sentenceId: 'Kacamata membantu kita membaca.',
      question: 'Are the glasses blue?', questionId: 'Apakah kacamatanya biru?',
      answer: 'Yes, the glasses are blue.', answerId: 'Ya, kacamatanya biru.',
    },

    // the reading table
    {
      id: 'notebook', word: 'notebook', wordId: 'buku tulis', emoji: '📒', x: 160, y: 928, size: 105,
      sentence: 'I draw pictures in my notebook.', sentenceId: 'Aku menggambar di buku tulisku.',
      question: 'Is the notebook yellow?', questionId: 'Apakah buku tulisnya kuning?',
      answer: 'Yes, it is yellow.', answerId: 'Ya, warnanya kuning.',
    },
    {
      id: 'pencil', word: 'pencil', wordId: 'pensil', emoji: '✏️', x: 300, y: 955, size: 110, rotate: 45,
      sentence: 'I write my name with a pencil.', sentenceId: 'Aku menulis namaku dengan pensil.',
      question: 'Can you hold a pencil?', questionId: 'Bisa memegang pensil?',
      answer: 'Yes, I can hold it.', answerId: 'Ya, aku bisa memegangnya.',
    },
    {
      id: 'magnifier', word: 'magnifying glass', wordId: 'kaca pembesar', emoji: '🔍', x: 440, y: 928, size: 105,
      sentence: 'It makes small things look big!', sentenceId: 'Benda kecil jadi kelihatan besar!',
      question: 'Can you look at your finger?', questionId: 'Bisa lihat jarimu?',
      answer: 'Wow, my finger looks big!', answerId: 'Wah, jariku kelihatan besar!',
    },

    // the reading corner
    {
      id: 'rug', word: 'rug', wordId: 'karpet', art: Rug, x: 1150, y: 1040, size: 600, hit: { w: 600, h: 210 },
      sentence: 'We sit on the rug for stories.', sentenceId: 'Kita duduk di karpet untuk dengar cerita.',
      question: 'Can you sit criss-cross?', questionId: 'Bisa duduk bersila?',
      answer: 'Yes, I can sit criss-cross.', answerId: 'Ya, aku bisa duduk bersila.',
    },
    {
      id: 'cat', word: 'cat', wordId: 'kucing', emoji: '🐈', x: 755, y: 1042, size: 150,
      sentence: 'The cat says meow very softly.', sentenceId: 'Kucingnya mengeong pelan sekali.',
      question: 'Can you say meow quietly?', questionId: 'Bisa bilang meong pelan-pelan?',
      answer: 'Meow, meow.', answerId: 'Meong, meong.',
    },
    {
      id: 'open-book', word: 'open book', wordId: 'buku terbuka', emoji: '📖', x: 985, y: 1058, size: 125,
      sentence: 'I turn the pages one by one.', sentenceId: 'Aku membalik halamannya satu per satu.',
      question: 'Do you like story books?', questionId: 'Kamu suka buku cerita?',
      answer: 'Yes, I love story books.', answerId: 'Ya, aku suka sekali buku cerita.',
    },
    {
      id: 'dinosaur', word: 'dinosaur', wordId: 'dinosaurus', emoji: '🦕', x: 1285, y: 1048, size: 135,
      sentence: 'The dinosaur has a long neck.', sentenceId: 'Leher dinosaurus itu panjang.',
      question: 'Can you roar very quietly?', questionId: 'Bisa mengaum pelan-pelan?',
      answer: 'Rawr! A quiet roar.', answerId: 'Rawr! Auman yang pelan.',
    },
    {
      id: 'beanbag', word: 'beanbag', wordId: 'bean bag', art: Beanbag, x: 1462, y: 935, size: 260, hit: { w: 230, h: 150, dy: 28 },
      sentence: 'The beanbag is soft and squishy.', sentenceId: 'Bean bag-nya empuk sekali.',
      question: 'Is it soft or hard?', questionId: 'Empuk atau keras?',
      answer: 'It is soft.', answerId: 'Empuk.',
    },
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 1482, y: 890, size: 125,
      sentence: 'The teddy bear sits on the beanbag.', sentenceId: 'Boneka beruang duduk di bean bag.',
      question: 'Can you give teddy a hug?', questionId: 'Bisa peluk boneka beruangnya?',
      answer: 'Yes, a big hug!', answerId: 'Ya, peluk erat!',
    },
  ],
};

export default scene;

// Garden scene: a family back garden. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// Layout: sky and a picket fence at the back, a big tree on the left, flower beds along
// the fence, a vegetable patch bottom-left, a sandy path in the middle, a pond bottom-right.

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity="0.92">
      <ellipse cx="0" cy="0" rx="70" ry="34" />
      <circle cx="-30" cy="-18" r="30" />
      <circle cx="18" cy="-28" r="38" />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M -50 0 Q -10 -34 50 0 Q -10 34 -50 0 Z" fill="#5cbf4a" stroke="#3a8f30" strokeWidth="4" />
      <path d="M -44 0 Q 0 -4 44 0" fill="none" stroke="#3a8f30" strokeWidth="3" />
    </g>
  );
}

function Background() {
  const pickets = [];
  for (let x = -16; x < 1600; x += 62) {
    pickets.push(
      <path
        key={x}
        d={`M${x} 484 L${x + 22} 458 L${x + 44} 484 L${x + 44} 672 L${x} 672 Z`}
        fill="#fffaf0"
        stroke="#e2cba6"
        strokeWidth="4"
        strokeLinejoin="round"
      />,
    );
  }
  let hedge = 'M0 490';
  for (let x = 0; x < 1600; x += 100) hedge += ` Q${x + 50} ${418 + ((x / 100) % 3) * 12} ${x + 100} 490`;
  hedge += ' L1600 700 L0 700 Z';
  const stripes = [];
  for (let i = 0; i < 7; i++) stripes.push(<rect key={i} y={668 + i * 80} width="1600" height="40" fill="#ffffff" opacity="0.07" />);
  const tufts = [[40, 760], [600, 780], [1080, 700], [1560, 880], [560, 1180], [1040, 1170], [1580, 1170], [20, 1175]];
  const rows = [880, 965, 1050];
  const edging = [];
  for (let x = 482; x <= 842; x += 30) edging.push(<ellipse key={`a${x}`} cx={x} cy={706} rx="16" ry="9" fill="#d9dee3" stroke="#b5bec8" strokeWidth="3" />);
  for (let x = 1112; x <= 1352; x += 30) edging.push(<ellipse key={`b${x}`} cx={x} cy={706} rx="16" ry="9" fill="#d9dee3" stroke="#b5bec8" strokeWidth="3" />);
  return (
    <g>
      <defs>
        <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd0ff" />
          <stop offset="1" stopColor="#d8f2ff" />
        </linearGradient>
        <linearGradient id="garden-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ddb6a" />
          <stop offset="1" stopColor="#6cc24f" />
        </linearGradient>
        <linearGradient id="garden-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f5d3b" />
          <stop offset="1" stopColor="#7a4b2e" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1600" height="700" fill="url(#garden-sky)" />
      <Cloud x={700} y={105} s={0.75} />
      <Cloud x={1210} y={175} s={0.6} />

      {/* far hills and the hedge behind the fence */}
      <path d="M0 430 Q 260 340 560 410 Q 860 330 1160 400 Q 1400 350 1600 400 L1600 700 L0 700 Z" fill="#c4ecb0" />
      <path d={hedge} fill="#7fcf66" />

      {/* picket fence */}
      <rect x="0" y="515" width="1600" height="18" fill="#f3e2c4" stroke="#e2cba6" strokeWidth="3" />
      <rect x="0" y="615" width="1600" height="18" fill="#f3e2c4" stroke="#e2cba6" strokeWidth="3" />
      {pickets}

      {/* lawn */}
      <path d="M0 668 Q 400 652 800 666 Q 1200 680 1600 660 L1600 1200 L0 1200 Z" fill="url(#garden-grass)" />
      {stripes}

      {/* flower beds along the fence */}
      <path d="M 466 708 Q 466 664 510 662 L 812 662 Q 858 664 858 708 Z" fill="url(#garden-soil)" />
      <path d="M 1096 708 Q 1096 664 1140 662 L 1326 662 Q 1368 664 1368 708 Z" fill="url(#garden-soil)" />
      {edging}

      {/* shadows */}
      <ellipse cx="255" cy="664" rx="150" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="1010" cy="922" rx="130" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="1450" cy="815" rx="80" ry="12" fill="#000" opacity="0.1" />
      <ellipse cx="1265" cy="840" rx="65" ry="10" fill="#000" opacity="0.1" />

      {/* birdhouse pole */}
      <ellipse cx="930" cy="672" rx="40" ry="8" fill="#000" opacity="0.12" />
      <rect x="921" y="400" width="18" height="272" rx="6" fill="#b07a4a" stroke="#8a5a32" strokeWidth="3" />

      {/* sandy path */}
      <path d="M 760 1200 Q 790 1010 850 900 Q 900 800 905 690 L 955 690 Q 966 810 930 910 Q 880 1030 900 1200 Z" fill="#f1dcae" />
      <path d="M 790 1150 L 812 1146 M 860 1010 L 878 1006 M 900 860 L 914 857" stroke="#d9bf8a" strokeWidth="5" strokeLinecap="round" />

      {/* vegetable patch (raised bed) */}
      <ellipse cx="310" cy="1140" rx="290" ry="20" fill="#000" opacity="0.1" />
      <rect x="40" y="790" width="540" height="340" rx="18" fill="#d39457" stroke="#a5682f" strokeWidth="6" />
      <rect x="62" y="810" width="496" height="300" rx="12" fill="url(#garden-soil)" />
      {rows.map((y) => (
        <path key={y} d={`M 78 ${y} Q 310 ${y - 16} 542 ${y}`} fill="none" stroke="#6b4128" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
      ))}
      {/* tomato plant */}
      <path d="M 340 972 Q 324 900 336 800" stroke="#3f9a35" strokeWidth="10" fill="none" strokeLinecap="round" />
      <Leaf x={306} y={820} rotate={-35} s={0.5} />
      <Leaf x={368} y={812} rotate={215} s={0.5} />
      <Leaf x={296} y={938} rotate={-15} s={0.5} />
      <Leaf x={380} y={944} rotate={195} s={0.5} />
      {/* a little hole where the carrot came out */}
      <ellipse cx="128" cy="935" rx="34" ry="10" fill="#5e3a22" />

      {/* leaves for the ladybug and the caterpillar */}
      <Leaf x={790} y={768} rotate={-8} s={0.9} />
      <Leaf x={690} y={1150} rotate={6} s={1.1} />

      {/* grass tufts */}
      {tufts.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y} l8 -26 l6 26 l8 -20 l4 20 Z`} fill="#4fae3a" />
      ))}
    </g>
  );
}

function Tree() {
  const blobs = [
    [-24, -12, 22],
    [24, -12, 22],
    [-15, -31, 19],
    [15, -31, 19],
    [0, -20, 26],
    [0, -38, 13],
  ];
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -9 48 Q -6 30 -6 4 L 6 4 Q 6 30 9 48 Q 0 50 -9 48 Z" fill="#a8693c" stroke="#7a4a26" strokeWidth="1.4" />
      <path d="M -9 47 Q -14 46 -17 48.5 M 9 47 Q 14 46 17 48.5" stroke="#7a4a26" strokeWidth="2" fill="none" />
      <path d="M -2 18 Q 0 30 -1.5 42" stroke="#c98a5a" strokeWidth="1.5" fill="none" />
      {blobs.map(([x, y, r]) => (
        <circle key={`o${x}${y}`} cx={x} cy={y} r={r} fill="#4fb34a" stroke="#2f8a35" strokeWidth="1.8" />
      ))}
      {blobs.map(([x, y, r]) => (
        <circle key={`i${x}${y}`} cx={x} cy={y} r={r - 0.9} fill="#5cc45a" />
      ))}
      <g fill="#8fe07a" opacity="0.75">
        <circle cx="-30" cy="-18" r="6" />
        <circle cx="-20" cy="-38" r="5" />
        <circle cx="-4" cy="-44" r="4" />
        <circle cx="10" cy="-36" r="5" />
        <circle cx="20" cy="-16" r="5" />
      </g>
    </g>
  );
}

function Birdhouse() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-5" y="26" width="10" height="24" fill="#b07a4a" stroke="#8a5a32" strokeWidth="1.5" />
      <rect x="-30" y="-16" width="60" height="42" rx="3" fill="#7cc6fe" stroke="#3f8fd0" strokeWidth="2" />
      <line x1="-10" y1="-14" x2="-10" y2="24" stroke="#62b2f0" strokeWidth="1.4" />
      <line x1="10" y1="-14" x2="10" y2="24" stroke="#62b2f0" strokeWidth="1.4" />
      <circle cx="0" cy="2" r="9" fill="#3b2a20" stroke="#3f8fd0" strokeWidth="1.5" />
      <rect x="-9" y="15" width="18" height="4" rx="2" fill="#b07a4a" stroke="#8a5a32" strokeWidth="1" />
      <path d="M -40 -12 L 0 -44 L 40 -12 Z" fill="#ff6b6b" stroke="#d94848" strokeWidth="2.5" />
      <path d="M -29 -15.5 L 0 -38 L 29 -15.5" fill="none" stroke="#ff9a9a" strokeWidth="2" />
      <rect x="-34" y="24" width="68" height="6" rx="3" fill="#ffd27a" stroke="#d9a040" strokeWidth="1.5" />
    </g>
  );
}

function WateringCan() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="-2" cy="40" rx="32" ry="4" fill="#000" opacity="0.1" />
      <path d="M 18 18 L 42 -22 L 48 -17 L 24 26 Z" fill="#4fb3e8" stroke="#2a86bf" strokeWidth="2.5" />
      <ellipse cx="46" cy="-22" rx="5" ry="8.5" transform="rotate(35 46 -22)" fill="#2a86bf" />
      <path d="M -26 -16 L 22 -16 L 26 34 Q 26 38 22 38 L -26 38 Q -30 38 -30 34 Z" fill="#4fb3e8" stroke="#2a86bf" strokeWidth="2.5" />
      <ellipse cx="-2" cy="-16" rx="24" ry="5" fill="#7fd0f7" stroke="#2a86bf" strokeWidth="2.5" />
      <path d="M -16 -19 Q -16 -44 2 -43 Q 18 -42 14 -19" fill="none" stroke="#2a86bf" strokeWidth="6" />
      <rect x="-20" y="-6" width="6" height="36" rx="3" fill="#a9e2ff" opacity="0.85" />
    </g>
  );
}

function Wheelbarrow() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M 18 8 L 48 -4" stroke="#b07a4a" strokeWidth="5" fill="none" />
      <path d="M 42 -1.5 L 50 -5" stroke="#4a4f5c" strokeWidth="7" fill="none" />
      <path d="M 20 10 L 26 40 M 20 40 L 32 40" stroke="#8d9ca8" strokeWidth="4" fill="none" />
      <path d="M -30 28 L 22 10" stroke="#8d9ca8" strokeWidth="4" fill="none" />
      <path d="M -40 -18 Q -18 -34 2 -24 Q 20 -32 34 -18 Z" fill="#8a5a3a" stroke="#6b4329" strokeWidth="1.5" />
      <path d="M -44 -16 L 36 -16 L 24 16 L -30 16 Z" fill="#ff7a59" stroke="#d9502f" strokeWidth="2.5" />
      <path d="M -36 -7 L 30 -7" stroke="#ffa48a" strokeWidth="3" fill="none" />
      <rect x="-48" y="-21" width="88" height="7" rx="3.5" fill="#ff9a7f" stroke="#d9502f" strokeWidth="2" />
      <circle cx="-30" cy="30" r="13" fill="#4a4f5c" stroke="#33363f" strokeWidth="2" />
      <circle cx="-30" cy="30" r="5" fill="#c9d3da" />
    </g>
  );
}

function LilyPad({ x, y, r }) {
  const c = r * 0.956;
  const s = r * 0.292;
  return (
    <g transform={`translate(${x} ${y}) scale(1 0.45)`}>
      <path d={`M 0 0 L ${c} ${-s} A ${r} ${r} 0 1 0 ${c} ${s} Z`} fill="#4cb84a" stroke="#2f8a35" strokeWidth="1.2" strokeLinejoin="round" />
    </g>
  );
}

function Pond() {
  const stones = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    stones.push(
      <ellipse
        key={i}
        cx={Math.cos(a) * 46}
        cy={Math.sin(a) * 17.5}
        rx="5.5"
        ry="3.2"
        fill={i % 2 ? '#d3dbe1' : '#bcc7cf'}
        stroke="#8d9ca8"
        strokeWidth="0.8"
      />,
    );
  }
  return (
    <g>
      <ellipse cx="0" cy="1" rx="48" ry="19" fill="#9fb0bc" />
      <ellipse cx="0" cy="0" rx="45" ry="16.5" fill="#4fb8ec" />
      <ellipse cx="-4" cy="-3" rx="36" ry="11" fill="#7fd0f7" />
      <ellipse cx="14" cy="4" rx="8" ry="2.4" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
      <ellipse cx="14" cy="4" rx="13" ry="4" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="-30" cy="-6" rx="5" ry="1.5" fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.7" />
      <LilyPad x={-14} y={3} r={9} />
      <LilyPad x={24} y={-5} r={6} />
      <LilyPad x={2} y={9} r={5} />
      {stones}
    </g>
  );
}

const garden = {
  id: 'garden',
  title: 'Garden',
  titleId: 'Kebun',
  icon: '🌷',
  Background,
  hideBehind: ['🌿', '🪨', '🪵', '🍃'],
  objects: [
    // the big tree on the left
    {
      id: 'tree', word: 'tree', wordId: 'pohon', art: Tree, x: 255, y: 400, size: 540, hit: { w: 460, h: 540, dy: -10 },
      sentence: 'The tree is big and green.', sentenceId: 'Pohonnya besar dan hijau.',
      question: 'Can you stand tall like a tree?', questionId: 'Bisa berdiri tegak seperti pohon?',
      answer: 'Yes, I am a tall tree!', answerId: 'Ya, aku pohon yang tinggi!',
    },
    {
      id: 'nest', word: 'nest', wordId: 'sarang', emoji: '🪺', x: 370, y: 330, size: 110,
      sentence: 'There are eggs in the nest.', sentenceId: 'Ada telur di dalam sarang.',
      question: 'What color are the eggs?', questionId: 'Telurnya warna apa?',
      answer: 'The eggs are blue.', answerId: 'Telurnya biru.',
    },
    {
      id: 'mushroom', word: 'mushroom', wordId: 'jamur', emoji: '🍄', x: 385, y: 690, size: 90,
      sentence: 'The mushroom looks like an umbrella.', sentenceId: 'Jamurnya mirip payung.',
      question: 'What color is the mushroom?', questionId: 'Jamurnya warna apa?',
      answer: 'The mushroom is red.', answerId: 'Jamurnya merah.',
    },

    // the sky
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '☀️', x: 1460, y: 130, size: 160,
      sentence: 'The sun helps the flowers grow.', sentenceId: 'Matahari membantu bunga tumbuh.',
      question: 'Is it hot or cold today?', questionId: 'Hari ini panas atau dingin?',
      answer: 'It is hot today.', answerId: 'Hari ini panas.',
    },
    {
      id: 'butterfly', word: 'butterfly', wordId: 'kupu-kupu', emoji: '🦋', x: 640, y: 290, size: 110,
      sentence: 'The butterfly has pretty wings.', sentenceId: 'Kupu-kupu punya sayap yang cantik.',
      question: 'Can you flap like a butterfly?', questionId: 'Bisa mengepakkan tangan seperti kupu-kupu?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'bee', word: 'bee', wordId: 'lebah', emoji: '🐝', x: 1100, y: 330, size: 95,
      sentence: 'The bee says buzz!', sentenceId: 'Lebah berbunyi bzzz!',
      question: 'Can you buzz like a bee?', questionId: 'Bisa berdengung seperti lebah?',
      answer: 'Buzz, buzz, buzz!', answerId: 'Bzzz, bzzz, bzzz!',
    },
    {
      id: 'birdhouse', word: 'birdhouse', wordId: 'rumah burung', art: Birdhouse, x: 930, y: 330, size: 180,
      sentence: 'The birdhouse is a home for birds.', sentenceId: 'Rumah burung itu tempat tinggal burung.',
      question: 'What color is the roof?', questionId: 'Atapnya warna apa?',
      answer: 'The roof is red.', answerId: 'Atapnya merah.',
    },
    {
      id: 'bird', word: 'bird', wordId: 'burung', emoji: '🐦', x: 930, y: 222, size: 100,
      sentence: 'The bird says tweet, tweet!', sentenceId: 'Burung berbunyi cuit, cuit!',
      question: 'Can you sing like a bird?', questionId: 'Bisa bernyanyi seperti burung?',
      answer: 'Tweet, tweet, tweet!', answerId: 'Cuit, cuit, cuit!',
    },

    // flower beds along the fence
    {
      id: 'tulip', word: 'tulip', wordId: 'bunga tulip', emoji: '🌷', x: 560, y: 618, size: 125,
      sentence: 'The tulip is pink.', sentenceId: 'Bunga tulipnya warna pink.',
      question: 'Do you like pink flowers?', questionId: 'Kamu suka bunga warna pink?',
      answer: 'Yes, I like pink flowers.', answerId: 'Ya, aku suka bunga pink.',
    },
    {
      id: 'rose', word: 'rose', wordId: 'bunga mawar', emoji: '🌹', x: 690, y: 618, size: 125,
      sentence: 'The rose smells sweet.', sentenceId: 'Bunga mawarnya wangi.',
      question: 'Can you smell the rose?', questionId: 'Bisa cium bunga mawarnya?',
      answer: 'Sniff, sniff! It smells nice.', answerId: 'Hmm! Wangi sekali.',
    },
    {
      id: 'ladybug', word: 'ladybug', wordId: 'kepik', emoji: '🐞', x: 790, y: 752, size: 85,
      sentence: 'The ladybug has black spots.', sentenceId: 'Kepik punya bintik hitam.',
      question: 'Is the ladybug big or small?', questionId: 'Kepiknya besar atau kecil?',
      answer: 'The ladybug is small.', answerId: 'Kepiknya kecil.',
    },
    {
      id: 'sunflower', word: 'sunflower', wordId: 'bunga matahari', emoji: '🌻', x: 1230, y: 575, size: 240,
      sentence: 'The sunflower looks at the sun.', sentenceId: 'Bunga matahari melihat ke arah matahari.',
      question: 'What color is the sunflower?', questionId: 'Bunga mataharinya warna apa?',
      answer: 'The sunflower is yellow.', answerId: 'Bunga mataharinya kuning.',
    },

    // the lawn
    {
      id: 'rabbit', word: 'rabbit', wordId: 'kelinci', emoji: '🐇', x: 1265, y: 785, size: 140,
      sentence: 'The rabbit has long ears.', sentenceId: 'Kelinci punya telinga panjang.',
      question: 'Does the rabbit like carrots?', questionId: 'Apakah kelinci suka wortel?',
      answer: 'Yes, it loves carrots!', answerId: 'Ya, dia suka sekali wortel!',
    },
    {
      id: 'cat', word: 'cat', wordId: 'kucing', emoji: '🐈', x: 1450, y: 750, size: 165,
      sentence: 'The cat plays in the garden.', sentenceId: 'Kucingnya bermain di kebun.',
      question: 'Can you say meow?', questionId: 'Bisa bilang meong?',
      answer: 'Meow, meow!', answerId: 'Meong, meong!',
    },
    {
      id: 'wheelbarrow', word: 'wheelbarrow', wordId: 'gerobak dorong', art: Wheelbarrow, x: 1010, y: 835, size: 240, hit: { w: 230, h: 170, dy: 5 },
      sentence: 'The wheelbarrow has one wheel.', sentenceId: 'Gerobak dorong punya satu roda.',
      question: 'Can you push the wheelbarrow?', questionId: 'Bisa mendorong gerobaknya?',
      answer: 'Yes, I can push it!', answerId: 'Ya, aku bisa mendorongnya!',
    },
    {
      id: 'watering-can', word: 'watering can', wordId: 'penyiram tanaman', art: WateringCan, x: 690, y: 960, size: 150,
      sentence: 'I water the flowers.', sentenceId: 'Aku menyiram bunga.',
      question: 'Do flowers need water?', questionId: 'Apakah bunga butuh air?',
      answer: 'Yes, flowers need water.', answerId: 'Ya, bunga butuh air.',
    },
    {
      id: 'caterpillar', word: 'caterpillar', wordId: 'ulat', emoji: '🐛', x: 690, y: 1128, size: 100,
      sentence: 'The caterpillar eats green leaves.', sentenceId: 'Ulat makan daun hijau.',
      question: 'Can you crawl like a caterpillar?', questionId: 'Bisa merangkak seperti ulat?',
      answer: 'Yes, I can crawl!', answerId: 'Ya, aku bisa merangkak!',
    },

    // the pond
    {
      id: 'pond', word: 'pond', wordId: 'kolam', art: Pond, x: 1290, y: 1030, size: 530, hit: { w: 520, h: 210 },
      sentence: 'The pond is full of water.', sentenceId: 'Kolamnya penuh air.',
      question: 'Can you see the frog?', questionId: 'Bisa lihat kataknya?',
      answer: 'Yes, I can see the frog!', answerId: 'Ya, aku bisa lihat kataknya!',
    },
    {
      id: 'frog', word: 'frog', wordId: 'katak', emoji: '🐸', x: 1216, y: 1022, size: 110,
      sentence: 'The frog says ribbit!', sentenceId: 'Katak berbunyi kwok-kwok!',
      question: 'Can you jump like a frog?', questionId: 'Bisa melompat seperti katak?',
      answer: 'Jump, jump, ribbit!', answerId: 'Lompat, lompat, kwok!',
    },

    // the vegetable patch
    {
      id: 'carrot', word: 'carrot', wordId: 'wortel', emoji: '🥕', x: 150, y: 880, size: 115, rotate: -40,
      sentence: 'Pull, pull! Out comes the carrot!', sentenceId: 'Tarik, tarik! Wortelnya keluar!',
      question: 'What color is the carrot?', questionId: 'Wortelnya warna apa?',
      answer: 'The carrot is orange.', answerId: 'Wortelnya oranye.',
    },
    {
      id: 'tomato', word: 'tomato', wordId: 'tomat', emoji: '🍅', x: 335, y: 885, size: 100,
      sentence: 'The tomato is red and round.', sentenceId: 'Tomatnya merah dan bulat.',
      question: 'Do you like tomatoes?', questionId: 'Kamu suka tomat?',
      answer: 'Yes, I like tomatoes.', answerId: 'Ya, aku suka tomat.',
    },
    {
      id: 'sprout', word: 'sprout', wordId: 'tunas', emoji: '🌱', x: 490, y: 895, size: 95,
      sentence: 'A little sprout is growing.', sentenceId: 'Tunas kecil sedang tumbuh.',
      question: 'Is the sprout big or small?', questionId: 'Tunasnya besar atau kecil?',
      answer: 'The sprout is small.', answerId: 'Tunasnya kecil.',
    },
    {
      id: 'worm', word: 'worm', wordId: 'cacing', emoji: '🪱', x: 250, y: 1050, size: 95,
      sentence: 'The worm wiggles in the soil.', sentenceId: 'Cacingnya menggeliat di tanah.',
      question: 'Can you wiggle like a worm?', questionId: 'Bisa menggeliat seperti cacing?',
      answer: 'Wiggle, wiggle, wiggle!', answerId: 'Goyang, goyang, goyang!',
    },
    {
      id: 'snail', word: 'snail', wordId: 'siput', emoji: '🐌', x: 465, y: 1050, size: 95,
      sentence: 'The snail is very slow.', sentenceId: 'Siputnya lambat sekali.',
      question: 'Can you walk slowly like a snail?', questionId: 'Bisa jalan pelan-pelan seperti siput?',
      answer: 'Yes, slow, slow, slow.', answerId: 'Ya, pelan, pelan, pelan.',
    },
  ],
};

export default garden;

// Restaurant scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// Left: an open kitchen with the chef behind the counter. Right: a table by the window.
// Front: a big table with a red checked tablecloth.

// A table with a checked tablecloth, seen from the front (scenery, not an object).
function ClothTable({ x, w, top, clothH, legH, pattern, edge }) {
  const hemY = top + 34 + clothH;
  const scallops = [];
  const n = Math.round(w / 60);
  const step = (w + 20) / n;
  let d = `M ${x - 10} ${top + 20} L ${x + w + 10} ${top + 20} L ${x + w + 10} ${hemY}`;
  for (let i = 0; i < n; i++) {
    const x1 = x + w + 10 - i * step;
    d += ` Q ${x1 - step / 2} ${hemY + 22} ${x1 - step} ${hemY}`;
  }
  d += ' Z';
  return (
    <g strokeLinejoin="round">
      <ellipse cx={x + w / 2} cy={hemY + legH + 6} rx={w / 2 + 30} ry="16" fill="#000" opacity="0.1" />
      <rect x={x + 30} y={hemY - 20} width="24" height={legH + 26} rx="8" fill="#b9733f" stroke="#8f5428" strokeWidth="3" />
      <rect x={x + w - 54} y={hemY - 20} width="24" height={legH + 26} rx="8" fill="#b9733f" stroke="#8f5428" strokeWidth="3" />
      <path d={d} fill="#ffffff" />
      <path d={d} fill={`url(#${pattern})`} stroke={edge} strokeWidth="4" />
      <rect x={x - 14} y={top} width={w + 28} height="50" rx="16" fill="#ffffff" stroke={edge} strokeWidth="4" />
      <rect x={x - 14} y={top} width={w + 28} height="50" rx="16" fill={`url(#${pattern})`} opacity="0.55" />
      <rect x={x + 6} y={top + 8} width={w - 12} height="10" rx="5" fill="#ffffff" opacity="0.6" />
    </g>
  );
}

function Background() {
  const tiles = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 20; col++) {
      if ((row + col) % 2) tiles.push(<rect key={`${row}-${col}`} x={col * 80} y={720 + row * 80} width="80" height="80" fill="#f8cdb8" />);
    }
  }
  const flags = [];
  for (let i = 0; i < 9; i++) {
    const fx = 790 + i * 92;
    const fy = 52 + Math.sin((i / 8) * Math.PI) * 22;
    const colors = ['#ff7a59', '#ffd23f', '#4f8df5', '#34c472', '#ff8fab'];
    flags.push(<path key={i} d={`M${fx - 24} ${fy} L${fx + 24} ${fy} L${fx} ${fy + 42} Z`} fill={colors[i % 5]} />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="restaurant-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6b3" />
          <stop offset="1" stopColor="#fff3d9" />
        </linearGradient>
        <pattern id="restaurant-stripes" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="80" fill="#ffffff" opacity="0.35" />
        </pattern>
        <pattern id="restaurant-kitchen-tiles" width="56" height="56" patternUnits="userSpaceOnUse">
          <rect width="56" height="56" fill="#cfe6ee" />
          <rect x="2" y="2" width="52" height="52" rx="6" fill="#f2fafc" />
        </pattern>
        <pattern id="restaurant-red-check" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="20" height="40" fill="#f0524f" opacity="0.5" />
          <rect x="0" y="0" width="40" height="20" fill="#f0524f" opacity="0.5" />
        </pattern>
        <pattern id="restaurant-blue-check" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="18" height="36" fill="#4f9be8" opacity="0.45" />
          <rect x="0" y="0" width="36" height="18" fill="#4f9be8" opacity="0.45" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height="720" fill="url(#restaurant-wall)" />
      <rect width="1600" height="720" fill="url(#restaurant-stripes)" />
      <rect y="560" width="1600" height="160" fill="#ffcfa6" />
      <rect y="552" width="1600" height="16" rx="6" fill="#ffffff" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={790 + i * 102} y="590" width="80" height="104" rx="10" fill="#ffd9b8" stroke="#f2b98c" strokeWidth="3" />
      ))}
      <rect width="1600" height="26" fill="#ef7d5e" />

      {/* bunting */}
      <path d="M744 52 Q1170 96 1600 52" fill="none" stroke="#c9a77c" strokeWidth="3" />
      {flags}

      {/* floor */}
      <rect y="720" width="1600" height="480" fill="#fff2e6" />
      {tiles}
      <rect y="706" width="1600" height="18" fill="#ffffff" />

      {/* open kitchen */}
      <rect x="40" y="120" width="680" height="480" rx="20" fill="#ffffff" stroke="#e2b07e" strokeWidth="6" />
      <rect x="58" y="138" width="644" height="460" rx="12" fill="url(#restaurant-kitchen-tiles)" />
      {/* cooker hood above the chef */}
      <rect x="330" y="138" width="60" height="70" fill="#b8c6d3" stroke="#8a9bab" strokeWidth="4" />
      <path d="M300 205 L420 205 L470 285 L250 285 Z" fill="#cdd8e2" stroke="#8a9bab" strokeWidth="5" strokeLinejoin="round" />
      <rect x="240" y="280" width="240" height="18" rx="8" fill="#b8c6d3" stroke="#8a9bab" strokeWidth="4" />
      {/* kitchen shelves */}
      <rect x="70" y="350" width="150" height="16" rx="6" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
      <path d="M86 366 L100 392 L114 366 Z M176 366 L190 392 L204 366 Z" fill="#d9844a" />
      <rect x="530" y="350" width="150" height="16" rx="6" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
      <path d="M546 366 L560 392 L574 366 Z M636 366 L650 392 L664 366 Z" fill="#d9844a" />
      {/* striped awning over the kitchen */}
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${20 + i * 72} 88 h72 v52 q-18 18 -36 0 q-18 18 -36 0 Z`} fill={i % 2 ? '#ffffff' : '#ef5b5b'} stroke="#d94a4a" strokeWidth="2" />
      ))}
      <rect x="14" y="78" width="732" height="18" rx="8" fill="#d94a4a" />

      {/* counter shadow */}
      <ellipse cx="395" cy="800" rx="390" ry="18" fill="#000" opacity="0.1" />

      {/* lamp cord */}
      <rect x="1107" y="26" width="6" height="290" fill="#8a6a50" />

      {/* tables */}
      <ClothTable x={800} w={760} top={688} clothH={118} legH={40} pattern="restaurant-blue-check" edge="#3d82c9" />
      <ClothTable x={330} w={960} top={958} clothH={120} legH={34} pattern="restaurant-red-check" edge="#d94a4a" />

      {/* shadows under the chair and plant */}
      <ellipse cx="178" cy="1128" rx="90" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="1455" cy="1126" rx="80" ry="14" fill="#000" opacity="0.1" />
    </g>
  );
}

// Drawn in front of the objects: the kitchen counter (the chef stands behind it)
// and the little vase the flower stands in.
function Foreground() {
  return (
    <g strokeLinejoin="round">
      <rect x="30" y="582" width="730" height="212" rx="14" fill="#e8955a" stroke="#c06d36" strokeWidth="5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={58 + i * 176} y="612" width="146" height="140" rx="12" fill="#f0a96f" stroke="#d98a4f" strokeWidth="3" />
          <rect x={72 + i * 176} y="626" width="118" height="112" rx="8" fill="none" stroke="#f7c08e" strokeWidth="3" />
          <circle cx={131 + i * 176} cy="640" r="7" fill="#c97a44" />
        </g>
      ))}
      <rect x="34" y="764" width="722" height="26" rx="8" fill="#c97a44" />
      <rect x="14" y="560" width="762" height="32" rx="12" fill="#fff4e0" stroke="#c06d36" strokeWidth="5" />
      <rect x="34" y="567" width="722" height="7" rx="3.5" fill="#ffffff" opacity="0.8" />

      {/* vase */}
      <path d="M1456 694 L1484 694 Q1494 706 1488 718 Q1470 726 1452 718 Q1446 706 1456 694 Z" fill="#bfe6ff" stroke="#5aa7d6" strokeWidth="3" />
      <path d="M1458 702 Q1456 710 1460 715" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <rect x="1453" y="689" width="34" height="8" rx="4" fill="#e3f4ff" stroke="#5aa7d6" strokeWidth="3" />
    </g>
  );
}

function WallClock() {
  const ticks = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const r1 = i % 3 === 0 ? 27 : 30;
    ticks.push(
      <line key={i} x1={Math.sin(a) * r1} y1={-Math.cos(a) * r1} x2={Math.sin(a) * 34} y2={-Math.cos(a) * 34} stroke="#6b4a3a" strokeWidth={i % 3 === 0 ? 4 : 2.5} strokeLinecap="round" />,
    );
  }
  return (
    <g strokeLinejoin="round">
      <circle cx="2" cy="4" r="44" fill="#000" opacity="0.1" />
      <circle r="44" fill="#ef6f5e" stroke="#c84f40" strokeWidth="3" />
      <circle r="37" fill="#fffaf0" stroke="#e8c9a8" strokeWidth="2" />
      {ticks}
      {/* one o'clock: lunch time */}
      <line x1="0" y1="0" x2="10" y2="-17" stroke="#3b2a20" strokeWidth="5" strokeLinecap="round" />
      <line x1="0" y1="0" x2="0" y2="-28" stroke="#3b2a20" strokeWidth="3.5" strokeLinecap="round" />
      <circle r="4.5" fill="#ef6f5e" stroke="#3b2a20" strokeWidth="2" />
      <path d="M -26 -18 Q -18 -30 -4 -33" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function PendantLamp() {
  return (
    <g strokeLinejoin="round">
      <path d="M -26 14 L 26 14 L 48 60 L -48 60 Z" fill="#fff6a8" opacity="0.4" />
      <rect x="-7" y="-44" width="14" height="12" rx="3" fill="#8a6a50" />
      <path d="M -44 12 Q -44 -32 0 -34 Q 44 -32 44 12 Z" fill="#ffb238" stroke="#e08a1e" strokeWidth="3" />
      <path d="M -30 -6 Q -26 -22 -12 -26" fill="none" stroke="#ffd98a" strokeWidth="4" strokeLinecap="round" />
      <rect x="-47" y="8" width="94" height="9" rx="4.5" fill="#ff8f3d" stroke="#e08a1e" strokeWidth="2.5" />
      <ellipse cx="0" cy="20" rx="14" ry="9" fill="#fff3a0" stroke="#f0c84a" strokeWidth="2" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-38" y="-42" width="76" height="80" rx="6" fill="#ffffff" stroke="#d9b48a" strokeWidth="1.5" />
      <rect x="-33" y="-37" width="66" height="70" rx="3" fill="#9fdcff" />
      <circle cx="14" cy="-20" r="8" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="-14" cy="-22" r="5" />
        <circle cx="-7" cy="-25" r="6.5" />
        <circle cx="0" cy="-22" r="5" />
      </g>
      <path d="M -33 33 Q -10 16 8 24 Q 22 16 33 22 L 33 33 Z" fill="#7ed957" />
      <rect x="-14" y="8" width="5" height="16" fill="#8a4b2a" />
      <circle cx="-11.5" cy="3" r="10" fill="#4cbf4c" />
      <rect x="-1.5" y="-37" width="3" height="70" fill="#ffffff" />
      <rect x="-33" y="-3" width="66" height="3" fill="#ffffff" />
      {/* curtains */}
      <path d="M -44 -46 L -24 -46 Q -28 -10 -20 8 Q -30 12 -36 40 L -46 40 Q -42 0 -44 -46 Z" fill="#ff8fab" stroke="#e0628a" strokeWidth="1.5" />
      <path d="M 44 -46 L 24 -46 Q 28 -10 20 8 Q 30 12 36 40 L 46 40 Q 42 0 44 -46 Z" fill="#ff8fab" stroke="#e0628a" strokeWidth="1.5" />
      <rect x="-48" y="-50" width="96" height="6" rx="3" fill="#d9844a" />
      <rect x="-44" y="38" width="88" height="7" rx="3" fill="#ffffff" stroke="#d9b48a" strokeWidth="1" />
    </g>
  );
}

// y for something standing on a surface at height `surface` (3D pictures end ~43% below their centre).
const on = (surface, size) => Math.round(surface - size * 0.43);
const COUNTER = 578;
const BACK = 714;
const FRONT = 992;

const restaurant = {
  id: 'restaurant',
  title: 'Restaurant',
  titleId: 'Restoran',
  icon: '🍽️',
  Background,
  Foreground,
  hideBehind: ['🥡', '🧺', '📦', '💐'],
  objects: [
    // kitchen
    {
      id: 'chef', word: 'chef', wordId: 'koki', emoji: '🧑‍🍳', x: 360, y: on(COUNTER + 4, 280), size: 280,
      sentence: 'The chef cooks yummy food.', sentenceId: 'Koki memasak makanan yang enak.',
      question: 'Can you say thank you, chef?', questionId: 'Bisa bilang terima kasih ke koki?',
      answer: 'Thank you, chef!', answerId: 'Terima kasih, Pak Koki!',
    },
    {
      id: 'bell', word: 'bell', wordId: 'bel', emoji: '🛎️', x: 110, y: on(COUNTER, 100), size: 100,
      sentence: 'Ding, ding! The food is ready!', sentenceId: 'Ting, ting! Makanannya sudah siap!',
      question: 'Can you say ding, ding?', questionId: 'Bisa bilang ting, ting?',
      answer: 'Ding, ding!', answerId: 'Ting, ting!',
    },
    {
      id: 'soup', word: 'soup', wordId: 'sup', emoji: '🍲', x: 590, y: on(COUNTER, 120), size: 120,
      sentence: 'The soup is very hot.', sentenceId: 'Supnya panas sekali.',
      question: 'Can you blow on the soup?', questionId: 'Bisa tiup supnya?',
      answer: 'Whoo! Now it is cool.', answerId: 'Fuuh! Sekarang tidak panas lagi.',
    },
    {
      id: 'pizza', word: 'pizza', wordId: 'pizza', emoji: '🍕', x: 705, y: on(COUNTER, 110), size: 110,
      sentence: 'The pizza slice is a triangle.', sentenceId: 'Potongan pizzanya berbentuk segitiga.',
      question: 'How do you ask for pizza?', questionId: 'Bagaimana cara minta pizza?',
      answer: 'Pizza, please!', answerId: 'Minta pizzanya, ya!',
    },
    {
      id: 'teapot', word: 'teapot', wordId: 'teko', emoji: '🫖', x: 145, y: on(352, 110), size: 110,
      sentence: 'We pour tea from the teapot.', sentenceId: 'Kita menuang teh dari teko.',
      question: 'Do you like sweet tea?', questionId: 'Kamu suka teh manis?',
      answer: 'Yes, I like sweet tea.', answerId: 'Ya, aku suka teh manis.',
    },
    {
      id: 'salt', word: 'salt', wordId: 'garam', emoji: '🧂', x: 605, y: on(352, 105), size: 105,
      sentence: 'The chef adds a little salt.', sentenceId: 'Koki menambahkan sedikit garam.',
      question: 'Is salt salty or sweet?', questionId: 'Garam itu asin atau manis?',
      answer: 'Salt is salty!', answerId: 'Garam itu asin!',
    },

    // wall
    {
      id: 'clock', word: 'clock', wordId: 'jam', art: WallClock, x: 900, y: 250, size: 150,
      sentence: 'It is time for lunch!', sentenceId: 'Sudah waktunya makan siang!',
      question: 'Are you hungry?', questionId: 'Kamu lapar?',
      answer: 'Yes, I am hungry!', answerId: 'Ya, aku lapar!',
    },
    {
      id: 'lamp', word: 'lamp', wordId: 'lampu', art: PendantLamp, x: 1110, y: 380, size: 170, hit: { w: 170, h: 150, dy: 0 },
      sentence: 'The lamp shines on the table.', sentenceId: 'Lampunya menyinari meja.',
      question: 'Is the lamp on or off?', questionId: 'Lampunya nyala atau mati?',
      answer: 'The lamp is on.', answerId: 'Lampunya nyala.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 1400, y: 330, size: 300, hit: { w: 280, h: 280 },
      sentence: 'I can see a tree outside.', sentenceId: 'Aku bisa lihat pohon di luar.',
      question: 'Is it sunny or rainy?', questionId: 'Cuacanya cerah atau hujan?',
      answer: 'It is sunny.', answerId: 'Cuacanya cerah.',
    },

    // table by the window
    {
      id: 'spaghetti', word: 'spaghetti', wordId: 'spageti', emoji: '🍝', x: 870, y: on(BACK, 125), size: 125,
      sentence: 'I twirl spaghetti on my fork.', sentenceId: 'Aku memutar spageti di garpuku.',
      question: 'Can you twirl around like spaghetti?', questionId: 'Bisa berputar seperti spageti?',
      answer: 'Twirl, twirl, twirl!', answerId: 'Putar, putar, putar!',
    },
    {
      id: 'hamburger', word: 'hamburger', wordId: 'hamburger', emoji: '🍔', x: 1000, y: on(BACK, 120), size: 120,
      sentence: 'The hamburger is big and yummy.', sentenceId: 'Hamburgernya besar dan enak.',
      question: 'Can you take a big bite?', questionId: 'Bisa gigit yang besar?',
      answer: 'Yum! A big bite!', answerId: 'Nyam! Gigitan besar!',
    },
    {
      id: 'fries', word: 'fries', wordId: 'kentang goreng', emoji: '🍟', x: 1120, y: on(BACK, 115), size: 115,
      sentence: 'The fries are in a red box.', sentenceId: 'Kentang gorengnya ada di kotak merah.',
      question: 'Do you like fries?', questionId: 'Kamu suka kentang goreng?',
      answer: 'Yes, I love fries!', answerId: 'Ya, aku suka sekali kentang goreng!',
    },
    {
      id: 'hotdog', word: 'hot dog', wordId: 'hot dog', emoji: '🌭', x: 1240, y: on(BACK, 115), size: 115,
      sentence: 'The hot dog has yellow mustard.', sentenceId: 'Hot dognya pakai saus mustard kuning.',
      question: 'Is the hot dog long or short?', questionId: 'Hot dognya panjang atau pendek?',
      answer: 'The hot dog is long.', answerId: 'Hot dognya panjang.',
    },
    {
      id: 'juice', word: 'juice', wordId: 'jus', emoji: '🧃', x: 1355, y: on(BACK, 100), size: 100,
      sentence: 'I drink apple juice with a straw.', sentenceId: 'Aku minum jus apel pakai sedotan.',
      question: 'Is the juice box green?', questionId: 'Kotak jusnya hijau?',
      answer: 'Yes, it is green.', answerId: 'Ya, warnanya hijau.',
    },
    {
      id: 'flower', word: 'flower', wordId: 'bunga', emoji: '🌷', x: 1470, y: on(BACK - 4, 115), size: 115,
      sentence: 'A pink flower is on the table.', sentenceId: 'Ada bunga merah muda di meja.',
      question: 'Can you smell the flower?', questionId: 'Bisa cium bunganya?',
      answer: 'Mmm, it smells nice!', answerId: 'Hmm, wangi sekali!',
    },

    // the big table in front
    {
      id: 'sushi', word: 'sushi', wordId: 'sushi', emoji: '🍣', x: 410, y: on(FRONT + 4, 115), size: 115,
      sentence: 'Sushi is rice with fish.', sentenceId: 'Sushi itu nasi dengan ikan.',
      question: 'Do you want to try sushi?', questionId: 'Kamu mau coba sushi?',
      answer: 'Yes, please!', answerId: 'Ya, mau dong!',
    },
    {
      id: 'noodles', word: 'noodles', wordId: 'mi', emoji: '🍜', x: 545, y: on(FRONT - 4, 125), size: 125,
      sentence: 'The noodles are long and yummy.', sentenceId: 'Minya panjang dan enak.',
      question: 'Can you slurp the noodles?', questionId: 'Bisa menyeruput minya?',
      answer: 'Slurp, slurp, slurp!', answerId: 'Sruput, sruput, sruput!',
    },
    {
      id: 'chopsticks', word: 'chopsticks', wordId: 'sumpit', emoji: '🥢', x: 652, y: FRONT - 12, size: 100, rotate: 62,
      sentence: 'I eat with two chopsticks.', sentenceId: 'Aku makan pakai dua sumpit.',
      question: 'How many chopsticks are there?', questionId: 'Ada berapa sumpit?',
      answer: 'There are two chopsticks.', answerId: 'Ada dua sumpit.',
    },
    {
      id: 'rice', word: 'rice', wordId: 'nasi', emoji: '🍚', x: 765, y: on(FRONT - 2, 110), size: 110,
      sentence: 'I eat rice every day.', sentenceId: 'Aku makan nasi setiap hari.',
      question: 'Is the rice white or red?', questionId: 'Nasinya putih atau merah?',
      answer: 'The rice is white.', answerId: 'Nasinya putih.',
    },
    {
      id: 'salad', word: 'salad', wordId: 'salad', emoji: '🥗', x: 892, y: on(FRONT + 4, 120), size: 120,
      sentence: 'The salad is green and fresh.', sentenceId: 'Saladnya hijau dan segar.',
      question: 'Do you eat vegetables?', questionId: 'Kamu makan sayur?',
      answer: 'Yes, I eat vegetables.', answerId: 'Ya, aku makan sayur.',
    },
    {
      id: 'cake', word: 'cake', wordId: 'kue', emoji: '🍰', x: 1025, y: on(FRONT - 4, 115), size: 115,
      sentence: 'The cake has a red strawberry.', sentenceId: 'Kuenya ada stroberi merah.',
      question: 'Is the cake sweet?', questionId: 'Kuenya manis?',
      answer: 'Yes, it is sweet.', answerId: 'Ya, manis.',
    },
    {
      id: 'icecream', word: 'ice cream', wordId: 'es krim', emoji: '🍨', x: 1165, y: on(FRONT + 2, 125), size: 125,
      sentence: 'The ice cream is cold.', sentenceId: 'Es krimnya dingin.',
      question: 'How many scoops can you see?', questionId: 'Ada berapa bulatan es krimnya?',
      answer: 'I can see three scoops.', answerId: 'Ada tiga bulatan.',
    },

    // floor
    {
      id: 'chair', word: 'chair', wordId: 'kursi', emoji: '🪑', x: 178, y: on(1130, 200), size: 200,
      sentence: 'Please sit on the chair.', sentenceId: 'Silakan duduk di kursi.',
      question: 'Can you sit nicely at the table?', questionId: 'Bisa duduk rapi di meja?',
      answer: 'Yes, I can sit nicely.', answerId: 'Ya, aku bisa duduk rapi.',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 1455, y: on(1128, 190), size: 190,
      sentence: 'The plant is big and green.', sentenceId: 'Tanamannya besar dan hijau.',
      question: 'Is the plant big or small?', questionId: 'Tanamannya besar atau kecil?',
      answer: 'The plant is big.', answerId: 'Tanamannya besar.',
    },
  ],
};

export default restaurant;

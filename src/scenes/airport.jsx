// Airport scene: a departure hall with a big window onto the runway.
// Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

const WIN = { x: 340, y: 70, w: 1230, h: 550 }; // the big window
const FLOOR_Y = 655;

function Background() {
  const tiles = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 12; col++) {
      tiles.push(
        <rect
          key={`${row}-${col}`}
          x={col * 140 - (row % 2) * 70}
          y={FLOOR_Y + 10 + row * 92}
          width="136"
          height="88"
          rx="8"
          fill={(row + col) % 2 ? '#e7ebf6' : '#f3f5fb'}
        />,
      );
    }
  }
  const mullions = [655, 970, 1285];
  return (
    <g>
      <defs>
        <linearGradient id="airport-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9c2" />
          <stop offset="1" stopColor="#fff5e0" />
        </linearGradient>
        <linearGradient id="airport-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ec1ff" />
          <stop offset="1" stopColor="#d6f1ff" />
        </linearGradient>
        <linearGradient id="airport-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe4f2" />
          <stop offset="1" stopColor="#eef1f9" />
        </linearGradient>
        <pattern id="airport-dots" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="5" fill="#ffffff" opacity="0.55" />
          <circle cx="60" cy="60" r="5" fill="#ffffff" opacity="0.55" />
        </pattern>
      </defs>

      {/* wall and ceiling */}
      <rect width="1600" height={FLOOR_Y} fill="url(#airport-wall)" />
      <rect width="1600" height={FLOOR_Y} fill="url(#airport-dots)" />
      <rect width="1600" height="40" fill="#c7d3e3" />
      <rect y="36" width="1600" height="8" fill="#a9b8cc" />
      {[120, 520, 920, 1320].map((x) => (
        <rect key={x} x={x} y="12" width="160" height="14" rx="7" fill="#f4f8ff" opacity="0.9" />
      ))}

      {/* view through the window: sky, hills, grass, runway */}
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="url(#airport-sky)" />
      <path
        d={`M${WIN.x} 500 Q 520 430 700 480 Q 880 420 1060 478 Q 1250 425 1420 470 Q 1500 450 ${WIN.x + WIN.w} 465 L ${WIN.x + WIN.w} 520 L ${WIN.x} 520 Z`}
        fill="#b8e6a0"
      />
      <rect x={WIN.x} y="505" width={WIN.w} height={WIN.y + WIN.h - 505} fill="#8ed46f" />
      <rect x={WIN.x} y="530" width={WIN.w} height="62" fill="#7d8899" />
      <rect x={WIN.x} y="530" width={WIN.w} height="5" fill="#ffffff" opacity="0.8" />
      <rect x={WIN.x} y="587" width={WIN.w} height="5" fill="#ffffff" opacity="0.8" />
      {Array.from({ length: 11 }, (_, i) => (
        <rect key={i} x={WIN.x + 30 + i * 115} y="557" width="60" height="8" rx="4" fill="#ffffff" />
      ))}
      {/* glass shine */}
      <g fill="#ffffff" opacity="0.18">
        <path d={`M${WIN.x + 40} ${WIN.y} l 70 0 l -180 ${WIN.h} l -70 0 Z`} transform="translate(160 0)" />
        <path d={`M${WIN.x + 380} ${WIN.y} l 30 0 l -180 ${WIN.h} l -30 0 Z`} />
        <path d={`M${WIN.x + 1020} ${WIN.y} l 60 0 l -180 ${WIN.h} l -60 0 Z`} />
      </g>
      {/* window frame */}
      <rect x={WIN.x - 8} y={WIN.y - 8} width={WIN.w + 16} height={WIN.h + 16} rx="10" fill="none" stroke="#56657c" strokeWidth="16" />
      {mullions.map((x) => (
        <rect key={x} x={x - 7} y={WIN.y} width="14" height={WIN.h} fill="#56657c" />
      ))}
      <rect x={WIN.x - 20} y={WIN.y + WIN.h + 4} width={WIN.w + 40} height="16" rx="6" fill="#dfe6ef" stroke="#a9b8cc" strokeWidth="3" />

      {/* floor */}
      <rect y={FLOOR_Y} width="1600" height={1200 - FLOOR_Y} fill="url(#airport-floor)" />
      {tiles}
      <rect y={FLOOR_Y - 14} width="1600" height="20" fill="#ffffff" />
      <rect y={FLOOR_Y + 6} width="1600" height="5" fill="#d3d9e8" />
      {/* light from the window on the shiny floor */}
      <g fill="#ffffff" opacity="0.35">
        <path d="M 520 670 L 640 670 L 470 1200 L 330 1200 Z" />
        <path d="M 1000 670 L 1060 670 L 960 1200 L 880 1200 Z" />
      </g>

      {/* soft shadows */}
      <ellipse cx="95" cy="862" rx="85" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="470" cy="992" rx="230" ry="18" fill="#000" opacity="0.08" />
      <ellipse cx="1345" cy="862" rx="240" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="890" cy="1000" rx="110" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="1340" cy="1176" rx="170" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="520" cy="1122" rx="80" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="900" cy="1140" rx="62" ry="10" fill="#000" opacity="0.08" />
      <ellipse cx="170" cy="1112" rx="60" ry="9" fill="#000" opacity="0.08" />

      {/* little round cafe table */}
      <rect x="880" y="880" width="20" height="110" rx="6" fill="#9fb2c4" />
      <ellipse cx="890" cy="992" rx="70" ry="12" fill="#9fb2c4" />
      <ellipse cx="890" cy="880" rx="135" ry="20" fill="#ffffff" stroke="#c3cfdd" strokeWidth="5" />
    </g>
  );
}

// The gate desk is drawn in front of the pilot, so the pilot stands behind it.
function GateDesk() {
  return (
    <g>
      <rect x="1130" y="700" width="440" height="150" rx="14" fill="#ff9f68" stroke="#e0703a" strokeWidth="5" />
      <rect x="1165" y="735" width="370" height="80" rx="12" fill="#ffb98f" />
      <rect x="1165" y="766" width="370" height="16" fill="#ffffff" opacity="0.7" />
      <rect x="1115" y="686" width="470" height="26" rx="9" fill="#ffd6bd" stroke="#e0703a" strokeWidth="4" />
    </g>
  );
}

function ControlTower() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <line x1="0" y1="-44" x2="0" y2="-50" stroke="#56657c" strokeWidth="1.6" />
      <circle cx="0" cy="-50" r="2.2" fill="#ff5a5f" />
      <path d="M -20 -38 L 20 -38 L 24 -34 L -24 -34 Z" fill="#56657c" stroke="#3b475a" strokeWidth="1.2" />
      <rect x="-6" y="-44" width="12" height="6" rx="2" fill="#56657c" />
      <path d="M -26 -34 L 26 -34 L 20 -17 L -20 -17 Z" fill="#8fd3ff" stroke="#3d6e99" strokeWidth="1.4" />
      <path d="M -13 -34 L -10 -17 M 0 -34 L 0 -17 M 13 -34 L 10 -17" stroke="#3d6e99" strokeWidth="1.2" />
      <path d="M -20 -31 L -16 -20" stroke="#ffffff" strokeWidth="1.6" opacity="0.8" />
      <rect x="-24" y="-18" width="48" height="6" rx="2" fill="#e6edf5" stroke="#8a9bb0" strokeWidth="1.2" />
      <path d="M -10 -12 L 10 -12 L 13 46 L -13 46 Z" fill="#f4f7fb" stroke="#8a9bb0" strokeWidth="1.4" />
      <rect x="-11.5" y="4" width="23" height="6" fill="#ff9f68" />
      <rect x="-12.3" y="24" width="24.6" height="6" fill="#ff9f68" />
      <circle cx="0" cy="-3" r="2.6" fill="#8fd3ff" stroke="#3d6e99" strokeWidth="0.8" />
      <circle cx="0" cy="17" r="2.6" fill="#8fd3ff" stroke="#3d6e99" strokeWidth="0.8" />
      <circle cx="0" cy="37" r="2.6" fill="#8fd3ff" stroke="#3d6e99" strokeWidth="0.8" />
      <rect x="-20" y="45" width="40" height="5" rx="2" fill="#c3cfdd" stroke="#8a9bb0" strokeWidth="1" />
    </g>
  );
}

function WallClock() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const r1 = i % 3 === 0 ? 27 : 30;
    return (
      <line
        key={i}
        x1={Math.sin(a) * r1}
        y1={-Math.cos(a) * r1}
        x2={Math.sin(a) * 34}
        y2={-Math.cos(a) * 34}
        stroke="#3b475a"
        strokeWidth={i % 3 === 0 ? 3.2 : 2}
        strokeLinecap="round"
      />
    );
  });
  return (
    <g strokeLinejoin="round">
      <circle cx="2" cy="3" r="45" fill="#000" opacity="0.08" />
      <circle cx="0" cy="0" r="45" fill="#4f8df5" stroke="#2f62c0" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="38" fill="#ffffff" stroke="#c9d6e8" strokeWidth="1.5" />
      {ticks}
      <line x1="0" y1="0" x2="-14" y2="-9" stroke="#3b475a" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="0" y1="0" x2="15" y2="-21" stroke="#3b475a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="0" r="4" fill="#ff5a5f" />
      <path d="M -30 -18 Q -22 -32 -6 -36" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

function Passport() {
  return (
    <g strokeLinejoin="round" transform="rotate(-8)">
      <rect x="-27" y="-36" width="58" height="76" rx="5" fill="#fff6dc" stroke="#d6c08a" strokeWidth="1.5" />
      <rect x="-31" y="-40" width="58" height="76" rx="5" fill="#1f8a55" stroke="#11603a" strokeWidth="2.5" />
      <rect x="-31" y="-40" width="8" height="76" rx="3" fill="#17744a" />
      <circle cx="2" cy="-10" r="13" fill="none" stroke="#f2c94c" strokeWidth="2.6" />
      <ellipse cx="2" cy="-10" rx="5.5" ry="13" fill="none" stroke="#f2c94c" strokeWidth="2" />
      <line x1="-11" y1="-10" x2="15" y2="-10" stroke="#f2c94c" strokeWidth="2" />
      <rect x="-10" y="12" width="24" height="4" rx="2" fill="#f2c94c" />
      <rect x="-6" y="20" width="16" height="3" rx="1.5" fill="#f2c94c" opacity="0.8" />
      <path d="M -18 -34 L -18 28" stroke="#3fae75" strokeWidth="1.5" opacity="0.7" />
    </g>
  );
}

function Seats() {
  const seat = (cx) => (
    <g key={cx}>
      <rect x={cx - 14} y="-30" width="28" height="32" rx="8" fill="#4f8df5" stroke="#2f62c0" strokeWidth="1.4" />
      <path d={`M ${cx - 8} -24 L ${cx - 8} -6`} stroke="#8fbaff" strokeWidth="2.4" strokeLinecap="round" />
      <rect x={cx - 15} y="-2" width="30" height="10" rx="4" fill="#6aa5ff" stroke="#2f62c0" strokeWidth="1.4" />
    </g>
  );
  const arm = (x) => (
    <g key={`a${x}`}>
      <rect x={x - 1.6} y="-8" width="3.2" height="14" fill="#8a9bb0" />
      <rect x={x - 5} y="-11" width="10" height="4" rx="2" fill="#56657c" />
    </g>
  );
  return (
    <g strokeLinejoin="round">
      <rect x="-48" y="10" width="96" height="5" rx="2" fill="#8a9bb0" stroke="#6b7a8c" strokeWidth="1" />
      <rect x="-37" y="14" width="4" height="24" fill="#8a9bb0" />
      <rect x="33" y="14" width="4" height="24" fill="#8a9bb0" />
      <rect x="-43" y="36" width="16" height="4" rx="2" fill="#6b7a8c" />
      <rect x="27" y="36" width="16" height="4" rx="2" fill="#6b7a8c" />
      {[-32, 0, 32].map(seat)}
      {[-48, -16, 16, 48].map(arm)}
    </g>
  );
}

function LuggageCart() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* frame: back post, top rail and brace */}
      <path d="M -36 28 L -42 -40" stroke="#6b7a8c" strokeWidth="6" fill="none" />
      <path d="M -36 28 L -42 -40" stroke="#c3ced9" strokeWidth="3.4" fill="none" />
      <path d="M -40 -12 L 6 -12 L 22 26" stroke="#6b7a8c" strokeWidth="5" fill="none" />
      <path d="M -40 -12 L 6 -12 L 22 26" stroke="#c3ced9" strokeWidth="2.6" fill="none" />
      {/* handle */}
      <path d="M -50 -42 L -34 -44" stroke="#c0502a" strokeWidth="8" fill="none" />
      <path d="M -50 -42 L -34 -44" stroke="#ff9f43" strokeWidth="5.4" fill="none" />
      {/* platform */}
      <rect x="-42" y="24" width="88" height="8" rx="3" fill="#ff9f43" stroke="#c0502a" strokeWidth="1.6" />
      <rect x="40" y="10" width="6" height="20" rx="2" fill="#ff9f43" stroke="#c0502a" strokeWidth="1.4" />
      {/* wheels */}
      <circle cx="-28" cy="40" r="7.5" fill="#3d4a5c" />
      <circle cx="-28" cy="40" r="3" fill="#c9d3df" />
      <circle cx="32" cy="40" r="7.5" fill="#3d4a5c" />
      <circle cx="32" cy="40" r="3" fill="#c9d3df" />
    </g>
  );
}

const airport = {
  id: 'airport',
  title: 'Airport',
  titleId: 'Bandara',
  icon: '✈️',
  Background,
  Foreground: GateDesk,
  hideBehind: ['💼', '👜', '📦', '🛍️'],
  objects: [
    // big drawn things first, so smaller things are drawn on top of them
    {
      id: 'tower', word: 'control tower', wordId: 'menara kontrol', art: ControlTower, x: 470, y: 340, size: 370, hit: { w: 190, h: 360 },
      sentence: 'People in the tower watch the planes.', sentenceId: 'Orang di menara mengawasi pesawat.',
      question: 'Is the tower tall or short?', questionId: 'Menaranya tinggi atau pendek?',
      answer: 'The tower is very tall.', answerId: 'Menaranya tinggi sekali.',
    },
    {
      id: 'seats', word: 'seats', wordId: 'kursi tunggu', art: Seats, x: 470, y: 820, size: 420, hit: { w: 420, h: 280, dy: 30 },
      sentence: 'We sit and wait for our plane.', sentenceId: 'Kita duduk menunggu pesawat kita.',
      question: 'Can you count the seats?', questionId: 'Bisa hitung kursinya?',
      answer: 'One, two, three seats!', answerId: 'Satu, dua, tiga kursi!',
    },
    {
      id: 'cart', word: 'luggage cart', wordId: 'troli koper', art: LuggageCart, x: 1340, y: 1030, size: 310, hit: { w: 310, h: 280, dx: -50 },
      sentence: 'We push our bags on the cart.', sentenceId: 'Kita dorong tas kita di troli.',
      question: 'Can you push the cart?', questionId: 'Bisa dorong trolinya?',
      answer: 'Yes! Push, push, push!', answerId: 'Bisa! Dorong, dorong, dorong!',
    },

    // outside the window
    {
      id: 'airplane', word: 'airplane', wordId: 'pesawat', emoji: '✈️', x: 980, y: 320, size: 250,
      sentence: 'The airplane flies high in the sky.', sentenceId: 'Pesawatnya terbang tinggi di langit.',
      question: 'Can you fly like an airplane?', questionId: 'Bisa terbang seperti pesawat?',
      answer: 'Yes! Whoosh!', answerId: 'Bisa! Wuuush!',
    },
    {
      id: 'helicopter', word: 'helicopter', wordId: 'helikopter', emoji: '🚁', x: 700, y: 190, size: 170,
      sentence: 'The helicopter flies over the airport.', sentenceId: 'Helikopternya terbang di atas bandara.',
      question: 'Is the helicopter orange?', questionId: 'Apakah helikopternya oranye?',
      answer: 'Yes, it is orange.', answerId: 'Ya, warnanya oranye.',
    },
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '☀️', x: 1460, y: 150, size: 150,
      sentence: 'The sun is shining today.', sentenceId: 'Mataharinya bersinar hari ini.',
      question: 'Is it a sunny day?', questionId: 'Hari ini cerah?',
      answer: 'Yes, it is sunny!', answerId: 'Ya, cerah!',
    },
    {
      id: 'cloud', word: 'cloud', wordId: 'awan', emoji: '☁️', x: 1190, y: 150, size: 170,
      sentence: 'The cloud is soft and fluffy.', sentenceId: 'Awannya lembut seperti kapas.',
      question: 'Is the cloud white or black?', questionId: 'Awannya putih atau hitam?',
      answer: 'The cloud is white.', answerId: 'Awannya putih.',
    },
    {
      id: 'bird', word: 'bird', wordId: 'burung', emoji: '🕊️', x: 1225, y: 340, size: 115,
      sentence: 'The bird flies next to the plane.', sentenceId: 'Burungnya terbang di dekat pesawat.',
      question: 'Can you flap like a bird?', questionId: 'Bisa mengepak seperti burung?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'bus', word: 'bus', wordId: 'bus', emoji: '🚌', x: 700, y: 548, size: 150,
      sentence: 'The bus takes us to the plane.', sentenceId: 'Busnya mengantar kita ke pesawat.',
      question: 'Can you say beep, beep?', questionId: 'Bisa bilang tin, tin?',
      answer: 'Beep, beep!', answerId: 'Tin, tin!',
    },

    // on the wall
    {
      id: 'clock', word: 'clock', wordId: 'jam', art: WallClock, x: 175, y: 175, size: 170,
      sentence: 'Tick tock! It is time to fly.', sentenceId: 'Tik tok! Sudah waktunya terbang.',
      question: 'Can you say tick tock?', questionId: 'Bisa bilang tik tok?',
      answer: 'Tick tock, tick tock!', answerId: 'Tik tok, tik tok!',
    },
    {
      id: 'map', word: 'map', wordId: 'peta', emoji: '🗺️', x: 175, y: 420, size: 190,
      sentence: 'The map shows where we go.', sentenceId: 'Petanya menunjukkan tempat tujuan kita.',
      question: 'Do you want to go to Bali?', questionId: 'Kamu mau pergi ke Bali?',
      answer: 'Yes, I want to go to Bali!', answerId: 'Ya, aku mau ke Bali!',
    },

    // at the gate desk
    {
      id: 'pilot', word: 'pilot', wordId: 'pilot', emoji: '🧑‍✈️', x: 1350, y: 572, size: 270,
      sentence: 'The pilot flies the airplane.', sentenceId: 'Pilot menerbangkan pesawat.',
      question: 'Do you want to be a pilot?', questionId: 'Kamu mau jadi pilot?',
      answer: 'Yes, I want to be a pilot!', answerId: 'Ya, aku mau jadi pilot!',
    },
    {
      id: 'ticket', word: 'ticket', wordId: 'tiket', emoji: '🎫', x: 1520, y: 660, size: 100, rotate: -8,
      sentence: 'We need a ticket to fly.', sentenceId: 'Kita perlu tiket untuk naik pesawat.',
      question: 'Is the ticket yellow?', questionId: 'Apakah tiketnya kuning?',
      answer: 'Yes, the ticket is yellow.', answerId: 'Ya, tiketnya kuning.',
    },
    {
      id: 'passport', word: 'passport', wordId: 'paspor', art: Passport, x: 1185, y: 650, size: 100,
      sentence: 'My passport has my photo inside.', sentenceId: 'Di dalam pasporku ada fotoku.',
      question: 'What color is the passport?', questionId: 'Paspornya warna apa?',
      answer: 'The passport is green.', answerId: 'Paspornya hijau.',
    },

    // on the seats
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 336, y: 762, size: 120,
      sentence: 'My teddy bear comes on holiday too.', sentenceId: 'Boneka beruangku ikut liburan juga.',
      question: 'Do you bring a toy on holiday?', questionId: 'Kamu bawa mainan waktu liburan?',
      answer: 'Yes, I bring my teddy bear!', answerId: 'Ya, aku bawa boneka beruangku!',
    },
    {
      id: 'phone', word: 'phone', wordId: 'ponsel', emoji: '📱', x: 470, y: 772, size: 90,
      sentence: 'I call Grandma on the phone.', sentenceId: 'Aku menelepon Nenek pakai ponsel.',
      question: 'Can you say hello on the phone?', questionId: 'Bisa bilang halo di telepon?',
      answer: 'Hello! I am at the airport!', answerId: 'Halo! Aku di bandara!',
    },
    {
      id: 'backpack', word: 'backpack', wordId: 'tas ransel', emoji: '🎒', x: 604, y: 762, size: 120,
      sentence: 'I carry my backpack on my back.', sentenceId: 'Aku menggendong tas ranselku.',
      question: 'Is the backpack heavy or light?', questionId: 'Tas ranselnya berat atau ringan?',
      answer: 'The backpack is light.', answerId: 'Tas ranselnya ringan.',
    },

    // on the cafe table
    {
      id: 'coffee', word: 'coffee', wordId: 'kopi', emoji: '☕', x: 835, y: 838, size: 95,
      sentence: 'Daddy drinks hot coffee.', sentenceId: 'Ayah minum kopi panas.',
      question: 'Is the coffee hot or cold?', questionId: 'Kopinya panas atau dingin?',
      answer: 'The coffee is hot.', answerId: 'Kopinya panas.',
    },
    {
      id: 'croissant', word: 'croissant', wordId: 'roti croissant', emoji: '🥐', x: 948, y: 840, size: 95,
      sentence: 'I eat a croissant for breakfast.', sentenceId: 'Aku makan croissant untuk sarapan.',
      question: 'Is the croissant yummy?', questionId: 'Croissant-nya enak?',
      answer: 'Yes, it is yummy!', answerId: 'Ya, enak sekali!',
    },

    // on the floor
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 95, y: 775, size: 170,
      sentence: 'The plant likes the sunny window.', sentenceId: 'Tanamannya suka jendela yang cerah.',
      question: 'What color are the leaves?', questionId: 'Daunnya warna apa?',
      answer: 'The leaves are green.', answerId: 'Daunnya hijau.',
    },
    {
      id: 'suitcase', word: 'suitcase', wordId: 'koper', emoji: '🧳', x: 1415, y: 1030, size: 170,
      sentence: 'We pack the suitcase for our holiday.', sentenceId: 'Kita mengisi koper untuk liburan.',
      question: 'Is the suitcase blue?', questionId: 'Apakah kopernya biru?',
      answer: 'Yes, the suitcase is blue.', answerId: 'Ya, kopernya biru.',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 520, y: 1060, size: 170,
      sentence: 'The dog wags its tail.', sentenceId: 'Anjingnya mengibaskan ekornya.',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof, woof!', answerId: 'Guk, guk!',
    },
    {
      id: 'sunglasses', word: 'sunglasses', wordId: 'kacamata hitam', emoji: '🕶️', x: 170, y: 1080, size: 115,
      sentence: 'I wear sunglasses at the beach.', sentenceId: 'Aku pakai kacamata hitam di pantai.',
      question: 'Can you put on sunglasses?', questionId: 'Bisa pakai kacamata hitam?',
      answer: 'Yes! I look cool!', answerId: 'Bisa! Aku keren!',
    },
    {
      id: 'camera', word: 'camera', wordId: 'kamera', emoji: '📷', x: 900, y: 1095, size: 120,
      sentence: 'Click! I take a photo.', sentenceId: 'Cekrek! Aku ambil foto.',
      question: 'Can you smile for the camera?', questionId: 'Bisa senyum ke kamera?',
      answer: 'Cheese! Big smile!', answerId: 'Ciis! Senyum lebar!',
    },
  ],
};

export default airport;

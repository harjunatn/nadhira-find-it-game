// Dentist scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

function Background() {
  const tiles = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 13; col++) {
      tiles.push(
        <rect
          key={`${row}-${col}`}
          x={col * 130 - (row % 2) * 65}
          y={760 + row * 80}
          width="126"
          height="76"
          rx="6"
          fill={(row + col) % 2 ? '#e6f2fb' : '#f4f9fd'}
        />,
      );
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="dentist-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdeee3" />
          <stop offset="1" stopColor="#e4f8f3" />
        </linearGradient>
        <pattern id="dentist-waves" width="160" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 Q40 10 80 30 T160 30" fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.45" />
        </pattern>
      </defs>
      <rect width="1600" height="770" fill="url(#dentist-wall)" />
      <rect width="1600" height="770" fill="url(#dentist-waves)" />
      <rect width="1600" height="26" fill="#8fd9c8" />
      <rect y="760" width="1600" height="440" fill="#d7e8f5" />
      {tiles}
      <rect y="744" width="1600" height="22" fill="#ffffff" />

      {/* soft shadows */}
      <ellipse cx="300" cy="790" rx="180" ry="16" fill="#000" opacity="0.08" />
      <ellipse cx="560" cy="790" rx="110" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="930" cy="1000" rx="230" ry="22" fill="#000" opacity="0.1" />
      <ellipse cx="1230" cy="880" rx="90" ry="14" fill="#000" opacity="0.08" />

      {/* x-ray light box */}
      <rect x="465" y="240" width="190" height="170" rx="14" fill="#ffffff" stroke="#9bc7d6" strokeWidth="5" />
      <rect x="480" y="255" width="160" height="140" rx="8" fill="#26384d" />

      {/* tray cart beside the chair */}
      <rect x="470" y="628" width="180" height="16" rx="6" fill="#b7c7d6" />
      <rect x="552" y="644" width="16" height="130" rx="6" fill="#9fb2c4" />
      <rect x="500" y="770" width="120" height="12" rx="6" fill="#9fb2c4" />

      {/* shelf on the right */}
      <rect x="1410" y="520" width="170" height="20" rx="6" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
      <path d="M1430 540 L1450 572 L1470 540 Z M1520 540 L1540 572 L1560 540 Z" fill="#d9844a" />

      <ellipse cx="1290" cy="842" rx="210" ry="14" fill="#000" opacity="0.08" />

      {/* lamp arm from the ceiling */}
      <rect x="916" y="26" width="16" height="190" rx="8" fill="#9fb2c4" />
    </g>
  );
}

// Drawn in front of the dentist so they stand behind it.
function Desk() {
  return (
    <g>
      <rect x="1090" y="700" width="410" height="140" rx="14" fill="#ffffff" stroke="#9bc7d6" strokeWidth="5" />
      <rect x="1075" y="688" width="440" height="24" rx="8" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="4" />
    </g>
  );
}

function DentistChair() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="2" cy="46" rx="30" ry="5" fill="#7d8fa3" />
      <rect x="-8" y="22" width="16" height="24" rx="4" fill="#a9bacb" stroke="#7d8fa3" strokeWidth="1.2" />
      <path d="M -36 10 L -50 -26 Q -52 -32 -45 -33 L -40 -33 Q -35 -32 -33 -27 L -22 6 Z" fill="#3fb6d9" stroke="#1f8fb3" strokeWidth="1.4" />
      <rect x="-54" y="-42" width="16" height="11" rx="5" fill="#3fb6d9" stroke="#1f8fb3" strokeWidth="1.4" />
      <rect x="-36" y="6" width="56" height="16" rx="7" fill="#3fb6d9" stroke="#1f8fb3" strokeWidth="1.4" />
      <path d="M 16 8 L 46 26 Q 50 29 46 33 L 42 35 L 12 20 Z" fill="#3fb6d9" stroke="#1f8fb3" strokeWidth="1.4" />
      <rect x="-14" y="-2" width="30" height="5" rx="2.5" fill="#d6e3ee" stroke="#9fb2c4" strokeWidth="1" />
      <path d="M -30 -12 L -24 6" stroke="#8fe0f5" strokeWidth="2" />
    </g>
  );
}

function DentalLamp() {
  return (
    <g strokeLinejoin="round">
      <path d="M -24 18 L 24 18 L 46 70 L -46 70 Z" fill="#fff6a8" opacity="0.45" />
      <rect x="-4" y="-50" width="8" height="40" rx="4" fill="#9fb2c4" />
      <path d="M -34 -6 Q 0 -26 34 -6 L 28 16 Q 0 24 -28 16 Z" fill="#e9f1f7" stroke="#8aa0b4" strokeWidth="2.5" />
      <ellipse cx="0" cy="14" rx="24" ry="6" fill="#fff3a0" stroke="#e8c84a" strokeWidth="2" />
      <circle cx="-8" cy="-8" r="3" fill="#ffffff" />
    </g>
  );
}

function Sink() {
  return (
    <g strokeLinejoin="round">
      <rect x="-42" y="-6" width="84" height="54" rx="6" fill="#ffffff" stroke="#a9c3d6" strokeWidth="2" />
      <line x1="0" y1="0" x2="0" y2="44" stroke="#c8d9e6" strokeWidth="2" />
      <circle cx="-7" cy="22" r="2.4" fill="#a9c3d6" />
      <circle cx="7" cy="22" r="2.4" fill="#a9c3d6" />
      <rect x="-46" y="-14" width="92" height="10" rx="4" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="1.5" />
      <ellipse cx="0" cy="-15" rx="26" ry="5" fill="#dff1fa" stroke="#a9c3d6" strokeWidth="1.5" />
      <path d="M 8 -16 L 8 -34 Q 8 -40 2 -40 L -6 -40" fill="none" stroke="#9fb2c4" strokeWidth="5" strokeLinecap="round" />
      <circle cx="14" cy="-22" r="4" fill="#4fb3d9" />
    </g>
  );
}

function Toothpaste() {
  return (
    <g strokeLinejoin="round" transform="rotate(-18)">
      <path d="M -42 -12 L 28 -9 L 28 9 L -42 12 Z" fill="#ffffff" stroke="#6b8db3" strokeWidth="2.5" />
      <rect x="-30" y="-10" width="12" height="20" fill="#4f8df5" />
      <rect x="-14" y="-10" width="7" height="20" fill="#ff5a5f" />
      <rect x="28" y="-6" width="12" height="12" rx="2" fill="#4f8df5" stroke="#2f62c0" strokeWidth="2" />
      <path d="M 40 0 Q 50 -2 48 -12 Q 46 -20 38 -18" fill="none" stroke="#8fe0c8" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-40" y="-40" width="80" height="78" rx="6" fill="#ffffff" />
      <rect x="-35" y="-35" width="70" height="68" rx="3" fill="#9fdcff" />
      <circle cx="-14" cy="-16" r="9" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="10" cy="-8" r="6" />
        <circle cx="18" cy="-11" r="7" />
        <circle cx="25" cy="-7" r="5" />
      </g>
      <path d="M -35 33 Q -10 14 12 26 Q 24 18 35 22 L 35 33 Z" fill="#7ed957" />
      <rect x="-1.5" y="-35" width="3" height="68" fill="#ffffff" />
      <rect x="-35" y="-2" width="70" height="3" fill="#ffffff" />
      <rect x="-46" y="38" width="92" height="7" rx="3" fill="#ffffff" stroke="#9bc7d6" strokeWidth="1" />
    </g>
  );
}

const dentist = {
  id: 'dentist',
  title: 'Dentist',
  titleId: 'Dokter Gigi',
  icon: '🦷',
  Background,
  Foreground: Desk,
  objects: [
    {
      id: 'dentist-chair', word: 'dentist chair', wordId: 'kursi dokter gigi', art: DentistChair, x: 930, y: 760, size: 520, hit: { w: 500, h: 330, dy: -10 },
      sentence: 'I sit in the dentist chair.', sentenceId: 'Aku duduk di kursi dokter gigi.',
      question: 'Is the chair big or small?', questionId: 'Kursinya besar atau kecil?',
      answer: 'The chair is big.', answerId: 'Kursinya besar.',
    },
    {
      id: 'lamp', word: 'lamp', wordId: 'lampu', art: DentalLamp, x: 925, y: 260, size: 240, hit: { w: 200, h: 120, dy: 0 },
      sentence: 'The lamp helps the dentist see.', sentenceId: 'Lampunya membantu dokter gigi melihat.',
      question: 'Is the lamp bright?', questionId: 'Apakah lampunya terang?',
      answer: 'Yes, it is very bright.', answerId: 'Ya, terang sekali.',
    },
    {
      id: 'dentist', word: 'dentist', wordId: 'dokter gigi', emoji: '🧑‍⚕️', x: 1240, y: 578, size: 270,
      sentence: 'The dentist checks my teeth.', sentenceId: 'Dokter gigi memeriksa gigiku.',
      question: 'Can you open your mouth wide?', questionId: 'Bisa buka mulut lebar-lebar?',
      answer: 'Aaah! My mouth is open.', answerId: 'Aaah! Mulutku terbuka.',
    },
    {
      id: 'tooth', word: 'tooth', wordId: 'gigi', emoji: '🦷', x: 1445, y: 635, size: 95,
      sentence: 'My teeth are white and strong.', sentenceId: 'Gigiku putih dan kuat.',
      question: 'How many teeth do you have?', questionId: 'Gigimu ada berapa?',
      answer: 'I have many teeth!', answerId: 'Gigiku banyak!',
    },
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 1495, y: 462, size: 115,
      sentence: 'The teddy bear has clean teeth.', sentenceId: 'Gigi boneka beruang itu bersih.',
      question: 'Is the teddy bear happy?', questionId: 'Apakah boneka beruangnya senang?',
      answer: 'Yes, it is happy.', answerId: 'Ya, dia senang.',
    },
    {
      id: 'sink', word: 'sink', wordId: 'wastafel', art: Sink, x: 300, y: 690, size: 260,
      sentence: 'I spit in the sink.', sentenceId: 'Aku meludah di wastafel.',
      question: 'Is the sink clean?', questionId: 'Apakah wastafelnya bersih?',
      answer: 'Yes, the sink is clean.', answerId: 'Ya, wastafelnya bersih.',
    },
    {
      id: 'cup', word: 'cup', wordId: 'gelas', emoji: '🥤', x: 395, y: 612, size: 90,
      sentence: 'I rinse my mouth with water.', sentenceId: 'Aku berkumur dengan air.',
      question: 'Can you swish and spit?', questionId: 'Bisa kumur-kumur lalu buang?',
      answer: 'Swish, swish, spit!', answerId: 'Kumur, kumur, buang!',
    },
    {
      id: 'toothbrush', word: 'toothbrush', wordId: 'sikat gigi', emoji: '🪥', x: 195, y: 615, size: 95, rotate: -10,
      sentence: 'I brush my teeth every day.', sentenceId: 'Aku sikat gigi setiap hari.',
      question: 'Do you brush in the morning?', questionId: 'Kamu sikat gigi di pagi hari?',
      answer: 'Yes, I brush every morning.', answerId: 'Ya, aku sikat gigi tiap pagi.',
    },
    {
      id: 'toothpaste', word: 'toothpaste', wordId: 'pasta gigi', art: Toothpaste, x: 290, y: 622, size: 100,
      sentence: 'I put toothpaste on my brush.', sentenceId: 'Aku menaruh pasta gigi di sikatku.',
      question: 'Does toothpaste taste minty?', questionId: 'Apakah pasta gigi rasanya mint?',
      answer: 'Yes, it is minty!', answerId: 'Ya, rasanya mint!',
    },
    {
      id: 'mirror', word: 'mirror', wordId: 'cermin', emoji: '🪞', x: 300, y: 400, size: 170,
      sentence: 'I smile in the mirror.', sentenceId: 'Aku tersenyum di depan cermin.',
      question: 'Can you show me your teeth?', questionId: 'Bisa tunjukkan gigimu?',
      answer: 'Look at my big smile!', answerId: 'Lihat senyumku yang lebar!',
    },
    {
      id: 'xray', word: 'x-ray', wordId: 'foto rontgen', emoji: '🩻', x: 560, y: 325, size: 135,
      sentence: 'The x-ray shows my bones.', sentenceId: 'Foto rontgen menunjukkan tulangku.',
      question: 'Can you see the bones?', questionId: 'Bisa lihat tulangnya?',
      answer: 'Yes, I can see them.', answerId: 'Ya, aku bisa melihatnya.',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam', emoji: '🕰️', x: 1100, y: 160, size: 130,
      sentence: 'We wait for our turn.', sentenceId: 'Kita menunggu giliran.',
      question: 'Can you wait nicely?', questionId: 'Bisa menunggu dengan sabar?',
      answer: 'Yes, I can wait.', answerId: 'Ya, aku bisa menunggu.',
    },
    {
      id: 'gloves', word: 'gloves', wordId: 'sarung tangan', emoji: '🧤', x: 500, y: 588, size: 90,
      sentence: 'The dentist wears gloves.', sentenceId: 'Dokter gigi memakai sarung tangan.',
      question: 'How many hands do you have?', questionId: 'Tanganmu ada berapa?',
      answer: 'I have two hands.', answerId: 'Tanganku ada dua.',
    },
    {
      id: 'timer', word: 'sand timer', wordId: 'jam pasir', emoji: '⌛', x: 595, y: 585, size: 85,
      sentence: 'Brush your teeth for two minutes.', sentenceId: 'Sikat gigi selama dua menit.',
      question: 'Can you brush until the sand stops?', questionId: 'Bisa sikat gigi sampai pasirnya habis?',
      answer: 'Yes, I can!', answerId: 'Ya, aku bisa!',
    },
    {
      id: 'clipboard', word: 'clipboard', wordId: 'papan catatan', emoji: '📋', x: 1080, y: 420, size: 110,
      sentence: 'The dentist writes on the clipboard.', sentenceId: 'Dokter gigi menulis di papan catatan.',
      question: 'Can you write your name?', questionId: 'Bisa menulis namamu?',
      answer: 'Yes, I can write my name.', answerId: 'Ya, aku bisa menulis namaku.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 1430, y: 250, size: 260, hit: { w: 230, h: 230 },
      sentence: 'The sun shines through the window.', sentenceId: 'Matahari bersinar lewat jendela.',
      question: 'Is it sunny today?', questionId: 'Hari ini cerah?',
      answer: 'Yes, it is sunny.', answerId: 'Ya, cerah.',
    },
    {
      id: 'star', word: 'star', wordId: 'bintang', emoji: '🌟', x: 150, y: 170, size: 120,
      sentence: 'I get a star for being brave.', sentenceId: 'Aku dapat bintang karena berani.',
      question: 'Are you brave?', questionId: 'Kamu berani?',
      answer: 'Yes, I am brave!', answerId: 'Ya, aku berani!',
    },
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 1490, y: 990, size: 160,
      sentence: 'I get a balloon after my visit.', sentenceId: 'Aku dapat balon setelah periksa.',
      question: 'Do you like balloons?', questionId: 'Kamu suka balon?',
      answer: 'Yes, I love balloons!', answerId: 'Ya, aku suka sekali balon!',
    },
    {
      id: 'books', word: 'books', wordId: 'buku-buku', emoji: '📚', x: 430, y: 1060, size: 125,
      sentence: 'I read books while I wait.', sentenceId: 'Aku membaca buku sambil menunggu.',
      question: 'Do you like stories?', questionId: 'Kamu suka cerita?',
      answer: 'Yes, I like stories.', answerId: 'Ya, aku suka cerita.',
    },
    {
      id: 'candy', word: 'candy', wordId: 'permen', emoji: '🍬', x: 660, y: 1090, size: 95, rotate: 15,
      sentence: 'Too much candy is bad for teeth.', sentenceId: 'Terlalu banyak permen tidak baik untuk gigi.',
      question: 'Do you eat candy every day?', questionId: 'Kamu makan permen setiap hari?',
      answer: 'No, only sometimes.', answerId: 'Tidak, hanya kadang-kadang.',
    },
    {
      id: 'chair', word: 'chair', wordId: 'kursi', emoji: '🪑', x: 200, y: 960, size: 190,
      sentence: 'I wait on the chair.', sentenceId: 'Aku menunggu di kursi.',
      question: 'Can you sit still?', questionId: 'Bisa duduk diam?',
      answer: 'Yes, I can sit still.', answerId: 'Ya, aku bisa duduk diam.',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 1250, y: 1050, size: 170,
      sentence: 'The plant is green and tall.', sentenceId: 'Tanamannya hijau dan tinggi.',
      question: 'Is the plant big or small?', questionId: 'Tanamannya besar atau kecil?',
      answer: 'The plant is big.', answerId: 'Tanamannya besar.',
    },
  ],
};

export default dentist;

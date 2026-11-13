// Hospital scene: a friendly children's hospital room.
// Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

function Background() {
  const tiles = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 14; col++) {
      if ((row + col) % 2) {
        tiles.push(<rect key={`${row}-${col}`} x={col * 120} y={766 + row * 76} width="120" height="76" fill="#eefaf4" />);
      }
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="hospital-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe7fb" />
          <stop offset="1" stopColor="#e8f4ff" />
        </linearGradient>
        <pattern id="hospital-dots" width="110" height="110" patternUnits="userSpaceOnUse">
          <circle cx="27" cy="27" r="6" fill="#ffffff" opacity="0.55" />
          <circle cx="82" cy="82" r="6" fill="#ffffff" opacity="0.55" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height="770" fill="url(#hospital-wall)" />
      <rect width="1600" height="560" fill="url(#hospital-dots)" />
      <rect y="560" width="1600" height="200" fill="#dff3ec" />
      <rect y="552" width="1600" height="14" rx="4" fill="#ffffff" />
      <rect width="1600" height="26" fill="#8ec9f0" />

      {/* floor */}
      <rect y="760" width="1600" height="440" fill="#d9f0e5" />
      {tiles}
      <rect y="744" width="1600" height="22" fill="#ffffff" />
      <rect y="766" width="1600" height="5" fill="#bfe3d3" />

      {/* little cork board for get-well cards */}
      <rect x="232" y="196" width="138" height="118" rx="10" fill="#ecc896" stroke="#c48a4e" strokeWidth="6" />
      <circle cx="252" cy="214" r="5" fill="#ff7a8a" />
      <circle cx="350" cy="296" r="5" fill="#4f8df5" />

      {/* shelf under the clock */}
      <rect x="950" y="222" width="124" height="14" rx="5" fill="#f4b46c" stroke="#d9904a" strokeWidth="3" />

      {/* soft shadows */}
      <ellipse cx="290" cy="800" rx="80" ry="10" fill="#000" opacity="0.08" />
      <ellipse cx="650" cy="880" rx="285" ry="18" fill="#000" opacity="0.1" />
      <ellipse cx="1025" cy="802" rx="105" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="1035" cy="1082" rx="180" ry="14" fill="#000" opacity="0.09" />
      <ellipse cx="1365" cy="858" rx="230" ry="16" fill="#000" opacity="0.08" />
      <ellipse cx="1405" cy="1118" rx="120" ry="14" fill="#000" opacity="0.09" />

      {/* bedside table */}
      <rect x="938" y="658" width="174" height="142" rx="10" fill="#f6c98f" stroke="#d9984f" strokeWidth="4" />
      <line x1="938" y1="722" x2="1112" y2="722" stroke="#d9984f" strokeWidth="4" />
      <circle cx="1025" cy="692" r="7" fill="#fff3d6" />
      <circle cx="1025" cy="760" r="7" fill="#fff3d6" />
      <rect x="926" y="642" width="198" height="22" rx="8" fill="#ffd9a6" stroke="#d9984f" strokeWidth="4" />

      {/* balloon string, tied to the foot of the bed */}
      <path d="M 893 496 Q 904 560 884 628" fill="none" stroke="#5aa7d6" strokeWidth="3" strokeLinecap="round" />

      {/* nurse's trolley */}
      <rect x="890" y="938" width="11" height="124" rx="4" fill="#c9d6e3" stroke="#9fb2c4" strokeWidth="2" />
      <rect x="1166" y="938" width="11" height="124" rx="4" fill="#c9d6e3" stroke="#9fb2c4" strokeWidth="2" />
      <rect x="880" y="1008" width="306" height="14" rx="5" fill="#e3edf6" stroke="#9fb2c4" strokeWidth="3" />
      <path d="M 1188 932 L 1210 912" stroke="#9fb2c4" strokeWidth="8" strokeLinecap="round" />
      <rect x="866" y="926" width="334" height="20" rx="7" fill="#ffffff" stroke="#9fb2c4" strokeWidth="4" />
      <rect x="874" y="944" width="318" height="6" rx="3" fill="#8ec9f0" />
      <circle cx="895" cy="1068" r="10" fill="#6c7a8c" stroke="#4a5666" strokeWidth="3" />
      <circle cx="1171" cy="1068" r="10" fill="#6c7a8c" stroke="#4a5666" strokeWidth="3" />
    </g>
  );
}

// The doctor's desk is drawn in front of the doctor.
function Desk() {
  return (
    <g>
      <rect x="1150" y="712" width="430" height="140" rx="14" fill="#ffe3a8" stroke="#e8b04a" strokeWidth="5" />
      <rect x="1182" y="742" width="366" height="82" rx="12" fill="none" stroke="#f5c96a" strokeWidth="4" />
      <rect x="1135" y="698" width="460" height="24" rx="8" fill="#fff4d6" stroke="#e8b04a" strokeWidth="4" />
    </g>
  );
}

function HospitalBed() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* wheels and legs */}
      <rect x="-41.5" y="13" width="3" height="13" rx="1" fill="#c9d6e3" stroke="#9fb2c4" strokeWidth="0.8" />
      <rect x="35.5" y="13" width="3" height="13" rx="1" fill="#c9d6e3" stroke="#9fb2c4" strokeWidth="0.8" />
      <circle cx="-40" cy="28" r="3.6" fill="#6c7a8c" stroke="#4a5666" strokeWidth="1" />
      <circle cx="37" cy="28" r="3.6" fill="#6c7a8c" stroke="#4a5666" strokeWidth="1" />
      <circle cx="-40" cy="28" r="1.2" fill="#c9d6e3" />
      <circle cx="37" cy="28" r="1.2" fill="#c9d6e3" />
      {/* frame */}
      <rect x="-46" y="9" width="92" height="6" rx="2" fill="#e3edf6" stroke="#9fb2c4" strokeWidth="1" />
      {/* headboard and footboard */}
      <path d="M -48 14 L -48 -24 Q -48 -30 -43 -30 Q -38 -30 -38 -24 L -38 14 Z" fill="#8fd3f5" stroke="#4aa8d8" strokeWidth="1.2" />
      <rect x="-45.5" y="-22" width="5" height="28" rx="2" fill="#bfe6fb" />
      <path d="M 38 14 L 38 -9 Q 38 -14 43 -14 Q 48 -14 48 -9 L 48 14 Z" fill="#8fd3f5" stroke="#4aa8d8" strokeWidth="1.2" />
      <rect x="40.5" y="-8" width="5" height="16" rx="2" fill="#bfe6fb" />
      {/* mattress */}
      <rect x="-38" y="-2" width="76" height="12" rx="3" fill="#ffffff" stroke="#c9d6e3" strokeWidth="1" />
      {/* pillow, propped up */}
      <path d="M -37 -1 Q -39 -12 -33 -17 Q -26 -20 -19 -14 Q -15 -8 -17 -1 Z" fill="#ffffff" stroke="#a9c3d6" strokeWidth="1.2" />
      <path d="M -31 -11 Q -26 -13 -22 -9" fill="none" stroke="#d6e3ee" strokeWidth="1.2" />
      {/* blanket */}
      <path d="M -20 -5 Q 9 -8 38 -5 L 38 12 Q 9 14 -20 12 Z" fill="#ffb3c6" stroke="#e07a98" strokeWidth="1.2" />
      <path d="M -20 -5 Q -22 3 -20 12 L -14 12 Q -16 3 -14 -5 Z" fill="#ffd6e2" stroke="#e07a98" strokeWidth="1" />
      <g fill="#ffffff" opacity="0.9">
        <circle cx="-6" cy="1" r="1.6" />
        <circle cx="6" cy="7" r="1.6" />
        <circle cx="16" cy="0" r="1.6" />
        <circle cx="28" cy="6" r="1.6" />
        <circle cx="2" cy="-1" r="1.2" />
        <circle cx="22" cy="9" r="1.2" />
      </g>
    </g>
  );
}

function HeartMonitor() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* stand */}
      <path d="M 0 42 L -18 46 M 0 42 L 18 46" stroke="#9fb2c4" strokeWidth="3" />
      <circle cx="-18" cy="46" r="3" fill="#6c7a8c" />
      <circle cx="18" cy="46" r="3" fill="#6c7a8c" />
      <rect x="-2" y="-10" width="4" height="53" rx="2" fill="#c9d6e3" stroke="#9fb2c4" strokeWidth="0.8" />
      {/* monitor */}
      <rect x="-27" y="-50" width="54" height="42" rx="6" fill="#f4f7fb" stroke="#8aa0b4" strokeWidth="1.6" />
      <rect x="-22" y="-45" width="44" height="27" rx="3" fill="#1f3b4d" />
      <path d="M -20 -30 L -10 -30 L -7 -36 L -3 -22 L 1 -40 L 4 -30 L 20 -30" fill="none" stroke="#5ef08a" strokeWidth="1.8" />
      <path d="M 14 -41 C 13 -43.5 9.5 -42.5 10.5 -40 L 14 -36.5 L 17.5 -40 C 18.5 -42.5 15 -43.5 14 -41 Z" fill="#ff5a7a" />
      <circle cx="-15" cy="-13" r="2.2" fill="#34c472" />
      <circle cx="-8" cy="-13" r="2.2" fill="#ffd23f" />
      <rect x="6" y="-14.5" width="14" height="3" rx="1.5" fill="#c9d6e3" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-46" y="-38" width="92" height="76" rx="6" fill="#ffffff" stroke="#a9c7de" strokeWidth="1.2" />
      <rect x="-42" y="-34" width="84" height="68" rx="3" fill="#a8dcff" />
      <circle cx="-27" cy="-19" r="7" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="6" cy="-22" r="4.5" />
        <circle cx="12" cy="-25" r="6" />
        <circle cx="18" cy="-21" r="4.5" />
        <rect x="6" y="-22" width="12" height="4.5" />
      </g>
      <path d="M -42 22 Q -20 4 2 14 Q 22 4 42 12 L 42 34 L -42 34 Z" fill="#7ed957" />
      <rect x="-34" y="4" width="3" height="12" fill="#8a4b2a" />
      <circle cx="-32.5" cy="2" r="7" fill="#4cbf4c" />
      {/* road */}
      <rect x="-42" y="22" width="84" height="12" fill="#b9c3cf" />
      <g fill="#ffffff">
        <rect x="-38" y="27" width="8" height="2" rx="1" />
        <rect x="-22" y="27" width="8" height="2" rx="1" />
        <rect x="-6" y="27" width="8" height="2" rx="1" />
        <rect x="10" y="27" width="8" height="2" rx="1" />
        <rect x="26" y="27" width="8" height="2" rx="1" />
      </g>
      {/* top window bar */}
      <rect x="-42" y="-12" width="84" height="2.5" fill="#ffffff" />
      <rect x="-1.25" y="-34" width="2.5" height="22" fill="#ffffff" />
      {/* sill */}
      <rect x="-50" y="36" width="100" height="6" rx="2.5" fill="#ffffff" stroke="#a9c7de" strokeWidth="1" />
    </g>
  );
}

function Curtain() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-16" y="-50" width="32" height="3.5" rx="1.75" fill="#9fb2c4" />
      {[-12, -6, 0, 6, 12].map((x) => (
        <circle key={x} cx={x} cy="-46.5" r="1.4" fill="none" stroke="#7d8fa3" strokeWidth="0.8" />
      ))}
      <path d="M -14 -46 L 14 -46 C 13 -30 4 -14 1 -3 C 3 12 8 32 11 47 Q 5 49 -1 47 Q -7 49 -14 47 Z" fill="#ffe08a" stroke="#e0a83a" strokeWidth="1" />
      <path d="M -7 -46 Q -5 -24 -6 -4 Q -8 22 -8 47" fill="none" stroke="#f2c252" strokeWidth="1.2" />
      <path d="M 1 -46 Q 0 -24 -3 -4 Q -2 22 0 47" fill="none" stroke="#f2c252" strokeWidth="1.2" />
      <path d="M 8 -46 Q 5 -24 0 -4 Q 3 22 6 47" fill="none" stroke="#f2c252" strokeWidth="1.2" />
      <g fill="#ffffff" opacity="0.85">
        <circle cx="-10" cy="-36" r="1.1" />
        <circle cx="-3" cy="-28" r="1.1" />
        <circle cx="5" cy="-38" r="1.1" />
        <circle cx="-9" cy="-16" r="1.1" />
        <circle cx="-2" cy="-10" r="1.1" />
        <circle cx="-10" cy="10" r="1.1" />
        <circle cx="-3" cy="20" r="1.1" />
        <circle cx="4" cy="30" r="1.1" />
        <circle cx="-10" cy="34" r="1.1" />
        <circle cx="-4" cy="42" r="1.1" />
        <circle cx="6" cy="42" r="1.1" />
      </g>
      {/* tie-back */}
      <path d="M -15 -7 Q -6 -9 3 -6 L 3 -1 Q -6 -4 -15 -2 Z" fill="#4fb3a0" stroke="#2f8f7c" strokeWidth="0.8" />
    </g>
  );
}

function Slippers() {
  const one = (x, y, r) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M 0 -27 C 14 -27 16 -7 14 13 C 12 31 6 35 0 35 C -6 35 -12 31 -14 13 C -16 -7 -14 -27 0 -27 Z" fill="#e06d95" />
      <path d="M 0 -30 C 14 -30 16 -10 14 10 C 12 28 6 32 0 32 C -6 32 -12 28 -14 10 C -16 -10 -14 -30 0 -30 Z" fill="#ff8fb3" stroke="#d45d84" strokeWidth="1.6" />
      <path d="M 0 -25 C 9 -25 10 -12 9 2 L -9 2 C -10 -12 -9 -25 0 -25 Z" fill="#ffe0ea" />
      <path d="M -14 4 Q -10 -2 -5 2 Q 0 -3 5 2 Q 10 -2 14 4 C 12 26 6 32 0 32 C -6 32 -12 26 -14 4 Z" fill="#ffc2d6" stroke="#d45d84" strokeWidth="1.6" />
      <circle cx="0" cy="12" r="5.5" fill="#ffffff" stroke="#f0b8cb" strokeWidth="1" />
    </g>
  );
  return (
    <g strokeLinejoin="round">
      {one(-17, 2, -10)}
      {one(17, -4, 10)}
    </g>
  );
}

const hospital = {
  id: 'hospital',
  title: 'Hospital',
  titleId: 'Rumah Sakit',
  icon: '🏥',
  Background,
  Foreground: Desk,
  hideBehind: ['🎁', '🧺', '📦', '🛍️'],
  objects: [
    {
      id: 'curtain', word: 'curtain', wordId: 'gorden', art: Curtain, x: 115, y: 440, size: 780, hit: { w: 200, h: 760, dx: -5 },
      sentence: 'I close the curtain to sleep.', sentenceId: 'Aku menutup gorden untuk tidur.',
      question: 'Is the curtain open or closed?', questionId: 'Gordennya terbuka atau tertutup?',
      answer: 'The curtain is open.', answerId: 'Gordennya terbuka.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 660, y: 275, size: 400, hit: { w: 370, h: 310 },
      sentence: 'I look out the window.', sentenceId: 'Aku melihat ke luar jendela.',
      question: 'What can you see outside?', questionId: 'Kamu lihat apa di luar?',
      answer: 'I can see an ambulance!', answerId: 'Aku lihat ambulans!',
    },
    {
      id: 'ambulance', word: 'ambulance', wordId: 'ambulans', emoji: '🚑', x: 745, y: 338, size: 120,
      sentence: 'The ambulance goes nee-naw!', sentenceId: 'Ambulansnya bunyi nguing-nguing!',
      question: 'Can you say nee-naw?', questionId: 'Bisa bilang nguing-nguing?',
      answer: 'Nee-naw, nee-naw!', answerId: 'Nguing-nguing, nguing-nguing!',
    },
    {
      id: 'bed', word: 'bed', wordId: 'tempat tidur', art: HospitalBed, x: 650, y: 700, size: 540, hit: { w: 520, h: 300, dy: 0 },
      sentence: 'I rest in bed to feel better.', sentenceId: 'Aku istirahat di tempat tidur supaya cepat sembuh.',
      question: 'Does the bed have wheels?', questionId: 'Tempat tidurnya punya roda?',
      answer: 'Yes, it has wheels!', answerId: 'Ya, ada rodanya!',
    },
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 602, y: 616, size: 130,
      sentence: 'My teddy bear stays with me.', sentenceId: 'Boneka beruangku menemaniku.',
      question: 'Can you give Teddy a hug?', questionId: 'Bisa peluk boneka beruangnya?',
      answer: 'Yes! A big, soft hug!', answerId: 'Ya! Pelukan besar yang lembut!',
    },
    {
      id: 'book', word: 'book', wordId: 'buku', emoji: '📖', x: 790, y: 655, size: 90,
      sentence: 'Mom reads me a story.', sentenceId: 'Mama membacakan cerita untukku.',
      question: 'Do you like stories?', questionId: 'Kamu suka cerita?',
      answer: 'Yes, I love stories!', answerId: 'Ya, aku suka sekali cerita!',
    },
    {
      id: 'monitor', word: 'heart monitor', wordId: 'monitor jantung', art: HeartMonitor, x: 290, y: 655, size: 300, hit: { w: 170, h: 300, dy: -10 },
      sentence: 'The monitor goes beep, beep!', sentenceId: 'Monitornya bunyi bip, bip!',
      question: 'Can you say beep, beep?', questionId: 'Bisa bilang bip, bip?',
      answer: 'Beep, beep, beep!', answerId: 'Bip, bip, bip!',
    },
    {
      id: 'card', word: 'card', wordId: 'kartu', emoji: '💌', x: 301, y: 256, size: 105,
      sentence: 'My friend sent me a card.', sentenceId: 'Temanku mengirimiku kartu.',
      question: 'What is on the card?', questionId: 'Ada gambar apa di kartunya?',
      answer: 'A red heart!', answerId: 'Gambar hati merah!',
    },
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 935, y: 435, size: 150,
      sentence: 'My friend gave me a balloon.', sentenceId: 'Temanku memberiku balon.',
      question: 'What color is the balloon?', questionId: 'Balonnya warna apa?',
      answer: 'The balloon is red.', answerId: 'Balonnya merah.',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam', emoji: '🕰️', x: 1012, y: 168, size: 115,
      sentence: 'Tick-tock! Time to rest.', sentenceId: 'Tik-tok! Waktunya istirahat.',
      question: 'Can you say tick-tock?', questionId: 'Bisa bilang tik-tok?',
      answer: 'Tick-tock, tick-tock!', answerId: 'Tik-tok, tik-tok!',
    },
    {
      id: 'rainbow', word: 'rainbow', wordId: 'pelangi', emoji: '🌈', x: 1370, y: 215, size: 230,
      sentence: 'The rainbow makes me smile.', sentenceId: 'Pelanginya membuatku tersenyum.',
      question: 'Can you see red in the rainbow?', questionId: 'Bisa lihat warna merah di pelangi?',
      answer: 'Yes, I can see red.', answerId: 'Ya, aku bisa lihat merah.',
    },
    {
      id: 'flowers', word: 'flowers', wordId: 'bunga', emoji: '💐', x: 980, y: 588, size: 120,
      sentence: 'Grandma brings me flowers.', sentenceId: 'Nenek membawakanku bunga.',
      question: 'Do the flowers smell nice?', questionId: 'Bunganya wangi?',
      answer: 'Yes, they smell nice!', answerId: 'Ya, wangi sekali!',
    },
    {
      id: 'apple', word: 'apple', wordId: 'apel', emoji: '🍎', x: 1076, y: 608, size: 82,
      sentence: 'I eat an apple to get strong.', sentenceId: 'Aku makan apel supaya kuat.',
      question: 'Is the apple red or green?', questionId: 'Apelnya merah atau hijau?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'doctor', word: 'doctor', wordId: 'dokter', emoji: '🧑‍⚕️', x: 1372, y: 590, size: 260,
      sentence: 'The doctor helps me feel better.', sentenceId: 'Dokter membantuku cepat sembuh.',
      question: 'Can you say thank you, doctor?', questionId: 'Bisa bilang terima kasih, dokter?',
      answer: 'Thank you, doctor!', answerId: 'Terima kasih, dokter!',
    },
    {
      id: 'clipboard', word: 'clipboard', wordId: 'papan catatan', emoji: '📋', x: 1205, y: 652, size: 92,
      sentence: 'The doctor writes on the clipboard.', sentenceId: 'Dokter menulis di papan catatan.',
      question: 'Can you draw a happy face?', questionId: 'Bisa gambar wajah senang?',
      answer: 'Yes, here is my smile!', answerId: 'Ya, ini senyumku!',
    },
    {
      id: 'stethoscope', word: 'stethoscope', wordId: 'stetoskop', emoji: '🩺', x: 1528, y: 652, size: 95,
      sentence: 'The doctor listens to my heart.', sentenceId: 'Dokter mendengarkan detak jantungku.',
      question: 'Can you say thump, thump?', questionId: 'Bisa bilang dug, dug?',
      answer: 'Thump, thump, thump!', answerId: 'Dug, dug, dug!',
    },
    {
      id: 'thermometer', word: 'thermometer', wordId: 'termometer', emoji: '🌡️', x: 930, y: 897, size: 95, rotate: -20,
      sentence: 'The thermometer checks if I am hot.', sentenceId: 'Termometer memeriksa apakah badanku panas.',
      question: 'Do you feel hot or cold?', questionId: 'Kamu merasa panas atau dingin?',
      answer: 'I feel just right.', answerId: 'Tidak panas, tidak dingin.',
    },
    {
      id: 'bandage', word: 'bandage', wordId: 'plester', emoji: '🩹', x: 1032, y: 899, size: 90, rotate: 20,
      sentence: 'A bandage helps my cut get better.', sentenceId: 'Plester membantu lukaku sembuh.',
      question: 'What color is the bandage?', questionId: 'Plesternya warna apa?',
      answer: 'The bandage is blue.', answerId: 'Plesternya biru.',
    },
    {
      id: 'medicine', word: 'medicine', wordId: 'obat', emoji: '💊', x: 1130, y: 902, size: 82, rotate: 20,
      sentence: 'Only grown-ups give me medicine.', sentenceId: 'Hanya orang dewasa yang boleh memberiku obat.',
      question: 'Do you take medicine by yourself?', questionId: 'Kamu minum obat sendiri?',
      answer: 'No, a grown-up helps me.', answerId: 'Tidak, orang dewasa yang membantuku.',
    },
    {
      id: 'wheelchair', word: 'wheelchair', wordId: 'kursi roda', emoji: '🦽', x: 1405, y: 1010, size: 230,
      sentence: 'The wheelchair has big wheels.', sentenceId: 'Kursi roda punya roda besar.',
      question: 'Can you roll your arms like wheels?', questionId: 'Bisa putar tanganmu seperti roda?',
      answer: 'Roll, roll, roll!', answerId: 'Putar, putar, putar!',
    },
    {
      id: 'crutch', word: 'crutch', wordId: 'kruk', emoji: '🩼', x: 190, y: 1060, size: 200, rotate: 35,
      sentence: 'A crutch helps me walk.', sentenceId: 'Kruk membantuku berjalan.',
      question: 'Can you hop on one foot?', questionId: 'Bisa lompat dengan satu kaki?',
      answer: 'Hop, hop, hop!', answerId: 'Lompat, lompat, lompat!',
    },
    {
      id: 'slippers', word: 'slippers', wordId: 'sandal', art: Slippers, x: 520, y: 1010, size: 165,
      sentence: 'My slippers are soft and pink.', sentenceId: 'Sandalku lembut dan merah muda.',
      question: 'How many slippers can you see?', questionId: 'Ada berapa sandalnya?',
      answer: 'I can see two slippers.', answerId: 'Ada dua sandal.',
    },
    {
      id: 'puzzle', word: 'puzzle', wordId: 'puzzle', emoji: '🧩', x: 790, y: 1085, size: 105, rotate: 10,
      sentence: 'I do a puzzle while I rest.', sentenceId: 'Aku main puzzle sambil istirahat.',
      question: 'Is the puzzle green?', questionId: 'Puzzle-nya hijau?',
      answer: 'Yes, it is green.', answerId: 'Ya, warnanya hijau.',
    },
  ],
};

export default hospital;

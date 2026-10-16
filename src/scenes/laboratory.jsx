// Science laboratory scene. Coordinates are in a 1600 x 1200 picture.
// The long lab bench is drawn in front of the scientist (Foreground).

const SHELF = [235, 425];

function Background() {
  const tiles = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 16; col++) {
      if ((row + col) % 2) tiles.push(<rect key={`${row}-${col}`} x={col * 100} y={790 + row * 70} width="100" height="70" fill="#dfe7f2" />);
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="laboratory-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe3ff" />
          <stop offset="1" stopColor="#e9f2ff" />
        </linearGradient>
      </defs>
      <rect width="1600" height="790" fill="url(#laboratory-wall)" />
      {/* hexagon pattern */}
      {Array.from({ length: 30 }, (_, i) => {
        const x = 80 + (i % 10) * 160 + (Math.floor(i / 10) % 2) * 80;
        const y = 90 + Math.floor(i / 10) * 140;
        return <polygon key={i} points={[0, 1, 2, 3, 4, 5].map((k) => `${x + 26 * Math.cos((k * Math.PI) / 3)},${y + 26 * Math.sin((k * Math.PI) / 3)}`).join(' ')} fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.6" />;
      })}
      <rect width="1600" height="26" fill="#7fb2ee" />
      <rect y="790" width="1600" height="410" fill="#f1f5fb" />
      {tiles}
      <rect y="772" width="1600" height="22" fill="#ffffff" />

      {/* wall shelf on the left */}
      {SHELF.map((y) => (
        <g key={y}>
          <rect x="60" y={y} width="330" height="18" rx="6" fill="#9fb2c4" />
          <path d={`M90 ${y + 18} l18 26 l18 -26 Z M330 ${y + 18} l18 26 l18 -26 Z`} fill="#7d8fa3" />
        </g>
      ))}

      {/* low cabinet left and side table right */}
      <ellipse cx="220" cy="810" rx="180" ry="14" fill="#000" opacity="0.08" />
      <rect x="50" y="645" width="340" height="150" rx="12" fill="#ffffff" stroke="#9fb2c4" strokeWidth="5" />
      <line x1="220" y1="655" x2="220" y2="785" stroke="#c8d3de" strokeWidth="4" />
      <ellipse cx="1420" cy="910" rx="170" ry="14" fill="#000" opacity="0.08" />
      <rect x="1250" y="815" width="340" height="20" rx="8" fill="#9fb2c4" />
      <rect x="1275" y="835" width="16" height="70" rx="6" fill="#7d8fa3" />
      <rect x="1550" y="835" width="16" height="70" rx="6" fill="#7d8fa3" />

      {/* coat hook */}
      <circle cx="1180" cy="230" r="10" fill="#7d8fa3" />
      <ellipse cx="800" cy="830" rx="420" ry="20" fill="#000" opacity="0.1" />
    </g>
  );
}

function Bench() {
  return (
    <g>
      <rect x="420" y="660" width="760" height="150" rx="14" fill="#ffffff" stroke="#9fb2c4" strokeWidth="5" />
      <rect x="405" y="642" width="790" height="26" rx="8" fill="#4a5d75" />
      {[520, 680, 920, 1080].map((x) => (
        <rect key={x} x={x - 40} y="700" width="80" height="70" rx="8" fill="#eef3f9" stroke="#c8d3de" strokeWidth="3" />
      ))}
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-40" y="-42" width="80" height="80" rx="6" fill="#ffffff" />
      <rect x="-35" y="-37" width="70" height="70" rx="3" fill="#1f3b73" />
      <circle cx="14" cy="-16" r="10" fill="#fff3b0" />
      <circle cx="18" cy="-19" r="8" fill="#1f3b73" />
      {[[-22, -24], [-8, -6], [-24, 10], [6, 16], [24, 6], [-12, 24]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#ffffff" />
      ))}
      <rect x="-1.5" y="-37" width="3" height="70" fill="#ffffff" />
      <rect x="-35" y="-3" width="70" height="3" fill="#ffffff" />
      <rect x="-46" y="38" width="92" height="7" rx="3" fill="#ffffff" stroke="#9fb2c4" strokeWidth="1" />
    </g>
  );
}

const onShelf = (board, x, size) => ({ x, y: SHELF[board] - size * 0.42, size });
const onBench = (x, size) => ({ x, y: 645 - size * 0.42, size });

const laboratory = {
  id: 'laboratory',
  title: 'Laboratory',
  titleId: 'Laboratorium',
  icon: '🔬',
  Background,
  Foreground: Bench,
  objects: [
    {
      id: 'scientist', word: 'scientist', wordId: 'ilmuwan', emoji: '🧑‍🔬', x: 800, y: 520, size: 270,
      sentence: 'The scientist does experiments.', sentenceId: 'Ilmuwan itu melakukan percobaan.',
      question: 'Do you want to be a scientist?', questionId: 'Kamu mau jadi ilmuwan?',
      answer: 'Yes, I want to be one!', answerId: 'Ya, aku mau!',
    },
    {
      id: 'microscope', word: 'microscope', wordId: 'mikroskop', emoji: '🔬', ...onBench(510, 135),
      sentence: 'The microscope makes tiny things big.', sentenceId: 'Mikroskop membuat benda kecil jadi besar.',
      question: 'Can you look closely?', questionId: 'Bisa melihat dengan teliti?',
      answer: 'Wow, I see tiny things!', answerId: 'Wah, aku lihat benda kecil!',
    },
    {
      id: 'testtube', word: 'test tube', wordId: 'tabung reaksi', emoji: '🧪', ...onBench(625, 100),
      sentence: 'The test tube is long and thin.', sentenceId: 'Tabung reaksinya panjang dan tipis.',
      question: 'Is the test tube big or small?', questionId: 'Tabungnya besar atau kecil?',
      answer: 'The test tube is small.', answerId: 'Tabungnya kecil.',
    },
    {
      id: 'petri', word: 'petri dish', wordId: 'cawan petri', emoji: '🧫', ...onBench(990, 95),
      sentence: 'Tiny germs grow in the dish.', sentenceId: 'Kuman kecil tumbuh di cawan.',
      question: 'Do you wash your hands?', questionId: 'Kamu cuci tangan?',
      answer: 'Yes, I wash my hands.', answerId: 'Ya, aku cuci tangan.',
    },
    {
      id: 'flask', word: 'flask', wordId: 'labu kaca', emoji: '⚗️', ...onBench(1110, 115),
      sentence: 'The flask bubbles and fizzes.', sentenceId: 'Labu kacanya bergelembung dan berdesis.',
      question: 'Can you say fizz?', questionId: 'Bisa bilang fizz?',
      answer: 'Fizz, fizz, fizz!', answerId: 'Fizz, fizz, fizz!',
    },
    {
      id: 'dna', word: 'DNA', wordId: 'DNA', emoji: '🧬', ...onShelf(0, 130, 110),
      sentence: 'DNA looks like a twisty ladder.', sentenceId: 'DNA mirip tangga yang berpilin.',
      question: 'Can you twist like DNA?', questionId: 'Bisa berputar seperti DNA?',
      answer: 'Twist, twist, twist!', answerId: 'Putar, putar, putar!',
    },
    {
      id: 'magnet', word: 'magnet', wordId: 'magnet', emoji: '🧲', ...onShelf(0, 310, 105),
      sentence: 'The magnet sticks to metal.', sentenceId: 'Magnet menempel pada logam.',
      question: 'Is a magnet strong?', questionId: 'Apakah magnet kuat?',
      answer: 'Yes, it is strong!', answerId: 'Ya, kuat!',
    },
    {
      id: 'battery', word: 'battery', wordId: 'baterai', emoji: '🔋', ...onShelf(1, 130, 105),
      sentence: 'The battery gives power.', sentenceId: 'Baterai memberi tenaga listrik.',
      question: 'Do toys need batteries?', questionId: 'Apakah mainan butuh baterai?',
      answer: 'Yes, some toys do.', answerId: 'Ya, sebagian mainan butuh.',
    },
    {
      id: 'bulb', word: 'light bulb', wordId: 'bola lampu', emoji: '💡', ...onShelf(1, 310, 105),
      sentence: 'The light bulb is bright.', sentenceId: 'Bola lampunya terang.',
      question: 'Can you turn on the light?', questionId: 'Bisa menyalakan lampunya?',
      answer: 'Click! The light is on.', answerId: 'Klik! Lampunya menyala.',
    },
    {
      id: 'magnifier', word: 'magnifying glass', wordId: 'kaca pembesar', emoji: '🔍', x: 130, y: 600, size: 100,
      sentence: 'It makes things look bigger.', sentenceId: 'Benda jadi terlihat lebih besar.',
      question: 'Can you look at your finger?', questionId: 'Bisa lihat jarimu?',
      answer: 'Wow, my finger looks big!', answerId: 'Wah, jariku kelihatan besar!',
    },
    {
      id: 'scale', word: 'scale', wordId: 'timbangan', emoji: '⚖️', x: 300, y: 590, size: 120,
      sentence: 'The scale weighs things.', sentenceId: 'Timbangan untuk menimbang benda.',
      question: 'Is an apple heavy or light?', questionId: 'Apel itu berat atau ringan?',
      answer: 'An apple is light.', answerId: 'Apel itu ringan.',
    },
    {
      id: 'thermometer', word: 'thermometer', wordId: 'termometer', emoji: '🌡️', x: 560, y: 220, size: 120,
      sentence: 'It tells us if it is hot.', sentenceId: 'Termometer memberi tahu panas atau tidak.',
      question: 'Is it hot or cold today?', questionId: 'Hari ini panas atau dingin?',
      answer: 'It is hot today.', answerId: 'Hari ini panas.',
    },
    {
      id: 'labcoat', word: 'lab coat', wordId: 'jas lab', emoji: '🥼', x: 1180, y: 320, size: 160,
      sentence: 'Scientists wear a white coat.', sentenceId: 'Ilmuwan memakai jas putih.',
      question: 'What color is the lab coat?', questionId: 'Jas labnya warna apa?',
      answer: 'The lab coat is white.', answerId: 'Jas labnya putih.',
    },
    {
      id: 'stethoscope', word: 'stethoscope', wordId: 'stetoskop', emoji: '🩺', x: 1010, y: 300, size: 110,
      sentence: 'It listens to my heartbeat.', sentenceId: 'Alat ini mendengarkan detak jantungku.',
      question: 'Can you say boom, boom?', questionId: 'Bisa bilang dug, dug?',
      answer: 'Boom, boom, boom!', answerId: 'Dug, dug, dug!',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 1430, y: 270, size: 270, hit: { w: 230, h: 230 },
      sentence: 'The moon shines in the window.', sentenceId: 'Bulan bersinar di jendela.',
      question: 'Is it day or night?', questionId: 'Siang atau malam?',
      answer: 'It is night.', answerId: 'Sekarang malam.',
    },
    {
      id: 'telescope', word: 'telescope', wordId: 'teleskop', emoji: '🔭', x: 1430, y: 560, size: 190,
      sentence: 'The telescope shows the stars.', sentenceId: 'Teleskop memperlihatkan bintang.',
      question: 'Can you see the moon?', questionId: 'Bisa lihat bulan?',
      answer: 'Yes, I can see the moon!', answerId: 'Ya, aku bisa lihat bulan!',
    },
    {
      id: 'computer', word: 'computer', wordId: 'komputer', emoji: '💻', x: 1320, y: 765, size: 125,
      sentence: 'The scientist uses a computer.', sentenceId: 'Ilmuwan memakai komputer.',
      question: 'Can you use a computer?', questionId: 'Bisa pakai komputer?',
      answer: 'Yes, I can.', answerId: 'Ya, aku bisa.',
    },
    {
      id: 'goggles', word: 'goggles', wordId: 'kacamata pelindung', emoji: '🥽', x: 1430, y: 778, size: 90,
      sentence: 'Goggles keep my eyes safe.', sentenceId: 'Kacamata pelindung menjaga mataku.',
      question: 'Where do goggles go?', questionId: 'Kacamata pelindung dipakai di mana?',
      answer: 'On my eyes!', answerId: 'Di mataku!',
    },
    {
      id: 'rocket', word: 'rocket', wordId: 'roket', emoji: '🚀', x: 1530, y: 760, size: 115,
      sentence: 'The rocket can fly to space.', sentenceId: 'Roket bisa terbang ke luar angkasa.',
      question: 'Do you want to go to space?', questionId: 'Kamu mau ke luar angkasa?',
      answer: 'Yes! Three, two, one, blast off!', answerId: 'Ya! Tiga, dua, satu, meluncur!',
    },
    {
      id: 'extinguisher', word: 'fire extinguisher', wordId: 'alat pemadam api', emoji: '🧯', x: 110, y: 980, size: 140,
      sentence: 'It keeps us safe from fire.', sentenceId: 'Alat ini menjaga kita dari api.',
      question: 'Is it red?', questionId: 'Apakah warnanya merah?',
      answer: 'Yes, it is red.', answerId: 'Ya, merah.',
    },
    {
      id: 'robotarm', word: 'robot arm', wordId: 'lengan robot', emoji: '🦾', x: 360, y: 1030, size: 150,
      sentence: 'The robot arm can lift things.', sentenceId: 'Lengan robot bisa mengangkat benda.',
      question: 'Can you lift your arm?', questionId: 'Bisa angkat tanganmu?',
      answer: 'Yes, look, I can!', answerId: 'Ya, lihat, aku bisa!',
    },
    {
      id: 'bone', word: 'bone', wordId: 'tulang', emoji: '🦴', x: 640, y: 1080, size: 115, rotate: -15,
      sentence: 'This bone is from a dinosaur!', sentenceId: 'Tulang ini dari dinosaurus!',
      question: 'Do you like dinosaurs?', questionId: 'Kamu suka dinosaurus?',
      answer: 'Yes, dinosaurs are cool!', answerId: 'Ya, dinosaurus keren!',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🌱', x: 900, y: 1070, size: 110,
      sentence: 'The little plant is growing.', sentenceId: 'Tanaman kecil itu tumbuh.',
      question: 'What does a plant need?', questionId: 'Tanaman butuh apa?',
      answer: 'Water and sunshine!', answerId: 'Air dan sinar matahari!',
    },
    {
      id: 'hamster', word: 'hamster', wordId: 'hamster', emoji: '🐹', x: 1160, y: 1060, size: 125,
      sentence: 'The hamster is our class pet.', sentenceId: 'Hamster itu hewan peliharaan kami.',
      question: 'Is the hamster big or small?', questionId: 'Hamsternya besar atau kecil?',
      answer: 'The hamster is small.', answerId: 'Hamsternya kecil.',
    },
  ],
};

export default laboratory;

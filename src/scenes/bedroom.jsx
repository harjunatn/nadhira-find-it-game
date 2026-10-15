// Bedroom scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

function Background() {
  const planks = [];
  for (let row = 0; row < 8; row++) {
    const y = 790 + row * 52;
    planks.push(<line key={`r${row}`} x1="0" x2="1600" y1={y} y2={y} stroke="#c88b52" strokeWidth="4" opacity="0.55" />);
    for (let x = (row * 173) % 320; x < 1600; x += 320) {
      planks.push(<line key={`j${row}-${x}`} x1={x} x2={x} y1={y} y2={y + 52} stroke="#c88b52" strokeWidth="3" opacity="0.45" />);
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="bedroom-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4c6ff" />
          <stop offset="1" stopColor="#efe9ff" />
        </linearGradient>
        <linearGradient id="bedroom-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfa56b" />
          <stop offset="1" stopColor="#efbf88" />
        </linearGradient>
        <pattern id="bedroom-dots" width="90" height="90" patternUnits="userSpaceOnUse">
          <circle cx="22" cy="22" r="7" fill="#ffffff" opacity="0.5" />
          <circle cx="67" cy="67" r="7" fill="#ffffff" opacity="0.5" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height="790" fill="url(#bedroom-wall)" />
      <rect width="1600" height="790" fill="url(#bedroom-dots)" />
      <rect width="1600" height="26" fill="#b7a3f2" />

      {/* floor */}
      <rect y="790" width="1600" height="410" fill="url(#bedroom-floor)" />
      {planks}
      <rect y="766" width="1600" height="26" fill="#ffffff" />
      <rect y="790" width="1600" height="6" fill="#c9b8f0" />

      {/* soft shadows on the floor */}
      <ellipse cx="185" cy="792" rx="150" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="450" cy="796" rx="140" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="785" cy="806" rx="185" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="1025" cy="806" rx="70" ry="12" fill="#000" opacity="0.1" />
      <ellipse cx="1320" cy="848" rx="250" ry="20" fill="#000" opacity="0.12" />

      {/* desk under the window */}
      <rect x="652" y="632" width="22" height="172" rx="6" fill="#d9844a" />
      <rect x="900" y="632" width="22" height="172" rx="6" fill="#d9844a" />
      <rect x="800" y="630" width="122" height="70" rx="8" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
      <circle cx="861" cy="665" r="7" fill="#fff3d6" />
      <rect x="630" y="612" width="314" height="24" rx="8" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />

      {/* nightstand */}
      <rect x="975" y="650" width="100" height="150" rx="10" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
      <line x1="975" y1="725" x2="1075" y2="725" stroke="#d9844a" strokeWidth="4" />
      <circle cx="1025" cy="690" r="7" fill="#fff3d6" />
      <circle cx="1025" cy="762" r="7" fill="#fff3d6" />
    </g>
  );
}

function Bed() {
  return (
    <g strokeLinejoin="round">
      <rect x="-46" y="22" width="5" height="10" rx="1.5" fill="#b35d7a" />
      <rect x="41" y="22" width="5" height="10" rx="1.5" fill="#b35d7a" />
      <rect x="-50" y="-30" width="10" height="56" rx="3" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.2" />
      <circle cx="-45" cy="-30" r="6.5" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.2" />
      <rect x="40" y="-8" width="10" height="34" rx="3" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.2" />
      <circle cx="45" cy="-8" r="5" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1.2" />
      <rect x="-42" y="12" width="84" height="12" rx="3" fill="#ffb3c6" stroke="#d45d7f" strokeWidth="1.2" />
      <rect x="-41" y="0" width="82" height="13" rx="4" fill="#ffffff" stroke="#c9d3e6" strokeWidth="1" />
      <path d="M -16 -4 Q 12 -7 41 -3 L 41 19 Q 12 22 -16 19 Z" fill="#7cc6fe" stroke="#4a9be0" strokeWidth="1.2" />
      <path d="M -16 -4 Q -19 7 -16 19" fill="none" stroke="#4a9be0" strokeWidth="2" />
      <g fill="#ffffff" opacity="0.85">
        <circle cx="-4" cy="4" r="1.8" />
        <circle cx="10" cy="10" r="1.8" />
        <circle cx="24" cy="3" r="1.8" />
        <circle cx="33" cy="12" r="1.8" />
        <circle cx="4" cy="15" r="1.8" />
        <circle cx="18" cy="16" r="1.8" />
      </g>
    </g>
  );
}

function Pillow() {
  return (
    <g>
      <path d="M -40 -14 Q -46 0 -40 14 Q 0 22 40 14 Q 46 0 40 -14 Q 0 -22 -40 -14 Z" fill="#fff3b0" stroke="#e0b400" strokeWidth="3" />
      <path d="M -28 -2 Q 0 4 28 -2" fill="none" stroke="#f0d060" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Lamp() {
  return (
    <g strokeLinejoin="round">
      <circle cx="0" cy="-14" r="44" fill="#fff6a8" opacity="0.5" />
      <ellipse cx="0" cy="45" rx="22" ry="6" fill="#6c5ce7" />
      <rect x="-4" y="2" width="8" height="42" rx="3" fill="#a29bfe" />
      <circle cx="0" cy="8" r="7" fill="#fffbe0" />
      <path d="M -32 4 L 32 4 L 21 -42 L -21 -42 Z" fill="#ffd23f" stroke="#e0a800" strokeWidth="3" />
      <path d="M -27 -10 L 27 -10 M -24 -26 L 24 -26" stroke="#ffe680" strokeWidth="3" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-36" y="-40" width="72" height="74" rx="4" fill="#ffffff" />
      <rect x="-32" y="-36" width="64" height="66" rx="2" fill="#9fdcff" />
      <circle cx="15" cy="-21" r="8" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="-16" cy="-10" r="5" />
        <circle cx="-9" cy="-13" r="6.5" />
        <circle cx="-2" cy="-10" r="5" />
        <rect x="-16" y="-10" width="14" height="5" />
      </g>
      <path d="M -32 30 Q -12 10 10 22 Q 22 14 32 18 L 32 30 Z" fill="#7ed957" />
      <rect x="-1.5" y="-36" width="3" height="66" fill="#ffffff" />
      <rect x="-32" y="-4" width="64" height="3" fill="#ffffff" />
      <rect x="-42" y="33" width="84" height="6" rx="2" fill="#f5efff" stroke="#c7b3ee" strokeWidth="1" />
      <rect x="-50" y="-47" width="100" height="4" rx="2" fill="#a0613a" />
      <path d="M -50 -44 Q -42 -8 -48 28 L -35 28 Q -31 -8 -36 -44 Z" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1" />
      <path d="M 50 -44 Q 42 -8 48 28 L 35 28 Q 31 -8 36 -44 Z" fill="#ff8fab" stroke="#d45d7f" strokeWidth="1" />
    </g>
  );
}

function Door() {
  return (
    <g strokeLinejoin="round">
      <rect x="-25" y="-50" width="50" height="100" rx="3" fill="#ffffff" />
      <rect x="-21" y="-46" width="42" height="96" rx="2" fill="#f4a261" stroke="#c9773a" strokeWidth="1.2" />
      <rect x="-16" y="-40" width="32" height="34" rx="2" fill="none" stroke="#c9773a" strokeWidth="1.6" />
      <rect x="-16" y="1" width="32" height="42" rx="2" fill="none" stroke="#c9773a" strokeWidth="1.6" />
      <circle cx="14" cy="-2" r="3" fill="#ffd23f" stroke="#c99f00" strokeWidth="0.8" />
    </g>
  );
}

function Wardrobe() {
  return (
    <g strokeLinejoin="round">
      <rect x="-22" y="44" width="5" height="6" fill="#3f9e8c" />
      <rect x="17" y="44" width="5" height="6" fill="#3f9e8c" />
      <rect x="-24" y="-46" width="48" height="91" rx="4" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="1.4" />
      <rect x="-26" y="-50" width="52" height="7" rx="2" fill="#6fc7b4" />
      <line x1="0" y1="-42" x2="0" y2="41" stroke="#4fb3a0" strokeWidth="1.4" />
      <rect x="-20" y="-39" width="16" height="76" rx="2" fill="none" stroke="#c4f3e8" strokeWidth="1.2" />
      <rect x="4" y="-39" width="16" height="76" rx="2" fill="none" stroke="#c4f3e8" strokeWidth="1.2" />
      <circle cx="-4" cy="0" r="2.2" fill="#ffffff" />
      <circle cx="4" cy="0" r="2.2" fill="#ffffff" />
    </g>
  );
}

function Rug() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="50" ry="17" fill="#ff9f43" />
      <ellipse cx="0" cy="0" rx="42" ry="13.5" fill="#ffd27a" />
      <ellipse cx="0" cy="0" rx="32" ry="10" fill="#ff9f43" />
      <ellipse cx="0" cy="0" rx="20" ry="6" fill="#ffe7b0" />
    </g>
  );
}

const bedroom = {
  id: 'bedroom',
  title: 'Bedroom',
  titleId: 'Kamar Tidur',
  icon: '🛏️',
  Background,
  objects: [
    {
      id: 'bed', word: 'bed', wordId: 'tempat tidur', art: Bed, x: 1320, y: 690, size: 470, hit: { w: 460, h: 270, dy: 10 },
      sentence: 'I sleep in my bed.', sentenceId: 'Aku tidur di tempat tidurku.',
      question: 'Is your bed big or small?', questionId: 'Tempat tidurmu besar atau kecil?',
      answer: 'My bed is small.', answerId: 'Tempat tidurku kecil.',
    },
    {
      id: 'pillow', word: 'pillow', wordId: 'bantal', art: Pillow, x: 1180, y: 668, size: 150,
      sentence: 'The pillow is soft.', sentenceId: 'Bantalnya empuk.',
      question: 'Do you sleep with a pillow?', questionId: 'Kamu tidur pakai bantal?',
      answer: 'Yes, I do.', answerId: 'Ya, aku pakai.',
    },
    {
      id: 'teddy', word: 'teddy bear', wordId: 'boneka beruang', emoji: '🧸', x: 1335, y: 632, size: 120,
      sentence: 'The teddy bear wants a hug.', sentenceId: 'Boneka beruang itu mau dipeluk.',
      question: 'Can you give a big hug?', questionId: 'Bisa kasih pelukan besar?',
      answer: 'Yes! A big hug!', answerId: 'Ya! Pelukan besar!',
    },
    {
      id: 'lamp', word: 'lamp', wordId: 'lampu', art: Lamp, x: 1025, y: 565, size: 170,
      sentence: 'The lamp can turn on.', sentenceId: 'Lampu itu bisa menyala.',
      question: 'Is the lamp on or off?', questionId: 'Lampunya nyala atau mati?',
      answer: 'The lamp is on.', answerId: 'Lampunya nyala.',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam', emoji: '⏰', x: 895, y: 574, size: 80,
      sentence: 'The clock says tick-tock.', sentenceId: 'Jamnya berbunyi tik-tok.',
      question: 'Can you say tick-tock?', questionId: 'Bisa bilang tik-tok?',
      answer: 'Tick-tock, tick-tock!', answerId: 'Tik-tok, tik-tok!',
    },
    {
      id: 'book', word: 'book', wordId: 'buku', emoji: '📖', x: 700, y: 584, size: 82,
      sentence: 'I like to read a book.', sentenceId: 'Aku suka membaca buku.',
      question: 'Do you like books?', questionId: 'Kamu suka buku?',
      answer: 'Yes, I love books!', answerId: 'Ya, aku suka sekali buku!',
    },
    {
      id: 'crayon', word: 'crayon', wordId: 'krayon', emoji: '🖍️', x: 798, y: 586, size: 72,
      sentence: 'I draw with a crayon.', sentenceId: 'Aku menggambar dengan krayon.',
      question: 'What color is your favorite crayon?', questionId: 'Krayon kesukaanmu warna apa?',
      answer: 'My favorite crayon is red.', answerId: 'Krayon kesukaanku merah.',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 872, y: 405, size: 95,
      sentence: 'The plant needs water.', sentenceId: 'Tanaman itu butuh air.',
      question: 'Is the plant green?', questionId: 'Apakah tanamannya hijau?',
      answer: 'Yes, it is green.', answerId: 'Ya, warnanya hijau.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 780, y: 330, size: 360, hit: { w: 270, h: 280, dy: -4 },
      sentence: 'Look out the window!', sentenceId: 'Lihat ke luar jendela!',
      question: 'What can you see outside?', questionId: 'Apa yang kamu lihat di luar?',
      answer: 'I can see the sun.', answerId: 'Aku bisa melihat matahari.',
    },
    {
      id: 'door', word: 'door', wordId: 'pintu', art: Door, x: 185, y: 515, size: 520, hit: { w: 250, h: 500 },
      sentence: 'Please close the door.', sentenceId: 'Tolong tutup pintunya.',
      question: 'Can you knock on the door?', questionId: 'Bisa ketuk pintunya?',
      answer: 'Knock, knock!', answerId: 'Tok, tok!',
    },
    {
      id: 'wardrobe', word: 'wardrobe', wordId: 'lemari pakaian', art: Wardrobe, x: 450, y: 525, size: 500, hit: { w: 245, h: 480 },
      sentence: 'My clothes are in the wardrobe.', sentenceId: 'Bajuku ada di dalam lemari pakaian.',
      question: 'What is in your wardrobe?', questionId: 'Ada apa di dalam lemarimu?',
      answer: 'My clothes are in it.', answerId: 'Bajuku ada di dalamnya.',
    },
    {
      id: 'chair', word: 'chair', wordId: 'kursi', emoji: '🪑', x: 598, y: 712, size: 170,
      sentence: 'I sit on the chair.', sentenceId: 'Aku duduk di kursi.',
      question: 'Can you sit down?', questionId: 'Bisa duduk?',
      answer: 'Yes, I can sit down.', answerId: 'Ya, aku bisa duduk.',
    },
    {
      id: 'shirt', word: 'shirt', wordId: 'baju', emoji: '👕', x: 585, y: 655, size: 85, rotate: -8,
      sentence: 'I wear a shirt.', sentenceId: 'Aku memakai baju.',
      question: 'What color is your shirt today?', questionId: 'Bajumu hari ini warna apa?',
      answer: 'My shirt is blue.', answerId: 'Bajuku biru.',
    },
    {
      id: 'picture', word: 'picture', wordId: 'gambar', emoji: '🖼️', x: 1320, y: 330, size: 150,
      sentence: 'There is a picture on the wall.', sentenceId: 'Ada gambar di dinding.',
      question: 'Do you like to draw pictures?', questionId: 'Kamu suka menggambar?',
      answer: 'Yes, I like to draw.', answerId: 'Ya, aku suka menggambar.',
    },
    {
      id: 'kite', word: 'kite', wordId: 'layang-layang', emoji: '🪁', x: 450, y: 165, size: 130, rotate: -12,
      sentence: 'The kite can fly high.', sentenceId: 'Layang-layang bisa terbang tinggi.',
      question: 'Is the kite up or down?', questionId: 'Layang-layangnya di atas atau di bawah?',
      answer: 'The kite is up!', answerId: 'Layang-layangnya di atas!',
    },
    {
      id: 'rug', word: 'rug', wordId: 'karpet', art: Rug, x: 800, y: 1020, size: 640, hit: { w: 600, h: 200 },
      sentence: 'The rug is on the floor.', sentenceId: 'Karpetnya ada di lantai.',
      question: 'What color is the rug?', questionId: 'Karpetnya warna apa?',
      answer: 'The rug is orange.', answerId: 'Karpetnya oranye.',
    },
    {
      id: 'car', word: 'toy car', wordId: 'mobil mainan', emoji: '🚗', x: 670, y: 1012, size: 120,
      sentence: 'The toy car goes vroom!', sentenceId: 'Mobil mainannya berbunyi brum!',
      question: 'What color is the toy car?', questionId: 'Mobil mainannya warna apa?',
      answer: 'The toy car is red.', answerId: 'Mobil mainannya merah.',
    },
    {
      id: 'ball', word: 'ball', wordId: 'bola', emoji: '⚽', x: 965, y: 1050, size: 100,
      sentence: 'I can kick the ball.', sentenceId: 'Aku bisa menendang bola.',
      question: 'Can you throw a ball?', questionId: 'Bisa melempar bola?',
      answer: 'Yes, I can throw a ball!', answerId: 'Ya, aku bisa melempar bola!',
    },
    {
      id: 'shoe', word: 'shoe', wordId: 'sepatu', emoji: '👟', x: 205, y: 880, size: 105,
      sentence: 'I put on my shoe.', sentenceId: 'Aku memakai sepatuku.',
      question: 'What color are your shoes?', questionId: 'Sepatumu warna apa?',
      answer: 'My shoes are white.', answerId: 'Sepatuku putih.',
    },
    {
      id: 'backpack', word: 'backpack', wordId: 'tas ransel', emoji: '🎒', x: 420, y: 865, size: 130,
      sentence: 'I take my backpack to school.', sentenceId: 'Aku bawa tas ranselku ke sekolah.',
      question: 'What is in your backpack?', questionId: 'Ada apa di dalam tasmu?',
      answer: 'My books and my snack.', answerId: 'Buku dan bekalku.',
    },
    {
      id: 'cat', word: 'cat', wordId: 'kucing', emoji: '🐈', x: 1330, y: 965, size: 170,
      sentence: 'The cat says meow.', sentenceId: 'Kucing berbunyi meong.',
      question: 'Can you say meow like a cat?', questionId: 'Bisa bilang meong seperti kucing?',
      answer: 'Meow, meow!', answerId: 'Meong, meong!',
    },
    {
      id: 'sock', word: 'sock', wordId: 'kaus kaki', emoji: '🧦', x: 300, y: 1080, size: 95, rotate: 10,
      sentence: 'The sock is on the floor.', sentenceId: 'Kaus kakinya ada di lantai.',
      question: 'Where do socks go?', questionId: 'Kaus kaki dipakai di mana?',
      answer: 'Socks go on my feet.', answerId: 'Kaus kaki dipakai di kakiku.',
    },
    {
      id: 'robot', word: 'robot', wordId: 'robot', emoji: '🤖', x: 1500, y: 1085, size: 125,
      sentence: 'The robot says beep-boop.', sentenceId: 'Robotnya berbunyi bip-bup.',
      question: 'Can you walk like a robot?', questionId: 'Bisa jalan seperti robot?',
      answer: 'Beep-boop! I am a robot!', answerId: 'Bip-bup! Aku robot!',
    },
  ],
};

export default bedroom;

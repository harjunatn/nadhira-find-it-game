// Under the Sea scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// Open water with light rays at the top, a sandy sea floor at the bottom.

const RAYS = [
  [120, 230, 520, 330],
  [420, 500, 760, 620],
  [760, 880, 1080, 1250],
  [1150, 1230, 1380, 1520],
];

function Background() {
  const ripples = [];
  for (let i = 0; i < 14; i++) {
    const x = 60 + ((i * 263) % 1500);
    const y = 960 + ((i * 97) % 220);
    ripples.push(
      <path key={`rp${i}`} d={`M${x - 50} ${y} Q${x} ${y - 14} ${x + 50} ${y}`} fill="none" stroke="#e2b765" strokeWidth="5" strokeLinecap="round" opacity="0.6" />,
    );
  }
  const pebbles = [];
  for (let i = 0; i < 22; i++) {
    const x = 30 + ((i * 331) % 1560);
    const y = 930 + ((i * 53) % 250);
    pebbles.push(<circle key={`pb${i}`} cx={x} cy={y} r={4 + (i % 3) * 2} fill="#d9a85a" opacity="0.5" />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="under-the-sea-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8f0fd" />
          <stop offset="0.45" stopColor="#62cdf1" />
          <stop offset="0.8" stopColor="#3aa6dd" />
        </linearGradient>
        <linearGradient id="under-the-sea-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="under-the-sea-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e2a6" />
          <stop offset="1" stopColor="#f1c97a" />
        </linearGradient>
      </defs>

      {/* water */}
      <rect width="1600" height="1200" fill="url(#under-the-sea-water)" />
      {RAYS.map(([a, b, c, d], i) => (
        <path key={`ray${i}`} d={`M${a} 0 L${b} 0 L${d} 900 L${c} 900 Z`} fill="url(#under-the-sea-ray)" />
      ))}

      {/* sparkling surface */}
      <path
        d={`M0 0 H1600 V30 ${Array.from({ length: 16 }, (_, i) => `Q${1600 - i * 100 - 50} ${i % 2 ? 48 : 14} ${1600 - (i + 1) * 100} 30`).join(' ')} Z`}
        fill="#e4fbff"
        opacity="0.85"
      />

      {/* far-away reef, pale so it stays in the distance */}
      <path
        d="M0 900 L0 840 Q50 790 120 815 Q170 770 240 805 Q300 830 350 860 L1050 870 Q1100 800 1170 820 Q1230 780 1300 810 Q1370 770 1440 805 Q1520 790 1600 830 L1600 900 Z"
        fill="#3b9fd0"
        opacity="0.45"
      />

      {/* sea floor */}
      <path d="M0 890 Q200 860 400 885 T800 880 T1200 875 T1600 868 V1200 H0 Z" fill="url(#under-the-sea-sand)" />
      <path d="M0 890 Q200 860 400 885 T800 880 T1200 875 T1600 868" fill="none" stroke="#fff3cf" strokeWidth="8" opacity="0.8" />
      {ripples}
      {pebbles}

      {/* rock for the octopus */}
      <ellipse cx="400" cy="985" rx="150" ry="18" fill="#000" opacity="0.1" />
      <path d="M260 985 Q250 910 320 895 Q380 860 450 885 Q530 895 540 985 Z" fill="#9db1c4" stroke="#6f859b" strokeWidth="6" strokeLinejoin="round" />
      <path d="M310 925 Q350 900 400 905" fill="none" stroke="#c9d7e4" strokeWidth="8" strokeLinecap="round" />

      {/* anchor chain from the boat up above */}
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse
          key={`ch${i}`}
          cx="1480"
          cy={20 + i * 52}
          rx={i % 2 ? 7 : 13}
          ry="24"
          fill="none"
          stroke="#6b7a8c"
          strokeWidth="7"
        />
      ))}

      {/* soft shadows on the sand */}
      <ellipse cx="790" cy="1055" rx="130" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="1200" cy="955" rx="100" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="1480" cy="975" rx="90" ry="12" fill="#000" opacity="0.08" />
      <ellipse cx="110" cy="975" rx="90" ry="12" fill="#000" opacity="0.08" />
    </g>
  );
}

function Seaweed() {
  const fronds = [
    'M -16 50 C -30 24 -2 10 -16 -14 S -4 -38 -18 -50',
    'M 2 50 C 14 26 -10 8 4 -14 S 16 -30 6 -44',
    'M 18 50 C 32 30 12 18 24 0 S 34 -16 26 -28',
  ];
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      {fronds.map((d) => (
        <path key={`o${d}`} d={d} stroke="#1f8a4c" strokeWidth="14" />
      ))}
      {fronds.map((d) => (
        <path key={`f${d}`} d={d} stroke="#46c86a" strokeWidth="9" />
      ))}
      {fronds.map((d) => (
        <path key={`h${d}`} d={d} stroke="#9ff0a8" strokeWidth="2" opacity="0.8" transform="translate(-2 0)" />
      ))}
    </g>
  );
}

function TreasureChest() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* open lid, seen from the inside */}
      <path d="M -40 -6 L -36 -42 Q 0 -54 36 -42 L 40 -6 Z" fill="#8a5426" stroke="#5e3614" strokeWidth="2.5" />
      <path d="M -30 -38 Q 0 -48 30 -38" fill="none" stroke="#f2c230" strokeWidth="3" />
      {/* gold coins */}
      <g fill="#ffd23f" stroke="#d99a00" strokeWidth="1.8">
        <circle cx="-26" cy="-8" r="8" />
        <circle cx="-12" cy="-14" r="8" />
        <circle cx="4" cy="-12" r="8" />
        <circle cx="20" cy="-14" r="8" />
        <circle cx="30" cy="-6" r="7" />
        <circle cx="-4" cy="-4" r="8" />
        <circle cx="14" cy="-4" r="8" />
      </g>
      <path d="M -10 -24 L -2 -32 L 6 -24 L -2 -14 Z" fill="#4fc3f7" stroke="#1f88c9" strokeWidth="1.8" />
      <path d="M -6 -25 L -2 -29" stroke="#ffffff" strokeWidth="1.5" />
      {/* box */}
      <rect x="-44" y="-4" width="88" height="48" rx="6" fill="#c07a3c" stroke="#7a4a1f" strokeWidth="2.5" />
      <line x1="-40" y1="12" x2="40" y2="12" stroke="#9a5e2a" strokeWidth="2" />
      <line x1="-40" y1="28" x2="40" y2="28" stroke="#9a5e2a" strokeWidth="2" />
      <rect x="-34" y="-4" width="9" height="48" fill="#f2c230" stroke="#c99a00" strokeWidth="1.5" />
      <rect x="25" y="-4" width="9" height="48" fill="#f2c230" stroke="#c99a00" strokeWidth="1.5" />
      <rect x="-9" y="2" width="18" height="20" rx="3" fill="#f2c230" stroke="#c99a00" strokeWidth="1.5" />
      <circle cx="0" cy="10" r="2.6" fill="#7a4a1f" />
      <rect x="-1" y="10" width="2" height="6" fill="#7a4a1f" />
      {/* sparkles */}
      <path d="M 34 -30 L 36 -24 L 42 -22 L 36 -20 L 34 -14 L 32 -20 L 26 -22 L 32 -24 Z" fill="#ffffff" />
      <path d="M -36 -26 L -35 -22 L -31 -21 L -35 -20 L -36 -16 L -37 -20 L -41 -21 L -37 -22 Z" fill="#ffffff" />
    </g>
  );
}

function Starfish() {
  return (
    <g strokeLinejoin="round">
      <path
        d="M 0 -44 L 12 -15 L 42 -13 L 19 7 L 26 37 L 0 21 L -26 37 L -19 7 L -42 -13 L -12 -15 Z"
        fill="#ff8a3d"
        stroke="#d9601f"
        strokeWidth="9"
      />
      <path
        d="M 0 -44 L 12 -15 L 42 -13 L 19 7 L 26 37 L 0 21 L -26 37 L -19 7 L -42 -13 L -12 -15 Z"
        fill="#ff9f4f"
        stroke="#ff9f4f"
        strokeWidth="3"
      />
      <g fill="#ffd2a1">
        <circle cx="0" cy="-28" r="2.6" />
        <circle cx="0" cy="-18" r="2.6" />
        <circle cx="26" cy="-11" r="2.6" />
        <circle cx="16" cy="-6" r="2.6" />
        <circle cx="17" cy="23" r="2.6" />
        <circle cx="11" cy="12" r="2.6" />
        <circle cx="-17" cy="23" r="2.6" />
        <circle cx="-11" cy="12" r="2.6" />
        <circle cx="-26" cy="-11" r="2.6" />
        <circle cx="-16" cy="-6" r="2.6" />
        <circle cx="0" cy="0" r="4" />
      </g>
    </g>
  );
}

function Submarine() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* periscope */}
      <path d="M 8 -22 L 8 -40 L 20 -40" fill="none" stroke="#c99a00" strokeWidth="7" />
      <path d="M 8 -22 L 8 -40 L 20 -40" fill="none" stroke="#ffd23f" strokeWidth="3.5" />
      {/* propeller */}
      <rect x="-50" y="-2" width="8" height="8" rx="2" fill="#9fb2c4" stroke="#6b7f94" strokeWidth="1.5" />
      <ellipse cx="-48" cy="-6" rx="3" ry="8" fill="#ff7a59" stroke="#d9502f" strokeWidth="1.5" />
      <ellipse cx="-48" cy="12" rx="3" ry="8" fill="#ff7a59" stroke="#d9502f" strokeWidth="1.5" />
      {/* tower */}
      <rect x="-14" y="-28" width="30" height="20" rx="6" fill="#ffd23f" stroke="#c99a00" strokeWidth="2.5" />
      {/* body */}
      <rect x="-44" y="-14" width="92" height="38" rx="19" fill="#ffd23f" stroke="#c99a00" strokeWidth="2.5" />
      <path d="M -36 14 Q 2 22 40 14" fill="none" stroke="#ff7a59" strokeWidth="4" />
      <path d="M -30 -8 Q 0 -12 30 -8" fill="none" stroke="#fff3a8" strokeWidth="3" />
      {[-20, 2, 24].map((x) => (
        <g key={x}>
          <circle cx={x} cy="2" r="7" fill="#9fe6ff" stroke="#c99a00" strokeWidth="2.5" />
          <circle cx={x - 2} cy="0" r="2" fill="#ffffff" />
        </g>
      ))}
    </g>
  );
}

function Seahorse() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* curly tail */}
      <path d="M -6 18 Q -10 38 4 44 Q 18 46 18 34 Q 16 26 8 30" fill="none" stroke="#d9601f" strokeWidth="12" />
      <path d="M -6 18 Q -10 38 4 44 Q 18 46 18 34 Q 16 26 8 30" fill="none" stroke="#ffa94d" strokeWidth="7" />
      {/* back fin */}
      <path d="M -16 -10 Q -32 -4 -22 10 Z" fill="#ffd166" stroke="#d9601f" strokeWidth="2" />
      {/* body and head */}
      <path
        d="M -6 -46 Q 10 -50 16 -38 L 36 -35 Q 41 -30 36 -26 L 16 -24 Q 22 -8 14 6 Q 6 22 -6 22 Q -18 18 -16 4 Q -14 -10 -16 -22 Q -20 -40 -6 -46 Z"
        fill="#ffa94d"
        stroke="#d9601f"
        strokeWidth="2.5"
      />
      <path d="M 4 -14 Q 10 -4 4 10" fill="none" stroke="#ffd2a1" strokeWidth="3" />
      <g stroke="#e07a2f" strokeWidth="2">
        <line x1="6" y1="-8" x2="12" y2="-6" />
        <line x1="5" y1="0" x2="11" y2="2" />
        <line x1="3" y1="8" x2="8" y2="11" />
      </g>
      {/* crown */}
      <path d="M -8 -46 L -6 -54 L -1 -47 L 3 -54 L 6 -47" fill="#ffd166" stroke="#d9601f" strokeWidth="2" />
      <circle cx="4" cy="-34" r="5" fill="#ffffff" stroke="#d9601f" strokeWidth="1.5" />
      <circle cx="5" cy="-34" r="2.6" fill="#2f2f3a" />
      <circle cx="-4" cy="-24" r="3" fill="#ff7a8a" opacity="0.6" />
    </g>
  );
}

const scene = {
  id: 'under-the-sea',
  title: 'Under the Sea',
  titleId: 'Bawah Laut',
  icon: '🐠',
  Background,
  hideBehind: ['🪨', '🦪', '🧽', '🪵'],
  objects: [
    // up near the sunny surface
    {
      id: 'whale', word: 'whale', wordId: 'paus', emoji: '🐋', x: 320, y: 190, size: 290,
      sentence: 'The whale is very, very big.', sentenceId: 'Pausnya besar sekali.',
      question: 'Is the whale big or small?', questionId: 'Pausnya besar atau kecil?',
      answer: 'The whale is very big.', answerId: 'Pausnya besar sekali.',
    },
    {
      id: 'bubbles', word: 'bubbles', wordId: 'gelembung', emoji: '🫧', x: 620, y: 110, size: 110,
      sentence: 'The bubbles float up, up, up.', sentenceId: 'Gelembungnya naik, naik, naik.',
      question: 'Can you pop the bubbles?', questionId: 'Bisa pecahkan gelembungnya?',
      answer: 'Pop, pop, pop!', answerId: 'Pop, pop, pop!',
    },
    {
      id: 'dolphin', word: 'dolphin', wordId: 'lumba-lumba', emoji: '🐬', x: 840, y: 200, size: 210,
      sentence: 'The dolphin likes to jump and play.', sentenceId: 'Lumba-lumba suka melompat dan bermain.',
      question: 'Can you jump like a dolphin?', questionId: 'Bisa melompat seperti lumba-lumba?',
      answer: 'Yes! Jump, jump, splash!', answerId: 'Ya! Lompat, lompat, byur!',
    },
    {
      id: 'jellyfish', word: 'jellyfish', wordId: 'ubur-ubur', emoji: '🪼', x: 1100, y: 160, size: 150,
      sentence: 'The jellyfish floats in the water.', sentenceId: 'Ubur-ubur melayang di air.',
      question: 'Is the jellyfish soft or hard?', questionId: 'Ubur-uburnya lembut atau keras?',
      answer: 'The jellyfish is soft.', answerId: 'Ubur-uburnya lembut.',
    },
    {
      id: 'submarine', word: 'submarine', wordId: 'kapal selam', art: Submarine, x: 1330, y: 230, size: 280, hit: { w: 270, h: 190, dy: -10 },
      sentence: 'The submarine goes deep under the sea.', sentenceId: 'Kapal selam pergi ke dalam laut.',
      question: 'Is the submarine yellow?', questionId: 'Apakah kapal selamnya kuning?',
      answer: 'Yes, it is yellow.', answerId: 'Ya, warnanya kuning.',
    },

    // swimming in the middle
    {
      id: 'shark', word: 'shark', wordId: 'hiu', emoji: '🦈', x: 290, y: 500, size: 240,
      sentence: 'The shark swims very fast.', sentenceId: 'Hiunya berenang sangat cepat.',
      question: 'Can you swim fast like a shark?', questionId: 'Bisa berenang cepat seperti hiu?',
      answer: 'Yes, I can swim fast!', answerId: 'Ya, aku bisa berenang cepat!',
    },
    {
      id: 'tropical-fish', word: 'tropical fish', wordId: 'ikan tropis', emoji: '🐠', x: 610, y: 400, size: 130,
      sentence: 'The tropical fish has bright colors.', sentenceId: 'Ikan tropis warnanya cerah.',
      question: 'What color is the tropical fish?', questionId: 'Ikan tropisnya warna apa?',
      answer: 'It is blue and yellow.', answerId: 'Warnanya biru dan kuning.',
    },
    {
      id: 'blowfish', word: 'blowfish', wordId: 'ikan buntal', emoji: '🐡', x: 720, y: 640, size: 125,
      sentence: 'The blowfish puffs up like a ball.', sentenceId: 'Ikan buntal menggembung seperti bola.',
      question: 'Can you puff up your cheeks?', questionId: 'Bisa gembungkan pipimu?',
      answer: 'Yes! Look at my cheeks!', answerId: 'Ya! Lihat pipiku!',
    },
    {
      id: 'turtle', word: 'turtle', wordId: 'penyu', emoji: '🐢', x: 980, y: 500, size: 190,
      sentence: 'The turtle swims slowly.', sentenceId: 'Penyunya berenang pelan-pelan.',
      question: 'Can you move slowly like a turtle?', questionId: 'Bisa bergerak pelan seperti penyu?',
      answer: 'Yes, slow, slow, slow.', answerId: 'Ya, pelan, pelan, pelan.',
    },
    {
      id: 'fish', word: 'fish', wordId: 'ikan', emoji: '🐟', x: 1200, y: 430, size: 130,
      sentence: 'The fish swims in the sea.', sentenceId: 'Ikannya berenang di laut.',
      question: 'Can you make a fish face?', questionId: 'Bisa bikin muka ikan?',
      answer: 'Look at my fish face!', answerId: 'Lihat muka ikanku!',
    },
    {
      id: 'seal', word: 'seal', wordId: 'anjing laut', emoji: '🦭', x: 1250, y: 650, size: 170,
      sentence: 'The seal claps its flippers.', sentenceId: 'Anjing laut bertepuk dengan siripnya.',
      question: 'Can you clap like a seal?', questionId: 'Bisa tepuk tangan seperti anjing laut?',
      answer: 'Clap, clap, clap!', answerId: 'Plok, plok, plok!',
    },
    {
      id: 'squid', word: 'squid', wordId: 'cumi-cumi', emoji: '🦑', x: 1480, y: 520, size: 160,
      sentence: 'The squid has long arms.', sentenceId: 'Cumi-cumi punya lengan panjang.',
      question: 'Is the squid pink?', questionId: 'Apakah cumi-cumi itu merah muda?',
      answer: 'Yes, the squid is pink.', answerId: 'Ya, cumi-cuminya merah muda.',
    },
    {
      id: 'seahorse', word: 'seahorse', wordId: 'kuda laut', art: Seahorse, x: 560, y: 720, size: 160,
      sentence: 'The seahorse has a curly tail.', sentenceId: 'Kuda laut punya ekor melingkar.',
      question: 'Is the seahorse big or small?', questionId: 'Kuda lautnya besar atau kecil?',
      answer: 'The seahorse is small.', answerId: 'Kuda lautnya kecil.',
    },

    // on the sea floor
    {
      id: 'seaweed', word: 'seaweed', wordId: 'rumput laut', art: Seaweed, x: 110, y: 770, size: 400, hit: { w: 170, h: 380, dy: 0 },
      sentence: 'The seaweed sways in the water.', sentenceId: 'Rumput laut bergoyang di air.',
      question: 'Can you sway like seaweed?', questionId: 'Bisa bergoyang seperti rumput laut?',
      answer: 'Yes, I can sway!', answerId: 'Ya, aku bisa bergoyang!',
    },
    {
      id: 'octopus', word: 'octopus', wordId: 'gurita', emoji: '🐙', x: 400, y: 820, size: 170,
      sentence: 'The octopus has eight arms.', sentenceId: 'Gurita punya delapan lengan.',
      question: 'Can you wiggle your arms?', questionId: 'Bisa goyangkan tanganmu?',
      answer: 'Wiggle, wiggle, wiggle!', answerId: 'Goyang, goyang, goyang!',
    },
    {
      id: 'treasure-chest', word: 'treasure chest', wordId: 'peti harta karun', art: TreasureChest, x: 790, y: 955, size: 230,
      sentence: 'The treasure chest is full of gold.', sentenceId: 'Peti harta karun penuh emas.',
      question: 'Do you want to find treasure?', questionId: 'Kamu mau cari harta karun?',
      answer: 'Yes, I want treasure!', answerId: 'Ya, aku mau harta karun!',
    },
    {
      id: 'coral', word: 'coral', wordId: 'karang', emoji: '🪸', x: 1200, y: 860, size: 200,
      sentence: 'Coral is a home for little fish.', sentenceId: 'Karang adalah rumah ikan kecil.',
      question: 'What color is the coral?', questionId: 'Karangnya warna apa?',
      answer: 'The coral is pink.', answerId: 'Karangnya merah muda.',
    },
    {
      id: 'anchor', word: 'anchor', wordId: 'jangkar', emoji: '⚓', x: 1480, y: 880, size: 190,
      sentence: 'The anchor sinks to the bottom.', sentenceId: 'Jangkar tenggelam ke dasar laut.',
      question: 'Is the anchor heavy or light?', questionId: 'Jangkarnya berat atau ringan?',
      answer: 'The anchor is heavy.', answerId: 'Jangkarnya berat.',
    },
    {
      id: 'crab', word: 'crab', wordId: 'kepiting', emoji: '🦀', x: 230, y: 1080, size: 130,
      sentence: 'The crab walks sideways.', sentenceId: 'Kepiting berjalan menyamping.',
      question: 'Can you walk like a crab?', questionId: 'Bisa jalan seperti kepiting?',
      answer: 'Yes! Side, side, side!', answerId: 'Ya! Ke samping, ke samping!',
    },
    {
      id: 'shell', word: 'shell', wordId: 'kerang', emoji: '🐚', x: 450, y: 1110, size: 105,
      sentence: 'I can hear the sea in a shell.', sentenceId: 'Aku bisa dengar suara laut di kerang.',
      question: 'Can you say shhh like the sea?', questionId: 'Bisa bilang sssh seperti laut?',
      answer: 'Shhh, shhh, shhh!', answerId: 'Sssh, sssh, sssh!',
    },
    {
      id: 'starfish', word: 'starfish', wordId: 'bintang laut', art: Starfish, x: 620, y: 1110, size: 125, rotate: -12,
      sentence: 'The starfish has five arms.', sentenceId: 'Bintang laut punya lima lengan.',
      question: 'Can you count the arms?', questionId: 'Bisa hitung lengannya?',
      answer: 'One, two, three, four, five!', answerId: 'Satu, dua, tiga, empat, lima!',
    },
    {
      id: 'lobster', word: 'lobster', wordId: 'lobster', emoji: '🦞', x: 1010, y: 1090, size: 150,
      sentence: 'The lobster has two big claws.', sentenceId: 'Lobster punya dua capit besar.',
      question: 'Is the lobster red?', questionId: 'Apakah lobsternya merah?',
      answer: 'Yes, the lobster is red.', answerId: 'Ya, lobsternya merah.',
    },
    {
      id: 'diving-mask', word: 'diving mask', wordId: 'masker selam', emoji: '🤿', x: 1240, y: 1110, size: 115,
      sentence: 'I wear a mask to see underwater.', sentenceId: 'Aku pakai masker untuk melihat di air.',
      question: 'Can you hold your breath?', questionId: 'Bisa tahan napas?',
      answer: 'Yes, I can hold my breath!', answerId: 'Ya, aku bisa tahan napas!',
    },
    {
      id: 'shrimp', word: 'shrimp', wordId: 'udang', emoji: '🦐', x: 1450, y: 1100, size: 110,
      sentence: 'The shrimp is small and curly.', sentenceId: 'Udangnya kecil dan melengkung.',
      question: 'Is the shrimp big or small?', questionId: 'Udangnya besar atau kecil?',
      answer: 'The shrimp is small.', answerId: 'Udangnya kecil.',
    },
  ],
};

export default scene;

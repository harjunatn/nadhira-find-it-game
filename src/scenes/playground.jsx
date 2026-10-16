// Outdoor playground scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff">
      <ellipse cx="0" cy="0" rx="70" ry="34" />
      <circle cx="-30" cy="-18" r="30" />
      <circle cx="18" cy="-28" r="38" />
    </g>
  );
}

function Background() {
  return (
    <g>
      <defs>
        <linearGradient id="playground-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cc6ff" />
          <stop offset="1" stopColor="#c9ecff" />
        </linearGradient>
        <linearGradient id="playground-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ddb6a" />
          <stop offset="1" stopColor="#6cc24f" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1200" fill="url(#playground-sky)" />
      <Cloud x={420} y={110} s={0.9} />
      <Cloud x={980} y={80} s={0.7} />
      <path d="M0 560 Q300 470 620 540 Q980 460 1300 530 Q1460 500 1600 530 L1600 700 L0 700 Z" fill="#b6e8a0" />
      <rect y="620" width="1600" height="580" fill="url(#playground-grass)" />
      <path d="M0 620 Q400 590 800 625 Q1200 595 1600 620 L1600 640 L0 640 Z" fill="#9ee27f" />
      {/* sandy path */}
      <path d="M560 1200 Q700 1000 900 900 Q1100 820 1600 840 L1600 920 Q1150 900 980 980 Q820 1060 780 1200 Z" fill="#f3d9a4" opacity="0.9" />
      {/* grass tufts */}
      {[[120, 700], [640, 760], [1040, 690], [1520, 740], [300, 1180], [1450, 1170]].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y} l8 -26 l6 26 l8 -20 l4 20 Z`} fill="#4fae3a" />
      ))}
      {/* fence at the back */}
      <rect x="0" y="590" width="1600" height="10" rx="4" fill="#ffffff" opacity="0.85" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 80 + 10} y="560" width="14" height="60" rx="6" fill="#ffffff" opacity="0.85" />
      ))}
      {/* shadows */}
      <ellipse cx="330" cy="790" rx="160" ry="18" fill="#000" opacity="0.1" />
      <ellipse cx="800" cy="745" rx="200" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="1260" cy="830" rx="170" ry="16" fill="#000" opacity="0.1" />
      <ellipse cx="1460" cy="1010" rx="140" ry="14" fill="#000" opacity="0.1" />
      <ellipse cx="1440" cy="672" rx="90" ry="14" fill="#000" opacity="0.1" />
    </g>
  );
}

function Swing() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M -46 48 L -30 -44 M -14 48 L -30 -44 M 46 48 L 30 -44 M 14 48 L 30 -44" stroke="#e85d75" strokeWidth="5" fill="none" />
      <rect x="-34" y="-48" width="68" height="7" rx="3.5" fill="#e85d75" />
      <path d="M -20 -42 L -20 20 M -6 -42 L -6 20 M 6 -42 L 6 12 M 20 -42 L 20 12" stroke="#7d8fa3" strokeWidth="1.4" />
      <rect x="-24" y="18" width="22" height="6" rx="3" fill="#ffd23f" stroke="#e0a800" strokeWidth="1.2" />
      <rect x="2" y="10" width="22" height="6" rx="3" fill="#4fb3d9" stroke="#1f8fb3" strokeWidth="1.2" />
    </g>
  );
}

function Seesaw() {
  return (
    <g strokeLinejoin="round">
      <path d="M -8 18 L 0 2 L 8 18 Z" fill="#7d8fa3" stroke="#56677a" strokeWidth="1.5" />
      <g transform="rotate(-12)">
        <rect x="-48" y="-4" width="96" height="8" rx="4" fill="#ff9f43" stroke="#e07a1f" strokeWidth="1.5" />
        <rect x="-44" y="-12" width="4" height="9" rx="2" fill="#34c472" />
        <rect x="-46" y="-14" width="10" height="4" rx="2" fill="#34c472" />
        <rect x="40" y="-12" width="4" height="9" rx="2" fill="#34c472" />
        <rect x="36" y="-14" width="10" height="4" rx="2" fill="#34c472" />
      </g>
    </g>
  );
}

function Sandbox() {
  return (
    <g strokeLinejoin="round">
      <path d="M -48 -6 L 48 -6 L 44 20 L -44 20 Z" fill="#c98a4b" stroke="#a5682f" strokeWidth="1.5" />
      <path d="M -44 -10 L 44 -10 L 48 -2 L -48 -2 Z" fill="#e0a868" stroke="#a5682f" strokeWidth="1.2" />
      <path d="M -42 -4 Q -20 -14 0 -6 Q 20 -14 42 -4 L 40 12 L -40 12 Z" fill="#f6dc9c" />
      <circle cx="18" cy="-4" r="1.5" fill="#e3c27a" />
      <circle cx="-26" cy="2" r="1.5" fill="#e3c27a" />
    </g>
  );
}

function Bench() {
  return (
    <g strokeLinejoin="round">
      <rect x="-44" y="-22" width="88" height="8" rx="3" fill="#c98a4b" stroke="#a5682f" strokeWidth="1.5" />
      <rect x="-44" y="-10" width="88" height="8" rx="3" fill="#c98a4b" stroke="#a5682f" strokeWidth="1.5" />
      <rect x="-46" y="2" width="92" height="9" rx="3" fill="#e0a868" stroke="#a5682f" strokeWidth="1.5" />
      <rect x="-38" y="11" width="6" height="16" rx="2" fill="#56677a" />
      <rect x="32" y="11" width="6" height="16" rx="2" fill="#56677a" />
    </g>
  );
}

const playground = {
  id: 'playground',
  title: 'Playground',
  titleId: 'Taman Bermain',
  icon: '🛝',
  Background,
  objects: [
    {
      id: 'slide', word: 'slide', wordId: 'perosotan', emoji: '🛝', x: 330, y: 650, size: 280,
      sentence: 'I go down the slide. Wheee!', sentenceId: 'Aku meluncur di perosotan. Wuuush!',
      question: 'Is the slide fast or slow?', questionId: 'Perosotannya cepat atau lambat?',
      answer: 'The slide is fast!', answerId: 'Perosotannya cepat!',
    },
    {
      id: 'swing', word: 'swing', wordId: 'ayunan', art: Swing, x: 800, y: 560, size: 360, hit: { w: 320, h: 340 },
      sentence: 'I swing up high.', sentenceId: 'Aku berayun tinggi.',
      question: 'Can you push the swing?', questionId: 'Bisa mendorong ayunannya?',
      answer: 'Yes, I can push it.', answerId: 'Ya, aku bisa mendorongnya.',
    },
    {
      id: 'seesaw', word: 'seesaw', wordId: 'jungkat-jungkit', art: Seesaw, x: 1260, y: 790, size: 330, hit: { w: 320, h: 130 },
      sentence: 'Up and down on the seesaw!', sentenceId: 'Naik turun di jungkat-jungkit!',
      question: 'Can you go up and down?', questionId: 'Bisa naik dan turun?',
      answer: 'Up, down, up, down!', answerId: 'Naik, turun, naik, turun!',
    },
    {
      id: 'sandbox', word: 'sandbox', wordId: 'bak pasir', art: Sandbox, x: 420, y: 990, size: 420, hit: { w: 400, h: 140 },
      sentence: 'I play in the sandbox.', sentenceId: 'Aku bermain di bak pasir.',
      question: 'Can you build a sandcastle?', questionId: 'Bisa membuat istana pasir?',
      answer: 'Yes, I can build one!', answerId: 'Ya, aku bisa membuatnya!',
    },
    {
      id: 'bucket', word: 'bucket', wordId: 'ember', emoji: '🪣', x: 340, y: 955, size: 95,
      sentence: 'I fill the bucket with sand.', sentenceId: 'Aku mengisi ember dengan pasir.',
      question: 'Is the bucket full or empty?', questionId: 'Embernya penuh atau kosong?',
      answer: 'The bucket is full.', answerId: 'Embernya penuh.',
    },
    {
      id: 'ball', word: 'ball', wordId: 'bola', emoji: '⚽', x: 760, y: 890, size: 100,
      sentence: 'Kick the ball to me!', sentenceId: 'Tendang bolanya ke aku!',
      question: 'Can you kick a ball?', questionId: 'Bisa menendang bola?',
      answer: 'Yes, I can kick it!', answerId: 'Ya, aku bisa menendangnya!',
    },
    {
      id: 'kite', word: 'kite', wordId: 'layang-layang', emoji: '🪁', x: 1200, y: 170, size: 150, rotate: 10,
      sentence: 'The kite flies in the wind.', sentenceId: 'Layang-layang terbang tertiup angin.',
      question: 'Is the kite high or low?', questionId: 'Layang-layangnya tinggi atau rendah?',
      answer: 'The kite is high.', answerId: 'Layang-layangnya tinggi.',
    },
    {
      id: 'sun', word: 'sun', wordId: 'matahari', emoji: '☀️', x: 150, y: 140, size: 170,
      sentence: 'The sun is hot and bright.', sentenceId: 'Mataharinya panas dan terang.',
      question: 'Is it hot today?', questionId: 'Hari ini panas?',
      answer: 'Yes, it is hot.', answerId: 'Ya, panas.',
    },
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 690, y: 210, size: 130,
      sentence: 'My balloon floats away!', sentenceId: 'Balonku terbang!',
      question: 'What color is the balloon?', questionId: 'Balonnya warna apa?',
      answer: 'The balloon is red.', answerId: 'Balonnya merah.',
    },
    {
      id: 'frisbee', word: 'frisbee', wordId: 'piring terbang', emoji: '🥏', x: 520, y: 360, size: 100, rotate: -15,
      sentence: 'Catch the frisbee!', sentenceId: 'Tangkap piring terbangnya!',
      question: 'Can you throw a frisbee?', questionId: 'Bisa melempar piring terbang?',
      answer: 'Yes, I can throw it.', answerId: 'Ya, aku bisa melemparnya.',
    },
    {
      id: 'butterfly', word: 'butterfly', wordId: 'kupu-kupu', emoji: '🦋', x: 1010, y: 360, size: 95,
      sentence: 'The butterfly has pretty wings.', sentenceId: 'Kupu-kupu punya sayap yang cantik.',
      question: 'Can you flap like a butterfly?', questionId: 'Bisa mengepak seperti kupu-kupu?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'tree', word: 'tree', wordId: 'pohon', emoji: '🌳', x: 1440, y: 500, size: 320,
      sentence: 'The tree is big and green.', sentenceId: 'Pohonnya besar dan hijau.',
      question: 'Can you climb a tree?', questionId: 'Bisa memanjat pohon?',
      answer: 'No, it is too high!', answerId: 'Tidak, terlalu tinggi!',
    },
    {
      id: 'bird', word: 'bird', wordId: 'burung', emoji: '🐦', x: 1370, y: 400, size: 90,
      sentence: 'The bird sings tweet tweet.', sentenceId: 'Burung berkicau cuit cuit.',
      question: 'Can you sing like a bird?', questionId: 'Bisa bernyanyi seperti burung?',
      answer: 'Tweet, tweet!', answerId: 'Cuit, cuit!',
    },
    {
      id: 'squirrel', word: 'squirrel', wordId: 'tupai', emoji: '🐿️', x: 1540, y: 700, size: 105,
      sentence: 'The squirrel eats nuts.', sentenceId: 'Tupai makan kacang.',
      question: 'Can a squirrel climb trees?', questionId: 'Apakah tupai bisa memanjat pohon?',
      answer: 'Yes, it can climb.', answerId: 'Ya, tupai bisa memanjat.',
    },
    {
      id: 'scooter', word: 'scooter', wordId: 'skuter', emoji: '🛴', x: 1010, y: 880, size: 140,
      sentence: 'I push my scooter with my foot.', sentenceId: 'Aku mendorong skuterku dengan kaki.',
      question: 'Do you wear a helmet?', questionId: 'Kamu pakai helm?',
      answer: 'Yes, I wear a helmet.', answerId: 'Ya, aku pakai helm.',
    },
    {
      id: 'bench', word: 'bench', wordId: 'bangku', art: Bench, x: 1460, y: 960, size: 260, hit: { w: 250, h: 120 },
      sentence: 'We sit on the bench.', sentenceId: 'Kami duduk di bangku.',
      question: 'Can you sit on the bench?', questionId: 'Bisa duduk di bangku?',
      answer: 'Yes, I can sit here.', answerId: 'Ya, aku bisa duduk di sini.',
    },
    {
      id: 'icecream', word: 'ice cream', wordId: 'es krim', emoji: '🍦', x: 1400, y: 885, size: 90,
      sentence: 'The ice cream is cold.', sentenceId: 'Es krimnya dingin.',
      question: 'Do you like ice cream?', questionId: 'Kamu suka es krim?',
      answer: 'Yes, I love ice cream!', answerId: 'Ya, aku suka sekali es krim!',
    },
    {
      id: 'sunflower', word: 'sunflower', wordId: 'bunga matahari', emoji: '🌻', x: 90, y: 830, size: 150,
      sentence: 'The sunflower is tall and yellow.', sentenceId: 'Bunga mataharinya tinggi dan kuning.',
      question: 'Is the flower yellow?', questionId: 'Apakah bunganya kuning?',
      answer: 'Yes, it is yellow.', answerId: 'Ya, kuning.',
    },
    {
      id: 'ladybug', word: 'ladybug', wordId: 'kepik', emoji: '🐞', x: 110, y: 1100, size: 85,
      sentence: 'The ladybug has black spots.', sentenceId: 'Kepik punya bintik hitam.',
      question: 'How many legs does it have?', questionId: 'Kakinya ada berapa?',
      answer: 'It has six legs.', answerId: 'Kakinya ada enam.',
    },
    {
      id: 'snail', word: 'snail', wordId: 'siput', emoji: '🐌', x: 1340, y: 1120, size: 90,
      sentence: 'The snail is very slow.', sentenceId: 'Siputnya pelan sekali.',
      question: 'Can you walk slowly like a snail?', questionId: 'Bisa jalan pelan seperti siput?',
      answer: 'Slow, slow, slow.', answerId: 'Pelan, pelan, pelan.',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 800, y: 1080, size: 150,
      sentence: 'The dog runs and plays.', sentenceId: 'Anjingnya berlari dan bermain.',
      question: 'What does a dog say?', questionId: 'Anjing bunyinya apa?',
      answer: 'A dog says woof!', answerId: 'Anjing bunyinya guk guk!',
    },
    {
      id: 'bicycle', word: 'bicycle', wordId: 'sepeda', emoji: '🚲', x: 1110, y: 1080, size: 170,
      sentence: 'I ride my bicycle.', sentenceId: 'Aku naik sepedaku.',
      question: 'Can you ride a bicycle?', questionId: 'Bisa naik sepeda?',
      answer: 'Yes, I can ride.', answerId: 'Ya, aku bisa.',
    },
    {
      id: 'skateboard', word: 'skateboard', wordId: 'papan luncur', emoji: '🛹', x: 600, y: 1125, size: 110,
      sentence: 'The skateboard has four wheels.', sentenceId: 'Papan luncurnya punya empat roda.',
      question: 'How many wheels can you see?', questionId: 'Ada berapa roda?',
      answer: 'I can see four wheels.', answerId: 'Aku melihat empat roda.',
    },
  ],
};

export default playground;

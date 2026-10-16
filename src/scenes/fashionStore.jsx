// Fashion store scene. Coordinates are in a 1600 x 1200 picture.
// Clothes hang from two rails; accessories sit on the shelf; shoes on the low stand.

const RAIL_Y = 215;
const HANGERS = [200, 380, 560, 730, 920, 1080, 1230];
const BOARDS = [300, 480, 660];

function Background() {
  const planks = [];
  for (let row = 0; row < 8; row++) {
    const y = 740 + row * 58;
    planks.push(<line key={`r${row}`} x1="0" x2="1600" y1={y} y2={y} stroke="#d8b08a" strokeWidth="4" opacity="0.5" />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="fashion-store-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9e6" />
          <stop offset="1" stopColor="#fff0f5" />
        </linearGradient>
        <pattern id="fashion-store-stripes" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="40" height="80" fill="#ffffff" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="1600" height="740" fill="url(#fashion-store-wall)" />
      <rect width="1600" height="740" fill="url(#fashion-store-stripes)" />
      <rect y="740" width="1600" height="460" fill="#f2d3b3" />
      {planks}
      <rect y="724" width="1600" height="20" fill="#ffffff" />

      {/* clothes rails with hangers */}
      <rect x="110" y={RAIL_Y - 6} width="700" height="12" rx="6" fill="#b0b8c4" />
      <rect x="850" y={RAIL_Y - 6} width="460" height="12" rx="6" fill="#b0b8c4" />
      {[120, 800, 860, 1300].map((x) => (
        <rect key={x} x={x - 5} y="40" width="10" height={RAIL_Y - 40} fill="#c8ced8" />
      ))}
      {HANGERS.map((x) => (
        <g key={x} fill="none" stroke="#8a6a4f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M${x} ${RAIL_Y + 6} q0 -16 10 -16`} />
          <path d={`M${x - 55} ${RAIL_Y + 48} L${x} ${RAIL_Y + 18} L${x + 55} ${RAIL_Y + 48} Z`} />
        </g>
      ))}

      {/* accessory shelf */}
      <rect x="1360" y="150" width="210" height="560" rx="12" fill="#ffffff" stroke="#e8a3bd" strokeWidth="5" />
      {BOARDS.map((y) => (
        <rect key={y} x="1350" y={y} width="230" height="16" rx="6" fill="#e8a3bd" />
      ))}

      {/* fitting-room curtain */}
      <rect x="0" y="380" width="70" height="350" fill="#9b6dff" />
      <path d="M70 380 Q90 470 70 560 Q90 650 70 730" fill="none" stroke="#7d4fe0" strokeWidth="6" />

      {/* shoe stand and side table */}
      <ellipse cx="760" cy="1015" rx="330" ry="18" fill="#000" opacity="0.08" />
      <rect x="440" y="960" width="640" height="44" rx="12" fill="#ffffff" stroke="#e8a3bd" strokeWidth="5" />
      <ellipse cx="1300" cy="905" rx="180" ry="14" fill="#000" opacity="0.08" />
      <rect x="1140" y="790" width="320" height="20" rx="8" fill="#c98a4b" stroke="#a5682f" strokeWidth="4" />
      <rect x="1165" y="810" width="16" height="90" rx="6" fill="#a5682f" />
      <rect x="1420" y="810" width="16" height="90" rx="6" fill="#a5682f" />
    </g>
  );
}

const hang = (i, size) => ({ x: HANGERS[i], y: RAIL_Y + 40 + size * 0.42, size });
const shelf = (board, x, size) => ({ x, y: BOARDS[board] - size * 0.42, size });

const fashionStore = {
  id: 'fashion-store',
  title: 'Fashion Store',
  titleId: 'Toko Baju',
  icon: '👗',
  Background,
  objects: [
    {
      id: 'dress', word: 'dress', wordId: 'gaun', emoji: '👗', ...hang(0, 170),
      sentence: 'The dress is pretty.', sentenceId: 'Gaunnya cantik.',
      question: 'Do you like dresses?', questionId: 'Kamu suka gaun?',
      answer: 'Yes, I like dresses.', answerId: 'Ya, aku suka gaun.',
    },
    {
      id: 'tshirt', word: 't-shirt', wordId: 'kaos', emoji: '👕', ...hang(1, 150),
      sentence: 'I wear a t-shirt when it is hot.', sentenceId: 'Aku pakai kaos kalau cuaca panas.',
      question: 'What color is your t-shirt?', questionId: 'Kaosmu warna apa?',
      answer: 'My t-shirt is blue.', answerId: 'Kaosku biru.',
    },
    {
      id: 'coat', word: 'coat', wordId: 'mantel', emoji: '🧥', ...hang(2, 170),
      sentence: 'I wear a coat when it is cold.', sentenceId: 'Aku pakai mantel kalau dingin.',
      question: 'Is it cold today?', questionId: 'Hari ini dingin?',
      answer: 'No, it is warm.', answerId: 'Tidak, hangat.',
    },
    {
      id: 'scarf', word: 'scarf', wordId: 'syal', emoji: '🧣', ...hang(3, 150),
      sentence: 'The scarf keeps my neck warm.', sentenceId: 'Syal menghangatkan leherku.',
      question: 'Where do you wear a scarf?', questionId: 'Syal dipakai di mana?',
      answer: 'On my neck!', answerId: 'Di leherku!',
    },
    {
      id: 'jeans', word: 'jeans', wordId: 'celana jins', emoji: '👖', ...hang(4, 160),
      sentence: 'I put on my jeans.', sentenceId: 'Aku memakai celana jinsku.',
      question: 'Are your jeans blue?', questionId: 'Apakah celana jinsmu biru?',
      answer: 'Yes, my jeans are blue.', answerId: 'Ya, celana jinsku biru.',
    },
    {
      id: 'shorts', word: 'shorts', wordId: 'celana pendek', emoji: '🩳', ...hang(5, 130),
      sentence: 'Shorts are good for summer.', sentenceId: 'Celana pendek cocok untuk musim panas.',
      question: 'Do you wear shorts?', questionId: 'Kamu pakai celana pendek?',
      answer: 'Yes, I wear shorts.', answerId: 'Ya, aku pakai celana pendek.',
    },
    {
      id: 'swimsuit', word: 'swimsuit', wordId: 'baju renang', emoji: '🩱', ...hang(6, 140),
      sentence: 'I wear a swimsuit to swim.', sentenceId: 'Aku pakai baju renang untuk berenang.',
      question: 'Can you swim?', questionId: 'Kamu bisa berenang?',
      answer: 'Yes, I can swim!', answerId: 'Ya, aku bisa berenang!',
    },
    {
      id: 'sunhat', word: 'sun hat', wordId: 'topi pantai', emoji: '👒', ...shelf(0, 1415, 110),
      sentence: 'The sun hat keeps me cool.', sentenceId: 'Topi pantai membuatku sejuk.',
      question: 'Do you wear a hat?', questionId: 'Kamu pakai topi?',
      answer: 'Yes, I wear a hat.', answerId: 'Ya, aku pakai topi.',
    },
    {
      id: 'cap', word: 'cap', wordId: 'topi', emoji: '🧢', ...shelf(0, 1520, 95),
      sentence: 'I wear my cap to play.', sentenceId: 'Aku pakai topiku untuk bermain.',
      question: 'Can you put on a cap?', questionId: 'Bisa memakai topi?',
      answer: 'Yes, I can.', answerId: 'Ya, aku bisa.',
    },
    {
      id: 'glasses', word: 'glasses', wordId: 'kacamata', emoji: '👓', ...shelf(1, 1415, 95),
      sentence: 'Grandma wears glasses to read.', sentenceId: 'Nenek pakai kacamata untuk membaca.',
      question: 'Who wears glasses?', questionId: 'Siapa yang pakai kacamata?',
      answer: 'My grandpa wears glasses.', answerId: 'Kakekku pakai kacamata.',
    },
    {
      id: 'sunglasses', word: 'sunglasses', wordId: 'kacamata hitam', emoji: '🕶️', ...shelf(1, 1520, 95),
      sentence: 'Sunglasses are cool!', sentenceId: 'Kacamata hitam itu keren!',
      question: 'Do you wear sunglasses?', questionId: 'Kamu pakai kacamata hitam?',
      answer: 'Yes, when it is sunny.', answerId: 'Ya, kalau cuaca cerah.',
    },
    {
      id: 'handbag', word: 'handbag', wordId: 'tas tangan', emoji: '👜', ...shelf(2, 1420, 115),
      sentence: 'Mommy keeps her keys in the handbag.', sentenceId: 'Mama menyimpan kunci di tas tangan.',
      question: 'What is in the handbag?', questionId: 'Ada apa di dalam tas tangan?',
      answer: 'A phone and keys.', answerId: 'Ponsel dan kunci.',
    },
    {
      id: 'ring', word: 'ring', wordId: 'cincin', emoji: '💍', ...shelf(2, 1525, 85),
      sentence: 'The ring is shiny.', sentenceId: 'Cincinnya berkilau.',
      question: 'Is the ring big or small?', questionId: 'Cincinnya besar atau kecil?',
      answer: 'The ring is small.', answerId: 'Cincinnya kecil.',
    },
    {
      id: 'mirror', word: 'mirror', wordId: 'cermin', emoji: '🪞', x: 230, y: 560, size: 250,
      sentence: 'I look in the mirror.', sentenceId: 'Aku bercermin.',
      question: 'Do you look nice?', questionId: 'Kamu kelihatan rapi?',
      answer: 'Yes, I look nice!', answerId: 'Ya, aku kelihatan rapi!',
    },
    {
      id: 'sneaker', word: 'sneaker', wordId: 'sepatu kets', emoji: '👟', x: 530, y: 915, size: 115,
      sentence: 'I run fast in my sneakers.', sentenceId: 'Aku lari cepat pakai sepatu kets.',
      question: 'Can you run fast?', questionId: 'Bisa lari cepat?',
      answer: 'Yes, I can run fast!', answerId: 'Ya, aku bisa lari cepat!',
    },
    {
      id: 'heels', word: 'high heels', wordId: 'sepatu hak tinggi', emoji: '👠', x: 690, y: 915, size: 115,
      sentence: 'High heels are very tall shoes.', sentenceId: 'Sepatu hak tinggi itu sepatu yang tinggi.',
      question: 'Can you walk in high heels?', questionId: 'Bisa jalan pakai sepatu hak tinggi?',
      answer: 'No, they are too high!', answerId: 'Tidak, terlalu tinggi!',
    },
    {
      id: 'boots', word: 'boots', wordId: 'sepatu bot', emoji: '👢', x: 850, y: 905, size: 125,
      sentence: 'I wear boots in the rain.', sentenceId: 'Aku pakai sepatu bot saat hujan.',
      question: 'Do you jump in puddles?', questionId: 'Kamu suka lompat di genangan air?',
      answer: 'Yes, splash, splash!', answerId: 'Ya, ciprat, ciprat!',
    },
    {
      id: 'flipflop', word: 'flip-flop', wordId: 'sandal jepit', emoji: '🩴', x: 1010, y: 920, size: 110,
      sentence: 'I wear flip-flops at the beach.', sentenceId: 'Aku pakai sandal jepit di pantai.',
      question: 'Do you wear flip-flops?', questionId: 'Kamu pakai sandal jepit?',
      answer: 'Yes, I do.', answerId: 'Ya, aku pakai.',
    },
    {
      id: 'gloves', word: 'gloves', wordId: 'sarung tangan', emoji: '🧤', x: 1200, y: 752, size: 90,
      sentence: 'Gloves keep my hands warm.', sentenceId: 'Sarung tangan menghangatkan tanganku.',
      question: 'How many gloves do you need?', questionId: 'Butuh berapa sarung tangan?',
      answer: 'I need two gloves.', answerId: 'Aku butuh dua sarung tangan.',
    },
    {
      id: 'socks', word: 'socks', wordId: 'kaus kaki', emoji: '🧦', x: 1300, y: 752, size: 90,
      sentence: 'The socks are soft.', sentenceId: 'Kaus kakinya lembut.',
      question: 'Can you put on your socks?', questionId: 'Bisa memakai kaus kakimu sendiri?',
      answer: 'Yes, I can do it!', answerId: 'Ya, aku bisa!',
    },
    {
      id: 'tie', word: 'tie', wordId: 'dasi', emoji: '👔', x: 1400, y: 750, size: 95,
      sentence: 'Daddy wears a tie to work.', sentenceId: 'Papa pakai dasi ke kantor.',
      question: 'Who wears a tie?', questionId: 'Siapa yang pakai dasi?',
      answer: 'My daddy wears a tie.', answerId: 'Papaku pakai dasi.',
    },
    {
      id: 'umbrella', word: 'umbrella', wordId: 'payung', emoji: '☂️', x: 1490, y: 1010, size: 170,
      sentence: 'The umbrella keeps me dry.', sentenceId: 'Payung membuatku tetap kering.',
      question: 'Do you need an umbrella today?', questionId: 'Hari ini butuh payung?',
      answer: 'No, it is sunny.', answerId: 'Tidak, cuacanya cerah.',
    },
    {
      id: 'bag', word: 'shopping bag', wordId: 'tas belanja', emoji: '🛍️', x: 1250, y: 1090, size: 140,
      sentence: 'Our new clothes go in the bag.', sentenceId: 'Baju baru kita masuk ke tas.',
      question: 'Can you carry the bag?', questionId: 'Bisa membawa tasnya?',
      answer: 'Yes, I can carry it.', answerId: 'Ya, aku bisa membawanya.',
    },
  ],
};

export default fashionStore;

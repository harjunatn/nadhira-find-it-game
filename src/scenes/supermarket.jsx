// Supermarket scene. Coordinates are in a 1600 x 1200 picture.
// Two shelf units along the back wall, a checkout counter on the right, the floor in front.

const BOARDS = [262, 452, 642];

function ShelfUnit({ x, w, color, dark }) {
  return (
    <g>
      <rect x={x} y="110" width={w} height="560" rx="14" fill={color} stroke={dark} strokeWidth="5" />
      <rect x={x + 18} y="128" width={w - 36} height="524" rx="8" fill="#fffaf0" opacity="0.65" />
      {BOARDS.map((y) => (
        <rect key={y} x={x + 8} y={y} width={w - 16} height="18" rx="5" fill={dark} />
      ))}
      <rect x={x} y="670" width={w} height="60" rx="8" fill={dark} />
    </g>
  );
}

function Background() {
  const tiles = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 17; col++) {
      if ((row + col) % 2) tiles.push(<rect key={`${row}-${col}`} x={col * 100} y={740 + row * 70} width="100" height="70" fill="#e8eef7" />);
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id="supermarket-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a8" />
          <stop offset="1" stopColor="#fff6d8" />
        </linearGradient>
      </defs>
      <rect width="1600" height="740" fill="url(#supermarket-wall)" />
      {/* striped awning along the top */}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M${i * 100} 0 h100 v50 q-25 22 -50 0 q-25 22 -50 0 Z`} fill={i % 2 ? '#ffffff' : '#ff7a59'} />
      ))}
      <rect y="740" width="1600" height="460" fill="#f7f9fc" />
      {tiles}

      <ShelfUnit x={50} w={720} color="#9ad1f5" dark="#5aa7d6" />
      <ShelfUnit x={830} w={720} color="#b5e6a8" dark="#6fbf5f" />

      {/* checkout counter */}
      <ellipse cx="1290" cy="1105" rx="300" ry="22" fill="#000" opacity="0.1" />
      <rect x="1010" y="860" width="560" height="240" rx="18" fill="#ff9f68" stroke="#e0703a" strokeWidth="6" />
      <rect x="990" y="840" width="600" height="34" rx="12" fill="#ffd6bd" stroke="#e0703a" strokeWidth="5" />
      <rect x="1060" y="910" width="460" height="14" rx="7" fill="#ffc09a" />
      <ellipse cx="560" cy="1135" rx="190" ry="20" fill="#000" opacity="0.1" />
    </g>
  );
}

function CashRegister() {
  return (
    <g strokeLinejoin="round">
      <rect x="-42" y="6" width="84" height="40" rx="6" fill="#6c7a8c" stroke="#4a5666" strokeWidth="2" />
      <rect x="-34" y="12" width="68" height="10" rx="3" fill="#8b98a8" />
      <g fill="#dfe6ee">
        {[-26, -12, 2, 16].map((x) => (
          <rect key={x} x={x} y="26" width="10" height="7" rx="2" />
        ))}
        {[-26, -12, 2, 16].map((x) => (
          <rect key={`b${x}`} x={x} y="35" width="10" height="7" rx="2" />
        ))}
      </g>
      <rect x="-8" y="-30" width="16" height="36" rx="4" fill="#4a5666" />
      <rect x="-34" y="-50" width="68" height="28" rx="6" fill="#2f3b4a" stroke="#1f2733" strokeWidth="2" />
      <rect x="-28" y="-44" width="56" height="16" rx="3" fill="#7cf0b0" />
    </g>
  );
}

const onShelf = (board, size) => BOARDS[board] - size * 0.42;

const supermarket = {
  id: 'supermarket',
  title: 'Supermarket',
  titleId: 'Supermarket',
  icon: '🛒',
  Background,
  objects: [
    // left shelves: breakfast and snacks
    {
      id: 'cereal', word: 'cereal', wordId: 'sereal', emoji: '🥣', x: 170, y: onShelf(0, 115), size: 115,
      sentence: 'I eat cereal for breakfast.', sentenceId: 'Aku makan sereal untuk sarapan.',
      question: 'Do you like cereal?', questionId: 'Kamu suka sereal?',
      answer: 'Yes, I do.', answerId: 'Ya, aku suka.',
    },
    {
      id: 'cookie', word: 'cookie', wordId: 'kue kering', emoji: '🍪', x: 410, y: onShelf(0, 110), size: 110,
      sentence: 'The cookie is sweet and crunchy.', sentenceId: 'Kuenya manis dan renyah.',
      question: 'Can you share a cookie?', questionId: 'Bisa berbagi kue?',
      answer: 'Yes, here you are!', answerId: 'Ya, ini untukmu!',
    },
    {
      id: 'chocolate', word: 'chocolate', wordId: 'cokelat', emoji: '🍫', x: 650, y: onShelf(0, 110), size: 110,
      sentence: 'The chocolate is yummy.', sentenceId: 'Cokelatnya enak.',
      question: 'Do you like chocolate?', questionId: 'Kamu suka cokelat?',
      answer: 'Yes, I love chocolate!', answerId: 'Ya, aku suka sekali cokelat!',
    },
    {
      id: 'bread', word: 'bread', wordId: 'roti', emoji: '🍞', x: 170, y: onShelf(1, 120), size: 120,
      sentence: 'We buy bread for sandwiches.', sentenceId: 'Kita beli roti untuk roti isi.',
      question: 'Do you like bread?', questionId: 'Kamu suka roti?',
      answer: 'Yes, I like bread.', answerId: 'Ya, aku suka roti.',
    },
    {
      id: 'juice', word: 'juice', wordId: 'jus', emoji: '🧃', x: 410, y: onShelf(1, 110), size: 110,
      sentence: 'The juice box is cold.', sentenceId: 'Kotak jusnya dingin.',
      question: 'What juice do you like?', questionId: 'Kamu suka jus apa?',
      answer: 'I like orange juice.', answerId: 'Aku suka jus jeruk.',
    },
    {
      id: 'donut', word: 'donut', wordId: 'donat', emoji: '🍩', x: 650, y: onShelf(1, 110), size: 110,
      sentence: 'The donut has a hole.', sentenceId: 'Donatnya ada lubangnya.',
      question: 'Is the donut round or square?', questionId: 'Donatnya bulat atau kotak?',
      answer: 'The donut is round.', answerId: 'Donatnya bulat.',
    },
    {
      id: 'milk', word: 'milk', wordId: 'susu', emoji: '🥛', x: 170, y: onShelf(2, 120), size: 120,
      sentence: 'Milk makes my bones strong.', sentenceId: 'Susu membuat tulangku kuat.',
      question: 'Do you drink milk?', questionId: 'Kamu minum susu?',
      answer: 'Yes, I drink milk.', answerId: 'Ya, aku minum susu.',
    },
    {
      id: 'cheese', word: 'cheese', wordId: 'keju', emoji: '🧀', x: 410, y: onShelf(2, 110), size: 110,
      sentence: 'The cheese is yellow.', sentenceId: 'Kejunya kuning.',
      question: 'Do you like cheese?', questionId: 'Kamu suka keju?',
      answer: 'Yes, I like cheese.', answerId: 'Ya, aku suka keju.',
    },
    {
      id: 'egg', word: 'egg', wordId: 'telur', emoji: '🥚', x: 650, y: onShelf(2, 100), size: 100,
      sentence: 'The hen lays an egg.', sentenceId: 'Ayam betina bertelur.',
      question: 'Do you like eggs?', questionId: 'Kamu suka telur?',
      answer: 'Yes, I like eggs.', answerId: 'Ya, aku suka telur.',
    },

    // right shelves: fruit and vegetables
    {
      id: 'pineapple', word: 'pineapple', wordId: 'nanas', emoji: '🍍', x: 950, y: onShelf(0, 125), size: 125,
      sentence: 'The pineapple is spiky.', sentenceId: 'Nanasnya berduri.',
      question: 'Is a pineapple sweet?', questionId: 'Apakah nanas manis?',
      answer: 'Yes, it is sweet.', answerId: 'Ya, manis.',
    },
    {
      id: 'strawberry', word: 'strawberry', wordId: 'stroberi', emoji: '🍓', x: 1140, y: onShelf(0, 100), size: 100,
      sentence: 'The strawberry is red.', sentenceId: 'Stroberinya merah.',
      question: 'Is the strawberry big or small?', questionId: 'Stroberinya besar atau kecil?',
      answer: 'The strawberry is small.', answerId: 'Stroberinya kecil.',
    },
    {
      id: 'grapes', word: 'grapes', wordId: 'anggur', emoji: '🍇', x: 1430, y: onShelf(0, 115), size: 115,
      sentence: 'The grapes are purple.', sentenceId: 'Anggurnya ungu.',
      question: 'How many grapes can you eat?', questionId: 'Kamu bisa makan berapa anggur?',
      answer: 'I can eat ten grapes!', answerId: 'Aku bisa makan sepuluh anggur!',
    },
    {
      id: 'tomato', word: 'tomato', wordId: 'tomat', emoji: '🍅', x: 950, y: onShelf(1, 105), size: 105,
      sentence: 'The tomato is red and round.', sentenceId: 'Tomatnya merah dan bulat.',
      question: 'What color is the tomato?', questionId: 'Tomatnya warna apa?',
      answer: 'The tomato is red.', answerId: 'Tomatnya merah.',
    },
    {
      id: 'carrot', word: 'carrot', wordId: 'wortel', emoji: '🥕', x: 1140, y: onShelf(1, 110), size: 110, rotate: -20,
      sentence: 'Rabbits love carrots.', sentenceId: 'Kelinci suka wortel.',
      question: 'Can you hop like a rabbit?', questionId: 'Bisa melompat seperti kelinci?',
      answer: 'Hop, hop, hop!', answerId: 'Lompat, lompat, lompat!',
    },
    {
      id: 'broccoli', word: 'broccoli', wordId: 'brokoli', emoji: '🥦', x: 1300, y: onShelf(1, 110), size: 110,
      sentence: 'Broccoli looks like a little tree.', sentenceId: 'Brokoli mirip pohon kecil.',
      question: 'Do you eat broccoli?', questionId: 'Kamu makan brokoli?',
      answer: 'Yes, I eat broccoli.', answerId: 'Ya, aku makan brokoli.',
    },
    {
      id: 'corn', word: 'corn', wordId: 'jagung', emoji: '🌽', x: 1460, y: onShelf(1, 115), size: 115, rotate: 15,
      sentence: 'The corn is yellow.', sentenceId: 'Jagungnya kuning.',
      question: 'Do you like corn?', questionId: 'Kamu suka jagung?',
      answer: 'Yes, I like corn.', answerId: 'Ya, aku suka jagung.',
    },
    {
      id: 'apple', word: 'apple', wordId: 'apel', emoji: '🍎', x: 950, y: onShelf(2, 105), size: 105,
      sentence: 'I put an apple in the cart.', sentenceId: 'Aku taruh apel di troli.',
      question: 'Is the apple red or green?', questionId: 'Apelnya merah atau hijau?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'banana', word: 'banana', wordId: 'pisang', emoji: '🍌', x: 1120, y: onShelf(2, 115), size: 115,
      sentence: 'Monkeys love bananas.', sentenceId: 'Monyet suka pisang.',
      question: 'Can you peel a banana?', questionId: 'Bisa mengupas pisang?',
      answer: 'Yes, I can peel it.', answerId: 'Ya, aku bisa mengupasnya.',
    },
    {
      id: 'orange', word: 'orange', wordId: 'jeruk', emoji: '🍊', x: 1290, y: onShelf(2, 105), size: 105,
      sentence: 'The orange is juicy.', sentenceId: 'Jeruknya banyak airnya.',
      question: 'Is the orange round?', questionId: 'Apakah jeruknya bulat?',
      answer: 'Yes, it is round.', answerId: 'Ya, bulat.',
    },
    {
      id: 'watermelon', word: 'watermelon', wordId: 'semangka', emoji: '🍉', x: 1460, y: onShelf(2, 120), size: 120,
      sentence: 'The watermelon is big and heavy.', sentenceId: 'Semangkanya besar dan berat.',
      question: 'Is it red inside?', questionId: 'Apakah dalamnya merah?',
      answer: 'Yes, it is red inside!', answerId: 'Ya, dalamnya merah!',
    },

    // floor and checkout
    {
      id: 'cart', word: 'shopping cart', wordId: 'troli belanja', emoji: '🛒', x: 560, y: 960, size: 300,
      sentence: 'I push the shopping cart.', sentenceId: 'Aku mendorong troli belanja.',
      question: 'Can you push the cart?', questionId: 'Bisa mendorong trolinya?',
      answer: 'Yes, I can push it.', answerId: 'Ya, aku bisa mendorongnya.',
    },
    {
      id: 'basket', word: 'basket', wordId: 'keranjang', emoji: '🧺', x: 170, y: 1040, size: 160,
      sentence: 'I carry a basket.', sentenceId: 'Aku membawa keranjang.',
      question: 'Is the basket heavy or light?', questionId: 'Keranjangnya berat atau ringan?',
      answer: 'The basket is light.', answerId: 'Keranjangnya ringan.',
    },
    {
      id: 'register', word: 'cash register', wordId: 'mesin kasir', art: CashRegister, x: 1130, y: 790, size: 170,
      sentence: 'We pay at the cash register.', sentenceId: 'Kita bayar di mesin kasir.',
      question: 'Can you say thank you?', questionId: 'Bisa bilang terima kasih?',
      answer: 'Thank you!', answerId: 'Terima kasih!',
    },
    {
      id: 'bag', word: 'shopping bag', wordId: 'tas belanja', emoji: '🛍️', x: 1450, y: 770, size: 140,
      sentence: 'I carry the shopping bag home.', sentenceId: 'Aku membawa tas belanja pulang.',
      question: 'Can you help carry the bag?', questionId: 'Bisa bantu bawa tasnya?',
      answer: 'Yes, I can help!', answerId: 'Ya, aku bisa bantu!',
    },
    {
      id: 'money', word: 'money', wordId: 'uang', emoji: '💵', x: 1290, y: 805, size: 100,
      sentence: 'We pay with money.', sentenceId: 'Kita bayar pakai uang.',
      question: 'Can you count to three?', questionId: 'Bisa berhitung sampai tiga?',
      answer: 'One, two, three!', answerId: 'Satu, dua, tiga!',
    },
  ],
};

export default supermarket;

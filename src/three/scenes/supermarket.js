// Supermarket — a 4 x 3 room. x runs west (-2) to east (+2), z runs north (-1.5) to south (+1.5).
// A row of shelves stands in the middle, so things in the far aisle hide behind it,
// and a monkey waits between the tall shelf and the toy machine.

const PET = 0.2;
const BELT = 0.2; // top of the checkout belt

const supermarket = {
  id: 'supermarket-3d',
  title: 'Supermarket',
  titleId: 'Supermarket',
  icon: '🛒',
  room: { w: 4, d: 3, wallColor: '#cdeed9', floor: { type: 'tiles', color: '#fbf6ea', color2: '#ead9bd' } },
  items: [
    // ----- walls -----
    {
      id: 'window', model: 'furniture/wallWindow', segment: { side: 'S', index: 1 },
      word: 'window', wordId: 'jendela',
      sentence: 'The shop has big windows.', sentenceId: 'Tokonya punya jendela besar.',
      question: 'Can you see outside?', questionId: 'Bisa lihat ke luar?',
      answer: 'Yes, I can see outside.', answerId: 'Ya, aku bisa lihat ke luar.',
    },
    { id: 'window2', model: 'furniture/wallWindow', segment: { side: 'S', index: 2 }, same: 'window' },
    { id: 'door-wall', model: 'furniture/wallDoorway', segment: { side: 'W', index: 2 } },
    {
      id: 'door', model: 'furniture/doorway', wall: 'W', at: [1, 0, 0],
      word: 'door', wordId: 'pintu',
      sentence: 'We walk in through the door.', sentenceId: 'Kita masuk lewat pintu.',
      question: 'Can you push the door?', questionId: 'Bisa dorong pintunya?',
      answer: 'Yes, I can push it.', answerId: 'Ya, aku bisa mendorongnya.',
    },

    // ----- north wall: fridge, freezer, tall shelf, toy machine -----
    {
      id: 'fridge', model: 'market/freezers-standing', at: [-1.48, 0, -1.24],
      word: 'fridge', wordId: 'kulkas',
      sentence: 'The drinks are cold in the fridge.', sentenceId: 'Minumannya dingin di dalam kulkas.',
      question: 'Is the fridge hot or cold?', questionId: 'Kulkasnya panas atau dingin?',
      answer: 'The fridge is cold.', answerId: 'Kulkasnya dingin.',
    },
    {
      id: 'freezer', model: 'market/freezer', at: [-0.52, 0, -1.18],
      word: 'freezer', wordId: 'lemari pembeku',
      sentence: 'The freezer is very, very cold.', sentenceId: 'Lemari pembekunya dingin sekali.',
      question: 'Can you say brrr?', questionId: 'Bisa bilang brrr?',
      answer: 'Brrr, it is cold!', answerId: 'Brrr, dingin!',
    },
    {
      id: 'ice-cream', model: 'food/ice-cream', scale: 0.55, at: [-0.52, 0.34, -1.18],
      word: 'ice cream', wordId: 'es krim',
      sentence: 'Ice cream is cold and sweet.', sentenceId: 'Es krim itu dingin dan manis.',
      question: 'Do you like ice cream?', questionId: 'Kamu suka es krim?',
      answer: 'Yes, I love ice cream!', answerId: 'Ya, aku suka sekali es krim!',
    },
    {
      id: 'shelf', model: 'market/shelf-end', at: [0.36, 0, -1.28],
      word: 'shelf', wordId: 'rak',
      sentence: 'The bottles stand on the shelf.', sentenceId: 'Botol-botol berdiri di rak.',
      question: 'Is the shelf tall or short?', questionId: 'Raknya tinggi atau pendek?',
      answer: 'The shelf is tall.', answerId: 'Raknya tinggi.',
    },
    {
      // between the tall shelf and the toy machine
      id: 'monkey', model: 'pets/animal-monkey', scale: PET * 0.9, at: [1.08, 0, -1.25], ry: 10, animation: 'idle',
      word: 'monkey', wordId: 'monyet',
      sentence: 'The monkey wants a banana.', sentenceId: 'Monyet mau pisang.',
      question: 'What does the monkey say?', questionId: 'Monyet bilang apa?',
      answer: 'Ooh ooh, aah aah!', answerId: 'Uu uu, aa aa!',
    },
    {
      id: 'toy-machine', model: 'market/gacha-machine', at: [1.68, 0, -1.24],
      word: 'toy machine', wordId: 'mesin mainan',
      sentence: 'The toy machine is full of toys.', sentenceId: 'Mesin mainan penuh dengan mainan.',
      question: 'Do you want a toy?', questionId: 'Kamu mau mainan?',
      answer: 'Yes, I want a toy.', answerId: 'Ya, aku mau mainan.',
    },

    // ----- west wall -----
    {
      id: 'bread', model: 'market/display-bread', at: [-1.66, 0, -0.35], ry: 90,
      word: 'bread', wordId: 'roti',
      sentence: 'The bread smells so good.', sentenceId: 'Rotinya wangi sekali.',
      question: 'Do you like bread?', questionId: 'Kamu suka roti?',
      answer: 'Yes, I like bread.', answerId: 'Ya, aku suka roti.',
    },
    {
      id: 'basket', model: 'market/shopping-basket', at: [-1.2, 0, 0.3], ry: 20,
      word: 'basket', wordId: 'keranjang',
      sentence: 'I carry the basket.', sentenceId: 'Aku membawa keranjang.',
      question: 'What color is the basket?', questionId: 'Keranjangnya warna apa?',
      answer: 'The basket is green.', answerId: 'Keranjangnya hijau.',
    },

    // ----- middle: a row of shelves -----
    {
      id: 'snacks', model: 'market/shelf-bags', at: [-0.3, 0, -0.1],
      word: 'snacks', wordId: 'camilan',
      sentence: 'The snack bags are yellow and orange.', sentenceId: 'Bungkus camilannya kuning dan oranye.',
      question: 'Do you like snacks?', questionId: 'Kamu suka camilan?',
      answer: 'Yes, I like snacks.', answerId: 'Ya, aku suka camilan.',
    },
    {
      id: 'boxes', model: 'market/shelf-boxes', at: [0.52, 0, -0.1],
      word: 'boxes', wordId: 'kotak',
      sentence: 'The boxes sit in a row.', sentenceId: 'Kotak-kotaknya berjajar.',
      question: 'What color are the boxes?', questionId: 'Kotaknya warna apa?',
      answer: 'The boxes are yellow and blue.', answerId: 'Kotaknya kuning dan biru.',
    },

    // ----- east side: cans, checkout -----
    {
      id: 'cans', model: 'market/display-cans', at: [1.55, 0, -0.42],
      word: 'cans', wordId: 'kaleng',
      sentence: 'The cans make a tall tower.', sentenceId: 'Kaleng-kaleng jadi menara tinggi.',
      question: 'Is the tower tall or short?', questionId: 'Menaranya tinggi atau pendek?',
      answer: 'The tower is tall.', answerId: 'Menaranya tinggi.',
    },
    {
      id: 'register', model: 'market/cash-register', at: [1.4, 0, 0.8],
      word: 'cash register', wordId: 'mesin kasir',
      sentence: 'We pay at the cash register.', sentenceId: 'Kita bayar di mesin kasir.',
      question: 'Can you say beep, beep?', questionId: 'Bisa bilang bip, bip?',
      answer: 'Beep, beep!', answerId: 'Bip, bip!',
    },
    {
      id: 'cashier', model: 'market/character-employee', at: [1.66, 0, 0.45], animation: 'idle',
      word: 'cashier', wordId: 'kasir',
      sentence: 'The cashier helps us pay.', sentenceId: 'Kasir membantu kita membayar.',
      question: 'Can you say thank you?', questionId: 'Bisa bilang terima kasih?',
      answer: 'Thank you very much!', answerId: 'Terima kasih banyak!',
    },
    {
      id: 'milk', model: 'food/carton', scale: 0.5, at: [1.1, BELT, 0.56],
      word: 'milk', wordId: 'susu',
      sentence: 'Milk makes me strong.', sentenceId: 'Susu membuatku kuat.',
      question: 'Do you drink milk?', questionId: 'Kamu minum susu?',
      answer: 'Yes, I drink milk.', answerId: 'Ya, aku minum susu.',
    },
    {
      id: 'banana', model: 'food/banana', scale: 0.45, at: [1.1, BELT, 1.02],
      word: 'banana', wordId: 'pisang',
      sentence: 'The banana is long and yellow.', sentenceId: 'Pisangnya panjang dan kuning.',
      question: 'Do you like bananas?', questionId: 'Kamu suka pisang?',
      answer: 'Yes, I like bananas.', answerId: 'Ya, aku suka pisang.',
    },

    // ----- south side: fruit, flowers, the cart -----
    {
      id: 'cart', model: 'market/shopping-cart', at: [0.5, 0, 0.85], ry: 180,
      word: 'shopping cart', wordId: 'troli belanja',
      sentence: 'We push the shopping cart.', sentenceId: 'Kita mendorong troli belanja.',
      question: 'Can you push the cart?', questionId: 'Bisa dorong trolinya?',
      answer: 'Yes, I can push it.', answerId: 'Ya, aku bisa mendorongnya.',
    },
    {
      // rides in the cart
      id: 'pineapple', model: 'food/pineapple', scale: 0.75, at: [0.5, 0.17, 0.78],
      word: 'pineapple', wordId: 'nanas',
      sentence: 'The pineapple has spiky leaves.', sentenceId: 'Nanas punya daun yang runcing.',
      question: 'Is the pineapple sweet or sour?', questionId: 'Nanasnya manis atau asam?',
      answer: 'The pineapple is sweet.', answerId: 'Nanasnya manis.',
    },
    {
      id: 'fruit', model: 'market/display-fruit', at: [-0.3, 0, 0.95],
      word: 'fruit', wordId: 'buah',
      sentence: 'Fruit is good for you.', sentenceId: 'Buah itu bagus untuk badan.',
      question: 'Do you like fruit?', questionId: 'Kamu suka buah?',
      answer: 'Yes, I like fruit.', answerId: 'Ya, aku suka buah.',
    },
    {
      id: 'pumpkin', model: 'food/pumpkin', scale: 0.75, at: [0.12, 0, 1.25],
      word: 'pumpkin', wordId: 'labu',
      sentence: 'The pumpkin is round and orange.', sentenceId: 'Labunya bulat dan oranye.',
      question: 'Is the pumpkin round or square?', questionId: 'Labunya bulat atau kotak?',
      answer: 'The pumpkin is round.', answerId: 'Labunya bulat.',
    },
    {
      id: 'flowers', model: 'market/display-flowers', scale: 0.85, at: [-1.22, 0, 1.06],
      word: 'flowers', wordId: 'bunga',
      sentence: 'The flowers smell nice.', sentenceId: 'Bunganya wangi.',
      question: 'Can you smell the flowers?', questionId: 'Bisa cium bunganya?',
      answer: 'Mmm, they smell nice!', answerId: 'Hmm, wangi!',
    },
  ],
};

export default supermarket;

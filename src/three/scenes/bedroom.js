// Bedroom — a 3 x 3 room. x runs west (-1.5) to east (+1.5), z runs north (-1.5) to south (+1.5).
// Things stand on their bottom centre; ry 0 = front faces south, 90 = east, -90 = west, 180 = north.
// Things with `word` can be found; the others are scenery. See src/three/scenes/README.md.

const PET = 0.2;

const bedroom = {
  id: 'bedroom-3d',
  title: 'Bedroom',
  titleId: 'Kamar Tidur',
  icon: '🛏️',
  room: { w: 3, d: 3, wallColor: '#d7ccff', floor: { type: 'wood', color: '#f1dcc0' } },
  items: [
    // ----- walls -----
    {
      id: 'window', model: 'furniture/wallWindow', segment: { side: 'N', index: 1 },
      word: 'window', wordId: 'jendela',
      sentence: 'Look out the window!', sentenceId: 'Lihat ke luar jendela!',
      question: 'Can you open the window?', questionId: 'Bisa buka jendelanya?',
      answer: 'Yes, I can open it.', answerId: 'Ya, aku bisa membukanya.',
    },
    { id: 'window2', model: 'furniture/wallWindow', segment: { side: 'E', index: 1 }, same: 'window' },
    { id: 'door-wall', model: 'furniture/wallDoorway', segment: { side: 'W', index: 2 } },
    {
      id: 'door', model: 'furniture/doorway', wall: 'W', at: [1, 0, 0],
      word: 'door', wordId: 'pintu',
      sentence: 'Please close the door.', sentenceId: 'Tolong tutup pintunya.',
      question: 'Can you knock on the door?', questionId: 'Bisa ketuk pintunya?',
      answer: 'Knock, knock!', answerId: 'Tok, tok!',
    },
    {
      id: 'mirror', model: 'furniture/bathroomMirror', wall: 'W', at: [0.02, 0.48, 0.07],
      word: 'mirror', wordId: 'cermin',
      sentence: 'I can see myself in the mirror.', sentenceId: 'Aku bisa melihat diriku di cermin.',
      question: 'Can you smile in the mirror?', questionId: 'Bisa senyum di depan cermin?',
      answer: 'Yes! Look at my smile.', answerId: 'Ya! Lihat senyumku.',
    },

    // ----- north side: bed, bedside table, shelf, plant, wardrobe -----
    {
      id: 'bed', model: 'furniture/bedDouble', at: [-1.0, 0, -0.925], tint: { carpet: '#5fa8f0' },
      word: 'bed', wordId: 'tempat tidur',
      sentence: 'I sleep in my bed.', sentenceId: 'Aku tidur di tempat tidurku.',
      question: 'Is the bed big or small?', questionId: 'Tempat tidurnya besar atau kecil?',
      answer: 'The bed is big.', answerId: 'Tempat tidurnya besar.',
    },
    {
      id: 'pillow', model: 'furniture/pillow', scale: 1.15, at: [-1.0, 0.27, -1.02], ry: -12, tint: { carpet: '#ffd23f' },
      word: 'pillow', wordId: 'bantal',
      sentence: 'The pillow is soft.', sentenceId: 'Bantalnya empuk.',
      question: 'Do you sleep with a pillow?', questionId: 'Kamu tidur pakai bantal?',
      answer: 'Yes, I do.', answerId: 'Ya, aku pakai.',
    },
    {
      id: 'panda', model: 'pets/animal-panda', scale: PET * 0.85, at: [-0.8, 0.25, -0.6], ry: 20,
      word: 'panda', wordId: 'panda',
      sentence: 'The panda is black and white.', sentenceId: 'Pandanya hitam dan putih.',
      question: 'Do you like pandas?', questionId: 'Kamu suka panda?',
      answer: 'Yes, I love pandas!', answerId: 'Ya, aku suka sekali panda!',
    },
    { id: 'bedside', model: 'furniture/cabinetBedDrawerTable', at: [-0.33, 0, -1.37] },
    {
      id: 'lamp', model: 'furniture/lampRoundTable', scale: 1.2, at: [-0.33, 0.26, -1.37],
      word: 'lamp', wordId: 'lampu',
      sentence: 'The lamp can turn on.', sentenceId: 'Lampu itu bisa menyala.',
      question: 'Is the lamp on or off?', questionId: 'Lampunya nyala atau mati?',
      answer: 'The lamp is on.', answerId: 'Lampunya nyala.',
    },
    {
      id: 'shelf', model: 'furniture/bookcaseOpenLow', at: [0.2, 0, -1.37],
      word: 'shelf', wordId: 'rak',
      sentence: 'The books are on the shelf.', sentenceId: 'Buku-bukunya ada di rak.',
      question: 'What is on the shelf?', questionId: 'Ada apa di rak?',
      answer: 'Books are on the shelf.', answerId: 'Ada buku di rak.',
    },
    {
      id: 'books', model: 'furniture/books', scale: 1.8, at: [0.2, 0.4, -1.37],
      word: 'books', wordId: 'buku-buku',
      sentence: 'I like to read books.', sentenceId: 'Aku suka membaca buku.',
      question: 'Do you like books?', questionId: 'Kamu suka buku?',
      answer: 'Yes, I love books!', answerId: 'Ya, aku suka sekali buku!',
    },
    {
      id: 'plant', model: 'furniture/pottedPlant', at: [0.62, 0, -1.33],
      word: 'plant', wordId: 'tanaman',
      sentence: 'The plant needs water.', sentenceId: 'Tanaman itu butuh air.',
      question: 'Is the plant green?', questionId: 'Apakah tanamannya hijau?',
      answer: 'Yes, it is green.', answerId: 'Ya, warnanya hijau.',
    },
    {
      id: 'wardrobe', model: 'furniture/bookcaseClosedDoors', at: [1.0, 0, -1.37],
      word: 'wardrobe', wordId: 'lemari pakaian',
      sentence: 'My clothes are in the wardrobe.', sentenceId: 'Bajuku ada di dalam lemari pakaian.',
      question: 'What is in your wardrobe?', questionId: 'Ada apa di dalam lemarimu?',
      answer: 'My clothes are in it.', answerId: 'Bajuku ada di dalamnya.',
    },
    {
      // hides in the corner behind the wardrobe
      id: 'present', model: 'holiday/present-a-cube', scale: 0.48, at: [1.36, 0, -1.34], ry: 15,
      word: 'present', wordId: 'kado',
      sentence: 'The present is for you!', sentenceId: 'Kadonya untuk kamu!',
      question: 'Do you like presents?', questionId: 'Kamu suka kado?',
      answer: 'Yes, I love presents!', answerId: 'Ya, aku suka sekali kado!',
    },

    // ----- east side: desk -----
    {
      id: 'desk', model: 'furniture/desk', at: [1.3, 0, 0.3], ry: -90,
      word: 'desk', wordId: 'meja belajar',
      sentence: 'I draw at my desk.', sentenceId: 'Aku menggambar di meja belajarku.',
      question: 'Do you have a desk?', questionId: 'Kamu punya meja belajar?',
      answer: 'Yes, I have a desk.', answerId: 'Ya, aku punya meja belajar.',
    },
    {
      id: 'chair', model: 'furniture/chairDesk', at: [0.86, 0, 0.3], ry: 90,
      word: 'chair', wordId: 'kursi',
      sentence: 'I sit on the chair.', sentenceId: 'Aku duduk di kursi.',
      question: 'What color is the chair?', questionId: 'Kursinya warna apa?',
      answer: 'The chair is red.', answerId: 'Kursinya merah.',
    },
    {
      id: 'laptop', model: 'furniture/laptop', scale: 1.1, at: [1.32, 0.38, 0.14], ry: -90,
      word: 'laptop', wordId: 'laptop',
      sentence: 'The laptop is on the desk.', sentenceId: 'Laptopnya ada di atas meja.',
      question: 'Can you type on a laptop?', questionId: 'Bisa mengetik di laptop?',
      answer: 'Yes, I can type.', answerId: 'Ya, aku bisa mengetik.',
    },
    {
      id: 'radio', model: 'furniture/radio', scale: 0.75, at: [1.37, 0.38, 0.53], ry: -90,
      word: 'radio', wordId: 'radio',
      sentence: 'The radio plays music.', sentenceId: 'Radio memutar musik.',
      question: 'Do you like music?', questionId: 'Kamu suka musik?',
      answer: 'Yes, I like music.', answerId: 'Ya, aku suka musik.',
    },
    {
      // peeks out from behind the desk
      id: 'bunny', model: 'pets/animal-bunny', scale: PET, at: [1.27, 0, 1.2], ry: -140, animation: 'idle',
      word: 'bunny', wordId: 'kelinci',
      sentence: 'The bunny can hop.', sentenceId: 'Kelinci bisa melompat.',
      question: 'Can you hop like a bunny?', questionId: 'Bisa melompat seperti kelinci?',
      answer: 'Hop, hop, hop!', answerId: 'Lompat, lompat, lompat!',
    },

    // ----- west side -----
    {
      id: 'trashcan', model: 'furniture/trashcan', scale: 0.8, at: [-1.34, 0, 0.42], ry: 90,
      word: 'trash can', wordId: 'tempat sampah',
      sentence: 'Paper goes in the trash can.', sentenceId: 'Kertas dibuang ke tempat sampah.',
      question: 'Can you keep your room clean?', questionId: 'Bisa menjaga kamarmu bersih?',
      answer: 'Yes, I can!', answerId: 'Ya, aku bisa!',
    },

    // ----- floor: rug and toys -----
    {
      id: 'rug', model: 'furniture/rugRound', at: [0.05, 0.002, 0.5], tint: { carpet: '#ff9f43', carpetDarker: '#e07a1f' },
      word: 'rug', wordId: 'karpet',
      sentence: 'The rug is on the floor.', sentenceId: 'Karpetnya ada di lantai.',
      question: 'Is the rug round or square?', questionId: 'Karpetnya bulat atau kotak?',
      answer: 'The rug is round.', answerId: 'Karpetnya bulat.',
    },
    {
      id: 'train', model: 'holiday/train-locomotive', scale: 0.6, at: [0.0, 0.012, 0.45], ry: 35,
      word: 'train', wordId: 'kereta',
      sentence: 'The train says choo-choo!', sentenceId: 'Keretanya berbunyi tut-tut!',
      question: 'Can you say choo-choo?', questionId: 'Bisa bilang tut-tut?',
      answer: 'Choo-choo!', answerId: 'Tut-tut!',
    },
    {
      id: 'cat', model: 'pets/animal-cat', scale: PET, at: [-0.75, 0, 0.02], ry: 25, animation: 'idle',
      word: 'cat', wordId: 'kucing',
      sentence: 'The cat says meow.', sentenceId: 'Kucing berbunyi meong.',
      question: 'Can you say meow like a cat?', questionId: 'Bisa bilang meong seperti kucing?',
      answer: 'Meow, meow!', answerId: 'Meong, meong!',
    },
    {
      id: 'box', model: 'furniture/cardboardBoxOpen', scale: 1.15, at: [-0.45, 0, 1.3], ry: 180,
      word: 'box', wordId: 'kardus',
      sentence: 'My toys go in the box.', sentenceId: 'Mainanku disimpan di kardus.',
      question: 'Is the box open or closed?', questionId: 'Kardusnya terbuka atau tertutup?',
      answer: 'The box is open.', answerId: 'Kardusnya terbuka.',
    },
    {
      // sits in the toy box
      id: 'car', model: 'toycar/vehicle-racer', scale: 0.36, at: [-0.45, 0.13, 1.3], ry: 90,
      word: 'toy car', wordId: 'mobil mainan',
      sentence: 'The toy car goes vroom!', sentenceId: 'Mobil mainannya berbunyi brum!',
      question: 'Can you say vroom, vroom?', questionId: 'Bisa bilang brum, brum?',
      answer: 'Vroom, vroom!', answerId: 'Brum, brum!',
    },
  ],
};

export default bedroom;

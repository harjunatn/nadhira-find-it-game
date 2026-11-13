// Living room — a 3 x 3 room. x runs west (-1.5) to east (+1.5), z runs north (-1.5) to south (+1.5).
// The sofa faces the TV on the north wall, so things on the table hide behind it from the south.

const PET = 0.2;

const livingRoom = {
  id: 'living-room-3d',
  title: 'Living Room',
  titleId: 'Ruang Tamu',
  icon: '🛋️',
  room: { w: 3, d: 3, wallColor: '#ffe3b5', floor: { type: 'wood', color: '#e9cfae' } },
  items: [
    // ----- walls -----
    {
      id: 'window', model: 'furniture/wallWindow', segment: { side: 'N', index: 0 },
      word: 'window', wordId: 'jendela',
      sentence: 'The sun shines through the window.', sentenceId: 'Matahari bersinar lewat jendela.',
      question: 'Is the window open or closed?', questionId: 'Jendelanya terbuka atau tertutup?',
      answer: 'The window is closed.', answerId: 'Jendelanya tertutup.',
    },
    { id: 'window2', model: 'furniture/wallWindow', segment: { side: 'N', index: 2 }, same: 'window' },
    { id: 'door-wall', model: 'furniture/wallDoorway', segment: { side: 'E', index: 2 } },
    {
      id: 'door', model: 'furniture/doorway', wall: 'E', at: [1, 0, 0],
      word: 'door', wordId: 'pintu',
      sentence: 'Someone is at the door!', sentenceId: 'Ada orang di depan pintu!',
      question: 'Who is at the door?', questionId: 'Siapa yang di depan pintu?',
      answer: 'It is Grandma!', answerId: 'Itu Nenek!',
    },

    // ----- north side: TV corner -----
    {
      id: 'cabinet', model: 'furniture/cabinetTelevision', at: [0.15, 0, -1.36],
      word: 'cabinet', wordId: 'lemari kecil',
      sentence: 'The TV is on the cabinet.', sentenceId: 'TV-nya ada di atas lemari kecil.',
      question: 'Is the cabinet tall or short?', questionId: 'Lemarinya tinggi atau pendek?',
      answer: 'The cabinet is short.', answerId: 'Lemarinya pendek.',
    },
    {
      id: 'tv', model: 'furniture/televisionModern', at: [0.15, 0.31, -1.36],
      word: 'television', wordId: 'televisi',
      sentence: 'We watch cartoons on television.', sentenceId: 'Kami menonton kartun di televisi.',
      question: 'What do you like to watch?', questionId: 'Kamu suka menonton apa?',
      answer: 'I like to watch cartoons.', answerId: 'Aku suka menonton kartun.',
    },
    {
      id: 'speaker', model: 'furniture/speaker', at: [0.8, 0, -1.38],
      word: 'speaker', wordId: 'pengeras suara',
      sentence: 'Music comes from the speaker.', sentenceId: 'Musik keluar dari pengeras suara.',
      question: 'Can you dance to the music?', questionId: 'Bisa menari mengikuti musik?',
      answer: 'Yes, I can dance!', answerId: 'Ya, aku bisa menari!',
    },
    { id: 'speaker2', model: 'furniture/speaker', at: [-0.5, 0, -1.38], same: 'speaker' },
    {
      id: 'plant', model: 'furniture/pottedPlant', at: [-1.27, 0, -1.27],
      word: 'plant', wordId: 'tanaman',
      sentence: 'The plant has green leaves.', sentenceId: 'Tanaman itu daunnya hijau.',
      question: 'Is the plant big or small?', questionId: 'Tanamannya besar atau kecil?',
      answer: 'The plant is big.', answerId: 'Tanamannya besar.',
    },
    {
      id: 'lamp', model: 'furniture/lampRoundFloor', at: [1.3, 0, -1.3],
      word: 'lamp', wordId: 'lampu',
      sentence: 'The lamp is tall.', sentenceId: 'Lampunya tinggi.',
      question: 'Can you turn on the lamp?', questionId: 'Bisa menyalakan lampunya?',
      answer: 'Click! The lamp is on.', answerId: 'Klik! Lampunya menyala.',
    },

    // ----- middle: sofa, table, rug -----
    {
      id: 'rug', model: 'furniture/rugRectangle', at: [0.1, 0.002, 0.25], tint: { carpet: '#7db7e8', carpetDarker: '#4f8fcf' },
      word: 'rug', wordId: 'karpet',
      sentence: 'The rug is soft under my feet.', sentenceId: 'Karpetnya lembut di kakiku.',
      question: 'What color is the rug?', questionId: 'Karpetnya warna apa?',
      answer: 'The rug is blue.', answerId: 'Karpetnya biru.',
    },
    {
      id: 'sofa', model: 'furniture/loungeSofa', at: [0.1, 0, 0.95], ry: 180, tint: { carpet: '#4cc47a' },
      word: 'sofa', wordId: 'sofa',
      sentence: 'We sit on the sofa together.', sentenceId: 'Kami duduk bersama di sofa.',
      question: 'What color is the sofa?', questionId: 'Sofanya warna apa?',
      answer: 'The sofa is green.', answerId: 'Sofanya hijau.',
    },
    {
      id: 'cushion', model: 'furniture/pillowBlue', scale: 1.5, at: [-0.18, 0.21, 0.9], ry: 180, tint: { carpetBlue: '#ffd23f' },
      word: 'cushion', wordId: 'bantal sofa',
      sentence: 'The cushion is soft.', sentenceId: 'Bantal sofanya empuk.',
      question: 'What color is the cushion?', questionId: 'Bantal sofanya warna apa?',
      answer: 'The cushion is yellow.', answerId: 'Bantal sofanya kuning.',
    },
    {
      id: 'table', model: 'furniture/tableCoffee', at: [0.1, 0, 0.2],
      word: 'table', wordId: 'meja',
      sentence: 'The pizza is on the table.', sentenceId: 'Pizanya ada di atas meja.',
      question: 'What is on the table?', questionId: 'Ada apa di atas meja?',
      answer: 'Pizza is on the table.', answerId: 'Ada piza di atas meja.',
    },
    {
      id: 'pizza', model: 'food/pizza', scale: 0.32, at: [0.24, 0.232, 0.22],
      word: 'pizza', wordId: 'piza',
      sentence: 'Pizza is yummy!', sentenceId: 'Piza itu enak!',
      question: 'Do you like pizza?', questionId: 'Kamu suka piza?',
      answer: 'Yes, I love pizza!', answerId: 'Ya, aku suka sekali piza!',
    },
    {
      id: 'cup', model: 'food/cup-tea', scale: 0.55, at: [-0.12, 0.232, 0.28], ry: 40,
      word: 'cup', wordId: 'cangkir',
      sentence: 'I drink tea from a cup.', sentenceId: 'Aku minum teh dari cangkir.',
      question: 'Is the tea hot or cold?', questionId: 'Tehnya panas atau dingin?',
      answer: 'The tea is hot.', answerId: 'Tehnya panas.',
    },
    {
      id: 'apple', model: 'food/apple', scale: 0.6, at: [-0.08, 0.232, 0.08],
      word: 'apple', wordId: 'apel',
      sentence: 'I eat an apple. Yum!', sentenceId: 'Aku makan apel. Enak!',
      question: 'Do you like apples?', questionId: 'Kamu suka apel?',
      answer: 'Yes, I like apples.', answerId: 'Ya, aku suka apel.',
    },
    {
      // behind the sofa
      id: 'dog', model: 'pets/animal-dog', scale: PET, at: [0.55, 0, 1.33], ry: 100, animation: 'idle',
      word: 'dog', wordId: 'anjing',
      sentence: 'The dog says woof!', sentenceId: 'Anjing berbunyi guk guk!',
      question: 'What does a dog say?', questionId: 'Anjing bunyinya apa?',
      answer: 'A dog says woof!', answerId: 'Anjing bunyinya guk guk!',
    },

    // ----- west side: bookcase, armchair, side table -----
    {
      id: 'bookcase', model: 'furniture/bookcaseOpen', at: [-1.36, 0, -0.6], ry: 90,
      word: 'bookcase', wordId: 'rak buku',
      sentence: 'The bookcase is tall.', sentenceId: 'Rak bukunya tinggi.',
      question: 'Is the bookcase tall or short?', questionId: 'Rak bukunya tinggi atau pendek?',
      answer: 'The bookcase is tall.', answerId: 'Rak bukunya tinggi.',
    },
    {
      // sits on top of the bookcase
      id: 'bird', model: 'pets/animal-parrot', scale: 0.12, at: [-1.36, 0.88, -0.6], ry: 90, animation: 'idle',
      word: 'bird', wordId: 'burung',
      sentence: 'The bird can fly.', sentenceId: 'Burung bisa terbang.',
      question: 'Can you flap your arms like a bird?', questionId: 'Bisa mengepakkan tangan seperti burung?',
      answer: 'Flap, flap, flap!', answerId: 'Kepak, kepak, kepak!',
    },
    {
      id: 'armchair', model: 'furniture/loungeChair', at: [-1.02, 0, 0.25], ry: 90, tint: { carpet: '#ff8c42' },
      word: 'armchair', wordId: 'kursi sofa',
      sentence: 'Daddy sits in the armchair.', sentenceId: 'Papa duduk di kursi sofa.',
      question: 'What color is the armchair?', questionId: 'Kursi sofanya warna apa?',
      answer: 'The armchair is orange.', answerId: 'Kursi sofanya oranye.',
    },
    {
      // behind the armchair
      id: 'present', model: 'holiday/present-a-cube', scale: 0.42, at: [-1.38, 0, 0.25], ry: 10,
      word: 'present', wordId: 'kado',
      sentence: 'The present has a red ribbon.', sentenceId: 'Kadonya berpita merah.',
      question: 'Do you like presents?', questionId: 'Kamu suka kado?',
      answer: 'Yes, I love presents!', answerId: 'Ya, aku suka sekali kado!',
    },
    { id: 'sidetable', model: 'furniture/sideTable', at: [-1.38, 0, 1.05], ry: 90 },
    {
      id: 'books', model: 'furniture/books', scale: 1.7, at: [-1.38, 0.38, 0.9], ry: 90,
      word: 'books', wordId: 'buku-buku',
      sentence: 'We read books together.', sentenceId: 'Kami membaca buku bersama.',
      question: 'Do you like stories?', questionId: 'Kamu suka cerita?',
      answer: 'Yes, I like stories.', answerId: 'Ya, aku suka cerita.',
    },
    {
      id: 'cake', model: 'food/cake-birthday', scale: 0.3, at: [-1.38, 0.38, 1.2],
      word: 'cake', wordId: 'kue',
      sentence: 'The cake is sweet.', sentenceId: 'Kuenya manis.',
      question: 'Do you like cake?', questionId: 'Kamu suka kue?',
      answer: 'Yes, I love cake!', answerId: 'Ya, aku suka sekali kue!',
    },

    // ----- east side -----
    {
      id: 'coatrack', model: 'furniture/coatRackStanding', at: [1.3, 0, 0.3],
      word: 'coat rack', wordId: 'gantungan jaket',
      sentence: 'I hang my jacket on the coat rack.', sentenceId: 'Aku menggantung jaket di gantungan jaket.',
      question: 'Where is your jacket?', questionId: 'Di mana jaketmu?',
      answer: 'It is on the coat rack.', answerId: 'Ada di gantungan jaket.',
    },
  ],
};

export default livingRoom;

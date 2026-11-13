// Kitchen — a 3 x 3 room. x runs west (-1.5) to east (+1.5), z runs north (-1.5) to south (+1.5).
// A counter runs along the north wall (worktop height 0.45); the dining table stands in the middle.

const COUNTER_Z = -1.275;
const TOP = 0.45;
const TABLE = 0.33;

const kitchen = {
  id: 'kitchen-3d',
  title: 'Kitchen',
  titleId: 'Dapur',
  icon: '🍳',
  room: { w: 3, d: 3, wallColor: '#fff0b3', floor: { type: 'tiles', color: '#f8f4ea', color2: '#cfe8dc' } },
  items: [
    // ----- walls -----
    {
      id: 'window', model: 'furniture/wallWindow', segment: { side: 'N', index: 1 },
      word: 'window', wordId: 'jendela',
      sentence: 'The window is above the sink.', sentenceId: 'Jendelanya ada di atas bak cuci.',
      question: 'Is it sunny today?', questionId: 'Hari ini cerah?',
      answer: 'Yes, it is sunny.', answerId: 'Ya, cerah.',
    },
    { id: 'window2', model: 'furniture/wallWindow', segment: { side: 'E', index: 0 }, same: 'window' },
    { id: 'door-wall', model: 'furniture/wallDoorway', segment: { side: 'W', index: 2 } },
    {
      id: 'door', model: 'furniture/doorway', wall: 'W', at: [1, 0, 0],
      word: 'door', wordId: 'pintu',
      sentence: 'The door is closed.', sentenceId: 'Pintunya tertutup.',
      question: 'Can you open the door?', questionId: 'Bisa buka pintunya?',
      answer: 'Yes, I can open it.', answerId: 'Ya, aku bisa membukanya.',
    },
    {
      id: 'cupboard', model: 'furniture/kitchenCabinetUpper', wall: 'N', at: [-0.84, 0.8, 0.11],
      word: 'cupboard', wordId: 'lemari dapur',
      sentence: 'The plates are in the cupboard.', sentenceId: 'Piring-piringnya ada di lemari dapur.',
      question: 'Is the cupboard up high?', questionId: 'Apakah lemari dapurnya tinggi di atas?',
      answer: 'Yes, it is up high.', answerId: 'Ya, tinggi di atas.',
    },
    { id: 'cupboard2', model: 'furniture/kitchenCabinetUpper', wall: 'N', at: [1.29, 0.8, 0.11], same: 'cupboard' },
    { id: 'hood', model: 'furniture/hoodModern', wall: 'N', at: [0.86, 0.82, 0.14] },

    // ----- the counter along the north wall, west to east -----
    {
      id: 'fridge', model: 'furniture/kitchenFridge', at: [-1.27, 0, -1.35],
      word: 'fridge', wordId: 'kulkas',
      sentence: 'The fridge keeps food cold.', sentenceId: 'Kulkas membuat makanan tetap dingin.',
      question: 'Is the fridge hot or cold?', questionId: 'Kulkas itu panas atau dingin?',
      answer: 'The fridge is cold.', answerId: 'Kulkas itu dingin.',
    },
    { id: 'cab1', model: 'furniture/kitchenCabinet', at: [-0.84, 0, COUNTER_Z] },
    {
      id: 'toaster', model: 'furniture/toaster', scale: 1.25, at: [-0.93, TOP, -1.32],
      word: 'toaster', wordId: 'pemanggang roti',
      sentence: 'The toaster makes toast. Pop!', sentenceId: 'Pemanggang roti membuat roti panggang. Pop!',
      question: 'Do you like toast?', questionId: 'Kamu suka roti panggang?',
      answer: 'Yes, I like toast.', answerId: 'Ya, aku suka roti panggang.',
    },
    {
      id: 'bread', model: 'food/loaf', scale: 0.32, at: [-0.72, TOP, -1.17], ry: 20,
      word: 'bread', wordId: 'roti',
      sentence: 'I eat bread for breakfast.', sentenceId: 'Aku makan roti untuk sarapan.',
      question: 'Do you like bread?', questionId: 'Kamu suka roti?',
      answer: 'Yes, I like bread.', answerId: 'Ya, aku suka roti.',
    },
    { id: 'cab2', model: 'furniture/kitchenCabinetDrawer', at: [-0.41, 0, COUNTER_Z] },
    {
      id: 'coffee', model: 'furniture/kitchenCoffeeMachine', at: [-0.41, TOP, -1.3],
      word: 'coffee maker', wordId: 'mesin kopi',
      sentence: 'The coffee maker makes coffee.', sentenceId: 'Mesin kopi membuat kopi.',
      question: 'Who drinks coffee?', questionId: 'Siapa yang minum kopi?',
      answer: 'Daddy drinks coffee.', answerId: 'Papa minum kopi.',
    },
    {
      id: 'sink', model: 'furniture/kitchenSink', at: [0.02, 0, COUNTER_Z],
      word: 'sink', wordId: 'bak cuci',
      sentence: 'We wash the dishes in the sink.', sentenceId: 'Kami mencuci piring di bak cuci.',
      question: 'Can you help wash the dishes?', questionId: 'Bisa bantu cuci piring?',
      answer: 'Yes, I can help!', answerId: 'Ya, aku bisa bantu!',
    },
    { id: 'cab3', model: 'furniture/kitchenCabinet', at: [0.45, 0, COUNTER_Z] },
    {
      id: 'blender', model: 'furniture/kitchenBlender', scale: 1.2, at: [0.38, TOP, -1.32],
      word: 'blender', wordId: 'blender',
      sentence: 'The blender makes juice. Whirr!', sentenceId: 'Blender membuat jus. Wrrr!',
      question: 'What juice do you like?', questionId: 'Kamu suka jus apa?',
      answer: 'I like orange juice.', answerId: 'Aku suka jus jeruk.',
    },
    {
      id: 'egg', model: 'food/egg', scale: 0.9, at: [0.55, TOP, -1.17],
      word: 'egg', wordId: 'telur',
      sentence: 'The hen lays an egg.', sentenceId: 'Ayam betina bertelur.',
      question: 'Do you like eggs?', questionId: 'Kamu suka telur?',
      answer: 'Yes, I like eggs.', answerId: 'Ya, aku suka telur.',
    },
    {
      id: 'stove', model: 'furniture/kitchenStove', at: [0.86, 0, COUNTER_Z],
      word: 'stove', wordId: 'kompor',
      sentence: 'Mommy cooks on the stove.', sentenceId: 'Mama memasak di kompor.',
      question: 'Is the stove hot?', questionId: 'Apakah kompornya panas?',
      answer: 'Yes, be careful! It is hot.', answerId: 'Ya, hati-hati! Panas.',
    },
    {
      id: 'pan', model: 'food/frying-pan', scale: 0.3, at: [0.79, TOP + 0.01, -1.2], ry: 25,
      word: 'pan', wordId: 'wajan',
      sentence: 'We fry an egg in the pan.', sentenceId: 'Kami menggoreng telur di wajan.',
      question: 'Can you say sizzle?', questionId: 'Bisa bilang ces ces?',
      answer: 'Sizzle, sizzle!', answerId: 'Ces, ces!',
    },
    {
      id: 'pot', model: 'food/pot', scale: 0.27, at: [0.95, TOP + 0.01, -1.36], ry: 90,
      word: 'pot', wordId: 'panci',
      sentence: 'The soup is in the pot.', sentenceId: 'Supnya ada di dalam panci.',
      question: 'Do you like soup?', questionId: 'Kamu suka sup?',
      answer: 'Yes, I like soup.', answerId: 'Ya, aku suka sup.',
    },
    { id: 'cab4', model: 'furniture/kitchenCabinet', at: [1.285, 0, COUNTER_Z] },
    {
      id: 'microwave', model: 'furniture/kitchenMicrowave', at: [1.29, TOP, -1.3],
      word: 'microwave', wordId: 'microwave',
      sentence: 'The microwave makes food hot. Ding!', sentenceId: 'Microwave memanaskan makanan. Ting!',
      question: 'Can you say ding?', questionId: 'Bisa bilang ting?',
      answer: 'Ding!', answerId: 'Ting!',
    },

    // ----- west side: a low sideboard with honey -----
    { id: 'side1', model: 'furniture/kitchenBar', at: [-1.39, 0, -0.42], ry: 90 },
    { id: 'side2', model: 'furniture/kitchenBar', at: [-1.39, 0, 0.01], ry: 90 },
    {
      id: 'honey', model: 'food/honey', scale: 0.45, at: [-1.38, 0.42, -0.5],
      word: 'honey', wordId: 'madu',
      sentence: 'Honey is sweet and sticky.', sentenceId: 'Madu itu manis dan lengket.',
      question: 'Who makes honey?', questionId: 'Siapa yang membuat madu?',
      answer: 'Bees make honey.', answerId: 'Lebah yang membuat madu.',
    },
    {
      id: 'bee', model: 'pets/animal-bee', scale: 0.1, at: [-1.38, 0.42, -0.24], ry: 60, animation: 'idle',
      word: 'bee', wordId: 'lebah',
      sentence: 'The bee says buzz!', sentenceId: 'Lebah berbunyi bzzz!',
      question: 'Can you buzz like a bee?', questionId: 'Bisa berdengung seperti lebah?',
      answer: 'Buzz, buzz, buzz!', answerId: 'Bzzz, bzzz, bzzz!',
    },
    {
      id: 'carrot', model: 'food/carrot', scale: 0.38, at: [-1.38, 0.42, 0.08],
      word: 'carrot', wordId: 'wortel',
      sentence: 'Rabbits love carrots.', sentenceId: 'Kelinci suka wortel.',
      question: 'What color is the carrot?', questionId: 'Wortelnya warna apa?',
      answer: 'The carrot is orange.', answerId: 'Wortelnya oranye.',
    },

    // ----- the dining table -----
    {
      id: 'table', model: 'furniture/table', at: [0.2, 0, 0.5],
      word: 'table', wordId: 'meja makan',
      sentence: 'We eat at the table.', sentenceId: 'Kami makan di meja makan.',
      question: 'Who sits at the table?', questionId: 'Siapa yang duduk di meja makan?',
      answer: 'My family sits at the table.', answerId: 'Keluargaku duduk di meja makan.',
    },
    {
      id: 'chair', model: 'furniture/chair', at: [-0.05, 0, 0.15],
      word: 'chair', wordId: 'kursi',
      sentence: 'I sit on my chair to eat.', sentenceId: 'Aku duduk di kursiku untuk makan.',
      question: 'How many chairs can you see?', questionId: 'Ada berapa kursi?',
      answer: 'I can see four chairs.', answerId: 'Aku melihat empat kursi.',
    },
    { id: 'chair2', model: 'furniture/chair', at: [0.45, 0, 0.15], same: 'chair' },
    { id: 'chair3', model: 'furniture/chair', at: [-0.05, 0, 0.85], ry: 180, same: 'chair' },
    { id: 'chair4', model: 'furniture/chair', at: [0.45, 0, 0.85], ry: 180, same: 'chair' },
    {
      id: 'cake', model: 'food/cake-birthday', scale: 0.3, at: [0.2, TABLE, 0.53],
      word: 'cake', wordId: 'kue',
      sentence: 'Happy birthday! Here is the cake.', sentenceId: 'Selamat ulang tahun! Ini kuenya.',
      question: 'Do you like cake?', questionId: 'Kamu suka kue?',
      answer: 'Yes, I love cake!', answerId: 'Ya, aku suka sekali kue!',
    },
    {
      id: 'plate', model: 'food/plate', scale: 0.2, at: [-0.08, TABLE, 0.42],
      word: 'plate', wordId: 'piring',
      sentence: 'I eat from my plate.', sentenceId: 'Aku makan dari piringku.',
      question: 'Is the plate empty or full?', questionId: 'Piringnya kosong atau penuh?',
      answer: 'The plate is empty.', answerId: 'Piringnya kosong.',
    },
    {
      id: 'apple', model: 'food/apple', scale: 0.6, at: [-0.07, TABLE, 0.65],
      word: 'apple', wordId: 'apel',
      sentence: 'An apple a day is good for you.', sentenceId: 'Makan apel setiap hari itu sehat.',
      question: 'Is the apple red or green?', questionId: 'Apelnya merah atau hijau?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'milk', model: 'food/carton', scale: 0.42, at: [0.28, TABLE, 0.34],
      word: 'milk', wordId: 'susu',
      sentence: 'Milk makes my bones strong.', sentenceId: 'Susu membuat tulangku kuat.',
      question: 'Do you drink milk?', questionId: 'Kamu minum susu?',
      answer: 'Yes, I drink milk.', answerId: 'Ya, aku minum susu.',
    },
    {
      id: 'cup', model: 'food/mug', scale: 0.42, at: [0.51, TABLE, 0.41], ry: 30,
      word: 'cup', wordId: 'cangkir',
      sentence: 'I drink from my cup.', sentenceId: 'Aku minum dari cangkirku.',
      question: 'What do you like to drink?', questionId: 'Kamu suka minum apa?',
      answer: 'I like to drink milk.', answerId: 'Aku suka minum susu.',
    },
    {
      id: 'banana', model: 'food/banana', scale: 0.55, at: [0.48, TABLE, 0.63], ry: 60,
      word: 'banana', wordId: 'pisang',
      sentence: 'Monkeys love bananas.', sentenceId: 'Monyet suka pisang.',
      question: 'What color is the banana?', questionId: 'Pisangnya warna apa?',
      answer: 'The banana is yellow.', answerId: 'Pisangnya kuning.',
    },
    // ----- east side -----
    {
      id: 'washer', model: 'furniture/washer', at: [1.29, 0, 0.95], ry: -90,
      word: 'washing machine', wordId: 'mesin cuci',
      sentence: 'The washing machine cleans our clothes.', sentenceId: 'Mesin cuci membersihkan baju kita.',
      question: 'Can you spin around like the washing machine?', questionId: 'Bisa berputar seperti mesin cuci?',
      answer: 'Round and round!', answerId: 'Putar, putar!',
    },
    {
      // rolled into the corner behind the washing machine
      id: 'watermelon', model: 'food/watermelon', scale: 0.45, at: [1.3, 0, 1.33],
      word: 'watermelon', wordId: 'semangka',
      sentence: 'The watermelon is big and round.', sentenceId: 'Semangkanya besar dan bulat.',
      question: 'Is it red inside?', questionId: 'Apakah dalamnya merah?',
      answer: 'Yes, it is red inside!', answerId: 'Ya, dalamnya merah!',
    },

    // ----- south side -----
    {
      id: 'mat', model: 'furniture/rugDoormat', scale: 1.3, at: [-1.1, 0.002, 1.0], ry: 90, tint: { carpet: '#6fbf73', carpetDarker: '#3f9a52' },
      word: 'mat', wordId: 'keset',
      sentence: 'Wipe your feet on the mat.', sentenceId: 'Bersihkan kakimu di keset.',
      question: 'Are your feet clean?', questionId: 'Kakimu bersih?',
      answer: 'Yes, my feet are clean.', answerId: 'Ya, kakiku bersih.',
    },
    {
      id: 'bag', model: 'food/bag', scale: 0.55, at: [-0.35, 0, 1.3], ry: 160,
      word: 'bag', wordId: 'tas belanja',
      sentence: 'The bag is full of food.', sentenceId: 'Tasnya penuh makanan.',
      question: 'Can you help carry the bag?', questionId: 'Bisa bantu bawa tasnya?',
      answer: 'Yes, I can help!', answerId: 'Ya, aku bisa bantu!',
    },
  ],
};

export default kitchen;

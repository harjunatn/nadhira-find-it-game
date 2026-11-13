// Animal park — an open 4 x 4 meadow (no walls). x runs west (-2) to east (+2), z north (-2) to south (+2).
// Animals hide behind trees, rocks and bushes, so players have to walk around the park.

const PET = 0.25;

const animalPark = {
  id: 'animal-park-3d',
  title: 'Animal Park',
  titleId: 'Taman Satwa',
  icon: '🦁',
  room: { w: 4, d: 4, outdoor: true, floor: { type: 'grass', color: '#8fd16f' } },
  items: [
    // ----- trees -----
    {
      id: 'tree', model: 'nature/tree_default', scale: 0.8, at: [-1.6, 0, -1.55],
      word: 'tree', wordId: 'pohon',
      sentence: 'The tree is tall and green.', sentenceId: 'Pohonnya tinggi dan hijau.',
      question: 'Can you stand tall like a tree?', questionId: 'Bisa berdiri tegak seperti pohon?',
      answer: 'Yes, look at me!', answerId: 'Ya, lihat aku!',
    },
    { id: 'tree2', model: 'nature/tree_oak', scale: 0.95, at: [-0.95, 0, -1.72], same: 'tree' },
    { id: 'tree3', model: 'nature/tree_fat', scale: 0.9, at: [1.6, 0, -1.6], same: 'tree' },
    { id: 'tree4', model: 'nature/tree_pineRoundA', scale: 0.8, at: [-1.72, 0, 0.15], same: 'tree' },
    { id: 'tree5', model: 'nature/tree_pineSmallA', scale: 0.95, at: [-1.4, 0, 0.72], same: 'tree' },
    { id: 'tree6', model: 'nature/tree_default', scale: 0.65, at: [0.15, 0, -1.78], same: 'tree' },

    // ----- north: monkey on a stump, lion by the big rock, koala behind it -----
    { id: 'stump', model: 'nature/stump_round', scale: 1.2, at: [-0.55, 0, -1.15] },
    {
      id: 'monkey', model: 'pets/animal-monkey', scale: PET * 0.8, at: [-0.55, 0.24, -1.15], ry: 20, animation: 'idle',
      word: 'monkey', wordId: 'monyet',
      sentence: 'The monkey likes bananas.', sentenceId: 'Monyet suka pisang.',
      question: 'Can you jump like a monkey?', questionId: 'Bisa melompat seperti monyet?',
      answer: 'Ooh ooh, ah ah!', answerId: 'U u, a a!',
    },
    {
      id: 'rock', model: 'nature/stone_tallA', scale: 0.85, at: [0.65, 0, -1.25], ry: 20,
      word: 'rock', wordId: 'batu',
      sentence: 'The rock is big and hard.', sentenceId: 'Batunya besar dan keras.',
      question: 'Is the rock soft or hard?', questionId: 'Batunya lunak atau keras?',
      answer: 'The rock is hard.', answerId: 'Batunya keras.',
    },
    {
      id: 'lion', model: 'pets/animal-lion', scale: PET, at: [0.35, 0, -0.62], ry: 15, animation: 'idle',
      word: 'lion', wordId: 'singa',
      sentence: 'The lion says roar!', sentenceId: 'Singa mengaum, roar!',
      question: 'Can you roar like a lion?', questionId: 'Bisa mengaum seperti singa?',
      answer: 'Roar!', answerId: 'Roar!',
    },
    {
      // behind the big rock
      id: 'koala', model: 'pets/animal-koala', scale: PET * 0.9, at: [0.75, 0, -1.8], ry: 180, animation: 'idle',
      word: 'koala', wordId: 'koala',
      sentence: 'The koala sleeps a lot.', sentenceId: 'Koala banyak tidur.',
      question: 'Are you sleepy like a koala?', questionId: 'Kamu mengantuk seperti koala?',
      answer: 'No, I am not sleepy!', answerId: 'Tidak, aku tidak mengantuk!',
    },

    // ----- east: giraffe and elephant, the tiger behind the bushes -----
    {
      id: 'giraffe', model: 'pets/animal-giraffe', scale: PET, at: [1.25, 0, -0.95], ry: -30, animation: 'idle',
      word: 'giraffe', wordId: 'jerapah',
      sentence: 'The giraffe has brown spots.', sentenceId: 'Jerapah punya bintik cokelat.',
      question: 'Can you see its spots?', questionId: 'Bisa lihat bintiknya?',
      answer: 'Yes, I can see the spots.', answerId: 'Ya, aku lihat bintiknya.',
    },
    {
      id: 'elephant', model: 'pets/animal-elephant', scale: PET * 1.1, at: [1.6, 0, -0.15], ry: -75, animation: 'idle',
      word: 'elephant', wordId: 'gajah',
      sentence: 'The elephant has a long trunk.', sentenceId: 'Gajah punya belalai yang panjang.',
      question: 'Is the elephant big or small?', questionId: 'Gajahnya besar atau kecil?',
      answer: 'The elephant is big.', answerId: 'Gajahnya besar.',
    },
    {
      id: 'bush', model: 'nature/plant_bushLarge', scale: 1.9, at: [0.95, 0, 0.12],
      word: 'bush', wordId: 'semak',
      sentence: 'Someone hides behind the bush!', sentenceId: 'Ada yang bersembunyi di balik semak!',
      question: 'Who hides behind the bush?', questionId: 'Siapa yang bersembunyi di balik semak?',
      answer: 'The tiger hides there!', answerId: 'Harimau bersembunyi di situ!',
    },
    { id: 'bush2', model: 'nature/plant_bushLarge', scale: 1.7, at: [0.42, 0, 0.2], ry: 70, same: 'bush' },
    {
      id: 'tiger', model: 'pets/animal-tiger', scale: PET * 0.9, at: [0.72, 0, -0.22], ry: 200, animation: 'idle',
      word: 'tiger', wordId: 'harimau',
      sentence: 'The tiger has black stripes.', sentenceId: 'Harimau punya belang hitam.',
      question: 'Can you growl like a tiger?', questionId: 'Bisa menggeram seperti harimau?',
      answer: 'Grrr!', answerId: 'Grrr!',
    },

    // ----- south-east: the pond -----
    {
      id: 'pond', model: 'shape/disc', scale: 1.55, at: [1.1, 0.003, 1.1], tint: { color: '#56b7f0' },
      word: 'pond', wordId: 'kolam',
      sentence: 'The pond is full of water.', sentenceId: 'Kolamnya penuh air.',
      question: 'Who swims in the pond?', questionId: 'Siapa yang berenang di kolam?',
      answer: 'The fish swims in the pond.', answerId: 'Ikan berenang di kolam.',
    },
    { id: 'lily1', model: 'nature/lily_large', at: [0.8, 0.012, 0.85] },
    { id: 'lily2', model: 'nature/lily_small', scale: 1.3, at: [1.45, 0.012, 1.45], ry: 50 },
    {
      id: 'fish', model: 'pets/animal-fish', scale: PET * 0.7, at: [1.2, 0.012, 1.15], ry: -40, animation: 'idle',
      word: 'fish', wordId: 'ikan',
      sentence: 'The fish swims in the pond.', sentenceId: 'Ikan berenang di kolam.',
      question: 'Can you swim like a fish?', questionId: 'Bisa berenang seperti ikan?',
      answer: 'Swim, swim, swim!', answerId: 'Renang, renang, renang!',
    },
    {
      id: 'penguin', model: 'pets/animal-penguin', scale: PET * 0.8, at: [0.45, 0, 1.6], ry: 30, animation: 'idle',
      word: 'penguin', wordId: 'penguin',
      sentence: 'The penguin can swim.', sentenceId: 'Penguin bisa berenang.',
      question: 'Can you walk like a penguin?', questionId: 'Bisa jalan seperti penguin?',
      answer: 'Waddle, waddle!', answerId: 'Goyang, goyang!',
    },
    {
      id: 'crab', model: 'pets/animal-crab', scale: PET * 0.6, at: [1.78, 0, 0.42], ry: -60, animation: 'idle',
      word: 'crab', wordId: 'kepiting',
      sentence: 'The crab walks sideways.', sentenceId: 'Kepiting berjalan menyamping.',
      question: 'Can you walk sideways like a crab?', questionId: 'Bisa jalan menyamping seperti kepiting?',
      answer: 'Yes! Side, side, side.', answerId: 'Ya! Samping, samping, samping.',
    },
    {
      id: 'log', model: 'nature/log', scale: 1.1, at: [0.05, 0, 1.0], ry: 60,
      word: 'log', wordId: 'batang kayu',
      sentence: 'The log is from a tree.', sentenceId: 'Batang kayu itu dari pohon.',
      question: 'Can you sit on a log?', questionId: 'Bisa duduk di batang kayu?',
      answer: 'Yes, I can sit on it.', answerId: 'Ya, aku bisa duduk di situ.',
    },
    {
      id: 'beaver', model: 'pets/animal-beaver', scale: PET * 0.8, at: [-0.3, 0, 1.25], ry: 40, animation: 'idle',
      word: 'beaver', wordId: 'berang-berang',
      sentence: 'The beaver has big teeth.', sentenceId: 'Berang-berang punya gigi besar.',
      question: 'Can you show me your teeth?', questionId: 'Bisa tunjukkan gigimu?',
      answer: 'Look at my teeth!', answerId: 'Lihat gigiku!',
    },

    // ----- south-west: panda and bamboo, the fence -----
    {
      id: 'bamboo', model: 'nature/crops_bambooStageB', at: [-1.55, 0, 1.55],
      word: 'bamboo', wordId: 'bambu',
      sentence: 'Bamboo is tall and green.', sentenceId: 'Bambu itu tinggi dan hijau.',
      question: 'Who eats bamboo?', questionId: 'Siapa yang makan bambu?',
      answer: 'The panda eats bamboo.', answerId: 'Panda makan bambu.',
    },
    { id: 'bamboo2', model: 'nature/crops_bambooStageB', scale: 0.85, at: [-1.2, 0, 1.75], ry: 80, same: 'bamboo' },
    {
      id: 'panda', model: 'pets/animal-panda', scale: PET, at: [-1.25, 0, 1.28], ry: 40, animation: 'idle',
      word: 'panda', wordId: 'panda',
      sentence: 'The panda eats bamboo.', sentenceId: 'Panda makan bambu.',
      question: 'What color is the panda?', questionId: 'Pandanya warna apa?',
      answer: 'The panda is black and white.', answerId: 'Pandanya hitam dan putih.',
    },
    {
      id: 'fence', model: 'nature/fence_simple', at: [-0.6, 0, 1.93],
      word: 'fence', wordId: 'pagar',
      sentence: 'The fence is made of wood.', sentenceId: 'Pagarnya terbuat dari kayu.',
      question: 'Is the fence tall or short?', questionId: 'Pagarnya tinggi atau pendek?',
      answer: 'The fence is short.', answerId: 'Pagarnya pendek.',
    },
    { id: 'fence2', model: 'nature/fence_simple', at: [0.4, 0, 1.93], same: 'fence' },
    {
      // sits on the fence
      id: 'parrot', model: 'pets/animal-parrot', scale: 0.14, at: [-0.6, 0.3, 1.93], ry: 180, animation: 'idle',
      word: 'parrot', wordId: 'burung beo',
      sentence: 'The parrot can talk.', sentenceId: 'Burung beo bisa bicara.',
      question: 'Can you say hello like a parrot?', questionId: 'Bisa bilang halo seperti burung beo?',
      answer: 'Hello! Hello!', answerId: 'Halo! Halo!',
    },

    // ----- west: deer in front of the pines, the fox between them -----
    {
      id: 'deer', model: 'pets/animal-deer', scale: PET, at: [-1.05, 0, 0.05], ry: 70, animation: 'idle',
      word: 'deer', wordId: 'rusa',
      sentence: 'The deer runs fast.', sentenceId: 'Rusa berlari cepat.',
      question: 'Can you run fast?', questionId: 'Bisa lari cepat?',
      answer: 'Yes, I can run fast!', answerId: 'Ya, aku bisa lari cepat!',
    },
    {
      id: 'fox', model: 'pets/animal-fox', scale: PET * 0.85, at: [-1.82, 0, 0.62], ry: 110, animation: 'idle',
      word: 'fox', wordId: 'rubah',
      sentence: 'The fox has a bushy tail.', sentenceId: 'Rubah punya ekor yang lebat.',
      question: 'What color is the fox?', questionId: 'Rubahnya warna apa?',
      answer: 'The fox is orange.', answerId: 'Rubahnya oranye.',
    },

    // ----- middle: flowers, mushrooms, small animals -----
    {
      id: 'flower', model: 'nature/flower_redA', scale: 1.6, at: [-0.35, 0, 0.45],
      word: 'flower', wordId: 'bunga',
      sentence: 'The flower smells nice.', sentenceId: 'Bunganya harum.',
      question: 'What color is the flower?', questionId: 'Bunganya warna apa?',
      answer: 'The flower is red.', answerId: 'Bunganya merah.',
    },
    { id: 'flower2', model: 'nature/flower_redB', scale: 1.6, at: [-0.08, 0, 0.6], ry: 60, same: 'flower' },
    { id: 'flower3', model: 'nature/flower_redC', scale: 1.6, at: [-0.55, 0, 0.72], ry: 120, same: 'flower' },
    {
      id: 'chick', model: 'pets/animal-chick', scale: PET * 0.6, at: [-0.05, 0, 0.18], ry: -20, animation: 'idle',
      word: 'chick', wordId: 'anak ayam',
      sentence: 'The chick says cheep, cheep!', sentenceId: 'Anak ayam berbunyi ciap, ciap!',
      question: 'What color is the chick?', questionId: 'Anak ayamnya warna apa?',
      answer: 'The chick is yellow.', answerId: 'Anak ayamnya kuning.',
    },
    {
      id: 'mushroom', model: 'nature/mushroom_redGroup', scale: 1.6, at: [-0.8, 0, -0.4],
      word: 'mushroom', wordId: 'jamur',
      sentence: 'The mushroom is red and white.', sentenceId: 'Jamurnya merah dan putih.',
      question: 'Can we eat this mushroom?', questionId: 'Boleh kita makan jamur ini?',
      answer: 'No, we just look at it.', answerId: 'Tidak, kita lihat saja.',
    },
    {
      // behind the mushrooms
      id: 'caterpillar', model: 'pets/animal-caterpillar', scale: PET * 0.55, at: [-1.0, 0, -0.62], ry: 120, animation: 'idle',
      word: 'caterpillar', wordId: 'ulat',
      sentence: 'The caterpillar is very small.', sentenceId: 'Ulatnya kecil sekali.',
      question: 'Can you wiggle like a caterpillar?', questionId: 'Bisa menggeliat seperti ulat?',
      answer: 'Wiggle, wiggle!', answerId: 'Geliat, geliat!',
    },

    // ----- scenery -----
    { id: 'rock-s1', model: 'nature/stone_smallA', scale: 1.4, at: [1.82, 0, 1.0] },
    { id: 'rock-s2', model: 'nature/stone_smallC', scale: 1.4, at: [0.75, 0, 1.82], ry: 40 },
    { id: 'grass1', model: 'nature/grass_large', at: [-1.75, 0, -0.75] },
    { id: 'grass2', model: 'nature/grass_large', at: [1.75, 0, -1.0], ry: 90 },
    { id: 'grass3', model: 'nature/grass', scale: 1.3, at: [-0.2, 0, -0.9] },
    { id: 'grass4', model: 'nature/grass', scale: 1.3, at: [1.2, 0, -1.75], ry: 30 },
    { id: 'grass5', model: 'nature/grass_large', at: [-1.85, 0, 1.2], ry: 45 },
  ],
};

export default animalPark;

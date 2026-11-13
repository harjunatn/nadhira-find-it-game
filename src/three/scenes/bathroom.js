// Bathroom — a 3 x 3 room. x runs west (-1.5) to east (+1.5), z runs north (-1.5) to south (+1.5).
// Bath toys hide in the tub and behind the washing machine and the trash can.

const PET = 0.2;

const bathroom = {
  id: 'bathroom-3d',
  title: 'Bathroom',
  titleId: 'Kamar Mandi',
  icon: '🛁',
  room: { w: 3, d: 3, wallColor: '#c9e9f4', floor: { type: 'tiles', color: '#f4fafc', color2: '#bfe1ee' } },
  items: [
    // ----- walls -----
    {
      id: 'window', model: 'furniture/wallWindow', segment: { side: 'N', index: 1 },
      word: 'window', wordId: 'jendela',
      sentence: 'Open the window, please.', sentenceId: 'Tolong buka jendelanya.',
      question: 'Can you open the window?', questionId: 'Bisa buka jendelanya?',
      answer: 'Yes, I can open it.', answerId: 'Ya, aku bisa membukanya.',
    },
    { id: 'door-wall', model: 'furniture/wallDoorway', segment: { side: 'W', index: 2 } },
    {
      id: 'door', model: 'furniture/doorway', wall: 'W', at: [1, 0, 0],
      word: 'door', wordId: 'pintu',
      sentence: 'Knock before you open the door.', sentenceId: 'Ketuk dulu sebelum buka pintu.',
      question: 'Can you knock on the door?', questionId: 'Bisa ketuk pintunya?',
      answer: 'Knock, knock!', answerId: 'Tok, tok!',
    },
    {
      id: 'mirror', model: 'furniture/bathroomMirror', wall: 'W', at: [-0.3, 0.66, 0.07],
      word: 'mirror', wordId: 'cermin',
      sentence: 'I see my face in the mirror.', sentenceId: 'Aku melihat wajahku di cermin.',
      question: 'Can you make a funny face?', questionId: 'Bisa bikin muka lucu?',
      answer: 'Look at my funny face!', answerId: 'Lihat muka lucuku!',
    },
    // a second mirror (a little mirror cabinet) on the other side of the room
    { id: 'mirror2', model: 'furniture/bathroomCabinet', scale: 1.2, wall: 'E', at: [-0.75, 0.62, 0.08], same: 'mirror' },

    // ----- north side: bathtub, washing machine, shower -----
    {
      id: 'bathtub', model: 'furniture/bathtub', at: [-0.86, 0, -1.2],
      word: 'bathtub', wordId: 'bak mandi',
      sentence: 'I take a bath in the bathtub.', sentenceId: 'Aku mandi di bak mandi.',
      question: 'Do you like bubbles?', questionId: 'Kamu suka busa?',
      answer: 'Yes, I love bubbles!', answerId: 'Ya, aku suka sekali busa!',
    },
    { id: 'water', model: 'shape/slab', size: [0.72, 0.34], at: [-0.86, 0.26, -1.2], tint: { color: '#7fd4f7' } },
    {
      // swims in the tub
      id: 'fish', model: 'pets/animal-fish', scale: PET * 0.55, at: [-0.68, 0.2, -1.2], ry: 70, animation: 'idle',
      word: 'fish', wordId: 'ikan',
      sentence: 'The toy fish swims in the bath.', sentenceId: 'Ikan mainan berenang di bak mandi.',
      question: 'Can you swim like a fish?', questionId: 'Bisa berenang seperti ikan?',
      answer: 'Swim, swim, swim!', answerId: 'Renang, renang, renang!',
    },
    {
      // on the edge of the tub
      id: 'bottle', model: 'food/bottle-oil', scale: 0.45, at: [-1.2, 0.35, -0.98],
      word: 'bottle', wordId: 'botol',
      sentence: 'The shampoo is in the bottle.', sentenceId: 'Samponya ada di dalam botol.',
      question: 'Do you wash your hair?', questionId: 'Kamu keramas?',
      answer: 'Yes, I wash my hair.', answerId: 'Ya, aku keramas.',
    },
    {
      id: 'washer', model: 'furniture/washer', at: [0.2, 0, -1.29],
      word: 'washing machine', wordId: 'mesin cuci',
      sentence: 'The washing machine cleans our clothes.', sentenceId: 'Mesin cuci membersihkan baju kita.',
      question: 'Can you spin around?', questionId: 'Bisa berputar?',
      answer: 'Round and round!', answerId: 'Putar, putar!',
    },
    {
      id: 'sock', model: 'holiday/sock-red', scale: 0.38, at: [0.2, 0.47, -1.29], ry: 30,
      word: 'sock', wordId: 'kaus kaki',
      sentence: 'The sock needs a wash.', sentenceId: 'Kaus kakinya perlu dicuci.',
      question: 'What color is the sock?', questionId: 'Kaus kakinya warna apa?',
      answer: 'The sock is red.', answerId: 'Kaus kakinya merah.',
    },
    {
      // between the washing machine and the shower
      id: 'penguin', model: 'pets/animal-penguin', scale: PET * 0.8, at: [0.68, 0, -1.3], ry: 10, animation: 'idle',
      word: 'penguin', wordId: 'penguin',
      sentence: 'The penguin loves water.', sentenceId: 'Penguin suka air.',
      question: 'Can you walk like a penguin?', questionId: 'Bisa jalan seperti penguin?',
      answer: 'Waddle, waddle!', answerId: 'Goyang, goyang!',
    },
    {
      id: 'shower', model: 'furniture/shower', at: [1.2, 0, -1.2],
      word: 'shower', wordId: 'pancuran',
      sentence: 'The shower goes splash!', sentenceId: 'Pancurannya menyembur, byur!',
      question: 'Is the water hot or cold?', questionId: 'Airnya panas atau dingin?',
      answer: 'The water is warm.', answerId: 'Airnya hangat.',
    },

    // ----- west side: the sink (with drawers) under the mirror -----
    {
      id: 'sink', model: 'furniture/bathroomCabinetDrawer', at: [-1.33, 0, -0.3], ry: 90,
      word: 'sink', wordId: 'wastafel',
      sentence: 'I wash my hands in the sink.', sentenceId: 'Aku cuci tangan di wastafel.',
      question: 'Can you wash your hands?', questionId: 'Bisa cuci tangan?',
      answer: 'Yes, I can wash them.', answerId: 'Ya, aku bisa.',
    },
    {
      // stands beside the tap
      id: 'glass', model: 'food/glass', scale: 0.55, at: [-1.44, 0.46, -0.16],
      word: 'glass', wordId: 'gelas',
      sentence: 'The glass is for brushing my teeth.', sentenceId: 'Gelas itu untuk sikat gigi.',
      question: 'Do you brush your teeth?', questionId: 'Kamu sikat gigi?',
      answer: 'Yes, I brush my teeth.', answerId: 'Ya, aku sikat gigi.',
    },

    // ----- east side: toilet, trash can -----
    {
      id: 'toilet', model: 'furniture/toilet', at: [1.24, 0, 0.05], ry: -90,
      word: 'toilet', wordId: 'toilet',
      sentence: 'I flush the toilet.', sentenceId: 'Aku menyiram toilet.',
      question: 'Do you wash your hands after?', questionId: 'Kamu cuci tangan sesudahnya?',
      answer: 'Yes, I wash my hands.', answerId: 'Ya, aku cuci tangan.',
    },
    {
      id: 'trashcan', model: 'furniture/trashcan', scale: 0.8, at: [1.3, 0, 0.72], ry: -90,
      word: 'trash can', wordId: 'tempat sampah',
      sentence: 'The trash can has a lid.', sentenceId: 'Tempat sampahnya punya tutup.',
      question: 'Is the trash can open or closed?', questionId: 'Tempat sampahnya terbuka atau tertutup?',
      answer: 'It is closed.', answerId: 'Tertutup.',
    },
    {
      // behind the trash can
      id: 'crab', model: 'pets/animal-crab', scale: PET * 0.5, at: [1.3, 0, 1.2], ry: -150, animation: 'idle',
      word: 'crab', wordId: 'kepiting',
      sentence: 'The crab has two big claws.', sentenceId: 'Kepiting punya dua capit besar.',
      question: 'Can you pinch like a crab?', questionId: 'Bisa mencapit seperti kepiting?',
      answer: 'Pinch, pinch!', answerId: 'Capit, capit!',
    },

    // ----- floor -----
    {
      id: 'mat', model: 'furniture/rugDoormat', scale: 1.5, at: [-0.86, 0.002, -0.62], tint: { wood: '#ffd75e' },
      word: 'mat', wordId: 'keset',
      sentence: 'I dry my feet on the mat.', sentenceId: 'Aku mengeringkan kaki di keset.',
      question: 'Are your feet wet or dry?', questionId: 'Kakimu basah atau kering?',
      answer: 'My feet are dry.', answerId: 'Kakiku kering.',
    },
    {
      id: 'plant', model: 'furniture/pottedPlant', at: [-0.2, 0, 1.28],
      word: 'plant', wordId: 'tanaman',
      sentence: 'The plant likes water too.', sentenceId: 'Tanaman juga suka air.',
      question: 'Is the plant green?', questionId: 'Apakah tanamannya hijau?',
      answer: 'Yes, it is green.', answerId: 'Ya, warnanya hijau.',
    },
    {
      id: 'stool', model: 'furniture/stoolBar', at: [0.62, 0, 1.24],
      word: 'stool', wordId: 'bangku kecil',
      sentence: 'I sit on the stool.', sentenceId: 'Aku duduk di bangku kecil.',
      question: 'What color is the stool?', questionId: 'Bangkunya warna apa?',
      answer: 'The stool is red.', answerId: 'Bangkunya merah.',
    },
    {
      id: 'rug', model: 'furniture/rugRound', scale: 0.9, at: [0.25, 0.002, 0.3], tint: { carpet: '#ff9bb0', carpetDarker: '#f0708c' },
      word: 'rug', wordId: 'karpet',
      sentence: 'The rug is soft and round.', sentenceId: 'Karpetnya lembut dan bulat.',
      question: 'What color is the rug?', questionId: 'Karpetnya warna apa?',
      answer: 'The rug is pink.', answerId: 'Karpetnya merah muda.',
    },
  ],
};

export default bathroom;

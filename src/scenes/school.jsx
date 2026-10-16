// School (classroom) scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

function Background() {
  const planks = [];
  for (let row = 0; row < 8; row++) {
    const y = 770 + row * 56;
    planks.push(<line key={`r${row}`} x1="0" x2="1600" y1={y} y2={y} stroke="#c9a77c" strokeWidth="4" opacity="0.5" />);
    for (let x = (row * 151) % 300; x < 1600; x += 300) {
      planks.push(<line key={`j${row}-${x}`} x1={x} x2={x} y1={y} y2={y + 56} stroke="#c9a77c" strokeWidth="3" opacity="0.4" />);
    }
  }
  const desk = (x) => (
    <g key={x}>
      <rect x={x + 20} y="895" width="22" height="150" rx="6" fill="#d9844a" />
      <rect x={x + 338} y="895" width="22" height="150" rx="6" fill="#d9844a" />
      <rect x={x} y="880" width="380" height="26" rx="8" fill="#f4a261" stroke="#d9844a" strokeWidth="4" />
    </g>
  );
  return (
    <g>
      <defs>
        <linearGradient id="school-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#fff8dc" />
        </linearGradient>
        <linearGradient id="school-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8c79a" />
          <stop offset="1" stopColor="#f2d8b0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="770" fill="url(#school-wall)" />
      <rect width="1600" height="26" fill="#ffd166" />
      {/* bunting */}
      <path d="M0 40 Q400 90 800 40 Q1200 90 1600 40" fill="none" stroke="#c9a77c" strokeWidth="3" />
      {Array.from({ length: 15 }, (_, i) => {
        const x = 50 + i * 107;
        const y = 40 + Math.sin(((x % 800) / 800) * Math.PI) * 25;
        const colors = ['#ff7a59', '#4f8df5', '#34c472', '#9b6dff', '#ffd23f'];
        return <path key={i} d={`M${x - 22} ${y} L${x + 22} ${y} L${x} ${y + 40} Z`} fill={colors[i % 5]} />;
      })}
      <rect y="770" width="1600" height="430" fill="url(#school-floor)" />
      {planks}
      <rect y="752" width="1600" height="22" fill="#ffffff" />

      {/* shadows */}
      <ellipse cx="320" cy="796" rx="210" ry="16" fill="#000" opacity="0.08" />
      <ellipse cx="1430" cy="796" rx="150" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="710" cy="1050" rx="210" ry="16" fill="#000" opacity="0.08" />
      <ellipse cx="1190" cy="1050" rx="210" ry="16" fill="#000" opacity="0.08" />

      {/* cupboard on the right */}
      <rect x="1290" y="630" width="280" height="150" rx="12" fill="#8fd9c8" stroke="#4fb3a0" strokeWidth="5" />
      <line x1="1430" y1="640" x2="1430" y2="770" stroke="#4fb3a0" strokeWidth="4" />
      <circle cx="1415" cy="705" r="7" fill="#ffffff" />
      <circle cx="1445" cy="705" r="7" fill="#ffffff" />

      {/* pupils' desks */}
      {desk(520)}
      {desk(1000)}
    </g>
  );
}

// The teacher's desk is drawn in front of the teacher.
function TeacherDesk() {
  return (
    <g>
      <rect x="120" y="700" width="400" height="110" rx="12" fill="#f4a261" stroke="#d9844a" strokeWidth="5" />
      <rect x="105" y="686" width="430" height="24" rx="8" fill="#ffc48a" stroke="#d9844a" strokeWidth="4" />
      <rect x="300" y="730" width="80" height="44" rx="8" fill="#ffc48a" stroke="#d9844a" strokeWidth="3" />
    </g>
  );
}

function Board() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="-50" y="-30" width="100" height="58" rx="3" fill="#b5651d" />
      <rect x="-47" y="-27" width="94" height="52" rx="2" fill="#2f6b4f" />
      <circle cx="-33" cy="-14" r="5" fill="none" stroke="#fff6c2" strokeWidth="1.2" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={-33 + Math.cos((a * Math.PI) / 180) * 7} y1={-14 + Math.sin((a * Math.PI) / 180) * 7} x2={-33 + Math.cos((a * Math.PI) / 180) * 9.5} y2={-14 + Math.sin((a * Math.PI) / 180) * 9.5} stroke="#fff6c2" strokeWidth="1.2" />
      ))}
      <path d="M -10 14 L -10 2 M -16 6 Q -10 -10 -4 6 Z" fill="none" stroke="#c8f0c0" strokeWidth="1.2" />
      <path d="M 8 -14 L 14 -2 L 2 -2 Z" fill="none" stroke="#ffd6e0" strokeWidth="1.2" />
      <circle cx="28" cy="0" r="9" fill="none" stroke="#c9e6ff" strokeWidth="1.2" />
      <circle cx="25" cy="-2" r="1" fill="#c9e6ff" />
      <circle cx="31" cy="-2" r="1" fill="#c9e6ff" />
      <path d="M 24 3 Q 28 6 32 3" fill="none" stroke="#c9e6ff" strokeWidth="1" />
      <rect x="-44" y="27" width="88" height="4" rx="1.5" fill="#8a4b2a" />
      <rect x="-30" y="25" width="7" height="2.5" rx="1" fill="#ffffff" />
      <rect x="10" y="25" width="7" height="2.5" rx="1" fill="#ffd6e0" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-40" y="-42" width="80" height="80" rx="6" fill="#ffffff" />
      <rect x="-35" y="-37" width="70" height="70" rx="3" fill="#9fdcff" />
      <circle cx="16" cy="-18" r="8" fill="#ffd23f" />
      <path d="M -35 33 Q -12 12 10 25 Q 24 16 35 22 L 35 33 Z" fill="#7ed957" />
      <rect x="-26" y="10" width="5" height="14" fill="#8a4b2a" />
      <circle cx="-23.5" cy="6" r="9" fill="#4cbf4c" />
      <rect x="-1.5" y="-37" width="3" height="70" fill="#ffffff" />
      <rect x="-35" y="-3" width="70" height="3" fill="#ffffff" />
      <rect x="-46" y="38" width="92" height="7" rx="3" fill="#ffffff" stroke="#e0c890" strokeWidth="1" />
    </g>
  );
}

const school = {
  id: 'school',
  title: 'School',
  titleId: 'Sekolah',
  icon: '🏫',
  Background,
  Foreground: TeacherDesk,
  objects: [
    {
      id: 'board', word: 'board', wordId: 'papan tulis', art: Board, x: 820, y: 330, size: 560, hit: { w: 540, h: 310 },
      sentence: 'The teacher draws on the board.', sentenceId: 'Bu guru menggambar di papan tulis.',
      question: 'Can you draw a sun?', questionId: 'Bisa menggambar matahari?',
      answer: 'Yes, I can draw a sun.', answerId: 'Ya, aku bisa menggambar matahari.',
    },
    {
      id: 'teacher', word: 'teacher', wordId: 'guru', emoji: '🧑‍🏫', x: 310, y: 560, size: 270,
      sentence: 'The teacher reads us a story.', sentenceId: 'Guru membacakan kami cerita.',
      question: 'Do you like your teacher?', questionId: 'Kamu suka gurumu?',
      answer: 'Yes, I like my teacher.', answerId: 'Ya, aku suka guruku.',
    },
    {
      id: 'apple', word: 'apple', wordId: 'apel', emoji: '🍎', x: 482, y: 652, size: 80,
      sentence: 'An apple for the teacher!', sentenceId: 'Apel untuk bu guru!',
      question: 'Is the apple red or green?', questionId: 'Apelnya merah atau hijau?',
      answer: 'The apple is red.', answerId: 'Apelnya merah.',
    },
    {
      id: 'bell', word: 'bell', wordId: 'lonceng', emoji: '🔔', x: 150, y: 650, size: 80,
      sentence: 'Ring, ring! The bell rings.', sentenceId: 'Kring, kring! Loncengnya berbunyi.',
      question: 'Can you say ring, ring?', questionId: 'Bisa bilang kring, kring?',
      answer: 'Ring, ring!', answerId: 'Kring, kring!',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam', emoji: '🕰️', x: 1290, y: 160, size: 120,
      sentence: 'It is time for school.', sentenceId: 'Sudah waktunya sekolah.',
      question: 'Do you go to school in the morning?', questionId: 'Kamu sekolah pagi hari?',
      answer: 'Yes, I go in the morning.', answerId: 'Ya, aku sekolah pagi hari.',
    },
    {
      id: 'map', word: 'map', wordId: 'peta', emoji: '🗺️', x: 170, y: 250, size: 170,
      sentence: 'The map shows the world.', sentenceId: 'Peta itu menunjukkan dunia.',
      question: 'Can you find the sea?', questionId: 'Bisa menemukan lautnya?',
      answer: 'The sea is blue!', answerId: 'Lautnya biru!',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 1440, y: 360, size: 270, hit: { w: 230, h: 230 },
      sentence: 'We look out the window.', sentenceId: 'Kami melihat ke luar jendela.',
      question: 'Is it sunny or rainy?', questionId: 'Cuacanya cerah atau hujan?',
      answer: 'It is sunny.', answerId: 'Cuacanya cerah.',
    },
    {
      id: 'globe', word: 'globe', wordId: 'bola dunia', emoji: '🌍', x: 1345, y: 578, size: 110,
      sentence: 'The globe is round like Earth.', sentenceId: 'Bola dunia bulat seperti Bumi.',
      question: 'Can you spin the globe?', questionId: 'Bisa memutar bola dunia?',
      answer: 'Spin, spin, spin!', answerId: 'Putar, putar, putar!',
    },
    {
      id: 'trophy', word: 'trophy', wordId: 'piala', emoji: '🏆', x: 1500, y: 578, size: 105,
      sentence: 'Our class won a trophy!', sentenceId: 'Kelas kami menang piala!',
      question: 'Is the trophy gold?', questionId: 'Apakah pialanya emas?',
      answer: 'Yes, it is gold.', answerId: 'Ya, warnanya emas.',
    },
    {
      id: 'notebook', word: 'notebook', wordId: 'buku tulis', emoji: '📓', x: 590, y: 845, size: 90,
      sentence: 'I write in my notebook.', sentenceId: 'Aku menulis di buku tulisku.',
      question: 'Can you write your name?', questionId: 'Bisa menulis namamu?',
      answer: 'Yes, I can.', answerId: 'Ya, aku bisa.',
    },
    {
      id: 'pencil', word: 'pencil', wordId: 'pensil', emoji: '✏️', x: 705, y: 845, size: 90,
      sentence: 'I write with a pencil.', sentenceId: 'Aku menulis dengan pensil.',
      question: 'Is your pencil long or short?', questionId: 'Pensilmu panjang atau pendek?',
      answer: 'My pencil is long.', answerId: 'Pensilku panjang.',
    },
    {
      id: 'crayon', word: 'crayon', wordId: 'krayon', emoji: '🖍️', x: 820, y: 848, size: 80,
      sentence: 'I color with a crayon.', sentenceId: 'Aku mewarnai dengan krayon.',
      question: 'What color do you like?', questionId: 'Kamu suka warna apa?',
      answer: 'I like blue.', answerId: 'Aku suka biru.',
    },
    {
      id: 'scissors', word: 'scissors', wordId: 'gunting', emoji: '✂️', x: 1070, y: 848, size: 90,
      sentence: 'I cut paper with scissors.', sentenceId: 'Aku menggunting kertas.',
      question: 'Can you cut carefully?', questionId: 'Bisa menggunting dengan hati-hati?',
      answer: 'Yes, I cut carefully.', answerId: 'Ya, aku menggunting dengan hati-hati.',
    },
    {
      id: 'paint', word: 'paint', wordId: 'cat warna', emoji: '🎨', x: 1190, y: 845, size: 100,
      sentence: 'I paint with many colors.', sentenceId: 'Aku melukis dengan banyak warna.',
      question: 'What do you like to paint?', questionId: 'Kamu suka melukis apa?',
      answer: 'I like to paint flowers.', answerId: 'Aku suka melukis bunga.',
    },
    {
      id: 'computer', word: 'computer', wordId: 'komputer', emoji: '💻', x: 1310, y: 835, size: 120,
      sentence: 'We learn on the computer.', sentenceId: 'Kami belajar pakai komputer.',
      question: 'Can you type on a computer?', questionId: 'Bisa mengetik di komputer?',
      answer: 'Yes, I can type.', answerId: 'Ya, aku bisa mengetik.',
    },
    {
      id: 'backpack', word: 'backpack', wordId: 'tas ransel', emoji: '🎒', x: 190, y: 1010, size: 150,
      sentence: 'My backpack is full of books.', sentenceId: 'Tas ranselku penuh buku.',
      question: 'What color is your backpack?', questionId: 'Tas ranselmu warna apa?',
      answer: 'My backpack is red.', answerId: 'Tas ranselku merah.',
    },
    {
      id: 'lunchbox', word: 'lunch box', wordId: 'kotak bekal', emoji: '🍱', x: 370, y: 1085, size: 105,
      sentence: 'My lunch is in my lunch box.', sentenceId: 'Bekalku ada di kotak bekal.',
      question: 'What is in your lunch box?', questionId: 'Apa isi kotak bekalmu?',
      answer: 'Rice and chicken!', answerId: 'Nasi dan ayam!',
    },
    {
      id: 'books', word: 'books', wordId: 'buku-buku', emoji: '📚', x: 540, y: 1100, size: 110,
      sentence: 'We read books together.', sentenceId: 'Kami membaca buku bersama.',
      question: 'Do you like books?', questionId: 'Kamu suka buku?',
      answer: 'Yes, I love books.', answerId: 'Ya, aku suka sekali buku.',
    },
    {
      id: 'abacus', word: 'abacus', wordId: 'sempoa', emoji: '🧮', x: 720, y: 1110, size: 110,
      sentence: 'I count with the beads.', sentenceId: 'Aku berhitung dengan manik-manik.',
      question: 'Can you count to five?', questionId: 'Bisa berhitung sampai lima?',
      answer: 'One, two, three, four, five!', answerId: 'Satu, dua, tiga, empat, lima!',
    },
    {
      id: 'ruler', word: 'ruler', wordId: 'penggaris', emoji: '📏', x: 940, y: 1105, size: 105, rotate: 20,
      sentence: 'The ruler is long and straight.', sentenceId: 'Penggarisnya panjang dan lurus.',
      question: 'Is the ruler long or short?', questionId: 'Penggarisnya panjang atau pendek?',
      answer: 'The ruler is long.', answerId: 'Penggarisnya panjang.',
    },
    {
      id: 'chair', word: 'chair', wordId: 'kursi', emoji: '🪑', x: 1200, y: 1040, size: 170,
      sentence: 'I sit on my chair in class.', sentenceId: 'Aku duduk di kursiku di kelas.',
      question: 'Can you sit nicely?', questionId: 'Bisa duduk dengan rapi?',
      answer: 'Yes, I can sit nicely.', answerId: 'Ya, aku bisa duduk dengan rapi.',
    },
    {
      id: 'plant', word: 'plant', wordId: 'tanaman', emoji: '🪴', x: 1500, y: 1050, size: 160,
      sentence: 'Our class plant is growing.', sentenceId: 'Tanaman di kelas kami tumbuh.',
      question: 'Does the plant need water?', questionId: 'Apakah tanamannya butuh air?',
      answer: 'Yes, it needs water.', answerId: 'Ya, tanamannya butuh air.',
    },
  ],
};

export default school;

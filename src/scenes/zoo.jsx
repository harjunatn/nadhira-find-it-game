// Zoo scene. Coordinates are in a 1600 x 1200 picture.
// A sunny zoo seen from the visitors' path: savanna (left), jungle (middle),
// desert (right), a pond and an icy pool below, and the sandy path in front.

const WOOD = '#d79a5a';
const WOOD_DARK = '#9a6233';

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="4" cy="30" rx="96" ry="14" fill="#a9dcf5" opacity="0.6" />
      <g fill="#ffffff">
        <ellipse cx="0" cy="18" rx="96" ry="26" />
        <circle cx="-46" cy="6" r="34" />
        <circle cx="4" cy="-12" r="48" />
        <circle cx="52" cy="6" r="32" />
      </g>
    </g>
  );
}

// A straight low wooden fence along y (posts drawn over two rails).
function Fence({ y, x1 = 0, x2 = 1600, step = 92 }) {
  const posts = [];
  for (let x = x1 + step / 2; x < x2; x += step) {
    posts.push(
      <path
        key={x}
        d={`M ${x - 10} ${y + 22} L ${x - 10} ${y - 30} Q ${x} ${y - 42} ${x + 10} ${y - 30} L ${x + 10} ${y + 22} Z`}
        fill={WOOD}
        stroke={WOOD_DARK}
        strokeWidth="3.5"
      />,
    );
  }
  return (
    <g strokeLinejoin="round">
      <ellipse cx={(x1 + x2) / 2} cy={y + 24} rx={(x2 - x1) / 2} ry="7" fill="#000" opacity="0.07" />
      <rect x={x1 - 10} y={y - 22} width={x2 - x1 + 20} height="11" rx="5" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3" />
      <rect x={x1 - 10} y={y} width={x2 - x1 + 20} height="11" rx="5" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3" />
      {posts}
    </g>
  );
}

// A light rope barrier: short posts with drooping ropes.
function RopeFence({ y, x1 = 0, x2 = 1600, step = 200 }) {
  const xs = [];
  for (let x = x1 + 40; x <= x2; x += step) xs.push(x);
  const rope = xs
    .slice(1)
    .map((x, i) => `M ${xs[i]} ${y - 26} Q ${(xs[i] + x) / 2} ${y + 4} ${x} ${y - 26}`)
    .join(' ');
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d={rope} fill="none" stroke="#9a6233" strokeWidth="9" />
      <path d={rope} fill="none" stroke="#e8b36e" strokeWidth="4" />
      {xs.map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y + 16} rx="16" ry="5" fill="#000" opacity="0.1" />
          <rect x={x - 9} y={y - 40} width="18" height="56" rx="6" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3.5" />
          <circle cx={x} cy={y - 42} r="11" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3.5" />
        </g>
      ))}
    </g>
  );
}

function IceBlock({ x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={Math.min(w, h) * 0.3} fill="#ffffff" stroke="#9fd6ef" strokeWidth="4" />
      <rect x={x + 4} y={y + h * 0.62} width={w - 8} height={h * 0.3} rx={h * 0.15} fill="#d7f1fc" />
      <rect x={x + w * 0.18} y={y + h * 0.18} width={w * 0.3} height="6" rx="3" fill="#eaf8ff" />
    </g>
  );
}

function Bush({ x, y, s = 1, color = '#5db34a', dark = '#3f8f35' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="34" rx="70" ry="9" fill="#000" opacity="0.1" />
      <g fill={color} stroke={dark} strokeWidth="4">
        <circle cx="-38" cy="8" r="30" />
        <circle cx="38" cy="8" r="30" />
        <circle cx="0" cy="-8" r="40" />
        <rect x="-60" y="4" width="120" height="30" rx="15" stroke="none" />
      </g>
      <circle cx="-12" cy="-22" r="10" fill="#ffffff" opacity="0.25" />
    </g>
  );
}

function GrassTuft({ x, y, s = 1, color = '#c2ad3f' }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M -24 0 Q -22 -26 -30 -44 Q -12 -26 -10 0 Q -6 -36 0 -56 Q 6 -36 10 0 Q 14 -26 30 -44 Q 22 -26 24 0 Z"
      fill={color}
      strokeLinejoin="round"
    />
  );
}

function Background() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="zoo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#62c0ff" />
          <stop offset="1" stopColor="#cdf0ff" />
        </linearGradient>
        <linearGradient id="zoo-pond" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#62c6ef" />
          <stop offset="1" stopColor="#3b9fdb" />
        </linearGradient>
        <linearGradient id="zoo-icewater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe6ff" />
          <stop offset="1" stopColor="#45bdf0" />
        </linearGradient>
        <linearGradient id="zoo-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d89c" />
          <stop offset="1" stopColor="#f8e6b8" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1600" height="620" fill="url(#zoo-sky)" />
      <Cloud x={170} y={130} s={1} />
      <Cloud x={600} y={70} s={0.75} />
      <Cloud x={1390} y={95} s={0.85} />

      {/* far hills */}
      <path d="M 0 455 C 150 380 330 385 480 435 C 640 375 820 380 980 430 C 1140 370 1340 365 1600 425 L 1600 640 L 0 640 Z" fill="#bde894" />
      <path d="M 0 490 C 180 450 360 455 560 480 C 760 445 980 450 1180 478 C 1360 455 1500 455 1600 470 L 1600 640 L 0 640 Z" fill="#a5dd7a" />

      {/* ground: jungle green, with a golden savanna (left) and a sandy desert (right) */}
      <path d="M 0 500 C 300 482 700 498 1000 494 C 1250 490 1450 494 1600 502 L 1600 810 L 0 810 Z" fill="#83cd5b" />
      <path d="M 0 505 C 200 488 420 495 636 510 C 676 560 630 640 676 700 C 700 740 672 780 684 810 L 0 810 Z" fill="#ead87e" />
      <path d="M 1600 506 C 1470 496 1300 494 1152 510 C 1118 560 1168 630 1130 690 C 1112 740 1140 780 1128 810 L 1600 810 Z" fill="#f4d696" />
      <path d="M 1170 600 Q 1270 565 1390 592 Q 1490 568 1600 586 L 1600 608 Q 1490 594 1390 614 Q 1270 592 1172 622 Z" fill="#e9c47b" opacity="0.55" />

      {/* savanna: acacia tree (giraffe eats from it) */}
      <ellipse cx="245" cy="604" rx="55" ry="10" fill="#000" opacity="0.1" />
      <path d="M 228 606 Q 236 520 240 430 Q 238 380 225 340 L 246 336 Q 256 380 258 420 Q 268 370 300 330 L 316 342 Q 280 390 270 450 Q 266 530 268 606 Z" fill="#a8703f" stroke="#7a4a25" strokeWidth="4" />
      <path d="M 234 420 Q 200 380 150 345" fill="none" stroke="#7a4a25" strokeWidth="16" />
      <path d="M 234 420 Q 200 380 150 345" fill="none" stroke="#a8703f" strokeWidth="9" />
      <ellipse cx="230" cy="296" rx="190" ry="40" fill="#5e9e37" stroke="#477a28" strokeWidth="4" />
      <ellipse cx="230" cy="282" rx="172" ry="32" fill="#76b845" />
      <ellipse cx="170" cy="262" rx="100" ry="26" fill="#87c851" stroke="#5e9e37" strokeWidth="3" />
      <ellipse cx="300" cy="258" rx="92" ry="24" fill="#87c851" stroke="#5e9e37" strokeWidth="3" />
      <ellipse cx="236" cy="240" rx="70" ry="20" fill="#98d55f" />

      {/* savanna: tall grass and a little rock */}
      <GrassTuft x={60} y={560} s={0.9} />
      <GrassTuft x={430} y={640} s={0.8} color="#cdb84a" />
      <GrassTuft x={510} y={758} s={1.1} />
      <GrassTuft x={612} y={755} s={1} color="#cdb84a" />
      <GrassTuft x={560} y={746} s={1.2} color="#d6c25a" />
      <GrassTuft x={360} y={545} s={0.7} color="#cdb84a" />
      <ellipse cx="560" cy="752" rx="80" ry="10" fill="#000" opacity="0.08" />

      {/* jungle: big tree (monkey and sloth) */}
      <ellipse cx="870" cy="676" rx="75" ry="12" fill="#000" opacity="0.1" />
      <path d="M 816 684 Q 838 672 842 620 L 846 280 L 894 280 L 898 620 Q 902 672 926 684 Z" fill="#a0673a" stroke="#7a4a25" strokeWidth="4" />
      <path d="M 860 330 Q 856 480 862 640 M 880 420 Q 884 520 878 600" fill="none" stroke="#7a4a25" strokeWidth="4" opacity="0.45" />
      <path d="M 850 352 Q 760 350 668 368" fill="none" stroke="#7a4a25" strokeWidth="24" />
      <path d="M 850 352 Q 760 350 668 368" fill="none" stroke="#a0673a" strokeWidth="16" />
      <path d="M 886 318 Q 990 340 1090 376" fill="none" stroke="#7a4a25" strokeWidth="24" />
      <path d="M 886 318 Q 990 340 1090 376" fill="none" stroke="#a0673a" strokeWidth="16" />
      <g stroke="#3d8b34" strokeWidth="5">
        <circle cx="748" cy="222" r="88" fill="#4fae46" />
        <circle cx="985" cy="222" r="88" fill="#4fae46" />
        <circle cx="800" cy="128" r="84" fill="#5bbb4f" />
        <circle cx="932" cy="122" r="84" fill="#5bbb4f" />
        <circle cx="866" cy="196" r="112" fill="#5bbb4f" />
      </g>
      <circle cx="866" cy="196" r="108" fill="#5bbb4f" />
      <g fill="#7fd06a" opacity="0.8">
        <circle cx="780" cy="105" r="26" />
        <circle cx="912" cy="96" r="22" />
        <circle cx="840" cy="160" r="30" />
        <circle cx="725" cy="200" r="20" />
        <circle cx="990" cy="190" r="22" />
      </g>

      {/* jungle: bamboo (panda) */}
      {[
        [1000, 520, 9],
        [1032, 500, 11],
        [1090, 510, 10],
        [1118, 540, 9],
      ].map(([x, top, w]) => (
        <g key={x}>
          <rect x={x - w} y={top} width={w * 2} height={760 - top} rx={w} fill="#8fd35f" stroke="#4f9e35" strokeWidth="3" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={x - w - 2} y={top + 50 + k * 60} width={w * 2 + 4} height="6" rx="3" fill="#4f9e35" />
          ))}
          <path d={`M ${x} ${top + 52} q 30 -24 56 -16 q -26 18 -56 16 Z`} fill="#6cbf45" stroke="#4f9e35" strokeWidth="2" />
          <path d={`M ${x} ${top + 112} q -30 -24 -56 -14 q 26 18 56 14 Z`} fill="#6cbf45" stroke="#4f9e35" strokeWidth="2" />
        </g>
      ))}
      <ellipse cx="1058" cy="762" rx="85" ry="10" fill="#000" opacity="0.1" />

      {/* desert: palm tree (parrot) and sandy rocks */}
      <ellipse cx="1560" cy="742" rx="45" ry="9" fill="#000" opacity="0.1" />
      <path d="M 1545 742 Q 1540 560 1500 330 L 1520 328 Q 1566 560 1575 742 Z" fill="#c8945a" stroke="#946433" strokeWidth="4" />
      {[380, 440, 500, 560, 620, 680].map((y) => (
        <path key={y} d={`M ${1508 + (y - 330) * 0.1} ${y} q 16 6 32 0`} fill="none" stroke="#946433" strokeWidth="4" />
      ))}
      <g fill="#59b847" stroke="#3d8b34" strokeWidth="4">
        <path d="M 1508 326 Q 1440 280 1372 330 Q 1440 304 1508 336 Z" />
        <path d="M 1508 326 Q 1450 248 1400 250 Q 1460 270 1508 334 Z" />
        <path d="M 1508 326 Q 1580 262 1640 300 Q 1570 290 1510 336 Z" />
        <path d="M 1508 326 Q 1590 320 1620 390 Q 1570 340 1508 336 Z" />
        <path d="M 1508 326 Q 1440 340 1420 400 Q 1470 350 1508 336 Z" />
      </g>
      <ellipse cx="1236" cy="764" rx="78" ry="10" fill="#000" opacity="0.1" />
      <path d="M 1172 764 Q 1168 716 1210 708 Q 1250 700 1262 736 Q 1270 760 1262 766 Z" fill="#dba86a" stroke="#b07a40" strokeWidth="4" />
      <path d="M 1240 766 Q 1240 734 1272 732 Q 1302 732 1304 766 Z" fill="#e8bb7c" stroke="#b07a40" strokeWidth="4" />
      <path d="M 1190 726 Q 1206 716 1226 716" fill="none" stroke="#f3d39c" strokeWidth="6" />

      {/* zone dividers: bushes and fences going back */}
      <Bush x={646} y={596} s={0.5} />
      <Bush x={1150} y={612} s={0.5} color="#6cbf50" />
      <GrassTuft x={652} y={540} s={0.6} color="#5aae47" />
      <GrassTuft x={1146} y={545} s={0.6} color="#5aae47" />
      <Bush x={652} y={758} s={0.72} />
      <Bush x={1146} y={758} s={0.72} color="#6cbf50" />

      {/* front fence of the top enclosures */}
      <rect y="806" width="1600" height="270" fill="#93d86b" />
      <Fence y={808} />

      {/* rock for the snake */}
      <ellipse cx="122" cy="1010" rx="98" ry="26" fill="#000" opacity="0.1" />
      <path d="M 30 1008 Q 40 965 110 962 Q 190 960 210 1004 Q 160 1022 30 1008 Z" fill="#b8b2a8" stroke="#8a847a" strokeWidth="4" />
      <path d="M 70 976 Q 110 968 150 974" fill="none" stroke="#ddd8cf" strokeWidth="6" />

      {/* pond (hippo, crocodile, flamingo) */}
      <ellipse cx="580" cy="944" rx="342" ry="100" fill="#d8c48c" />
      <ellipse cx="580" cy="940" rx="322" ry="86" fill="url(#zoo-pond)" stroke="#2f8cc4" strokeWidth="4" />
      <g fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.55">
        <path d="M 330 905 q 20 -8 40 0 q 20 8 40 0" />
        <path d="M 660 1004 q 20 -8 40 0 q 20 8 40 0" />
        <path d="M 820 950 q 15 -6 30 0 q 15 6 30 0" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.75">
        <ellipse cx="545" cy="990" rx="92" ry="13" />
        <ellipse cx="780" cy="982" rx="34" ry="7" />
      </g>
      <g fill="#5cb85c" stroke="#3d8b34" strokeWidth="3">
        <path d="M 420 1000 m -24 0 a 24 11 0 1 0 48 0 l -24 0 Z" />
        <path d="M 700 900 m -20 0 a 20 9 0 1 0 40 0 l -20 0 Z" />
      </g>
      <GrassTuft x={262} y={985} s={0.7} color="#5aae47" />
      <GrassTuft x={905} y={975} s={0.8} color="#5aae47" />

      {/* icy pool (penguin, seal) */}
      <rect x="1080" y="850" width="500" height="186" rx="60" fill="#f4fbff" stroke="#b8e2f5" strokeWidth="5" />
      <rect x="1100" y="868" width="460" height="152" rx="46" fill="url(#zoo-icewater)" />
      <IceBlock x={1092} y={850} w={84} h={50} />
      <IceBlock x={1140} y={838} w={56} h={38} />
      <IceBlock x={1500} y={852} w={74} h={56} />
      <IceBlock x={1532} y={904} w={46} h={40} />
      <path d="M 1330 992 Q 1338 964 1432 960 Q 1534 960 1542 992 Q 1440 1010 1330 992 Z" fill="#ffffff" stroke="#9fd6ef" strokeWidth="4" />
      <path d="M 1340 990 Q 1440 1004 1534 990 L 1530 998 Q 1440 1012 1344 998 Z" fill="#d7f1fc" />
      <g fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.8">
        <ellipse cx="1205" cy="1000" rx="70" ry="13" />
        <ellipse cx="1205" cy="1000" rx="44" ry="7" />
      </g>

      {/* front fence along the visitors' path */}
      <RopeFence y={1062} />

      {/* visitors' path */}
      <rect y="1074" width="1600" height="126" fill="url(#zoo-path)" />
      <rect y="1068" width="1600" height="12" fill="#e2bf7c" />
      <g fill="#e6c68a">
        <ellipse cx="120" cy="1130" rx="12" ry="6" />
        <ellipse cx="260" cy="1176" rx="9" ry="5" />
        <ellipse cx="620" cy="1120" rx="10" ry="5" />
        <ellipse cx="1000" cy="1170" rx="12" ry="6" />
        <ellipse cx="1120" cy="1118" rx="9" ry="5" />
        <ellipse cx="1500" cy="1150" rx="12" ry="6" />
      </g>

      {/* bench on the path */}
      <g transform="translate(880 0)">
        <ellipse cx="620" cy="1186" rx="95" ry="8" fill="#000" opacity="0.1" />
        <rect x="548" y="1150" width="10" height="36" rx="3" fill="#7a5a3a" />
        <rect x="682" y="1150" width="10" height="36" rx="3" fill="#7a5a3a" />
        <rect x="530" y="1096" width="180" height="16" rx="6" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3" />
        <rect x="530" y="1118" width="180" height="16" rx="6" fill={WOOD} stroke={WOOD_DARK} strokeWidth="3" />
        <rect x="524" y="1142" width="192" height="14" rx="6" fill="#e4a96a" stroke={WOOD_DARK} strokeWidth="3" />
      </g>

      {/* ice cream cart */}
      <g transform="translate(-110 0)">
      <ellipse cx="1290" cy="1192" rx="95" ry="8" fill="#000" opacity="0.12" />
      <rect x="1215" y="1126" width="150" height="52" rx="10" fill="#ffffff" stroke="#e46a95" strokeWidth="4" />
      <g fill="#ff9ec0">
        <rect x="1232" y="1128" width="18" height="48" />
        <rect x="1268" y="1128" width="18" height="48" />
        <rect x="1304" y="1128" width="18" height="48" />
        <rect x="1340" y="1128" width="14" height="48" />
      </g>
      <rect x="1215" y="1126" width="150" height="52" rx="10" fill="none" stroke="#e46a95" strokeWidth="4" />
      <rect x="1208" y="1118" width="164" height="12" rx="5" fill="#ff7aa8" stroke="#e46a95" strokeWidth="3" />
      <path d="M 1365 1140 L 1392 1122" stroke="#9aa3ad" strokeWidth="6" />
      <circle cx="1245" cy="1182" r="14" fill="#5b6470" stroke="#3b424b" strokeWidth="3" />
      <circle cx="1335" cy="1182" r="14" fill="#5b6470" stroke="#3b424b" strokeWidth="3" />
      <circle cx="1245" cy="1182" r="5" fill="#c9d1da" />
      <circle cx="1335" cy="1182" r="5" fill="#c9d1da" />
      </g>

      {/* soft shadows under the animals */}
      <ellipse cx="135" cy="764" rx="80" ry="11" fill="#000" opacity="0.1" />
      <ellipse cx="352" cy="766" rx="60" ry="9" fill="#000" opacity="0.1" />
      <ellipse cx="450" cy="608" rx="85" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="752" cy="728" rx="70" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="915" cy="762" rx="75" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="1285" cy="692" rx="78" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="1475" cy="731" rx="66" ry="9" fill="#000" opacity="0.1" />
      <ellipse cx="990" cy="1036" rx="45" ry="7" fill="#000" opacity="0.1" />
      <ellipse cx="250" cy="1192" rx="55" ry="7" fill="#000" opacity="0.1" />
      <ellipse cx="712" cy="1184" rx="40" ry="6" fill="#000" opacity="0.1" />
    </g>
  );
}

const zoo = {
  id: 'zoo',
  title: 'Zoo',
  titleId: 'Kebun Binatang',
  icon: '🦁',
  Background,
  objects: [
    // --- sky and trees ---
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 1240, y: 150, size: 120, rotate: -6,
      sentence: 'The balloon floats up high.', sentenceId: 'Balonnya terbang tinggi.',
      question: 'What color is the balloon?', questionId: 'Balonnya warna apa?',
      answer: 'The balloon is red.', answerId: 'Balonnya merah.',
    },
    {
      id: 'monkey', word: 'monkey', wordId: 'monyet', emoji: '🐒', x: 735, y: 305, size: 120,
      sentence: 'The monkey likes bananas.', sentenceId: 'Monyet suka pisang.',
      question: 'Do you like bananas too?', questionId: 'Kamu juga suka pisang?',
      answer: 'Yes, I like bananas!', answerId: 'Ya, aku suka pisang!',
    },
    {
      id: 'sloth', word: 'sloth', wordId: 'kungkang', emoji: '🦥', x: 1005, y: 400, size: 130,
      sentence: 'The sloth hangs on a branch.', sentenceId: 'Kungkang bergantung di dahan.',
      question: 'Can you move slowly like a sloth?', questionId: 'Bisa bergerak pelan-pelan seperti kungkang?',
      answer: 'Yes, I can move slowly.', answerId: 'Ya, aku bisa bergerak pelan-pelan.',
    },
    {
      id: 'parrot', word: 'parrot', wordId: 'burung beo', emoji: '🦜', x: 1490, y: 285, size: 115,
      sentence: 'The parrot can talk.', sentenceId: 'Burung beo bisa bicara.',
      question: 'Can you say hello like a parrot?', questionId: 'Bisa bilang halo seperti burung beo?',
      answer: 'Hello! Hello!', answerId: 'Halo! Halo!',
    },

    // --- savanna ---
    {
      id: 'giraffe', word: 'giraffe', wordId: 'jerapah', emoji: '🦒', x: 430, y: 470, size: 320, hit: { w: 270, h: 300, dx: 0, dy: -10 },
      sentence: 'The giraffe has a long neck.', sentenceId: 'Jerapah punya leher yang panjang.',
      question: 'Is the giraffe tall or short?', questionId: 'Jerapahnya tinggi atau pendek?',
      answer: 'The giraffe is very tall!', answerId: 'Jerapahnya tinggi sekali!',
    },
    {
      id: 'elephant', word: 'elephant', wordId: 'gajah', emoji: '🐘', x: 130, y: 690, size: 190, flip: true,
      sentence: 'The elephant has a long trunk.', sentenceId: 'Gajah punya belalai yang panjang.',
      question: 'Is the elephant big or small?', questionId: 'Gajahnya besar atau kecil?',
      answer: 'The elephant is very big!', answerId: 'Gajahnya besar sekali!',
    },
    {
      id: 'zebra', word: 'zebra', wordId: 'zebra', emoji: '🦓', x: 352, y: 703, size: 150,
      sentence: 'The zebra has black and white stripes.', sentenceId: 'Zebra punya belang hitam dan putih.',
      question: 'Do you have stripes too?', questionId: 'Kamu juga punya belang?',
      answer: "No, I don't!", answerId: 'Tidak, aku tidak punya!',
    },
    {
      id: 'lion', word: 'lion', wordId: 'singa', emoji: '🦁', x: 560, y: 690, size: 125,
      sentence: 'The lion says roar!', sentenceId: 'Singa mengaum, auum!',
      question: 'Can you roar like a lion?', questionId: 'Bisa mengaum seperti singa?',
      answer: 'Roar! Roar!', answerId: 'Auum! Auum!',
    },

    // --- jungle ---
    {
      id: 'gorilla', word: 'gorilla', wordId: 'gorila', emoji: '🦍', x: 752, y: 650, size: 165,
      sentence: 'The gorilla is big and strong.', sentenceId: 'Gorila itu besar dan kuat.',
      question: 'Can you beat your chest like a gorilla?', questionId: 'Bisa pukul-pukul dada seperti gorila?',
      answer: 'Yes! Boom, boom, boom!', answerId: 'Ya! Dug, dug, dug!',
    },
    {
      id: 'tiger', word: 'tiger', wordId: 'harimau', emoji: '🐅', x: 915, y: 705, size: 165,
      sentence: 'The tiger is orange and black.', sentenceId: 'Harimau itu oranye dan hitam.',
      question: 'How many legs does the tiger have?', questionId: 'Harimau punya berapa kaki?',
      answer: 'The tiger has four legs.', answerId: 'Harimau punya empat kaki.',
    },
    {
      id: 'panda', word: 'panda', wordId: 'panda', emoji: '🐼', x: 1058, y: 615, size: 120,
      sentence: 'The panda eats green bamboo.', sentenceId: 'Panda makan bambu hijau.',
      question: 'What does the panda eat?', questionId: 'Panda makan apa?',
      answer: 'The panda eats bamboo.', answerId: 'Panda makan bambu.',
    },

    // --- desert ---
    {
      id: 'camel', word: 'camel', wordId: 'unta', emoji: '🐫', x: 1285, y: 610, size: 190,
      sentence: 'The camel has two humps.', sentenceId: 'Unta itu punya dua punuk.',
      question: 'How many humps can you see?', questionId: 'Ada berapa punuknya?',
      answer: 'I can see two humps.', answerId: 'Aku lihat dua punuk.',
    },
    {
      id: 'kangaroo', word: 'kangaroo', wordId: 'kanguru', emoji: '🦘', x: 1472, y: 660, size: 175,
      sentence: 'The kangaroo can hop.', sentenceId: 'Kanguru bisa melompat.',
      question: 'Can you hop like a kangaroo?', questionId: 'Bisa lompat seperti kanguru?',
      answer: 'Yes! Hop, hop, hop!', answerId: 'Ya! Hop, hop, hop!',
    },

    // --- pond and icy pool ---
    {
      id: 'snake', word: 'snake', wordId: 'ular', emoji: '🐍', x: 122, y: 955, size: 125, flip: true,
      sentence: 'The green snake says hiss!', sentenceId: 'Ular hijau berbunyi sss!',
      question: 'Does the snake have legs?', questionId: 'Ular punya kaki?',
      answer: 'No, it has no legs!', answerId: 'Tidak, ular tidak punya kaki!',
    },
    {
      id: 'crocodile', word: 'crocodile', wordId: 'buaya', emoji: '🐊', x: 335, y: 945, size: 165, flip: true, rotate: -90,
      sentence: 'The crocodile has many teeth.', sentenceId: 'Buaya punya banyak gigi.',
      question: 'Is the crocodile green or pink?', questionId: 'Buayanya hijau atau merah muda?',
      answer: 'The crocodile is green.', answerId: 'Buayanya hijau.',
    },
    {
      id: 'hippo', word: 'hippo', wordId: 'kuda nil', emoji: '🦛', x: 545, y: 935, size: 170, flip: true,
      sentence: 'The hippo loves the water.', sentenceId: 'Kuda nil suka main air.',
      question: 'Can you open your mouth wide?', questionId: 'Bisa buka mulut lebar-lebar?',
      answer: 'Yes! Look, aaah!', answerId: 'Ya! Lihat, aaa!',
    },
    {
      id: 'flamingo', word: 'flamingo', wordId: 'flamingo', emoji: '🦩', x: 790, y: 905, size: 165,
      sentence: 'The pink flamingo stands on one leg.', sentenceId: 'Flamingo merah muda berdiri dengan satu kaki.',
      question: 'Can you stand on one leg?', questionId: 'Bisa berdiri dengan satu kaki?',
      answer: 'Yes, I can!', answerId: 'Ya, aku bisa!',
    },
    {
      id: 'turtle', word: 'turtle', wordId: 'kura-kura', emoji: '🐢', x: 990, y: 990, size: 110,
      sentence: 'The turtle has a hard shell.', sentenceId: 'Kura-kura punya tempurung yang keras.',
      question: 'Is the turtle fast or slow?', questionId: 'Kura-kura cepat atau lambat?',
      answer: 'The turtle is slow.', answerId: 'Kura-kura lambat.',
    },
    {
      id: 'penguin', word: 'penguin', wordId: 'penguin', emoji: '🐧', x: 1205, y: 960, size: 110,
      sentence: 'The penguin loves to swim.', sentenceId: 'Penguin suka berenang.',
      question: 'Can you waddle like a penguin?', questionId: 'Bisa jalan megal-megol seperti penguin?',
      answer: 'Yes! Waddle, waddle!', answerId: 'Ya! Megal-megol!',
    },
    {
      id: 'seal', word: 'seal', wordId: 'anjing laut', emoji: '🦭', x: 1435, y: 925, size: 165,
      sentence: 'The seal likes to eat fish.', sentenceId: 'Anjing laut suka makan ikan.',
      question: 'Can you clap like a seal?', questionId: 'Bisa tepuk tangan seperti anjing laut?',
      answer: 'Clap, clap, clap!', answerId: 'Prok, prok, prok!',
    },

    // --- visitors' path ---
    {
      id: 'peacock', word: 'peacock', wordId: 'burung merak', emoji: '🦚', x: 250, y: 1125, size: 150,
      sentence: 'The peacock has a pretty tail.', sentenceId: 'Burung merak punya ekor yang cantik.',
      question: 'What colors can you see?', questionId: 'Kamu lihat warna apa saja?',
      answer: 'I see blue and green.', answerId: 'Aku lihat biru dan hijau.',
    },
    {
      id: 'duck', word: 'duck', wordId: 'bebek', emoji: '🦆', x: 712, y: 1135, size: 110,
      sentence: 'The duck says quack, quack!', sentenceId: 'Bebek berbunyi kwek, kwek!',
      question: 'Can you quack like a duck?', questionId: 'Bisa bunyi kwek-kwek seperti bebek?',
      answer: 'Quack, quack, quack!', answerId: 'Kwek, kwek, kwek!',
    },
    {
      id: 'icecream', word: 'ice cream', wordId: 'es krim', emoji: '🍦', x: 1180, y: 1078, size: 100,
      sentence: 'The ice cream is cold and yummy.', sentenceId: 'Es krimnya dingin dan enak.',
      question: 'Do you like ice cream?', questionId: 'Kamu suka es krim?',
      answer: 'Yes, I love ice cream!', answerId: 'Ya, aku suka sekali es krim!',
    },
  ],
};

export default zoo;

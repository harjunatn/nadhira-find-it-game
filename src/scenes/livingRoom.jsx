// Living room scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.

const FLOOR_TOP = 782;

// Floor tiles with a gentle perspective: columns spread out towards the bottom.
function floorX(xTop, y) {
  return 800 + (xTop - 800) * (1 + (0.5 * (y - FLOOR_TOP)) / (1200 - FLOOR_TOP));
}

function FloorTiles() {
  const rows = [44, 52, 62, 72, 84, 104];
  const tiles = [];
  let y0 = FLOOR_TOP;
  rows.forEach((h, r) => {
    const y1 = y0 + h;
    for (let c = 0, xt = -400; xt < 2000; xt += 120, c++) {
      const pts = [
        [floorX(xt, y0), y0],
        [floorX(xt + 120, y0), y0],
        [floorX(xt + 120, y1), y1],
        [floorX(xt, y1), y1],
      ]
        .map((p) => p.map((v) => v.toFixed(1)).join(','))
        .join(' ');
      tiles.push(
        <polygon key={`t${r}-${c}`} points={pts} fill={(r + c) % 2 ? '#d3dfeb' : '#e0e9f2'} stroke="#b9c9da" strokeWidth="3" />,
      );
    }
    y0 = y1;
  });
  return <g>{tiles}</g>;
}

function Background() {
  return (
    <g>
      <defs>
        <linearGradient id="living-room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd59e" />
          <stop offset="1" stopColor="#ffebc9" />
        </linearGradient>
        <pattern id="living-room-stripes" width="84" height="84" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="42" height="84" fill="#ffffff" opacity="0.22" />
        </pattern>
      </defs>

      {/* wall */}
      <rect width="1600" height={FLOOR_TOP} fill="url(#living-room-wall)" />
      <rect width="1600" height={FLOOR_TOP} fill="url(#living-room-stripes)" />
      <rect width="1600" height="24" fill="#f4a95f" />

      {/* floor */}
      <rect y={FLOOR_TOP} width="1600" height={1200 - FLOOR_TOP} fill="#e0e9f2" />
      <FloorTiles />
      <rect y={FLOOR_TOP - 24} width="1600" height="26" fill="#fff6e8" />
      <rect y={FLOOR_TOP} width="1600" height="6" fill="#e7c08f" />

      {/* soft shadows on the floor */}
      <ellipse cx="170" cy="794" rx="155" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="380" cy="792" rx="62" ry="10" fill="#000" opacity="0.1" />
      <ellipse cx="725" cy="808" rx="290" ry="17" fill="#000" opacity="0.1" />
      <ellipse cx="1305" cy="794" rx="280" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="725" cy="1096" rx="250" ry="20" fill="#000" opacity="0.1" />

      {/* small round side table (between the bookshelf and the sofa) */}
      <rect x="372" y="660" width="16" height="114" rx="4" fill="#b8763d" />
      <ellipse cx="380" cy="778" rx="42" ry="10" fill="#b8763d" stroke="#8f5528" strokeWidth="3" />
      <rect x="318" y="644" width="124" height="18" rx="9" fill="#e3a065" stroke="#8f5528" strokeWidth="4" />

      {/* long low TV cabinet */}
      <rect x="1066" y="760" width="18" height="30" rx="4" fill="#8f5528" />
      <rect x="1526" y="760" width="18" height="30" rx="4" fill="#8f5528" />
      <rect x="1052" y="648" width="506" height="118" rx="8" fill="#eaa968" stroke="#b5733a" strokeWidth="4" />
      <line x1="1220" y1="652" x2="1220" y2="762" stroke="#b5733a" strokeWidth="4" />
      <line x1="1390" y1="652" x2="1390" y2="762" stroke="#b5733a" strokeWidth="4" />
      <rect x="1072" y="668" width="128" height="78" rx="6" fill="none" stroke="#f6c896" strokeWidth="4" />
      <rect x="1240" y="668" width="130" height="78" rx="6" fill="none" stroke="#f6c896" strokeWidth="4" />
      <rect x="1410" y="668" width="128" height="78" rx="6" fill="none" stroke="#f6c896" strokeWidth="4" />
      <circle cx="1190" cy="707" r="7" fill="#fff3d6" />
      <circle cx="1250" cy="707" r="7" fill="#fff3d6" />
      <circle cx="1420" cy="707" r="7" fill="#fff3d6" />
      <rect x="1040" y="632" width="530" height="20" rx="8" fill="#e3a065" stroke="#b5733a" strokeWidth="4" />
    </g>
  );
}

function Sofa() {
  return (
    <g strokeLinejoin="round">
      {/* legs */}
      <rect x="-41" y="22" width="5" height="8" rx="1.5" fill="#8a5a33" />
      <rect x="36" y="22" width="5" height="8" rx="1.5" fill="#8a5a33" />
      {/* backrest */}
      <rect x="-41" y="-29" width="82" height="36" rx="9" fill="#4a90e2" stroke="#2f6db5" strokeWidth="1.4" />
      <line x1="0" y1="-25" x2="0" y2="3" stroke="#2f6db5" strokeWidth="1.2" />
      <path d="M -34 -24 Q -20 -27 -6 -24" fill="none" stroke="#7db5f2" strokeWidth="2" strokeLinecap="round" />
      <path d="M 6 -24 Q 20 -27 34 -24" fill="none" stroke="#7db5f2" strokeWidth="2" strokeLinecap="round" />
      {/* seat */}
      <rect x="-39" y="1" width="78" height="12" rx="4" fill="#6aa8f0" stroke="#2f6db5" strokeWidth="1.2" />
      <line x1="0" y1="2" x2="0" y2="12" stroke="#2f6db5" strokeWidth="1" />
      {/* base */}
      <rect x="-42" y="11" width="84" height="13" rx="4" fill="#3f7fd0" stroke="#2f6db5" strokeWidth="1.4" />
      {/* arms */}
      <rect x="-50" y="-11" width="14" height="35" rx="6" fill="#5b9ce8" stroke="#2f6db5" strokeWidth="1.4" />
      <rect x="36" y="-11" width="14" height="35" rx="6" fill="#5b9ce8" stroke="#2f6db5" strokeWidth="1.4" />
      <ellipse cx="-43" cy="-7" rx="4.5" ry="1.8" fill="#8cc0f5" />
      <ellipse cx="43" cy="-7" rx="4.5" ry="1.8" fill="#8cc0f5" />
    </g>
  );
}

function Cushion() {
  return (
    <g strokeLinejoin="round">
      <path
        d="M -38 -36 Q 0 -28 38 -36 Q 30 0 38 36 Q 0 28 -38 36 Q -30 0 -38 -36 Z"
        fill="#ff5a5f"
        stroke="#c9363c"
        strokeWidth="3"
      />
      <path d="M -26 -24 Q 0 -19 26 -24" fill="none" stroke="#ff8a8e" strokeWidth="3" strokeLinecap="round" />
      <path d="M 0 16 C -24 2 -18 -18 0 -8 C 18 -18 24 2 0 16 Z" fill="#ffffff" />
    </g>
  );
}

function Window() {
  return (
    <g strokeLinejoin="round">
      <rect x="-37" y="-41" width="74" height="76" rx="4" fill="#ffffff" />
      <rect x="-33" y="-37" width="66" height="68" rx="2" fill="#9fdcff" />
      <circle cx="-17" cy="-22" r="8" fill="#ffd23f" />
      <g fill="#ffffff">
        <circle cx="10" cy="-25" r="4.5" />
        <circle cx="16" cy="-28" r="6" />
        <circle cx="22" cy="-25" r="4.5" />
        <rect x="10" y="-25" width="12" height="4.5" />
      </g>
      <path d="M -33 31 L -33 19 Q -12 9 8 17 Q 22 11 33 15 L 33 31 Z" fill="#7ed957" />
      {/* coconut palm outside */}
      <path d="M 20 22 Q 23 8 17 -6" fill="none" stroke="#a0613a" strokeWidth="3" strokeLinecap="round" />
      <g fill="none" stroke="#3fae4f" strokeWidth="3" strokeLinecap="round">
        <path d="M 17 -6 Q 8 -12 3 -5" />
        <path d="M 17 -6 Q 26 -12 31 -5" />
        <path d="M 17 -6 Q 12 -14 6 -14" />
        <path d="M 17 -6 Q 22 -14 28 -14" />
      </g>
      <rect x="-1.5" y="-37" width="3" height="68" fill="#ffffff" />
      <rect x="-33" y="-4" width="66" height="3" fill="#ffffff" />
      <rect x="-43" y="33" width="86" height="6" rx="2" fill="#fff6e8" stroke="#e0b787" strokeWidth="1" />
      <rect x="-51" y="-47" width="102" height="4" rx="2" fill="#a0613a" />
      {/* curtains, tied back */}
      <path
        d="M -51 -44 Q -40 -18 -47 6 Q -42 20 -51 33 L -36 33 Q -32 20 -38 6 Q -31 -18 -36 -44 Z"
        fill="#7bc96f"
        stroke="#4c9a43"
        strokeWidth="1"
      />
      <path
        d="M 51 -44 Q 40 -18 47 6 Q 42 20 51 33 L 36 33 Q 32 20 38 6 Q 31 -18 36 -44 Z"
        fill="#7bc96f"
        stroke="#4c9a43"
        strokeWidth="1"
      />
      <ellipse cx="-42.5" cy="6" rx="6" ry="2.4" fill="#ffd23f" stroke="#e0a800" strokeWidth="0.8" />
      <ellipse cx="42.5" cy="6" rx="6" ry="2.4" fill="#ffd23f" stroke="#e0a800" strokeWidth="0.8" />
    </g>
  );
}

function Flower({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={(Math.sin((a * Math.PI) / 180) * 5.5).toFixed(2)} cy={(-Math.cos((a * Math.PI) / 180) * 5.5).toFixed(2)} r="5" fill={color} />
      ))}
      <circle r="3.6" fill="#ffd23f" stroke="#e0a800" strokeWidth="0.8" />
    </g>
  );
}

function FlowerVase() {
  return (
    <g strokeLinejoin="round">
      <g fill="none" stroke="#3fae4f" strokeWidth="2.6" strokeLinecap="round">
        <path d="M 0 8 Q -6 -8 -20 -20" />
        <path d="M 0 8 Q 0 -14 0 -32" />
        <path d="M 0 8 Q 6 -8 20 -20" />
        <path d="M 0 8 Q -10 -2 -27 -2" />
        <path d="M 0 8 Q 10 -2 27 -3" />
      </g>
      <g fill="#5cc548" stroke="#3fae4f" strokeWidth="0.8">
        <ellipse cx="-9" cy="-6" rx="6" ry="2.6" transform="rotate(35 -9 -6)" />
        <ellipse cx="9" cy="-8" rx="6" ry="2.6" transform="rotate(-35 9 -8)" />
      </g>
      <Flower x={-27} y={-2} color="#ffa94d" />
      <Flower x={27} y={-3} color="#b57bff" />
      <Flower x={-20} y={-20} color="#ff5a5f" />
      <Flower x={20} y={-20} color="#ff8fc8" />
      <Flower x={0} y={-32} color="#ff5a5f" />
      <path d="M -12 8 Q -21 26 -14 44 L 14 44 Q 21 26 12 8 Z" fill="#5aa9ff" stroke="#2f7fd0" strokeWidth="2" />
      <rect x="-14" y="4" width="28" height="6" rx="3" fill="#7fc0ff" stroke="#2f7fd0" strokeWidth="2" />
      <path d="M -16.5 26 Q 0 30 16.5 26" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M -9 15 Q -13 24 -10 36" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

function Bookshelf() {
  return (
    <g strokeLinejoin="round">
      <rect x="-26" y="44" width="52" height="6" rx="1.5" fill="#a3632f" />
      <rect x="-27" y="-48" width="54" height="94" rx="2.5" fill="#e0a05c" stroke="#b5733a" strokeWidth="1.2" />
      <rect x="-29" y="-51" width="58" height="5" rx="2" fill="#c98546" stroke="#b5733a" strokeWidth="1" />
      {/* open shelves */}
      <rect x="-23" y="-44" width="46" height="27" rx="1.5" fill="#b9733d" />
      <rect x="-23" y="-13" width="46" height="27" rx="1.5" fill="#b9733d" />
      <rect x="-23" y="-20" width="46" height="3" fill="#a3632f" opacity="0.5" />
      <rect x="-23" y="11" width="46" height="3" fill="#a3632f" opacity="0.5" />
      {/* a row of upright books on the top shelf (part of the "books" tap area) */}
      <g stroke="#7a4a22" strokeWidth="0.6">
        <rect x="-21" y="-38" width="3.4" height="21" rx="0.6" fill="#ff5a5f" />
        <rect x="-17.4" y="-36" width="3" height="19" rx="0.6" fill="#ffd23f" />
        <rect x="-14.2" y="-39" width="3.6" height="22" rx="0.6" fill="#5aa9ff" />
        <rect x="-10.4" y="-35" width="3" height="18" rx="0.6" fill="#7ed957" />
        <rect x="-7.2" y="-37" width="3.4" height="20" rx="0.6" fill="#b57bff" />
        <rect x="-5.5" y="-34.5" width="3" height="18" rx="0.6" fill="#ffa94d" transform="rotate(14 -4 -17)" />
      </g>
      <g fill="#ffffff" opacity="0.7">
        <rect x="-20.4" y="-33" width="2.2" height="1" />
        <rect x="-13.6" y="-34" width="2.4" height="1" />
        <rect x="-6.6" y="-32" width="2.2" height="1" />
      </g>
      {/* cupboard doors */}
      <rect x="-23" y="18" width="22.5" height="24" rx="1.5" fill="#eaa968" stroke="#b5733a" strokeWidth="1" />
      <rect x="0.5" y="18" width="22.5" height="24" rx="1.5" fill="#eaa968" stroke="#b5733a" strokeWidth="1" />
      <circle cx="-3.5" cy="30" r="1.4" fill="#fff3d6" />
      <circle cx="3.5" cy="30" r="1.4" fill="#fff3d6" />
    </g>
  );
}

function CeilingFan() {
  const blade = 'M 9 -6 Q 30 -10 49 -7 Q 54 0 49 7 Q 30 10 9 6 Z';
  return (
    <g strokeLinejoin="round">
      <rect x="-9" y="-56" width="18" height="6" rx="2" fill="#8795a3" />
      <rect x="-2.5" y="-51" width="5" height="34" fill="#a7b3bf" />
      {/* motion lines */}
      <g fill="none" stroke="#b08a66" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M -52 -17 Q -46 -24 -34 -26" />
        <path d="M 52 1 Q 46 8 34 10" />
      </g>
      <g transform="translate(0 -8) scale(1 0.34)">
        {[15, 105, 195, 285].map((a) => (
          <path key={a} d={blade} transform={`rotate(${a})`} fill="#c98b52" stroke="#9c6534" strokeWidth="3.5" />
        ))}
      </g>
      <path d="M -11 -19 L 11 -19 Q 13 -11 10 -6 L -10 -6 Q -13 -11 -11 -19 Z" fill="#e6ebf0" stroke="#8795a3" strokeWidth="1.5" />
      <path d="M -10 -5 Q 0 11 10 -5 Z" fill="#fff4b8" stroke="#e0c35a" strokeWidth="1.5" />
    </g>
  );
}

function FamilyPhoto() {
  return (
    <g strokeLinejoin="round">
      <path d="M -22 -34 L 0 -45 L 22 -34" fill="none" stroke="#8a5a33" strokeWidth="1.5" />
      <circle cx="0" cy="-45" r="2" fill="#8a5a33" />
      <rect x="-35" y="-27" width="70" height="54" fill="#c7ecff" />
      <path d="M -35 27 L -35 12 Q 0 6 35 12 L 35 27 Z" fill="#9ee07a" />
      {/* mum */}
      <path d="M -27 6 Q -29 -19 -17 -18 Q -6 -19 -8 6 Z" fill="#3b2a20" />
      <path d="M -30 27 Q -30 3 -17 2 Q -4 3 -4 27 Z" fill="#ff8fab" />
      <circle cx="-17" cy="-8" r="7.5" fill="#e8b07f" />
      <path d="M -24.5 -9 Q -23 -17 -17 -16.5 Q -11 -17 -9.5 -9 Q -13 -13 -17 -12.5 Q -21 -13 -24.5 -9 Z" fill="#3b2a20" />
      {/* dad */}
      <path d="M 4 27 Q 4 0 18 -1 Q 32 0 32 27 Z" fill="#4a90e2" />
      <circle cx="18" cy="-11" r="8" fill="#d9a06c" />
      <path d="M 10 -12 Q 10 -21 18 -20.5 Q 26 -21 26 -12 Q 22 -16 18 -15.5 Q 13 -16 10 -12 Z" fill="#2a1d16" />
      {/* child in front */}
      <path d="M -10 27 Q -10 13 0 12 Q 10 13 10 27 Z" fill="#ffd23f" />
      <circle cx="0" cy="4" r="6.5" fill="#e8b07f" />
      <path d="M -6.5 3 Q -6.5 -3.5 0 -3 Q 6.5 -3.5 6.5 3 Q 3 0 0 0.5 Q -3 0 -6.5 3 Z" fill="#3b2a20" />
      {/* faces */}
      <g fill="#3b2a20">
        <circle cx="-19.5" cy="-8" r="0.9" />
        <circle cx="-14.5" cy="-8" r="0.9" />
        <circle cx="15.5" cy="-11" r="0.9" />
        <circle cx="20.5" cy="-11" r="0.9" />
        <circle cx="-2.2" cy="4.5" r="0.8" />
        <circle cx="2.2" cy="4.5" r="0.8" />
      </g>
      <g fill="none" stroke="#9c4a3a" strokeWidth="0.9" strokeLinecap="round">
        <path d="M -19.5 -5 Q -17 -3 -14.5 -5" />
        <path d="M 15.5 -8 Q 18 -6 20.5 -8" />
        <path d="M -2 7 Q 0 8.6 2 7" />
      </g>
      {/* frame */}
      <rect x="-38.5" y="-30.5" width="77" height="61" rx="3" fill="none" stroke="#d08b4f" strokeWidth="7" />
      <rect x="-42" y="-34" width="84" height="68" rx="4" fill="none" stroke="#8f5528" strokeWidth="1.2" />
      <rect x="-35" y="-27" width="70" height="54" fill="none" stroke="#8f5528" strokeWidth="1" />
    </g>
  );
}

function WallClock() {
  const ticks = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const big = i % 3 === 0;
    const r1 = big ? 26 : 29;
    ticks.push(
      <line
        key={i}
        x1={(Math.sin(a) * r1).toFixed(2)}
        y1={(-Math.cos(a) * r1).toFixed(2)}
        x2={(Math.sin(a) * 33).toFixed(2)}
        y2={(-Math.cos(a) * 33).toFixed(2)}
        stroke="#5b6573"
        strokeWidth={big ? 3.2 : 2}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <g strokeLinejoin="round">
      <circle r="45" fill="#2ec4b6" stroke="#1f9a8f" strokeWidth="2" />
      <circle r="38" fill="#ffffff" stroke="#1f9a8f" strokeWidth="1.5" />
      {ticks}
      <line x1="0" y1="0" x2="-14" y2="-8" stroke="#3d4652" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="0" y1="0" x2="14" y2="-21" stroke="#3d4652" strokeWidth="3" strokeLinecap="round" />
      <circle r="3.5" fill="#ff5a5f" />
    </g>
  );
}

function Television() {
  const rainbow = ['#ff5a5f', '#ffa94d', '#ffe066', '#7ed957', '#5aa9ff'];
  return (
    <g strokeLinejoin="round">
      <rect x="-6" y="28" width="12" height="8" fill="#3d4652" />
      <rect x="-22" y="34" width="44" height="5" rx="2.5" fill="#3d4652" />
      <rect x="-48" y="-32" width="96" height="62" rx="5" fill="#2b313a" stroke="#1a1f26" strokeWidth="1.5" />
      <rect x="-43" y="-27" width="86" height="51" rx="2" fill="#8fd8ff" />
      <g fill="none" strokeWidth="3.6">
        {rainbow.map((c, i) => {
          const r = 30 - i * 3.6;
          return <path key={c} d={`M ${-6 - r} 20 A ${r} ${r} 0 0 1 ${-6 + r} 20`} stroke={c} />;
        })}
      </g>
      <circle cx="28" cy="-14" r="6" fill="#ffd23f" />
      <path d="M -43 24 L -43 12 Q -20 2 2 12 Q 22 4 43 10 L 43 24 Z" fill="#7ed957" />
      <path d="M -43 24 L -43 18 Q -10 12 20 17 Q 34 14 43 17 L 43 24 Z" fill="#5cc548" />
      <path d="M -40 -24 L -26 -24 L -40 4 Z" fill="#ffffff" opacity="0.28" />
      <circle cx="40" cy="27" r="1.4" fill="#7ed957" />
    </g>
  );
}

function FishTank() {
  return (
    <g strokeLinejoin="round">
      <rect x="-46" y="26" width="92" height="8" rx="2" fill="#3d4652" />
      <rect x="-44" y="-26" width="88" height="54" rx="3" fill="#d8f4ff" stroke="#6cb6d9" strokeWidth="1.5" />
      <rect x="-42" y="-18" width="84" height="44" rx="1" fill="#5cc8f0" />
      <path d="M -42 -18 L 42 -18" stroke="#9fe3ff" strokeWidth="1.5" />
      <path d="M -42 26 L -42 19 Q -20 14 0 18 Q 20 22 42 16 L 42 26 Z" fill="#f5d98b" />
      <g fill="#ffffff" opacity="0.85">
        <circle cx="-10" cy="22" r="1.8" />
        <circle cx="-3" cy="23" r="1.4" />
        <circle cx="12" cy="22.5" r="1.8" />
      </g>
      <g fill="none" stroke="#3fae4f" strokeWidth="3" strokeLinecap="round">
        <path d="M 28 19 Q 23 9 29 1 Q 34 -6 28 -11" />
        <path d="M 36 18 Q 40 10 35 3 Q 31 -3 36 -7" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="1.2">
        <circle cx="8" cy="-2" r="2.4" />
        <circle cx="12" cy="-10" r="1.8" />
        <circle cx="7" cy="-14" r="1.3" />
      </g>
      <rect x="-38" y="-14" width="5" height="30" rx="2" fill="#ffffff" opacity="0.3" />
      <rect x="-46" y="-30" width="92" height="6" rx="2" fill="#3d4652" />
    </g>
  );
}

function CoffeeTable() {
  return (
    <g strokeLinejoin="round">
      <rect x="-40" y="-6" width="7" height="33" rx="2" fill="#b8763d" stroke="#8f5528" strokeWidth="1" />
      <rect x="33" y="-6" width="7" height="33" rx="2" fill="#b8763d" stroke="#8f5528" strokeWidth="1" />
      <rect x="-37" y="14" width="74" height="4" rx="1.5" fill="#c98546" stroke="#8f5528" strokeWidth="0.8" />
      <rect x="-44" y="-10" width="88" height="8" rx="2" fill="#d08b4f" stroke="#8f5528" strokeWidth="1" />
      <rect x="-49" y="-19" width="98" height="10" rx="4" fill="#e3a065" stroke="#8f5528" strokeWidth="1.2" />
      <rect x="-45" y="-17" width="30" height="2.2" rx="1" fill="#f3c08c" />
      {/* lace table runner hanging over the front */}
      <path
        d="M -14 -19 L 14 -19 L 14 -4 Q 11.7 -1 9.3 -4 Q 7 -1 4.7 -4 Q 2.3 -1 0 -4 Q -2.3 -1 -4.7 -4 Q -7 -1 -9.3 -4 Q -11.7 -1 -14 -4 Z"
        fill="#ffffff"
        stroke="#e6d3bd"
        strokeWidth="0.8"
      />
      <g fill="#f1e2cf">
        <circle cx="-7" cy="-11" r="1.3" />
        <circle cx="0" cy="-11" r="1.3" />
        <circle cx="7" cy="-11" r="1.3" />
      </g>
    </g>
  );
}

function RemoteControl() {
  const dots = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={-7 + c * 7} cy={8 + r * 9} r="2.6" fill="#d6dde5" />);
    }
  }
  return (
    <g strokeLinejoin="round">
      <rect x="-15" y="-46" width="30" height="92" rx="11" fill="#3d4652" stroke="#1f252d" strokeWidth="2" />
      <rect x="-11" y="-42" width="7" height="50" rx="3.5" fill="#ffffff" opacity="0.14" />
      <circle cx="0" cy="-33" r="5.5" fill="#ff5a5f" stroke="#c9363c" strokeWidth="1" />
      <circle cx="0" cy="-12" r="10" fill="#5d6876" />
      <circle cx="0" cy="-12" r="4" fill="#d6dde5" />
      {dots}
      <circle cx="-7" cy="38" r="2.4" fill="#ffd23f" />
      <circle cx="0" cy="38" r="2.4" fill="#7ed957" />
      <circle cx="7" cy="38" r="2.4" fill="#5aa9ff" />
    </g>
  );
}

const livingRoom = {
  id: 'living-room',
  title: 'Living Room',
  titleId: 'Ruang Tamu',
  icon: '🛋️',
  Background,
  objects: [
    // --- big furniture ---
    {
      id: 'sofa', word: 'sofa', wordId: 'sofa', art: Sofa, x: 725, y: 640, size: 550, hit: { w: 540, h: 300, dy: 5 },
      sentence: 'We sit on the sofa together.', sentenceId: 'Kita duduk bersama di sofa.',
      question: 'What color is the sofa?', questionId: 'Sofanya warna apa?',
      answer: 'The sofa is blue.', answerId: 'Sofanya biru.',
    },
    {
      id: 'cushion', word: 'cushion', wordId: 'bantal sofa', art: Cushion, x: 585, y: 602, size: 130, rotate: -10,
      sentence: 'The red cushion has a heart.', sentenceId: 'Bantal merahnya ada gambar hati.',
      question: 'Is the cushion soft or hard?', questionId: 'Bantalnya empuk atau keras?',
      answer: 'The cushion is soft.', answerId: 'Bantalnya empuk.',
    },
    {
      id: 'window', word: 'window', wordId: 'jendela', art: Window, x: 725, y: 300, size: 380, hit: { w: 370, h: 300, dy: -6 },
      sentence: 'The sun shines through the window.', sentenceId: 'Matahari bersinar lewat jendela.',
      question: 'Is it day or night?', questionId: 'Sekarang siang atau malam?',
      answer: 'It is day!', answerId: 'Sekarang siang!',
    },
    {
      id: 'flowers', word: 'flowers', wordId: 'bunga', art: FlowerVase, x: 640, y: 363, size: 140,
      sentence: 'The flowers smell nice.', sentenceId: 'Bunganya harum.',
      question: 'Can you smell the flowers?', questionId: 'Bisa cium bunganya?',
      answer: 'Mmm! They smell nice!', answerId: 'Hmm! Wangi sekali!',
    },
    {
      id: 'bookshelf', word: 'bookshelf', wordId: 'rak buku', art: Bookshelf, x: 170, y: 530, size: 520, hit: { w: 280, h: 520 },
      sentence: 'The bookshelf is very tall.', sentenceId: 'Rak bukunya tinggi sekali.',
      question: 'Can you reach the top?', questionId: 'Bisa sampai ke atas?',
      answer: 'No, it is too high!', answerId: 'Tidak, terlalu tinggi!',
    },
    {
      id: 'books', word: 'books', wordId: 'buku-buku', emoji: '📚', x: 220, y: 394, size: 115, hit: { w: 236, h: 140, dx: -50, dy: -17 },
      sentence: 'We read books together.', sentenceId: 'Kita membaca buku bersama.',
      question: 'Do you like story books?', questionId: 'Kamu suka buku cerita?',
      answer: 'Yes, I love stories!', answerId: 'Ya, aku suka sekali cerita!',
    },
    {
      id: 'radio', word: 'radio', wordId: 'radio', emoji: '📻', x: 112, y: 557, size: 105,
      sentence: 'The radio plays music.', sentenceId: 'Radionya memutar musik.',
      question: 'Can you dance to the music?', questionId: 'Bisa joget ikut musiknya?',
      answer: 'Yes! Look, I can dance!', answerId: 'Bisa! Lihat, aku bisa joget!',
    },
    {
      id: 'parrot', word: 'parrot', wordId: 'burung nuri', emoji: '🦜', x: 150, y: 212, size: 120,
      sentence: 'The parrot can talk!', sentenceId: 'Burung nurinya bisa bicara!',
      question: 'Can you say hello like a parrot?', questionId: 'Bisa bilang halo seperti burung nuri?',
      answer: 'Hello! Hello!', answerId: 'Halo! Halo!',
    },
    {
      id: 'telephone', word: 'telephone', wordId: 'telepon', emoji: '☎️', x: 380, y: 604, size: 100,
      sentence: 'The telephone goes ring-ring!', sentenceId: 'Teleponnya berbunyi kring-kring!',
      question: 'Can you call Grandma?', questionId: 'Bisa telepon Nenek?',
      answer: 'Hello, Grandma!', answerId: 'Halo, Nenek!',
    },

    // --- on the wall / ceiling ---
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 420, y: 165, size: 130, rotate: -6,
      sentence: 'The balloon floats up high.', sentenceId: 'Balonnya melayang tinggi.',
      question: 'What color is the balloon?', questionId: 'Balonnya warna apa?',
      answer: 'The balloon is red.', answerId: 'Balonnya merah.',
    },
    {
      id: 'fan', word: 'fan', wordId: 'kipas angin', art: CeilingFan, x: 1040, y: 125, size: 260, hit: { w: 270, h: 150, dy: -10 },
      sentence: 'The fan goes round and round.', sentenceId: 'Kipas anginnya berputar-putar.',
      question: 'Is it hot or cold today?', questionId: 'Hari ini panas atau dingin?',
      answer: 'It is hot today!', answerId: 'Hari ini panas!',
    },
    {
      id: 'photo', word: 'photo', wordId: 'foto', art: FamilyPhoto, x: 1290, y: 300, size: 220,
      sentence: 'This is our family photo.', sentenceId: 'Ini foto keluarga kita.',
      question: 'Who is in the photo?', questionId: 'Siapa saja di foto itu?',
      answer: 'Mommy, Daddy, and me!', answerId: 'Mama, Papa, dan aku!',
    },
    {
      id: 'clock', word: 'clock', wordId: 'jam dinding', art: WallClock, x: 1490, y: 175, size: 150,
      sentence: 'The clock tells the time.', sentenceId: 'Jam dinding memberi tahu waktu.',
      question: 'Is it time to play?', questionId: 'Sudah waktunya main?',
      answer: 'Yes! It is play time!', answerId: 'Ya! Waktunya main!',
    },

    // --- TV cabinet ---
    {
      id: 'tv', word: 'television', wordId: 'televisi', art: Television, x: 1185, y: 537, size: 260, hit: { w: 250, h: 180, dy: -6 },
      sentence: 'We watch cartoons on television.', sentenceId: 'Kita nonton kartun di televisi.',
      question: 'Do you like cartoons?', questionId: 'Kamu suka kartun?',
      answer: 'Yes, I love cartoons!', answerId: 'Ya, aku suka sekali kartun!',
    },
    {
      id: 'fishtank', word: 'fish tank', wordId: 'akuarium', art: FishTank, x: 1450, y: 560, size: 230, hit: { w: 215, h: 150, dx: 12 },
      sentence: 'The fish lives in the fish tank.', sentenceId: 'Ikannya tinggal di akuarium.',
      question: 'Can you see the bubbles?', questionId: 'Kamu bisa lihat gelembungnya?',
      answer: 'Yes, I see bubbles!', answerId: 'Ya, aku lihat gelembung!',
    },
    {
      id: 'fish', word: 'fish', wordId: 'ikan', emoji: '🐠', x: 1395, y: 555, size: 80,
      sentence: 'The fish can swim.', sentenceId: 'Ikannya bisa berenang.',
      question: 'Can you swim like a fish?', questionId: 'Bisa berenang seperti ikan?',
      answer: 'Yes! Swish, swish!', answerId: 'Bisa! Wus, wus!',
    },

    // --- coffee table ---
    {
      id: 'table', word: 'table', wordId: 'meja', art: CoffeeTable, x: 725, y: 1000, size: 470, hit: { w: 460, h: 210, dy: 15 },
      sentence: 'We have snacks at the table.', sentenceId: 'Kita makan camilan di meja.',
      question: 'What is on the table?', questionId: 'Ada apa di atas meja?',
      answer: 'A cup and a cookie.', answerId: 'Ada cangkir dan kue.',
    },
    {
      id: 'cup', word: 'cup', wordId: 'cangkir', emoji: '☕', x: 640, y: 882, size: 95,
      sentence: 'Careful, the cup is hot!', sentenceId: 'Hati-hati, cangkirnya panas!',
      question: 'Is the cup hot or cold?', questionId: 'Cangkirnya panas atau dingin?',
      answer: 'The cup is hot.', answerId: 'Cangkirnya panas.',
    },
    {
      id: 'cookie', word: 'cookie', wordId: 'kue kering', emoji: '🍪', x: 795, y: 884, size: 85,
      sentence: 'The cookie is yummy!', sentenceId: 'Kue keringnya enak!',
      question: 'Do you like cookies?', questionId: 'Kamu suka kue kering?',
      answer: 'Yes, I love cookies!', answerId: 'Ya, aku suka sekali kue kering!',
    },
    {
      id: 'remote', word: 'remote control', wordId: 'remot', art: RemoteControl, x: 872, y: 640, size: 110, rotate: -70,
      sentence: 'Press the button. Click!', sentenceId: 'Tekan tombolnya. Klik!',
      question: 'Can you press a button?', questionId: 'Bisa tekan tombolnya?',
      answer: 'Yes! Click, click!', answerId: 'Bisa! Klik, klik!',
    },

    // --- on the floor ---
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 1215, y: 965, size: 190,
      sentence: 'The dog says woof!', sentenceId: 'Anjingnya menggonggong guk-guk!',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof! Woof!', answerId: 'Guk! Guk!',
    },
    {
      id: 'guitar', word: 'guitar', wordId: 'gitar', emoji: '🎸', x: 255, y: 965, size: 175,
      sentence: 'I can play the guitar.', sentenceId: 'Aku bisa main gitar.',
      question: 'Can you sing a song?', questionId: 'Bisa nyanyi lagu?',
      answer: 'Yes! La la la!', answerId: 'Bisa! La la la!',
    },
    {
      id: 'sandal', word: 'sandal', wordId: 'sandal', emoji: '🩴', x: 110, y: 1115, size: 100, rotate: -15,
      sentence: 'The sandal goes flip-flop!', sentenceId: 'Sandalnya bunyi plak-plok!',
      question: 'Do you have sandals?', questionId: 'Kamu punya sandal?',
      answer: 'Yes, I have sandals!', answerId: 'Ya, aku punya sandal!',
    },
    {
      id: 'drum', word: 'drum', wordId: 'drum', emoji: '🥁', x: 1478, y: 1080, size: 130,
      sentence: 'The drum goes boom-boom!', sentenceId: 'Drumnya berbunyi dum-dum!',
      question: 'Can you play the drum?', questionId: 'Bisa main drum?',
      answer: 'Yes! Boom, boom, boom!', answerId: 'Bisa! Dum, dum, dum!',
    },
  ],
};

export default livingRoom;

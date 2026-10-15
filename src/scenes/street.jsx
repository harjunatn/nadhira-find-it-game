// Busy Street scene. Coordinates are in a 1600 x 1200 picture.
// Object art (`art`) is drawn in a 100 x 100 box centred on (0, 0) and scaled by size / 100.
// Cars drive on the LEFT (Indonesia): the far lane goes right, the near lane goes left.

const ROAD = '#6b7484';
const KERB_DARK = '#2f3542';

// Layout lines (picture units).
const SHOP_BASE = 650; // bottom of the shop fronts
const ROAD_TOP = 742; // below the back kerb
const ROAD_BOT = 1000; // above the front kerb
const LANE_Y = 871;

const FAR_BUILDINGS = [
  { x: 20, w: 170, top: 230 },
  { x: 200, w: 150, top: 150 },
  { x: 520, w: 190, top: 250 },
  { x: 730, w: 150, top: 120 },
  { x: 900, w: 200, top: 210 },
  { x: 1150, w: 160, top: 160 },
  { x: 1330, w: 200, top: 240 },
];

const SHOPS = [
  { x: 0, w: 250, top: 400, fill: '#ffd6a5', edge: '#e9a96b' },
  { x: 250, w: 360, top: 370, fill: '#e2d4f0', edge: '#b39ad1' },
  { x: 610, w: 230, top: 390, fill: '#fff1a8', edge: '#e2c95b' },
  { x: 840, w: 250, top: 330, fill: '#cfe8ff', edge: '#8dbbe6' },
  { x: 1090, w: 220, top: 410, fill: '#ffd1e0', edge: '#e79ab8' },
  { x: 1310, w: 290, top: 370, fill: '#d4f7cc', edge: '#94d68a' },
];

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity="0.92">
      <ellipse cx="0" cy="12" rx="70" ry="22" />
      <circle cx="-28" cy="0" r="28" />
      <circle cx="10" cy="-12" r="36" />
      <circle cx="42" cy="4" r="24" />
    </g>
  );
}

function Shop({ x, w, top, fill, edge, i }) {
  const windows = [];
  const cols = Math.max(1, Math.floor((w - 40) / 90));
  const gap = (w - cols * 54) / (cols + 1);
  for (let row = 0, wy = top + 40; wy + 64 < 545; row++, wy += 92) {
    for (let c = 0; c < cols; c++) {
      const wx = x + gap + c * (54 + gap);
      windows.push(
        <g key={`w${i}-${row}-${c}`}>
          <rect x={wx} y={wy} width="54" height="64" rx="8" fill="#ffffff" />
          <rect x={wx + 5} y={wy + 5} width="44" height="54" rx="5" fill="#d9f1ff" />
          <rect x={wx + 25.5} y={wy + 5} width="3" height="54" fill="#ffffff" />
          <rect x={wx + 4} y={wy + 62} width="46" height="6" rx="3" fill={edge} opacity="0.7" />
        </g>,
      );
    }
  }
  return (
    <g>
      <rect x={x} y={top} width={w} height={SHOP_BASE - top} fill={fill} />
      <rect x={x} y={top} width={w} height="16" fill={edge} opacity="0.75" />
      <rect x={x} y={top} width="5" height={SHOP_BASE - top} fill={edge} opacity="0.5" />
      {windows}
      {/* shop front: a big window and a door */}
      <rect x={x + 22} y="575" width={w - 120} height="62" rx="6" fill="#e9f7ff" stroke={edge} strokeWidth="5" />
      <rect x={x + w - 82} y="566" width="56" height="84" rx="6" fill={edge} />
      <rect x={x + w - 75} y="574" width="42" height="76" rx="4" fill="#ffffff" opacity="0.35" />
      <circle cx={x + w - 40} cy="612" r="4" fill="#ffffff" />
    </g>
  );
}

function Background() {
  const kerb = (y, key) => {
    const blocks = [];
    for (let x = 0, i = 0; x < 1600; x += 40, i++) {
      blocks.push(<rect key={`${key}${i}`} x={x} y={y} width="40" height="14" fill={i % 2 ? KERB_DARK : '#ffffff'} />);
    }
    return blocks;
  };
  const tiles = [];
  for (let x = 40; x < 1600; x += 80) {
    tiles.push(<line key={`bt${x}`} x1={x} x2={x - 10} y1={SHOP_BASE} y2="728" stroke="#d8c6a6" strokeWidth="3" />);
    tiles.push(<line key={`ft${x}`} x1={x} x2={x + 16} y1="1014" y2="1200" stroke="#d8c6a6" strokeWidth="3" />);
  }
  const dashes = [];
  for (let x = 20; x < 1600; x += 150) {
    if (x + 80 > 880 && x < 1080) continue; // no lane line on the zebra crossing
    dashes.push(<rect key={`d${x}`} x={x} y={LANE_Y - 5} width="80" height="10" rx="5" fill="#ffffff" opacity="0.9" />);
  }
  const shadow = (cx, cy, rx, ry = 12, o = 0.16) => <ellipse key={`sh${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill="#000" opacity={o} />;

  return (
    <g>
      <defs>
        <linearGradient id="street-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3ff" />
          <stop offset="1" stopColor="#e3f6ff" />
        </linearGradient>
        <pattern id="street-farwin" width="34" height="40" patternUnits="userSpaceOnUse">
          <rect x="9" y="10" width="16" height="20" rx="3" fill="#ffffff" opacity="0.55" />
        </pattern>
      </defs>

      {/* sky */}
      <rect width="1600" height={SHOP_BASE} fill="url(#street-sky)" />
      <Cloud x={560} y={90} s={1} />
      <Cloud x={1060} y={70} s={0.8} />
      <Cloud x={1300} y={170} s={0.6} />

      {/* far buildings */}
      {FAR_BUILDINGS.map((b, i) => (
        <g key={`far${i}`}>
          <rect x={b.x} y={b.top} width={b.w} height={SHOP_BASE - b.top} rx="6" fill="#c3d3ee" />
          <rect x={b.x} y={b.top} width={b.w} height={SHOP_BASE - b.top} rx="6" fill="url(#street-farwin)" />
        </g>
      ))}

      {/* wire for the bird */}
      <path d="M -10 168 Q 310 220 640 176" fill="none" stroke="#4a4e69" strokeWidth="4" />

      {/* shops */}
      {SHOPS.map((s, i) => <Shop key={`shop${i}`} {...s} i={i} />)}

      {/* back pavement */}
      <rect y={SHOP_BASE} width="1600" height={728 - SHOP_BASE} fill="#f1e4cc" />
      {tiles.filter((t) => t.key.startsWith('bt'))}
      <rect y={SHOP_BASE} width="1600" height="6" fill="#d8c6a6" />
      {kerb(728, 'bk')}

      {/* road */}
      <rect y={ROAD_TOP} width="1600" height={ROAD_BOT - ROAD_TOP} fill={ROAD} />
      <rect y={ROAD_TOP} width="1600" height="10" fill="#000" opacity="0.12" />
      {dashes}

      {/* front pavement */}
      {kerb(ROAD_BOT, 'fk')}
      <rect y="1014" width="1600" height="186" fill="#f1e4cc" />
      {tiles.filter((t) => t.key.startsWith('ft'))}
      <line x1="0" x2="1600" y1="1105" y2="1105" stroke="#d8c6a6" strokeWidth="3" />

      {/* soft shadows */}
      {shadow(310, 702, 70, 10)}
      {shadow(1390, 690, 140, 10)}
      {shadow(880, 732, 30, 6)}
      {shadow(1180, 735, 30, 6)}
      {shadow(200, 860, 100)}
      {shadow(470, 858, 70)}
      {shadow(740, 860, 85)}
      {shadow(1350, 862, 125)}
      {shadow(170, 992, 70, 10)}
      {shadow(450, 994, 95, 10)}
      {shadow(690, 996, 40, 8)}
      {shadow(1180, 994, 85, 10)}
      {shadow(1450, 994, 95, 10)}
      {shadow(130, 1170, 70, 10)}
      {shadow(360, 1170, 60, 10)}
      {shadow(580, 1172, 45, 9)}
      {shadow(830, 1178, 45, 9)}
      {shadow(1240, 1172, 45, 9)}
      {shadow(1470, 1185, 80, 10)}
    </g>
  );
}

// ---------- object art ----------

function Bus() {
  return (
    <g strokeLinejoin="round">
      <rect x="-32" y="-33" width="42" height="7" rx="3" fill="#f1f3f5" stroke="#a4161a" strokeWidth="1.2" />
      <path d="M -48 -22 Q -48 -28 -42 -28 L 38 -28 Q 46 -28 47 -20 L 49 12 Q 49 20 42 20 L -42 20 Q -48 20 -48 14 Z" fill="#e63946" stroke="#a4161a" strokeWidth="1.6" />
      <rect x="-48" y="1" width="97" height="4" fill="#ffffff" />
      {[-43, -29, -15, -1].map((x) => (
        <g key={x}>
          <rect x={x} y="-23" width="12" height="16" rx="2.5" fill="#bde0fe" stroke="#a4161a" strokeWidth="1" />
          <path d={`M ${x + 2} -11 L ${x + 8} -21`} stroke="#ffffff" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
        </g>
      ))}
      <rect x="14" y="-23" width="13" height="38" rx="2" fill="#bde0fe" stroke="#a4161a" strokeWidth="1" />
      <line x1="20.5" y1="-23" x2="20.5" y2="15" stroke="#a4161a" strokeWidth="1" />
      <path d="M 31 -23 L 42 -23 Q 46 -22 46.5 -16 L 47 -4 L 31 -4 Z" fill="#bde0fe" stroke="#a4161a" strokeWidth="1" />
      <path d="M 34 -8 L 40 -20" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <rect x="-49" y="13" width="99" height="6" rx="3" fill="#495057" />
      <circle cx="46.5" cy="8" r="2.6" fill="#ffd23f" stroke="#c99f00" strokeWidth="0.8" />
      <rect x="-48.5" y="5" width="3" height="5" rx="1" fill="#ff8c42" />
      {[-30, 30].map((x) => (
        <g key={`w${x}`}>
          <circle cx={x} cy="20" r="9" fill="#2b2d42" />
          <circle cx={x} cy="20" r="3.8" fill="#ced4da" />
        </g>
      ))}
    </g>
  );
}

function BusStop() {
  return (
    <g strokeLinejoin="round">
      {/* sign */}
      <rect x="37" y="-36" width="4" height="86" rx="1.5" fill="#adb5bd" stroke="#6c757d" strokeWidth="1" />
      <circle cx="39" cy="-38" r="10.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
      <rect x="32.5" y="-44" width="13" height="9.5" rx="2" fill="#ffffff" />
      <rect x="34" y="-42.5" width="10" height="3.4" rx="0.8" fill="#1d4ed8" />
      <circle cx="35.5" cy="-33.8" r="1.7" fill="#ffffff" />
      <circle cx="42.5" cy="-33.8" r="1.7" fill="#ffffff" />
      {/* posts */}
      <rect x="-47" y="-31" width="4.5" height="81" fill="#8d99ae" stroke="#5c677d" strokeWidth="1" />
      <rect x="22.5" y="-31" width="4.5" height="81" fill="#8d99ae" stroke="#5c677d" strokeWidth="1" />
      {/* back glass */}
      <rect x="-42.5" y="-26" width="65" height="50" fill="#caf0f8" stroke="#7fb3c8" strokeWidth="1.2" />
      <path d="M -36 10 L -20 -20 M -28 14 L -12 -16" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      {/* bench */}
      <rect x="-34" y="33" width="3" height="17" fill="#8d5524" />
      <rect x="11" y="33" width="3" height="17" fill="#8d5524" />
      <rect x="-38" y="28" width="56" height="5.5" rx="2" fill="#f4a261" stroke="#c9773a" strokeWidth="1" />
      {/* roof */}
      <path d="M -50 -38 L 28 -38 L 31 -30 L -53 -30 Z" fill="#ffb703" stroke="#d48806" strokeWidth="1.6" />
      <rect x="-53" y="-31" width="84" height="4" rx="2" fill="#f59f00" />
    </g>
  );
}

function Canopy() {
  const parts = [];
  for (let i = 0; i < 10; i++) {
    const t0 = -44 + i * 8.8;
    const t1 = t0 + 8.8;
    const b0 = -50 + i * 10;
    const b1 = b0 + 10;
    const fill = i % 2 ? '#ffffff' : '#ff5d8f';
    parts.push(<path key={`s${i}`} d={`M ${t0} -18 L ${t1} -18 L ${b1} 10 L ${b0} 10 Z`} fill={fill} />);
    parts.push(<path key={`c${i}`} d={`M ${b0} 10 A 5 5 0 0 0 ${b1} 10 Z`} fill={fill} stroke="#d6336c" strokeWidth="1.2" />);
  }
  return (
    <g strokeLinejoin="round">
      <rect x="-47" y="-24" width="94" height="7" rx="3" fill="#c2255c" />
      {parts}
      <path d="M -44 -18 L 44 -18 L 50 10 L -50 10 Z" fill="none" stroke="#d6336c" strokeWidth="1.6" />
      <rect x="-46" y="-26" width="4" height="10" rx="1.5" fill="#868e96" />
      <rect x="42" y="-26" width="4" height="10" rx="1.5" fill="#868e96" />
    </g>
  );
}

function FireHydrant() {
  return (
    <g strokeLinejoin="round">
      <rect x="-22" y="40" width="44" height="8" rx="3" fill="#c1121f" stroke="#8d0b16" strokeWidth="1.4" />
      <rect x="-30" y="-6" width="60" height="14" rx="4" fill="#c1121f" stroke="#8d0b16" strokeWidth="1.4" />
      <rect x="-34" y="-9" width="6" height="20" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="1.2" />
      <rect x="28" y="-9" width="6" height="20" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="1.2" />
      <rect x="-16" y="-20" width="32" height="62" rx="5" fill="#e63946" stroke="#a4161a" strokeWidth="1.6" />
      <path d="M -15 -22 Q -15 -42 0 -42 Q 15 -42 15 -22 Z" fill="#e63946" stroke="#a4161a" strokeWidth="1.6" />
      <rect x="-20" y="-25" width="40" height="8" rx="3" fill="#c1121f" stroke="#8d0b16" strokeWidth="1.4" />
      <rect x="-5" y="-49" width="10" height="8" rx="2" fill="#ffd23f" stroke="#c99f00" strokeWidth="1.2" />
      <circle cx="0" cy="10" r="8" fill="#ffd23f" stroke="#c99f00" strokeWidth="1.4" />
      <circle cx="0" cy="10" r="3" fill="#c99f00" />
      <rect x="-11" y="-14" width="4" height="48" rx="2" fill="#ffffff" opacity="0.35" />
    </g>
  );
}

function OverheadBridge() {
  // A footbridge: stairs at both ends, a long deck with railings, pillars underneath.
  const stair = (side) => {
    const s = side; // -1 left, 1 right
    const n = 8;
    const run = 19 / n;
    const rise = 45 / n;
    let d = `M ${s * 50} 28`;
    for (let k = 0; k < n; k++) d += ` L ${s * (50 - k * run)} ${28 - (k + 1) * rise} L ${s * (50 - (k + 1) * run)} ${28 - (k + 1) * rise}`;
    d += ` L ${s * 31} -10 L ${s * 42} 28 Z`;
    const posts = [];
    for (let k = 0; k <= 4; k++) {
      const px = s * (50 - k * 4.75);
      const py = 28 - k * 11.25 - 9;
      posts.push(<line key={`p${side}${k}`} x1={px} y1={py} x2={px} y2={py + 8} stroke="#1d4ed8" strokeWidth="1" />);
    }
    return (
      <g key={`stair${side}`}>
        <path d={d} fill="#3a86ff" stroke="#1d4ed8" strokeWidth="1.4" />
        <path d={`M ${s * 50.5} 19 L ${s * 31} -25`} stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" />
        {posts}
      </g>
    );
  };
  const rails = [];
  for (let x = -30; x <= 30; x += 5) rails.push(<line key={`r${x}`} x1={x} y1="-25" x2={x} y2="-17" stroke="#1d4ed8" strokeWidth="1" />);
  return (
    <g strokeLinejoin="round">
      {/* pillars */}
      <rect x="-21.5" y="-11" width="4" height="39" fill="#a5b4c8" stroke="#6b7a90" strokeWidth="1" />
      <rect x="17.5" y="-11" width="4" height="39" fill="#a5b4c8" stroke="#6b7a90" strokeWidth="1" />
      {stair(-1)}
      {stair(1)}
      {/* deck */}
      {rails}
      <line x1="-31" y1="-25" x2="31" y2="-25" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="-33" y="-17" width="66" height="7.5" rx="1.5" fill="#3a86ff" stroke="#1d4ed8" strokeWidth="1.4" />
      <rect x="-32" y="-15.5" width="64" height="1.6" fill="#ffffff" opacity="0.6" />
    </g>
  );
}

function PublicPhone() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="-27" y="44" width="54" height="6" rx="2" fill="#868e96" />
      <rect x="-24" y="-43" width="48" height="89" rx="4" fill="#2fb36b" stroke="#1b7a46" strokeWidth="1.6" />
      <rect x="-27" y="-50" width="54" height="9" rx="3.5" fill="#1f9d57" stroke="#1b7a46" strokeWidth="1.4" />
      <rect x="-18" y="-38" width="36" height="9" rx="2" fill="#ffffff" stroke="#1b7a46" strokeWidth="1" />
      <path d="M -5 -32 Q -5 -36.5 0 -36.5 Q 5 -36.5 5 -32 L 3 -32 Q 3 -34 0 -34 Q -3 -34 -3 -32 Z" fill="#1f9d57" />
      <rect x="-18" y="-26" width="36" height="66" rx="2" fill="#dff5ff" stroke="#1b7a46" strokeWidth="1.4" />
      {/* the phone inside */}
      <rect x="-6" y="-16" width="17" height="25" rx="3" fill="#5c677d" stroke="#343a40" strokeWidth="1" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={`k${r}${c}`} cx={-1 + c * 3.5} cy={-9 + r * 4} r="1.1" fill="#ffffff" />))}
      <rect x="-1.5" y="-14" width="8" height="3" rx="1" fill="#bde0fe" />
      <rect x="-13" y="-18" width="5" height="24" rx="2.4" fill="#212529" />
      <rect x="-14.5" y="-19" width="8" height="5.5" rx="2.4" fill="#212529" />
      <rect x="-14.5" y="1.5" width="8" height="5.5" rx="2.4" fill="#212529" />
      <path d="M -10.5 7 q -3 3 0 5 q 3 2 0 4 q -3 2 0 4 q 3 2 7 -3 q 4 -5 4 -8" fill="none" stroke="#212529" strokeWidth="1.2" />
      <path d="M -15 34 L 2 -20" stroke="#ffffff" strokeWidth="2.4" opacity="0.7" />
      <rect x="13" y="6" width="2.6" height="12" rx="1.3" fill="#1b7a46" />
    </g>
  );
}

function StreetLamp() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx="-24" cy="-36" r="16" fill="#fff6a8" opacity="0.55" />
      <path d="M 12 -36 Q 12 -46 2 -46 L -22 -46" fill="none" stroke="#2c3e63" strokeWidth="4.4" />
      <path d="M 12 -36 Q 12 -46 2 -46 L -22 -46" fill="none" stroke="#4a6fa5" strokeWidth="2" />
      <rect x="9.5" y="-39" width="5" height="86" rx="2" fill="#4a6fa5" stroke="#2c3e63" strokeWidth="1.2" />
      <rect x="8" y="16" width="8" height="3.5" rx="1.5" fill="#2c3e63" />
      <path d="M 5 50 L 7.5 38 L 16.5 38 L 19 50 Z" fill="#4a6fa5" stroke="#2c3e63" strokeWidth="1.2" />
      <path d="M -36 -38 Q -36 -48 -24 -48 Q -12 -48 -12 -38 Z" fill="#4a6fa5" stroke="#2c3e63" strokeWidth="1.2" />
      <ellipse cx="-24" cy="-37.5" rx="10" ry="4" fill="#fff3a0" stroke="#e0b400" strokeWidth="1" />
      <circle cx="-24" cy="-50" r="2" fill="#2c3e63" />
    </g>
  );
}

function TrafficLight() {
  return (
    <g strokeLinejoin="round">
      <rect x="-3" y="-2" width="6" height="50" fill="#8d99ae" stroke="#5c677d" strokeWidth="1" />
      <rect x="-9" y="45" width="18" height="5" rx="2" fill="#5c677d" />
      <rect x="-15" y="-50" width="30" height="50" rx="7" fill="#2b2d42" stroke="#14151f" strokeWidth="1.5" />
      <circle cx="0" cy="-37" r="11" fill="#ff6b6b" opacity="0.35" />
      <circle cx="0" cy="-37" r="7" fill="#ff3b30" stroke="#b3001b" strokeWidth="1" />
      <circle cx="-2.2" cy="-39.2" r="2" fill="#ffffff" opacity="0.8" />
      <circle cx="0" cy="-24" r="6.5" fill="#6b5d27" />
      <circle cx="0" cy="-11" r="6.5" fill="#245a3b" />
    </g>
  );
}

function PoliceOfficer() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* raised arm: "stop!" */}
      <path d="M -11 -12 L -23 -31" stroke="#1f3a8a" strokeWidth="9" />
      <path d="M -11 -12 L -23 -31" stroke="#3a6fd8" strokeWidth="6.4" />
      <rect x="-30.5" y="-44" width="11" height="12" rx="4" fill="#ffffff" stroke="#9aa5b1" strokeWidth="1.2" />
      <circle cx="-19" cy="-35" r="2.6" fill="#ffffff" stroke="#9aa5b1" strokeWidth="1" />
      {/* arm down */}
      <path d="M 11 -12 L 16 8" stroke="#1f3a8a" strokeWidth="9" />
      <path d="M 11 -12 L 16 8" stroke="#3a6fd8" strokeWidth="6.4" />
      <circle cx="16.5" cy="11" r="4.8" fill="#ffffff" stroke="#9aa5b1" strokeWidth="1.2" />
      {/* legs and shoes */}
      <rect x="-10" y="12" width="8.5" height="33" rx="2" fill="#1f2d5c" />
      <rect x="1.5" y="12" width="8.5" height="33" rx="2" fill="#1f2d5c" />
      <ellipse cx="-7" cy="46" rx="7.5" ry="3.6" fill="#1b1b1b" />
      <ellipse cx="7" cy="46" rx="7.5" ry="3.6" fill="#1b1b1b" />
      {/* body */}
      <path d="M -14 -12 Q -14 -18 -8 -18 L 8 -18 Q 14 -18 14 -12 L 13 14 L -13 14 Z" fill="#3a6fd8" stroke="#1f3a8a" strokeWidth="1.4" />
      <rect x="-13.5" y="8" width="27" height="4.5" fill="#ffffff" stroke="#9aa5b1" strokeWidth="0.8" />
      <rect x="-2.5" y="8.5" width="5" height="3.5" rx="0.8" fill="#ffd23f" />
      <path d="M 0 -17 L -2.2 -13.5 L 0 -1 L 2.2 -13.5 Z" fill="#1f2d5c" />
      <path d="M -9 -10 L -6.5 -11.5 L -4 -10 L -4 -7 L -6.5 -5.2 L -9 -7 Z" fill="#ffd23f" stroke="#c99f00" strokeWidth="0.6" />
      <path d="M 3 -17 Q 8 -10 6.5 -5" fill="none" stroke="#ffffff" strokeWidth="1" />
      <rect x="4.5" y="-5.5" width="5" height="3" rx="1.2" fill="#c0c7d1" />
      {/* head */}
      <rect x="-3.5" y="-21" width="7" height="5" fill="#e0a877" />
      <circle cx="-9.5" cy="-26" r="2.6" fill="#f1c27d" stroke="#c98f55" strokeWidth="0.8" />
      <circle cx="9.5" cy="-26" r="2.6" fill="#f1c27d" stroke="#c98f55" strokeWidth="0.8" />
      <circle cx="0" cy="-26.5" r="9.5" fill="#f1c27d" stroke="#c98f55" strokeWidth="1" />
      <circle cx="-3.6" cy="-25.5" r="1.3" fill="#2b2d42" />
      <circle cx="3.6" cy="-25.5" r="1.3" fill="#2b2d42" />
      <circle cx="-6" cy="-22.5" r="1.8" fill="#ff8fab" opacity="0.6" />
      <circle cx="6" cy="-22.5" r="1.8" fill="#ff8fab" opacity="0.6" />
      <path d="M -3.2 -21.5 Q 0 -18.8 3.2 -21.5" fill="none" stroke="#8a4b2a" strokeWidth="1" />
      {/* cap */}
      <path d="M -10.5 -31 Q -12 -42 0 -43 Q 12 -42 10.5 -31 Z" fill="#1f2d5c" stroke="#111a3a" strokeWidth="1" />
      <ellipse cx="0" cy="-31" rx="11.5" ry="2.4" fill="#111a3a" />
      <circle cx="0" cy="-37" r="2.5" fill="#ffd23f" stroke="#c99f00" strokeWidth="0.6" />
    </g>
  );
}

function ZebraCrossing() {
  const bars = [-47, -30, -13, 4, 21, 38];
  return (
    <g>
      <rect x="-36" y="-50" width="72" height="100" fill={ROAD} />
      {bars.map((y) => (
        <rect key={y} x="-30" y={y} width="60" height="10" rx="2" fill="#ffffff" />
      ))}
    </g>
  );
}

function TrafficCone() {
  return (
    <g strokeLinejoin="round">
      <rect x="-36" y="38" width="72" height="9" rx="3" fill="#ff7b00" stroke="#c25700" strokeWidth="1.4" />
      <path d="M -26 38 L -6 -42 Q 0 -47 6 -42 L 26 38 Z" fill="#ff8c1a" stroke="#c25700" strokeWidth="1.6" />
      <path d="M -12.3 -18 L 12.3 -18 L 15.3 -6 L -15.3 -6 Z" fill="#ffffff" />
      <path d="M -19.2 10 L 19.2 10 L 22.1 22 L -22.1 22 Z" fill="#ffffff" />
      <path d="M -4 -36 L -16 30" stroke="#ffffff" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
    </g>
  );
}

function Bird() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -24 0 L -46 -14 L -40 8 Z" fill="#3a86ff" stroke="#1d4ed8" strokeWidth="2" />
      <path d="M -4 24 L -6 34 M 8 24 L 8 34 M -11 34 L -1 34 M 3 34 L 13 34" stroke="#f77f00" strokeWidth="3" />
      <ellipse cx="0" cy="6" rx="28" ry="22" fill="#4cc9f0" stroke="#1d8fc0" strokeWidth="2.4" />
      <circle cx="18" cy="-14" r="16" fill="#4cc9f0" stroke="#1d8fc0" strokeWidth="2.4" />
      <ellipse cx="0" cy="6" rx="26.8" ry="20.8" fill="#4cc9f0" />
      <circle cx="18" cy="-14" r="14.8" fill="#4cc9f0" />
      <ellipse cx="7" cy="12" rx="15" ry="10" fill="#e0fbff" />
      <path d="M -16 -2 Q 0 -8 10 4 Q 0 16 -16 8 Z" fill="#2ba3d6" stroke="#1d8fc0" strokeWidth="1.6" />
      <circle cx="23" cy="-17" r="3.6" fill="#1b1b1b" />
      <circle cx="24.3" cy="-18.3" r="1.2" fill="#ffffff" />
      <circle cx="24" cy="-8" r="3" fill="#ff8fab" opacity="0.6" />
      <path d="M 32 -16 L 45 -11 L 32 -6 Z" fill="#ffb703" stroke="#e07a00" strokeWidth="1.6" />
    </g>
  );
}

const street = {
  id: 'street',
  title: 'Busy Street',
  titleId: 'Jalan Raya',
  icon: '🚌',
  Background,
  objects: [
    // ---- sky ----
    {
      id: 'bird', word: 'bird', wordId: 'burung', art: Bird, x: 220, y: 160, size: 100,
      sentence: 'The bird sits on the wire.', sentenceId: 'Burung itu hinggap di kabel.',
      question: 'Can you sing like a bird?', questionId: 'Bisa bernyanyi seperti burung?',
      answer: 'Tweet, tweet!', answerId: 'Cuit, cuit!',
    },
    {
      id: 'balloon', word: 'balloon', wordId: 'balon', emoji: '🎈', x: 1490, y: 120, size: 110, rotate: 8,
      sentence: 'The red balloon floats up high.', sentenceId: 'Balon merah melayang tinggi.',
      question: 'Do you like balloons?', questionId: 'Kamu suka balon?',
      answer: 'Yes, I love balloons!', answerId: 'Ya, aku suka sekali balon!',
    },

    // ---- back pavement ----
    {
      id: 'bridge', word: 'overhead bridge', wordId: 'jembatan penyeberangan', art: OverheadBridge, x: 310, y: 530, size: 600,
      hit: { w: 580, h: 220, dy: -70 },
      sentence: 'We walk over the road on the bridge.', sentenceId: 'Kita menyeberang lewat jembatan.',
      question: 'Is the bridge up high or down low?', questionId: 'Jembatannya tinggi atau rendah?',
      answer: 'The bridge is up high!', answerId: 'Jembatannya tinggi!',
    },
    {
      id: 'phone', word: 'public phone', wordId: 'telepon umum', art: PublicPhone, x: 310, y: 590, size: 220,
      hit: { w: 120, h: 220 },
      sentence: 'I can call Grandma on the phone.', sentenceId: 'Aku bisa menelepon Nenek.',
      question: 'Can you say hello on the phone?', questionId: 'Bisa bilang halo di telepon?',
      answer: 'Hello, Grandma!', answerId: 'Halo, Nenek!',
    },
    {
      id: 'canopy', word: 'canopy', wordId: 'kanopi', art: Canopy, x: 715, y: 515, size: 220,
      hit: { w: 230, h: 120 },
      sentence: 'The canopy keeps the sun away.', sentenceId: 'Kanopi itu menghalangi panas matahari.',
      question: 'What colors are the stripes?', questionId: 'Garis-garisnya warna apa?',
      answer: 'The stripes are pink and white.', answerId: 'Garisnya merah muda dan putih.',
    },
    {
      id: 'trafficlight', word: 'traffic light', wordId: 'lampu lalu lintas', art: TrafficLight, x: 880, y: 560, size: 340,
      hit: { w: 110, h: 340 },
      sentence: 'Red means stop! Green means go!', sentenceId: 'Merah artinya berhenti! Hijau artinya jalan!',
      question: 'Is the light red or green?', questionId: 'Lampunya merah atau hijau?',
      answer: 'The light is red. Stop!', answerId: 'Lampunya merah. Berhenti!',
    },
    {
      id: 'lamp', word: 'street lamp', wordId: 'lampu jalan', art: StreetLamp, x: 1127, y: 515, size: 440,
      hit: { w: 210, h: 420, dx: -37 },
      sentence: 'The street lamp lights up at night.', sentenceId: 'Lampu jalan menyala di malam hari.',
      question: 'Is the street lamp tall or short?', questionId: 'Lampu jalannya tinggi atau pendek?',
      answer: 'The street lamp is tall.', answerId: 'Lampu jalannya tinggi.',
    },
    {
      id: 'busstop', word: 'bus stop', wordId: 'halte bus', art: BusStop, x: 1400, y: 555, size: 260,
      hit: { w: 240, h: 250, dx: -5, dy: -5 },
      sentence: 'We wait for the bus here.', sentenceId: 'Kita menunggu bus di sini.',
      question: 'Do you like to ride the bus?', questionId: 'Kamu suka naik bus?',
      answer: 'Yes, I do!', answerId: 'Ya, aku suka!',
    },

    // ---- road: far lane goes right ----
    {
      id: 'firetruck', word: 'fire truck', wordId: 'mobil pemadam kebakaran', emoji: '🚒', x: 200, y: 784, size: 200, flip: true,
      sentence: 'The fire truck has a long ladder.', sentenceId: 'Mobil pemadam punya tangga panjang.',
      question: 'Can you make a siren sound?', questionId: 'Bisa bikin suara sirene?',
      answer: 'Wee-woo, wee-woo!', answerId: 'Nguing, nguing!',
    },
    {
      id: 'scooter', word: 'scooter', wordId: 'skuter', emoji: '🛵', x: 470, y: 805, size: 140, flip: true,
      sentence: 'The yellow scooter goes beep beep!', sentenceId: 'Skuter kuning berbunyi tin tin!',
      question: 'Do you wear a helmet on a scooter?', questionId: 'Kamu pakai helm kalau naik skuter?',
      answer: 'Yes, I wear a helmet.', answerId: 'Ya, aku pakai helm.',
    },
    {
      id: 'policecar', word: 'police car', wordId: 'mobil polisi', emoji: '🚓', x: 740, y: 795, size: 170, flip: true,
      sentence: 'The police car stops at the red light.', sentenceId: 'Mobil polisi berhenti di lampu merah.',
      question: 'Is the police car black and white?', questionId: 'Mobil polisinya hitam dan putih?',
      answer: 'Yes, it is black and white.', answerId: 'Ya, hitam dan putih.',
    },
    {
      id: 'bus', word: 'bus', wordId: 'bus', art: Bus, x: 1350, y: 786, size: 260,
      hit: { w: 250, h: 150 },
      sentence: 'We ride the big red bus.', sentenceId: 'Kita naik bus merah yang besar.',
      question: 'What color is the bus?', questionId: 'Busnya warna apa?',
      answer: 'The bus is red.', answerId: 'Busnya merah.',
    },
    {
      id: 'zebra', word: 'zebra crossing', wordId: 'zebra cross', art: ZebraCrossing, x: 980, y: 871, size: 258,
      hit: { w: 170, h: 250 },
      sentence: 'We cross at the zebra crossing.', sentenceId: 'Kita menyeberang di zebra cross.',
      question: 'Do we hold hands to cross?', questionId: 'Kita gandengan tangan waktu menyeberang?',
      answer: 'Yes, we hold hands!', answerId: 'Ya, kita gandengan tangan!',
    },

    // ---- road: near lane goes left ----
    {
      id: 'motorbike', word: 'motorbike', wordId: 'sepeda motor', emoji: '🏍️', x: 170, y: 937, size: 140,
      sentence: 'The motorbike goes vroom vroom!', sentenceId: 'Motornya berbunyi brum brum!',
      question: 'Is the motorbike fast or slow?', questionId: 'Motornya cepat atau lambat?',
      answer: 'The motorbike is fast!', answerId: 'Motornya cepat!',
    },
    {
      id: 'truck', word: 'truck', wordId: 'truk', emoji: '🚚', x: 450, y: 918, size: 190,
      sentence: 'The truck brings food to the shops.', sentenceId: 'Truk membawa makanan ke toko.',
      question: 'Is the truck big or small?', questionId: 'Truknya besar atau kecil?',
      answer: 'The truck is big.', answerId: 'Truknya besar.',
    },
    {
      id: 'cone', word: 'traffic cone', wordId: 'kerucut lalu lintas', art: TrafficCone, x: 690, y: 950, size: 100,
      sentence: 'The cone says: be careful!', sentenceId: 'Kerucut itu bilang: hati-hati!',
      question: 'Is the cone orange or blue?', questionId: 'Kerucutnya oranye atau biru?',
      answer: 'The cone is orange.', answerId: 'Kerucutnya oranye.',
    },
    {
      id: 'taxi', word: 'taxi', wordId: 'taksi', emoji: '🚕', x: 1180, y: 925, size: 170,
      sentence: 'The taxi takes us home.', sentenceId: 'Taksi mengantar kita pulang.',
      question: 'Is the taxi yellow or blue?', questionId: 'Taksinya kuning atau biru?',
      answer: 'The taxi is yellow.', answerId: 'Taksinya kuning.',
    },
    {
      id: 'ambulance', word: 'ambulance', wordId: 'ambulans', emoji: '🚑', x: 1450, y: 918, size: 190,
      sentence: 'The ambulance helps sick people.', sentenceId: 'Ambulans menolong orang sakit.',
      question: 'Is the ambulance white or black?', questionId: 'Ambulansnya putih atau hitam?',
      answer: 'The ambulance is white.', answerId: 'Ambulansnya putih.',
    },

    // ---- front pavement ----
    {
      id: 'bicycle', word: 'bicycle', wordId: 'sepeda', emoji: '🚲', x: 130, y: 1110, size: 150,
      sentence: 'The bicycle has two wheels.', sentenceId: 'Sepeda punya dua roda.',
      question: 'Can you ride a bicycle?', questionId: 'Kamu bisa naik sepeda?',
      answer: 'Yes, I can!', answerId: 'Ya, aku bisa!',
    },
    {
      id: 'dog', word: 'dog', wordId: 'anjing', emoji: '🐕', x: 360, y: 1110, size: 130,
      sentence: 'The dog says woof woof!', sentenceId: 'Anjing berbunyi guk guk!',
      question: 'Can you bark like a dog?', questionId: 'Bisa menggonggong seperti anjing?',
      answer: 'Woof, woof!', answerId: 'Guk, guk!',
    },
    {
      id: 'hydrant', word: 'fire hydrant', wordId: 'hidran', art: FireHydrant, x: 580, y: 1108, size: 130,
      sentence: 'The fire hydrant is red.', sentenceId: 'Hidrannya warna merah.',
      question: 'Is there water inside?', questionId: 'Ada air di dalamnya?',
      answer: 'Yes, lots of water!', answerId: 'Ya, banyak air!',
    },
    {
      id: 'officer', word: 'police officer', wordId: 'polisi', art: PoliceOfficer, x: 830, y: 1065, size: 240,
      hit: { w: 130, h: 230 },
      sentence: 'The police officer helps us cross.', sentenceId: 'Pak polisi membantu kita menyeberang.',
      question: 'Can you say thank you?', questionId: 'Bisa bilang terima kasih?',
      answer: 'Thank you, officer!', answerId: 'Terima kasih, Pak Polisi!',
    },
    {
      id: 'mailbox', word: 'mailbox', wordId: 'kotak pos', emoji: '📮', x: 1240, y: 1105, size: 130,
      sentence: 'I post a letter in the mailbox.', sentenceId: 'Aku memasukkan surat ke kotak pos.',
      question: 'Is the mailbox red?', questionId: 'Kotak posnya merah?',
      answer: 'Yes, it is red.', answerId: 'Ya, warnanya merah.',
    },
    {
      id: 'tree', word: 'tree', wordId: 'pohon', emoji: '🌳', x: 1470, y: 1090, size: 210,
      sentence: 'The tree gives us cool shade.', sentenceId: 'Pohon membuat kita teduh.',
      question: 'Can you stand tall like a tree?', questionId: 'Bisa berdiri tegak seperti pohon?',
      answer: 'I am a tall tree!', answerId: 'Aku pohon yang tinggi!',
    },
  ],
};

export default street;

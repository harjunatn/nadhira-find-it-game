# Writing a 3D room

A 3D room is a little diorama the players can turn around (drag) and zoom (pinch).
The game says "Find the lamp!" and they look for it — some things hide behind
furniture, trees or rocks, so they have to walk around the room. Look at
`bedroom.js` (a room with walls) and `animalPark.js` (outdoors) first.

Rooms are plain data. The models are free CC0 files from Kenney in
`public/models/<kit>/<name>.glb` (`furniture`, `food`, `pets`, `toycar`, `holiday`,
`nature`), referred to as `"kit/name"`.

## Coordinates

- The room is centred on (0, 0): **x** runs west (−) to east (+), **z** runs north (−) to south (+), **y** is up.
- One wall piece is 1 unit wide and 1.29 tall, so `w` and `d` of a walled room are whole numbers.
- A thing's `at: [x, y, z]` is the middle of its base. `ry` turns it (degrees):
  0 = its front faces south, 90 = east, −90 = west, 180 = north.
- The game starts looking from the south-east, so the north and west walls are the first ones seen.
  A wall drops out of the way whenever the camera is behind it.

## A room

```js
const room = {
  id: 'bedroom-3d', title: 'Bedroom', titleId: 'Kamar Tidur', icon: '🛏️',
  room: {
    w: 3, d: 3,                       // size
    wallColor: '#d7ccff',
    floor: { type: 'wood', color: '#f1dcc0' },   // 'wood' | 'tiles' (+ color2) | 'grass'
    outdoor: true,                    // no walls (animal park)
  },
  items: [ /* things, see below */ ],
};
```

## Things

| field | meaning |
|---|---|
| `id` | unique in the room |
| `model` | `"kit/name"`, or `"shape/disc"` for a flat round plate (pond) |
| `at`, `ry`, `scale` | position, turn, size (see sizes with the catalog page below) |
| `tint` | `{ materialName: '#rrggbb' }` recolours parts of Furniture/Nature Kit models (`carpet`, `wood`, `_defaultMat`…) |
| `animation` | a clip in the file to loop — the Cube Pets have `idle`, `eat`, `dance`… |
| `segment` | `{ side: 'N'|'E'|'S'|'W', index }` — this thing *is* that wall piece (`furniture/wallWindow`, `wallDoorway`) |
| `wall` | `'N'|'E'|'S'|'W'` — it hangs on that wall; then `at` is `[along the wall, height, distance from the wall]` |
| `word`, `wordId`, `sentence`, `sentenceId`, `question`, `questionId`, `answer`, `answerId` | makes the thing findable; same language rules as the flat scenes (`src/scenes/README.md`) |
| `same` | `'<id>'` — another copy of a findable thing (a second window, more trees): tapping it counts too |

Things without `word` are scenery. Make hiding places on purpose: something behind the
sofa, in the corner behind the wardrobe, behind a rock. Everything must be visible from
*some* side — don't put things under tables or inside closed furniture.

## Tools

```bash
npm run dev            # the game
npm run dev3d          # helper that saves pictures (keep both running)
```

Then open one of these with `scripts/dev3d-open.sh "<query>" <file to wait for>`:

- `dev3d=catalog&models=furniture/bedDouble,food/apple@0.5&file=cat` → `.renders/3d/cat.png`:
  models side by side with their sizes (red dot = front, `@` = scale).
- `dev3d=sheet&scene=bedroom-3d` → `.renders/3d/bedroom-3d-sheet.png`: the room from six
  sides plus a labelled map. Add `&views=35:55,215:55&cell=1100x825&cols=2` for bigger views.
- `dev3d=thumbs&scene=bedroom-3d` → `public/models/thumbs/bedroom-3d/`: the pictures the game
  shows on the "Find the …" card and the menu. **Run this again whenever a room changes**
  (wait for `public/models/thumbs/<id>/done.txt`, then delete that file).

Finally add the room to `index.js`.

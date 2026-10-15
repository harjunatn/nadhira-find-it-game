# Writing a scene

A scene is one big picture (1600 × 1200, landscape 4:3) full of things to find.
Players hear "Find the lamp!", race to tap the lamp, then read a short sentence
and a conversation question together. The players are a **5-year-old** and their
parent (Indonesian family learning English), playing on an **iPad** (Safari).

Look at `bedroom.jsx`. It is the reference for quality, style and density.

## File shape

```jsx
function Background() { return <g>…pure SVG drawn in 0..1600 × 0..1200…</g>; }
function Sofa() { return <g>…drawn in a 100×100 box centred on (0,0), i.e. -50..50…</g>; }

const scene = {
  id: 'living-room',          // keep the id that is already in the placeholder file
  title: 'Living Room',       // English
  titleId: 'Ruang Tamu',      // Indonesian
  icon: '🛋️',
  Background,
  objects: [ /* 18–24 objects */ ],
};
export default scene;
```

## Objects

| field | meaning |
|---|---|
| `id` | unique, short, lowercase |
| `word` | English name, lowercase, as said after "Find the …" (`teddy bear`, `toy car`) |
| `wordId` | Indonesian word |
| `emoji` **or** `art` | an emoji character, or a React component drawing the thing in the 100×100 box |
| `x`, `y` | centre of the object in the 1600×1200 picture |
| `size` | how big it is drawn (emoji font-size, or art box size) in picture units |
| `rotate`, `flip` | optional: degrees, and mirror left↔right |
| `hit` | optional tap rectangle `{ w, h, dx, dy }` for big/wide/tall things (bed, door, rug). Otherwise the tap area is a circle of radius `max(size × 0.55, 60)`. |
| `sentence`, `sentenceId` | a fact/action sentence about it + Indonesian |
| `question`, `questionId` | something the parent asks the child + Indonesian |
| `answer`, `answerId` | a model answer the child can copy + Indonesian |

### Language rules (most important part)

- Audience is 5 years old. Sentences **≤ 8 words**, simple present, concrete, fun.
  Sounds and actions are great: "The dog says woof!", "The kite can fly high."
- Questions must be easy to answer: either/or ("Is it big or small?"), yes/no
  ("Do you like bananas?"), "What color is …?", "Can you … like a …?" (do an action).
- The answer is a short **full sentence** model: "The bus is red.", "Yes, I do."
- Anything you state must match the picture: if the sentence says "The bus is red",
  the bus drawn/emoji must be red. Singular word if the picture shows one thing.
- Indonesian should sound natural, the way an Indonesian parent talks to a child
  (`Kamu suka pisang?`, `Bisa bilang meong?`), not stiff textbook style.
- Avoid scary/unsafe ideas (knives, fire play, etc.). Keep it warm and positive.
- No duplicate words within a scene.

### Picture rules

- Fill the whole picture with a clear, cheerful setting (wall/floor or sky/ground),
  flat colours, rounded shapes, soft shadows — same style as the bedroom.
- 18–24 objects spread over the **whole** picture (top, middle, bottom, left, right).
  Nothing important hidden behind something else; nothing cut off by the edge.
- Emoji objects: size 80–180. Small things (crayon, spoon) may be 75–90.
  Keep centres at least ~80 apart unless one sits on a big `hit`-rectangle object.
- Use `art` for things emoji can't show well (furniture, sink, fire hydrant,
  zebra crossing, street lamp…). Draw them nicely: fills + darker outline strokes,
  `strokeLinejoin="round"`, simple highlights. Check them in the cards render.
- Only use emoji available on iPadOS 16 (Unicode Emoji ≤ 14.0). Prefer emoji that
  clearly show the whole thing (e.g. 🐘 full elephant). Face-only emoji (🦁 🐻 🐼) are OK.
- If something in the Background looks like a thing a child would name, make it an
  object instead (or remove it). Decoration must not look tappable.
- SVG ids (gradients, patterns) must be prefixed with the scene id: `living-room-wall`.
- No text in the picture (the child can't read yet, and it gives answers away).
- Big furniture first, then things on/around it; objects on top of big ones are fine
  (the hit test prefers the smaller object).

## Tools

```bash
npm run validate -- <id>   # errors must be 0; read every warning
npm run render -- <id>     # writes .renders/<id>.png, <id>-debug.png, <id>-cards.png
```

Open the PNGs with your image-viewing tool and look at them critically:
`-debug.png` shows every tap area; `-cards.png` shows each object alone the way the
"Find the …" card shows it — every card must be instantly recognisable.

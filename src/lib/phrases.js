// Every line the game says out loud. The voice recorder (tools/voice) builds the
// same strings from these functions, so recorded clips always match what is spoken.

export const line = {
  find: (o) => `Find the ${o.word}!`,
  found: (o) => `You found the ${o.word}!`,
  there: (o) => `There's the ${o.word}!`,
  oops: (o) => `Oops! That's the ${o.word}.`,
  word: (o) => o.word,
  sentence: (o) => o.sentence || `I can see the ${o.word}.`,
  explore: (scene) => `Let's explore the ${scene.title.toLowerCase()}! Tap anything.`,
  missing: (scene) => `Can you find me in the ${scene.title.toLowerCase()}?`,
};

export const FIXED = {
  welcome: "Find it! Let's play and learn English together!",
  greatJob: 'Great job, everyone!',
  tie: "It's a tie!",
  winner: 'We have a winner!',
  voiceTest: 'Hello! Can you find the lamp? The lamp can turn on.',
};

// All lines for one object, in the order a round uses them.
export function objectLines(o) {
  return [line.find(o), line.found(o), line.there(o), line.oops(o), line.word(o), line.sentence(o), o.question, o.answer].filter(Boolean);
}

export function sceneLines(scene) {
  return [scene.title, line.explore(scene), line.missing(scene), ...scene.objects.flatMap(objectLines)];
}

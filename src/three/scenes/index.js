// The 3D rooms. This file is plain data (no three.js), so menus and the sticker
// book can list the rooms without loading the 3D engine.
import { thumbUrl } from '../kit.js';
import bedroom from './bedroom.js';
import livingRoom from './livingRoom.js';
import kitchen from './kitchen.js';
import animalPark from './animalPark.js';

// Several things may share one word (two windows, two pillows): `same: '<id>'` points
// at the one that carries the text, and tapping any of them finds that word.
function prepare(scene) {
  const items = scene.items.map((it) => ({ ...it }));
  const byId = Object.fromEntries(items.map((it) => [it.id, it]));
  for (const it of items) {
    if (it.same) {
      it.word = byId[it.same].word;
      it.findId = it.same;
    } else if (it.word) {
      it.findId = it.id;
    }
  }
  const objects = items.filter((it) => it.word && !it.same).map((it) => ({ ...it, thumb: thumbUrl(scene.id, `${it.id}.png`) }));
  return { ...scene, kind: '3d', items, objects, thumb: thumbUrl(scene.id, 'room.jpg') };
}

export const SCENES_3D = [bedroom, livingRoom, kitchen, animalPark].map(prepare);

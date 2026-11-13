// Free CC0 3D models from Kenney (www.kenney.nl) live in public/models/<kit>/<name>.glb.
// A model is referred to as "kit/name", for example "furniture/bedDouble".

export function modelUrl(ref) {
  const [kit, name] = ref.split('/');
  return `models/${kit}/${name}.glb`;
}

// Pictures of single objects and whole rooms, made by `npm run shots3d`.
export function thumbUrl(sceneId, name) {
  return `models/thumbs/${sceneId}/${name}`;
}

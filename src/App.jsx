import { useCallback, useEffect, useMemo, useState } from 'react';
import { SettingsProvider, useSettings } from './settings.jsx';
import { BUILTIN_SCENES } from './scenes/index.js';
import { listPhotoScenes } from './lib/storage.js';
import { shuffle } from './lib/util.js';
import { makeHard } from './lib/hard.js';
import { unlockSpeech, stopSpeech } from './lib/speech.js';
import { unlockAudio } from './lib/sfx.js';
import HomeScreen from './screens/HomeScreen.jsx';
import SetupScreen from './screens/SetupScreen.jsx';
import TogetherGame from './screens/TogetherGame.jsx';
import RaceGame from './screens/RaceGame.jsx';
import ExploreGame from './screens/ExploreGame.jsx';
import ResultsScreen from './screens/ResultsScreen.jsx';
import StickerBook from './screens/StickerBook.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import PhotoScenes from './screens/PhotoScenes.jsx';
import SceneEditor from './screens/SceneEditor.jsx';

export default function App() {
  return (
    <SettingsProvider>
      <Main />
    </SettingsProvider>
  );
}

function makeQueue(scene, rounds) {
  const n = rounds === 'all' ? scene.objects.length : Math.min(rounds, scene.objects.length);
  return shuffle(scene.objects).slice(0, n);
}

function Main() {
  const { settings } = useSettings();
  const [route, setRoute] = useState({ name: 'home' });
  const [photoScenes, setPhotoScenes] = useState([]);

  const refreshPhotos = useCallback(async () => {
    try {
      setPhotoScenes(await listPhotoScenes());
    } catch {
      setPhotoScenes([]);
    }
  }, []);

  useEffect(() => {
    refreshPhotos();
  }, [refreshPhotos]);

  // iPad Safari only lets a page make sound after the first touch.
  useEffect(() => {
    const unlock = () => {
      unlockAudio();
      unlockSpeech();
    };
    window.addEventListener('touchend', unlock, { passive: true });
    window.addEventListener('click', unlock);
    return () => {
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('click', unlock);
    };
  }, []);

  const scenes = useMemo(() => [...BUILTIN_SCENES, ...photoScenes], [photoScenes]);
  const findScene = (id) => scenes.find((s) => s.id === id);

  const go = useCallback((name, params = {}) => {
    stopSpeech();
    window.scrollTo(0, 0);
    setRoute({ name, ...params });
  }, []);

  const start = (sceneId, mode) => {
    const base = findScene(sceneId);
    if (!base) return;
    // Hard mode re-shuffles what is hidden every game.
    const scene = settings.difficulty === 'hard' && mode !== 'explore' ? makeHard(base) : base;
    go('play', { sceneId, mode, scene, queue: makeQueue(scene, settings.rounds), key: Date.now() });
  };

  switch (route.name) {
    case 'setup':
      return <SetupScreen scenes={scenes} initialSceneId={route.sceneId} go={go} onStart={start} />;

    case 'play': {
      const scene = route.scene || findScene(route.sceneId);
      if (!scene) return <HomeScreen go={go} />;
      const exit = () => go('setup', { sceneId: scene.id });
      const finish = (result) => go('results', { sceneId: scene.id, mode: route.mode, result });
      if (route.mode === 'explore') return <ExploreGame key={route.key} scene={scene} onExit={exit} />;
      const Game = route.mode === 'race' ? RaceGame : TogetherGame;
      return <Game key={route.key} scene={scene} queue={route.queue} onExit={exit} onFinish={finish} />;
    }

    case 'results': {
      const scene = findScene(route.sceneId);
      if (!scene) return <HomeScreen go={go} />;
      return (
        <ResultsScreen
          scene={scene}
          result={route.result}
          onAgain={() => start(scene.id, route.mode)}
          onChoose={() => go('setup', { sceneId: scene.id })}
          onHome={() => go('home')}
        />
      );
    }

    case 'stickers':
      return <StickerBook scenes={scenes} go={go} />;

    case 'settings':
      return <SettingsScreen go={go} />;

    case 'photos':
      return <PhotoScenes photoScenes={photoScenes} refresh={refreshPhotos} go={go} onPlay={(id) => go('setup', { sceneId: id })} />;

    case 'editor':
      return <SceneEditor draft={route.draft} isNew={route.isNew} go={go} refresh={refreshPhotos} />;

    default:
      return <HomeScreen go={go} />;
  }
}

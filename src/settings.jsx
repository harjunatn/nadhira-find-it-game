import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadSettings, saveSettings } from './lib/storage.js';
import { configureSpeech } from './lib/speech.js';
import { configureSfx } from './lib/sfx.js';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    saveSettings(settings);
    configureSpeech({ enabled: settings.voice, rate: settings.speechRate, voiceName: settings.voiceName });
    configureSfx({ enabled: settings.sfx });
  }, [settings]);

  const update = useCallback((patch) => {
    setSettings((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const value = useMemo(() => ({ settings, update }), [settings, update]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

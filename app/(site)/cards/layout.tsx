'use client';

import { useState } from 'react';
import { Settings as SettingsComponent, SettingsState } from '@/components/Settings';
import { SettingsContext, defaultSettings } from './SettingsProvider';

export default function Page({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const handleChange = (newSettings: SettingsState) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsComponent onChange={handleChange} />
      {children}
    </SettingsContext.Provider>
  );
}

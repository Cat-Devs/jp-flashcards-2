import { createContext } from 'react';
import { SettingsState } from '@/components/Settings';
import { VariationEnum } from '@/components/types';

export const defaultSettings: SettingsState = {
  showImageFront: true,
  showImageBack: true,
  playAudio: true,
  variationFront: VariationEnum.A,
  variationBack: VariationEnum.A,
};

export const SettingsContext = createContext<SettingsState>(defaultSettings);

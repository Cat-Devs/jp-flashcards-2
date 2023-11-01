import { useEffect, useState } from 'react';
import { VariationEnum } from '../types';

interface SettingsProps {
  onChange: (settings: SettingsState) => void;
}

export interface SettingsState {
  showImageFront: boolean;
  showImageBack: boolean;
  playAudio: boolean;
  variationFront: VariationEnum;
  variationBack: VariationEnum;
}

export const Settings = ({ onChange }: SettingsProps) => {
  const [settings, setSettings] = useState<SettingsState>({
    showImageFront: true,
    showImageBack: true,
    playAudio: true,
    variationFront: VariationEnum.A,
    variationBack: VariationEnum.A,
  });

  useEffect(() => {
    onChange(settings);
  }, [settings, onChange]);

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setSettings((prevState: any) => ({
      ...prevState,
      [`${name}Front`]: name === 'showImage' ? checked : value,
      ...(name === 'playAudio' && { [name]: checked }),
    }));
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setSettings((prevState: any) => ({
      ...prevState,
      [`${name}Back`]: name === 'showImage' ? checked : value,
    }));
  };

  return (
    <div className="flex justify-evenly">
      <div>
        <h2>Front</h2>
        <form>
          <div>
            <label>
              <input type="checkbox" name="playAudio" checked={settings.playAudio} onChange={handleFrontChange} />
              Play Audio
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="showImage" checked={settings.showImageFront} onChange={handleFrontChange} />
              Show Image
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.A}
                checked={settings.variationFront === VariationEnum.A}
                onChange={handleFrontChange}
              />
              Variation A
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.B}
                checked={settings.variationFront === VariationEnum.B}
                onChange={handleFrontChange}
              />
              Variation B
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.C}
                checked={settings.variationFront === VariationEnum.C}
                onChange={handleFrontChange}
              />
              Variation C
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.D}
                checked={settings.variationFront === VariationEnum.D}
                onChange={handleFrontChange}
              />
              Variation D
            </label>
          </div>
        </form>
      </div>

      <div>
        <h2>Back</h2>
        <form>
          <div>
            <label>
              <input type="checkbox" name="showImage" checked={settings.showImageBack} onChange={handleBackChange} />
              Show Image
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.A}
                checked={settings.variationBack === VariationEnum.A}
                onChange={handleBackChange}
              />
              Variation A
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.B}
                checked={settings.variationBack === VariationEnum.B}
                onChange={handleBackChange}
              />
              Variation B
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.C}
                checked={settings.variationBack === VariationEnum.C}
                onChange={handleBackChange}
              />
              Variation C
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="variation"
                value={VariationEnum.D}
                checked={settings.variationBack === VariationEnum.D}
                onChange={handleBackChange}
              />
              Variation D
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

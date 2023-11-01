import type { Card } from '@/gql/graphql';
import { VariationEnum } from '../types';

const renderPlayButton = (frontVariation: VariationEnum, onPlaySound: () => void) => {
  if (frontVariation === VariationEnum.A || frontVariation === VariationEnum.B || frontVariation === VariationEnum.C) {
    return (
      <>
        <button
          type="button"
          className="text-md font-medium bg-slate-600 px-2 py-1 hover:bg-slate-500 active:bg-slate-600 rounded-md flex items-center justify-evenly"
          onClick={onPlaySound}
        >
          <p className="px-2">Play</p>
          {/* SVG Icon from https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
        </button>
      </>
    );
  }

  return null;
};

type Props = {
  data: Card;
  frontVariation: VariationEnum;
  showPlay: boolean;
  onPlaySound: () => void;
};

export const CardHeader = ({ data, frontVariation, showPlay, onPlaySound }: Props) => {
  return (
    <div className="header p-2 h-14 bg-slate-700 flex justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-sm uppercase">{data.category}</p>
        {data.category !== 'hiragana' && <p className="text-sm uppercase">lev {data.level}</p>}
      </div>
      {showPlay && renderPlayButton(frontVariation, onPlaySound)}
    </div>
  );
};

'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CardHeader } from './cardHeader';
import { CardFront } from './cardFront';
import { CardBack } from './cardBack';
import { CardProps } from './types';
import { SettingsContext } from '@/app/(site)/cards/SettingsProvider';
import { SettingsState } from '../Settings';

export const Card = ({ data, audioData }: CardProps) => {
  const [showBack, setShowBack] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const { playAudio, variationFront, variationBack, showImageFront, showImageBack } =
    useContext<SettingsState>(SettingsContext);

  useEffect(() => {
    if (!audioData || !playAudio) {
      return;
    }
    const uint8ArrayAudioData = new Uint8Array(audioData);
    const b64encoded = Buffer.from(String.fromCharCode(...uint8ArrayAudioData), 'binary').toString('base64');
    const src = `data:audio/mpeg;base64,${b64encoded}`;
    audioRef.current = new Audio();
    audioRef.current.src = src;
    audioRef.current.load();
  }, [audioData, playAudio]);

  const playSound = () => {
    if (!audioData || !playAudio) return;
    audioRef.current?.play();
  };

  const handleCheckAnswer = () => {
    setShowBack(!showBack);
    if (!showBack) {
      playSound();
    }
  };

  return (
    <div className="bg-slate-600 text-white py-4 max-w-xs mx-auto rounded-lg mt-8 shadow-slate-800 shadow-2xl flex flex-col justify-between">
      <CardHeader data={data} frontVariation={variationFront} showPlay={playAudio} onPlaySound={playSound} />
      <div className={'h-[28rem] my-4'}>
        {!showBack && <CardFront data={data} showImage={showImageFront} variation={variationFront} />}
        {showBack && <CardBack data={data} showImage={showImageBack} variation={variationBack} />}
      </div>
      <div className="footer p-2 h-14 bg-slate-700 flex justify-end">
        <button
          type="button"
          className="text-md font-medium bg-slate-600 px-2 py-1 hover:bg-slate-500 active:bg-slate-600 rounded-md flex items-center justify-evenly"
          onClick={handleCheckAnswer}
        >
          <p className="px-2">Flip Card</p>
          {/* SVG Icon from https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

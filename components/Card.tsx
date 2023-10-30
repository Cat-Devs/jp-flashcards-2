'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Card as CardProps } from '@/gql/graphql';
import Image from 'next/image';
import { VariationEnum } from './types';
import { toHiragana } from 'wanakana';

interface Props {
  data: CardProps;
  frontVariation: VariationEnum;
  backVariation: VariationEnum;
  audioData: any;
}

const renderFront = (data: CardProps, variation: VariationEnum) => {
  const dataUrl = `data:image/jpeg;base64,${data?.image}`;

  switch (variation) {
    // Image and English
    case VariationEnum.A:
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-2xl font-bold text-center py-4">{data.en}</h2>
        </>
      );
    case VariationEnum.B:
      // Image and English
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-2xl font-bold text-center py-4">{data.en}</h2>
        </>
      );
    case VariationEnum.C:
      // Image and Romaji
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-2xl font-bold text-center py-4">{data.romaji}</h2>
        </>
      );
    case VariationEnum.D:
      // Image and Hiragana
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-5xl font-bold text-center py-4">{toHiragana(`${data.romaji}`)}</h2>
        </>
      );
  }
};

const renderBack = (data: CardProps, variation: VariationEnum) => {
  const dataUrl = `data:image/jpeg;base64,${data.image}`;

  switch (variation) {
    case VariationEnum.A:
      // Image, Hiragana, English sample with translation
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-2xl font-bold text-center pt-4">{toHiragana(`${data.romaji}`)}</h2>
          <p className="text-2xl font-bold text-center py-1">{toHiragana(`${data.sample}`)}</p>
          <p className="text-lg font-light text-center pb-4">{data.sample}</p>
        </>
      );
    case VariationEnum.B:
      return (
        <>
          <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />
          <h2 className="text-2xl font-bold text-center py-1">{toHiragana(`${data.romaji}`)}</h2>
          <p className="text-lg font-light text-center pb-4">{data.romaji}</p>
        </>
      );
  }
};

export const Card = ({ data, frontVariation, backVariation, audioData }: Props) => {
  const [showBack, setShowBack] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (!audioData) return;
    const uint8ArrayAudioData = new Uint8Array(audioData);
    const b64encoded = Buffer.from(String.fromCharCode(...uint8ArrayAudioData), 'binary').toString('base64');
    const src = `data:audio/mpeg;base64,${b64encoded}`;
    audioRef.current = new Audio();
    audioRef.current.src = src;
    audioRef.current.load();
  }, [audioData]);

  const playSound = () => {
    if (!audioData) return;
    audioRef.current?.play();
  };

  const handleCheckAnswer = () => {
    setShowBack(!showBack);
    if (!showBack) {
      playSound();
    }
  };

  const renderPlayButton = (frontVariation: VariationEnum, onPlaySound: () => void) => {
    if (
      frontVariation === VariationEnum.A ||
      frontVariation === VariationEnum.B ||
      frontVariation === VariationEnum.C
    ) {
      return (
        <>
          <button
            type="button"
            className="text-md font-medium bg-slate-600 px-2 py-1 hover:bg-slate-500 active:bg-slate-600 rounded-md flex items-center justify-evenly"
            onClick={onPlaySound}
          >
            <p className="px-2">Play</p>
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

  return (
    <div className="bg-slate-600 text-white py-4 max-w-xs mx-auto rounded-lg mt-8 shadow-slate-800 shadow-2xl flex flex-col justify-between">
      <div className="header p-2 bg-slate-700 flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm">CAT {data.category}</p>
          <p className="text-sm">LEV {data.level}</p>
        </div>
        {renderPlayButton(frontVariation, playSound)}
      </div>
      <div className={'h-[28rem] my-4'}>
        <div className={`front ${showBack ? 'hidden' : ''}`}>{renderFront(data, frontVariation)}</div>
        <div className={`back ${showBack ? '' : 'hidden'}`}>{renderBack(data, backVariation)}</div>
      </div>
      <div className="footer p-3 bg-slate-700 flex justify-end">
        <button
          type="button"
          className="text-md font-medium uppercase bg-slate-600 px-6 py-2 hover:bg-slate-500 active:bg-slate-600"
          onClick={handleCheckAnswer}
        >
          Flip Card
        </button>
      </div>
    </div>
  );
};

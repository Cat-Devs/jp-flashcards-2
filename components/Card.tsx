'use client';

import React, { useState } from 'react';
import type { Card as CardProps } from '@/gql/graphql';

interface Props {
  data: CardProps;
}

export const Card = ({ data }: Props) => {
  const [showBack, setShowBack] = useState(false);

  const handleCheckAnswer = () => {
    setShowBack(true);
  };

  return (
    <div className="bg-slate-600 text-white shadow-lg p-4 w-64 mx-auto rounded-lg mt-6">
      <div className={`front p-4 ${showBack ? 'hidden' : ''}`}>
        <h2 className="text-2xl font-bold">{data.en}</h2>
        <p>{data.category}</p>
        <p>{data.level}</p>
      </div>
      <div className={`back p-4 ${showBack ? '' : 'hidden'}`}>
        <h2 className="text-2xl font-bold">{data.jp}</h2>
        <img src={''} alt="Japanese Image" className="mt-4" />
      </div>
      <button onClick={handleCheckAnswer}>Check Answer</button>
    </div>
  );
};

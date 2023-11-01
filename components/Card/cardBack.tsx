import { toHiragana } from 'wanakana';
import type { Card } from '@/gql/graphql';
import { CardImage } from './CardImage';
import { VariationEnum } from '../types';

interface Props {
  data: Card;
  variation: VariationEnum;
  showImage: boolean;
}

export const CardBack = ({ data, variation, showImage }: Props) => {
  const getText = () => {
    if (variation === VariationEnum.A) {
      return (
        <>
          <h2 className="text-2xl font-bold text-center pt-4">{toHiragana(`${data.romaji}`)}</h2>
          {!!data.sample && <p className="text-2xl font-bold text-center py-1">{toHiragana(`${data.sample}`)}</p>}
          {!!data.sample && <p className="text-lg font-light text-center pb-4">{data.sample}</p>}
        </>
      );
    }
    if (variation === VariationEnum.B) {
      return (
        <>
          <h2 className="text-2xl font-bold text-center py-1">{toHiragana(`${data.romaji}`)}</h2>
          <p className="text-lg font-light text-center pb-4">{data.romaji}</p>
        </>
      );
    }
    if (variation === VariationEnum.C) {
      return <></>;
    }
  };

  return (
    <div className={'card-back'}>
      {showImage && data.image && <CardImage imageData={data?.image} />}
      {getText()}
    </div>
  );
};

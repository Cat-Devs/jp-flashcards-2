import { VariationEnum } from '../types';
import type { Card } from '@/gql/graphql';
import { toHiragana } from 'wanakana';
import { CardImage } from './CardImage';

interface Props {
  data: Card;
  variation: VariationEnum;
  showImage: boolean;
}

export const CardFront = ({ data, variation, showImage }: Props) => {
  const getText = () => {
    if (variation === VariationEnum.A) {
      return <h2 className="text-2xl font-bold text-center py-4">{data.en}</h2>;
    }
    if (variation === VariationEnum.B) {
      return <h2 className="text-2xl font-bold text-center py-4">{data.romaji}</h2>;
    }
    if (variation === VariationEnum.C) {
      return <h2 className="text-5xl font-bold text-center py-4">{toHiragana(`${data.romaji}`)}</h2>;
    }
  };

  return (
    <div className={'card-front'}>
      {showImage && data.image && <CardImage imageData={data?.image} />}
      {getText()}
    </div>
  );
};

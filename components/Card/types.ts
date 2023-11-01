import type { Card } from '@/gql/graphql';
import { VariationEnum } from '../types';

export interface CardProps {
  data: Card;
  frontVariation: VariationEnum;
  backVariation: VariationEnum;
  audioData: number[] | undefined;
}

import type { Card as CardProps } from '@/gql/graphql';

interface Props {
  data: CardProps;
}

export const Card = ({ data }: Props) => {
  return (
    <div>
      <div key={data.id}>
        <p>{data.en}</p>
      </div>
    </div>
  );
};

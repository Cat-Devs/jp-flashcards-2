'use client';

import { Card } from '@/components/Card';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';

const GET_CARD = gql/* GraphQL */ `
  query getCard($cardId: String!) {
    card(cardId: $cardId) {
      id
      en
      jp
      hiragana
      category
      level
    }
  }
`;

export default function Post() {
  const { data, loading, error } = useQuery(GET_CARD, {
    variables: {
      cardId: 'hgna2',
    },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch card data</div>;
  if (!data?.card) return <div>No card found</div>;

  const { card } = data;

  return (
    <div>
      page
      <Card data={card} />
    </div>
  );
}

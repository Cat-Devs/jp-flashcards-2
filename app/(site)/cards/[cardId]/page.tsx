import { gql } from 'graphql-tag';
import { Card } from '@/components/Card';
import { GetCardQueryVariables, GetCardQuery } from '@/gql/graphql';
import { getClient } from '@/app/ApolloClient';

export const dynamic = 'force-dynamic';

const GET_CARD = gql/* GraphQL */ `
  query getCard($cardId: String!) {
    card(cardId: $cardId) {
      id
      en
      romaji
      category
      level
      sample
      image
    }
  }
`;

export default async function Page({ params }: { params: { cardId: string } }) {
  const { data } = await getClient().query<GetCardQuery, GetCardQueryVariables>({
    query: GET_CARD,
    variables: { cardId: params.cardId },
  });

  if (!data) return <div>No card found</div>;

  const { card } = data;

  if (!card) return <div>Error</div>;

  return <Card data={card} />;
}

import { gql } from 'graphql-tag';
import { GetCardQuery, GetCardQueryVariables } from '@/gql/graphql';
import { getClient } from '@/app/ApolloClient';

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

export const getCardData = (cardId: string) =>
  getClient().query<GetCardQuery, GetCardQueryVariables>({
    query: GET_CARD,
    variables: { cardId },
  });

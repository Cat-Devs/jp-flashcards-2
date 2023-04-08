import { GetCardQueryVariables, Card } from '@/gql/graphql';
import { getCard, getCards } from '@/lib';

export const resolvers = {
  Query: {
    async card(_root: any, { cardId }: GetCardQueryVariables): Promise<Card | null> {
      const item = await getCard(cardId);
      return item;
    },

    async cards(_root: any, variables: any): Promise<Array<Card | null>> {
      const item = await getCards();
      return item;
    },
  },
};

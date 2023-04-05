import { getCard, getCards } from '@/lib/aws';

export const resolvers = {
  Query: {
    async card(_root: any, { cardId }: any) {
      const item = await getCard(cardId);

      return item;
    },

    async cards(_root: any, variables: any) {
      const item = await getCards();
      return item;
    },
  },
};

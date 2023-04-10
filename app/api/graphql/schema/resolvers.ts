import { Card, QueryCardArgs, QueryCreateUserArgs, User } from '@/gql/graphql';
import { getCard, getCards, createUser } from '@/lib';
import { UserItem } from '@/lib/models/user';

export const resolvers = {
  Query: {
    async card(_root: any, { cardId }: QueryCardArgs): Promise<Card | null> {
      const item = await getCard(cardId);
      return item;
    },

    async cards(): Promise<Array<Card | null>> {
      const item = await getCards();
      return item;
    },
    async createUser(_root: any, { username }: QueryCreateUserArgs): Promise<User> {
      const user = new UserItem(username);
      const newUser = await createUser(user);
      return newUser;
    },
  },
};

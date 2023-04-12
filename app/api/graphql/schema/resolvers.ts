import { Card, QueryCardArgs, MutationCreateUserArgs, User, QueryUserArgs } from '@/gql/graphql';
import { getCard, getCards, createUser, getUser } from '@/lib';

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

    async user(_root: any, { username }: QueryUserArgs): Promise<User | null> {
      const item = await getUser(username);
      return item;
    },
  },
  Mutation: {
    async createUser(_root: any, { input }: MutationCreateUserArgs): Promise<User> {
      const { username, name, email } = input;
      const newUser = await createUser(username, name, email);
      return newUser;
    },
  },
};

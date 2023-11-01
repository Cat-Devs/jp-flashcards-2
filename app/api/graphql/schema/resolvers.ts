import {
  Card,
  QueryCardArgs,
  QueryCardsArgs,
  MutationCreateUserArgs,
  User,
  QueryUserArgs,
  QueryUserCardsArgs,
} from '@/gql/graphql';
import {
  getCard,
  createUser,
  getUser,
  getCardsByCategory,
  getCardsByLevel,
  getCardsByLevelAndCategory,
} from '@/lib/controllers';
import { getUserCards } from '@/lib/controllers/userCards';
import { logHelper } from '@/lib/helpers/log';

export const resolvers = {
  Query: {
    async card(_root: any, { cardId }: QueryCardArgs): Promise<Card | null> {
      const item = await getCard(cardId);
      logHelper('info', 'card resolver item', {
        id: item.id,
        category: item.category,
        level: item.level,
        en: item.en,
        romaji: item.romaji,
        sample: item.sample,
        image: item.image ? item.image.substring(0, 10) : null,
      });

      return item;
    },

    async cards(_root: any, { input }: QueryCardsArgs): Promise<Array<Card | null>> {
      const { category, level } = input;

      if (!level && !category) {
        throw new Error('Either a category or a level must be provided');
      }

      let items: Card[];
      if (level && category) {
        if (typeof level !== 'number') {
          throw new Error('Invalid input: level must be a number');
        }
        if (typeof category !== 'string') {
          throw new Error('Invalid input: category must be a string');
        }
        items = await getCardsByLevelAndCategory(level, category);
      } else if (level) {
        if (typeof level !== 'number') {
          throw new Error('Invalid input: level must be a number');
        }

        items = await getCardsByLevel(level);
      } else {
        if (typeof category !== 'string') {
          throw new Error('Invalid input: category must be a string');
        }
        items = await getCardsByCategory(category);
      }

      return items;
    },

    async user(_root: any, { username }: QueryUserArgs): Promise<User | null> {
      const item = await getUser(username);
      return item;
    },

    async userCards(_root: any, { username }: QueryUserCardsArgs): Promise<Array<Card | null>> {
      const items = await getUserCards(username);
      return items;
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

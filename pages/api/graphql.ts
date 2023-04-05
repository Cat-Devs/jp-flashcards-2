import { ApolloServer } from '@apollo/server';
import { nextHandler } from 'apollo-server-nextjs';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default nextHandler(server);

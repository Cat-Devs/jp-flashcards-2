import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const graphqlHandler = startServerAndCreateNextHandler(server, {});

export async function GET(request: Request): Promise<Response> {
  return graphqlHandler(request);
}

export async function POST(request: Request): Promise<Response> {
  return graphqlHandler(request);
}

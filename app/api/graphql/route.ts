import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.GQL_ENV === 'production' ? false : true,
  plugins: [
    process.env.GQL_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const graphqlHandler = startServerAndCreateNextHandler(server, {});

export async function GET(request: Request): Promise<Response> {
  if (process.env.GQL_ENV === 'production') {
    return new Response('Not found', { status: 404 });
  }
  return graphqlHandler(request);
}

export async function POST(request: Request): Promise<Response> {
  return graphqlHandler(request);
}

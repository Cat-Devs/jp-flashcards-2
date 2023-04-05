import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

function createApolloClient() {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_API_URL) {
    throw Error('Undefined NEXT_PUBLIC_GRAPHQL_API_URL');
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/graphql`,
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}

export { useQuery, useMutation } from '@apollo/client';

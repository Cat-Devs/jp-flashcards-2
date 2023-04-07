'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import { useApollo } from '../graphql-client';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useApollo();
  return <Provider client={client}>{children}</Provider>;
};

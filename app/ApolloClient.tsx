import { NEXT_PUBLIC_GRAPHQL_API_URL, DEBUG } from '@/lib/config';
import { logHelper } from '@/lib/helpers/log';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { setVerbosity } from 'ts-invariant';

setVerbosity(DEBUG === 'true' ? 'debug' : 'silent');

export const { getClient } = registerApolloClient(() => {
  const uri = `${NEXT_PUBLIC_GRAPHQL_API_URL}/graphql`;
  logHelper('info', 'ApolloClient.tsx uri', uri);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
      fetchOptions: {
        cache: 'default', // https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
        mode: 'same-origin',
      },
    }),
  });
});

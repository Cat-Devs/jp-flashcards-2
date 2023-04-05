'use client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../graphql-client';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const client = useApollo();

  return (
    <ApolloProvider client={client}>
      <main id="Site" className="min-h-screen">
        {children}
      </main>
    </ApolloProvider>
  );
}

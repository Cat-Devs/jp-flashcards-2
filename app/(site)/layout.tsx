import { ApolloProvider } from './ApolloProvider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <main id="Site" className="min-h-screen">
        {children}
      </main>
    </ApolloProvider>
  );
}

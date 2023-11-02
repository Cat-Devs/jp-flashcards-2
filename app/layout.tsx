import './globals.css';

export const metadata = {
  title: 'JP Flashcards',
  description: 'JP Flashcards app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chatbot with Memory',
  description: 'A chatbot that remembers users across sessions using CLAIV Memory.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/providers/app-provider';

const sansFont = { variable: '--font-sans' };
const geistMono = { variable: '--font-geist-mono' };

export const metadata: Metadata = {
  title: 'Secret Spy',
  description: 'Make communication easier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

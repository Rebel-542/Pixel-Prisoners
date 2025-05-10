
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; 
import './globals.css';
import { AppLayout } from '@/components/AppLayout';
import { Toaster } from '@/components/ui/toaster';
import { TrustedContactsProvider } from '@/contexts/TrustedContactsContext';
import { AuthProvider } from '@/contexts/AuthContext'; // Added AuthProvider

const geistSans = Geist({ 
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ 
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Guardian Angel',
  description: 'Your personal safety companion app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="feminine-background-pattern" aria-hidden="true"></div>
        <AuthProvider>
          <TrustedContactsProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </TrustedContactsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

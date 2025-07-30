import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CleanSip | Plastikstrohhalme & klassische Party-Basics online kaufen',
    template: `%s | CleanSip`
  },
  description: 'CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – ohne matschige Alternativen. Versand ab CHF 2.50, gratis ab CHF 50.',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: baseUrl,
    siteName: 'CleanSip',
    title: 'CleanSip | Plastikstrohhalme & klassische Party-Basics',
    description: 'CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – ohne matschige Alternativen. Versand ab CHF 2.50, gratis ab CHF 50.',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'CleanSip - Nie mehr matschige Alternativen'
      }
    ]
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="de" className={GeistSans.variable}>
      <body className="bg-neutral text-secondary selection:bg-primary selection:text-white dark:bg-secondary dark:text-neutral dark:selection:bg-primary dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

import { CartProvider } from 'components/cart/cart-context';
import PerformanceProvider from 'components/dev/PerformanceProvider';
import Navbar from 'components/layout/navbar';
import ScrollToTop from 'components/scroll-to-top';
import { WelcomeToast } from 'components/welcome-toast';
import { inter } from 'lib/fonts';
import { getCart } from 'lib/shopify';
import { performStartupCheck } from 'lib/shopify/validate-config';
import { baseUrl } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

// Perform Shopify configuration check on app startup
const shopifyValidation = performStartupCheck();

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CleanSip | Plastikstrohhalme & klassische Party-Basics online kaufen',
    template: `%s | CleanSip`
  },
  description: 'CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – ohne matschige Alternativen. Versand ab CHF 2.50, gratis ab CHF 50.',
  icons: {
    icon: '/favicon.ico',
  },
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
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = cartId ? getCart(cartId) : Promise.resolve(undefined);

  return (
    <html lang="de" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-neutral text-secondary selection:bg-primary selection:text-white antialiased overflow-x-hidden font-sans">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="relative">
            {children}
            <Toaster 
              closeButton 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  color: '#374151',
                },
              }}
            />
            <WelcomeToast />
          </main>
          <ScrollToTop />
          <PerformanceProvider />
        </CartProvider>
      </body>
    </html>
  );
}

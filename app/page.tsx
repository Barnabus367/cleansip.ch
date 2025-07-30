import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  description:
    'CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – ohne matschige Alternativen. Versand ab CHF 2.50, gratis ab CHF 50.',
  openGraph: {
    type: 'website',
    title: 'CleanSip | Plastikstrohhalme & klassische Party-Basics',
    description: 'CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – ohne matschige Alternativen. Versand ab CHF 2.50, gratis ab CHF 50.'
  }
};

// Coming soon products data
const comingSoonProducts = [
  {
    id: 'PC-50',
    name: 'Classic Party Cups 50er Pack',
    price: '12.90 CHF',
    weight: '500 g',
    icon: '/icons/cups.svg',
    description: 'Stabile Plastikbecher für deine Party'
  },
  {
    id: 'PS-100', 
    name: 'Pro Stirrer 100er Pack',
    price: '5.90 CHF',
    weight: '150 g',
    icon: '/icons/stirrers.svg',
    description: 'Holzfreie Rührstäbchen für jeden Anlass'
  },
  {
    id: 'FB-40',
    name: 'Flex Fork & Knife 40er Kit',
    price: '9.80 CHF',
    weight: '300 g', 
    icon: '/icons/besteck.svg',
    description: 'Kunststoff-Besteck-Kit für unterwegs'
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-neutral py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-6xl">
              CleanSip – Nie mehr matschige Alternativen.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary/80">
              Plastikstrohhalme & klassische Party-Basics. In 48 h bei dir.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/product/cleansip-100"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
              >
                100er-Pack Strohhalme jetzt kaufen
              </Link>
              <Link
                href="#coming-soon"
                className="text-sm font-semibold leading-6 text-secondary hover:text-primary transition-colors"
              >
                Mehr Produkte demnächst <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          
          {/* USP Bullets */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary">100 % Kunststoff-Qualität</h3>
                <p className="mt-2 text-sm text-secondary/70">Kein Aufweichen</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0V6.375a1.5 1.5 0 013 0v12.375zM15.75 18.75a1.5 1.5 0 01-3 0V6.375a1.5 1.5 0 013 0v12.375z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary">Schweizer Lager</h3>
                <p className="mt-2 text-sm text-secondary/70">48-h-Zustellung</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary">Bewährte Hygiene-Standards</h3>
                <p className="mt-2 text-sm text-secondary/70">BPA-frei, lebensmittelecht</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Products */}
      <ThreeItemGrid />
      <Carousel />

      {/* Coming Soon Section */}
      <section id="coming-soon" className="bg-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              Mehr Produkte demnächst
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary/70">
              Neue Produkte? Trag dich ein und erfahre zuerst, wenn Party Cups & Co. live gehen!
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
            {comingSoonProducts.map((product) => (
              <div key={product.id} className="relative group">
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-secondary">Coming Soon</p>
                    <Link 
                      href="/coming-soon"
                      className="mt-2 inline-block text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Benachrichtigung erhalten →
                    </Link>
                  </div>
                </div>
                
                {/* Product Card */}
                <div className="rounded-lg border border-neutral/20 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4">
                    <Image
                      src={product.icon}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="opacity-50"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary text-center">{product.name}</h3>
                  <p className="mt-2 text-sm text-secondary/70 text-center">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-secondary/50">{product.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

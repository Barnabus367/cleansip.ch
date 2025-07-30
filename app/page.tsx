import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Suspense } from 'react';
import { getProducts } from 'lib/shopify';
import { FEATURE_FLAGS } from 'lib/constants';

export default async function HomePage() {
  // Get products for different sections
  const products = await getProducts({});
  console.log(`Using ${products.length} products from Shopify for homepage`);
  
  // Filter featured products (only show enabled categories)
  const featuredProducts = products.filter(product => {
    // For now, show all products since we only have Strohhalme active
    return FEATURE_FLAGS.SHOW_STROHHALME;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral via-white to-gray-50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            {/* Hero Content */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary mb-8">
              Nie mehr{' '}
              <span className="text-primary">
                matschige
              </span>{' '}
              Alternativen
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl md:text-2xl text-secondary/80 font-medium mb-12">
              CleanSip liefert dir bewährte Kunststoff-Trinkhalme und mehr – 
              ohne Kompromisse bei Qualität und Funktionalität.
            </p>
            
            {/* Quality indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-base text-secondary/70 mb-16">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Premium Qualität</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="font-medium">Schneller Versand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="font-medium">Gratis ab CHF 50</span>
              </div>
            </div>
            
            {/* Featured Product Preview */}
            {featuredProducts.length > 0 && (
              <div className="mx-auto max-w-lg">
                <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
                  <div className="aspect-square mb-6 flex items-center justify-center">
                    <img
                      src={featuredProducts[0]?.featuredImage?.url || '/placeholder-straw.jpg'}
                      alt={featuredProducts[0]?.title || 'Featured Product'}
                      className="h-48 w-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {featuredProducts[0]?.title}
                    </h3>
                    <p className="text-secondary/70 mb-4 text-sm">
                      Bewährte Qualität, die funktioniert
                    </p>
                    <div className="inline-flex items-center rounded-2xl bg-primary px-6 py-3 text-lg font-bold text-white shadow-lg">
                      Ab CHF {featuredProducts[0]?.priceRange?.minVariantPrice?.amount || '2.50'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Unsere Produkte
            </h2>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Entdecken Sie unsere hochwertigen Kunststoff-Trinkhalme in verschiedenen Farben und Größen
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          }>
            <ThreeItemGrid />
          </Suspense>
          
          <Suspense fallback={
            <div className="mt-12">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          }>
            <Carousel />
          </Suspense>
        </div>
      </section>
    </>
  );
}

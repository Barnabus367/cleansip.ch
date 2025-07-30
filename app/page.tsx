import ProductCard from 'components/ProductCard';
import { FEATURE_FLAGS } from 'lib/constants';
import { getFallbackProducts, processShopifyProducts } from 'lib/product-utils';
import { getProducts } from 'lib/shopify';
import type { Metadata } from 'next';
import Link from 'next/link';

// SEO and Performance metadata
export const metadata: Metadata = {
  title: 'CleanSip | Nie mehr matschige Alternativen zu Plastikstrohhalmen',
  description: 'Premium Plastikstrohhalme für Gastronomie und Events. BPA-frei, lebensmittelecht. Schnelle Lieferung in der ganzen Schweiz. Jetzt bestellen!',
  openGraph: {
    title: 'CleanSip | Nie mehr matschige Alternativen',
    description: 'Premium Plastikstrohhalme für Gastronomie und Events',
    images: [{ url: '/og-homepage.jpg', width: 1200, height: 630 }]
  }
};

export default async function HomePage() {
  // Get products for different sections
  const products = await getProducts({});
  console.log(`Using ${products.length} products from Shopify for homepage`);
  
  // Filter featured products (only show enabled categories)
  const featuredProducts = products.filter(product => {
    // For now, show all products since we only have Strohhalme active
    return FEATURE_FLAGS.SHOW_STROHHALME;
  });

  // Process Shopify products or use fallback
  const processedProducts = featuredProducts.length > 0 
    ? processShopifyProducts(featuredProducts, 3)
    : getFallbackProducts();

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      <main id="main-content">
        {/* Hero Section - Pixel-perfect Swiss Design */}
        <section className="relative min-h-screen bg-white overflow-hidden" aria-labelledby="hero-heading">
          {/* Two-Column Grid Layout */}
          <div className="grid lg:grid-cols-2 min-h-screen max-w-[1600px] mx-auto">
          
          {/* Left Column - Typography Focus */}
          <div className="relative px-6 lg:px-12 flex flex-col justify-center">
            
            {/* Small Intro - Swiss Typography Style */}
            <div className="absolute top-16 lg:top-24 left-6 lg:left-12">
              <p className="text-xs tracking-[0.3em] text-[#003B46] font-light uppercase">
                Nie mehr
              </p>
            </div>
            
            {/* Main Typography Composition */}
            <div className="relative space-y-2 lg:space-y-4">
              
              {/* Primary Typography - Exact Specifications */}
              <h1 className="leading-none" id="hero-heading">
                <span className="block text-7xl lg:text-7xl font-normal tracking-[-0.02em] text-[#003B46]">
                  MATSCHIGE
                </span>
                <span className="block text-8xl lg:text-8xl font-extrabold tracking-[-0.03em] text-[#003B46] -mt-2">
                  ALTERNATIVEN
                </span>
              </h1>
              <div className="grid grid-cols-8 gap-4 mt-8 lg:mt-12">
                <div className="col-span-6 lg:col-span-4">
                  <p className="text-xs lg:text-sm text-[#003B46]/60 leading-relaxed font-light">
                    CleanSip liefert Premium-Plastikstrohhalme für anspruchsvolle Event-Planer und Gastronomen in der Schweiz.
                  </p>
                </div>
              </div>
              
            </div>
            
            {/* Product Details Grid */}
            <div className="absolute bottom-16 lg:bottom-24 left-6 lg:left-12 right-6 lg:right-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] text-[#003B46]/40 uppercase mb-1">Menge</p>
                  <p className="text-xs font-medium text-[#003B46]">100 Stück</p>
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] text-[#003B46]/40 uppercase mb-1">Preis</p>
                  <p className="text-xs font-medium text-[#003B46]">{processedProducts[0]?.price || 'CHF 14.90'}</p>
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] text-[#003B46]/40 uppercase mb-1">Material</p>
                  <p className="text-xs font-medium text-[#003B46]">BPA-frei</p>
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] text-[#003B46]/40 uppercase mb-1">Lieferung</p>
                  <p className="text-xs font-medium text-[#003B46]">48h</p>
                </div>
              </div>
              
              {/* Minimal CTA */}
              <div className="mt-8 lg:mt-12">
                <Link 
                  href="/search/strohhalme"
                  className="group inline-block"
                >
                  <div className="bg-[#003B46] text-white px-8 py-3 hover:bg-[#00BFA6] transition-colors duration-500">
                    <span className="text-xs tracking-[0.15em] font-medium uppercase">
                      Jetzt bestellen
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Side - Abstract Geometric Visualization */}
          <div className="col-span-12 lg:col-span-5 row-span-12 relative overflow-hidden">
            
            {/* Background Color Block */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6]/5 to-[#FFD54F]/5"></div>
            
            {/* Abstract Straw Lines - Geometric Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                
                {/* Vertical Lines - Representing Straws */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#003B46]/10 hover:bg-[#00BFA6]/20 transition-colors duration-700"
                    style={{
                      width: '1px',
                      height: `${60 + i * 3}%`,
                      left: `${15 + i * 6}%`,
                      top: `${10 + (i % 3) * 15}%`,
                      transform: `rotate(${-2 + i * 0.5}deg)`,
                    }}
                  />
                ))}
                
                {/* Accent Lines */}
                <div className="absolute top-1/4 left-1/4 w-24 h-px bg-[#FFD54F] opacity-60"></div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-px bg-[#00BFA6] opacity-40"></div>
                
                {/* Swiss Cross Reference */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-px h-8 bg-[#003B46]/20"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-[#003B46]/20"></div>
                </div>
                
              </div>
            </div>
            
            {/* Large Typography Element - Vertical */}
            <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2">
              <div className="writing-mode-vertical text-[#003B46]/5 text-6xl lg:text-8xl font-black tracking-wider">
                CLEAN
              </div>
            </div>
            
            {/* Grid Reference Lines */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-[#003B46]"></div>
                ))}
              </div>
            </div>
            
          </div>
          
        </div>
        
        {/* Subtle Brand Elements */}
        <div className="absolute top-6 lg:top-8 right-6 lg:right-8">
          <div className="w-2 h-2 bg-[#00BFA6] opacity-60"></div>
        </div>
        
        <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8">
          <div className="w-px h-8 bg-[#003B46]/20"></div>
        </div>
        
      </section>

      {/* Products Section - Responsive Cards */}
      <section id="products" className="relative min-h-screen bg-white overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003B46] mb-4">
              Unsere Produkte
            </h2>
            <p className="text-lg text-[#003B46]/60 max-w-2xl">
              Premium-Strohhalme für professionelle Anwendungen
            </p>
          </div>
        </div>
        
        {/* Mobile Horizontal Scroll Container */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 px-4 pb-8 scrollbar-hide">
            {processedProducts.map((product) => (
              <div key={product.id} className="flex-none w-80 snap-start">
                <ProductCard
                  title={product.title}
                  subtitle={product.subtitle}
                  info={product.description}
                  price={product.price}
                  accentColor={product.accentColor}
                  href={`/product/${product.handle}`}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="hidden lg:block max-w-[1600px] mx-auto px-12 pb-24">
          <div className="grid grid-cols-3 gap-8">
            {processedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                subtitle={product.subtitle}
                info={product.description}
                price={product.price}
                accentColor={product.accentColor}
                href={`/product/${product.handle}`}
              />
            ))}
          </div>
        </div>

      </section>
      </main>
    </>
  );
}

import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { FEATURE_FLAGS } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';

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
      <section className="relative min-h-screen overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6] via-[#003B46] to-[#FFD54F] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#003B46]/50 via-transparent to-[#00BFA6]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F]/20 via-transparent to-[#00BFA6]/40"></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* Left Side - Content */}
            <div className="text-left lg:pr-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
                Nie mehr{' '}
                <span className="block text-[#FFD54F] font-extrabold drop-shadow-lg">
                  matschige
                </span>{' '}
                <span className="block text-white/90">
                  Alternativen
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 leading-relaxed max-w-xl">
                CleanSip liefert dir bewährte Kunststoff-Trinkhalme – 
                <span className="text-[#FFD54F] font-semibold"> ohne Kompromisse</span> bei Qualität und Funktionalität.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a 
                  href="/search/strohhalme" 
                  className="inline-block bg-white text-[#003B46] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Jetzt entdecken
                </a>
                <a 
                  href="#products" 
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#003B46] transition-all duration-300 text-center"
                >
                  Mehr erfahren
                </a>
              </div>

              {/* Trust Badges with Glassmorphism */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#FFD54F] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#003B46]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm">Premium Qualität</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#00BFA6] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm">Schneller Versand</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#FFD54F] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#003B46]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm">Gratis ab CHF 50</p>
                </div>
              </div>
            </div>

            {/* Right Side - Product Visualization */}
            <div className="relative lg:pl-8">
              {featuredProducts.length > 0 && (
                <div className="relative">
                  {/* Organic Blob Shape with Clipping Mask */}
                  <div className="relative w-full max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full transform rotate-12 scale-110"></div>
                    <div className="absolute inset-4 bg-white/30 backdrop-blur-md transform -rotate-6 scale-105"
                         style={{
                           clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                         }}>
                    </div>
                    
                    {/* Main Product Container with Organic Shape */}
                    <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl p-12 transform hover:scale-105 transition-all duration-500"
                         style={{
                           clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                         }}>
                      
                      {/* Product Image */}
                      <div className="relative aspect-square flex items-center justify-center mb-6">
                        <img
                          src={featuredProducts[0]?.featuredImage?.url || '/placeholder-straw.jpg'}
                          alt={featuredProducts[0]?.title || 'Featured Product'}
                          className="h-64 w-full object-contain filter drop-shadow-2xl"
                        />
                        
                        {/* Floating Price Badge */}
                        <div className="absolute -top-4 -right-4 bg-[#FFD54F] text-[#003B46] px-4 py-2 rounded-full font-black text-sm shadow-xl transform rotate-12">
                          Ab CHF {featuredProducts[0]?.priceRange?.minVariantPrice?.amount || '2.50'}
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="text-center">
                        <h3 className="text-2xl font-black text-[#003B46] mb-2">
                          {featuredProducts[0]?.title}
                        </h3>
                        <p className="text-[#003B46]/70 font-medium text-sm mb-4">
                          Bewährte Qualität, die funktioniert
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -left-8 w-16 h-16 bg-[#FFD54F]/30 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#00BFA6]/20 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 -left-12 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-white py-16">
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

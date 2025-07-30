import { FEATURE_FLAGS } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function HomePage() {
  // Get products for different sections
  const products = await getProducts({});
  console.log(`Using ${products.length} products from Shopify for homepage`);
  
  // Simulate loading state for dramatic effect
  const loading = false;
  
  // Filter featured products (only show enabled categories)
  const featuredProducts = products.filter(product => {
    // For now, show all products since we only have Strohhalme active
    return FEATURE_FLAGS.SHOW_STROHHALME;
  });

  return (
    <>
      {/* Hero Section - Awwwards-worthy Swiss Design */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* CSS Grid Layout Container */}
        <div className="grid grid-cols-12 grid-rows-12 min-h-screen max-w-[1600px] mx-auto">
          
          {/* Left Side - Typography Focus */}
          <div className="col-span-12 lg:col-span-7 row-span-12 relative px-6 lg:px-12 flex flex-col justify-center">
            
            {/* Small Intro - Swiss Typography Style */}
            <div className="absolute top-16 lg:top-24 left-6 lg:left-12">
              <p className="text-[0.75rem] tracking-[0.3em] text-[#003B46] font-light uppercase">
                Nie mehr
              </p>
            </div>
            
            {/* Main Typography Composition */}
            <div className="relative space-y-4 lg:space-y-6">
              
              {/* Primary Word - Extreme Scale */}
              <h1 className="leading-none">
                <span className="block text-[8vw] lg:text-[6.5vw] xl:text-[7rem] font-thin tracking-[-0.02em] text-[#003B46]">
                  MATSCHIGE
                </span>
                <span className="block text-[10vw] lg:text-[8vw] xl:text-[9rem] font-black tracking-[-0.03em] text-[#003B46] -mt-2">
                  ALTERNATIVEN
                </span>
              </h1>
              
              {/* Accent Text Block */}
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
                  <p className="text-xs font-medium text-[#003B46]">CHF {featuredProducts[0]?.priceRange?.minVariantPrice?.amount || '14.90'}</p>
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

      {/* Products Section - Brutalist Experimental Design */}
      <section id="products" className="relative min-h-screen bg-white overflow-hidden">
        
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, #003B46 0, #003B46 1px, transparent 1px, transparent 80px),
                             repeating-linear-gradient(0deg, #003B46 0, #003B46 1px, transparent 1px, transparent 80px)`
          }}/>
        </div>
        
        {/* Revolutionary Grid Layout */}
        <div className="relative z-10 grid grid-cols-7 grid-rows-8 min-h-screen max-w-[1800px] mx-auto">
          
          {/* Vertical Typography Header */}
          <div className="col-span-1 row-span-8 flex items-center justify-start pl-6 lg:pl-12">
            <div className="writing-vertical-rl text-[#003B46] text-2xl lg:text-3xl font-black tracking-[0.2em] uppercase">
              Unsere Produkte
            </div>
          </div>
          
          {/* Experimental Product Grid Container */}
          <div className="col-span-6 row-span-6 relative px-6 lg:px-12 py-16 lg:py-24">
            
            {/* Brutalist Product Grid Wrapper - Force Transformations */}
            <div className="brutal-product-container relative h-full">
              <Suspense fallback={
                <div className="grid grid-cols-7 gap-0 h-full">
                  {/* Fallback with experimental layout */}
                  <div className="col-span-3 row-span-3 bg-black transform -rotate-3 -mt-20"></div>
                  <div className="col-span-2 bg-gray-200 transform rotate-2"></div>
                  <div className="col-span-2 bg-gray-300 transform -rotate-1"></div>
                </div>
              }>
                <div className="grid grid-cols-7 gap-8 lg:gap-12 h-full">
                  
                  {/* Grid positioning wrapper for ThreeItemGrid */}
                  <div className="col-span-7 relative">
                    {/* Brutalist Product Cards replacing ThreeItemGrid */}
                    <div className="brutalist-product-grid relative w-full h-full min-h-[600px]">
                      
                      {/* Product Card 1 - Large Tilted */}
                      <div className="absolute top-0 left-0 w-80 h-96 bg-black text-white p-8 transform -rotate-3 shadow-[20px_20px_0px_#00BFA6] hover:shadow-[25px_25px_0px_#FFD54F] transition-all duration-700 cursor-pointer z-30 hover:scale-105">
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">Strohhalme Classic</h3>
                            <p className="text-sm opacity-80 mb-4">Premium Plastikstrohhalme für jede Gelegenheit</p>
                            <div className="text-xs font-mono opacity-60">100 Stück • BPA-frei</div>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-3xl font-black">CHF 14.90</span>
                            <div className="w-8 h-8 bg-white transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      {/* Product Card 2 - Medium Right */}
                      <div className="absolute top-16 right-40 w-64 h-80 bg-[#00BFA6] text-black p-6 transform rotate-2 shadow-[15px_15px_0px_black] hover:shadow-[20px_20px_0px_#FFD54F] transition-all duration-700 cursor-pointer z-20 hover:scale-105">
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-black mb-3 uppercase tracking-wide">Premium Set</h3>
                            <p className="text-sm mb-3">Hochwertige Qualität für Events</p>
                            <div className="text-xs font-mono opacity-70">200 Stück • Premium</div>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-2xl font-black">CHF 19.90</span>
                            <div className="w-6 h-6 bg-black transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      {/* Product Card 3 - Small Bottom */}
                      <div className="absolute bottom-24 left-32 w-52 h-64 bg-white border-4 border-black text-black p-4 transform -rotate-1 shadow-[12px_12px_0px_#FFD54F] hover:shadow-[15px_15px_0px_#00BFA6] transition-all duration-700 cursor-pointer z-40 hover:scale-105">
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-black mb-2 uppercase tracking-wide">Deluxe Pack</h3>
                            <p className="text-xs mb-2">Exklusive Serie</p>
                            <div className="text-xs font-mono opacity-60">500 Stück • Deluxe</div>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-xl font-black">CHF 24.90</span>
                            <div className="w-4 h-4 bg-black transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      {/* Product Card 4 - Long Horizontal */}
                      <div className="absolute bottom-0 right-0 w-96 h-32 bg-[#FFD54F] text-black p-4 transform rotate-1 shadow-[10px_10px_0px_black] hover:shadow-[15px_15px_0px_#00BFA6] transition-all duration-700 cursor-pointer z-10 hover:scale-105">
                        <div className="h-full flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-black uppercase tracking-wide">Party Mega Set</h3>
                            <p className="text-xs opacity-80">1000 Stück + Extras</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black">CHF 39.90</span>
                            <div className="w-6 h-6 bg-black mt-2 ml-auto transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      {/* Abstract Floating Elements */}
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-black transform rotate-45 opacity-10"></div>
                      <div className="absolute top-1/4 right-1/4 w-2 h-32 bg-[#00BFA6] transform -rotate-12 opacity-30"></div>
                      <div className="absolute bottom-1/3 left-1/4 w-24 h-2 bg-black opacity-20"></div>
                      <div className="absolute top-3/4 right-1/2 w-8 h-8 border-4 border-[#FFD54F] transform rotate-12"></div>

                      {/* Typography Element */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="text-[#003B46] text-8xl font-black opacity-3 transform -rotate-12 whitespace-nowrap select-none">
                          CLEAN
                        </div>
                      </div>

                    </div>
                  </div>
                  
                </div>
              </Suspense>
            </div>
            
          </div>
          
          {/* Minimal Product List replacing Carousel */}
          <div className="col-span-6 col-start-2 row-span-2 flex items-center px-6 lg:px-12">
            
            <Suspense fallback={
              <div className="w-full">
                <div className="h-px bg-[#003B46] w-full mb-8"></div>
                <div className="flex gap-16 text-xs font-mono uppercase tracking-wider">
                  <span>Loading...</span>
                </div>
              </div>
            }>
              {/* Product Text Ticker */}
              <div className="w-full group">
                
                {/* Horizontal Line */}
                <div className="h-px bg-[#003B46] w-full mb-8"></div>
                
                {/* Product Names as Text Ticker */}
                <div className="flex gap-16 lg:gap-24 text-xs lg:text-sm font-mono uppercase tracking-wider text-[#003B46]">
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Strohhalme Classic</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 14.90
                    </div>
                  </div>
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Strohhalme Premium</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 19.90
                    </div>
                  </div>
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Strohhalme Deluxe</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 24.90
                    </div>
                  </div>
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Party Pack</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 39.90
                    </div>
                  </div>
                </div>
                
                {/* Second Line for more products */}
                <div className="flex gap-16 lg:gap-24 text-xs lg:text-sm font-mono uppercase tracking-wider text-[#003B46] mt-6">
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Rührstäbchen</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 12.90
                    </div>
                  </div>
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Besteck Set</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 29.90
                    </div>
                  </div>
                  <div className="relative cursor-pointer hover:text-[#00BFA6] transition-colors duration-300">
                    <span>Spezial Edition</span>
                    <div className="absolute -top-6 left-0 text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                      CHF 49.90
                    </div>
                  </div>
                </div>
                
              </div>
            </Suspense>
            
          </div>
          
        </div>
        
        {/* Geometric Accent Elements */}
        <div className="absolute top-24 right-12 w-4 h-4 bg-[#00BFA6] transform rotate-45"></div>
        <div className="absolute bottom-24 left-24 w-px h-16 bg-[#003B46]"></div>
        <div className="absolute bottom-32 right-32 w-8 h-px bg-[#003B46]"></div>
        
      </section>
    </>
  );
}

import CleanSipDifferenceSection from 'components/CleanSipDifferenceSection';
import HeroSection from 'components/HeroSection';
import ProductsSection from 'components/ProductsSection';
import RevolutionaryProblemSolutionSection from 'components/RevolutionaryProblemSolutionSection';
import TestimonialsSection from 'components/TestimonialsSection';
import TrustSection from 'components/TrustSection';
import UseCasesSection from 'components/UseCasesSection';
import { FEATURE_FLAGS } from 'lib/constants';
import { getFallbackProducts, processShopifyProducts } from 'lib/product-utils';
import { getProducts } from 'lib/shopify';
import type { Metadata } from 'next';

// Revolutionary SEO for rebellious positioning
export const metadata: Metadata = {
  title: 'CleanSip | SCHLUSS MIT PAPIERMATSCH - Nie wieder matschige Strohhalme!',
  description: 'Endlich wieder Strohhalme, die nicht nach 30 Sekunden aufweichen! Premium Plastikstrohhalme für alle, die keine Kompromisse eingehen. Warum Pappe kauen, wenn es auch stabil geht?',
  openGraph: {
    title: 'SCHLUSS MIT PAPIERMATSCH | CleanSip Revolution',
    description: 'Über 2.800 Schweizer haben bereits gewechselt. Schlürfen statt kämpfen!',
    images: [{ url: '/og-revolution.jpg', width: 1200, height: 630 }]
  },
  keywords: 'Plastikstrohhalme, stabile Strohhalme, Papierstrohhalm Alternative, CleanSip, Schweiz, BPA-frei, matschige Strohhalme'
};

export default async function HomePage() {
  // Get products for different sections
  const products = await getProducts({});
  console.log(`Using ${products.length} products from Shopify for homepage`);
  
  // Filter featured products (only show enabled categories) - Data Binding
  const featuredProducts = products.filter(product => {
    // For now, show all products since we only have Strohhalme active
    return FEATURE_FLAGS.SHOW_STROHHALME;
  });

  // Process Shopify products or use fallback - Backend-Konsistenz
  // Since we have only 1 product type (Strohhalme), create 3 color variations
  const processedProducts = featuredProducts.length > 0 
    ? processShopifyProducts(featuredProducts, 3) // Create 3 variations from 1 product
    : getFallbackProducts();

  // Extract featured price for Hero (use first product)
  const featuredPrice = processedProducts[0]?.price || 'CHF 9.90';
  
  // Extract featured image for Hero (use first product's image if available)
  const featuredImage = processedProducts[0]?.featuredImage;

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      <main id="main-content">
        {/* Revolutionary Hero Section - Rebellious storytelling */}
        <HeroSection 
          featuredPrice={featuredPrice} 
          featuredImage={featuredImage}
        />
        
        {/* NEW: CleanSip Difference Section - Emotional positioning */}
        <CleanSipDifferenceSection />
        
        {/* Revolutionary Problem/Solution Section - Split-screen drama */}
        <RevolutionaryProblemSolutionSection />
        
        {/* Trust & Benefits Section - Enhanced with Swiss quality */}
        <TrustSection />
        
        {/* Products Section - Enhanced with emotional appeals */}
        <ProductsSection featuredProducts={processedProducts} />
        
        {/* Use Cases Section - Professional applications */}
        <UseCasesSection />
        
        {/* Testimonials Section - Emotional customer stories */}
        <TestimonialsSection />
      </main>
    </>
  );
}
import HeroSection from 'components/HeroSection';
import ProblemSolutionSection from 'components/ProblemSolutionSection';
import ProductsSection from 'components/ProductsSection';
import TestimonialsSection from 'components/TestimonialsSection';
import TrustSection from 'components/TrustSection';
import UseCasesSection from 'components/UseCasesSection';
import { FEATURE_FLAGS } from 'lib/constants';
import { getFallbackProducts, processShopifyProducts } from 'lib/product-utils';
import { getProducts } from 'lib/shopify';
import type { Metadata } from 'next';

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
        {/* Hero Section - Awwwards-worthy 3D experience */}
        <HeroSection 
          featuredPrice={featuredPrice} 
          featuredImage={featuredImage}
        />
        
        {/* Trust & Benefits Section - Professional trust indicators */}
        <TrustSection />
        
        {/* Problem/Solution Section - Clear value proposition */}
        <ProblemSolutionSection />
        
        {/* Products Section - Enhanced with stock indicators */}
        <ProductsSection featuredProducts={processedProducts} />
        
        {/* Use Cases Section - Professional applications */}
        <UseCasesSection />
        
        {/* Testimonials Section - Customer social proof */}
        <TestimonialsSection />
      </main>
    </>
  );
}
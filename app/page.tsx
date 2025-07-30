import HeroSection from 'components/HeroSection';
import ProductsSection from 'components/ProductsSection';
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
  const processedProducts = featuredProducts.length > 0 
    ? processShopifyProducts(featuredProducts, 3)
    : getFallbackProducts();

  // Extract featured price for Hero
  const featuredPrice = processedProducts[0]?.price || 'CHF 14.90';

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      <main id="main-content">
        {/* Hero Section - Modularisiert mit klaren Tailwind-Klassen */}
        <HeroSection featuredPrice={featuredPrice} />
        
        {/* Products Section - Map über featuredProducts für Backend-Konsistenz */}
        <ProductsSection featuredProducts={processedProducts} />
      </main>
    </>
  );
}
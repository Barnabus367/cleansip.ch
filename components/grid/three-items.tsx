import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function BentoGridItem({
  item,
  priority,
  size = 'medium',
  badge,
  featured = false
}: {
  item: Product;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large' | 'tall' | 'wide';
  badge?: 'neu' | 'bestseller' | null;
  featured?: boolean;
}) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
    tall: 'col-span-1 row-span-3',
    wide: 'col-span-2 row-span-1'
  };

  const stockLevel = Math.floor(Math.random() * 100); // Mock stock level
  const stockPercentage = (stockLevel / 100) * 100;
  const stockColor = stockLevel > 70 ? 'bg-green-500' : stockLevel > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className={`group ${sizeClasses[size]} relative`}>
      <Link
        className="block h-full focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 rounded-3xl"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        {/* Main Card with Gradient Border and Tilt Effect */}
        <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1 shadow-lg hover:shadow-2xl card-tilt ${
          featured 
            ? 'bg-gradient-to-br from-primary/10 via-white to-accent/5' 
            : 'bg-white'
        }`}>
          
          {/* Rotating Gradient Border */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary p-[2px] animate-gradient">
              <div className="h-full w-full rounded-3xl bg-white"></div>
            </div>
          </div>

          {/* Bestseller Glow Effect */}
          {badge === 'bestseller' && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-pulse -z-10"></div>
          )}

          {/* Content Container */}
          <div className="relative h-full p-6 flex flex-col">
            
            {/* Badge */}
            {badge && (
              <div className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-bold text-white rounded-full transform rotate-12 shadow-xl z-20 ${
                badge === 'neu' 
                  ? 'bg-gradient-to-r from-accent to-yellow-400 animate-bounce' 
                  : 'bg-gradient-to-r from-primary to-primary-600'
              }`}>
                {badge === 'neu' ? 'NEU' : 'BESTSELLER'}
              </div>
            )}

            {/* Stock Level Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-3xl overflow-hidden">
              <div 
                className={`h-full ${stockColor} transition-all duration-500`}
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>

            {/* Product Image Container */}
            <div className={`flex-1 relative flex items-center justify-center mb-4 rounded-2xl overflow-hidden ${
              size === 'large' ? 'mb-6' : 'mb-4'
            }`}>
              
              {/* Primary Image */}
              <img
                src={item.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={item.title}
                className={`object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-110 ${
                  size === 'large' ? 'h-48 max-w-full' : 'h-32 max-w-full'
                }`}
                loading={priority ? 'eager' : 'lazy'}
              />
              
              {/* Secondary Image (appears on hover) */}
              <img
                src={item.images?.[1]?.url || item.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={`${item.title} - Alternative view`}
                className={`absolute inset-0 object-contain opacity-0 scale-95 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 ${
                  size === 'large' ? 'h-48 max-w-full' : 'h-32 max-w-full'
                }`}
              />

              {/* Category Pills */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full backdrop-blur-sm shadow-sm">
                  Eco
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-accent/90 text-white rounded-full backdrop-blur-sm shadow-sm">
                  Premium
                </span>
              </div>

              {/* Floating Price Tag */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/90 backdrop-blur-md border border-white/20 text-secondary px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  CHF {item.priceRange.minVariantPrice.amount}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="relative">
              <h3 className={`font-bold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 ${
                size === 'large' ? 'text-xl' : 'text-lg'
              }`}>
                {item.title}
              </h3>
              
              {size === 'large' && (
                <p className="text-sm text-secondary/60 mb-4 line-clamp-2">
                  Premium Qualität für höchste Ansprüche. Bewährt und zuverlässig in jeder Situation.
                </p>
              )}
              
              {/* Price Display */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-secondary">
                  Ab CHF {item.priceRange.minVariantPrice.amount}
                </div>
                {stockLevel < 20 && (
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
                    Nur noch {stockLevel} verfügbar
                  </span>
                )}
              </div>

              {/* Quick-View Button (slides from bottom) */}
              <div className="absolute -bottom-16 left-0 right-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-all duration-500 transform translate-y-4">
                <button className="w-full bg-secondary text-white py-3 rounded-xl font-semibold text-sm hover:bg-secondary-600 transition-colors duration-200 shadow-xl backdrop-blur-sm border border-white/10">
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Loading Skeleton Component
function BentoGridSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-6 min-h-[800px]">
        {/* Featured Large Card */}
        <div className="col-span-1 md:col-span-2 row-span-2 rounded-3xl overflow-hidden">
          <div className="h-full animate-skeleton"></div>
        </div>
        
        {/* Medium Cards */}
        <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden">
          <div className="h-full animate-skeleton"></div>
        </div>
        
        <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden">
          <div className="h-full animate-skeleton"></div>
        </div>
        
        <div className="col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden">
          <div className="h-full animate-skeleton"></div>
        </div>
        
        <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden">
          <div className="h-full animate-skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Try to get products from Shopify, fallback to mock data
  let homepageItems: Product[] = [];
  
  try {
    // First try: Collections that start with `hidden-*` are hidden from the search page.
    homepageItems = await getCollectionProducts({
      collection: 'hidden-homepage-featured-items'
    });
  } catch (error) {
    console.log('No featured collection found, trying to get all products');
  }

  // If no featured collection, try to get all available products
  if (!homepageItems.length) {
    try {
      const { getProducts } = await import('lib/shopify');
      const allProducts = await getProducts({});
      homepageItems = allProducts.slice(0, 6); // Take first 6 products for better grid
      console.log(`Using ${homepageItems.length} products from Shopify for homepage`);
    } catch (error) {
      console.log('Shopify unavailable, using mock products for homepage');
    }
  }

  // If still no products, use mock data
  if (!homepageItems.length) {
    homepageItems = mockProducts;
  }

  // Ensure we have at least 6 products by duplicating if necessary
  while (homepageItems.length < 6 && mockProducts.length > 0) {
    homepageItems.push(mockProducts[homepageItems.length % mockProducts.length]!);
  }

  // Show loading skeleton if no products
  if (!homepageItems.length) {
    return <BentoGridSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Modern Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-6 min-h-[800px]">
        
        {/* Featured Large Product - spans 2x2 */}
        <BentoGridItem 
          item={homepageItems[0]!} 
          priority={true} 
          size="large"
          badge="bestseller"
          featured={true}
        />
        
        {/* Tall Product - spans 1x2 */}
        <BentoGridItem 
          item={homepageItems[1]!} 
          priority={true} 
          size="medium"
          badge="neu"
        />
        
        {/* Small Product - spans 1x1 */}
        <BentoGridItem 
          item={homepageItems[2]!} 
          size="small"
        />
        
        {/* Wide Product - spans 2x1 */}
        <BentoGridItem 
          item={homepageItems[3]!} 
          size="wide"
        />
        
        {/* Another Small Product - spans 1x1 */}
        <BentoGridItem 
          item={homepageItems[4]!} 
          size="small"
        />
        
        {/* Final Product if available */}
        {homepageItems[5] && (
          <BentoGridItem 
            item={homepageItems[5]} 
            size="small"
          />
        )}
      </div>
    </div>
  );
}

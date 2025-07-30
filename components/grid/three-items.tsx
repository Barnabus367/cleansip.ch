import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  priority,
  size = 'medium',
  badge
}: {
  item: Product;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large';
  badge?: 'neu' | 'bestseller' | null;
}) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1',
    large: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
  };

  const aspectClasses = {
    small: 'aspect-square',
    medium: 'aspect-[4/3] md:aspect-square',
    large: 'aspect-square'
  };

  return (
    <div className={`group ${sizeClasses[size]} relative`}>
      <Link
        className="block h-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        {/* Main Card with Gradient Border */}
        <div className="relative h-full bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl border-2 border-transparent bg-clip-padding shadow-sm hover:shadow-2xl transition-all duration-500 p-6 group-hover:scale-[1.02] overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div className="h-full w-full rounded-3xl bg-white"></div>
          </div>

          {/* Badge */}
          {badge && (
            <div className={`absolute -top-1 -right-1 px-3 py-1 text-xs font-bold text-white rounded-full transform rotate-12 shadow-lg z-10 ${
              badge === 'neu' ? 'bg-gradient-to-r from-accent to-yellow-400' : 'bg-gradient-to-r from-primary to-primary-600'
            }`}>
              {badge === 'neu' ? 'NEU' : 'BESTSELLER'}
            </div>
          )}

          <div className={`h-full flex flex-col ${aspectClasses[size]}`}>
            {/* Product Image Container with Dual Image Effect */}
            <div className="flex-1 relative flex items-center justify-center mb-4 overflow-hidden rounded-2xl">
              {/* Primary Image */}
              <img
                src={item.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={item.title}
                className="max-h-32 w-full object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
              />
              
              {/* Secondary Image (appears on hover) */}
              <img
                src={item.images?.[1]?.url || item.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={`${item.title} - Alternative view`}
                className="absolute inset-0 max-h-32 w-full object-contain opacity-0 scale-95 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />

              {/* Product Tags */}
              <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full backdrop-blur-sm">
                  Eco
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full backdrop-blur-sm">
                  Premium
                </span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="text-center relative">
              <h3 className="font-extrabold text-lg text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-secondary/60 mb-3">
                Premium Qualität, bewährt
              </p>
              
              {/* Price Badge with Glassmorphism */}
              <div className="relative inline-block">
                <div className="bg-gradient-to-r from-primary to-primary-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20">
                  Ab CHF {item.priceRange.minVariantPrice.amount}
                </div>
              </div>

              {/* Quick Add Button - appears on hover */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                <button className="bg-secondary text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-secondary-600 transition-colors duration-200 shadow-xl backdrop-blur-sm border border-white/10">
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
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
      homepageItems = allProducts.slice(0, 3); // Take first 3 products
      console.log(`Using ${homepageItems.length} products from Shopify for homepage`);
    } catch (error) {
      console.log('Shopify unavailable, using mock products for homepage');
    }
  }

  // If still no products, use mock data
  if (!homepageItems.length) {
    homepageItems = mockProducts;
  }

  // Ensure we have at least 3 products by duplicating if necessary
  while (homepageItems.length < 3 && mockProducts.length > 0) {
    homepageItems.push(mockProducts[0]!);
  }

  const firstProduct = homepageItems[0]!;
  const secondProduct = homepageItems[1]!;
  const thirdProduct = homepageItems[2]!;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-6 min-h-[600px] md:min-h-[500px]">
        <ThreeItemGridItem 
          item={firstProduct} 
          priority={true} 
          size="large"
          badge="bestseller"
        />
        <ThreeItemGridItem 
          item={secondProduct} 
          priority={true} 
          size="small"
          badge="neu"
        />
        <ThreeItemGridItem 
          item={thirdProduct} 
          size="medium"
        />
      </div>
    </div>
  );
}

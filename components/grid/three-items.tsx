import { GridTileImage } from 'components/grid/tile';
import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  priority
}: {
  item: Product;
  priority?: boolean;
}) {
  return (
    <div className="group">
      <Link
        className="block"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <div className="aspect-square bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 hover:border-primary/20">
          <div className="h-full flex flex-col">
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center mb-4">
              <img
                src={item.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={item.title}
                className="max-h-32 w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Product Info */}
            <div className="text-center">
              <h3 className="font-bold text-lg text-secondary mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-secondary/60 mb-3">
                Premium Qualität, bewährt
              </p>
              <div className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">
                Ab CHF {item.priceRange.minVariantPrice.amount}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <ThreeItemGridItem item={firstProduct} priority={true} />
      <ThreeItemGridItem item={secondProduct} priority={true} />
      <ThreeItemGridItem item={thirdProduct} />
    </div>
  );
}

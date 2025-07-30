import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

export async function Carousel() {
  // Try to get products from Shopify, fallback to mock data
  let products: Product[] = [];
  
  try {
    // Collections that start with `hidden-*` are hidden from the search page.
    products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });
  } catch (error) {
    console.log('No carousel collection found, trying to get all products');
  }

  // If no carousel collection, try to get all available products
  if (!products?.length) {
    try {
      const { getProducts } = await import('lib/shopify');
      const allProducts = await getProducts({});
      products = allProducts; // Use all available products for carousel
      console.log(`Using ${products.length} products from Shopify for carousel`);
    } catch (error) {
      console.log('Shopify unavailable, using mock products for carousel');
    }
  }

  // If no products from Shopify, use mock data
  if (!products?.length) {
    products = mockProducts;
  }

  if (!products?.length) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-secondary mb-8 text-center">
        Weitere Produkte
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, i) => (
          <div key={`${product.handle}${i}`} className="group">
            <Link href={`/product/${product.handle}`} className="block">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 hover:border-primary/20">
                <div className="aspect-square flex items-center justify-center mb-4">
                  <img
                    src={product.featuredImage?.url || '/placeholder-straw.jpg'}
                    alt={product.title}
                    className="max-h-24 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-secondary mb-1 line-clamp-2 text-sm">
                    {product.title}
                  </h4>
                  <div className="text-primary font-bold text-sm">
                    CHF {product.priceRange.minVariantPrice.amount}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

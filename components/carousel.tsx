import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Try to get products from Shopify, fallback to mock data
  let products: Product[] = [];
  
  try {
    // Collections that start with `hidden-*` are hidden from the search page.
    products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });
  } catch (error) {
    console.log('Shopify unavailable, using mock products for carousel');
  }

  // If no products from Shopify, use mock data
  if (!products?.length) {
    products = mockProducts;
  }

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

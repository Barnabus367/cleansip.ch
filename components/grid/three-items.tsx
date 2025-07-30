import { GridTileImage } from 'components/grid/tile';
import { mockProducts } from 'lib/mock-data';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage?.url || '/placeholder-straw.jpg'}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Try to get products from Shopify, fallback to mock data
  let homepageItems: Product[] = [];
  
  try {
    // Collections that start with `hidden-*` are hidden from the search page.
    homepageItems = await getCollectionProducts({
      collection: 'hidden-homepage-featured-items'
    });
  } catch (error) {
    console.log('Shopify unavailable, using mock products for homepage');
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
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}

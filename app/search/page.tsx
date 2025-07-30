import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { mockProducts } from 'lib/mock-data';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Suche | CleanSip',
  description: 'Durchsuche unser Sortiment nach plastikbasierten Party-Basics.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  let products = [];
  
  try {
    products = await getProducts({ sortKey, reverse, query: searchValue });
  } catch (error) {
    console.log('Shopify unavailable, using mock products for search');
    // Filter mock products based on search query if provided
    products = searchValue 
      ? mockProducts.filter(p => 
          p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
        )
      : mockProducts;
  }

  const resultsText = products.length > 1 ? 'Ergebnisse' : 'Ergebnis';

  return (
    <>
      {searchValue ? (
        <p className="mb-4 text-secondary">
          {products.length === 0
            ? 'Keine Produkte gefunden für '
            : `${products.length} ${resultsText} für `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : (
        <p className="mb-4 text-secondary">
          Alle verfügbaren Produkte
        </p>
      )}
      {products.length > 0 ? (
        <div className="mb-8">
          <ProductGridItems products={products} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-secondary/60">Keine Produkte gefunden.</p>
          {searchValue && (
            <p className="mt-2 text-sm text-secondary/50">
              Versuche einen anderen Suchbegriff oder schaue dir unsere{' '}
              <a href="/" className="text-primary hover:underline">Homepage</a> an.
            </p>
          )}
        </div>
      )}
    </>
  );
}

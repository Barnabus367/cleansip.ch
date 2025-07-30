import { defaultSort, sorting } from 'lib/constants';
import { mockProducts } from 'lib/mock-data';
import { getProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

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
        <p className="mb-8 font-mono text-xs uppercase tracking-wider text-black">
          {products.length === 0
            ? 'KEINE PRODUKTE GEFUNDEN FÜR '
            : `${products.length} ${resultsText.toUpperCase()} FÜR `}
          <span className="font-black">&quot;{searchValue}&quot;</span>
        </p>
      ) : (
        <p className="mb-8 font-mono text-xs uppercase tracking-wider text-black">
          ALLE VERFÜGBAREN PRODUKTE
        </p>
      )}
      {products.length > 0 ? (
        <div className="mb-8">
          {/* Brutalist 5-Column Grid */}
          <div className="grid grid-cols-5 gap-8">
            {products.map((product, index) => {
              const isOffset = Math.floor(index / 5) % 2 === 1;
              return (
                <div 
                  key={product.id} 
                  className={`relative group ${isOffset && index % 5 < 2 ? 'mt-16' : ''}`}
                >
                  <Link href={`/product/${product.handle}`}>
                    <div className="relative overflow-hidden bg-white border-2 border-black aspect-square">
                      <Image
                        src={product.featuredImage?.url || '/placeholder.jpg'}
                        alt={product.featuredImage?.altText || product.title}
                        fill
                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        style={{
                          clipPath: index % 3 === 0 
                            ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                            : index % 3 === 1
                            ? 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                            : 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
                        }}
                      />
                      
                      {/* Product Name Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <h3 className="text-white font-black text-lg uppercase tracking-wider text-center px-4">
                          {product.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-black mb-4"></div>
          <p className="font-mono text-xs uppercase tracking-wider text-black">KEINE PRODUKTE GEFUNDEN</p>
          {searchValue && (
            <p className="mt-4 font-mono text-xs text-gray-600">
              Versuche einen anderen Suchbegriff oder schaue dir unsere{' '}
              <a href="/" className="text-black font-black hover:underline">HOMEPAGE</a> an.
            </p>
          )}
        </div>
      )}
    </>
  );
}

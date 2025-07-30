import { getCollection, getCollectionProducts, getProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  
  // Spezielle Behandlung für unsere CleanSip Kategorien
  if (params.collection === 'strohhalme') {
    return {
      title: 'Strohhalme | CleanSip',
      description: 'Hochwertige Plastik-Strohhalme in verschiedenen Farben. Stabil, hygienisch und perfekt für jede Party.'
    };
  }
  
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  let products: Product[] = [];
  
  try {
    // Für Strohhalme zeigen wir alle verfügbaren Produkte
    if (params.collection === 'strohhalme') {
      products = await getProducts({ sortKey, reverse });
    } else {
      // Für andere Kollektionen versuchen wir die normale Kollektion
      products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback: Versuche alle Produkte zu holen
    try {
      products = await getProducts({ sortKey, reverse });
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
      products = [];
    }
  }

  return (
    <section>
      {params.collection === 'strohhalme' && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-secondary mb-4">
            CleanSip Strohhalme
          </h1>
          <p className="text-lg text-secondary/80">
            Nie mehr matschige Alternativen. Unsere hochwertigen Plastik-Strohhalme bleiben stabil und verändern den Geschmack nicht.
          </p>
        </div>
      )}
      
      {products.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="text-xl font-semibold text-secondary mb-2">
            Keine Produkte gefunden
          </h2>
          <p className="text-secondary/70">
            {params.collection === 'strohhalme' 
              ? 'Unsere Strohhalme werden bald verfügbar sein.'
              : `Keine Produkte in der Kategorie "${params.collection}" gefunden.`
            }
          </p>
        </div>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}

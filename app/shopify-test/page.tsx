// Test-Seite für Shopify-Integration
import { getProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';

export default async function ShopifyTestPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // Versuche Produkte von Shopify abzurufen
    products = await getProducts({});
    console.log('Shopify Products gefunden:', products.length);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    console.error('Shopify Error:', e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopify Integration Test</h1>
      
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-red-800 font-semibold mb-2">Fehler bei der Verbindung zu Shopify:</h2>
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h2 className="text-green-800 font-semibold mb-2">✅ Shopify-Verbindung erfolgreich!</h2>
          <p className="text-green-600">Gefundene Produkte: {products.length}</p>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Verfügbare Produkte:</h2>
        
        {products.length === 0 ? (
          <p className="text-gray-500">Keine Produkte gefunden.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-primary font-bold">
                  {product.priceRange?.maxVariantPrice?.amount} {product.priceRange?.maxVariantPrice?.currencyCode}
                </p>
                <p className="text-xs text-gray-500 mt-2">Handle: {product.handle}</p>
                <p className="text-xs text-gray-500">Varianten: {product.variants?.length || 0}</p>
                
                {/* Zeige Varianten an */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">Varianten:</h4>
                    <div className="space-y-1">
                      {product.variants.map((variant: any) => (
                        <div key={variant.id} className="text-xs text-gray-600 flex justify-between">
                          <span>{variant.title}</span>
                          <span className="font-medium">
                            {variant.price?.amount} {variant.price?.currencyCode}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Zeige erstes Bild an */}
                {product.featuredImage && (
                  <div className="mt-3">
                    <img 
                      src={product.featuredImage.url} 
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

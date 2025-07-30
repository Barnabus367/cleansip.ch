import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PremiumProductInfo } from 'components/product/premium-product-info';
import { ProductProvider } from 'components/product/product-context';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // Fetch related products on the server side
  const relatedProducts = await getProductRecommendations(product.id);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      
      {/* Brutalist Product Layout */}
      <div className="min-h-screen bg-white">
        {/* Main Product Section - 60/40 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
          
          {/* Product Gallery - Left Side (60%) */}
          <div className="lg:col-span-3 relative bg-white">
            <Suspense
              fallback={
                <div className="w-full h-screen bg-black" />
              }
            >
              <div className="w-full h-screen relative overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${product.images[0]?.url || ''})`,
                    clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)'
                  }}
                />
                
                {/* Price Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-[15vw] font-black text-black opacity-5 select-none">
                    CHF {product.priceRange.minVariantPrice.amount}
                  </div>
                </div>
              </div>
            </Suspense>
          </div>

          {/* Product Info - Right Side (40%) */}
          <div className="lg:col-span-2 p-8 lg:p-16 flex flex-col justify-center bg-white">
            <Suspense fallback={
              <div className="space-y-8">
                <div className="h-16 bg-black"></div>
                <div className="h-4 bg-black"></div>
                <div className="h-12 bg-black"></div>
              </div>
            }>
              {/* Product Title */}
              <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight text-black mb-8 leading-none">
                {product.title}
              </h1>
              
              {/* Description */}
              <div className="mb-12">
                <p className="font-mono text-xs lg:text-sm text-black max-w-xs leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Variant Selector */}
              <div className="mb-12">
                <PremiumProductInfo product={product} />
              </div>
              
              {/* Add to Cart Button */}
              <button className="w-full bg-black text-white py-6 font-mono text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors">
                IN DEN WARENKORB
              </button>
            </Suspense>
          </div>
          
          {/* Vertical Shipping Info */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 writing-vertical-rl text-black font-mono text-xs uppercase tracking-wider opacity-40">
            Kostenloser Versand • 48h Lieferung
          </div>
        </div>
      </div>
    </ProductProvider>
  );
}

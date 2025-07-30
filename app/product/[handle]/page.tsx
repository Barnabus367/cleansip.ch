import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PremiumProductGallery } from 'components/product/premium-gallery';
import { PremiumProductInfo } from 'components/product/premium-product-info';
import { ProductProvider } from 'components/product/product-context';
import { RelatedProductsCarousel } from 'components/product/related-products-carousel';
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
      
      {/* Premium Product Layout */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-primary-50/30">
        {/* Main Product Section */}
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
            
            {/* Product Gallery - Left Side */}
            <div className="relative">
              <Suspense
                fallback={
                  <div className="aspect-square bg-gray-100 rounded-3xl animate-pulse" />
                }
              >
                <PremiumProductGallery
                  images={product.images.map((image) => ({
                    src: image.url,
                    altText: image.altText
                  }))}
                />
              </Suspense>
            </div>

            {/* Product Info - Right Side (Sticky) */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <Suspense fallback={
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              }>
                <PremiumProductInfo product={product} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-16">
            <Suspense fallback={
              <div className="space-y-8">
                <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              </div>
            }>
              <RelatedProductsCarousel products={relatedProducts} />
            </Suspense>
          </div>
        </div>

        {/* Mobile Sticky Add to Cart Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 p-4 shadow-2xl backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Preis</span>
              <span className="text-lg font-bold text-secondary">
                CHF {product.priceRange.minVariantPrice.amount}
              </span>
            </div>
            <button className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </ProductProvider>
  );
}

import ProductCard from 'components/ProductCard';

interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  accentColor: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
}

interface ProductsSectionProps {
  featuredProducts: Product[];
}

export default function ProductsSection({ featuredProducts }: ProductsSectionProps) {
  return (
    <section id="products" className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
        <div className="mb-12 lg:mb-16">
          <h2 
            className="text-4xl lg:text-5xl font-bold text-black mb-4"
            role="heading"
            aria-level={2}
          >
            Unsere Produkte
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Premium-Strohhalme für professionelle Anwendungen
          </p>
        </div>
      </div>
      
      {/* Mobile Horizontal Scroll Container with Snap Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x-mandatory scroll-pl-4 px-4 pb-8 scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex-none w-80 snap-start">
              <ProductCard
                title={product.title}
                subtitle={product.subtitle || ''}
                info={product.description}
                price={product.price}
                accentColor={product.accentColor}
                href={`/product/${product.handle}`}
                featuredImage={product.featuredImage}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Grid Layout - 2x2 on md, 3 columns on lg+ */}
      <div className="hidden md:block max-w-[1600px] mx-auto px-6 sm:px-12 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              subtitle={product.subtitle || ''}
              info={product.description}
              price={product.price}
              accentColor={product.accentColor}
              href={`/product/${product.handle}`}
              featuredImage={product.featuredImage}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

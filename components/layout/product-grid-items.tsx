import { Product } from 'lib/shopify/types';
import Link from 'next/link';

function BentoProductCard({ product, index }: { product: Product; index: number }) {
  // Create varied sizing for visual interest
  const isLarge = index % 7 === 0; // Every 7th item is large
  const isMedium = index % 3 === 0 && !isLarge; // Every 3rd item (not large) is medium
  
  const sizeClasses = isLarge 
    ? 'md:col-span-2 md:row-span-2' 
    : isMedium 
    ? 'md:col-span-2' 
    : 'col-span-1';

  // Rotate badges for visual interest
  const badgeRotation = index % 2 === 0 ? 'rotate-12' : '-rotate-12';
  
  // Varied border radius for character
  const radiusVariation = index % 4 === 0 ? 'rounded-[2rem]' : index % 4 === 1 ? 'rounded-3xl' : index % 4 === 2 ? 'rounded-[1.5rem]' : 'rounded-2xl';

  // Random badge assignment
  const badges = ['neu', 'bestseller', null, null, null]; // 40% chance of having a badge
  const badge = badges[index % badges.length];

  return (
    <div className={`group ${sizeClasses} relative`}>
      <Link
        className="block h-full"
        href={`/product/${product.handle}`}
        prefetch={true}
      >
        {/* Main Card with Dynamic Styling */}
        <div className={`relative h-full bg-gradient-to-br from-primary/3 via-white to-secondary/3 ${radiusVariation} border-2 border-transparent bg-clip-padding shadow-lg hover:shadow-2xl transition-all duration-500 p-4 group-hover:scale-[1.02] overflow-hidden`}>
          
          {/* Gradient Border Effect */}
          <div className={`absolute inset-0 ${radiusVariation} bg-gradient-to-br from-primary via-secondary to-accent p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
            <div className={`h-full w-full ${radiusVariation} bg-white`}></div>
          </div>

          {/* Rotated Badge */}
          {badge && (
            <div className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-bold text-white rounded-full transform ${badgeRotation} shadow-lg z-10 ${
              badge === 'neu' ? 'bg-gradient-to-r from-accent to-yellow-400' : 'bg-gradient-to-r from-primary to-primary-600'
            }`}>
              {badge === 'neu' ? 'NEU' : 'TOP'}
            </div>
          )}

          <div className="h-full flex flex-col">
            {/* Product Image Container with Dual Image Effect */}
            <div className="flex-1 relative flex items-center justify-center mb-4 overflow-hidden rounded-xl">
              {/* Primary Image */}
              <img
                src={product.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={product.title}
                className="h-full w-full object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
              />
              
              {/* Secondary Image (appears on hover) */}
              <img
                src={product.images?.[1]?.url || product.featuredImage?.url || '/placeholder-straw.jpg'}
                alt={`${product.title} - Alternative view`}
                className="absolute inset-0 h-full w-full object-contain opacity-0 scale-95 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />

              {/* Product Tags as Pills */}
              <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full backdrop-blur-sm border border-white/20">
                  Eco
                </span>
                {isLarge && (
                  <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full backdrop-blur-sm border border-white/20">
                    Premium
                  </span>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="text-center relative">
              <h3 className="font-extrabold text-base md:text-lg text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {product.title}
              </h3>
              
              {/* Price Badge with Glassmorphism */}
              <div className="relative inline-block mb-2">
                <div className="bg-gradient-to-r from-primary/90 to-primary-600/90 text-white px-3 py-1 rounded-xl font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20">
                  CHF {product.priceRange.minVariantPrice.amount}
                </div>
              </div>

              {/* Quick Add Button - appears on hover */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                <button className="bg-secondary/90 text-white px-4 py-1 rounded-full font-semibold text-xs hover:bg-secondary transition-colors duration-200 shadow-xl backdrop-blur-sm border border-white/10">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
      {products.map((product, index) => (
        <BentoProductCard key={product.handle} product={product} index={index} />
      ))}
    </div>
  );
}

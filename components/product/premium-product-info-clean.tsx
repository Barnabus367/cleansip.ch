'use client';

import { useState } from 'react';
import { Product } from '../../lib/shopify/types';
import { AddToCart } from '../cart/add-to-cart';
import { VariantSelector } from './variant-selector';

interface PremiumProductInfoProps {
  product: Product;
}

export function PremiumProductInfo({ product }: PremiumProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-wider text-black">
          Menge
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={decrementQuantity}
            className="w-12 h-12 bg-black text-white font-mono hover:bg-gray-800 transition-colors"
          >
            -
          </button>
          <span className="font-mono text-xl font-black w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="w-12 h-12 bg-black text-white font-mono hover:bg-gray-800 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="pt-4">
        <AddToCart product={product} />
      </div>
    </div>
  );
}

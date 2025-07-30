'use client';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from 'components/cart/cart-context';
import Link from 'next/link';
import { useState } from 'react';

interface CartIconProps {
  isScrolled: boolean;
}

export default function CartIcon({ isScrolled }: CartIconProps) {
  const { cart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  
  const itemCount = cart?.lines?.length || 0;
  const totalAmount = cart?.cost?.totalAmount?.amount || '0';

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <Link
        href="/cart"
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
          isScrolled 
            ? 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5' 
            : 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'
        }`}
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <ShoppingBagIcon className="h-5 w-5" />
        
        {/* Item Count Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>

      {/* Cart Preview on Hover */}
      {showPreview && itemCount > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Warenkorb ({itemCount} Artikel)</h3>
            <p className="text-sm text-gray-500">Gesamt: CHF {totalAmount}</p>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {cart?.lines?.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-b-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.merchandise.product.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Menge: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    CHF {item.cost.totalAmount.amount}
                  </p>
                </div>
              </div>
            ))}
            
            {itemCount > 3 && (
              <div className="p-3 text-center text-sm text-gray-500">
                und {itemCount - 3} weitere Artikel...
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50">
            <Link
              href="/cart"
              className="block w-full bg-primary text-white text-center py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Zum Warenkorb
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

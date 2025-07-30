'use client';

import { useCart } from 'components/cart/cart-context';
import Link from 'next/link';

export default function CartIcon() {
  const { cart } = useCart();
  
  const itemCount = cart?.lines?.length || 0;

  return (
    <Link
      href="/cart"
      className="font-mono text-sm uppercase tracking-wider text-black hover:font-black transition-all duration-300"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      CART ({itemCount})
    </Link>
  );
}

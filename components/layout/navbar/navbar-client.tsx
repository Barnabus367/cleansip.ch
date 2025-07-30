'use client';

import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useState } from 'react';
import CartIcon from './cart-icon';
import MobileMenu from './mobile-menu';
import ModernSearch, { SearchSkeleton } from './search';

interface NavbarClientProps {
  menu: Menu[];
}

export function NavbarClient({ menu }: NavbarClientProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white h-20 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu */}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          
          {/* Logo - Pure Typography */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-black uppercase tracking-[0.5em] text-black">
                CLEANSIP
              </span>
            </Link>
          </div>

          {/* Navigation - Horizontal with separators */}
          <div className="hidden md:flex items-center">
            {menu.length ? (
              <ul className="flex items-center">
                {menu.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.title} className="flex items-center">
                      <Link
                        href={item.path}
                        prefetch={true}
                        className={`font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                          isActive ? 'font-black text-black' : 'font-normal text-black hover:font-black'
                        }`}
                      >
                        {item.title}
                      </Link>
                      {index < menu.length - 1 && (
                        <span className="mx-4 text-black font-mono">|</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* Right Side - Search and Cart */}
          <div className="flex items-center space-x-6">
            {/* Search - Text only */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="font-mono text-sm uppercase tracking-wider text-black hover:font-black transition-all duration-300"
            >
              SEARCH
            </button>

            {/* Cart Icon */}
            <Suspense fallback={null}>
              <CartIcon />
            </Suspense>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b-2 border-black p-6">
            <Suspense fallback={<SearchSkeleton />}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-sm uppercase tracking-wider font-black">SEARCH</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider hover:font-black"
                >
                  CLOSE
                </button>
              </div>
              <ModernSearch isScrolled={false} />
            </Suspense>
          </div>
        )}
      </div>
    </nav>
  );
}

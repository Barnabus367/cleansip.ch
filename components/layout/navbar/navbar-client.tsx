'use client';

import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import CartIcon from './cart-icon';
import MobileMenu from './mobile-menu';
import ModernSearch, { SearchSkeleton } from './search';

interface NavbarClientProps {
  menu: Menu[];
}

export function NavbarClient({ menu }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu */}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          
          {/* Logo with Animation */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center group"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className={`transition-transform duration-300 ${logoHovered ? 'scale-110 rotate-12' : ''}`}
                >
                  <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
                  <path d="M15 12h10v16h-10z" fill="white" opacity="0.9" />
                  <circle cx="20" cy="16" r="2" fill="#00BFA6" />
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00BFA6" />
                      <stop offset="100%" stopColor="#003B46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="ml-3 hidden lg:block">
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-secondary' : 'text-white'
                }`}>
                  CleanSip
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation with Mega Menu Preparation */}
          <div className="hidden md:flex items-center space-x-8">
            {menu.length ? (
              <ul className="flex items-center space-x-8">
                {menu.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.title} className="relative group">
                      <Link
                        href={item.path}
                        prefetch={true}
                        className={`relative font-medium transition-all duration-300 hover:text-primary ${
                          isScrolled 
                            ? isActive ? 'text-primary' : 'text-secondary' 
                            : isActive ? 'text-primary' : 'text-white hover:text-primary'
                        }`}
                      >
                        {item.title}
                        {/* Underline Animation */}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </Link>
                      
                      {/* Mega Menu Placeholder */}
                      {item.title === 'Strohhalme' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-80">
                            <div className="space-y-3">
                              <h3 className="font-semibold text-secondary">Kategorien</h3>
                              <div className="space-y-2">
                                <Link href="/search/strohhalme" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                                  Alle Strohhalme
                                </Link>
                                <Link href="/search/premium" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                                  Premium Collection
                                </Link>
                                <Link href="/search/party" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                                  Party Sets
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Suspense fallback={<SearchSkeleton />}>
                <ModernSearch isScrolled={isScrolled} />
              </Suspense>
            </div>
            <CartIcon isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </nav>
  );
}

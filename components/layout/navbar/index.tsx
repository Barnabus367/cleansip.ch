import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import { FEATURE_FLAGS } from 'lib/constants';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

// CleanSip navigation items with feature flag support
const cleanSipNavigation = [
  { title: 'Home', path: '/', enabled: true },
  { title: 'Strohhalme', path: '/search/strohhalme', enabled: FEATURE_FLAGS.SHOW_STROHHALME },
  { title: 'Party Cups', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_PARTY_CUPS }, // Show link to coming soon if not enabled
  { title: 'Rührstäbchen', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_RUEHRSTABCHEN },
  { title: 'Besteck', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_BESTECK }
].filter(item => item.enabled); // Only show enabled items

export async function Navbar() {
  // Try to get menu from Shopify, fallback to CleanSip navigation
  let menu: Menu[] = [];
  try {
    menu = await getMenu('next-js-frontend-header-menu');
  } catch (error) {
    console.log('Using fallback navigation for CleanSip');
  }
  
  // Use CleanSip navigation if no Shopify menu available
  const navigationItems = menu.length ? menu : cleanSipNavigation;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={navigationItems} />
            </Suspense>
          </div>
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="/brand/logos/logo-horizontal-primary.svg"
                alt="CleanSip"
                className="h-8 w-auto"
              />
              <div className="ml-3 hidden text-xl font-bold text-primary lg:block">
                CleanSip
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.length ? (
              <ul className="flex items-center space-x-8">
                {navigationItems.map((item: Menu | typeof cleanSipNavigation[0]) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-secondary font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}

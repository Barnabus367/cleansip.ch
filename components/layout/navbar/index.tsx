import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

// CleanSip navigation items
const cleanSipNavigation = [
  { title: 'Home', path: '/' },
  { title: 'Strohhalme', path: '/search/strohhalme' },
  { title: 'Party Cups', path: '/coming-soon' },
  { title: 'Rührstäbchen', path: '/coming-soon' },
  { title: 'Besteck', path: '/coming-soon' }
];

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
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-white border-b border-neutral/10">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={navigationItems} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
            <div className="relative flex w-full items-center justify-between p-4 lg:px-6">
      <div className="flex w-1/3">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-1/3 justify-center">
        <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
          <img
            src="/brand/logos/logo-horizontal-primary.svg"
            alt="CleanSip"
            className="h-8 w-auto"
          />
          <div className="ml-2 flex-none text-sm font-bold uppercase tracking-widest md:hidden lg:block">
            CleanSip
          </div>
        </Link>
      </div>
          {navigationItems.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {navigationItems.map((item: Menu | typeof cleanSipNavigation[0]) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-secondary/70 underline-offset-4 hover:text-primary hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}

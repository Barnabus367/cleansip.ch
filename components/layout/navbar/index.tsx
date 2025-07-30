import { FEATURE_FLAGS } from 'lib/constants';
import { getMenu } from 'lib/shopify/server';
import { Menu } from 'lib/shopify/types';
import { NavbarClient } from './navbar-client';

// CleanSip navigation items with feature flag support
const cleanSipNavigation = [
  { title: 'Home', path: '/', enabled: true },
  { title: 'Strohhalme', path: '/search/strohhalme', enabled: FEATURE_FLAGS.SHOW_STROHHALME },
  { title: 'Party Cups', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_PARTY_CUPS },
  { title: 'Rührstäbchen', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_RUEHRSTABCHEN },
  { title: 'Besteck', path: '/coming-soon', enabled: !FEATURE_FLAGS.SHOW_BESTECK }
].filter(item => item.enabled);

// Server Component for async operations
export default async function Navbar() {
  // Try to get menu from Shopify, fallback to CleanSip navigation
  let menu: Menu[] = [];
  try {
    menu = await getMenu('next-js-frontend-header-menu');
  } catch (error) {
    console.log('Using fallback navigation for CleanSip');
  }

  // Use CleanSip navigation if no Shopify menu available
  const navigationItems = menu?.length ? menu : cleanSipNavigation;

  return <NavbarClient menu={navigationItems} />;
}

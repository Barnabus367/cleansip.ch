'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useFocusTrap } from 'hooks/use-focus-trap';
import { Menu } from 'lib/shopify/types';
import Form from 'next/form';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const QUICK_LINKS = [
  { name: 'Über uns', href: '/about', icon: UserIcon },
  { name: 'Kontakt', href: '/contact', icon: HeartIcon },
  { name: 'Hilfe', href: '/help', icon: HeartIcon },
];

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const focusTrapRef = useFocusTrap(isOpen);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openMobileMenu = () => {
    setIsOpen(true);
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Mobile navigation menu opened';
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };
  
  const closeMobileMenu = () => {
    setIsOpen(false);
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Mobile navigation menu closed';
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={openMobileMenu}
        aria-label="Mobile Navigation öffnen"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-haspopup="dialog"
        className="font-mono text-sm uppercase tracking-wider text-black hover:font-black transition-all duration-300 md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
      >
        MENU
      </button>

      {/* Full Screen Overlay */}
      <Dialog 
        open={isOpen} 
        onClose={closeMobileMenu} 
        className="relative z-50"
        aria-labelledby="mobile-menu-title"
        aria-describedby="mobile-menu-description"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-end">
            <DialogPanel
              ref={focusTrapRef}
              transition
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-sm transform bg-white transition-all duration-300 ease-out data-[closed]:translate-x-full"
            >
              {/* Hidden title and description for screen readers */}
              <h1 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h1>
              <p id="mobile-menu-description" className="sr-only">
                Navigation menu for mobile devices with search, main navigation links, and quick actions.
              </p>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm" aria-hidden="true">CS</span>
                  </div>
                  <span className="font-bold text-xl">CleanSip</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Mobile Navigation schließen"
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 px-6 py-6">
                {/* Search Bar */}
                <div className="mb-8">
                  <label htmlFor="mobile-search" className="sr-only">
                    Produkte suchen
                  </label>
                  <Form action="/search" className="relative" role="search">
                    <input
                      id="mobile-search"
                      ref={searchInputRef}
                      type="text"
                      name="q"
                      placeholder="Produkte suchen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoComplete="off"
                      aria-describedby="search-help"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <MagnifyingGlassIcon 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                      aria-hidden="true" 
                    />
                    <div id="search-help" className="sr-only">
                      Geben Sie Suchbegriffe ein und drücken Sie Enter zum Suchen
                    </div>
                  </Form>
                </div>

                {/* Main Navigation */}
                {menu?.length > 0 && (
                  <nav className="mb-8" aria-labelledby="main-navigation-heading">
                    <h2 
                      id="main-navigation-heading" 
                      className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4"
                    >
                      Navigation
                    </h2>
                    <ul className="space-y-3" role="list">
                      {menu.map((item, index) => (
                        <li key={item.title}>
                          <Link
                            href={item.path}
                            onClick={closeMobileMenu}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            aria-current={pathname === item.path ? 'page' : undefined}
                            className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                              pathname === item.path
                                ? 'bg-primary text-white'
                                : 'text-gray-900 hover:bg-gray-50 hover:text-primary'
                            }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Quick Actions */}
                <div className="mb-8">
                  <h2 
                    id="quick-actions-heading" 
                    className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4"
                  >
                    Schnellzugriff
                  </h2>
                  <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="quick-actions-heading">
                    <Link
                      href="/cart"
                      onClick={closeMobileMenu}
                      aria-label="Zum Warenkorb gehen"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <ShoppingBagIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <span className="text-sm font-medium">Warenkorb</span>
                    </Link>
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      aria-label="Zum Benutzerkonto gehen"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <UserIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <span className="text-sm font-medium">Konto</span>
                    </Link>
                  </div>
                </div>

                {/* Additional Links */}
                <nav aria-labelledby="additional-links-heading">
                  <h2 id="additional-links-heading" className="sr-only">Zusätzliche Links</h2>
                  <ul className="space-y-2" role="list">
                    {QUICK_LINKS.map((link, index) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          style={{ animationDelay: `${(menu?.length || 0) + index * 0.1}s` }}
                          aria-label={`Zur Seite ${link.name} gehen`}
                          className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary transition-all animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <link.icon className="h-5 w-5" aria-hidden="true" />
                          <span className="font-medium">{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Footer */}
              <footer className="px-6 py-6 border-t border-gray-100 bg-gray-50" aria-labelledby="social-links-heading">
                <div className="text-center text-sm text-gray-500">
                  <h2 id="social-links-heading" className="mb-2">Folge uns</h2>
                  <nav aria-label="Social Media Links">
                    <ul className="flex justify-center gap-4" role="list">
                      <li>
                        <a 
                          href="#" 
                          aria-label="CleanSip auf Instagram folgen"
                          className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 py-1"
                        >
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          aria-label="CleanSip auf Facebook folgen"
                          className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 py-1"
                        >
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          aria-label="CleanSip auf Twitter folgen"
                          className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 py-1"
                        >
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </footer>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

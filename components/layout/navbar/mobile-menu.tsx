'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Bars3Icon, HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Form from 'next/form';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

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

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:bg-white/10 md:hidden"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Full Screen Overlay */}
      <Dialog open={isOpen} onClose={closeMobileMenu} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-end">
            <DialogPanel
              transition
              className="relative w-full max-w-sm transform bg-white transition-all duration-300 ease-out data-[closed]:translate-x-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CS</span>
                  </div>
                  <span className="font-bold text-xl">CleanSip</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 px-6 py-6">
                {/* Search Bar */}
                <div className="mb-8">
                  <Form action="/search" className="relative">
                    <input
                      type="text"
                      name="q"
                      placeholder="Produkte suchen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </Form>
                </div>

                {/* Main Navigation */}
                {menu?.length > 0 && (
                  <nav className="mb-8">
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                      Navigation
                    </h2>
                    <div className="space-y-3">
                      {menu.map((item, index) => (
                        <Link
                          key={item.title}
                          href={item.path}
                          onClick={closeMobileMenu}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 animate-fade-in-up ${
                            pathname === item.path
                              ? 'bg-primary text-white'
                              : 'text-gray-900 hover:bg-gray-50 hover:text-primary'
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </nav>
                )}

                {/* Quick Actions */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                    Schnellzugriff
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/cart"
                      onClick={closeMobileMenu}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <ShoppingBagIcon className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Warenkorb</span>
                    </Link>
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <UserIcon className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Konto</span>
                    </Link>
                  </div>
                </div>

                {/* Additional Links */}
                <div className="space-y-2">
                  {QUICK_LINKS.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      style={{ animationDelay: `${(menu?.length || 0) + index * 0.1}s` }}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary transition-all animate-fade-in-up"
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
                <div className="text-center text-sm text-gray-500">
                  <p className="mb-2">Folge uns</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}

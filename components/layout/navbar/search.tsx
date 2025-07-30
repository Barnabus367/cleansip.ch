'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Mock search suggestions - in real app, this would come from API
const SEARCH_SUGGESTIONS = [
  { id: '1', title: 'Premium Strohhalme Set', price: '12.90', image: '/placeholder-straw.jpg', category: 'Strohhalme' },
  { id: '2', title: 'Plastik Trinkhalme Schwarz', price: '8.50', image: '/placeholder-straw.jpg', category: 'Strohhalme' },
  { id: '3', title: 'Party Strohhalme Bunt', price: '15.90', image: '/placeholder-straw.jpg', category: 'Party' },
  { id: '4', title: 'Eco-Friendly Alternative', price: '9.90', image: '/placeholder-straw.jpg', category: 'Eco' },
];

const QUICK_SEARCHES = ['Strohhalme', 'Party Set', 'Premium', 'Schwarz', 'Bunt'];

interface ModernSearchProps {
  isScrolled: boolean;
}

export default function ModernSearch({ isScrolled }: ModernSearchProps) {
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [suggestions, setSuggestions] = useState<typeof SEARCH_SUGGESTIONS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = SEARCH_SUGGESTIONS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchQuery) {
      setShowSuggestions(true);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative">
      <Form action="/search" className="relative">
        <div className={`relative flex items-center transition-all duration-300 ${
          isExpanded ? 'w-96' : 'w-80'
        }`}>
          <input
            ref={inputRef}
            key={searchParams?.get('q')}
            type="text"
            name="q"
            placeholder="Produkte suchen..."
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            className={`w-full h-12 pl-12 pr-10 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
              isScrolled 
                ? 'bg-gray-50 border-gray-200 focus:border-primary focus:bg-white' 
                : 'bg-white/10 border-white/20 text-white placeholder-white/70 backdrop-blur-sm focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:border-primary'
            }`}
          />
          
          {/* Search Icon */}
          <MagnifyingGlassIcon className={`absolute left-4 h-5 w-5 transition-colors ${
            isScrolled ? 'text-gray-400' : 'text-white/70'
          }`} />
          
          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </Form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (isExpanded || searchQuery) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          
          {/* Quick Searches */}
          {!searchQuery && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Beliebte Suchen</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_SEARCHES.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 px-2">Produkte</h3>
                <div className="space-y-1">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="font-bold text-primary">CHF {product.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* View All Results */}
              <div className="border-t border-gray-100 p-3">
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="block w-full text-center py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Alle Ergebnisse anzeigen ({suggestions.length}+)
                </Link>
              </div>
            </div>
          )}

          {/* No Results */}
          {searchQuery && suggestions.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-gray-400 mb-2">
                <MagnifyingGlassIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Keine Ergebnisse gefunden</h3>
              <p className="text-sm text-gray-500">Versuche einen anderen Suchbegriff</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="w-80 h-12 bg-gray-200 rounded-2xl animate-pulse" />
  );
}

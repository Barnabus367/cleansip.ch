import { FEATURE_FLAGS } from 'lib/constants';
import Link from 'next/link';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2025 + (currentYear > 2025 ? `-${currentYear}` : '');

  return (
    <footer className="bg-white border-t-2 border-black h-16">
      <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono text-lg uppercase tracking-[0.5em] font-black text-black">
          CLEANSIP
        </Link>
        
        {/* Navigation */}
        <div className="flex items-center space-x-8">
          {FEATURE_FLAGS.SHOW_STROHHALME && (
            <Link href="/search/strohhalme" className="font-mono text-xs uppercase tracking-wider text-black hover:font-black">
              STROHHALME
            </Link>
          )}
          <Link href="/kontakt" className="font-mono text-xs uppercase tracking-wider text-black hover:font-black">
            KONTAKT
          </Link>
          <Link href="/impressum" className="font-mono text-xs uppercase tracking-wider text-black hover:font-black">
            IMPRESSUM
          </Link>
        </div>
        
        {/* Copyright */}
        <div className="font-mono text-xs uppercase tracking-wider text-black">
          © {copyrightDate} CLEANSIP
        </div>
      </div>
    </footer>
  );
}

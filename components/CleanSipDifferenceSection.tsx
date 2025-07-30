/**
 * CleanSip Difference Section - Rebellious positioning against eco-alternatives
 * Emotional storytelling with Swiss quality focus
 */

'use client';

import { useEffect, useRef } from 'react';

interface DifferencePoint {
  title: string;
  description: string;
  icon: 'shield' | 'diamond' | 'swiss';
  color: string;
}

const DIFFERENCE_POINTS: DifferencePoint[] = [
  {
    title: 'Kein Aufweichen',
    description: 'Während Papierstrohhalme nach 30 Sekunden matschig werden, bleiben CleanSip Strohhalme über Stunden hinweg formstabil. Schluss mit peinlichen Papier-Fetzen im Cocktail.',
    icon: 'shield',
    color: 'bg-red-600'
  },
  {
    title: 'Premium Qualität',
    description: 'Hochwertige Materialien und präzise Verarbeitung für den professionellen Einsatz. Keine Kompromisse bei Qualität oder Haltbarkeit.',
    icon: 'diamond',
    color: 'bg-primary-600'
  },
  {
    title: 'Schweizer Standards',
    description: 'BPA-frei, lebensmittelecht und nach strengsten EU-Richtlinien zertifiziert. Express-Lieferung schweizweit in 24-48h.',
    icon: 'swiss',
    color: 'bg-accent-600'
  }
];

// Icon components
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5.91 4.74L18 22l-6-4-6 4 1.91-8.26L2 9l6.91-.74L12 2z" />
  </svg>
);

const SwissIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9M3 5l2 2M3 17l2-2" />
  </svg>
);

export default function CleanSipDifferenceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-scroll-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case 'shield':
        return <ShieldIcon className={className} />;
      case 'diamond':
        return <DiamondIcon className={className} />;
      case 'swiss':
        return <SwissIcon className={className} />;
      default:
        return <ShieldIcon className={className} />;
    }
  };

  return (
    <section 
      id="cleansip-unterschied"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003B46' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Rebellious Section Header */}
        <div className="text-center mb-16 lg:mb-20" data-scroll-animate>
          <div className="inline-block bg-red-600 text-white px-6 py-3 font-black text-sm uppercase tracking-wider mb-6 transform -rotate-2">
            Der CleanSip Unterschied
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-secondary-800 mb-6 leading-tight">
            Während andere auf <span className="text-red-600">Pappe kauen</span>,<br />
            <span className="text-primary-600">geniessen Sie</span> Ihr Getränk<br />
            wie es sein soll.
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Schluss mit Kompromissen. CleanSip steht für das, was funktioniert - 
            zuverlässig, professionell, <strong>ohne Ausreden</strong>.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {DIFFERENCE_POINTS.map((point, index) => (
            <div 
              key={index}
              className="group bg-white p-8 lg:p-10 border-2 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 transform hover:-translate-y-2"
              data-scroll-animate
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 ${point.color} text-white border-2 border-black mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(point.icon, 'w-10 h-10')}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-black text-secondary-800 mb-4 group-hover:text-primary-600 transition-colors">
                {point.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {point.description}
              </p>

              {/* Hover Effect Indicator */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`h-1 ${point.color} w-full`} />
              </div>
            </div>
          ))}
        </div>

        {/* Rebellious Quote Section */}
        <div className="bg-secondary-800 text-white p-8 lg:p-12 border-2 border-black shadow-brutal transform -rotate-1" data-scroll-animate>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl lg:text-8xl text-primary-500 font-serif mb-4">"</div>
            <blockquote className="text-2xl lg:text-3xl font-bold leading-relaxed mb-6">
              Warum sollten wir uns mit matschigen Öko-Alternativen zufriedengeben, 
              wenn es eine bessere Lösung gibt?
            </blockquote>
            <p className="text-primary-400 text-lg">
              - Jeder CleanSip Kunde, nachdem er das erste Mal gewechselt hat
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

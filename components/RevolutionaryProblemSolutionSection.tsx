/**
 * Revolutionary Problem Solution Section - Dramatic visual storytelling
 * Split-screen with emotional before/after comparison
 */

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ComparisonPoint {
  problem: string;
  solution: string;
  emotion: string;
}

const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    problem: 'Papierstrohhalm wird matschig und zerfällt',
    solution: 'CleanSip bleibt stundenlang formstabil',
    emotion: '😤 → 😌'
  },
  {
    problem: 'Peinliche Papier-Fetzen im Drink',
    solution: 'Sauberes, professionelles Trinkerlebnis',
    emotion: '😳 → 😎'
  },
  {
    problem: 'Ständige Nachbestellungen nötig',
    solution: 'Ein Kauf, lange Zufriedenheit',
    emotion: '😩 → 🎯'
  },
  {
    problem: 'Unvorhersagbare Qualität',
    solution: 'Schweizer Zuverlässigkeit',
    emotion: '🤔 → ✅'
  }
];

export default function ProblemSolutionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [paperMelting, setPaperMelting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger paper melting animation after 1 second
            setTimeout(() => setPaperMelting(true), 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-gray-100 py-20 lg:py-32 overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-green-900/5" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Revolutionary Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block bg-red-600 text-white px-6 py-3 font-black text-sm uppercase tracking-wider mb-6 animate-pulse">
            Vorher vs. Nachher
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-secondary-800 mb-6 leading-tight">
            <span className="text-red-600">Schluss mit dem</span><br />
            <span className="text-gray-400 line-through">Papier-Drama</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Sehen Sie selbst, warum über <strong>2'800 Schweizer</strong> bereits den Wechsel gemacht haben
          </p>
        </div>

        {/* Split-Screen Visual Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          
          {/* PROBLEM Side - Düster & Unappetitlich */}
          <div className={`relative bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300 p-8 lg:p-12 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            
            {/* Problem Badge */}
            <div className="text-center mb-8">
              <div className="inline-block bg-red-600 text-white px-6 py-3 font-black border-2 border-black mb-4 transform -rotate-2">
                DAS PROBLEM
              </div>
              <h3 className="text-3xl font-black text-red-800 mb-4">
                Öko-Alternativen versagen
              </h3>
            </div>
            
            {/* Visual Problem - Paper Straw Melting */}
            <div className="bg-white border-2 border-red-400 p-8 mb-6 text-center relative overflow-hidden">
              <div className={`transition-all duration-2000 ${paperMelting ? 'transform scale-110 opacity-50 blur-sm' : ''}`}>
                <div className="text-red-500 text-8xl font-mono mb-4">📄</div>
                <div className={`text-red-700 font-bold transition-all duration-1000 ${paperMelting ? 'animate-pulse' : ''}`}>
                  Papierstrohhalm wird matschig
                </div>
              </div>
              
              {/* Melting Effect */}
              {paperMelting && (
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-red-400 to-transparent animate-pulse" />
              )}
            </div>

            {/* Problem Points */}
            <ul className="space-y-4">
              {COMPARISON_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <div>
                    <span className="text-red-800 font-bold text-sm block">{point.problem}</span>
                    <span className="text-2xl">{point.emotion.split(' → ')[0]}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Dramatic Quote */}
            <div className="mt-8 p-4 bg-red-200 border-l-4 border-red-600">
              <p className="text-red-800 font-bold italic">
                "Nie wieder peinliche Papier-Fetzen im Cocktail..."
              </p>
            </div>
          </div>

          {/* SOLUTION Side - Strahlend & Stabil */}
          <div className={`relative bg-gradient-to-br from-green-100 to-primary-100 border-2 border-primary-300 p-8 lg:p-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            
            {/* Solution Badge */}
            <div className="text-center mb-8">
              <div className="inline-block bg-primary-600 text-white px-6 py-3 font-black border-2 border-black mb-4 transform rotate-2">
                DIE LÖSUNG
              </div>
              <h3 className="text-3xl font-black text-primary-800 mb-4">
                CleanSip Zuverlässigkeit
              </h3>
            </div>
            
            {/* Visual Solution - Stable Straw in Cocktail */}
            <div className="bg-white border-2 border-primary-400 p-8 mb-6 text-center relative overflow-hidden">
              <div className="animate-pulse">
                <div className="text-primary-600 text-8xl font-mono mb-4">🥤</div>
                <div className="text-primary-700 font-bold">
                  Stabil wie am ersten Tag
                </div>
              </div>
              
              {/* Success Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200/30 to-green-200/30 animate-pulse" />
            </div>

            {/* Solution Points */}
            <ul className="space-y-4">
              {COMPARISON_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-primary-800 font-bold text-sm block">{point.solution}</span>
                    <span className="text-2xl">{point.emotion.split(' → ')[1]}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Success Quote */}
            <div className="mt-8 p-4 bg-primary-200 border-l-4 border-primary-600">
              <p className="text-primary-800 font-bold italic">
                "Endlich kann ich mein Getränk geniessen, ohne zu kämpfen!"
              </p>
            </div>
          </div>
        </div>

        {/* Emotional Call-to-Action */}
        <div className="bg-secondary-800 text-white border-2 border-black shadow-brutal p-8 lg:p-12 text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl lg:text-4xl font-black mb-6">
            Sind Sie bereit für den Wechsel?
          </h3>
          <p className="text-gray-200 text-xl mb-8 max-w-3xl mx-auto">
            Schließen Sie sich den über <strong className="text-primary-400">2'800 Schweizern</strong> an, 
            die bereits auf CleanSip umgestellt haben. <strong>Schlürfen statt kämpfen.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/search/strohhalme"
              className="group bg-red-600 text-white px-10 py-5 font-black text-lg border-2 border-white hover:bg-red-700 transition-all duration-300 uppercase tracking-wider transform hover:scale-105"
            >
              <span className="flex items-center">
                JETZT UMSTEIGEN
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
            
            <Link 
              href="#testimonials"
              className="bg-transparent text-white px-10 py-5 font-black text-lg border-2 border-white hover:bg-white hover:text-secondary-800 transition-all duration-300 uppercase tracking-wider smooth-scroll"
            >
              Erfahrungen lesen
            </Link>
          </div>

          {/* Live Counter Animation */}
          <div className="mt-8 pt-6 border-t border-gray-600">
            <p className="text-primary-400 font-bold">
              <span className="animate-pulse">🔥</span> 
              Weitere 47 Bestellungen heute - seien Sie dabei!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

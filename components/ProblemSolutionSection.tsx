/**
 * Problem Solution Section - Professional comparison for CleanSip
 * Highlights the core value proposition without childish elements
 */

import Link from 'next/link';

interface ComparisonPoint {
  problem: string;
  solution: string;
}

const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    problem: 'Papierstrohhalme weichen innerhalb von Minuten auf',
    solution: 'CleanSip Strohhalme bleiben über Stunden stabil'
  },
  {
    problem: 'Unzuverlässige Qualität bei Alternativen',
    solution: 'Konstante Schweizer Qualität und Haltbarkeit'
  },
  {
    problem: 'Begrenzte Verfügbarkeit bei Events',
    solution: 'Zuverlässige Lieferung in gewünschten Mengen'
  },
  {
    problem: 'Hohe Kosten durch häufigen Nachkauf',
    solution: 'Langlebige Lösung für bessere Kosteneffizienz'
  }
];

export default function ProblemSolutionSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Die klare Alternative
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Während andere Alternativen versagen, bietet CleanSip die zuverlässige Lösung 
            für professionelle Anwendungen in Gastronomie und Events
          </p>
        </div>

        {/* Main Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          
          {/* Problem Side */}
          <div className="bg-red-50 border-2 border-red-200 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-red-500 text-white px-4 py-2 font-bold border-2 border-black mb-4">
                DAS PROBLEM
              </div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                Unzuverlässige Alternativen
              </h3>
            </div>
            
            {/* Problem Visual */}
            <div className="bg-white border-2 border-red-300 p-6 mb-6 text-center">
              <div className="text-red-400 text-6xl font-mono mb-2">!</div>
              <p className="text-red-700 font-medium">
                Matschige, aufweichende Strohhalme
              </p>
            </div>

            {/* Problem Points */}
            <ul className="space-y-3">
              {COMPARISON_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">{point.problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Side */}
          <div className="bg-green-50 border-2 border-green-200 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary-500 text-white px-4 py-2 font-bold border-2 border-black mb-4">
                DIE LÖSUNG
              </div>
              <h3 className="text-2xl font-bold text-primary-600 mb-4">
                CleanSip Qualität
              </h3>
            </div>
            
            {/* Solution Visual */}
            <div className="bg-white border-2 border-primary-300 p-6 mb-6 text-center">
              <div className="text-primary-500 text-6xl font-mono mb-2">✓</div>
              <p className="text-primary-700 font-medium">
                Stabile, zuverlässige Performance
              </p>
            </div>

            {/* Solution Points */}
            <ul className="space-y-3">
              {COMPARISON_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-primary-700 text-sm">{point.solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-black text-white border-2 border-black shadow-brutal p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Professionelle Zuverlässigkeit seit dem ersten Schluck
          </h3>
          <p className="text-gray-200 text-lg mb-8 max-w-3xl mx-auto">
            CleanSip Strohhalme wurden für den professionellen Einsatz entwickelt. 
            Gastronomie, Events und anspruchsvolle Kunden vertrauen auf unsere bewährte Qualität.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/product/cleansip-100"
              className="bg-primary-500 text-white px-8 py-4 font-bold border-2 border-white hover:bg-white hover:text-primary-500 transition-all duration-300 uppercase tracking-wider"
            >
              Jetzt bestellen
            </Link>
            <Link 
              href="/kontakt"
              className="bg-transparent text-white px-8 py-4 font-bold border-2 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
            >
              Beratung anfragen
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

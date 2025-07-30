'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Launch date - set to 60 days from now
const LAUNCH_DATE = new Date();
LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 60);

// Future products data
const futureProducts = [
  {
    id: 'PC-50',
    name: 'Premium Party Cups',
    tagline: 'Unzerbrechlich & Stilvoll',
    price: '12.90 CHF',
    originalPrice: '16.90 CHF',
    description: 'Kristallklare Becher mit premium Haptik',
    features: ['BPA-frei', 'Spülmaschinenfest', '500ml Fassungsvermögen'],
  },
  {
    id: 'PS-100', 
    name: 'Eco Rührstäbchen',
    tagline: 'Nachhaltig & Robust',
    price: '5.90 CHF',
    originalPrice: '8.90 CHF',
    description: 'Biologisch abbaubare Rührstäbchen',
    features: ['100% kompostierbar', 'Splitterfrei', '100er Pack'],
  },
  {
    id: 'FB-40',
    name: 'Premium Besteck Set',
    tagline: 'Restaurant-Qualität',
    price: '9.80 CHF',
    originalPrice: '13.90 CHF',
    description: 'Elegantes Besteck für jeden Anlass',
    features: ['Hochwertig', 'Wiederverwendbar', 'Kompakt'],
  }
];

// Timeline roadmap data
const roadmapSteps = [
  { 
    phase: 'Phase 1', 
    title: 'Produktentwicklung', 
    status: 'completed',
    description: 'Design & Prototyping abgeschlossen'
  },
  { 
    phase: 'Phase 2', 
    title: 'Qualitätsprüfung', 
    status: 'current',
    description: 'Extensive Tests in unserem Labor'
  },
  { 
    phase: 'Phase 3', 
    title: 'Produktion', 
    status: 'upcoming',
    description: 'Fertigung der ersten Chargen'
  },
  { 
    phase: 'Phase 4', 
    title: 'Launch', 
    status: 'upcoming',
    description: 'Verfügbar im CleanSip Store'
  }
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = LAUNCH_DATE.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zum Shop
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-secondary">1000+ auf der Warteliste</span>
            </div>
          </div>
        </nav>

        {/* Hero Section - Split Screen */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Bald verfügbar
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                  Die Zukunft von
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Premium</span>
                  <br />Partyzubehör
                </h1>
                
                <p className="text-xl text-secondary/70 leading-relaxed">
                  CleanSip revolutioniert Events mit unzerbrechlichen Cups, nachhaltigen Rührstäbchen und Premium-Besteck. Erste Chance sichern!
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-secondary">Launch Countdown</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Tage', value: timeLeft.days },
                    { label: 'Stunden', value: timeLeft.hours },
                    { label: 'Minuten', value: timeLeft.minutes },
                    { label: 'Sekunden', value: timeLeft.seconds }
                  ].map((item, index) => (
                    <div key={item.label} className="text-center">
                      <div className="relative">
                        <div className="text-4xl lg:text-5xl font-bold text-secondary mb-2 bg-white/50 backdrop-blur-sm rounded-2xl py-4 border border-white/20">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
                      </div>
                      <span className="text-sm font-medium text-secondary/60 uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                {!isSubmitted ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary">Exklusiver Früh-Zugang</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-secondary/70">Jetzt anmelden & </span>
                          <span className="px-2 py-1 bg-accent text-secondary text-xs font-bold rounded-full">10% Rabatt</span>
                          <span className="text-sm text-secondary/70"> sichern</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="deine@email.ch"
                          required
                          className="w-full h-14 pl-6 pr-32 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl text-secondary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                          type="submit"
                          className="absolute right-2 top-2 h-10 px-6 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                        >
                          Anmelden
                        </button>
                      </div>
                      <p className="text-xs text-secondary/60">
                        🎁 10% Launch-Rabatt • 📧 Nur wichtige Updates • 🚫 Kein Spam
                      </p>
                    </form>
                  </div>
                ) : (
                  <div className="text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Willkommen an Bord! 🎉</h3>
                    <p className="text-secondary/70">Du erhältst eine E-Mail sobald der Launch startet.</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
                      <span className="text-sm font-medium text-secondary">10% Rabatt-Code wurde gesendet</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Product Preview */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">Premium Collection Preview</h3>
              
              <div className="grid gap-6">
                {futureProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group relative bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/30 hover:bg-white/60 transition-all duration-500 cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl backdrop-blur-[2px]"></div>
                    
                    {/* Coming Soon Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full z-10">
                      Bald verfügbar
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-secondary">{product.name}</h4>
                          </div>
                          <p className="text-sm text-primary font-medium">{product.tagline}</p>
                          <p className="text-sm text-secondary/70">{product.description}</p>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-primary">{product.price}</span>
                            <span className="text-sm text-secondary/50 line-through">{product.originalPrice}</span>
                            <span className="px-2 py-1 bg-accent/20 text-secondary text-xs font-bold rounded">-24%</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Details */}
                      <div className={`mt-4 space-y-3 transition-all duration-300 ${
                        hoveredProduct === product.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}>
                        <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold text-secondary">Highlights:</h5>
                          <div className="grid grid-cols-1 gap-1">
                            {product.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="text-sm text-secondary/80">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline/Roadmap */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">Entwicklungs-Roadmap</h2>
            <p className="text-lg text-secondary/70">Von der Idee zum perfekten Produkt</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-gray-300 rounded-full"></div>

            <div className="space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={step.phase} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <div className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 ${
                      index % 2 === 1 ? 'text-right' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100 text-green-600' :
                          step.status === 'current' ? 'bg-primary/10 text-primary' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {step.status === 'completed' ? '✓' : 
                           step.status === 'current' ? '⚡' : '○'}
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary">{step.title}</h3>
                          <span className="text-sm text-secondary/50">{step.phase}</span>
                        </div>
                      </div>
                      <p className="text-sm text-secondary/70">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'current' ? 'bg-primary' : 'bg-gray-300'
                  }`}></div>
                  
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof & CTA */}
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary">Sei Teil der CleanSip Revolution</h2>
              <div className="flex items-center justify-center gap-8 text-sm text-secondary/70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>1000+ Vorbestellungen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">⭐</span>
                  </div>
                  <span>98% Kundenzufriedenheit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">🚀</span>
                  </div>
                  <span>48h Lieferung</span>
                </div>
              </div>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Aktuelle Produkte entdecken
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

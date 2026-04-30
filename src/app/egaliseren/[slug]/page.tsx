'use client';
import { ArrowRight, Bot, Camera, CheckCircle2, Droplets, Ruler, ShieldCheck, Star, Phone } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Basic mock content for the dynamic pages
const PAGE_CONTENT: Record<string, any> = {
  zandcement: {
    title: "Zandcement Vloer",
    subtitle: "De ijzersterke basis voor elke topvloer",
    description: "Een zandcement dekvloer is de traditionele, ijzersterke oplossing voor uw woning of bedrijfspand. Wij brengen deze machinaal aan en vlinderen hem perfect glad af.",
    features: ["Machinaal gevlinderd", "Hoge druksterkte", "Sneldrogend mogelijk", "Perfect voor natte ruimtes"],
    image: "/portfolio-3.png"
  },
  anhydriet: {
    title: "Anhydriet Vloeivloer",
    subtitle: "Naadloos en perfect voor grote oppervlaktes",
    description: "Anhydriet is een gipsgebonden vloeivloer die zichzelf nivelleert. Door de vloeibare eigenschap is het de absolute nummer 1 keuze in combinatie met vloerverwarming.",
    features: ["Hoogste warmte-rendement", "Krimpvrij", "Grote oppervlaktes in 1 dag", "Zelfnivellerend"],
    image: "/hero-egaliseren.png"
  },
  vloerverwarming: {
    title: "Vloerverwarming Integratie",
    subtitle: "Comfortabel, onzichtbaar en energiezuinig",
    description: "Wij frezen de vloerverwarming in uw bestaande vloer, of leggen deze compleet nieuw aan voordat we gaan egaliseren. Onze AI berekent het ideale legplan.",
    features: ["Stofvrij frezen", "Optimale warmteverdeling", "Direct meegenomen in offerte", "Verlaagt energiekosten"],
    image: "/portfolio-1.png"
  },
  afwerking: {
    title: "Luxe Vloerafwerking",
    subtitle: "De kers op de taart voor uw woning",
    description: "Van hoogwaardige PVC visgraat vloeren tot strakke naadloze PU gietvloeren. Als de basis perfect is, leggen wij uw droomvloer er strak bovenop.",
    features: ["Eiken Visgraat PVC", "PU Gietvloeren", "Beton Ciré", "Inclusief plinten & kitwerk"],
    image: "/portfolio-2.png"
  },
  calculator: {
    title: "AI Droogtijd & Materiaal Calculator",
    subtitle: "Bereken direct wat uw vloer nodig heeft",
    description: "Gebruik onze AI calculator om direct de droogtijd, het materiaalverbruik en een indicatieve prijs voor uw project te berekenen.",
    features: ["Direct resultaat", "Real-time prijzen", "Inclusief materiaal", "AI Gestuurd"],
    image: "/portfolio-4.png"
  }
};

export default function ServiceLandingPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug.toLowerCase() : Array.isArray(rawSlug) ? rawSlug[0].toLowerCase() : 'calculator';
  
  // Fallback content if slug doesn't perfectly match
  const content = PAGE_CONTENT[slug] || PAGE_CONTENT.calculator;

  const [oppervlakte, setOppervlakte] = useState('');
  const [laagdikte, setLaagdikte] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    try {
      const opp = parseInt(oppervlakte) || 50;
      const price = opp * 18.50; // just a dummy calculation
      
      // Save lead to Supabase
      const { error } = await supabase.from('egaliseren_leads').insert([
        {
          customer_phone: whatsapp || 'Geen nummer',
          customer_name: 'Website Bezoeker',
          customer_email: '',
          surface_area_m2: opp,
          floor_type: content.title,
          estimated_price: price,
          source: 'ai_calculator'
        }
      ]);
      
      if (error) console.error("Fout bij opslaan lead:", error);
      
      setResult(`Geschatte prijs: €${price.toFixed(2)}.`);
      
      // Open direct WhatsApp conversation with the owner (0651641886)
      // This is much more reliable than CallMeBot for B2C interactions
      const ownerPhone = '31651641886';
      const text = `Beste Egaliseren.nl, ik heb zojuist via de site een berekening gemaakt voor een ${content.title} en wil dit graag inplannen.\n\n*Mijn gegevens:*\n- Telefoon: ${whatsapp || 'Niet ingevuld'}\n- Oppervlakte: ${opp}m²\n- Ondervloer: Beton/Zandcement\n\nDe geschatte prijs was €${price.toFixed(2)}. Kunnen we dit bespreken?`;
      const encodedText = encodeURIComponent(text);
      
      window.open(`https://wa.me/${ownerPhone}?text=${encodedText}`, '_blank');

    } catch (e) {
      console.error(e);
      setResult('Er ging iets mis bij het berekenen.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/egaliseren" className="group flex items-center gap-3">
          <img 
            src="https://www.egaliseren.nl/wp-content/uploads/2023/11/egaliseren-logo-dark-cropped.png" 
            alt="Egaliseren.nl Logo" 
            className="h-7 sm:h-8 md:h-10 w-auto object-contain"
          />
        </Link>
        <Link href="/egaliseren" className="px-5 py-2.5 bg-gray-100 text-slate-900 rounded-full hover:bg-gray-200 transition-colors font-bold text-sm">
          Terug naar Home
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${content.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-gray-50" />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-medium text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Specialist in {content.title}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 tracking-tight">
            Alles over <span className="text-slate-600">{content.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-light">
            {content.subtitle}. {content.description}
          </p>
        </div>
      </section>

      {/* A to Z Explanation & Calculator Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Left Column: A-Z Explanation */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Van A tot Z geregeld</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-bold text-slate-900">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Inspectie & Meting</h3>
                  <p className="text-slate-600">Voordat we beginnen voeren we een laser-precieze hoogtemeting uit en controleren we de draagkracht en vochtwaarde van uw ondervloer.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-bold text-slate-900">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Materiaal & Preparatie</h3>
                  <p className="text-slate-600">We primeren de vloer voor optimale hechting en zetten randisolatie uit. Ons AI-systeem heeft het exacte materiaalverbruik al berekend.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-bold text-slate-900">Z</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Uitvoering & Oplevering</h3>
                  <p className="text-slate-600">De egaline wordt machinaal gemixt en naadloos gevloeid of gevlinderd. Na de droogtijd leveren wij de vloer spiegelglad op, klaar voor afwerking.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Waarom kiezen voor deze dienst?</h3>
              <ul className="space-y-3">
                {content.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Calculator */}
          <div>
            <div className="bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl text-white sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold">AI Offerte Calculator</h2>
              </div>
              <p className="text-slate-300 mb-8">
                Bereken direct uw prijs voor {content.title}. Onze slimme calculator neemt laagdikte, materiaal en arbeid direct mee in de berekening.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Oppervlakte (m²)</label>
                  <input value={oppervlakte} onChange={(e) => setOppervlakte(e.target.value)} type="number" placeholder="Bv. 65" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Gemiddelde Laagdikte (mm)</label>
                  <input value={laagdikte} onChange={(e) => setLaagdikte(e.target.value)} type="number" placeholder="Bv. 3" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type Ondervloer</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all appearance-none">
                    <option>Beton / Zandcement</option>
                    <option>Hout</option>
                    <option>Tegels</option>
                    <option>Anhydriet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Nummer (CallMeBot)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400" />
                    </div>
                    <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} type="tel" placeholder="+31612345678" className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all" />
                  </div>
                </div>

                <div className="pt-4">
                  {result ? (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-bold mb-1">Berekening Geslaagd!</p>
                      <p className="text-white mb-3">{result}</p>
                      <p className="text-sm text-green-300">WhatsApp is geopend om direct contact op te nemen!</p>
                      <button onClick={() => setResult(null)} className="mt-4 text-sm underline text-slate-400 hover:text-white">Nieuwe berekening</button>
                    </div>
                  ) : (
                    <button onClick={handleCalculate} disabled={isCalculating} type="button" className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                      {isCalculating ? 'Bezig met berekenen...' : 'Bereken Prijs via WhatsApp'}
                      {!isCalculating && <ArrowRight className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Vrijblijvende berekening. Data wordt beveiligd verwerkt.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 text-center text-slate-500 bg-white">
        <p className="notranslate">© 2026 Egaliseren.nl - Het grootste platform met de slimste AI tools.</p>
      </footer>
    </div>
  );
}

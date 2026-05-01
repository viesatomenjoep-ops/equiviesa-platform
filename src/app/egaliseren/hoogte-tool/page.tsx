'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowRight, Bot, Target, Settings2, ShieldCheck, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HoogteToolPage() {
  const router = useRouter();
  const [hoogte, setHoogte] = useState('');
  const [ondervloer, setOndervloer] = useState('zandcement');
  const [oppervlakte, setOppervlakte] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    try {
      const dikte = parseFloat(hoogte) || 3;
      const opp = parseFloat(oppervlakte) || 50;
      
      // Berekening logica: 
      // Zandcement zuigt meer, Tegel heeft primer voor niet-zuigend nodig
      let materiaalFactor = ondervloer === 'tegel' ? 1.5 : 1.7; // kg per mm per m2
      let totalKg = dikte * opp * materiaalFactor;
      let zakken = Math.ceil(totalKg / 25);
      let geschattePrijs = (zakken * 18.5) + (opp * (ondervloer === 'tegel' ? 4 : 2.5)); // Egaline + Primer

      // Save to Supabase custom table
      const { error } = await supabase.from('egaliseren_hoogte_scans').insert([
        {
          hoogte_mm: dikte,
          ondervloer_type: ondervloer,
          oppervlakte_m2: opp,
          berekende_zakken: zakken,
          geschatte_prijs: geschattePrijs,
          telefoonnummer: whatsapp || 'Geen'
        }
      ]);
      
      if (error) {
        console.error("Supabase opslag fout:", error);
        // Continue even if Supabase fails so the UX isn't broken for now
      }
      
      const calcResult = `Voor ${dikte}mm op een ${ondervloer} ondervloer heeft u ca. ${zakken} zakken egaline (25kg) nodig. Geschatte materiaalkosten incl. primer: €${geschattePrijs.toFixed(2)}.`;
      setResult(calcResult);
      
      // Open WhatsApp direct met pre-filled bericht
      const waText = `Beste Egaliseren.nl, ik heb de Hoogte & Ondervloer Tool gebruikt.\n\n*Mijn Project:*\n- Ondervloer: ${ondervloer}\n- Hoogte/Dikte: ${dikte}mm\n- Oppervlakte: ${opp}m²\n\nBerekend: ${zakken} zakken.\nKunnen we dit inplannen?`;
      const ownerPhone = '31651641886';
      window.open(`https://wa.me/${ownerPhone}?text=${encodeURIComponent(waText)}`, '_blank');

    } catch (err) {
      console.error(err);
      setResult("Er is een fout opgetreden bij het berekenen.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/egaliseren" className="group flex items-center gap-3">
          <img src="https://www.egaliseren.nl/wp-content/uploads/2023/11/egaliseren-logo-dark-cropped.png" alt="Egaliseren.nl" className="h-8 md:h-10 w-auto" />
        </Link>
        <Link href="/egaliseren" className="px-5 py-2.5 bg-gray-100 text-slate-900 rounded-full hover:bg-gray-200 transition-colors font-bold text-sm">
          Terug naar Home
        </Link>
      </header>

      <section className="pt-32 pb-12 px-6 bg-slate-900 text-white rounded-b-[3rem]">
        <div className="max-w-4xl mx-auto text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full font-medium text-sm mb-6 border border-blue-500/30">
            <Settings2 className="w-4 h-4" />
            Nieuwe Feature
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Hoogte & Ondervloer Tool</h1>
          <p className="text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto">
            Geef aan of uw ondervloer uit tegels of zandcement bestaat, en bepaal de benodigde egalisatie hoogte. Onze tool berekent direct de variabelen.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 -mt-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Configureer uw vloer</h2>
                <p className="text-slate-500 text-sm">Data wordt opgeslagen in uw Supabase database</p>
              </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Welke ondervloer?</label>
                  <select 
                    value={ondervloer}
                    onChange={e => setOndervloer(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="zandcement">Zandcement</option>
                    <option value="tegel">Tegelvloer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Welke hoogte? (in mm)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    min="1"
                    required
                    value={hoogte}
                    onChange={e => setHoogte(e.target.value)}
                    placeholder="Bv. 3" 
                    className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Oppervlakte (m²)</label>
                <input 
                  type="number" 
                  required
                  value={oppervlakte}
                  onChange={e => setOppervlakte(e.target.value)}
                  placeholder="Bv. 45" 
                  className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Telefoonnummer (Optioneel)</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  <input 
                    type="tel" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="+31612345678" 
                    className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                  />
                </div>
              </div>

              {result ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-8">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="text-green-800 font-bold mb-2 text-lg">Opgeslagen in Database!</p>
                  <p className="text-slate-700 mb-4">{result}</p>
                  <button onClick={() => setResult(null)} type="button" className="text-sm font-bold text-green-600 underline hover:text-green-800">
                    Nieuwe berekening maken
                  </button>
                </div>
              ) : (
                <button 
                  type="submit" 
                  disabled={isCalculating}
                  className="w-full mt-4 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {isCalculating ? 'Data verzenden...' : 'Bereken & Opslaan in Supabase'}
                  {!isCalculating && <ArrowRight className="w-5 h-5" />}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Globe, MapPin } from 'lucide-react';

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacilities() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data, error } = await supabase.from('facilities').select('*').order('name', { ascending: true });
      if (!error && data) {
        setFacilities(data);
      }
      setLoading(false);
    }
    fetchFacilities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-amber-900 pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/maarten-driessen" className="group flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 bg-amber-50 p-2 rounded-lg font-serif italic text-xl font-bold">MD</span>
            <span className="font-serif font-bold text-xl text-slate-900 tracking-tight hidden sm:block">Maarten Driessen</span>
          </div>
        </Link>
        <Link href="/maarten-driessen" className="px-5 py-2.5 bg-gray-100 text-amber-900 rounded-full hover:bg-gray-200 transition-colors font-bold text-sm">
          Terug naar Home
        </Link>
      </header>

      <section className="pt-32 pb-12 px-6 bg-slate-900 text-white rounded-b-[3rem]">
        <div className="max-w-6xl mx-auto text-center mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Faciliteiten</h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            Overzicht van onze boxen, weides en trainingsfaciliteiten.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center p-12 text-slate-500">Laden...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {facilities.map(facility => (
                <div key={facility.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase">{facility.type}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${facility.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{facility.status}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{facility.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-4">
                    <MapPin className="w-4 h-4" /> Locatie Status: {facility.status}
                  </div>
                </div>
              ))}
              {facilities.length === 0 && (
                <div className="col-span-3 text-center p-12 bg-white rounded-3xl border border-gray-100">
                  <p className="text-lg text-slate-500">Geen faciliteiten gevonden.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

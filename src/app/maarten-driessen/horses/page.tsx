'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ShieldCheck, Calendar, Activity } from 'lucide-react';

export default function HorsesDatabase() {
  const [horses, setHorses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHorses() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data, error } = await supabase.from('horses').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setHorses(data);
      }
      setLoading(false);
    }
    fetchHorses();
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Paarden Database</h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            Live overzicht van alle paarden in training, verkoop, of management.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center p-12 text-slate-500">Laden...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {horses.map(horse => (
                <div key={horse.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col">
                  {horse.cover_image_url && (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img src={horse.cover_image_url} alt={horse.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{horse.name}</h3>
                  <p className="text-amber-600 font-medium mb-4">{horse.discipline} • {horse.gender}</p>
                  
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" /> Geboortejaar: {horse.birth_year}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Activity className="w-4 h-4" /> Status: {horse.status}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <ShieldCheck className="w-4 h-4" /> Prijs: {horse.price_category}
                    </div>
                  </div>
                </div>
              ))}
              {horses.length === 0 && (
                <div className="col-span-3 text-center p-12 bg-white rounded-3xl border border-gray-100">
                  <p className="text-lg text-slate-500">Geen paarden gevonden in de database.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

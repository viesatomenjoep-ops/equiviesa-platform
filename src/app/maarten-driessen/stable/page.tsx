'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { CheckSquare, Calendar, User } from 'lucide-react';

export default function StableManagement() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data, error } = await supabase.from('stable_tasks').select('*, horses(name)').order('scheduled_at', { ascending: true });
      if (!error && data) {
        setTasks(data);
      }
      setLoading(false);
    }
    fetchTasks();
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Stable Management (Takenbord)</h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            Volg de dagelijkse taken en trainingen van alle paarden.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center p-12 text-slate-500">Laden...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <div key={task.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase">{task.task_type}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.status === 'Klaar' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{task.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{task.title}</h3>
                  <p className="text-amber-600 font-medium mb-4">{task.horses?.name || 'Algemene Taak'}</p>
                  
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" /> Gepland: {new Date(task.scheduled_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="col-span-3 text-center p-12 bg-white rounded-3xl border border-gray-100">
                  <p className="text-lg text-slate-500">Geen actieve taken op het whiteboard.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

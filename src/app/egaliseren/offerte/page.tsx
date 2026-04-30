'use client';
import { Bot, Camera, CheckCircle2, ChevronRight, Globe, Ruler, Smartphone, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function OfferteHubPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadResult(null);
    setTimeout(() => {
      setIsUploading(false);
      setUploadResult('✅ AI Analyse Voltooid: Geschatte oppervlakte: ~45m². Aanbevolen behandeling: Zandcement. Geschatte Offerte: € 1.250,-');
    }, 2500);
  };

  const tools = [
    {
      title: "AI Droogtijd Calculator",
      description: "Bereken de exacte droogtijd van uw vloer o.b.v. luchtvochtigheid en dikte.",
      icon: <Bot className="w-8 h-8 text-blue-500" />,
      link: "/egaliseren/calculator",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Materiaal Calculator",
      description: "Weet direct hoeveel zakken egaline en primer u exact nodig heeft.",
      icon: <Ruler className="w-8 h-8 text-emerald-500" />,
      link: "/egaliseren/calculator",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      title: "Vloerverwarming Planner",
      description: "Bereken het legplan en de warmteopbrengst voor uw vierkante meters.",
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      link: "/egaliseren/calculator",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Live Offerte Generator",
      description: "Directe prijsberekening via WhatsApp met onze CallMeBot flow.",
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      link: "/egaliseren/calculator",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 pb-20">
      {/* Header */}
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
      <section className="pt-32 pb-12 px-6 bg-slate-900 text-white rounded-b-[3rem]">
        <div className="max-w-4xl mx-auto text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full font-medium text-sm mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI Aangedreven Offertes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Alle Offerte Tools op 1 Plek
          </h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            Egaliseren.nl is het grootste platform van Nederland. Kies hieronder de slimme AI tool die u nodig heeft en ontvang direct antwoord.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-12 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* AI Photo Scan Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Directe Vloer Inspectie Scan</h2>
              <p className="text-slate-600">Upload een foto van uw huidige vloer. Onze AI analyseert de ruimte direct op oneffenheden, oppervlakte en berekent realtime een offerte.</p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-gray-50 border-2 border-dashed border-slate-300 rounded-3xl p-10 hover:border-slate-900 transition-colors">
              {!isUploading && !uploadResult ? (
                <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleUpload}>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Camera className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Klik hier om uw foto te uploaden</h3>
                  <p className="text-slate-500 font-medium">Ondersteunt JPG, PNG en HEIC bestanden</p>
                </div>
              ) : isUploading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">AI analyseert de vloer...</h3>
                  <p className="text-slate-500">Oppervlakte en staat van de vloer worden berekend</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{uploadResult}</h3>
                  <div className="flex gap-4">
                    <Link href="/egaliseren/calculator" className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
                      Accepteren & Plannen
                    </Link>
                    <button onClick={() => setUploadResult(null)} className="px-6 py-3 border border-gray-300 text-slate-900 rounded-full hover:bg-gray-100 font-bold transition-colors">
                      Nieuwe Foto
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Calculators Grid */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 px-2">Andere AI Offerte Calculators</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, idx) => (
                <Link href={tool.link} key={idx}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`h-full border ${tool.color} bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all group flex gap-6 items-start`}
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-sm font-bold text-slate-900">
                        Start Tool <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

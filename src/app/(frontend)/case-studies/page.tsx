'use client';

import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "Egaliseren.nl",
      category: "Construction & Services",
      results: ["Top 3 Google Ranking", "300% Increase in Leads", "Fully Automated Quoting"],
      description: "We completely transformed Egaliseren.nl from a standard brochure website into an automated lead-generation machine. By implementing targeted SEO clusters around high-value keywords and integrating a seamless CRM, they now handle 3x the volume without hiring extra administrative staff.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Global Logistics Group",
      category: "Transport & Logistics",
      results: ["AI Customer Support", "Custom ERP Dashboard", "Saved 40hrs/week"],
      description: "Handling thousands of inquiries was overwhelming their staff. We implemented a custom AI-driven customer service bot and a specialized internal dashboard, cutting manual data entry by 40 hours a week and improving response times to under 2 minutes.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight"
          >
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Results</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Explore how VIESA Automations has fundamentally changed the way our clients operate, scale, and dominate their industries.
          </motion.p>
        </div>

        <div className="space-y-16">
          {cases.map((study, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-white/20 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* We use standard img to avoid Next config errors with Unsplash */}
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-2">{study.category}</div>
                <h3 className="text-3xl font-bold mb-6">{study.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {study.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {study.results.map((result, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <BarChart3 className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                      <div className="text-sm font-bold text-slate-200">{result}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <button className="inline-flex items-center gap-2 text-white font-bold hover:text-sky-400 transition-colors">
                    Read Full Case Study
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Want to be our next success story?</h2>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors">
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

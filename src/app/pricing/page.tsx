'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollLogo from '@/components/frontend/ScrollLogo';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MobileMenu from '@/components/frontend/MobileMenu';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:p-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity">
            <ScrollLogo>
              <motion.div whileHover={{ scale: 1.5, rotate: 180 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                <Image src="/logo.png" alt="Viesa Logo" width={80} height={80} className="w-10 h-10 md:w-20 md:h-20 object-contain" />
              </motion.div>
            </ScrollLogo>
            <span className="text-lg md:text-4xl font-serif font-bold tracking-tight uppercase leading-none text-white">
              VIESA
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1 shadow-xl">
          <LanguageSwitcher expandDirection="down" />
          <MobileMenu />
        </div>
      </header>

      {/* Pricing Content */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-serif"
          >
            Transparent Investment.<br className="hidden md:block"/> Maximum Dominance.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            No lock-in contracts. Our platform is <span className="text-white font-bold">cancellable monthly</span>.
          </motion.p>
        </div>

        {/* Special Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-gradient-to-r from-blue-900/20 to-slate-800/40 border border-blue-500/30 rounded-2xl p-6 md:p-8 text-center max-w-4xl mx-auto shadow-2xl shadow-blue-900/10"
        >
          <h3 className="text-2xl font-bold text-white mb-3">💎 Exclusive Loyalty Bonus</h3>
          <p className="text-lg text-slate-300">
            If you remain a continuous member for the first year, we reward your loyalty with a <span className="font-bold text-white text-xl">30% discount</span> on your subscription for the entire second year!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold mb-2">Viesa Pro</h3>
            <p className="text-slate-400 mb-8">The all-in-one foundation for your digital growth.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">€499</span>
              <span className="text-slate-400"> /month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['Complete CRM & CMS System', 'Lead Automation', 'SEO & Website Optimization', 'Monthly cancellable', 'Includes hosting & maintenance'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-bold">
              Start Now
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 flex flex-col shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-white text-slate-950 text-xs font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-3xl font-bold mb-2">Enterprise Blueprint</h3>
            <p className="text-slate-400 mb-8">For companies that want to completely dominate the market.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">Custom</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['Full ERP Integration', 'AI Customer Service Bots', 'Custom Workflows & Dashboards', 'Dedicated Account Manager', 'Guaranteed top 3 Google Ranking'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-colors font-bold flex items-center justify-center gap-2">
              Schedule Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

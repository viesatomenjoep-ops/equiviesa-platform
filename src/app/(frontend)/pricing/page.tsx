'use client'

import { useState } from 'react'
import { Check, Star, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  const [horseRange, setHorseRange] = useState('0-10')

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary dark:text-white mb-6 uppercase tracking-tight">
          Elevate Your Stable
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Choose the perfect Equihub membership to digitize your operations, simplify stable management, and unlock your true potential.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* PRO MEMBER (Standard) */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Star size={120} />
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-2">Pro Member</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 h-12">Best for ambitious stables who want to simplify their daily operations and save time.</p>
          
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Prices that grow with your stable</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif font-bold text-primary dark:text-white">€ 1.900</span>
              <span className="text-gray-500 font-medium">/ year</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Ex. VAT and taxes</p>
          </div>

          <div className="mb-8">
            <p className="text-sm font-bold text-primary dark:text-white mb-3">Number of horses</p>
            <div className="flex flex-wrap gap-2">
              {['0-10', '11-20', '21-30', '31-40'].map(range => (
                <button 
                  key={range}
                  onClick={() => setHorseRange(range)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all outline-none ${
                    horseRange === range 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic mt-3">
              More than 40 horses? The Super Member tier is the perfect solution for you.
            </p>
          </div>

          <div className="mb-10 flex-1">
            <p className="text-sm font-bold text-primary dark:text-white mb-4">Include optional add-ons:</p>
            <div className="space-y-4">
              <Addon label="Sales Module" price="€ 400/year" />
              <Addon label="Breeding Module" price="€ 400/year" />
              <Addon label="Finance Module" price="€ 600/year" />
            </div>
          </div>

          <button className="w-full py-4 rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary font-bold tracking-wider uppercase transition-colors flex justify-center items-center gap-2 group">
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">No credit card required. Cancel anytime.</p>
        </div>

        {/* SUPER MEMBER (Pro) */}
        <div className="bg-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col transform lg:-translate-y-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest rounded-full w-max mb-6 border border-accent/30">
            Most Popular
          </div>

          <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wider mb-2">Super Member</h2>
          <p className="text-gray-300 mb-8 h-12">Perfect for professional stables who want to operate at the highest level with zero limitations.</p>
          
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Incredible value for money</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif font-bold text-white">€ 4.000</span>
              <span className="text-gray-300 font-medium">/ year</span>
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded">Save 20%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Ex. VAT and taxes</p>
          </div>

          <div className="mb-8">
            <p className="text-lg font-bold text-white mb-2">Unlimited Horses</p>
            <p className="text-sm text-gray-300 italic leading-relaxed">
              We offer an optional, personalized white-glove onboarding experience. We'll manage your entire transition to Equihub so you don't lose a single minute.
            </p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-sm font-bold text-white mb-4">All the features in Pro Member, plus:</p>
            <Feature label="Sales Module Included" />
            <Feature label="Breeding Module Included" />
            <Feature label="Finance Module Included" />
            <Feature label="Priority 24/7 Support" />
            <Feature label="Custom Integrations" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <button className="w-full py-4 rounded-xl bg-accent text-white hover:bg-white hover:text-primary font-bold tracking-wider uppercase transition-colors shadow-lg">
              Start Free Trial
            </button>
            <button className="w-full py-4 rounded-xl bg-primary-light border-2 border-white/20 text-white hover:bg-white/10 font-bold tracking-wider uppercase transition-colors">
              Talk to Us
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Takes exactly 3 minutes. Cancel anytime.</p>
        </div>

      </div>
    </main>
  )
}

function Addon({ label, price }: { label: string, price: string }) {
  return (
    <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary/50 cursor-pointer transition-colors group">
      <div className="flex items-center gap-3">
        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer" />
        <span className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{label}</span>
      </div>
      <span className="text-gray-500 font-medium text-sm">{price}</span>
    </label>
  )
}

function Feature({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        <Check size={14} strokeWidth={3} />
      </div>
      <span className="font-medium text-gray-100">{label}</span>
    </div>
  )
}

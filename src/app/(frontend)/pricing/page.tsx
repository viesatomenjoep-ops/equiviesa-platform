'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Star, CreditCard, ArrowRight, ShieldCheck, Zap, CheckCircle, Crown } from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'USD'>('EUR')

  const getPrice = (euroPrice: number) => {
    if (currency === 'GBP') return Math.round(euroPrice * 0.85).toLocaleString('en-GB')
    if (currency === 'USD') return Math.round(euroPrice * 1.08).toLocaleString('en-US')
    return euroPrice.toLocaleString('nl-NL')
  }

  const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          From private owners to large commercial stables, we have a plan that fits your needs. Digitize your operations today.
        </p>

        {/* Currency Toggle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(['EUR', 'GBP', 'USD'] as const).map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors ${
                currency === cur ? 'bg-accent text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span 
            onClick={() => setBillingCycle('monthly')}
            className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Monthly
          </span>
          <button 
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 rounded-full bg-primary relative transition-colors focus:outline-none"
          >
            <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span 
              onClick={() => setBillingCycle('yearly')}
              className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Yearly
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full">Save ~16%</span>
          </div>
        </div>
      </div>

      
        <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-slate-800/40 border border-blue-500/30 rounded-2xl p-4 md:p-6 text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">💎 Exclusieve Loyaliteitsbonus</h3>
          <p className="text-sm md:text-base text-blue-200">
            Blijft u het eerste jaar onafgebroken lid? Dan belonen wij uw vertrouwen met <span className="font-bold text-white text-lg">30% korting</span> op uw abonnement in het gehele tweede jaar!
          </p>
        </div>

      {/* Pricing Cards */}
      <div className="max-w-[1440px] px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        
        {/* BASIC */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white rounded-3xl p-8 shadow-2xl relative flex flex-col overflow-hidden">
          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-2 mt-4 flex items-center gap-2 notranslate">
            <CheckCircle size={20} className="text-accent" /> Basic
          </h2>
          <p className="text-slate-400 dark:text-gray-400 text-sm mb-6 h-10">Het alles-in-één fundament voor uw digitale groei.</p>
          
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-white">
                {symbol} {billingCycle === 'yearly' ? getPrice(1990) : getPrice(199)}
              </span>
              <span className="text-slate-400 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4 opacity-0">Placeholder</p>
            <Feature label="Compleet CMS (Website)" dark />
            <Feature label="Standaard Leadautomatisering" dark />
            <Feature label="Basis SEO (On-page)" dark />
            <Feature label="SSL & Beveiliging" dark />
            <Feature label="24/7 Uptime Monitoring" dark />
            <Feature label="Mobiele Optimalisatie" dark />
            <Feature label="Standaard Formulieren" dark />
            <Feature label="Maandelijks opzegbaar" dark />
            <Feature label="Inclusief hosting & onderhoud" dark />
            <Feature label="Email Support (48u reactie)" dark />
          </div>

          <Link href="/register" className="w-full py-4 rounded-xl bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-primary font-bold tracking-wider uppercase transition-colors shadow-lg text-center inline-block mt-auto">
            Start Free Trial
          </Link>
        </div>

        {/* PREMIUM (Most Popular) */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white rounded-3xl p-8 shadow-2xl relative flex flex-col transform md:-translate-y-4 border border-primary-light/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="absolute top-0 inset-x-0 flex justify-center -mt-0">
            <div className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-b-xl">
              Most Popular
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-2 mt-4 flex items-center gap-2 notranslate">
            <Star size={20} className="text-accent" /> Premium
          </h2>
          <p className="text-gray-300 text-sm mb-6 h-10">Voor bedrijven die de markt lokaal volledig willen domineren.</p>
          
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-white">
                {symbol} {billingCycle === 'yearly' ? getPrice(3990) : getPrice(399)}
              </span>
              <span className="text-gray-300 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Everything in Basic, plus:</p>
            <Feature label="Geavanceerd CRM Systeem" dark />
            <Feature label="Email Marketing Automatisering" dark />
            <Feature label="Automatische Facturatie" dark />
            <Feature label="Klantportaal (Client Portal)" dark />
            <Feature label="Dynamische Dashboards" dark />
            <Feature label="Lokale SEO Dominantie" dark />
            <Feature label="Social Media Koppelingen" dark />
            <Feature label="Premium Analytics" dark />
            <Feature label="Geavanceerde ChatWidgets" dark />
            <Feature label="Priority Support (24u reactie)" dark />
          </div>

          <Link href="/register" className="w-full py-4 rounded-xl bg-accent text-white hover:bg-white hover:text-primary font-bold tracking-wider uppercase transition-colors shadow-lg text-center inline-block mt-auto">
            Start Free Trial
          </Link>
        </div>

        {/* ULTRA */}
        <div className="bg-gradient-to-br from-slate-900 to-black border border-accent/40 text-white rounded-3xl p-8 shadow-2xl relative flex flex-col overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-2 mt-4 flex items-center gap-2 notranslate">
            <Crown size={20} className="text-accent" /> Ultra
          </h2>
          <p className="text-gray-300 text-sm mb-6 h-10">De absolute blauwdruk voor onbeperkte, internationale schaalbaarheid.</p>
          
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-white">
                {symbol} {billingCycle === 'yearly' ? getPrice(7990) : getPrice(799)}
              </span>
              <span className="text-gray-300 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Everything in Premium, plus:</p>
            <Feature label="Volledige ERP Integratie" dark />
            <Feature label="AI Klantenservice Bots (24/7)" dark />
            <Feature label="Custom Workflows & API's" dark />
            <Feature label="Gegarandeerde Top 3 Google" dark />
            <Feature label="Multi-Language Support" dark />
            <Feature label="Dedicated Account Manager" dark />
            <Feature label="Ondersteuning voor meerdere vestigingen" dark />
            <Feature label="Personeel Management Portal" dark />
            <Feature label="Custom App Development Opties" dark />
            <Feature label="24/7 VIP Telefoon Support" dark />
          </div>

          <Link href="/register" className="w-full py-4 rounded-xl bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold tracking-wider uppercase transition-colors shadow-lg text-center inline-block mt-auto">
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Payment Methods & Trust Section */}
      <div className="max-w-4xl mx-auto border-t border-white/10 pt-16 mt-16 text-center">
        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider mb-8">
          Secure & Flexible Payments
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* iDeal */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-md bg-[#CC0066] flex items-center justify-center text-white">i</div>
            DEAL
          </div>
          {/* Credit Card */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <CreditCard size={24} />
            Visa / Mastercard
          </div>
          {/* SEPA */}
          <div className="flex items-center gap-2 font-bold text-lg italic">
            SEPA Direct Debit
          </div>
          {/* Apple Pay */}
          <div className="flex items-center gap-2 font-bold text-lg">
             Pay
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-12 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <div className="flex flex-col gap-2">
            <ShieldCheck className="text-accent" size={28} />
            <h4 className="font-bold text-white dark:text-white">Cancel Anytime</h4>
            <p className="text-sm text-slate-400">No long-term commitments. You can cancel your monthly subscription at any time with one click.</p>
          </div>
          <div className="flex flex-col gap-2">
            <CreditCard className="text-accent" size={28} />
            <h4 className="font-bold text-white dark:text-white">Automated Invoicing</h4>
            <p className="text-sm text-slate-400">Receive VAT-compliant invoices automatically every month or year for your administration.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Star className="text-accent" size={28} />
            <h4 className="font-bold text-white dark:text-white">14-Day Free Trial</h4>
            <p className="text-sm text-slate-400">Try our Basic or Premium plan for 14 days completely free. No credit card required to start.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function Feature({ label, dark = false }: { label: string, dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${dark ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary dark:bg-white/10 dark:text-white'}`}>
        <Check size={12} strokeWidth={3} />
      </div>
      <span className={`font-medium text-sm ${dark ? 'text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
    </div>
  )
}

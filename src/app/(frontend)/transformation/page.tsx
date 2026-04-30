'use client';

import { motion } from 'motion/react';
import { Bot, Zap, Globe, Cpu, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function TransformationPage() {
  const steps = [
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Digital Presence",
      description: "We rebuild your entire online foundation. From a high-converting Next.js platform to advanced SEO clusters that ensure you dominate local and national search results."
    },
    {
      icon: <Cpu className="w-8 h-8 text-sky-400" />,
      title: "VIESA Automations",
      description: "Custom built CRM & ERP systems that seamlessly integrate with your website. Every lead is automatically captured, enriched, and pushed into your sales pipeline without any manual data entry."
    },
    {
      icon: <Bot className="w-8 h-8 text-indigo-400" />,
      title: "AI Automations",
      description: "Intelligent customer service bots, automated review generation, and AI-driven quote drafting. Let artificial intelligence handle the repetitive tasks so your team can focus on closing deals."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal-400" />,
      title: "Exponential Growth",
      description: "With a fully automated ecosystem, your business scales effortlessly. Handle 10x the volume of leads and projects without needing to expand your administrative staff."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight"
          >
            Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Transformation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            We don't just build websites; we engineer fully automated ecosystems. Discover how VIESA Automations and bespoke AI solutions can eliminate manual labor and skyrocket your revenue.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group"
            >
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/20">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl shadow-blue-900/50"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Success?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Stop wasting time on repetitive tasks. Let us build your bespoke digital blueprint today.
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
            View Our Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

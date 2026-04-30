'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import {
  Zap,
  TrendingUp,
  Target,
  MessageCircle,
  Smartphone,
  Bot,
  Star,
  ArrowRight,
  CheckCircle2,
  Globe,
  MessageSquare,
  Crown
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MobileMenu from '@/components/frontend/MobileMenu';
import ScrollLogo from '@/components/frontend/ScrollLogo';
import Link from 'next/link';
import Image from 'next/image';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white overflow-x-hidden dark">
      {/* Top Navigation / Tool Selector */}
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:p-6 flex justify-between items-center bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-3 md:gap-4">
            <ScrollLogo>
              <motion.div whileHover={{ scale: 1.5, rotate: 180 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                <Image src="/logo.png" alt="Viesa Logo" width={80} height={80} className="w-10 h-10 md:w-20 md:h-20 object-contain" />
              </motion.div>
            </ScrollLogo>
            <span className="font-serif tracking-tight uppercase leading-none text-white flex items-baseline gap-2 notranslate">
              <span className="text-lg md:text-4xl font-bold">VIESA</span>
              <span className="text-sm md:text-2xl font-medium text-slate-300">Automations</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1 shadow-xl relative">
          <div className="absolute inset-0 backdrop-blur-md rounded-full -z-10 pointer-events-none"></div>
          <LanguageSwitcher expandDirection="down" />
          <MobileMenu />
        </div>
      </header>

      {/* Mouse follower gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight font-bold notranslate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                VIESA
              </span>
              <br />
              <span className="text-white">AUTOMATIONS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The Blueprint for Digital Dominance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/transformation" className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 flex items-center gap-2 justify-center font-bold">
              Start Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/case-studies" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border border-blue-400/50 rounded-full hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center font-bold">
              View Case Studies
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <Section title="The Vision" subtitle="A Fully Automated Foundation">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
              In today's market, it is not the company that works the hardest that wins, but the company that operates the smartest.
              VIESA Automations does not just offer standalone tools, but a complete <span className="text-blue-400">"Blueprint"</span>.
            </p>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              We automate your business from the very first click of a potential client to the final invoicing and aftercare.
              With our systems, you build a scalable model where you are no longer dependent on manual processes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <FeatureCard icon={<MessageCircle />} title="CRM" />
            <FeatureCard icon={<Globe />} title="CMS" />
            <FeatureCard icon={<Target />} title="ERP" />
            <FeatureCard icon={<Bot />} title="AI Automations" />
          </motion.div>
        </div>
      </Section>

      {/* SEO Section */}
      <Section title="Google Dominance" subtitle="The Path to Number 1">
        <div className="space-y-8">
          <SeoFeature
            icon={<Globe className="w-8 h-8" />}
            title="Local SEO"
            description="We ensure you are the number one choice in your region."
            delay={0.1}
          />
          <SeoFeature
            icon={<Star className="w-8 h-8" />}
            title="Review Automatisering"
            description="Direct na voltooiing van een klus wordt er automatisch een verzoek gestuurd naar de klant. Positieve reviews worden direct gepusht naar Google."
            delay={0.2}
          />
          <SeoFeature
            icon={<TrendingUp className="w-8 h-8" />}
            title="Content & Conversie"
            description="Wij bouwen landingspagina's die bezoekers direct omzetten in leads via geïntegreerde WhatsApp- en Instagram-bots."
            delay={0.3}
          />
        </div>
      </Section>

      
      {/* Value Proposition Section */}
      <Section title="Premium Quality" subtitle="A Fraction of the Market Price">
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl mb-6 font-serif text-white">
              Why pay for separate tools when you can have the ultimate all-in-one ecosystem?
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Typically, you pay exorbitant amounts to development agencies for disjointed systems, standalone CRMs, and slow websites. VIESA Automations delivers a seamlessly integrated, state-of-the-art platform that is vastly superior, for an absolute fraction of the cost.
            </p>
            <div className="flex justify-center">
              <Link href="/pricing" className="px-8 py-4 bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors font-bold flex items-center gap-2">
                Discover Our Pricing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Case Study */}
      <Section title="Case Study" subtitle="Egaliseren.nl - The Power of Automation">
        <div className="bg-white/[0.02] border-white/[0.05] backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <CaseStudyItem
              title="Google Ranking"
              description="Through targeted SEO clusters, we claim top 3 positions for high-value keywords."
            />
            <CaseStudyItem
              title="Interactive Reviews"
              description="Visitors instantly see clickable, verified reviews that build immense trust."
            />
            <CaseStudyItem
              title="Lead-to-Order"
              description="The moment someone lands on the site, automation kicks in. Quote requests are instantly pushed to the CRM."
            />
          </div>
        </div>
      </Section>

      {/* Become a Pro Member */}
      <Section title="Become a Pro Member" subtitle="Join the elite circle of digital pioneers">
        <div className="bg-white/[0.02] border-white/[0.05] backdrop-blur-sm border border-white/[0.05] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center shadow-lg shadow-white/5">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl md:text-4xl mb-4 font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Viesa Pro Membership
            </h3>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Gain access to our exclusive network, advanced blueprint strategies, and premium automation tools. With Viesa Pro, you elevate your digital ecosystem and business growth to the highest possible level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/pricing" className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 flex items-center gap-2 justify-center font-bold">
                Become a Pro Member
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-slate-950 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-bold">
              Ready for Digital Dominance?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-6">
              Start automating your business today
            </p>
            <Link href="/contact" className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 bg-slate-950 text-white rounded-full hover:shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-bold text-lg inline-flex">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-8 px-6 text-center text-blue-300">
        <p className="notranslate">© 2026 VIESA Automations. The Blueprint for Digital Dominance.</p>
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-slate-300">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/[0.02] border-white/[0.05] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:shadow-2xl hover:shadow-white/5 transition-all duration-300 flex flex-col justify-center items-center"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 text-blue-400">
        {icon}
      </div>
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg break-words leading-tight w-full">{title}</h3>
    </motion.div>
  );
}

function SeoFeature({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-gradient-to-r from-blue-900/20 to-transparent border-l-4 border-blue-500 p-6 rounded-r-xl hover:bg-blue-900/30 transition-all duration-300"
    >
      <div className="text-blue-400 mt-1 shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </motion.div>
  );
}

function CaseStudyItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-xl mb-3">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </motion.div>
  );
}


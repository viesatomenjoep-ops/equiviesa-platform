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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden dark">
      {/* Top Navigation / Tool Selector */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* We keep the left side empty or add a small logo if needed */}
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VIESA
              </span>
              <br />
              <span className="text-white">AUTOMATIONS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            De Blauwdruk voor Digitale Dominantie in de Bouw
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 justify-center">
              Start Uw Transformatie
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border border-blue-400/50 rounded-full hover:bg-blue-500/10 transition-all duration-300">
              Bekijk Case Studies
            </button>
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
      <Section title="De Visie" subtitle="Een Volledig Geautomatiseerd Fundament">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              In de huidige markt wint niet het bedrijf dat het hardste werkt, maar het bedrijf dat het slimste is ingericht.
              VIESA Automations biedt geen losse tools, maar een integrale <span className="text-blue-400">"Blueprint"</span>.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              Wij automatiseren uw bedrijf van de allereerste klik van een potentiële klant tot de uiteindelijke facturatie en nazorg.
              Met onze systemen bouwt u een schaalbaar model waarbij u niet meer afhankelijk bent van handmatige processen.
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
            <FeatureCard icon={<MessageSquare />} title="Communicatie" />
            <FeatureCard icon={<Target />} title="Order Processing" />
            <FeatureCard icon={<Zap />} title="Automatisering" />
          </motion.div>
        </div>
      </Section>

      {/* SEO Section */}
      <Section title="Google Dominantie" subtitle="De Weg naar Nummer 1">
        <div className="space-y-8">
          <SeoFeature
            icon={<Globe className="w-8 h-8" />}
            title="Lokale SEO"
            description="Wij zorgen dat u de eerste keuze bent in uw regio."
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

      {/* Case Study */}
      <Section title="Case Study" subtitle="Egaliseren.nl - De Potentie van Automatisering">
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <CaseStudyItem
              title="Google Ranking"
              description="Door gerichte SEO-clusters claimen we de top 3 posities op zoekwoorden zoals 'vloer egaliseren'"
            />
            <CaseStudyItem
              title="Interactive Reviews"
              description="Bezoekers zien direct klikbare, geverifieerde reviews die vertrouwen wekken"
            />
            <CaseStudyItem
              title="Lead-to-Order"
              description="Zodra iemand op de site komt, start de automatisering. Een offerteaanvraag wordt direct in het CRM geschoten"
            />
          </div>
        </div>
      </Section>

      {/* Blueprint Table */}
      <Section title="De Blueprint" subtitle="Techniek in Actie">
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-blue-500/30">
                <th className="text-left p-4 text-blue-300">Onderdeel</th>
                <th className="text-left p-4 text-blue-300">Functionaliteit</th>
                <th className="text-left p-4 text-blue-300">Voordeel</th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                component="Omnichannel"
                functionality="WhatsApp, Telegram, Instagram & Messenger"
                benefit="Altijd bereikbaar, snellere conversie"
                delay={0.1}
              />
              <TableRow
                component="Live Orders"
                functionality="Orders doorschieten via smartphone"
                benefit="Geen papierwerk, direct verwerkt op kantoor"
                delay={0.2}
              />
              <TableRow
                component="Customer Service"
                functionality="AI-gedreven bots voor veelgestelde vragen"
                benefit="Bespaart uren aan telefoonwerk per week"
                delay={0.3}
              />
              <TableRow
                component="Enter Gravity"
                functionality="Naadloze integratie van alle systemen"
                benefit="Eén bron van waarheid voor al uw data"
                delay={0.4}
              />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Pricing */}
      <Section title="Het Verdienmodel" subtitle="Een Win-Win Constructie">
        <div className="grid md:grid-cols-2 gap-8">
          <PricingCard
            title="Het Groei-Abonnement"
            description="Voor een vast maandelijks bedrag krijgt u toegang tot de volledige Blueprint, inclusief updates, hosting en technische ondersteuning."
            features={[
              "Volledige Blueprint Toegang",
              "Maandelijkse Updates",
              "24/7 Technische Support",
              "Hosting Included"
            ]}
          />
          <PricingCard
            title="Het Partnership Model"
            description="Voor specifieke projecten of op maat gemaakte SEO-trajecten delen we de investering en de opbrengst."
            features={[
              "1/3 voor de operatie",
              "1/3 voor de groei",
              "1/3 voor de winst",
              "Gedeelde investering"
            ]}
            highlight
          />
        </div>
      </Section>

      {/* Become a Pro Member */}
      <Section title="Become a Pro Member" subtitle="Sluit je aan bij de elite van de paardensport">
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl md:text-4xl mb-4 font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Viesa Pro Membership
            </h3>
            
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              Krijg toegang tot ons exclusieve investeerdersnetwerk, premium portfolio's, en geavanceerde stalmanagement tools. Met Viesa Pro til je jouw investering en management naar het allerhoogste niveau.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 justify-center font-semibold text-white">
                Word Pro Member
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl mb-6">
              Klaar voor Digitale Dominantie?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start vandaag nog met de automatisering van uw bouwbedrijf
            </p>
            <button className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-blue-600 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
              Neem Contact Op
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-8 px-6 text-center text-blue-300">
        <p>© 2026 VIESA Automations. De Blauwdruk voor Digitale Dominantie.</p>
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
          <p className="text-xl text-blue-200">{subtitle}</p>
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
      className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 text-center hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
    >
      <div className="w-12 h-12 mx-auto mb-4 text-blue-400">
        {icon}
      </div>
      <h3 className="text-lg">{title}</h3>
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
        <p className="text-blue-200">{description}</p>
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
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-xl mb-3">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </motion.div>
  );
}

function TableRow({ component, functionality, benefit, delay }: { component: string; functionality: string; benefit: string; delay: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="border-b border-blue-500/20 hover:bg-blue-900/20 transition-colors"
    >
      <td className="p-4">{component}</td>
      <td className="p-4 text-blue-200">{functionality}</td>
      <td className="p-4 text-blue-300">{benefit}</td>
    </motion.tr>
  );
}

function PricingCard({ title, description, features, highlight }: { title: string; description: string; features: string[]; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className={`rounded-3xl p-8 ${
        highlight
          ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-purple-500/30'
          : 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm border border-blue-500/30'
      }`}
    >
      <h3 className="text-2xl mb-4">{title}</h3>
      <p className="text-blue-100 mb-8">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

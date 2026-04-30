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
  Hammer,
  Ruler,
  CheckSquare
} from 'lucide-react';
import Link from 'next/link';

export default function EgaliserenLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 300]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white overflow-x-hidden dark">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 flex justify-center md:justify-start items-center bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <Link href="/egaliseren" className="group flex items-center gap-3">
          <span className="font-serif tracking-tight uppercase leading-none text-white flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-accent bg-clip-text text-transparent drop-shadow-lg">EGALISEREN.NL</span>
          </span>
        </Link>
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
        style={{ opacity, scale, y: yParallax }}
        className="relative min-h-screen pt-40 md:pt-48 flex flex-col items-center justify-start px-6"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight font-bold notranslate"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-lg">
                DE BASIS VOOR
              </span>
              <br />
              <span className="text-white drop-shadow-lg">ELKE TOPVLOER</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Specialisten in Vloeregalisatie & Vloerverwarming door heel Nederland
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#offerte" className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 justify-center font-bold">
              Vrijblijvende Offerte
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#diensten" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border border-blue-400/50 rounded-full hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center font-bold shadow-lg">
              Onze Diensten
            </a>
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
      <Section id="diensten" title="Onze Expertise" subtitle="Perfect glad, klaar voor elke afwerking">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
              Een perfect strakke vloer begint bij de juiste ondergrond. <span className="text-blue-400">Egaliseren.nl</span> is de absolute specialist in het prepareren van uw vloer.
            </p>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Of het nu gaat om anhydriet, zandcement of hout, wij zorgen ervoor dat uw ondervloer spiegelglad is. Perfect voor PVC, laminaat, tegels of gietvloeren.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <FeatureCard icon={<Hammer />} title="Zandcement" />
            <FeatureCard icon={<Ruler />} title="Anhydriet" />
            <FeatureCard icon={<CheckSquare />} title="Vloerverwarming" />
            <FeatureCard icon={<Star />} title="Afwerking" />
          </motion.div>
        </div>
      </Section>

      {/* Value Proposition Section */}
      <Section title="Waarom Egaliseren.nl?" subtitle="Kwaliteit & Snelheid gecombineerd">
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl mb-6 font-serif text-white">
              Vakkundig, Snel en Betrouwbaar door heel Nederland
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Wij maken gebruik van de beste materialen en modernste technieken. Doordat wij ons gehele proces hebben geautomatiseerd, ontvangt u binnen no-time een scherpe offerte en kunnen wij vaak al op korte termijn schakelen.
            </p>
            <div className="flex justify-center">
              <a href="#offerte" className="px-8 py-4 bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors font-bold flex items-center gap-2">
                Bereken uw Prijs
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section title="Onze Werkwijze" subtitle="In 3 simpele stappen een strakke vloer">
        <div className="grid md:grid-cols-3 gap-8">
          <CaseStudyItem
            title="1. Aanvraag & Advies"
            description="Binnen 24 uur ontvangt u van ons een scherpe, transparante offerte op maat voor uw specifieke vloer."
          />
          <CaseStudyItem
            title="2. Vakkundige Uitvoering"
            description="Onze specialisten komen op de afgesproken datum langs en egaliseren de vloer met laser-precisie."
          />
          <CaseStudyItem
            title="3. Perfect Resultaat"
            description="Na de droogtijd is de vloer spiegelglad en klaar voor de eindafwerking (PVC, laminaat of tegels)."
          />
        </div>
      </Section>

      {/* CTA Section */}
      <section id="offerte" className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-slate-950 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-bold">
              Klaar voor een perfecte vloer?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-6">
              Vraag vandaag nog een vrijblijvende offerte aan
            </p>
            <button className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 bg-blue-600 text-white rounded-full hover:shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-bold text-lg inline-flex">
              Offerte Aanvragen
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-8 px-6 text-center text-blue-300">
        <p className="notranslate">© 2026 Egaliseren.nl - De basis voor elke vloer.</p>
      </footer>
    </div>
  );
}

function Section({ id, title, subtitle, children }: { id?: string, title: string; subtitle: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg font-bold">
            {title}
          </h2>
          <p className="text-xl text-slate-300 font-light">{subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
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

function CaseStudyItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="text-center bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}

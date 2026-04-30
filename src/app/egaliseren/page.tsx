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
  CheckSquare,
  UploadCloud,
  FileImage,
  Send,
  X,
  Camera
} from 'lucide-react';
import Link from 'next/link';

export default function EgaliserenLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 300]);

  // AI Image Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  
  // AI Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hallo! Ik ben de Egaliseren.nl AI. Heeft u vragen over uw vloer of wilt u direct een AI-scan doen?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadResult(null);
    setTimeout(() => {
      setIsUploading(false);
      setUploadResult('✅ AI Analyse Voltooid: Geschatte oppervlakte: ~45m². Aanbevolen behandeling: Zandcement. Geschatte Offerte: € 1.250,-');
    }, 2500);
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    const query = chatInput;
    setChatInput('');
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Als het grootste platform op basis van egaliseren.nl implementeren wij alle mogelijke AI-tools. Hierdoor krijgt u altijd de snelste respons op vragen zoals: "' + query + '".' }]);
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 flex justify-center md:justify-start items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/egaliseren" className="group flex items-center gap-3">
          <img 
            src="https://www.egaliseren.nl/wp-content/uploads/2023/11/egaliseren-logo-dark-cropped.png" 
            alt="Egaliseren.nl Logo" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>
      </header>

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0.03), transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale, y: yParallax }}
        className="relative min-h-screen pt-40 md:pt-48 flex flex-col items-center justify-start px-6"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Removed glowing orbs for a calmer design */}
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
              <span className="text-slate-900 drop-shadow-sm">
                DE BASIS VOOR
              </span>
              <br />
              <span className="text-slate-900 drop-shadow-sm">ELKE TOPVLOER</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light"
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
            <a href="#offerte" className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center font-bold">
              Vrijblijvende Offerte
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#diensten" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border border-gray-300 text-slate-900 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center font-bold">
              Onze Diensten
            </a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
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
            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed">
              Een perfect strakke vloer begint bij de juiste ondergrond. <span className="font-bold text-slate-900">Egaliseren.nl</span> is de absolute specialist in het prepareren van uw vloer.
            </p>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
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
      <Section title="Waarom Egaliseren.nl?" subtitle="Het grootste platform & de slimste AI-tools">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl mb-6 font-serif text-slate-900">
              Grootste platform op basis van Egaliseren.nl
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Wij zijn verreweg het grootste platform van Nederland. Wij implementeren alle mogelijke AI-tools om u de allersnelste respons te geven. Upload een foto van uw vloer of stel een vraag aan onze slimme chatbot en ervaar de toekomst van egaliseren!
            </p>
            <div className="flex justify-center">
              <a href="#offerte" className="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors font-bold flex items-center gap-2 shadow-lg">
                Probeer onze AI Tools
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

      {/* Upload AI Section */}
      <section id="offerte" className="relative py-24 px-6 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-bold text-slate-900">
              Direct een Offerte? Upload een foto van uw vloer
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10">
              Onze AI analyseert direct de oppervlakte en de staat van de ondervloer en geeft u binnen 3 seconden een inschatting.
            </p>
            
            <div className="max-w-2xl mx-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl p-10 hover:border-slate-900 transition-colors">
              {!isUploading && !uploadResult ? (
                <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleUpload}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Camera className="w-8 h-8 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Klik om een foto te uploaden</h3>
                  <p className="text-slate-500">JPG, PNG of HEIC (AI herkent uw vloer direct)</p>
                </div>
              ) : isUploading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">AI is uw vloer aan het analyseren...</h3>
                  <p className="text-slate-500">Berekent oppervlakte en benodigde materialen met de snelste respons</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{uploadResult}</h3>
                  <button onClick={() => setUploadResult(null)} className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 font-bold text-slate-900">
                    Nieuwe Foto Uploaden
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 text-center text-slate-500 bg-white relative z-10">
        <p className="notranslate">© 2026 Egaliseren.nl - Het grootste platform met de slimste AI tools.</p>
      </footer>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            style={{ height: '400px' }}
          >
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-bold">Egaliseren AI</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-slate-800 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div ref={chatRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'ai' ? 'bg-white border border-gray-200 text-slate-800 self-start' : 'bg-slate-900 text-white self-end'}`}>
                  {msg.text}
                </div>
              ))}
              {chatMessages.length > 0 && chatMessages[chatMessages.length - 1].role === 'user' && (
                <div className="bg-white border border-gray-200 text-slate-800 self-start p-3 rounded-2xl animate-pulse">
                  AI is aan het typen...
                </div>
              )}
            </div>
            
            <form onSubmit={handleChat} className="p-3 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Stel uw vraag..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button type="submit" className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
        
        {!chatOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </div>
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
          <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">
            {title}
          </h2>
          <p className="text-xl text-slate-600 font-light">{subtitle}</p>
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
      className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center shadow-sm"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 text-slate-700">
        {icon}
      </div>
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg break-words leading-tight w-full font-medium text-slate-900">{title}</h3>
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
      className="text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-slate-700" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

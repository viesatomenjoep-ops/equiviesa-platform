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
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MaartenDriessenLandingPage() {
  const router = useRouter();
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
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hallo! Ik ben de Maarten Driessen AI. Do you have questions about our horses or want to use the AI Horse Matcher?' }
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
      setUploadResult('✅ AI Analyse Voltooid: Geschatte oppervlakte: ~45m². Aanbevolen behandeling: Hunters. Geschatte Offerte: € 1.250,-');
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
    <div className="min-h-screen bg-gray-50 text-amber-900 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/maarten-driessen" className="group flex items-center gap-3">
          <img
            src="https://www.egaliseren.nl/wp-content/uploads/2023/11/maarten-driessen-logo-dark-cropped.png"
            alt="Maarten Driessen Logo"
            className="h-7 sm:h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <select 
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                if (val === 'ai-scan') {
                  router.push('/maarten-driessen/calculator');
                } else if (val === 'pvc') {
                  router.push('/maarten-driessen/sales');
                } else {
                  router.push(`/maarten-driessen/${val}`);
                }
              }
            }}
            className="bg-gray-50 border border-gray-300 text-amber-900 text-xs sm:text-sm md:text-base rounded-full focus:ring-amber-600 focus:border-amber-600 block p-2 sm:p-2.5 px-3 sm:px-4 outline-none font-medium cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <option value="">Direct regelen...</option>
            <option value="zandcement">Hunters</option>
            <option value="anhydriet">Equitation</option>
            <option value="vloerverwarming">Showjumpers</option>
            <option value="pvc">Sales & Training</option>
            <option value="ai-scan">AI Horse Matcher</option>
          </select>
          <Link href="/maarten-driessen/offerte" className="hidden md:inline-flex px-5 py-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-bold text-sm">
            Offerte
          </Link>
        </div>
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <Image 
            src="/horse-1.png" 
            alt="Maarten Driessen hero background" 
            fill 
            priority
            quality={90}
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight font-bold notranslate text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              DE BASIS VOOR
              <br />
              ELKE TOPVLOER
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Finding the perfect equine partner for your showjumping ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/maarten-driessen/offerte" className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-amber-900 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center font-bold">
              Vrijblijvende Offerte
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#diensten" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-amber-600/40 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-amber-600/60 transition-all duration-300 flex items-center justify-center font-bold">
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

      {/* Magic Links Section */}
      <section className="relative py-12 px-6 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <Bot className="w-6 h-6" />, title: "AI Training Planner", link: "/maarten-driessen/droogtijd" },
              { icon: <Ruler className="w-6 h-6" />, title: "Boarding Cost Calculator", link: "/maarten-driessen/materiaal" },
              { icon: <Globe className="w-6 h-6" />, title: "Showjumpers Planner", link: "/maarten-driessen/showjumpers-planner" },
              { icon: <CheckSquare className="w-6 h-6" />, title: "AI Equine Valuation", link: "/maarten-driessen/offerte" },
              { icon: <Smartphone className="w-6 h-6" />, title: "Live Offerte Generator", link: "/maarten-driessen/generator" },
            ].map((link, idx) => (
              <Link href={link.link} key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all flex flex-col items-center gap-4 group cursor-pointer h-full"
                >
                  <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-slate-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                  <h4 className="font-bold text-amber-900 text-sm leading-tight">{link.title}</h4>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
              A successful partnership begins with the right match. <span className="font-bold text-amber-900">Maarten Driessen</span> is the absolute specialist in sourcing and training elite sport horses.
            </p>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Whether you are looking for a top-level Grand Prix horse or a reliable amateur jumper, we ensure you find the perfect match. Perfect for international competition, equitation, or amateur sport.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <FeatureCard href="/maarten-driessen/hunters" icon={<Hammer />} title="Hunters" />
            <FeatureCard href="/maarten-driessen/equitation" icon={<Ruler />} title="Equitation" />
            <FeatureCard href="/maarten-driessen/showjumpers" icon={<CheckSquare />} title="Showjumpers" />
            <FeatureCard href="/maarten-driessen/sales" icon={<Star />} title="Sales & Training" />
          </motion.div>
        </div>
      </Section>

      {/* Value Proposition Section */}
      <Section title="Waarom Maarten Driessen?" subtitle="Het grootste platform & de slimste AI-tools">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl mb-6 font-serif text-amber-900">
              The Ultimate Hub for Premium Sport Horses
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We are the leading platform for premium showjumping horses. We implement cutting-edge AI tools to give you the fastest response. Upload a video of your riding style or ask our smart chatbot to find your perfect equine partner!
            </p>
            <div className="flex justify-center">
              <Link href="/maarten-driessen/offerte" className="px-8 py-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-bold flex items-center gap-2 shadow-lg">
                Probeer onze AI Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews Section */}
      <section className="relative py-24 px-6 bg-slate-50 border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 font-bold text-amber-900">Wat Onze Klanten Zeggen</h2>
            <div className="flex items-center justify-center gap-2 text-xl text-slate-600">
              <span className="font-bold text-amber-900">4.9/5</span>
              <div className="flex text-yellow-400">
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
              </div>
              <span>op basis van 400+ reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Lauren K.", rating: 5, text: "Incredible service! I found my dream Grand Prix horse. The communication via the AI matching tool was incredibly smooth and accurate." },
              { name: "Sarah W.", rating: 5, text: "Hunters dekvloer laten storten voor onze hele benedenverdieping (90m2). De mannen werkten super netjes en de vloer is spiegelglad. Aanrader!" },
              { name: "James M.", rating: 5, text: "Showjumpers ingefreesd en daarna geëgaliseerd. Perfecte integratie, het team van Maarten Driessen weet precies waar ze het over hebben." },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">"{review.text}"</p>
                <p className="font-bold text-amber-900">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Section title="Onze Werkwijze" subtitle="In 3 simpele stappen een strakke vloer">
        <div className="grid md:grid-cols-3 gap-8">
          <CaseStudyItem
            title="1. Consultation & Matching"
            description="Within 24 hours, you receive a curated selection of horses tailored to your goals and budget."
          />
          <CaseStudyItem
            title="2. Trials & Vetting"
            description="We arrange comprehensive trials and coordinate full veterinary examinations with top professionals."
          />
          <CaseStudyItem
            title="3. Partnership & Training"
            description="After the acquisition, we offer continued training and support to ensure a seamless transition into the show ring."
          />
        </div>
      </Section>

      {/* Portfolio Section */}
      <section className="relative py-24 px-6 bg-slate-100 border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-bold text-amber-900">
              Ons Recente Werk
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Bekijk een selectie van onze mooiste, strakst opgeleverde vloeren door heel Nederland. Swipe om meer te zien.
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-4 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-1.png" alt="Gietvloer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Elite Showjumper</h3>
                    <p className="text-slate-300 text-sm">Clearing 1.50m effortlessly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-2.png" alt="PVC Visgraat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Premium Equitation</h3>
                    <p className="text-slate-300 text-sm">Perfect rhythm and style</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-3.png" alt="Hunters" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Grand Prix Prospect</h3>
                    <p className="text-slate-300 text-sm">Hunters en coating in industriële loft</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-4.png" alt="Hongaarse Punt" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Amateur Friendly Jumper</h3>
                    <p className="text-slate-300 text-sm">Brave, honest, and reliable in the ring</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-5.png" alt="Machinaal Maarten Driessen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Machinaal Maarten Driessen</h3>
                    <p className="text-slate-300 text-sm">Vloeivloer perfect waterpas aangebracht</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-1.png" alt="Spiegelgladde Sales & Training" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Spiegelgladde Sales & Training</h3>
                    <p className="text-slate-300 text-sm">Onze garantie voor de perfecte basis</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-2.png" alt="Showjumpers Frezen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Showjumpers Integratie</h3>
                    <p className="text-slate-300 text-sm">Frezen met uiterste precisie en perfect patroon</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-3.png" alt="Sleuven Dichtzetten" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Sleuven Dichtzetten</h3>
                    <p className="text-slate-300 text-sm">Naadloze voorbereiding voor de eindvloer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-4.png" alt="Eiken Visgraat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Eiken Visgraat PVC</h3>
                    <p className="text-slate-300 text-sm">High-end residentiële afwerking met veel licht</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img src="/horse-5.png" alt="Beton Cire Badkamer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Naadloze Beton Ciré</h3>
                    <p className="text-slate-300 text-sm">Exclusieve spa-beleving in moderne badkamer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerte CTA Section */}
      <section className="relative py-32 px-6 bg-amber-600 text-white border-y border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 font-bold text-white">
              Klaar om de toekomst van vloeren te ervaren?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
              Probeer onze AI Foto Scanner of bereken direct uw kosten via WhatsApp met de slimste calculators van Nederland.
            </p>

            <Link href="/maarten-driessen/offerte" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-900 rounded-full hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl hover:shadow-2xl">
              Bekijk Alle Offerte Tools
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 text-center text-slate-500 bg-white relative z-10">
        <p className="notranslate">© 2026 Maarten Driessen - Het grootste platform met de slimste AI tools.</p>
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
            <div className="bg-amber-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-bold">Maarten Driessen AI</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-amber-700 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'ai' ? 'bg-white border border-gray-200 text-slate-800 self-start' : 'bg-amber-600 text-white self-end'}`}>
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
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button type="submit" className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors">
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
            className="w-14 h-14 bg-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-700 transition-colors"
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
          <h2 className="text-4xl md:text-5xl mb-4 text-amber-900 font-bold">
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

function FeatureCard({ icon, title, href }: { icon: React.ReactNode; title: string, href?: string }) {
  const CardContent = (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center shadow-sm ${href ? 'cursor-pointer group' : ''}`}
    >
      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 text-slate-700 ${href ? 'group-hover:text-amber-900 transition-colors' : ''}`}>
        {icon}
      </div>
      <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg break-words leading-tight w-full font-medium text-amber-900 ${href ? 'group-hover:underline' : ''}`}>{title}</h3>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
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
      <h3 className="text-xl font-bold mb-3 text-amber-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

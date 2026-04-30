import Image from 'next/image';
import ScrollLogo from './ScrollLogo';

export default function Footer() {
  const whatsappNumber = "31683052875";
  const email = "info@viesaautomations.com";

  return (
    <>
      <section id="contact" className="pt-6 pb-8 md:pt-8 md:pb-10 bg-primary text-white relative overflow-hidden scroll-mt-24 border-t border-white/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-2 md:space-y-4 max-w-3xl mx-auto mb-6 md:mb-10">
            <span className="text-accent-light text-sm md:text-base font-bold uppercase tracking-[0.4em]">transformatie Inquiry</span>
            <h2 className="text-2xl md:text-4xl font-serif leading-tight">
              Connect with our <span className="italic text-accent-light">Elite</span> network
            </h2>
            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
              Ready to explore high-end transformatie opportunities in the world of automations? Our team is available for private consultations and personalized transformatie plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 md:p-8 bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 transition-all duration-500 shadow-xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-light/20 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-accent-light" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                 </svg>
              </div>
              <span className="text-white text-lg md:text-xl font-serif mb-1">Chat via WhatsApp</span>
              <span className="text-accent-light text-xs md:text-sm font-bold uppercase tracking-widest">0031 68305 2875</span>
            </a>

            <a 
              href={`mailto:${email}`} 
              className="group flex flex-col items-center p-6 md:p-8 bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 transition-all duration-500 shadow-xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-light/20 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-accent-light" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                 </svg>
              </div>
              <span className="text-white text-lg md:text-xl font-serif mb-1">Send an Email</span>
              <span className="text-accent-light text-xs md:text-sm font-bold uppercase tracking-widest">{email}</span>
            </a>

            <a 
              href="https://www.instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 md:p-8 bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 transition-all duration-500 shadow-xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-light/20 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-accent-light" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                 </svg>
              </div>
              <span className="text-white text-lg md:text-xl font-serif mb-1">Instagram</span>
              <span className="text-accent-light text-xs md:text-sm font-bold uppercase tracking-widest">Follow Us</span>
            </a>
          </div>


        </div>
      </section>

      <footer className="bg-primary text-white py-8 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <ScrollLogo>
                <Image 
                  src="/logo.png" 
                  alt="Viesa Automations Logo" 
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert" 
                />
              </ScrollLogo>
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-serif font-bold tracking-tight text-white uppercase leading-none">Viesa Automations</span>
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent-light uppercase mt-1">Elite transformaties</span>
              </div>
            </div>
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest text-center md:text-right">© 2026 Viesa Automations Portfolio Management. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

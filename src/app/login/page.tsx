import Link from 'next/link'
import Image from 'next/image'
import { ShieldAlert, Users } from 'lucide-react'

export default function LoginHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-white/5 blur-[80px]"></div>
      </div>

      {/* Return to Website Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all border border-white/20 shadow-sm backdrop-blur-md">
          <span className="text-xl leading-none">&larr;</span> Return to Website
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 justify-center mb-6">
            <Image src="/logo.png" alt="Viesa Automations Logo" width={80} height={80} className="w-16 h-16 object-contain" />
            <span className="font-serif tracking-tight uppercase leading-none text-white flex flex-col items-start gap-1 notranslate">
              <span className="text-3xl md:text-4xl font-bold">VIESA</span>
              <span className="text-sm md:text-lg font-medium text-slate-300">Automations</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight">Select your portal</h1>
          <p className="text-lg text-slate-400 font-medium">Please select your login destination to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
          
          {/* Admin Login Card */}
          <Link href="/cms-login" className="group relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-white/10 hover:border-white/20 hover:bg-slate-800/60 overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg">
              <ShieldAlert size={36} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-white mb-3">Admin Portal</h2>
            <p className="text-slate-400 mb-8 max-w-xs text-sm leading-relaxed">
              Manage infrastructure, team, leads, and overarching website settings.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-widest rounded-full group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors w-full">
              Login as Admin
            </span>
          </Link>

          {/* Staff Login Card */}
          <Link href="/staff" className="group relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-indigo-900/20 transition-all duration-500 border border-white/10 hover:border-white/20 hover:bg-slate-800/60 overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-lg">
              <Users size={36} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-white mb-3">Staff Portal</h2>
            <p className="text-slate-400 mb-8 max-w-xs text-sm leading-relaxed">
              Log in with your personal PIN to securely manage daily operations.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-widest rounded-full group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors w-full">
              Login as Staff
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

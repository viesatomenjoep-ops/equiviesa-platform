import Link from 'next/link'
import Image from 'next/image'
import { ShieldAlert, Users } from 'lucide-react'

export default function LoginHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 flex items-center justify-center p-4 relative">
      
      {/* Return to Website Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all border border-white/20 backdrop-blur-sm">
          <span className="text-xl leading-none">&larr;</span> Return to Website
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <Image src="/logo.png" alt="Viesa Automations Logo" width={80} height={80} className="w-20 h-20 object-contain mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">Welcome to VIESA</h1>
          <p className="text-lg text-slate-300">Please select your login portal to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-8">
          
          {/* Admin Login Card */}
          <Link href="/cms-login" className="group relative bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:bg-white/[0.08] transition-all duration-300 border border-white/10 overflow-hidden flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform duration-300">
              <ShieldAlert size={32} />
            </div>
            
            <h2 className="text-xl font-serif font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-slate-400 mb-8 max-w-xs text-sm">
              Manage infrastructure, team, leads, and website settings.
            </p>
            
            <span className="mt-auto px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full group-hover:bg-blue-500 transition-colors">
              Login as Admin
            </span>
          </Link>



          {/* Staff Login Card */}
          <Link href="/staff" className="group relative bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:bg-white/[0.08] transition-all duration-300 border border-white/10 overflow-hidden flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <Users size={32} />
            </div>
            
            <h2 className="text-xl font-serif font-bold text-white mb-2">Staff Portal</h2>
            <p className="text-slate-400 mb-8 max-w-xs text-sm">
              Log in with your PIN to manage daily tasks.
            </p>
            
            <span className="mt-auto px-4 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full group-hover:bg-indigo-500 transition-colors">
              Login as Staff
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

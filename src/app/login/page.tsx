import Link from 'next/link'
import Image from 'next/image'
import { ShieldAlert, Users } from 'lucide-react'

export default function LoginHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-pink-400/10 blur-[80px]"></div>
      </div>

      {/* Return to Website Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full font-bold transition-all border border-slate-200 shadow-sm hover:shadow">
          <span className="text-xl leading-none">&larr;</span> Return to Website
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <Image src="/logo.png" alt="Viesa Automations Logo" width={80} height={80} className="w-20 h-20 object-contain mb-6 filter invert" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Welcome to VIESA</h1>
          <p className="text-lg text-slate-500 font-medium">Please select your login portal to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
          
          {/* Admin Login Card */}
          <Link href="/cms-login" className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-400 to-sky-400"></div>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <ShieldAlert size={36} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Admin Portal</h2>
            <p className="text-slate-500 mb-8 max-w-xs text-sm leading-relaxed">
              Manage infrastructure, team, leads, and overarching website settings.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-blue-50 text-blue-600 border border-blue-100 font-bold uppercase tracking-widest rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors w-full">
              Login as Admin
            </span>
          </Link>



          {/* Staff Login Card */}
          <Link href="/staff" className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <Users size={36} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Staff Portal</h2>
            <p className="text-slate-500 mb-8 max-w-xs text-sm leading-relaxed">
              Log in with your personal PIN to securely manage daily operations.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold uppercase tracking-widest rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors w-full">
              Login as Staff
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

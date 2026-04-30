import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Register | VIESA Automations',
  description: 'Start your digital transformation journey with VIESA Automations today.',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800 text-white flex items-center justify-center">
      
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Information */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-600/20 to-blue-900/40 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 uppercase tracking-tight">
              Join VIESA <br className="hidden md:block"/> <span className="text-accent">Automations</span>
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Create an account to start your 14-day free trial. Experience the blueprint for digital dominance and automate your entire business workflow.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-2 rounded-full text-accent mt-1">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Instant Access</h4>
                  <p className="text-sm text-slate-400">Get immediate access to our CRM, CMS, and Automations platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-2 rounded-full text-accent mt-1">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">No Credit Card Required</h4>
                  <p className="text-sm text-slate-400">Start exploring completely risk-free without any upfront payment.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-2 rounded-full text-accent mt-1">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Cancel Anytime</h4>
                  <p className="text-sm text-slate-400">If you're not satisfied, you can cancel your subscription with one click.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-slate-400 italic">
            "VIESA Automations has transformed our workflow completely."
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-8">Create Your Account</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Company Name</label>
              <input 
                type="text" 
                placeholder="Acme Corp"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>

            <button type="button" className="w-full mt-4 py-4 rounded-xl bg-accent text-white hover:bg-white hover:text-primary font-bold tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2 group">
              Complete Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-accent hover:text-white transition-colors font-bold">Log in here</Link>
          </div>
        </div>
      </div>

    </main>
  )
}

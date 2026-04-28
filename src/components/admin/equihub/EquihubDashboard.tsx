'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import TaskBoard from '@/components/admin/tasks/TaskBoard'
import HorsesList from '@/components/admin/equihub/HorsesList'
import FeedingBoard from '@/components/admin/equihub/FeedingBoard'
import HealthBoard from '@/components/admin/equihub/HealthBoard'
import ContactsBoard from '@/components/admin/equihub/ContactsBoard'
import DocumentsBoard from '@/components/admin/equihub/DocumentsBoard'
import BreedingBoard from '@/components/admin/equihub/BreedingBoard'
import { CheckSquare, Info, Carrot, LayoutDashboard, Stethoscope, Users, FileText, HeartPulse, ChevronLeft, Star, Activity, ShieldCheck } from 'lucide-react'

export default function EquihubDashboard({
  tasks, horses, facilities, feedingSchedules, staff, contacts, healthLogs, documents, breedingLogs, isError
}: any) {
  const [activeTab, setActiveTab] = useState<'hub' | 'tasks' | 'horses' | 'feeding' | 'health' | 'contacts' | 'documents' | 'breeding'>('hub')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Call once to set initial value
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderHub = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-12 shadow-2xl mb-8 border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
              Premium Module
            </span>
            <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full flex items-center gap-1">
              <ShieldCheck size={12}/> All-in-One
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ transform: `rotate(${scrollY * 0.3}deg)`, transition: 'transform 0.1s ease-out' }}>
              <Image src="/viesa-logo.png" alt="Viesa Logo" width={80} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-white uppercase tracking-tight">
              Viesa Stable <span className="text-white">Overview</span>
            </h1>
          </div>
          <p className="text-white max-w-2xl text-lg font-light">
            Jouw complete, digitale stal-assistent. Beheer je paarden, personeel, fokkerij en gezondheidsdossiers vanuit één gecentraliseerde, luxe omgeving.
          </p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <HubCard 
          icon={<CheckSquare size={32} />} 
          title="Taakbord" 
          desc="Dagelijkse to-do's & planning"
          color="bg-blue-500"
          onClick={() => setActiveTab('tasks')}
        />
        <HubCard 
          icon={<Info size={32} />} 
          title="Stal & Paarden" 
          desc="Boxen, locaties & profielen"
          color="bg-primary"
          onClick={() => setActiveTab('horses')}
        />
        <HubCard 
          icon={<Carrot size={32} />} 
          title="Voeding" 
          desc="Voerschema's per paard"
          color="bg-orange-500"
          onClick={() => setActiveTab('feeding')}
        />
        <HubCard 
          icon={<HeartPulse size={32} />} 
          title="Fokkerij" 
          desc="Cyclus, scans & veulens"
          color="bg-pink-500"
          onClick={() => setActiveTab('breeding')}
        />
        <HubCard 
          icon={<Stethoscope size={32} />} 
          title="Gezondheid" 
          desc="Medisch dossier & dierenarts"
          color="bg-red-500"
          onClick={() => setActiveTab('health')}
        />
        <HubCard 
          icon={<Users size={32} />} 
          title="Relaties" 
          desc="Dierenartsen, smeden & eigenaren"
          color="bg-purple-500"
          onClick={() => setActiveTab('contacts')}
        />
        <HubCard 
          icon={<FileText size={32} />} 
          title="Documenten" 
          desc="Paspoorten, contracten & X-rays"
          color="bg-gray-700"
          onClick={() => setActiveTab('documents')}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6 font-sans">
      {isError && (
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl font-bold border border-red-100 w-full text-center mb-6">
          {typeof isError === 'string' ? (
            <>
              Foutmelding vanuit Supabase:<br/>
              <span className="font-normal font-mono text-sm mt-2 block bg-red-100 p-2 rounded">{isError}</span>
            </>
          ) : (
            'Database niet gesynchroniseerd (voer SQL script uit in Supabase)'
          )}
        </div>
      )}

      {!isError && (
        <>
          {activeTab === 'hub' ? (
            renderHub()
          ) : (
            <div className="animate-in slide-in-from-right-8 duration-500">
              {/* Back button header for active modules */}
              <div className="mb-6 flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-20 z-30">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setActiveTab('hub')}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white font-bold transition-colors bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl active:scale-95"
                  >
                    <ChevronLeft size={20} /> Terug naar Hub
                  </button>
                  <div className="hidden sm:flex items-center gap-2">
                    <div style={{ transform: `rotate(${scrollY * 0.3}deg)`, transition: 'transform 0.1s ease-out' }}>
                      <Image src="/viesa-logo.png" alt="Viesa" width={24} height={24} className="object-contain invert dark:invert-0" />
                    </div>
                    <span className="text-lg font-sans font-bold text-gray-900 dark:text-white">Viesa Stable Overview</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">Viesa Pro</span>
                </div>
              </div>

              {/* Module Content */}
              {activeTab === 'tasks' && <TaskBoard initialTasks={tasks} horses={horses} staff={staff} isError={isError} hideHeader={true} />}
              {activeTab === 'horses' && <HorsesList horses={horses} facilities={facilities} staff={staff} />}
              {activeTab === 'feeding' && <FeedingBoard horses={horses} initialSchedules={feedingSchedules} />}
              {activeTab === 'breeding' && <BreedingBoard horses={horses} initialLogs={breedingLogs} />}
              {activeTab === 'health' && <HealthBoard horses={horses} initialLogs={healthLogs} contacts={contacts} />}
              {activeTab === 'contacts' && <ContactsBoard initialContacts={contacts} staff={staff} />}
              {activeTab === 'documents' && <DocumentsBoard horses={horses} initialDocuments={documents} />}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function HubCard({ icon, title, desc, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 active:scale-95 overflow-hidden text-left"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-20`}></div>
      
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg mb-6 transform group-hover:-translate-y-1 transition-transform`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-sans font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        {desc}
      </p>

      {/* Luxury hover line */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 ${color} transition-all duration-500 group-hover:w-full`}></div>
    </button>
  )
}

'use client'

import { useState } from 'react'
import TaskBoard from '@/components/admin/tasks/TaskBoard'
import HorsesList from '@/components/admin/equihub/HorsesList'
import FeedingBoard from '@/components/admin/equihub/FeedingBoard'
import HealthBoard from '@/components/admin/equihub/HealthBoard'
import ContactsBoard from '@/components/admin/equihub/ContactsBoard'
import DocumentsBoard from '@/components/admin/equihub/DocumentsBoard'
import { CheckSquare, Info, Carrot, LayoutDashboard, Stethoscope, Users, FileText } from 'lucide-react'

export default function EquihubDashboard({
  tasks, horses, facilities, feedingSchedules, staff, contacts, healthLogs, documents, isError
}: any) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'horses' | 'feeding' | 'health' | 'contacts' | 'documents'>('tasks')

  return (
    <div className="space-y-6">
      {/* Top Navigation / Title */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Viesa Stable Management</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Centraal Stal Management Systeem</p>
          </div>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2">
          <TabButton 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')} 
            icon={<CheckSquare size={18} />} 
            label="Taakbord" 
          />
          <TabButton 
            active={activeTab === 'horses'} 
            onClick={() => setActiveTab('horses')} 
            icon={<Info size={18} />} 
            label="Stal & Paarden" 
          />
          <TabButton 
            active={activeTab === 'feeding'} 
            onClick={() => setActiveTab('feeding')} 
            icon={<Carrot size={18} />} 
            label="Voeding" 
          />
          <TabButton 
            active={activeTab === 'health'} 
            onClick={() => setActiveTab('health')} 
            icon={<Stethoscope size={18} />} 
            label="Gezondheid" 
          />
          <TabButton 
            active={activeTab === 'contacts'} 
            onClick={() => setActiveTab('contacts')} 
            icon={<Users size={18} />} 
            label="Relaties" 
          />
          <TabButton 
            active={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')} 
            icon={<FileText size={18} />} 
            label="Documenten" 
          />
        </div>
      </div>

      {isError && (
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl font-bold border border-red-100 w-full text-center">
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

      {/* Tab Content */}
      {!isError && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'tasks' && <TaskBoard initialTasks={tasks} horses={horses} staff={staff} isError={isError} hideHeader={true} />}
          {activeTab === 'horses' && <HorsesList horses={horses} facilities={facilities} staff={staff} />}
          {activeTab === 'feeding' && <FeedingBoard horses={horses} initialSchedules={feedingSchedules} />}
          {activeTab === 'health' && <HealthBoard horses={horses} initialLogs={healthLogs} contacts={contacts} />}
          {activeTab === 'contacts' && <ContactsBoard initialContacts={contacts} staff={staff} />}
          {activeTab === 'documents' && <DocumentsBoard horses={horses} initialDocuments={documents} />}
        </div>
      )}
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-sm ${
        active 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

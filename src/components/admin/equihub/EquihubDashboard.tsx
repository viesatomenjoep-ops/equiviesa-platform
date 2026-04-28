'use client'

import { useState } from 'react'
import TaskBoard from '@/components/admin/tasks/TaskBoard'
import HorsesList from '@/components/admin/equihub/HorsesList'
import FeedingBoard from '@/components/admin/equihub/FeedingBoard'
import { CheckSquare, Info, Carrot, LayoutDashboard } from 'lucide-react'

export default function EquihubDashboard({
  tasks, horses, facilities, feedingSchedules, staff, isError
}: any) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'horses' | 'feeding'>('tasks')

  return (
    <div className="space-y-6">
      {/* Top Navigation / Title */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Equihub</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Centraal Stal Management Systeem</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
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
        </div>
      </div>

      {isError && (
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl font-bold border border-red-100 w-full text-center">
          Database niet gesynchroniseerd (voer SQL script uit in Supabase)
        </div>
      )}

      {/* Tab Content */}
      {!isError && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'tasks' && <TaskBoard initialTasks={tasks} horses={horses} staff={staff} isError={isError} hideHeader={true} />}
          {activeTab === 'horses' && <HorsesList horses={horses} facilities={facilities} staff={staff} />}
          {activeTab === 'feeding' && <FeedingBoard horses={horses} initialSchedules={feedingSchedules} />}
        </div>
      )}
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all active:scale-95 ${
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

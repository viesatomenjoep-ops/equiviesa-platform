'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Circle, Clock, Stethoscope, Carrot, Dumbbell, Brush, Calendar, X, Plus } from 'lucide-react'

type Task = {
  id: string
  horse_id: string
  assigned_user_id: string
  task_type: string
  title: string
  status: string
  scheduled_at: string
  completed_at: string | null
  notes: string
  horses: { name: string; current_box_id: string }
  admin_permissions: { email: string }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Medisch': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
    case 'Voeding': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
    case 'Training': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
    case 'Verzorging': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30'
    default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Medisch': return <Stethoscope size={16} />
    case 'Voeding': return <Carrot size={16} />
    case 'Training': return <Dumbbell size={16} />
    case 'Verzorging': return <Brush size={16} />
    default: return <Clock size={16} />
  }
}

export default function TaskBoard({ 
  initialTasks, 
  horses, 
  staff, 
  isError,
  hideHeader = false
}: { 
  initialTasks: any[],
  horses: any[],
  staff: any[],
  isError: boolean,
  hideHeader?: boolean
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    horse_id: '',
    assigned_user_id: '',
    task_type: 'Training',
    scheduled_at: new Date().toISOString().slice(0, 16), // current datetime for local input
    notes: ''
  })

  const supabase = createClient()
  
  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'Klaar' ? 'To-do' : 'Klaar'
    
    // Optimistic update
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t))
    
    // Update DB
    const { error } = await supabase
      .from('stable_tasks')
      .update({ 
        status: newStatus,
        completed_at: newStatus === 'Klaar' ? new Date().toISOString() : null
      })
      .eq('id', task.id)
      
    if (error) {
      console.error('Failed to update task:', error)
      setTasks(tasks) // revert
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const { data, error } = await supabase
      .from('stable_tasks')
      .insert([{
        ...formData,
        scheduled_at: new Date(formData.scheduled_at).toISOString()
      }])
      .select('*')
      .single()
      
    if (error) {
      console.error('Failed to create task:', error)
      alert('Error: Kon de taak niet opslaan. Controleer de velden.')
    } else if (data) {
      setTasks([...tasks, data as Task].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()))
      setShowModal(false)
      // Reset form
      setFormData({
        title: '',
        horse_id: '',
        assigned_user_id: '',
        task_type: 'Training',
        scheduled_at: new Date().toISOString().slice(0, 16),
        notes: ''
      })
    }
    setIsSubmitting(false)
  }

  const todoTasks = tasks.filter(t => t.status !== 'Klaar')
  const completedTasks = tasks.filter(t => t.status === 'Klaar')

  return (
    <div className="space-y-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary dark:text-white">Digitaal Taakbord</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Overzicht van alle staltaken voor vandaag.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            {isError ? (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-100 w-full text-center">
                Database niet gesynchroniseerd (voer SQL script uit)
              </div>
            ) : (
              <button 
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 w-full md:w-auto flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Nieuwe Taak
              </button>
            )}
          </div>
        </div>
      )}

      {/* When header is hidden (e.g. in EquihubDashboard), we still need the New Task button */}
      {hideHeader && !isError && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Nieuwe Taak
          </button>
        </div>
      )}

      {/* TODO List */}
      {!isError && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="text-primary" /> 
              Te doen ({todoTasks.length})
            </h2>
            
            {todoTasks.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl text-center border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500">
                Alle taken zijn voltooid voor vandaag! 🎉
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} onToggle={() => toggleTaskStatus(task)} horses={horses} staff={staff} />
                ))}
              </div>
            )}
          </div>

          {/* COMPLETED List */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 opacity-70">
                <CheckCircle2 className="text-green-500" /> 
                Voltooid ({completedTasks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 opacity-70">
                {completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} onToggle={() => toggleTaskStatus(task)} horses={horses} staff={staff} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nieuwe Taak Inplannen</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Taak Titel</label>
                <input 
                  type="text" 
                  required
                  placeholder="Bijv. Longeren of Hoefsmid"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type Taak</label>
                  <select 
                    value={formData.task_type}
                    onChange={e => setFormData({...formData, task_type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="Training">Training</option>
                    <option value="Medisch">Medisch</option>
                    <option value="Voeding">Voeding</option>
                    <option value="Verzorging">Verzorging</option>
                    <option value="Overig">Overig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tijdstip</label>
                  <input 
                    type="datetime-local" 
                    required
                    value={formData.scheduled_at}
                    onChange={e => setFormData({...formData, scheduled_at: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Gekoppeld Paard (Optioneel)</label>
                <select 
                  value={formData.horse_id}
                  onChange={e => setFormData({...formData, horse_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">-- Geen paard --</option>
                  {horses?.map(horse => (
                    <option key={horse.id} value={horse.id}>{horse.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Toewijzen aan (Optioneel)</label>
                <select 
                  value={formData.assigned_user_id}
                  onChange={e => setFormData({...formData, assigned_user_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">-- Iedereen (Geen Specifieke Persoon) --</option>
                  {staff?.map(s => (
                    <option key={s.id} value={s.id}>{s.email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Notities (Optioneel)</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Extra instructies..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuleren
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Bezig...' : 'Opslaan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task, onToggle, horses, staff }: { task: Task, onToggle: () => void, horses: any[], staff: any[] }) {
  const isCompleted = task.status === 'Klaar'
  
  // Manual join since we removed deep PostgREST relations
  const horse = horses?.find(h => h.id === task.horse_id)
  const user = staff?.find(s => s.id === task.assigned_user_id)
  
  return (
    <div className={`relative p-5 rounded-2xl border bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 ${
      isCompleted 
        ? 'border-green-200 dark:border-green-900/30' 
        : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary/30'
    }`}>
      {/* Top Meta Bar */}
      <div className="flex justify-between items-center mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${getTypeColor(task.task_type)}`}>
          {getTypeIcon(task.task_type)}
          {task.task_type}
        </span>
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Calendar size={12} />
          {task.scheduled_at ? new Date(task.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Vandaag'}
        </span>
      </div>

      {/* Title & Info */}
      <h3 className={`text-lg font-bold mb-1 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
        {task.title}
      </h3>
      {horse && (
        <p className="text-primary dark:text-primary/80 font-semibold text-sm mb-1">
          🐴 {horse.name} {horse.current_box_id && `(Box: ${horse.current_box_id})`}
        </p>
      )}
      {user && (
        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-3">
          👤 {user.email}
        </p>
      )}
      {!horse && !user && <div className="mb-4"></div>}

      {/* Action Button (Large Touch Area) */}
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all active:scale-95 mt-2 ${
          isCompleted 
            ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600' 
            : 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800/30 dark:hover:bg-green-900/40'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 size={20} />
            Klaar (Ongedaan maken)
          </>
        ) : (
          <>
            <Circle size={20} />
            Markeer als Klaar
          </>
        )}
      </button>
    </div>
  )
}

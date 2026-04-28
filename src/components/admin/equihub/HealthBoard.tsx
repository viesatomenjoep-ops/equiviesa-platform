'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Stethoscope, Calendar, Plus, Syringe, Activity, AlertCircle, Phone, FileText } from 'lucide-react'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'

export default function HealthBoard({ horses, initialLogs, contacts }: any) {
  const [logs, setLogs] = useState(initialLogs || [])
  const [showModal, setShowModal] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    horse_id: '',
    type: 'Vet Check',
    date: new Date().toISOString().slice(0, 10),
    contact_id: '',
    description: '',
    cost: '',
    next_due_date: '',
    document_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase.from('health_logs').insert([{
      ...formData,
      cost: formData.cost ? parseFloat(formData.cost) : null,
      next_due_date: formData.next_due_date ? formData.next_due_date : null,
      document_url: formData.document_url ? formData.document_url : null
    }]).select().single()

    if (!error && data) {
      setLogs([data, ...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      setShowModal(false)
    } else {
      alert("Error saving log")
    }
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Vaccination': return <Syringe size={18} className="text-blue-500" />
      case 'Deworming': return <Activity size={18} className="text-orange-500" />
      case 'Dentist': return <Stethoscope size={18} className="text-purple-500" />
      case 'Farrier': return <AlertCircle size={18} className="text-yellow-600" />
      default: return <Stethoscope size={18} className="text-red-500" />
    }
  }

  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = logs.filter((log: any) => {
    const horse = horses?.find((h: any) => h.id === log.horse_id)
    const vet = contacts?.find((c: any) => c.id === log.contact_id)
    const searchString = `${log.type} ${log.description} ${horse?.name || ''} ${vet?.name || ''}`.toLowerCase()
    return searchString.includes(searchTerm.toLowerCase())
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="text-primary" /> Medisch Dossier
          </h2>
          <p className="text-sm text-gray-500 mt-1">Houd vaccinaties, hoefsmid en dierenarts bezoeken bij.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Zoeken in dossier..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm w-full sm:w-48 dark:bg-gray-900"
          />
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} /> Nieuw Verslag
          </button>
        </div>
      </div>

      <div className="p-0">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Geen medische gegevens gevonden.</div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredLogs.map((log: any) => {
              const horse = horses?.find((h: any) => h.id === log.horse_id)
              const vet = contacts?.find((c: any) => c.id === log.contact_id)

              return (
                <div key={log.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {getIconForType(log.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {log.type} {horse && <span className="text-primary">- {horse.name}</span>}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{log.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {log.date}</span>
                          {vet && <span className="flex items-center gap-1"><Phone size={12} /> {vet.name}</span>}
                        </div>
                      </div>
                    </div>
                    
                    {log.next_due_date && (
                      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap text-center">
                        Volgende afspraak: <br/>{log.next_due_date}
                      </div>
                    )}
                    {log.document_url && (
                      <a 
                        href={log.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100 dark:border-blue-800/30 text-xs font-bold"
                      >
                        <FileText size={16} className="mb-1" />
                        Bijlage
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-xl font-bold">Nieuw Medisch Verslag</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Paard</label>
                  <select required value={formData.horse_id} onChange={e => setFormData({...formData, horse_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="">Selecteer...</option>
                    {horses?.map((h: any) => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Type</label>
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="Vet Check">Dierenarts controle</option>
                    <option value="Vaccination">Vaccinatie</option>
                    <option value="Deworming">Ontworming</option>
                    <option value="Farrier">Hoefsmid</option>
                    <option value="Dentist">Tandarts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Datum</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Dierenarts / Specialist (Optioneel)</label>
                <select value={formData.contact_id} onChange={e => setFormData({...formData, contact_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                  <option value="">Geen externe specialist</option>
                  {contacts?.map((c: any) => <option key={c.id} value={c.id}>{c.name} ({c.role})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Verslag / Bijzonderheden</label>
                <textarea rows={2} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Wat is er gedaan?"/>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Bijlage (Vet Report / Factuur)</label>
                {formData.document_url ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 font-bold text-sm">✓ Bijlage toegevoegd</span>
                    <button type="button" onClick={() => setFormData({...formData, document_url: ''})} className="text-sm text-red-500 font-bold hover:underline">Verwijder</button>
                  </div>
                ) : (
                  <CloudinaryUploader 
                    onUploadSuccess={(url) => setFormData({...formData, document_url: url})} 
                    label="Upload PDF of Foto (Optioneel)" 
                  />
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 rounded-xl font-bold border hover:bg-gray-50 dark:hover:bg-gray-800">Annuleren</button>
                <button type="submit" className="flex-1 p-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90">Opslaan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

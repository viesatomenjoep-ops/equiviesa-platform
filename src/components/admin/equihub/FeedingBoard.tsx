'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Carrot, Plus, Image as ImageIcon, ExternalLink, Activity, Info, Droplet } from 'lucide-react'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'

export default function FeedingBoard({ horses, initialSchedules }: any) {
  const [schedules, setSchedules] = useState(initialSchedules || [])
  const [showModal, setShowModal] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    horse_id: '',
    roughage: '',
    concentrates: '',
    supplements: '',
    medication: '',
    instructions: '',
    feeding_image_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if a schedule already exists
    const existing = schedules.find((s: any) => s.horse_id === formData.horse_id)
    
    let res;
    if (existing) {
      res = await supabase.from('feeding_schedules').update(formData).eq('id', existing.id).select().single()
    } else {
      res = await supabase.from('feeding_schedules').insert([formData]).select().single()
    }

    if (!res.error && res.data) {
      const newSchedules = existing 
        ? schedules.map((s: any) => s.id === existing.id ? res.data : s)
        : [...schedules, res.data]
      setSchedules(newSchedules)
      setShowModal(false)
      setFormData({ horse_id: '', roughage: '', concentrates: '', supplements: '', medication: '', instructions: '', feeding_image_url: '' })
    } else {
      alert("Fout bij opslaan voedingsschema")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Carrot className="text-orange-500" /> Voedingsschema's
          </h2>
          <p className="text-sm text-gray-500 mt-1">Beheer voer, supplementen en medicatie per paard (inclusief schema uploads).</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} /> Nieuw / Update Schema
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {horses?.map((horse: any) => {
          const schedule = schedules?.find((s: any) => s.horse_id === horse.id)
          if (!schedule) return null; // Only show configured horses as cards

          return (
            <div key={horse.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {horse.name}
                    {schedule.medication && <span className="flex items-center gap-1 text-[10px] uppercase font-bold bg-red-100 text-red-700 px-2 py-1 rounded">Medisch</span>}
                  </h3>
                  {schedule.feeding_image_url && (
                    <a href={schedule.feeding_image_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                      <ImageIcon size={14} /> Schema Foto
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50/50 dark:bg-gray-900/50 p-3 rounded-xl border border-orange-100 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1"><Carrot size={12}/> Ruwvoer</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-300">{schedule.roughage || '-'}</p>
                  </div>
                  <div className="bg-yellow-50/50 dark:bg-gray-900/50 p-3 rounded-xl border border-yellow-100 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1"><Activity size={12}/> Krachtvoer</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-300">{schedule.concentrates || '-'}</p>
                  </div>
                </div>

                {(schedule.supplements || schedule.medication) && (
                  <div className="mb-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    {schedule.supplements && (
                      <div className="mb-2">
                        <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1"><Droplet size={12}/> Supplementen</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-300">{schedule.supplements}</p>
                      </div>
                    )}
                    {schedule.medication && (
                      <div>
                        <p className="text-xs font-bold text-red-500 flex items-center gap-1 mb-1">Medicatie (Let op!)</p>
                        <p className="text-sm font-bold text-red-600">{schedule.medication}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {schedule.instructions && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border-l-4 border-orange-500">
                    "{schedule.instructions}"
                  </p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button 
                  onClick={() => {
                    setFormData({
                      horse_id: horse.id,
                      roughage: schedule.roughage || '',
                      concentrates: schedule.concentrates || '',
                      supplements: schedule.supplements || '',
                      medication: schedule.medication || '',
                      instructions: schedule.instructions || '',
                      feeding_image_url: schedule.feeding_image_url || ''
                    })
                    setShowModal(true)
                  }}
                  className="text-orange-500 hover:text-orange-600 font-bold text-sm"
                >
                  Bewerk Schema
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {(!schedules || schedules.length === 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center text-gray-500 border border-gray-200 dark:border-gray-700">
          Geen voedingsschema's ingesteld. Klik op "Nieuw Schema" om te beginnen.
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-xl my-8 relative">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 sticky top-0 rounded-t-3xl z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Carrot className="text-orange-500"/> Voedingsschema Beheren
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold mb-1">Selecteer Paard</label>
                <select required value={formData.horse_id} onChange={e => setFormData({...formData, horse_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="">Kies een paard...</option>
                  {horses?.map((h: any) => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Ruwvoer (Hooi/Kuil)</label>
                  <input value={formData.roughage} onChange={e => setFormData({...formData, roughage: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. 3 plakken / 10kg"/>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Krachtvoer</label>
                  <input value={formData.concentrates} onChange={e => setFormData({...formData, concentrates: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. 2 scheppen sportbrok"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Supplementen</label>
                <input value={formData.supplements} onChange={e => setFormData({...formData, supplements: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. 1 maatschepje elektrolyten"/>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-red-500">Medicatie (Let op!)</label>
                <input value={formData.medication} onChange={e => setFormData({...formData, medication: e.target.value})} className="w-full p-3 rounded-xl border border-red-200 dark:bg-gray-900 dark:border-red-900 focus:ring-red-500" placeholder="Vul in indien van toepassing..."/>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Bijzondere Instructies</label>
                <textarea rows={2} value={formData.instructions} onChange={e => setFormData({...formData, instructions: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. Hooi weken in water, of voer verdelen over 3 porties."/>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-bold mb-1">Upload Fysiek Schema (Foto / PDF)</label>
                {formData.feeding_image_url ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 font-bold text-sm">✓ Schema Upload Actief</span>
                    <button type="button" onClick={() => setFormData({...formData, feeding_image_url: ''})} className="text-sm text-red-500 font-bold hover:underline">Verwijder</button>
                  </div>
                ) : (
                  <CloudinaryUploader 
                    onUploadSuccess={(url) => setFormData({...formData, feeding_image_url: url})} 
                    label="Klik of sleep een foto van het whiteboard/schema" 
                  />
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-800 py-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 rounded-xl font-bold border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Annuleren</button>
                <button type="submit" className="flex-1 p-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md">Schema Opslaan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

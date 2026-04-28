'use client'

import { useState } from 'react'
import { Info, Box, Tag, Ruler, Weight, User, Save, X, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function HorsesList({ horses: initialHorses, facilities, staff }: any) {
  const [horses, setHorses] = useState(initialHorses || [])
  const [editingHorse, setEditingHorse] = useState<any>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    breed: '',
    date_of_birth: '',
    gender: '',
    color: '',
    current_box_id: '',
    management_status: ''
  })

  const openEditModal = (horse: any) => {
    setFormData({
      height: horse.height || '',
      weight: horse.weight || '',
      breed: horse.breed || '',
      date_of_birth: horse.date_of_birth || '',
      gender: horse.gender || '',
      color: horse.color || '',
      current_box_id: horse.current_box_id || '',
      management_status: horse.management_status || 'Active'
    })
    setEditingHorse(horse)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingHorse) return

    const { data, error } = await supabase
      .from('horses')
      .update({
        ...formData,
        current_box_id: formData.current_box_id || null
      })
      .eq('id', editingHorse.id)
      .select()
      .single()

    if (!error && data) {
      setHorses(horses.map((h: any) => h.id === editingHorse.id ? data : h))
      setEditingHorse(null)
    } else {
      alert("Fout bij opslaan profiel")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horses?.map((horse: any) => {
          const box = facilities?.find((f: any) => f.id === horse.current_box_id)
          const owner = staff?.find((s: any) => s.id === horse.owner_id)

          return (
            <div key={horse.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {horse.name}
                  </h3>
                  <p className="text-xs font-bold text-primary mt-1 uppercase tracking-wider">{horse.breed || 'Onbekend ras'}</p>
                </div>
                {box && (
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 whitespace-nowrap">
                    <Box size={14} />
                    {box.name} {box.location_type ? `(${box.location_type})` : ''}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4">
                <div className="flex items-center gap-2">
                  <Ruler size={16} className="text-gray-400"/>
                  {horse.height ? `${horse.height}` : '-'}
                </div>
                <div className="flex items-center gap-2">
                  <Weight size={16} className="text-gray-400"/>
                  {horse.weight ? `${horse.weight}` : '-'}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400"/>
                  {horse.date_of_birth ? new Date(horse.date_of_birth).getFullYear() : '-'}
                </div>
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-gray-400"/>
                  {horse.gender || '-'} ({horse.color || '-'})
                </div>
              </div>
              
              <div className="mt-auto space-y-2 text-sm bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold text-xs uppercase">Status</span>
                  <span className={`font-bold text-xs px-2 py-1 rounded ${horse.management_status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                    {horse.management_status || 'Active'}
                  </span>
                </div>
                {horse.passport_number && (
                  <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="text-gray-500 font-semibold text-xs uppercase flex items-center gap-1"><Tag size={12}/> Paspoort</span>
                    <span className="font-mono text-xs">{horse.passport_number}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <a href={`/admin/horses/${horse.id}`} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-bold underline">
                  Volledig CMS Profiel
                </a>
                <button 
                  onClick={() => openEditModal(horse)}
                  className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  Bewerk Stal Data
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      {(!horses || horses.length === 0) && (
        <div className="text-center p-8 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl">Geen paarden gevonden.</div>
      )}

      {editingHorse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl my-8 relative">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 sticky top-0 rounded-t-3xl z-10 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                Stal Profiel: {editingHorse.name}
              </h3>
              <button onClick={() => setEditingHorse(null)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Biometrics */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Fysieke Kenmerken</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Stokmaat (Hoogte)</label>
                    <input value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. 1.68m"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Gewicht</label>
                    <input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. 600kg"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Geslacht</label>
                    <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                      <option value="">Kies...</option>
                      <option value="Mare">Merrie (Mare)</option>
                      <option value="Stallion">Hengst (Stallion)</option>
                      <option value="Gelding">Ruin (Gelding)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Genetics */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Afstamming & Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Ras (Stamboek)</label>
                    <input value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. KWPN of Zangersheide"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Kleur</label>
                    <input value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. Bruin, Vos, Schimmel"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Geboortedatum</label>
                    <input type="date" value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-primary/5 dark:bg-gray-900/50 rounded-2xl border border-primary/10 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2"><Box size={16}/> Locatie & Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Huidige Box / Locatie</label>
                    <select value={formData.current_box_id} onChange={e => setFormData({...formData, current_box_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                      <option value="">Geen vaste box</option>
                      {facilities?.map((f: any) => <option key={f.id} value={f.id}>{f.name} {f.location_type ? `(${f.location_type})` : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Stal Status</label>
                    <select value={formData.management_status} onChange={e => setFormData({...formData, management_status: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                      <option value="Active">Actief (Training/Sport)</option>
                      <option value="Resting">Rust / Vakantie</option>
                      <option value="Rehabilitation">Revalidatie</option>
                      <option value="Sold">Verkocht</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-800 py-4">
                <button type="button" onClick={() => setEditingHorse(null)} className="px-6 py-3 rounded-xl font-bold border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Annuleren</button>
                <button type="submit" className="px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2">
                  <Save size={18} /> Profiel Opslaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

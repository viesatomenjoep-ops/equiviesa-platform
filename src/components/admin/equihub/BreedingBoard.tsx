'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HeartPulse, Plus, Calendar, Activity, CheckCircle, Clock, ExternalLink, ImageIcon } from 'lucide-react'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'

export default function BreedingBoard({ horses, initialLogs }: any) {
  const [logs, setLogs] = useState(initialLogs || [])
  const [showModal, setShowModal] = useState(false)
  const [editingLog, setEditingLog] = useState<any>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    horse_id: '',
    stallion_name: '',
    insemination_date: new Date().toISOString().slice(0, 10),
    status: 'Inseminated',
    expected_due_date: '',
    scan_14_days_result: '',
    notes: '',
    scan_image_url: ''
  })

  const handleInseminationDateChange = (e: any) => {
    const date = new Date(e.target.value)
    if (!isNaN(date.getTime())) {
      const dueDate = new Date(date)
      dueDate.setDate(dueDate.getDate() + 340) // Avg gestation period
      setFormData({
        ...formData,
        insemination_date: e.target.value,
        expected_due_date: dueDate.toISOString().slice(0, 10)
      })
    } else {
      setFormData({ ...formData, insemination_date: e.target.value })
    }
  }

  const openEditModal = (log: any) => {
    setFormData({
      horse_id: log.horse_id || '',
      stallion_name: log.stallion_name || '',
      insemination_date: log.insemination_date || new Date().toISOString().slice(0, 10),
      status: log.status || 'Inseminated',
      expected_due_date: log.expected_due_date || '',
      scan_14_days_result: log.scan_14_days_result || '',
      notes: log.notes || '',
      scan_image_url: log.scan_image_url || ''
    })
    setEditingLog(log)
    setShowModal(true)
  }

  const handleOpenNew = () => {
    setFormData({
      horse_id: '',
      stallion_name: '',
      insemination_date: new Date().toISOString().slice(0, 10),
      status: 'Inseminated',
      expected_due_date: '',
      scan_14_days_result: '',
      notes: '',
      scan_image_url: ''
    })
    setEditingLog(null)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let res;
    if (editingLog) {
      res = await supabase.from('breeding_logs').update({
        ...formData,
        expected_due_date: formData.expected_due_date || null
      }).eq('id', editingLog.id).select().single()
    } else {
      res = await supabase.from('breeding_logs').insert([{
        ...formData,
        expected_due_date: formData.expected_due_date || null
      }]).select().single()
    }

    if (!res.error && res.data) {
      if (editingLog) {
        setLogs(logs.map((l: any) => l.id === editingLog.id ? res.data : l).sort((a: any, b: any) => new Date(b.insemination_date).getTime() - new Date(a.insemination_date).getTime()))
      } else {
        setLogs([res.data, ...logs].sort((a: any, b: any) => new Date(b.insemination_date).getTime() - new Date(a.insemination_date).getTime()))
      }
      setShowModal(false)
    } else {
      alert("Error saving breeding log")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Inseminated': return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md flex items-center gap-1"><Clock size={12}/> Geïnsemineerd</span>
      case 'Pregnant': return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md flex items-center gap-1"><CheckCircle size={12}/> Drachtig</span>
      case 'Empty': return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md flex items-center gap-1"><Activity size={12}/> Gust (Leeg)</span>
      case 'Foaled': return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-md flex items-center gap-1"><HeartPulse size={12}/> Veulen Geboren</span>
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">{status}</span>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="text-primary" /> Fokkerij & Cyclus
          </h2>
          <p className="text-sm text-gray-500 mt-1">Beheer inseminaties, scans en verwachte veulens.</p>
        </div>
        <button 
          onClick={handleOpenNew}
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus size={16} /> Nieuwe Inseminatie
        </button>
      </div>

      <div className="p-6">
        {logs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Nog geen fokkerij data gevonden.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {logs.map((log: any) => {
              const mare = horses?.find((h: any) => h.id === log.horse_id)
              return (
                <div key={log.id} onClick={() => openEditModal(log)} className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30 relative flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {mare ? mare.name : 'Onbekende Merrie'} 
                        <span className="text-gray-400 font-normal mx-2">x</span> 
                        <span className="text-primary">{log.stallion_name}</span>
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar size={14} /> Gedekt: {log.insemination_date}
                      </div>
                    </div>
                    {getStatusBadge(log.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
                    <div className={`p-3 rounded-xl border ${log.scan_14_days_result?.toLowerCase().includes('drachtig') ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800'}`}>
                      <p className="text-xs font-bold text-gray-500 uppercase">14-Dgn Scan</p>
                      <p className="font-medium text-sm mt-1">{log.scan_14_days_result || 'Nog plannen'}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl border border-orange-100 dark:border-orange-800/30">
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">Verwacht</p>
                      <p className="font-medium text-sm mt-1 text-orange-700 dark:text-orange-300 font-bold">{log.expected_due_date || 'Onbekend'}</p>
                    </div>
                  </div>
                  
                  {log.notes && <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">"{log.notes}"</p>}

                  {log.scan_image_url && (
                    <div className="mt-auto">
                      <a href={log.scan_image_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors border border-blue-100 dark:border-blue-800" onClick={(e) => e.stopPropagation()}>
                        <ImageIcon size={16} /> Scan Bekijken <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-xl my-8 relative">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 sticky top-0 rounded-t-3xl z-10">
              <h3 className="text-xl font-bold">{editingLog ? 'Fokkerij Log Bewerken' : 'Nieuwe Dekking / Inseminatie'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Merrie</label>
                  <select required value={formData.horse_id} onChange={e => setFormData({...formData, horse_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="">Selecteer merrie...</option>
                    {horses?.map((h: any) => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Hengst (Naam)</label>
                  <input required value={formData.stallion_name} onChange={e => setFormData({...formData, stallion_name: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. Chacco-Blue"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Datum Inseminatie</label>
                  <input type="date" required value={formData.insemination_date} onChange={handleInseminationDateChange} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Verwachte Datum</label>
                  <input type="date" value={formData.expected_due_date} onChange={e => setFormData({...formData, expected_due_date: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                  <p className="text-[10px] text-gray-500 mt-1">Automatisch +340 dgn</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Status</label>
                <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                  <option value="Inseminated">Geïnsemineerd (Wacht op scan)</option>
                  <option value="Pregnant">Drachtig</option>
                  <option value="Empty">Gust (Leeg)</option>
                  <option value="Foaled">Veulen Geboren</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">14-Dagen Scan Resultaat</label>
                <input value={formData.scan_14_days_result} onChange={e => setFormData({...formData, scan_14_days_result: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. Drachtig 1 of Gust"/>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Upload Scan Foto / Echo</label>
                {formData.scan_image_url ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 font-bold text-sm">✓ Echo / Scan geüpload</span>
                    <button type="button" onClick={() => setFormData({...formData, scan_image_url: ''})} className="text-sm text-red-500 font-bold hover:underline">Verwijder</button>
                  </div>
                ) : (
                  <CloudinaryUploader 
                    onUploadSuccess={(url) => setFormData({...formData, scan_image_url: url})} 
                    label="Upload echo foto of scan (Optioneel)" 
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Opmerkingen / Cyclus info</label>
                <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. follikel was 45mm..."/>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-800 py-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 rounded-xl font-bold border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Annuleren</button>
                <button type="submit" className="flex-1 p-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-md">Opslaan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

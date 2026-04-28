'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Plus, File, ExternalLink, Calendar } from 'lucide-react'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'

export default function DocumentsBoard({ horses, initialDocuments }: any) {
  const [documents, setDocuments] = useState(initialDocuments || [])
  const [showModal, setShowModal] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: '',
    horse_id: '',
    file_type: 'Passport',
    file_url: '',
    expiry_date: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.from('stable_documents').insert([{
      ...formData,
      horse_id: formData.horse_id || null,
      expiry_date: formData.expiry_date || null
    }]).select().single()

    if (!error && data) {
      setDocuments([data, ...documents].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      setShowModal(false)
    } else {
      alert("Error saving document")
    }
  }

  const [searchTerm, setSearchTerm] = useState('')

  const filteredDocuments = documents.filter((doc: any) => {
    const horse = horses?.find((h: any) => h.id === doc.horse_id)
    const searchString = `${doc.title} ${doc.file_type} ${horse?.name || ''}`.toLowerCase()
    return searchString.includes(searchTerm.toLowerCase())
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-primary" /> Documenten & Dossiers
          </h2>
          <p className="text-sm text-gray-500 mt-1">Paspoorten, Röntgenfoto's, Contracten en Facturen centraal opgeslagen.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Zoeken in documenten..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm w-full sm:w-48 dark:bg-gray-900"
          />
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} /> Nieuw Document
          </button>
        </div>
      </div>

      <div className="p-6">
        {filteredDocuments.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Geen documenten gevonden.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDocuments.map((doc: any) => {
              const horse = horses?.find((h: any) => h.id === doc.horse_id)
              return (
                <div key={doc.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-primary">
                        <File size={20} />
                        <span className="text-xs font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">{doc.file_type}</span>
                      </div>
                      {doc.expiry_date && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          Exp: {doc.expiry_date}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{horse ? `🐴 ${horse.name}` : 'Algemeen Stal Document'}</p>
                  </div>
                  <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Open Document <ExternalLink size={14} />
                  </a>
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
              <h3 className="text-xl font-bold">Document Toevoegen</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Titel Document</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900" placeholder="Bijv. Paspoort of X-Ray 2026"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Gekoppeld Paard</label>
                  <select value={formData.horse_id} onChange={e => setFormData({...formData, horse_id: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="">Geen (Algemeen Stal Document)</option>
                    {horses?.map((h: any) => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Type Document</label>
                  <select required value={formData.file_type} onChange={e => setFormData({...formData, file_type: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="Passport">Paspoort</option>
                    <option value="X-Ray">Röntgenfoto's (X-Ray)</option>
                    <option value="Vet Report">Keuringsrapport</option>
                    <option value="Contract">Contract</option>
                    <option value="Invoice">Factuur</option>
                    <option value="Other">Overig</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Upload Document *</label>
                {formData.file_url ? (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-400 font-bold text-sm">✓ Bestand succesvol geüpload</span>
                    <button type="button" onClick={() => setFormData({...formData, file_url: ''})} className="text-sm text-red-500 font-bold hover:underline">Wijzig Bestand</button>
                  </div>
                ) : (
                  <CloudinaryUploader 
                    onUploadSuccess={(url) => setFormData({...formData, file_url: url})} 
                    label="Klik om PDF, Afbeelding of Video te uploaden" 
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Verloopdatum (Optioneel)</label>
                <input type="date" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
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

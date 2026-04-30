'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Phone, Mail, Building, Plus } from 'lucide-react'

export default function ContactsBoard({ initialContacts, staff }: any) {
  const [contacts, setContacts] = useState(initialContacts || [])
  const [showModal, setShowModal] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    role: 'Vet',
    email: '',
    phone: '',
    company: '',
    notes: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState<any>(null)

  const filteredContacts = contacts.filter((contact: any) => {
    const searchString = `${contact.name} ${contact.role} ${contact.company || ''} ${contact.email || ''}`.toLowerCase()
    return searchString.includes(searchTerm.toLowerCase())
  })

  const openEditModal = (contact: any) => {
    setFormData({
      name: contact.name || '',
      role: contact.role || 'Vet',
      email: contact.email || '',
      phone: contact.phone || '',
      company: contact.company || '',
      notes: contact.notes || ''
    })
    setEditingContact(contact)
    setShowModal(true)
  }

  const handleOpenNew = () => {
    setFormData({ name: '', role: 'Vet', email: '', phone: '', company: '', notes: '' })
    setEditingContact(null)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let res;
    if (editingContact) {
      res = await supabase.from('contacts').update(formData).eq('id', editingContact.id).select().single()
    } else {
      res = await supabase.from('contacts').insert([formData]).select().single()
    }

    if (!res.error && res.data) {
      if (editingContact) {
        setContacts(contacts.map((c: any) => c.id === editingContact.id ? res.data : c).sort((a: any, b: any) => a.name.localeCompare(b.name)))
      } else {
        setContacts([...contacts, res.data].sort((a: any, b: any) => a.name.localeCompare(b.name)))
      }
      setShowModal(false)
    } else {
      alert("Error saving contact")
    }
  }

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Vet': return 'bg-blue-100 text-blue-700'
      case 'Farrier': return 'bg-orange-100 text-orange-700'
      case 'Owner': return 'bg-purple-100 text-purple-700'
      case 'Transporter': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="text-primary" /> Relaties & Teams
          </h2>
          <p className="text-sm text-gray-500 mt-1">Dierenartsen, hoefsmeden, eigenaren en personeel.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Zoeken in relaties..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm w-full sm:w-48 dark:bg-gray-900"
          />
          <button 
            onClick={handleOpenNew}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} /> Nieuw Contact
          </button>
        </div>
      </div>

      <div className="p-6">
        {filteredContacts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Geen relaties gevonden.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact: any) => (
              <div key={contact.id} onClick={() => openEditModal(contact)} className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${getRoleBadge(contact.role)}`}>
                    {contact.role}
                  </span>
                </div>
                {contact.company && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2"><Building size={14} /> {contact.company}</div>}
                {contact.phone && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2"><Phone size={14} /> {contact.phone}</div>}
                {contact.email && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2"><Mail size={14} /> {contact.email}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8 relative">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-xl font-bold">{editingContact ? 'Relatie Bewerken' : 'Nieuwe Relatie Toevoegen'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Naam</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Rol</label>
                  <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900">
                    <option value="Vet">Dierenarts (Vet)</option>
                    <option value="Farrier">Hoefsmid (Farrier)</option>
                    <option value="Owner">Eigenaar (Owner)</option>
                    <option value="Transporter">Transporteur</option>
                    <option value="Staff">Personeel (Staff)</option>
                    <option value="Other">Overig</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Bedrijf (Optioneel)</label>
                <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Telefoon (Optioneel)</label>
                  <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Email (Optioneel)</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-900"/>
                </div>
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

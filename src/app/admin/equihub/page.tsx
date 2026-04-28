import { createClient } from '@/lib/supabase/server'
import EquihubDashboard from '@/components/admin/equihub/EquihubDashboard'

export const metadata = {
  title: 'Viesa Stable Management - Equivest',
}

export default async function EquihubPage() {
  const supabase = await createClient()
  
  // 1. Fetch Tasks (without deep relations to prevent PostgREST cache errors)
  const { data: tasks, error: tasksError } = await supabase
    .from('stable_tasks')
    .select('*')
    .order('scheduled_at', { ascending: true })

  // 2. Fetch Horses (with stable info)
  const { data: horses, error: horsesError } = await supabase
    .from('horses')
    .select('*')
    .order('name')

  // 3. Fetch Facilities (Boxes)
  const { data: facilities } = await supabase
    .from('facilities')
    .select('*')
    .order('name')

  // 4. Fetch Feeding Schedules
  const { data: feedingSchedules } = await supabase
    .from('feeding_schedules')
    .select('*')

  // 5. Fetch Staff (Admin Users for assignment)
  const { data: staff } = await supabase
    .from('admin_permissions')
    .select('id, email')
    .order('email')

  // --- NEW EXPANSION DATA ---
  // 6. Fetch Contacts (Vets, Farriers, Teams)
  const { data: contacts, error: contactsError } = await supabase
    .from('contacts')
    .select('*')
    .order('name')

  // 7. Fetch Health Logs
  const { data: healthLogs } = await supabase
    .from('health_logs')
    .select('*')
    .order('date', { ascending: false })

  // 8. Fetch Documents
  const { data: documents } = await supabase
    .from('stable_documents')
    .select('*')
    .order('created_at', { ascending: false })

  const errorMsg = tasksError ? `Tasks Error: ${tasksError.message}` : (horsesError ? `Horses Error: ${horsesError.message}` : (contactsError ? `Contacts Error: ${contactsError.message}` : false))

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <EquihubDashboard 
        tasks={tasks || []} 
        horses={horses || []} 
        facilities={facilities || []}
        feedingSchedules={feedingSchedules || []}
        staff={staff || []} 
        contacts={contacts || []}
        healthLogs={healthLogs || []}
        documents={documents || []}
        isError={errorMsg}
      />
    </div>
  )
}

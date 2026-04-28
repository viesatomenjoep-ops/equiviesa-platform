import { createClient } from '@/lib/supabase/server'
import EquihubDashboard from '@/components/admin/equihub/EquihubDashboard'

export const metadata = {
  title: 'Equihub (Stable Management) - Equivest',
}

export default async function EquihubPage() {
  const supabase = await createClient()
  
  // 1. Fetch Tasks
  const { data: tasks, error: tasksError } = await supabase
    .from('stable_tasks')
    .select('*, horses ( name, current_box_id ), admin_permissions ( email )')
    .order('scheduled_at', { ascending: true })

  // 2. Fetch Horses (with stable info)
  const { data: horses } = await supabase
    .from('horses')
    .select('id, name, current_box_id, owner_id, passport_number, chip_number, management_status, tack_info, cover_image_url')
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

  // 5. Fetch Staff
  const { data: staff } = await supabase
    .from('admin_permissions')
    .select('id, email')
    .order('email')

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <EquihubDashboard 
        tasks={tasks || []} 
        horses={horses || []} 
        facilities={facilities || []}
        feedingSchedules={feedingSchedules || []}
        staff={staff || []} 
        isError={tasksError ? tasksError.message + " | Details: " + tasksError.details : false}
      />
    </div>
  )
}

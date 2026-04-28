'use client'

import { Info, Box, Tag } from 'lucide-react'

export default function HorsesList({ horses, facilities, staff }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {horses?.map((horse: any) => {
          const box = facilities?.find((f: any) => f.id === horse.current_box_id)
          const owner = staff?.find((s: any) => s.id === horse.owner_id)

          return (
            <div key={horse.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{horse.name}</h3>
                {box && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    <Box size={14} />
                    {box.name}
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mt-auto">
                <div className="flex items-center gap-2">
                  <Info size={14} />
                  Status: {horse.management_status || 'Active'}
                </div>
                {horse.passport_number && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} />
                    Paspoort: {horse.passport_number}
                  </div>
                )}
                {owner && (
                  <div className="flex items-center gap-2">
                    <span className="opacity-70">👤</span>
                    Eigenaar: {owner.email}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <a href={`/admin/horses/${horse.id}`} className="text-primary hover:underline text-sm font-bold">
                  Bewerk Profiel &rarr;
                </a>
              </div>
            </div>
          )
        })}
      </div>
      {(!horses || horses.length === 0) && (
        <div className="text-center p-8 text-gray-500">Geen paarden gevonden.</div>
      )}
    </div>
  )
}

'use client'

import { Carrot, Plus } from 'lucide-react'

export default function FeedingBoard({ horses, initialSchedules }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
          <Plus size={20} />
          Nieuw Voedingsschema
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 font-bold">Paard</th>
                <th className="p-4 font-bold">Ruwvoer</th>
                <th className="p-4 font-bold">Krachtvoer</th>
                <th className="p-4 font-bold">Supplementen / Medicatie</th>
              </tr>
            </thead>
            <tbody>
              {horses?.map((horse: any) => {
                const schedule = initialSchedules?.find((s: any) => s.horse_id === horse.id)
                
                return (
                  <tr key={horse.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Carrot size={16} className="text-orange-500" />
                      {horse.name}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {schedule?.roughage || <span className="text-gray-400 italic">Niet ingesteld</span>}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {schedule?.concentrates || <span className="text-gray-400 italic">Niet ingesteld</span>}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {schedule?.supplements || schedule?.medication ? (
                        <div className="space-y-1 text-sm">
                          {schedule.supplements && <div>{schedule.supplements}</div>}
                          {schedule.medication && <div className="text-red-500 font-semibold">{schedule.medication}</div>}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {(!horses || horses.length === 0) && (
          <div className="p-8 text-center text-gray-500">Geen paarden gevonden.</div>
        )}
      </div>
    </div>
  )
}

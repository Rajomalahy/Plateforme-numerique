import { FaCalendarAlt, FaVideo, FaLink, FaMapMarkerAlt, FaBullhorn, FaBuilding, FaBroadcastTower, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Calendar from 'react-calendar'
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css'

export default function Entretien () {

    const [date, setDate] = useState(new Date(2026, 6, 27))

    const entretiens = [
        {
            id: 1,
            entreprise: 'TanaMedia',
            poste: 'Community Manager',
            date: '27 juillet 2026',
            heure: '10h00',
            jour: 27,
            type: 'Visioconférence',
            lien: 'Lien Teams',
            icon: <FaBullhorn />,
            iconBg: 'bg-green-700'
        },
        {
            id: 2,
            entreprise: 'Vola Mada Bank',
            poste: 'Chargé(e) de Clientèle',
            date: '29 juillet 2026',
            heure: '14h30',
            jour: 29,
            type: 'Présentiel',
            lieu: 'Siège social, Antananarivo',
            icon: <FaBuilding />,
            iconBg: 'bg-yellow-500'
        },
        {
            id: 3,
            entreprise: 'Orange Digital Center',
            poste: 'Développeur Web',
            date: '31 juillet 2026',
            heure: '09h00',
            jour: 31,
            type: 'Visioconférence',
            lien: 'Lien Teams',
            icon: <FaBroadcastTower />,
            iconBg: 'bg-blue-900'
        }
    ]

    return (
        <div>

            <div className="text-center py-4">
                <h1 className="text-xl font-bold text-gray-800 mb-2">Entretiens</h1>
                <p className="text-gray-500 text-sm">
                    Vos entretiens programmés et votre calendrier du mois.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* calendrier */}
                <div className="xl:col-span-7">
                    <div className="bg-white border border-gray-200 rounded-xl px-8 py-8 h-full flex flex-col ">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            locale="fr-FR"
                            className="!w-full !max-w-full !border-none !mt-3" 
                        />
                    </div>
                </div>

                {/* listes des entretiens */}
                <div className="xl:col-span-5 px-2 relative">
                    <div className="bg-white border border-gray-200 rounded-xl px-8 py-6 h-full">
                        
                        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex-shrink-0">Prochains entretiens</h2>
                        
                        <div className="space-y-4 flex-1 min-h-0 overflow-y-auto pr-2">
                            {entretiens.map((entretien) => (
                                <div key={entretien.id} className='pb-6'>
                                    <div className="flex items-start gap-3 mb-2">
                                        <div className={`w-10 h-10 ${entretien.iconBg} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                            {entretien.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-800">
                                                {entretien.entreprise} — {entretien.poste}
                                            </h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                                                <FaCalendarAlt className="text-gray-400" />
                                                {entretien.date} · {entretien.heure}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 ml-13">
                                        {entretien.type === 'Visioconférence' && (
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs border border-gray-200">
                                                <FaVideo className="text-gray-500" />
                                                Visioconférence
                                            </span>
                                        )}
                                        {entretien.lien && (
                                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs border border-blue-200">
                                                <FaLink className="text-blue-500" />
                                                {entretien.lien}
                                            </span>
                                        )}
                                        {entretien.lieu && (
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs border border-gray-200">
                                                <FaMapMarkerAlt className="text-gray-500" />
                                                {entretien.lieu}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { FaCalendarAlt, FaVideo, FaLink, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa'
import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import { getMesEntretiens } from '../Services/Service'

export default function Entretien() {
    const [date, setDate] = useState(new Date())
    const [entretiens, setEntretiens] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadEntretiens = async () => {
            try {
                const token = localStorage.getItem('token')
                const data = await getMesEntretiens(token)
                setEntretiens(data)
            } catch (err) {
                console.error("Erreur chargement entretiens:", err)
            } finally {
                setLoading(false)
            }
        }
        loadEntretiens()
    }, [])

    // Formater la date pour l'affichage
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        })
    }

    const formatHeure = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    }

    return (
        <div>
            <div className="text-center py-4">
                <h1 className="text-xl font-bold text-gray-800 mb-2">Entretiens</h1>
                <p className="text-gray-500 text-sm">
                    Vos entretiens programmés et votre calendrier du mois.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Calendrier */}
                <div className="xl:col-span-7">
                    <div className="bg-white border border-gray-200 rounded-xl px-8 py-8 h-full flex flex-col">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            locale="fr-FR"
                            className="!w-full !max-w-full !border-none !mt-3"
                        />
                    </div>
                </div>

                {/* Liste des entretiens */}
                <div className="xl:col-span-5 px-2 relative">
                    <div className="bg-white border border-gray-200 rounded-xl px-8 py-6 h-full">
                        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex-shrink-0">
                            Prochains entretiens
                        </h2>

                        {loading ? (
                            <div className="text-center py-10 flex items-center justify-center gap-2 text-gray-500">
                                <FaSpinner className="animate-spin" /> Chargement...
                            </div>
                        ) : entretiens.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <p className="font-medium">Aucun entretien programmé.</p>
                                <p className="text-xs mt-1">Les entretiens apparaîtront ici une fois qu'une entreprise vous aura contacté.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 flex-1 min-h-0 overflow-y-auto pr-2">
                                {entretiens.map((entretien) => (
                                    <div key={entretien.id} className='pb-6 border-b border-gray-100 last:border-0'>
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                                <FaCalendarAlt />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-800">
                                                    {entretien.entreprise} — {entretien.poste}
                                                </h3>
                                                <p className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    {formatDate(entretien.dateHeure)} · {formatHeure(entretien.dateHeure)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 ml-13">
                                            {entretien.type === 'Visioconférence' && entretien.lienVisio && (
                                                <a 
                                                    href={entretien.lienVisio} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs border border-blue-200 hover:bg-blue-100 transition"
                                                >
                                                    <FaVideo className="text-blue-500" />
                                                    Rejoindre la visio
                                                </a>
                                            )}
                                            {entretien.lieu && (
                                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs border border-gray-200">
                                                    <FaMapMarkerAlt className="text-gray-500" />
                                                    {entretien.lieu}
                                                </span>
                                            )}
                                        </div>

                                        {entretien.commentaire && (
                                            <p className="text-xs text-gray-600 mt-2 ml-13">
                                                {entretien.commentaire}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
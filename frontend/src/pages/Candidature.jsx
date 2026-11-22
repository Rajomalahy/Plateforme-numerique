import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaMapMarkerAlt, FaEye, FaTimes, FaBuilding, FaSpinner, FaBriefcase } from 'react-icons/fa'
import { getMesCandidaturesCandidat, annulerCandidature } from '../Services/Service'

export default function MesCandidatures() {
    const [candidatures, setCandidatures] = useState([])
    const [loading, setLoading] = useState(true)
    
    // États pour le filtrage
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatut, setFilterStatut] = useState('Toutes')

    useEffect(() => {
        const loadCandidatures = async () => {
            try {
                const token = localStorage.getItem('token')
                const data = await getMesCandidaturesCandidat(token)
                setCandidatures(data)
            } catch (err) {
                console.error("Erreur chargement candidatures:", err)
            } finally {
                setLoading(false)
            }
        }
        loadCandidatures()
    }, [])

    // Fonction pour annuler une candidature (seulement si "En attente")
    const handleAnnuler = async (id) => {
        if (!window.confirm("Voulez-vous vraiment annuler cette candidature ?")) return
        try {
            const token = localStorage.getItem('token')
            await annulerCandidature(id, token)
            // Mettre à jour la liste en retirant la candidature annulée
            setCandidatures(prev => prev.filter(c => c.id !== id))
        } catch (err) {
            alert(err.response?.data?.message || "Erreur lors de l'annulation")
        }
    }

    // Fonction pour déterminer la classe CSS du statut (RG16)
    const getStatutClass = (statut) => {
        switch (statut) {
            case 'En attente': return 'bg-blue-50 text-blue-700 border border-blue-200';
            case 'En entretien': return 'bg-purple-50 text-purple-700 border border-purple-200';
            case 'Accepté': return 'bg-green-50 text-green-700 border border-green-200';
            case 'Refusé': return 'bg-red-50 text-red-700 border border-red-200';
            default: return 'bg-gray-50 text-gray-700 border border-gray-200';
        }
    }

    // Filtrage des données en temps réel
    const candidaturesFiltrees = candidatures.filter(c => {
        const matchRecherche = c.titreOffre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               c.entreprise.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatut = filterStatut === 'Toutes' || c.statut === filterStatut;
        return matchRecherche && matchStatut;
    });

    return (
        <div className="rounded-t-md bg-[#F5F6FA] min-h-screen pb-10">

            <div className="text-center py-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Candidatures</h1>
                <p className="text-gray-500 text-sm">
                    Retrouvez toutes vos candidatures envoyées aux entreprises et suivez leur évolution.
                </p>
            </div>

            <div className='max-w-5xl mx-auto px-6 mb-6'>
                <div className='bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row gap-3 items-center p-4 shadow-sm'>
                    {/* Recherche */}
                    <div className='w-full flex items-center gap-2 py-2 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition'>
                        <FaSearch className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher une entreprise ou un poste..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full text-sm focus:outline-none bg-transparent' 
                        />
                    </div>

                    {/* Filtre par statut */}
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition'>
                        <FaFilter className="text-gray-400 text-sm" />
                        <select 
                            value={filterStatut}
                            onChange={(e) => setFilterStatut(e.target.value)}
                            className='text-sm text-gray-700 focus:outline-none bg-transparent cursor-pointer'
                        >
                            <option value="Toutes">Tous les statuts</option>
                            <option value="En attente">En attente</option>
                            <option value="En entretien">En entretien</option>
                            <option value="Accepté">Accepté</option>
                            <option value="Refusé">Refusé</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='max-w-5xl mx-auto px-6'>
                <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
                    
                    {loading ? (
                        <div className="text-center py-16 flex flex-col items-center gap-3">
                            <FaSpinner className="animate-spin text-3xl text-blue-600" />
                            <p className="text-gray-500">Chargement de vos candidatures...</p>
                        </div>
                    ) : candidaturesFiltrees.length === 0 ? (
                        <div className="text-center py-16">
                            <FaBriefcase className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">Aucune candidature trouvée.</p>
                            <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres ou postulez à de nouvelles offres.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className='w-full'>
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Entreprise</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Poste</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {candidaturesFiltrees.map((c) => (
                                        <tr key={c.id} className='hover:bg-gray-50 transition'>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                                                        <FaBuilding />
                                                    </div>
                                                    <span className='text-sm font-semibold text-gray-800'>{c.entreprise}</span>
                                                </div>
                                            </td>

                                            <td className='px-6 py-4'>
                                                <span className="text-sm font-medium text-gray-700">{c.titreOffre}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(c.dateCandidature).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatutClass(c.statut)}`}>
                                                    {c.statut}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-600" title="Voir les détails">
                                                        <FaEye className="text-sm" />
                                                    </button>
                                                    
                                                    {/* Le bouton Annuler n'apparaît que si la candidature est encore "En attente" (RG16) */}
                                                    {c.statut === 'En attente' && (
                                                        <button 
                                                            onClick={() => handleAnnuler(c.id)}
                                                            className="p-2 border border-red-200 rounded-lg hover:bg-red-50 transition text-red-600" 
                                                            title="Annuler la candidature"
                                                        >
                                                            <FaTimes className="text-sm" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
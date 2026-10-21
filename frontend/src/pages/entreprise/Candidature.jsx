import { useState, useEffect } from 'react'
import { FaDownload, FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa'
import { getMesCandidaturesEntreprise, updateStatutCandidature } from '../../Services/Service'

export default function MesCandidaturesEntreprise() {
    const [candidatures, setCandidatures] = useState([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        setLoading(true)
        try {
            const data = await getMesCandidaturesEntreprise(localStorage.getItem('token'))
            setCandidatures(data)
        } catch (err) {
            console.error("Erreur chargement candidatures:", err)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => { loadData() }, [])

    const changerStatut = async (id, nouveauStatut) => {
        if(!window.confirm(`Voulez-vous vraiment passer cette candidature au statut "${nouveauStatut}" ?`)) return
        try {
            await updateStatutCandidature(id, nouveauStatut, localStorage.getItem('token'))
            loadData() // Recharger la liste pour voir le nouveau statut
        } catch (err) { 
            alert(err.response?.data?.message || "Erreur lors de la mise à jour") 
        }
    }

    const getStatutBadge = (statut) => {
        const styles = {
            'En attente': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'En entretien': 'bg-blue-100 text-blue-700 border-blue-200',
            'Accepté': 'bg-green-100 text-green-700 border-green-200',
            'Refusé': 'bg-red-100 text-red-700 border-red-200'
        }
        return styles[statut] || 'bg-gray-100 text-gray-700 border-gray-200'
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Candidatures reçues</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Chargement des candidatures...</div>
                ) : candidatures.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">Aucune candidature reçue pour le moment.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Candidat</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Offre</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut actuel</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {candidatures.map(c => (
                                <tr key={c.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{c.nomCandidat}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{c.titreOffre}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.dateCandidature).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatutBadge(c.statut)}`}>
                                            {c.statut}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-3">
                                            {/* 1. Bouton pour voir/télécharger le CV */}
                                            {c.urlCv && (
                                                <a 
                                                    href={c.urlCv} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                                                    title="Voir le CV"
                                                >
                                                    <FaDownload />
                                                </a>
                                            )}
                                            
                                            {/* 2. Menu déroulant pour changer le statut (Toujours visible) */}
                                            <select 
                                                value={c.statut}
                                                onChange={(e) => changerStatut(c.id, e.target.value)}
                                                disabled={c.statut === 'Accepté' || c.statut === 'Refusé'} // On bloque si c'est déjà finalisé (optionnel)
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getStatutBadge(c.statut)}`}
                                            >
                                                <option value="En attente"> En attente</option>
                                                <option value="En entretien"> En entretien</option>
                                                <option value="Accepté">Accepté</option>
                                                <option value="Refusé"> Refusé</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { FaDownload, FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa'
import { getMesCandidatures, updateStatutCandidature } from '../../Services/Service'

export default function MesCandidatures() {
    const [candidatures, setCandidatures] = useState([])

    const loadData = () => {
        getMesCandidatures(localStorage.getItem('token')).then(setCandidatures).catch(console.error)
    }
    useEffect(() => { loadData() }, [])

    const changerStatut = async (id, nouveauStatut) => {
        if(!window.confirm(`Changer le statut en "${nouveauStatut}" ?`)) return
        try {
            await updateStatutCandidature(id, nouveauStatut, localStorage.getItem('token'))
            loadData() // Recharger la liste
        } catch (err) { alert("Erreur lors de la mise à jour") }
    }

    const getStatutBadge = (statut) => {
        const styles = {
            'En attente': 'bg-yellow-100 text-yellow-700',
            'En entretien': 'bg-blue-100 text-blue-700',
            'Accepté': 'bg-green-100 text-green-700',
            'Refusé': 'bg-red-100 text-red-700'
        }
        return styles[statut] || 'bg-gray-100 text-gray-700'
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Candidatures reçues</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Candidat</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Offre</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
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
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutBadge(c.statut)}`}>
                                        {c.statut}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        {c.urlCv && (
                                            <a href={c.urlCv} target="_blank" rel="noreferrer" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Voir CV">
                                                <FaDownload />
                                            </a>
                                        )}
                                        {c.statut === 'En attente' && (
                                            <>
                                                <button onClick={() => changerStatut(c.id, 'En entretien')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="En entretien"><FaHourglassHalf /></button>
                                                <button onClick={() => changerStatut(c.id, 'Accepté')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Accepter"><FaCheck /></button>
                                                <button onClick={() => changerStatut(c.id, 'Refusé')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Refuser"><FaTimes /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {candidatures.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Aucune candidature reçue pour le moment.</div>
                )}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { FaBriefcase, FaTrash, FaMapMarkerAlt, FaBuilding, FaSpinner } from 'react-icons/fa'
import { getAllOffresAdmin, adminDeleteOffre } from '../../Services/Service'

export default function ModerationOffres() {
    const [offres, setOffres] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatut, setFilterStatut] = useState('Tous')

    const token = localStorage.getItem('token')

    const loadOffres = async () => {
        setLoading(true)
        try {
            const data = await getAllOffresAdmin(token)
            setOffres(data)
        } catch (err) {
            console.error("Erreur chargement offres:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadOffres() }, [])

    const handleSupprimer = async (id) => {
        if (!window.confirm("⚠️ Êtes-vous sûr de vouloir SUPPRIMER cette offre ? Cette action est irréversible.")) return
        try {
            await adminDeleteOffre(id, token)
            loadOffres()
        } catch (err) {
            alert(err.response?.data?.message || "Erreur")
        }
    }

    const offresFiltrees = offres.filter(o => 
        filterStatut === 'Tous' || o.statut === filterStatut
    )

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaBriefcase /> Modération des Offres
                </h2>
                <select 
                    value={filterStatut}
                    onChange={(e) => setFilterStatut(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Active">Actives</option>
                    <option value="Fermée">Fermées</option>
                    <option value="Archivée">Archivées</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-10 flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin text-blue-600" /> Chargement...
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Titre</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Entreprise</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ville</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contrat</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Candidatures</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Statut</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {offresFiltrees.map(o => (
                                    <tr key={o.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-800">{o.titre}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <FaBuilding className="text-gray-400" />
                                                {o.entreprise}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-gray-400" />
                                                {o.ville}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                                {o.typeContrat}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(o.datePublication).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                                                {o.nbCandidatures}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                o.statut === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {o.statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleSupprimer(o.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                                                title="Supprimer l'offre"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {offresFiltrees.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Aucune offre trouvée.</div>
                    )}
                </div>
            )}
        </div>
    )
}
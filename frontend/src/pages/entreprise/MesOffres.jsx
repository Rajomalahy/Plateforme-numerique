import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { getMesOffres, deleteOffre } from '../../Services/Service'

export default function MesOffres() {
    const navigate = useNavigate()
    const [offres, setOffres] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadOffres = async () => {
            try {
                const data = await getMesOffres(localStorage.getItem('token'))
                setOffres(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadOffres()
    }, [])

    const handleDelete = async (id) => {

        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.")) return
        
        try {

            await deleteOffre(id, localStorage.getItem('token'))
            
            const data = await getMesOffres(localStorage.getItem('token'))

            setOffres(data)

            alert("Offre supprimée avec succès !")

        } catch (err) {

            alert(err.response?.data?.message || "Erreur lors de la suppression")

        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mes Offres d'emploi</h2>
                <button onClick={() => navigate('/dashboardentreprise/publier')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    <FaPlus /> Nouvelle offre
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Chargement des offres...</div>
            ) : offres.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 mb-4">Vous n'avez pas encore publié d'offres.</p>
                    <button onClick={() => navigate('/dashboardentreprise/publier')} className="text-blue-600 font-medium hover:underline">Publier ma première offre</button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Titre</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ville / Contrat</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Candidatures</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {offres.map(offre => (
                                <tr key={offre.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{offre.titre}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div>{offre.villeNom}</div>
                                        <div className="text-xs text-gray-400">{offre.typeContrat}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(offre.datePublication).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{offre.nbCandidatures}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${offre.statut === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {offre.statut}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            
                                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Voir">
                                                <FaEye />
                                            </button>
                                         
                                            <button 
                                                onClick={() => navigate(`/dashboardentreprise/offres/modifier/${offre.id}`)} 
                                                className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition" 
                                                title="Modifier"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button onClick={() => handleDelete(offre.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Supprimer">
                                                <FaTrash />
                                            </button>
                                            
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
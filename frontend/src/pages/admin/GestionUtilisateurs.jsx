import { useState, useEffect } from 'react'
import { FaUsers, FaBan, FaTrash, FaEye, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { getUtilisateurs, bloquerUtilisateur, supprimerUtilisateur, getProfilUtilisateur } from '../../Services/Service'

export default function GestionUtilisateurs() {
    const [utilisateurs, setUtilisateurs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterRole, setFilterRole] = useState('Tous')
    const [profilModal, setProfilModal] = useState(null)

    const token = localStorage.getItem('token')

    const loadUtilisateurs = async () => {
        setLoading(true)
        try {
            const data = await getUtilisateurs(token)
            setUtilisateurs(data)
        } catch (err) {
            console.error("Erreur chargement utilisateurs:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadUtilisateurs() }, [])

    const handleBloquer = async (id) => {
        if (!window.confirm("Confirmer le changement de statut de blocage ?")) return
        try {
            await bloquerUtilisateur(id, token)
            loadUtilisateurs()
        } catch (err) {
            alert(err.response?.data?.message || "Erreur")
        }
    }

    const handleSupprimer = async (id) => {
        if (!window.confirm("⚠️ Êtes-vous sûr de vouloir SUPPRIMER DÉFINITIVEMENT cet utilisateur ? Cette action est irréversible.")) return
        try {
            await supprimerUtilisateur(id, token)
            loadUtilisateurs()
        } catch (err) {
            alert(err.response?.data?.message || "Erreur")
        }
    }

    const handleVoirProfil = async (id) => {
        try {
            const profil = await getProfilUtilisateur(id, token)
            setProfilModal(profil)
        } catch (err) {
            alert("Erreur lors du chargement du profil")
        }
    }

    const utilisateursFiltres = utilisateurs.filter(u => 
        filterRole === 'Tous' || u.role === filterRole
    )

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUsers /> Gestion des Utilisateurs
                </h2>
                <select 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Tous">Tous les rôles</option>
                    <option value="Entreprise">Entreprises</option>
                    <option value="Demandeur">Demandeurs d'emploi</option>
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
                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nom / Société</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rôle</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Inscription</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Statut</th>
                                    <th className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {utilisateursFiltres.map(u => (
                                    <tr key={u.id} className={`hover:bg-gray-50 transition ${u.estBloqué ? 'bg-red-50' : ''}`}>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {u.nomSociete || u.nomComplet || 'Non complété'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                u.role === 'Entreprise' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(u.dateInscription).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {u.estBloqué ? (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Bloqué</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Actif</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleVoirProfil(u.id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                                                    title="Voir le profil"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button 
                                                    onClick={() => handleBloquer(u.id)}
                                                    className={`p-2 rounded-lg transition ${u.estBloqué ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'}`}
                                                    title={u.estBloqué ? "Débloquer" : "Bloquer"}
                                                >
                                                    <FaBan />
                                                </button>
                                                <button 
                                                    onClick={() => handleSupprimer(u.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                                                    title="Supprimer"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {utilisateursFiltres.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Aucun utilisateur trouvé.</div>
                    )}
                </div>
            )}

            {/* Modal pour voir le profil détaillé */}
            {profilModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                Profil {profilModal.type}
                            </h3>
                            <button 
                                onClick={() => setProfilModal(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {Object.entries(profilModal).map(([key, value]) => {
                                if (key === 'type') return null
                                return (
                                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm font-medium text-gray-600 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <span className="text-sm text-gray-800 font-semibold">
                                            {value === null || value === undefined ? '-' : 
                                             typeof value === 'boolean' ? (value ? 'Oui' : 'Non') :
                                             value.toString()}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {profilModal.urlCv && (
                            <div className="mt-4">
                                <a 
                                    href={profilModal.urlCv} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    <FaEye /> Voir le CV
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
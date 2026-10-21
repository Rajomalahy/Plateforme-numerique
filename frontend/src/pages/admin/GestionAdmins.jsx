import { useState, useEffect } from 'react'
import { FaPlus, FaUserShield, FaTrash, FaCheckCircle, FaSpinner, FaEdit } from 'react-icons/fa'
import { creerAdmin, getAdmins, updateAdmin, deleteAdmin } from '../../Services/Service'

export default function GestionAdmins() {
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null) 
    
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: '',
        nom: '',
        matricule: ''
    })
    
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [loading, setLoading] = useState(false)
    const [loadingList, setLoadingList] = useState(true)
    
    const [admins, setAdmins] = useState([])

    const token = localStorage.getItem('token')
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id

    const loadAdmins = async () => {
        setLoadingList(true)
        try {
            const data = await getAdmins(token)
            setAdmins(data)
        } catch (err) {
            console.error("Erreur chargement admins:", err)
        } finally {
            setLoadingList(false)
        }
    }

    useEffect(() => {
        loadAdmins()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            if (editingId) {
                // Mode Modification
                await updateAdmin(editingId, formData, token)
                setSuccess('Administrateur modifié avec succès !')
            } else {
                // Mode Création
                await creerAdmin(formData, token)
                setSuccess('Nouvel administrateur créé avec succès !')
            }
            
            resetForm()
            loadAdmins() // Recharger la liste
            
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (admin) => {
        setEditingId(admin.id)
        setFormData({
            email: admin.email,
            motDePasse: '', 
            nom: admin.nom,
            matricule: admin.matricule || ''
        })
        setShowForm(true)
        setError('')
        setSuccess('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (id === currentUserId) {
            alert("Vous ne pouvez pas supprimer votre propre compte !")
            return
        }
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ? Cette action est irréversible.")) return

        try {
            await deleteAdmin(id, token)
            setSuccess('Administrateur supprimé avec succès !')
            loadAdmins()
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la suppression')
        }
    }

    const resetForm = () => {
        setFormData({ email: '', motDePasse: '', nom: '', matricule: '' })
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserShield /> Gestion des Administrateurs
                </h2>
                <button
                    onClick={() => { resetForm(); setShowForm(true) }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    <FaPlus /> Nouvel administrateur
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                    <FaUserShield className="text-red-500" /> {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {success}
                </div>
            )}

            {/* Formulaire (Création ou Modification) */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4">
                        {editingId ? 'Modifier l\'administrateur' : 'Créer un nouvel administrateur'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe {editingId && <span className="text-gray-400 font-normal">(Laisser vide pour ne pas changer)</span>}
                            </label>
                            <input
                                type="password"
                                value={formData.motDePasse}
                                onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })}
                                required={!editingId} // Obligatoire seulement en création
                                minLength={6}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder={editingId ? "••••••••" : "••••••••"}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                            <input
                                type="text"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                            <input
                                type="text"
                                value={formData.matricule}
                                onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-70 flex items-center gap-2"
                            >
                                {loading ? <><FaSpinner className="animate-spin" /> Traitement...</> : (editingId ? 'Modifier' : 'Créer')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tableau des admins */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-semibold text-gray-800">Liste des administrateurs</h3>
                </div>
                
                {loadingList ? (
                    <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin text-red-600" /> Chargement...
                    </div>
                ) : admins.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <FaUserShield className="text-4xl mx-auto mb-3 text-gray-300" />
                        <p>Aucun administrateur trouvé.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nom</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Matricule</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {admins.map((admin) => {
                                    const isCurrentUser = admin.id === currentUserId;
                                    return (
                                        <tr key={admin.id} className={`hover:bg-gray-50 transition ${isCurrentUser ? 'bg-blue-50/50' : ''}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                                                        {admin.nom.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-900">{admin.nom}</span>
                                                        {isCurrentUser && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Vous</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admin.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{admin.matricule || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleEdit(admin)}
                                                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition" 
                                                        title="Modifier"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(admin.id)}
                                                        className={`p-2 rounded-lg transition ${isCurrentUser ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800 hover:bg-red-50'}`} 
                                                        title={isCurrentUser ? "Vous ne pouvez pas vous supprimer" : "Supprimer"}
                                                        disabled={isCurrentUser}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
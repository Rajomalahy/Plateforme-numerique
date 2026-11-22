import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaSpinner } from 'react-icons/fa'
import { getCompetences, createCompetence, updateCompetence, deleteCompetence } from '../../Services/Service'

export default function GestionCompetences() {
    const [competences, setCompetences] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    
    const [nom, setNom] = useState('')
    const [categorie, setCategorie] = useState('')
    
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const token = localStorage.getItem('token')

    const loadCompetences = async () => {
        setLoading(true)
        try {
            const data = await getCompetences()
            setCompetences(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadCompetences() }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        try {
            // On crée l'objet uniquement au moment d'envoyer au backend
            const dataToSend = { nom: nom, categorie: categorie }

            if (editingId) {
                await updateCompetence(editingId, dataToSend, token)
                setSuccess(' Compétence modifiée !')
            } else {
                await createCompetence(dataToSend, token)
                setSuccess(' Compétence ajoutée !')
            }
            
            // Réinitialiser les champs
            setNom('')
            setCategorie('')
            setShowForm(false)
            setEditingId(null)
            
            // Recharger la liste
            loadCompetences()
            
        } catch (err) {
            setError(err.response?.data?.message || "Erreur")
        }
    }

    const handleEdit = (comp) => {
       
        setNom(comp.nom)
        setCategorie(comp.categorie || '')
        setEditingId(comp.id)
        setShowForm(true)
        setError('')
        setSuccess('')
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cette compétence ?")) return
        try {
            await deleteCompetence(id, token)
            setSuccess(' Compétence supprimée !')
            loadCompetences()
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de la suppression")
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaBriefcase /> Gestion des Compétences
                </h2>
                <button 
                    onClick={() => { 
                        setShowForm(true)
                        setEditingId(null)
                        setNom('')
                        setCategorie('')
                        setError('')
                        setSuccess('')
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    <FaPlus /> Ajouter une compétence
                </button>
            </div>

            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
            {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

            {showForm && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4">
                        {editingId ? 'Modifier la compétence' : 'Nouvelle compétence'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la compétence *</label>
                            <input 
                                type="text" 
                                value={nom} 
                                onChange={(e) => setNom(e.target.value)} 
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: React.js, Comptabilité..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                            <input 
                                type="text" 
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Informatique, Gestion..."
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                {editingId ? 'Modifier' : 'Ajouter'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 flex items-center justify-center gap-2 text-gray-500">
                    <FaSpinner className="animate-spin text-blue-600" /> Chargement...
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 h-[450px] overflow-y-auto overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className='sticky top-0 z-10 bg-gray-200'>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Catégorie</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {competences.map(c => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">{c.nom}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                            {c.categorie || 'Non catégorisé'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 mr-3 p-2 hover:bg-blue-50 rounded-lg transition">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {competences.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Aucune compétence enregistrée.</div>
                    )}
                </div>
            )}
        </div>
    )
}
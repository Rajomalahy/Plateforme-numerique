import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaCity } from 'react-icons/fa'
import { getVilles, createVille, updateVille, deleteVille } from '../../Services/Service'

export default function Ville() {
    const [villes, setVilles] = useState([])

    const [loading, setLoading] = useState(true)

    const [showForm, setShowForm] = useState(false)

    const [editingId, setEditingId] = useState(null)

    const [formData, setFormData] = useState({ nom: '', region: '' })

    const [error, setError] = useState('')

    const token = localStorage.getItem('token')

    const loadVilles = async () => {
        try {
            const data = await getVilles()
            setVilles(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadVilles() }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (editingId) {
                await updateVille(editingId, formData, token)
                alert(" Ville modifiée !")
            } else {
                await createVille(formData, token)
                alert(" Ville ajoutée !")
            }
            setFormData({ nom: '', region: '' })
            setShowForm(false)
            setEditingId(null)
            loadVilles()
        } catch (err) {
            setError(err.response?.data?.message || "Erreur")
        }
    }

    const handleEdit = (ville) => {
        setFormData({ nom: ville.nom, region: ville.region || '' })
        setEditingId(ville.id)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cette ville ?")) return
        try {
            await deleteVille(id, token)
            loadVilles()
        } catch (err) {
            alert(err.response?.data?.message || "Erreur lors de la suppression")
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaCity /> Gestion des Villes
                </h2>
                <button 
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ nom: '', region: '' }) }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    <FaPlus /> Ajouter une ville
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="bg-white  p-6 rounded-xl border border-gray-200 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                        {editingId ? 'Modifier la ville' : 'Nouvelle ville'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la ville *</label>
                            <input 
                                type="text" 
                                value={formData.nom} 
                                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Antananarivo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                            <input 
                                type="text" 
                                value={formData.region} 
                                onChange={(e) => setFormData({...formData, region: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ex: Analamanga"
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
                <div className="text-center py-10">Chargement...</div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[450px] overflow-y-auto">
                    <table className="w-full ">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className='sticky top-0 z-10 bg-gray-200'>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Région</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 ">
                            {villes.map(v => (
                                <tr key={v.id} className="hover:bg-gray-50 ">
                                    <td className="px-6 py-4 font-medium text-gray-800">{v.nom}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{v.region || '-'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(v)} className="text-blue-600 hover:text-blue-800 mr-3">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {villes.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Aucune ville enregistrée.</div>
                    )}
                </div>
            )}
        </div>
    )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlusCircle, FaArrowLeft } from 'react-icons/fa'
import { creerOffre } from '../../Services/Service'

export default function PublierOffre() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        titre: '', description: '', typeContrat: '', ville: '', 
        salaireMin: '', salaireMax: '', dateLimite: '', competencesRequises: ''
    })

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await creerOffre(formData, localStorage.getItem('token'))
            alert("Offre publiée avec succès !")
            navigate('/dashboardentreprise/offres')
        } catch (err) {
            alert(err.response?.data?.message || "Erreur lors de la publication. Vérifiez que votre profil est complet (RG8).")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
                <FaArrowLeft /> Retour
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Publier une nouvelle offre</h2>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste *</label>
                        <input name="titre" value={formData.titre} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ex: Développeur Full Stack" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat *</label>
                        <select name="typeContrat" value={formData.typeContrat} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner...</option>
                            <option value="CDI">CDI</option><option value="CDD">CDD</option><option value="Stage">Stage</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                        <select name="ville" value={formData.ville} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner...</option>
                            <option value="Antananarivo">Antananarivo</option><option value="Fianarantsoa">Fianarantsoa</option><option value="Toamasina">Toamasina</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description du poste *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Détaillez les missions et prérequis..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Compétences requises *</label>
                        <input name="competencesRequises" value={formData.competencesRequises} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ex: React, Node.js, SQL (séparés par des virgules)" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date limite de candidature</label>
                        <input type="date" name="dateLimite" value={formData.dateLimite} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-70">
                        {loading ? 'Publication...' : <><FaPlusCircle /> Publier l'offre</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
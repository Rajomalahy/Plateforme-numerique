import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPlusCircle, FaArrowLeft, FaSpinner } from 'react-icons/fa'
import { creerOffre, updateOffre, getOffreById, getVilles, getCompetences } from '../../Services/Service'

export default function PublierOffre() {
    const navigate = useNavigate()
    const { id } = useParams() // Récupère l'ID dans l'URL (ex: /modifier/5)
    const isEditMode = !!id // Vrai si on modifie, Faux si on crée

    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(isEditMode) // Charger les données si mode édition
    const [error, setError] = useState('')
    
    const [villes, setVilles] = useState([])
    const [competences, setCompetences] = useState([])
    
    // Variables d'état simples
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [typeContrat, setTypeContrat] = useState('')
    const [villeId, setVilleId] = useState('')
    const [salaireMin, setSalaireMin] = useState('')
    const [salaireMax, setSalaireMax] = useState('')
    const [dateLimite, setDateLimite] = useState('')
    const [competencesCochees, setCompetencesCochees] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const [villesData, competencesData] = await Promise.all([getVilles(), getCompetences()])
                setVilles(villesData)
                setCompetences(competencesData)

                // Si on est en mode édition, on récupère les données de l'offre
                if (isEditMode) {
                    const offreData = await getOffreById(id, localStorage.getItem('token'))
                    setTitre(offreData.titre)
                    setDescription(offreData.description)
                    setTypeContrat(offreData.typeContrat)
                    setVilleId(offreData.villeId.toString())
                    setSalaireMin(offreData.salaireMin || '')
                    setSalaireMax(offreData.salaireMax || '')
                    setDateLimite(offreData.dateLimite || '')
                    setCompetencesCochees(offreData.competenceIds || [])
                }
            } catch (err) { 
                console.error(err)
                setError("Impossible de charger les données.")
            } finally {
                setLoadingData(false)
            }
        }
        loadData()
    }, [id, isEditMode])

    const handleCompetenceChange = (compId) => {
        if (competencesCochees.includes(compId)) {
            setCompetencesCochees(competencesCochees.filter(c => c !== compId))
        } else {
            setCompetencesCochees([...competencesCochees, compId])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        if (!villeId) { setError("Veuillez sélectionner une ville."); return }
        if (competencesCochees.length === 0) { setError("Veuillez sélectionner au moins une compétence."); return }

        setLoading(true)

        const dataToSend = {
            titre, description, typeContrat,
            villeId: parseInt(villeId),
            salaireMin: salaireMin ? parseFloat(salaireMin) : null,
            salaireMax: salaireMax ? parseFloat(salaireMax) : null,
            dateLimite: dateLimite || null,
            CompetenceIds: competencesCochees
        }

        try {
            const token = localStorage.getItem('token')
            if (isEditMode) {
                await updateOffre(id, dataToSend, token)
                alert("✅ Offre modifiée avec succès !")
            } else {
                await creerOffre(dataToSend, token)
                alert("✅ Offre publiée avec succès !")
            }
            navigate('/dashboardentreprise/offres')
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'opération.")
        } finally {
            setLoading(false)
        }
    }

    if (loadingData) return <div className="p-10 text-center"><FaSpinner className="animate-spin text-3xl text-blue-600" /></div>

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
                <FaArrowLeft /> Retour
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? 'Modifier l\'offre' : 'Publier une nouvelle offre'}
            </h2>
            
            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                {/* ... (Le reste du formulaire est EXACTEMENT le même que celui que tu avais, je le raccourcis ici pour la lisibilité, garde ton code actuel pour les inputs) ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste *</label>
                        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat *</label>
                        <select value={typeContrat} onChange={(e) => setTypeContrat(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner...</option>
                            <option value="CDI">CDI</option><option value="CDD">CDD</option><option value="Stage">Stage</option><option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                        <select value={villeId} onChange={(e) => setVilleId(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner une ville...</option>
                            {villes.map(v => <option key={v.id} value={v.id}>{v.nom} ({v.region})</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description du poste *</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="5" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salaire Min (Ar)</label>
                        <input type="number" value={salaireMin} onChange={(e) => setSalaireMin(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salaire Max (Ar)</label>
                        <input type="number" value={salaireMax} onChange={(e) => setSalaireMax(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div className="md:col-span-2 border-t border-gray-200 pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Compétences requises</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200">
                            {competences.map(c => (
                                <label key={c.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200 hover:border-blue-400 cursor-pointer transition">
                                    <input type="checkbox" checked={competencesCochees.includes(c.id)} onChange={() => handleCompetenceChange(c.id)} className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-700">{c.nom}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-70">
                        {loading ? <><FaSpinner className="animate-spin" /> Traitement...</> : (isEditMode ? 'Enregistrer les modifications' : <><FaPlusCircle /> Publier l'offre</>)}
                    </button>
                </div>
            </form>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPlusCircle, FaArrowLeft, FaSpinner, FaImage, FaUpload } from 'react-icons/fa'
import { creerOffre, updateOffre, getOffreById, getVilles, getCompetences,getLogoUrl } from '../../Services/Service'

export default function PublierOffre() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(isEditMode)
    const [error, setError] = useState('')

    const [villes, setVilles] = useState([])
    const [competences, setCompetences] = useState([])

    // Variables d'état
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [typeContrat, setTypeContrat] = useState('')
    const [villeId, setVilleId] = useState('')
    const [lieu, setLieu] = useState('')
    const [salaireMin, setSalaireMin] = useState('')
    const [salaireMax, setSalaireMax] = useState('')
    const [dateLimite, setDateLimite] = useState('')
    const [competencesCochees, setCompetencesCochees] = useState([])

    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState('')

    useEffect(() => {
        const loadData = async () => {
            try {
                const [villesData, competencesData] = await Promise.all([getVilles(), getCompetences()])
                setVilles(villesData)
                setCompetences(competencesData)

                if (isEditMode) {
                    const offreData = await getOffreById(id, localStorage.getItem('token'))
                    setTitre(offreData.titre)
                    setDescription(offreData.description)
                    setTypeContrat(offreData.typeContrat)
                    setVilleId(offreData.villeId?.toString() || '')
                    setLieu(offreData.lieu || '')
                    setSalaireMin(offreData.salaireMin || '')
                    setSalaireMax(offreData.salaireMax || '')
                    setDateLimite(offreData.dateLimite ? offreData.dateLimite.split('T')[0] : '')
                    setCompetencesCochees(offreData.competenceIds || [])


                    if (offreData.logo) {
                        setLogoPreview(getLogoUrl(offreData.logo))
                    }
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

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file)) // Aperçu immédiat
        }
    }

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

        const formData = new FormData()
        formData.append('Titre', titre)
        formData.append('Description', description)
        formData.append('TypeContrat', typeContrat)
        formData.append('VilleId', parseInt(villeId))
        if (lieu) formData.append('Lieu', lieu)
        if (salaireMin) formData.append('SalaireMin', parseFloat(salaireMin).toString())
        if (salaireMax) formData.append('SalaireMax', parseFloat(salaireMax).toString())
        if (dateLimite) formData.append('DateLimite', dateLimite)
        formData.append('Statut', 'Active')

        // Envoi des compétences (format tableau)
        competencesCochees.forEach(id => {
            formData.append('CompetenceIds', id)
        })

        // ✅ Ajout du fichier seulement s'il y en a un
        if (logoFile) {
            formData.append('LogoFile', logoFile)
        }

        try {
            const token = localStorage.getItem('token')
            if (isEditMode) {
                await updateOffre(id, formData, token) // ⚠️ Voir note sur Service.js ci-dessous
                alert("✅ Offre modifiée avec succès !")
            } else {
                await creerOffre(formData, token) // ⚠️ Voir note sur Service.js ci-dessous
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste *</label>
                        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat *</label>
                        <select value={typeContrat} onChange={(e) => setTypeContrat(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner...</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Stage">Stage</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                        <select value={villeId} onChange={(e) => setVilleId(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="">Sélectionner une ville...</option>
                            {villes.map(v => <option key={v.id} value={v.id}>{v.nom} ({v.region})</option>)}
                        </select>
                    </div>

                    {/* ✅ CORRECTION : Champ d'upload de fichier */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaImage className="inline mr-1" /> Logo de l'entreprise (Optionnel)
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 cursor-pointer transition">
                                <FaUpload className="text-gray-500" />
                                <span className="text-sm text-gray-700">Choisir un fichier</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                            {logoPreview && (
                                <img src={logoPreview} alt="Aperçu" className="h-12 w-12 object-contain rounded border border-gray-200 bg-white" />
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Formats acceptés : PNG, JPG, JPEG (Max 2 Mo)</p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Précisions sur le lieu (Optionnel)</label>
                        <input
                            type="text"
                            value={lieu}
                            onChange={(e) => setLieu(e.target.value)}
                            placeholder="Ex: Hybride, Télétravail partiel..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
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
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaPaperPlane, FaCalendarAlt, FaHeart, FaRegHeart, FaMapMarkerAlt, FaBriefcase, FaClock, FaStar, FaFilePdf } from 'react-icons/fa'
import {
    getProfil,
    getMesCandidaturesCandidat,
    getMesEntretiens,
    getMesFavorisIds,
    getRecommandations,
    basculerFavori,
    postuler,
    getLogoUrl
} from '../Services/Service'

export default function DashboardCandidat() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [profil, setProfil] = useState(null)
    const [candidatures, setCandidatures] = useState([])
    const [entretiens, setEntretiens] = useState([])
    const [favorisIds, setFavorisIds] = useState([])
    const [recommandations, setRecommandations] = useState([])
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    useEffect(() => {
        const charger = async () => {
            const token = localStorage.getItem('token')

            // On lance les 5 demandes en même temps.
            // Si une seule échoue, les autres s'affichent quand même.
            const [rProfil, rCandidatures, rEntretiens, rFavoris, rReco] = await Promise.allSettled([
                getProfil(token),
                getMesCandidaturesCandidat(token),
                getMesEntretiens(token),
                getMesFavorisIds(token),
                getRecommandations()
            ])

            if (rProfil.status === 'fulfilled') setProfil(rProfil.value)
            if (rCandidatures.status === 'fulfilled') setCandidatures(rCandidatures.value)
            if (rEntretiens.status === 'fulfilled') setEntretiens(rEntretiens.value)
            if (rFavoris.status === 'fulfilled') setFavorisIds(rFavoris.value)
            if (rReco.status === 'fulfilled') setRecommandations(rReco.value)

            setLoading(false)
        }
        charger()
    }, [])

    const handlePostuler = async (idOffre) => {
        setMessage('')
        setErreur('')
        try {
            await postuler(idOffre, localStorage.getItem('token'))
            setMessage("Candidature envoyée !")
            const data = await getMesCandidaturesCandidat(localStorage.getItem('token'))
            setCandidatures(data)
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la candidature.")
        }
    }

    const handleFavori = async (idOffre) => {
        setErreur('')
        try {
            const res = await basculerFavori(idOffre, localStorage.getItem('token'))
            setFavorisIds(prev =>
                res.estFavori ? [...prev, idOffre] : prev.filter(id => id !== idOffre)
            )
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de l'enregistrement de l'offre.")
        }
    }

    // Activités récentes = candidatures + entretiens, les plus récents d'abord
    const activites = [
        ...candidatures.map(c => ({
            id: `c-${c.id}`,
            type: 'postulation',
            texte: 'Vous avez postulé :',
            detail: c.titreOffre || c.offre?.titre || 'une offre',
            date: c.date || c.dateCandidature
        })),
        ...entretiens.map(e => ({
            id: `e-${e.id}`,
            type: 'entretien',
            texte: 'Entretien prévu :',
            detail: `${e.poste} chez ${e.entreprise}`,
            date: e.dateHeure
        }))
    ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6)

    const getCouleurPoint = (type) => {
        if (type === 'entretien') return 'border-yellow-500'
        return 'border-blue-500'
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-100 text-green-700 border-green-200'
        if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-200'
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : ''

    const nomComplet = profil ? `${profil.prenoms || ''} ${profil.nom || ''}`.trim() : ''
    const email = profil?.email || (() => {
        try { return JSON.parse(localStorage.getItem('user'))?.email } catch { return '' }
    })()
    const initiale = (profil?.prenoms || email || 'U').charAt(0).toUpperCase()
    const photo = getLogoUrl(profil?.photoProfil)
    const taux = profil?.tauxCompletion || 0

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
                <span className="ml-3 text-gray-600">Chargement de votre tableau de bord...</span>
            </div>
        )
    }

    return (
        <div className="w-full bg-[#F5F6FA]">

            {message && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{message}</div>}
            {erreur && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{erreur}</div>}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">

                {/* ===== COLONNE GAUCHE : profil ===== */}
                <div className="xl:col-span-3 space-y-4">

                    <div className="bg-white border border-gray-200 rounded-lg py-4">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                                {photo ? (
                                    <img src={photo} alt="Profil" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl md:text-3xl font-bold text-gray-400">{initiale}</span>
                                )}
                            </div>
                        </div>

                        <div className="text-center mb-6 px-2">
                            <h2 className="text-sm font-bold text-gray-800">{nomComplet || 'Profil à compléter'}</h2>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 break-all">{email}</p>
                        </div>

                        <div className="px-2 md:px-4 space-y-3">
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-gray-600">Nationalité</span>
                                <span className="font-medium text-gray-800">{profil?.nationalite || '—'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-gray-600">Niveau d'étude</span>
                                <span className="font-medium text-gray-800">{profil?.niveauEtude || '—'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-gray-600">Disponibilité</span>
                                <span className="font-medium text-green-600">{profil?.disponibilite || '—'}</span>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4 px-2 md:px-4">
                            {taux < 100 && (
                                <button
                                    onClick={() => navigate('/dashboard/profil')}
                                    className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    Compléter mes informations
                                </button>
                            )}
                            <button
                                onClick={() => navigate('/dashboard/profil')}
                                className="w-full bg-[#1e3a5f] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition"
                            >
                                Mon profil
                            </button>
                        </div>
                    </div>

                    {/* Complétion du profil */}
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-5">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Profil complété</h3>
                            <span className="text-sm font-bold text-blue-500">{taux}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all" style={{ width: `${taux}%` }}></div>
                        </div>
                    </div>

                    {/* CV */}
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-5">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Mon CV</h3>
                        {profil?.urlCv ? (
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2 text-sm text-green-600">
                                    <FaFilePdf /> CV enregistré
                                </span>
                                <button
                                    onClick={() => navigate('/dashboard/cv')}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Voir
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs text-gray-500 mb-3">Aucun CV enregistré pour le moment.</p>
                                <button
                                    onClick={() => navigate('/dashboard/profil')}
                                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    Ajouter mon CV
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== COLONNE CENTRE : compteurs + recommandations ===== */}
                <div className="xl:col-span-6 space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Candidatures envoyées</p>
                                <FaPaperPlane className="text-gray-600" />
                            </div>
                            <p className="text-2xl font-bold text-blue-500">{candidatures.length}</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Entretiens programmés</p>
                                <FaCalendarAlt className="text-gray-600" />
                            </div>
                            <p className="text-2xl font-bold text-blue-500">{entretiens.length}</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Offres sauvegardées</p>
                                <FaHeart className="text-gray-600" />
                            </div>
                            <p className="text-2xl font-bold text-blue-500">{favorisIds.length}</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-xl border border-gray-200 rounded-xl px-3 md:px-4 py-3">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-base md:text-lg font-bold text-blue-500">Offres recommandées</h2>
                            <button
                                onClick={() => navigate('/dashboard/listeOffre')}
                                className="border border-gray-300 px-4 py-1.5 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition"
                            >
                                Voir toutes les offres
                            </button>
                        </div>

                        {recommandations.length === 0 ? (
                            <div className="text-center py-10 text-sm text-gray-500">
                                Aucune recommandation pour le moment. Complétez votre profil (compétences, type de contrat, ville) pour en recevoir.
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto bg-[#F5F6FA] rounded-lg p-2">
                                {recommandations.slice(0, 5).map((offre) => (
                                    <div key={offre.idOffre} className="p-3 md:p-4 bg-white border border-gray-200 rounded-xl">

                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-sm text-gray-800 line-clamp-2">{offre.titre}</h3>
                                                <p className="text-xs text-gray-600 mt-1">{offre.entreprise}</p>
                                            </div>

                                            <button
                                                onClick={() => handleFavori(offre.idOffre)}
                                                title={favorisIds.includes(offre.idOffre) ? "Retirer des favoris" : "Enregistrer cette offre"}
                                                className="flex-shrink-0 p-1"
                                            >
                                                {favorisIds.includes(offre.idOffre)
                                                    ? <FaHeart className="text-lg text-red-500" />
                                                    : <FaRegHeart className="text-lg text-gray-400" />}
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${getScoreColor(offre.scoreMatch)}`}>
                                                <FaStar className="text-yellow-500" /> {offre.scoreMatch}% Match
                                            </span>
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaMapMarkerAlt className="text-gray-400" /> {offre.ville}
                                            </span>
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaBriefcase className="text-gray-400" /> {offre.typeContrat}
                                            </span>
                                        </div>

                                        <p className="text-xs text-blue-800 italic bg-blue-50 border border-blue-100 rounded-lg p-2 mb-3">
                                            "{offre.raison}"
                                        </p>

                                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={() => navigate(`/detailoffre/${offre.idOffre}`)}
                                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => handlePostuler(offre.idOffre)}
                                                className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-900 transition"
                                            >
                                                Postuler <FaPaperPlane className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== COLONNE DROITE : activités récentes ===== */}
                <div className="bg-white border border-gray-200 rounded-lg xl:col-span-3 px-3 md:px-4 py-4 self-start">
                    <h2 className="text-sm md:text-base font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                        <FaClock className="text-[#1e3a5f]" />
                        Activités récentes
                    </h2>

                    {activites.length === 0 ? (
                        <p className="text-xs text-gray-500">Aucune activité pour le moment. Postulez à une offre pour commencer.</p>
                    ) : (
                        <div className="space-y-4">
                            {activites.map((activite) => (
                                <div key={activite.id} className="flex items-start gap-3">
                                    <div className={`w-4 h-4 mt-1.5 rounded-full border-2 flex-shrink-0 ${getCouleurPoint(activite.type)} bg-white`}></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                            {activite.texte}
                                            <span className="font-bold text-gray-800"> {activite.detail}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(activite.date)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
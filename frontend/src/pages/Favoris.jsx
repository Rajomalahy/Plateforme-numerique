import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaBuilding, FaPaperPlane, FaHeart, FaRegHeart, FaEye } from 'react-icons/fa'
import { getMesFavoris, basculerFavori, postuler, getLogoUrl } from '../Services/Service'

export default function Favoris() {
    const navigate = useNavigate()
    const [favoris, setFavoris] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    useEffect(() => {
        const loadFavoris = async () => {
            try {
                const data = await getMesFavoris(localStorage.getItem('token'))
                setFavoris(data)
            } catch (err) {
                console.error(err)
                setErreur("Impossible de charger vos favoris.")
            } finally {
                setLoading(false)
            }
        }
        loadFavoris()
    }, [])

    // Clic sur le cœur : on retire l'offre des favoris
    const handleRetirer = async (idOffre) => {
        setMessage('')
        setErreur('')
        try {
            await basculerFavori(idOffre, localStorage.getItem('token'))
            setFavoris(prev => prev.filter(o => o.id !== idOffre))
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors du retrait du favori.")
        }
    }

    const handlePostuler = async (idOffre) => {
        setMessage('')
        setErreur('')
        try {
            await postuler(idOffre, localStorage.getItem('token'))
            setMessage("Candidature envoyée pour l'offre !")
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la candidature.")
        }
    }

    const estOuverte = (statut) => statut === 'Active' || statut === 'Publiée'

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Mes offres favorites</h2>
            <p className="text-gray-500 text-center mb-6 text-sm">
                Retrouvez ici les offres que vous avez enregistrées pour y revenir plus tard.
            </p>

            {message && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">{message}</div>}
            {erreur && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{erreur}</div>}

            {loading ? (
                <div className="text-center py-10 text-gray-500">Chargement de vos favoris...</div>
            ) : favoris.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaRegHeart className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun favori pour le moment</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Cliquez sur le cœur d'une offre pour l'enregistrer ici.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/listeOffre')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
                    >
                        Parcourir les offres
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoris.map(offre => (
                        <div key={offre.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col gap-4">

                            <div className="flex items-start gap-3">
                                {getLogoUrl(offre.logo) ? (
                                    <>
                                        <img
                                            src={getLogoUrl(offre.logo)}
                                            alt="Logo entreprise"
                                            className="w-12 h-12 object-contain rounded bg-gray-50 border border-gray-200 flex-shrink-0"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.nextSibling.style.display = 'flex'
                                            }}
                                        />
                                        <div
                                            style={{ display: 'none' }}
                                            className="w-12 h-12 items-center justify-center rounded bg-gray-100 text-gray-400 border border-gray-200 flex-shrink-0"
                                        >
                                            <FaBuilding className="text-xl" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center rounded bg-gray-100 text-gray-400 border border-gray-200 flex-shrink-0">
                                        <FaBuilding className="text-xl" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-800 truncate" title={offre.titre}>{offre.titre}</h3>
                                    <p className="text-sm text-gray-500 truncate">{offre.entreprise}</p>
                                </div>

                                <button
                                    onClick={() => handleRetirer(offre.id)}
                                    title="Retirer des favoris"
                                    className="p-2 rounded-lg hover:bg-red-50 transition"
                                >
                                    <FaHeart className="text-xl text-red-500" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {offre.ville}</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{offre.typeContrat}</span>
                                {!estOuverte(offre.statut) && (
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">Clôturée</span>
                                )}
                            </div>

                            <p className="text-gray-500 text-sm line-clamp-2">{offre.description}</p>

                            <div className="flex items-center justify-between gap-2 mt-auto">
                                <span className="text-xs text-gray-400">
                                    Enregistrée le {new Date(offre.dateAjout).toLocaleDateString('fr-FR')}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/detailoffre/${offre.id}`)}
                                        className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition"
                                    >
                                        <FaEye /> Voir
                                    </button>
                                    <button
                                        onClick={() => handlePostuler(offre.id)}
                                        disabled={!estOuverte(offre.statut)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaPaperPlane /> Postuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
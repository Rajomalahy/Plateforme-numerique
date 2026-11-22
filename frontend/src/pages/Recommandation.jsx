import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaBriefcase, FaMapMarkerAlt, FaRegHeart, FaHeart } from 'react-icons/fa';
import { getRecommandations } from '../Services/Service'; // Ajustez le chemin si nécessaire

export default function Recommandation() {
    const navigate = useNavigate();
    const [recommandations, setRecommandations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommandations = async () => {
            try {
                setLoading(true);
                const data = await getRecommandations();
                setRecommandations(data);
            } catch (err) {
                console.error("Erreur recommandations:", err);
                setError(err.message || "Impossible de charger les recommandations.")
            } finally {
                setLoading(false)
            }
        }

        fetchRecommandations()
    }, [])

    // Fonction pour déterminer la couleur du badge de score
    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
        if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-200';
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
                <span className="ml-3 text-gray-600">Analyse de votre profil en cours...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-[#F5F6FA] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1e3a5f] flex items-center gap-2">
                        <FaStar className="text-yellow-500" /> Offres recommandées pour vous
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        Ces offres correspondent à votre profil, vos compétences et vos préférences.
                    </p>
                </div>

                {/* État vide : Aucune recommandation */}
                {recommandations.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBriefcase className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune recommandation pour le moment</h3>
                        <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                            Aucune offre active ne correspond actuellement à vos critères (Ville, Type de contrat ou Compétences). 
                            Complétez votre profil pour améliorer vos matchs !
                        </p>
                        <button 
                            onClick={() => navigate('/dashboard/profil')}
                            className="bg-[#1e3a5f] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition"
                        >
                            Mettre à jour mon profil
                        </button>
                    </div>
                ) : (
                    /* Liste des recommandations */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommandations.map((offre) => (
                            <div key={offre.idOffre} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                
                                {/* En-tête de la carte avec Score */}
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getScoreColor(offre.scoreMatch)}`}>
                                        <FaStar className="text-yellow-500" /> {offre.scoreMatch}% Match
                                    </span>
                                    <button className="text-gray-400 hover:text-red-500 transition">
                                        <FaRegHeart className="text-xl" />
                                    </button>
                                </div>

                                {/* Titre et Entreprise */}
                                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">{offre.titre}</h3>
                                <p className="text-sm text-gray-600 mb-4">{offre.entreprise}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                        <FaMapMarkerAlt className="text-gray-400" /> {offre.ville}
                                    </span>
                                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                        <FaBriefcase className="text-gray-400" /> {offre.typeContrat}
                                    </span>
                                </div>

                                {/* Raison du match */}
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex-grow">
                                    <p className="text-xs text-blue-800 italic">
                                        "{offre.raison}"
                                    </p>
                                </div>

                                {/* Bouton d'action */}
                                <button 
                                    onClick={() => navigate(`/detailoffre/${offre.idOffre}`)}
                                    className="w-full bg-[#1e3a5f] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition flex items-center justify-center gap-2"
                                >
                                    Voir l'offre et postuler
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
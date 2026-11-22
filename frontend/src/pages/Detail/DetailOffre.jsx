import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
    FaHome, FaMapMarkerAlt, FaCalendarAlt, 
    FaFileAlt, FaBuilding, FaPaperPlane, FaShareAlt,
    FaArrowLeft, FaBuilding as FaBuildingIcon
} from 'react-icons/fa'
import { getOffreDetailPublique, postuler } from '../../Services/Service'

export default function DetailOffre() {

    const { id } = useParams() 
    const navigate = useNavigate()

    const [offre, setOffre] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOffre = async () => {
            try {
                setLoading(true)
                const data = await getOffreDetailPublique(id)
                setOffre(data)
            } catch (err) {
                setError("Impossible de charger les détails de cette offre.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchOffre()
        }
    }, [id])

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
                <p className="text-gray-500 text-lg">Chargement de l'offre en cours...</p>
            </div>
        )
    }

    // Affichage en cas d'erreur
    if (error || !offre) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">{error || "Offre introuvable."}</p>
                    <Link to="/offre" className="text-[#3730A3] hover:underline font-medium">
                        ← Retour à la liste des offres
                    </Link>
                </div>
            </div>
        )
    }

      
    const handlePostuler = async () => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        
       
        if (!token || role !== 'Demandeur') {
        
            alert("Vous devez être connecté en tant que candidat pour postuler à une offre.")
            navigate('/signin')
            return 
        }

        try {
            
            await postuler(id, token) 
            
       
            alert(" Votre candidature a été envoyée avec succès !")
            navigate('/dashboard/candidature') 
            
        } catch (error) {

            alert(error.message || "Une erreur est survenue lors de l'envoi de votre candidature.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            
            {/* BREADCRUMB */}
            <div className="bg-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link to="/" className="hover:text-gray-900 transition flex items-center gap-1">
                            <FaHome className="text-gray-500" /> Accueil
                        </Link>
                        <span className="text-gray-400">›</span>
                        <Link to="/offre" className="hover:text-gray-900 transition">
                            Offres d'emploi
                        </Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-900 font-medium text-xs truncate max-w-[200px]">
                            {offre.titre}
                        </span>
                    </nav>
                </div>
            </div>

            {/* HEADER avec gradient */}
            <div className="bg-[#082A49] py-12 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/offre"
                        className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition"
                    >
                        <FaArrowLeft className="text-gray-700" />
                    </Link>
                </div>
            </div>

            {/* CONTENU PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 pb-10">
                
                {/* CARTE PRINCIPALE */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                        
                        {/* Logo entreprise */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                            {offre.entrepriseLogo ? (
                                <img 
                                    src={offre.entrepriseLogo} 
                                    alt={offre.entrepriseNom}
                                    className="w-12 h-12 object-contain"
                                />
                            ) : (
                                <FaBuildingIcon className="text-2xl text-gray-400" />
                            )}
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                {offre.titre}
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base font-medium">
                                {offre.entrepriseNom}
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button 
                                onClick={handlePostuler}
                                className="flex-1 md:flex-none bg-[#3730A3] hover:bg-[#2e2885] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-md text-sm"
                            >
                                <FaPaperPlane />
                                <span>Postuler maintenant</span>
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2.5 rounded-lg transition">
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs md:text-sm">
                            <FaMapMarkerAlt className="text-[#3730A3]" />
                            {offre.ville}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs md:text-sm">
                            <FaCalendarAlt className="text-[#3730A3]" />
                            Publié le {new Date(offre.datePublication).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs md:text-sm">
                            <FaFileAlt className="text-[#3730A3]" />
                            {offre.typeContrat}
                        </span>
                        {offre.secteur && (
                            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs md:text-sm">
                                <FaBuilding className="text-[#3730A3]" />
                                {offre.secteur}
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Description du poste
                            </h2>
                            
                            <div className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
                                {offre.description || "Aucune description n'est disponible pour cette offre."}
                            </div>

                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                                <h3 className="font-bold text-gray-900 mb-4">Résumé de l'offre</h3>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">Type de contrat</span>
                                        <span className="font-medium text-gray-900">{offre.typeContrat}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">Localisation</span>
                                        <span className="font-medium text-gray-900">{offre.ville}</span>
                                    </li>
                                    {offre.salaireMin && offre.salaireMax && (
                                        <li className="flex justify-between border-b border-gray-200 pb-2">
                                            <span className="text-gray-500">Salaire</span>
                                            <span className="font-medium text-gray-900">
                                                {offre.salaireMin} - {offre.salaireMax} Ar
                                            </span>
                                        </li>
                                    )}
                                    <li className="flex justify-between pt-2">
                                        <span className="text-gray-500">Date limite</span>
                                        <span className="font-medium text-red-600">
                                            {offre.dateLimite ? new Date(offre.dateLimite).toLocaleDateString('fr-FR') : "Non spécifiée"}
                                        </span>
                                    </li>
                                </ul>

                                <button 
                                    onClick={handlePostuler}
                                    className="w-full mt-6 bg-[#3730A3] hover:bg-[#2e2885] text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-md"
                                >
                                    <FaPaperPlane />
                                    Postuler maintenant
                                </button>
                            </div>
                        </div>

                    </div>
                </div>               

            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
    FaHome, FaBuilding, FaMapMarkerAlt, FaUsers, 
    FaShareAlt, FaArrowLeft, FaEnvelope, FaPhone,
    FaBriefcase, FaClock 
} from 'react-icons/fa'

import { getEntrepriseById, getOffresByEntreprise } from '../../Services/Service' 

export default function DetailEntreprise() {

    const { id } = useParams() 
    
    const [entreprise, setEntreprise] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [activeTab, setActiveTab] = useState('presentation')
    const [offres, setOffres] = useState([])
    const [loadingOffres, setLoadingOffres] = useState(false)

    useEffect(() => {
        const fetchEntreprise = async () => {
            try {
                setLoading(true)
                const data = await getEntrepriseById(id)
                setEntreprise(data)
            } catch (err) {
                setError("Impossible de charger les détails de cette entreprise.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchEntreprise()
        }
    }, [id])

  
    const chargerOffresEntreprise = async () => {
        if (offres.length > 0) return
        try {
            setLoadingOffres(true)
            const data = await getOffresByEntreprise(id)
            setOffres(data)
        } catch (err) {
            console.error("Erreur lors du chargement des offres:", err)
        } finally {
            setLoadingOffres(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
                <p className="text-gray-500 text-lg">Chargement des informations...</p>
            </div>
        )
    }

    if (error || !entreprise) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">{error || "Entreprise introuvable."}</p>
                    <Link to="/entreprise" className="text-[#3730A3] hover:underline font-medium">
                        ← Retour à la liste des entreprises
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            
            <div className="bg-gray-100 px-4 py-3">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link to="/" className="hover:text-gray-900 transition flex items-center gap-1">
                            <FaHome className="text-gray-500" /> Accueil
                        </Link>
                        <span className="text-gray-400">›</span>
                        <Link to="/entreprise" className="hover:text-gray-900 transition">
                            Entreprises
                        </Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-900 font-medium truncate">
                            {entreprise.nomSociete}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="bg-[#082A49] py-12 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/entreprise"
                        className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition"
                    >
                        <FaArrowLeft className="text-gray-700" />
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 pb-10">
                
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                        
                        <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100 shadow-sm">
                            {entreprise.urlLogo ? (
                                <img 
                                    src={entreprise.urlLogo} 
                                    alt={entreprise.nomSociete}
                                    className="w-20 h-20 object-contain"
                                />
                            ) : (
                                <FaBuilding className="text-4xl text-gray-400" />
                            )}
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                {entreprise.nomSociete}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                                    <FaBuilding className="text-[#3730A3]" />
                                    {entreprise.secteurActivite || "Secteur non précisé"}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                                    <FaMapMarkerAlt className="text-[#3730A3]" />
                                    {entreprise.adresse || "Adresse non précisée"}
                                </span>
                            </div>

                            {entreprise.telephoneRH && (
                                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <FaPhone className="text-gray-400" />
                                    {entreprise.telephoneRH}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto lg:mt-0 mt-4">
                            <Link to="/offre" className="flex-1 sm:flex-none bg-[#3730A3] hover:bg-[#2e2885] text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-md text-sm font-semibold">
                                <FaEnvelope />
                                Voir toutes les offres
                            </Link>
                            <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm font-semibold">
                                <FaShareAlt />
                                Partager
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 overflow-hidden">
                    
                    <div className="flex border-b border-gray-200">
                        <button 
                            onClick={() => setActiveTab('presentation')}
                            className={`flex-1 py-4 px-6 text-sm font-semibold transition ${
                                activeTab === 'presentation' 
                                ? 'text-gray-900 border-b-2 border-[#3730A3] bg-gray-50' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Présentation
                        </button>
                        <button 
                            onClick={() => {
                                setActiveTab('offres')
                                chargerOffresEntreprise() 
                            }}
                            className={`flex-1 py-4 px-6 text-sm font-medium transition flex items-center justify-center gap-2 ${
                                activeTab === 'offres' 
                                ? 'text-gray-900 border-b-2 border-[#3730A3] bg-gray-50' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Offres d'emploi
                            <span className="bg-[#3730A3] text-white px-2 py-0.5 rounded-full text-xs">
                                {entreprise.nbPostesDisponibles || 0}
                            </span>
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        
                        {activeTab === 'presentation' ? (
                            /* === CONTENU : PRÉSENTATION === */
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Qui sommes-nous ?
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <div className="border border-gray-200 rounded-xl p-4 shadow-sm transition hover:shadow-md">
                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                <FaUsers className="text-[#3730A3]" />
                                                <span className="text-sm font-medium">Effectif</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">
                                                {entreprise.nbEmployes || "Non précisé"}
                                            </p>
                                        </div>

                                        <div className="border border-gray-200 rounded-xl p-4 shadow-sm transition hover:shadow-md">
                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                <FaMapMarkerAlt className="text-[#3730A3]" />
                                                <span className="text-sm font-medium">Siège social</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">
                                                {entreprise.adresse || "Non précisé"}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        Description de l'entreprise
                                    </h3>
                                    
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {entreprise.description || "Aucune description n'a été fournie par cette entreprise pour le moment."}
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                                        <h3 className="font-bold text-gray-900 mb-4">Informations clés</h3>
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">Secteur</span>
                                                <span className="font-medium text-gray-900 text-right">{entreprise.secteurActivite || "-"}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">Localisation</span>
                                                <span className="font-medium text-gray-900 text-right">{entreprise.adresse || "-"}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">Offres actives</span>
                                                <span className="font-medium text-[#3730A3] text-right">{entreprise.nbPostesDisponibles || 0}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Offres d'emploi chez {entreprise.nomSociete}
                                </h2>

                                {loadingOffres ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">Chargement des offres en cours...</p>
                                    </div>
                                ) : offres.length === 0 ? (
                                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                                        <FaBriefcase className="text-4xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-medium">Cette entreprise n'a pas d'offres actives pour le moment.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {offres.map((offre) => (
                                            <Link 
                                                to={`/detailoffre/${offre.id}`} 
                                                key={offre.id} 
                                                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#3730A3] transition group bg-white"
                                            >
                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#3730A3] transition mb-3">
                                                    {offre.titre}
                                                </h3>
                                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
                                                        <FaMapMarkerAlt className="text-gray-400" /> {offre.ville}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
                                                        <FaBriefcase className="text-gray-400" /> {offre.typeContrat}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 border-t border-gray-100 pt-3">
                                                    <FaClock className="text-gray-400" />
                                                    Publié le {new Date(offre.datePublication).toLocaleDateString('fr-FR')}
                                                    {offre.dateLimite && (
                                                        <span className="ml-auto text-[#3730A3] font-medium">
                                                            Limite : {new Date(offre.dateLimite).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
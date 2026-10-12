import { Link } from 'react-router-dom'
import un from '../../assets/un.jpg'
import { 
    FaHome, 
    FaBuilding, 
    FaMapMarkerAlt, 
    FaCalendarAlt, 
    FaGlobe, 
    FaUsers, 
    FaShareAlt, 
    FaArrowLeft,
    FaEnvelope
} from 'react-icons/fa'

export default function DetailEntreprise() {

    const entreprise = {
        nom: 'Decathlon Maroc',
        logo: un,
        secteur: 'Détaillants Spécialisés',
        ville: 'Casablanca',
        fondation: 'Fondée en 2015',
        siteWeb: 'www.decathlon.ma',
        collaborateurs: '1001-5000',
        siege: 'Casablanca',
        description: `Decathlon Maroc est la filiale marocaine du géant français de la distribution d'articles et de matériels de sport. Bien que présente industriellement dans le Royaume depuis 1994 à travers des activités de sous-traitance textile, l'enseigne a véritablement lancé son réseau de distribution physique en 2015 avec l'ouverture de son premier magasin à Casablanca.

Depuis lors, Decathlon Maroc n'a cessé de croître, multipliant les points de vente à travers le Royaume et développant une offre sportive complète adaptée aux besoins des consommateurs marocains. L'entreprise s'engage à rendre le sport accessible à tous, en proposant des produits de qualité à des prix compétitifs.

Avec une équipe passionnée et dynamique, Decathlon Maroc accompagne les sportifs de tous niveaux, du débutant au confirmé, dans leur pratique sportive au quotidien.`,
        labels: [
            {
                nom: 'Feel Good',
                annee: '2024',
                logo: '/feel-good-logo.png'
            }
        ],
        nombreOffres: 8
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            
            {/* BREADCRUMB */}
            <div className="bg-gray-100 px-4 py-3">

                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link to="/" className="hover:text-gray-900 transition">
                            <FaHome className="text-gray-500" />
                        </Link>
                        <span className="text-gray-400">›</span>
                        <Link to="/entreprise" className="hover:text-gray-900 transition">
                            Entreprises qui recrutent
                        </Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-900 font-medium truncate">
                            {entreprise.nom} Stage Emploi
                        </span>
                    </nav>
                </div>

            </div>

            {/* HEADER avec gradient */}
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

            {/* CONTENU PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                
                {/* CARTE PRINCIPALE ENTREPRISE */}
                <div className="bg-white rounded-xl shadow-lg p-2 md:p-8 mb-6">
                    
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-4">
                        
                        {/* Logo entreprise */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                            <img 
                                src={entreprise.logo} 
                                alt={entreprise.nom}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                            />
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-900 mb-2">
                                {entreprise.nom}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                    <FaBuilding className="text-gray-400" />
                                    {entreprise.secteur}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    {entreprise.ville}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-gray-400" />
                                    {entreprise.fondation}
                                </span>
                            </div>

                            <div className="mt-2">
                                <a 
                                    href="#" 
                                    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition"
                                >
                                    <FaGlobe className="text-gray-400" />
                                    {entreprise.siteWeb}
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Boutons d'action */}
                        <div className="flex justify-end gap-2 lg:ml-auto lg:mt-0 mt-4">
                            <button className="flex-1 lg:flex-none bg-[#D4AF37] text-white px-3 py-2 rounded-lg  flex items-center justify-center gap-2 transition shadow-md text-sm">
                                <FaEnvelope />
                                Candidature spontanée
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2.5 rounded-lg transition flex items-center gap-2 text-sm">
                                <FaShareAlt />
                                Partager
                            </button>
                        </div>

                </div>

                {/* TABS */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button className="flex-1 py-4 px-6 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 bg-gray-50 transition">
                            Présentation
                        </button>
                        <button className="flex-1 py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-2">
                            Offres d'emploi
                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                                {entreprise.nombreOffres}
                            </span>
                        </button>
                    </div>

                    {/* CONTENU DES TABS */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* CONTENU PRINCIPAL (2/3) */}
                            <div className="lg:col-span-2">
                                
                                {/* Qui sommes-nous */}
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    Qui sommes-nous ?
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {/* Collaborateurs */}
                                    <div className="border border-gray-200 rounded-xl p-4 shadow-md transition">
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <FaUsers className="text-[#3B82F6]" />
                                            <span className="text-sm">Collaborateurs</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {entreprise.collaborateurs}
                                        </p>
                                    </div>

                                    {/* Siège social */}
                                    <div className="border border-gray-200 rounded-xl p-4 shadow-md transition">
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <FaBuilding className="text-[#3B82F6]" />
                                            <span className="text-sm">Siège social</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {entreprise.siege}
                                        </p>
                                    </div>
                                </div>

                                {/* Présentation */}
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    Présentation
                                </h3>
                                
                                <div className="text-gray-700 leading-relaxed mb-3">
                                    <p className="line-clamp-4">
                                        {entreprise.description}
                                    </p>
                                </div>
                                
                                <button className="text-[#3B82F6] text-sm font-medium mb-8 transition">
                                    Voir plus
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
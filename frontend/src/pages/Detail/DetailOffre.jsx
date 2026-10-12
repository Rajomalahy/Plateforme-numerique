import { Link } from 'react-router-dom'
import un from '../../assets/un.jpg'
import { 
    FaHome, 
    FaBriefcase, 
    FaMapMarkerAlt, 
    FaCalendarAlt, 
    FaFileAlt, 
    FaUsers, 
    FaBuilding, 
    FaPaperPlane, 
    FaShareAlt,
    FaArrowLeft,
    FaBullseye,
    FaBoxOpen
} from 'react-icons/fa'

export default function DetailOffre() {

    // Données de l'offre (à remplacer par un appel API)
    const offre = {
        titre: 'Stage Pré-embauche – UGC Creator / Content Creator (Fès)',
        entreprise: 'Ri Digital Communication',
        logo: un,
        lieu: 'Fès',
        date: 'Il y a 10 heures',
        type: 'Stage',
        contrat: 'Stage Pré-embauche',
        presence: 'Sur site',
        secteur: 'Services aux entreprises',
        description: `Ri Communication Digitale recrute un stagiaire UGC Creator / Content Creator à Fès. Si vous êtes à l'aise face caméra, passionné par les réseaux sociaux (TikTok, Reels, Instagram) et créatif, cette opportunité est pour vous.

Vous participerez activement à la création de contenus, au montage vidéo et à la stratégie de communication digitale pour nos clients. Stage pré-embauche avec un réel accompagnement et une montée en compétences. Postulez dès maintenant sur Stagiaires.ma pour rejoindre une équipe dynamique et booster votre carrière dans le marketing digital.

Tu es à l'aise face à la caméra, tu comprends les codes de TikTok, Instagram et Reels, et tu as envie de transformer des idées en contenus percutants ? Cette opportunité est pour toi !`,
        missions: [
            'Créer des contenus UGC pour nos clients et leurs marques.',
            'Concevoir et tourner des vidéos courtes (Reels, TikTok, Stories).',
            'Participer à la recherche d\'idées, de concepts et de tendances.',
            'Écrire ou adapter des scripts simples et naturels.',
            'Présenter des produits, services ou concepts face caméra.',
            'Participer aux shootings et productions de contenus.',
            'Collaborer avec l\'équipe créative, social media et marketing.'
        ],
        ceQueNousProposons: [
            'Un stage pré-embauche au sein de Ri Communication Digitale.',
            'Participation à de vrais projets clients.',
            'Une expérience concrète dans l\'univers du digital et de la création de contenu.',
            'Accompagnement et montée en compétences.',
            'Possibilité d\'intégrer l\'équipe à l\'issue du stage selon les résultats et les besoins.',
            'Lieu : Fès.'
        ],
        profil: [
            'Formation en marketing digital, communication, audiovisuel ou domaine similaire.',
            'Excellente expression orale et écrite en français.',
            'Créativité, sens de l\'esthétique et curiosité pour les tendances digitales.',
            'Maîtrise des outils de montage vidéo (CapCut, Premiere Pro, etc.).',
            'Sens du storytelling et capacité à proposer des idées innovantes.'
        ]
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            
            <div className="bg-gray-100 py-3">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-gray-900 transition">
                            <FaHome className="text-gray-500" />
                        </Link>

                        <span className="text-gray-400">›</span>

                        <Link to="/offres" className="hover:text-gray-900 text-xs transition">
                            Offres d'emploi
                        </Link>
                        <span className="text-gray-400 font-bold">›</span>

                        <span className="text-gray-900 font-medium text-xs truncate">
                            {offre.titre}
                        </span>
                    </nav>
                </div>
            </div>

            {/* HEADER avec gradient */}
            <div className="bg-[#082A49] py-12 px-4 mt-2 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Bouton retour */}
                    <Link 
                        to="/offre"
                        className="absolute top-4 left-4 bg-white p-2 rounded-lg text-xs shadow-md hover:bg-gray-50 transition"
                    >
                        <FaArrowLeft className="text-gray-700" />
                    </Link>
                </div>
            </div>

            {/* CONTENU PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                
                {/* CARTE PRINCIPALE */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
                    
                    {/* Header de l'offre */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                        
                        {/* Logo entreprise */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img 
                                src={offre.logo} 
                                alt={offre.entreprise}
                                className="w-12 h-12 object-contain"
                            />
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                            <h1 className="text-sm md:text-2xl font-bold text-gray-900 mb-2">
                                {offre.titre}
                            </h1>
                            <p className="text-gray-600 text-xs md:text-base">
                                {offre.entreprise}
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex gap-2">
                            <button className="flex-1 md:flex-none bg-[#D4AF37] text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-md">
                                <FaPaperPlane />
                                <span className="text-sm">Postuler maintenant</span>
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg transition">
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>

                    {/* Tags/Badges */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaMapMarkerAlt className="text-gray-500" />
                            {offre.lieu}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaCalendarAlt className="text-gray-500" />
                            {offre.date}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaFileAlt className="text-gray-500" />
                            {offre.type}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaBriefcase className="text-gray-500" />
                            {offre.contrat}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaUsers className="text-gray-500" />
                            {offre.presence}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs">
                            <FaBuilding className="text-gray-500" />
                            {offre.secteur}
                        </span>
                    </div>

                </div>

                {/* DESCRIPTION DU POSTE */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Contenu principal (2/3) */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Description du poste
                            </h2>
                            
                            <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                                {offre.description}
                            </div>

                            {/* Missions */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaBullseye className="text-red-500" />
                                Tes missions
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2">
                                {offre.missions.map((mission, index) => (
                                    <li key={index} className="leading-relaxed">
                                        {mission}
                                    </li>
                                ))}
                            </ul>

                            {/* Ce que nous proposons */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaBoxOpen className="text-orange-500" />
                                Ce que nous proposons
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2">
                                {offre.ceQueNousProposons.map((item, index) => (
                                    <li key={index} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Profil recherché */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaUsers className="text-blue-500" />
                                Profil recherché
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                                {offre.profil.map((item, index) => (
                                    <li key={index} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>

                    {/* BOUTON POSTULER (en bas sur mobile) */}
                    <div className="bg-white rounded-xl p-4 ">
                        <div className="flex justify-end gap-2">
                            <button className=" bg-[#3B82F6] text-white px-4 py-3 text-sm rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-md">
                                <FaPaperPlane />
                                Postuler maintenant
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg transition">
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>

                </div>               

            </div>

        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import { FaGlobe, FaShieldAlt, FaHeart, FaUsers, FaBriefcase, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa'

export default function APropos() {
    const navigate = useNavigate()

    const stats = [
        { valeur: '500+', label: 'Offres publiées', icon: <FaBriefcase />, couleur: 'text-indigo-600 bg-indigo-50' },
        { valeur: '120+', label: 'Entreprises partenaires', icon: <FaBuilding />, couleur: 'text-cyan-600 bg-cyan-50' },
        { valeur: '2 500+', label: 'Candidats inscrits', icon: <FaUsers />, couleur: 'text-rose-600 bg-rose-50' },
        { valeur: '22', label: 'Villes couvertes', icon: <FaMapMarkerAlt />, couleur: 'text-amber-600 bg-amber-50' }
    ]

    const valeurs = [
        { 
            titre: 'Accessibilité', 
            desc: 'Une plateforme claire, rapide et utilisable par tous, partout à Madagascar.',
            icon: <FaGlobe className="text-2xl text-indigo-600" />,
            bg: 'bg-indigo-50'
        },
        { 
            titre: 'Transparence', 
            desc: 'Des offres vérifiées et des informations claires, pour postuler en toute confiance.',
            icon: <FaShieldAlt className="text-2xl text-cyan-600" />,
            bg: 'bg-cyan-50'
        },
        { 
            titre: 'Accompagnement', 
            desc: 'Des conseils et des ressources pour préparer vos candidatures et vos entretiens.',
            icon: <FaHeart className="text-2xl text-rose-600" />,
            bg: 'bg-rose-50'
        }
    ]

    const equipe = [
        { initiales: 'NR', nom: 'Nancy RAJOMALAY', fonction: 'Fondatrice & Développeuse', couleur: 'bg-indigo-100 text-indigo-700' },
        { initiales: 'AR', nom: 'Andry RAKOTO', fonction: 'Directeur Technique', couleur: 'bg-cyan-100 text-cyan-700' },
        { initiales: 'FH', nom: 'Fara HANTA', fonction: 'Responsable RH', couleur: 'bg-rose-100 text-rose-700' },
        { initiales: 'TN', nom: 'Tiana NIRINA', fonction: 'Chargée de Communication', couleur: 'bg-amber-100 text-amber-700' }
    ]

    return (
        <div className="min-h-screen mt-10 bg-gray-50">
            
            <section className="bg-gradient-to-br from-[#3730A3] via-[#3F3FB8] to-[#0369A1] text-white pt-20 pb-32 text-center relative">
                <div className="container mx-auto px-6">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
                        À propos de nous
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto">
                        Nous connectons les talents aux opportunités
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        La première plateforme malgache qui rassemble offres d'emploi, entreprises et candidats au même endroit, pour que chacun gagne du temps.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 -mt-20 relative z-10 mb-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:scale-105 transition transform">
                            <div className={`w-14 h-14 ${stat.couleur} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                {stat.icon}
                            </div>
                            <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">{stat.valeur}</p>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-6 py-16 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    
                    <div>
                        <span className="text-[#3730A3] font-bold text-sm uppercase tracking-wide mb-2 block">Notre mission</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Rendre la recherche d'emploi simple et accessible à tous
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Trouver un stage ou un premier emploi ne devrait pas être un parcours du combattant. Notre plateforme rassemble les offres, les entreprises et les candidats au même endroit, pour que chacun gagne du temps.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Créée à Madagascar, pour Madagascar, notre solution s'adresse particulièrement aux jeunes diplômés et aux professionnels en reconversion qui cherchent des opportunités vérifiées et adaptées à leur profil.
                        </p>
                        <button 
                            onClick={() => navigate('/offre')}
                            className="bg-[#3730A3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2e2885] transition shadow-md"
                        >
                            Découvrir les offres
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl h-80 md:h-96 flex flex-col items-center justify-center border-2 border-dashed border-blue-200">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Notre équipe" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 mb-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-[#3730A3] font-bold text-sm uppercase tracking-wide mb-2 block">Nos valeurs</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Ce qui nous guide chaque jour</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {valeurs.map((valeur, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition group border border-gray-100">
                                <div className={`w-14 h-14 ${valeur.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                                    {valeur.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{valeur.titre}</h3>
                                <p className="text-gray-600 leading-relaxed">{valeur.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16 mb-16">
                <div className="text-center mb-12">
                    <span className="text-[#3730A3] font-bold text-sm uppercase tracking-wide mb-2 block">L'équipe</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Les personnes derrière la plateforme</h2>
                </div>

                <div className="max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {equipe.slice(0, 3).map((membre, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                                <div className={`w-20 h-20 ${membre.couleur} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                                    {membre.initiales}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{membre.nom}</h3>
                                <p className="text-sm text-gray-500">{membre.fonction}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-start-2">
                            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                                <div className={`w-20 h-20 ${equipe[3].couleur} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                                    {equipe[3].initiales}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{equipe[3].nom}</h3>
                                <p className="text-sm text-gray-500">{equipe[3].fonction}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 pb-20">
                <div className="bg-gradient-to-r from-[#3730A3] to-[#0369A1] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Une question ? Parlons-en</h2>
                        <p className="text-blue-100">Notre équipe vous répond avec plaisir.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/contact')}
                        className="bg-white text-[#3730A3] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex-shrink-0"
                    >
                        Nous contacter
                    </button>
                </div>
            </section>

        </div>
    )
}
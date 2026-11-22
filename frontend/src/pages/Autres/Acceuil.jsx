import Search from "./search"
import Entreprise from "./Entreprise"
import Offre from "./Offre"
import { Link } from 'react-router-dom'
import { FaGlobe, FaShieldAlt, FaHeart, FaUsers} from 'react-icons/fa'
import { FaCode, FaChartLine, FaBullhorn, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import imagePropos from '../../assets/imagePropos.avif'
import { useState } from 'react'

export default function Acceuil() {

    const [openFaq, setOpenFaq] = useState(null)

    const navigate = useNavigate()

    const domaines = [
        { icon: <FaCode />, titre: 'Informatique', couleur: 'bg-indigo-100 text-indigo-600' },
        { icon: <FaChartLine />, titre: 'Finance et comptabilité', couleur: 'bg-cyan-100 text-cyan-600' },
        { icon: <FaBullhorn />, titre: 'Marketing et communication', couleur: 'bg-pink-100 text-pink-600' },
        { icon: <FaUsers />, titre: 'Ressources humaines', couleur: 'bg-amber-100 text-amber-600' }
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

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    const faqs = [
        { question: "Comment publier une offre ?", reponse: "Connectez-vous à votre espace Entreprise, cliquez sur 'Publier une offre' et remplissez le formulaire. Votre offre sera soumise à la modération de l'administrateur avant publication." },
        { question: "Comment suivre mes candidatures ?", reponse: "Rendez-vous dans votre espace Candidat, rubrique 'Mes candidatures'. Vous y verrez le statut en temps réel de chaque envoi (En attente, En entretien, Accepté, Refusé)." },
        { question: "Sous quel délai vous répondez-vous ?", reponse: "Notre équipe s'efforce de répondre à toutes les demandes de support sous 24 à 48 heures ouvrables." }
    ]

    return (
        <div className="bg-[#F7F8FC]">

            <div className="mt-10">
                <Search />
            </div>

            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Explorez par domaine</h2>
                    <p className="text-gray-600 mb-10">Choisissez le secteur qui vous intéresse.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {domaines.map((domaine, index) => (
                            <div key={index} className="bg-white flex gap-8 rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer group">
                                <div className={`w-12 h-12 ${domaine.couleur} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                                    {domaine.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800">{domaine.titre}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Comment ça marche</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { num: 1, titre: 'Créez votre profil', desc: 'Ajoutez votre CV, vos compétences et vos projets en quelques minutes.' },
                            { num: 2, titre: 'Postulez facilement', desc: 'Envoyez votre candidature en un clic aux entreprises qui vous plaisent.' },
                            { num: 3, titre: 'Suivez vos candidatures', desc: 'Voyez l\'état de chaque candidature : envoyée, vue, entretien, réponse.' }
                        ].map((step) => (
                            <div key={step.num} className="flex flex-col">
                                <div className="w-12 h-12 bg-[#3730A3] text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.titre}</h3>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 ">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-[#3730A3] to-[#0369A1] backdrop-blur-sm rounded-3xl p-8 md:p-16 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Prêt à trouver votre prochain poste ?
                            </h2>
                            <p className="text-gray-200">Créez votre compte gratuitement.</p>
                        </div>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white text-[#3730A3] px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
                        >
                            Créer mon compte
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-20">
                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Découvrez les Entreprises qui recrutent</h1>
                    <p className="text-sm text-gray-500 mt-2">Découvrez les organisations et établissements au coeur du monde professionnel</p>
                </div>

                <Entreprise />

                <div className="flex justify-center mt-8">
                    <Link to="/entreprise" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold">Explorer toutes les entreprises</Link>
                </div>
            </div>

            {/* offres */}
            <div className="">

                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Découvrez les opportunités de stages et premier emploi</h1>
                    <p className="text-sm text-gray-500 mt-2">Consultez parmi nos plusieurs opportunités de premier emploi à Madagascar.</p>
                </div>

                <Offre limite={6} />

                <div className="flex justify-center mt-8">
                    <Link to="/offre" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold">Explorer toutes les offres</Link>
                </div>
            </div>

            <div>
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
                                        <img src={imagePropos} alt="Notre équipe" className="w-full h-full object-cover rounded-2xl" />
                                    </div>
                                </div>
                            </section>
            </div>

            <div>
                <section className="bg-white py-20 mb-10">
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
            </div>

            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Prêt à décrocher votre prochain poste ?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Créez votre profil dès maintenant et laissez les meilleures opportunités venir à vous grâce à notre système de recommandation intelligent.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate('/signup')}
                            className="bg-[#3730A3] hover:bg-[#2e2885] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
                        >
                            Créer un compte candidat
                        </button>
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            Nous contacter
                        </button>
                    </div>
                </div>
            </section>

                        <section className="container mx-auto px-6 py-10 mb-20">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Questions fréquentes</h2>
                                <p className="text-gray-500">Peut-être que la réponse est déjà ici.</p>
                            </div>
            
                            <div className="max-w-3xl mx-auto space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                                        >
                                            <span className="font-semibold text-gray-800">{faq.question}</span>
                                            <FaChevronRight className={`text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                                        </button>
                                        
                                        {openFaq === index && (
                                            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                                                {faq.reponse}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

        </div>
    )
}
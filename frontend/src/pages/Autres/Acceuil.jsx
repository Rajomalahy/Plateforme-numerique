import Search from "./search"
import Entreprise from "./Entreprise"
import Offre from "./Offre"
import { Link } from 'react-router-dom'
import Demandeur from "./Demandeur"

import { FaCode, FaChartLine, FaBullhorn, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Acceuil () {
    
    const domaines = [
        { icon: <FaCode />, titre: 'Informatique', couleur: 'bg-indigo-100 text-indigo-600' },
        { icon: <FaChartLine />, titre: 'Finance et comptabilité', couleur: 'bg-cyan-100 text-cyan-600' },
        { icon: <FaBullhorn />, titre: 'Marketing et communication', couleur: 'bg-pink-100 text-pink-600' },
        { icon: <FaUsers />, titre: 'Ressources humaines', couleur: 'bg-amber-100 text-amber-600' }
    ]

    const navigate = useNavigate()

    return (
        <div className="bg-[#F7F8FC]">

            <div className="mt-10">
                <Search/>
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

                <Entreprise/>

                <div className="flex justify-center mt-8">
                    <Link to="/entreprise" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold">Explorer toutes les entreprises</Link>
                </div>
            </div>

            <div className="">
                
                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Découvrez les opportunités de stages et premier emploi</h1>
                    <p className="text-sm text-gray-500 mt-2">Consultez parmi nos plusieurs opportunités de premier emploi à Madagascar.</p>
                </div>
                
                <Offre/>

                <div className="flex justify-center mt-8">
                    <Link to="/offre" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold">Explorer toutes les offres</Link>
                </div>
            </div>

            {/* <div>

                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Les personnes à la recherche d'emploi ou stage</h1>
                    <p className="text-sm text-gray-500 mt-2">Découvrez des jeunes talentueux prêts à intégrer votre entreprise</p>
                </div>

                <Demandeur/>
            </div> */}

        </div>
    )
}
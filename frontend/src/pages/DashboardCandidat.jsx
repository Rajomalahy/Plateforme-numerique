import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import {FaBookmark, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaClock} from 'react-icons/fa'
import { IoIosHeartEmpty } from "react-icons/io"
import un from '../assets/un.jpg'
import deux from '../assets/deux.jpg'
import trois from '../assets/trois.jpg'

export default function () {
    
    const [cvFile, setCvFile] = useState(null)

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        setCvFile(file);
        }   
    }

    const offres = [
        {
            id: 1,
            logo : un,
            titre: "Associé(e) Développement Commercial & Opérations (Télétravail)",
            entreprise: "Wesconn Ventures",
            statut: "Recrute activement",
            lieu: "Ravat",
            type: "Stage",
            niveau: "Bac + 1 (1ère année sup)",
            description: "Télétravail (basé(e) au Maroc) Société d'investissement multisectorielle (Barcelone, Espagne) À propos du poste Nous sommes une société qui développe et exploite des entreprises dans les secteurs de la f...",
            date: "Il y a 3 heures",
        },
        {
            id: 2,
            logo : deux,
            titre: "Stagiaire vidéaste et montage",
            entreprise: "Pixel Dreams",
            statut: "Recrute activement",
            lieu: "Casablanca Settat",
            type: "Stage",
            niveau: "Bac + 3 (Licence)",
            description: "ON RECRUTE : Stagiaire Monteur & Vidéaste — Casablanca T'as fini l'école. Ton portfolio dit 'projet de fin d'études' partout. Et t'as l'impression que personne ne va te donner ta chance ? On te l...",
            date: "Il y a 3 jours",
        },
        {
            id: 1,
            logo : trois,
            titre: "Associé(e) Développement Commercial & Opérations (Télétravail)",
            entreprise: "Wesconn Ventures",
            statut: "Recrute activement",
            lieu: "Ravat",
            type: "Stage",
            niveau: "Bac + 1 (1ère année sup)",
            description: "Télétravail (basé(e) au Maroc) Société d'investissement multisectorielle (Barcelone, Espagne) À propos du poste Nous sommes une société qui développe et exploite des entreprises dans les secteurs de la f...",
            date: "Il y a 3 heures",
        }
    ]

    const activites = [
        {
            id: 1,
            type: 'postulation', // bleu
            texte: 'Vous avez postulé chez',
            entreprise: 'Orange Digital Center',
            date: 'Il y a 2 heures',
        },
        {
            id: 2,
            type: 'consultation', // vert
            texte: 'Votre CV a été consulté par',
            entreprise: 'Vola Mada Bank',
            date: 'Hier',
        },
        {
            id: 3,
            type: 'nouvelle_offre', // bleu
            texte: 'Nouvelle offre correspondant à votre profil :',
            entreprise: 'Ingénieur Génie Civil',
            date: 'Il y a 2 jours',
        },
        {
            id: 4,
            type: 'entretien', // jaune
            texte: 'Invitation à un entretien —',
            entreprise: 'TanaMedia',
            date: 'Il y a 3 jours',
        },
    ]

    const getCouleurPoint = (type) => {
        switch (type) {
            case 'postulation':

            case 'nouvelle_offre':
                return 'border-blue-500'

            case 'consultation':
                return 'border-green-500'

            case 'entretien':
                return 'border-yellow-500'

            default:
                return 'border-gray-400';
        }
    }

    return(
        <div className="border-b border-gray-200 rounded-t-md w-full h-full bg-[#F5F6FA] transition-all duration-300">

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">

                {/* profil */}
                <div className="xl:col-span-3 space-y-4">

                    <div className="bg-white border border-gray-200 rounded-lg py-2">
                        {/* photo de profil */}
                        <div>
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-400">R</span>
                                </div>
                            </div>
                        </div>

                        {/* nom et email */}
                        <div className="text-center mb-6">
                            <h2 className="text-sm font-bold text-gray-800">
                                RAJOMALAHY Ratovonirina Nancy
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                                nancyrato@gmail.com
                            </p>
                        </div>

                        {/* description */}
                        <div>
                            {/* detail */}
                            <div className="px-2 md:px-4 space-y-3">
                                <div className="mt-2 flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        Nationalité
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                        Madagascar
                                    </span>
                                </div>

                                <div className="mt-2 flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        Niveau formation
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                        Bac + 5 (Master 2)
                                    </span>
                                </div>

                                <div className="mt-2 flex items-center text-xs md:text-sm">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        Disponibilité
                                    </span>
                                    <span className="text-sm font-medium text-green-600 flex items-center gap-2">
                                        Immédiatement
                                    </span>
                                </div>
                            </div>

                            {/* bouton */}
                            <div className="space-y-2 mt-4 px-2 md:px-4">
                                <button className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                    Compléter mes informations
                                </button>
                                <button className="w-full bg-[#1e3a5f] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition flex items-center justify-center gap-2">
                                    Mon profil
                                </button>
                            </div>
                        </div>

                    </div>
                    
                    {/* score cv */}
                    <div className="bg-white border border-gray-200 rounded-xl px-8 py-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                Score CV
                            </h3>
                            <a href="#" className="text-xs text-gray-500 flex items-center gap-1">
                                Voir plus
                            </a>
                        </div>
                    </div>

                    {/* cv */}
                    <div >
                        { !cvFile ? 
                            <div className="h-52 border-2 border-dashed border-gray-300 rounded-lg transition cursor-pointer text-center">
                                <input type="file" onChange={handleCvUpload} name="" id="cv-upload" accept=".pdf,.doc,.docx" className="hidden"/>
                                <label htmlFor="cv-upload" className="cursor-pointer">
                                    <p className="text-sm text-gray-600 ">
                                        Glissez votre CV ici ou <span className="text-[#FF6B6B] font-medium">parcourir</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        PDF, DOC, DOCX (max 5MB)
                                    </p>
                                </label>
                            </div>
                          :
                            <div className="border border-gray-200 rounded-lg p-4">
                                {/* CV uploadé - aperçu */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{cvFile.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(cvFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => setCvFile(null)} className="text-gray-400  text-sm">
                                Suprimer
                                </button>

                                <button>Voir</button>
                            </div>
                        }
                    </div>
                </div>

                {/* offres recommandés */}
                <div className="xl:col-span-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                        {/* carte 1 */}
                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Candidatures envoyées</p>
                                <FaPaperPlane  className="text-gray-600"/>
                            </div>

                            <div className=" bg-gray-50 rounded-lg">  
                                <p className="text-2xl font-bold text-blue-500">0</p>
                            </div>
                        </div>
                        
                        {/* carte 2 */}
                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Entretiens programmés</p>
                                <FaPaperPlane  className="text-gray-600"/>
                            </div>

                            <div className=" bg-gray-50 rounded-lg">  
                                <p className="text-2xl font-bold text-blue-500">0</p>
                            </div>
                        </div>

                        {/* carte 3 */}
                        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-between px-3 py-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Ofrres sauvegardés</p>
                                <FaPaperPlane  className="text-gray-600"/>
                            </div>

                            <div className=" bg-gray-50 rounded-lg">  
                                <p className="text-2xl font-bold text-blue-500">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-xl border border-gray-200 rounded-xl px-3 md:px-4 py-3">

                        {/* titre */}
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-base md:text-lg font-bold text-blue-500">
                                Offres recommandées
                            </h2>
                            <button className="border border-gray-300 px-4 py-1.5 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition ">
                                Voir toutes les offres 
                            </button>
                        </div>

                        {/* liste recommandation */}
                        <div className="space-y-3 max-h-[600px] overflow-y-auto bg-[#F5F6FA] rounded-lg pr-1">
                            {offres.map((offre) => (
                                <div key={offre.id} className="p-3 md:p-4 bg-white border border-gray-200 rounded-xl">

                                    <div className="flex items-center justify-between gap-2 mb-3">

                                        {/* titre */}
                                        <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                                            <div className=" bg-gray-100 rounded-lg border border-gray-200 flex-shrink-0">
                                                <img src={offre.logo} className="w-10 h-10 object-cover rounded-lg" alt="" />
                                            </div>

                                            <div>
                                                <h3 className="font-medium text-xs md:text-sm text-gray-800 line-clamp-2">
                                                    {offre.titre}
                                                </h3>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {offre.entreprise} - <span className="text-green-600 font-medium">{offre.statut}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* icone */}
                                        <button className="text-gray-400 transition flex-shrink-0">
                                            <FaBookmark />
                                        </button>
                                    </div>

                                    {/* tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <div className="flex gap-2">
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaMapMarkerAlt className="text-gray-400" />
                                                {offre.lieu}
                                            </span>

                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaBriefcase className="text-gray-400" />
                                                {offre.type}
                                            </span>
                                            
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaGraduationCap className="text-gray-400" />
                                                {offre.niveau}
                                            </span>
                                        </div>  

                                        <div><IoIosHeartEmpty /></div>
                                    </div>

                                    <p className="text-xs w-sm text-gray-600 mb-3 line-clamp-2 mt-4">
                                        {offre.description}
                                    </p>

                                    <button className="text-blue-500 text-sm font-medium mb-4 hover:underline">
                                        Lire la suite
                                    </button>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <FaClock /> {offre.date}
                                        </span>
                                        
                                        <button className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-900 transition">
                                            Postuler <FaPaperPlane className="text-xs" />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activites recentes */}
                <div className="bg-white border border-gray-200 rounded-lg xl:col-span-3 px-3 md:px-4 py-4">

                    <h2 className="text-sm md:text-basefont-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                        <FaClock className="text-[#1e3a5f]" />
                        Activités récentes
                    </h2>

                    <div className="space-y-4">
                        {
                            activites.map((activite, index) => (
                                <div key={activite.id} className="flex items-start gap-3">

                                    <div className="flex flex-col items-center flex-shrink-0">                                  
                                        <div className={`w-4 h-4 mt-1.5 rounded-full border-2 ${getCouleurPoint(activite.type)} bg-white`}></div>
                                    </div> 

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                            {activite.texte} 
                                            <span className="font-bold text-gray-800"> {activite.entreprise}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {activite.date}
                                        </p>
                                    </div>                                  
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
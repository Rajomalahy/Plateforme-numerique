import { FaPaperPlane } from "react-icons/fa"
import {FaBookmark, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaClock} from 'react-icons/fa'
import { IoIosHeartEmpty } from "react-icons/io"
import un from '../assets/un.jpg'
import deux from '../assets/deux.jpg'
import trois from '../assets/trois.jpg'


export default function Recommandation () {

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

    return(
        <div>
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl mt-2 px-3 md:px-4 py-3">
                {/* titre */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <h2 className="text-base md:text-lg font-bold text-blue-500">
                        Offres recommandées
                    </h2>
                    <button className="border border-gray-300 px-3 py-1.5 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition w-full sm:w-auto">
                        toutes les offres 
                    </button>
                </div>

                 {/* liste recommandation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 max-h-[500px] md:max-h-[600px] overflow-y-auto bg-[#F5F6FA] rounded-lg p-2 md:p-0">
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
                                        {/* <div className="flex gap-2"> */}
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaMapMarkerAlt className="text-gray-400" />
                                                <span className="truncate">{offre.lieu}</span>
                                            </span>

                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaBriefcase className="text-gray-400" />
                                                <span className="truncate">{offre.type}</span>
                                            </span>
                                            
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs">
                                                <FaGraduationCap className="text-gray-400 text-xs" />
                                                <span className="truncate">{offre.niveau}</span>
                                            </span>
                                        {/* </div>   */}

                                        <div className="flex-shrink-0">
                                            <IoIosHeartEmpty className="text-gray-400 hover:text-red-500 transition cursor-pointer" />
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1 break-words">
                                        {offre.description}
                                    </p>

                                    <button className="text-blue-500 text-xs md:text-sm font-medium mb-3 hover:underline">
                                        Lire la suite
                                    </button>

                                    <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 mt-auto">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <FaClock className="text-xs" /> {offre.date}
                                        </span>

                                        <button className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-900 transition">
                                            Postuler <FaPaperPlane className="text-xs" />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
            </div>
        </div>
    )
}
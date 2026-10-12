import React from "react";
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { IoDocumentTextOutline } from "react-icons/io5"
import { MdAccessTime } from "react-icons/md"
import { FaPaperPlane } from "react-icons/fa"
import { MdOutlinePlace } from "react-icons/md"
import { Link } from 'react-router-dom'


const offres = [
    {
        id : 1,
        logo : un,
        nom : 'Stage pré-embauche',
        entreprise : 'work',
        lieu : 'Tamatave',
        type : 'Stage',
        travail : 'remote',
        date : 'il y a 3 jours',
        limite : 'Ajourd\'hui'
    },
    {
        id : 1,
        logo : deux,
        nom : 'Conseiller client bilingue',
        entreprise : 'work',
        lieu : 'Tana',
        type : 'CDI',
        travail : 'sur site',
        date : 'hier',
        limite : 'demain'
    },
    {
        id : 1,
        logo : trois,
        nom : 'Supervisieur call',
        entreprise : 'work',
        lieu : 'Diego',
        type : 'CDD',
        travail : 'Hybride',
        date : 'Lundi',
        limite : '12 octobre 2026'
    }
]

export default function Offre () {
    return(
        <section>
            <div className="max-w-7xl mx-auto px-4 mt-1">               

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {offres.map((offre) => (
                        <div key={offre.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden">

                            <div className="flex items-start gap-4 p-4">
                                <img src={offre.logo} className="w-16 h-16 object-contain rounded-md" alt="" />

                                <div>
                                    <h3 className="font-medium text-lg text-gray-800 truncate"> {offre.nom} </h3>
                                    <p className="text-sm text-gray-500 truncate"> {offre.entreprise} </p>

                                    <div className="flex gap-6 text-sm text-gray-500 mt-2">
                                        <div className="flex items-center gap-1">
                                            <MdOutlinePlace/> 
                                            <span>{offre.lieu} </span>
                                        </div>

                                        <div className="flex items-center gap-1"> 
                                            <IoDocumentTextOutline />
                                            <span>{offre.type}</span>     
                                        </div>

                                        <div> {offre.travail} </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                                <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                    <div><MdAccessTime /></div>
                                    <div>
                                        <span>{offre.date} |</span>
                                        <span> Limite : {offre.limite} </span>
                                    </div>
                                </div>

                                <Link to="/detailoffre" className="bg-mtefop-blue text-white px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                                    <FaPaperPlane />
                                    <span>
                                        Voir
                                    </span>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
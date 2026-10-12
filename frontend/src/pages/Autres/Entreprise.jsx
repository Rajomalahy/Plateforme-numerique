import React from "react";
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { FaArrowRightLong } from "react-icons/fa6"
import { MdOutlinePlace } from "react-icons/md"
import { FaBriefcase } from "react-icons/fa6"
import { IoMdBusiness } from "react-icons/io"
import { Link } from 'react-router-dom'


export default function Entreprise () {

    const entrepriseList = [
        {
            id : 1,
            logo : un,
            nom : 'La Gastronomie PIZZA',
            secteur : 'Restauration',
            ville : 'Antananarivo',
            offre : '12 Offres',
        },

        {
            id : 2,
            logo : deux,
            nom : 'up working',
            secteur : 'Informatique',
            ville : 'Fianarantsoa',
            offre : '2 Offres',
        },

        {
            id : 3,
            logo : trois,
            nom : 'SAKATA',
            secteur : 'Agriculture',
            ville : 'Tamatave',
            offre : '60 Offres',
        }
    ]

    return(
        <section>
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {entrepriseList.map((entreprise) => (
                        <div key={entreprise.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden">

                            <div className="flex items-start gap-4 p-4">
                                <img src={entreprise.logo} alt="" className="w-16 h-16 object-contain rounded-md" />

                                <div className="">
                                    <h3 className="font-medium text-lg text-gray-800 truncate"> {entreprise.nom} </h3>
                                    <p className="text-sm text-gray-500 truncate flex items-center gap-2"> 
                                        <span><IoMdBusiness /></span>
                                        <span>{entreprise.secteur}</span> 
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 px-4 pb-4 text-sm text-gray-600">
                                <span className="bg-gray-100 px-3 py-1 rounded whitespace-nowrap flex items-center gap-2">
                                    <MdOutlinePlace/>
                                    <span>{entreprise.ville}</span> 
                                </span>

                                <span className="bg-gray-100 px-3 py-1 rounded whitespace-nowrap flex items-center gap-1"> 
                                    <FaBriefcase />
                                    {entreprise.offre} 
                                </span>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                                <Link to="/dashboard" className="text-sm text-gray-600 underline">Candidature</Link>
                                <Link to="/detailEntreprise" className="bg-mtefop-blue text-white px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                                    <span>Consulter</span>
                                    <FaArrowRightLong />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <a href="" className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-semibold">Explorer toutes les entreprises</a>
                </div>

            </div>
        </section>
    )
}
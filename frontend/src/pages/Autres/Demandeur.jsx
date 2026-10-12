import React from "react";
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md"

import { Link } from 'react-router-dom'

export default function Demandeur () {

    const demandeur = [
        {
            id : 1,
            profil : un,
            nom : 'Rajomalahy N.',
            diplome : 'Master2',
            adresse : 'Fianarantsoa',
            branche : 'Agronomie',
            lieu : 'sur site',
            type : 'CDD'
        },
        {
            id : 2,
            profil : deux,
            nom : 'Rajomalahy N.',
            diplome : 'Master2',
            adresse : 'Fianarantsoa',
            branche : 'Agronomie',
            lieu : 'sur site',
            type : 'CDD'
        },
        {
            id : 3,
            profil : trois,
            nom : 'Rajomalahy N.',
            diplome : 'Master2',
            adresse : 'Fianarantsoa',
            branche : 'Agronomie',
            lieu : 'sur site',
            type : 'CDD'
        }        
    ]
    
    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 mt-14">

                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Les personnes à la recherche d'emploi ou stage</h1>
                    <p className="text-sm text-gray-500 mt-2">Découvrez des jeunes talentueux prêts à intégrer votre entreprise</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {
                        demandeur.map((demande) => (
                            <div key={demande.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                
                                <div >

                                    <div className="flex justify-center ">
                                        <img src={demande.profil} alt="" className="w-16 h-16 mt-2 object-contain rounded-full"/>
                                    </div>

                                    <div className="text-center">
                                        <div className="font-medium text-lg text-gray-800">
                                            {demande.nom}
                                        </div>

                                        <div className="text-gray-500 mt-3 text-sm text-center justify-center whitespace-nowrap flex items-center gap-6">
                                            <div>{demande.diplome}</div>

                                            <div className="flex items-center gap-1"> 
                                                <MdOutlinePlace/>
                                                {demande.adresse} 
                                            </div>

                                            <div> {demande.branche} </div>
                                        </div>

                                        <div className="text-gray-500 mt-3 justify-center text-sm whitespace-nowrap flex items-center gap-6">
                                            <div className="bg-gray-100 px-3 py-1 rounded-full"> {demande.lieu} </div>
                                            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"> 
                                                <IoDocumentTextOutline />
                                                {demande.type} 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-4 flex justify-center mt-8">
                                    <Link to="/dashboard" className="bg-mtefop-blue px-4 py-2 text-white rounded-lg text-sm font-semibold">Voir profil</Link>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}
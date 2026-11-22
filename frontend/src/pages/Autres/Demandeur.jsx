import { useState, useEffect } from "react"
import { IoDocumentTextOutline } from "react-icons/io5"
import { MdOutlinePlace } from "react-icons/md"

import { Link } from 'react-router-dom'

import { getCandidats } from "../../Services/Service"

export default function Demandeur () {

    const [candidats, setCandidats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchCandidats = async () => {

            try {

                const data = await getCandidats()

                setCandidats(data)

            } catch (error) {

                console.error("Erreur lors du chargement des candidats :", error)
            
            } finally {

                setLoading(false)

            }
        }

        fetchCandidats()
    }, [])

    
    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-mtefop-blue border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Chargement des profils...</span>
            </div>
        )
    }
    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 ">
 
               {candidats.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        Aucun profil de candidat disponible pour le moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {candidats.map((candidat) => (
                            <div key={candidat.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
                                
                                <div className="p-4">
                                    <div className="flex justify-center">
                                        {candidat.photoProfil ? (
                                            <img 
                                                src={candidat.photoProfil} 
                                                alt={`Photo de ${candidat.prenoms}`} 
                                                className="w-20 h-20 object-cover rounded-full border-2 border-gray-100"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 border-2 border-gray-100">
                                                {candidat.prenoms ? candidat.prenoms.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center mt-4">
                                        <div className="font-bold text-lg text-gray-800">
                                            {candidat.prenoms} {candidat.nom}
                                        </div>

                                        <div className="text-gray-500 mt-3 text-sm flex flex-wrap items-center justify-center gap-2 md:gap-4">
                                           
                                            <span className="font-medium text-mtefop-blue">{candidat.niveauEtude || 'Non spécifié'}</span>
                                            
                                            <div className="flex items-center gap-1"> 
                                                <MdOutlinePlace className="text-gray-400"/>
                                                {candidat.ville || 'Madagascar'} 
                                            </div>
                                        </div>

                                        <div className="text-gray-500 mt-4 flex flex-wrap justify-center gap-2">
                                            {candidat.disponibilite && (
                                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    {candidat.disponibilite}
                                                </div>
                                            )}
                                            {candidat.typeContrat && (
                                                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"> 
                                                    <IoDocumentTextOutline />
                                                    {candidat.typeContrat} 
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-4 flex justify-center bg-gray-50">
                                    
                                    <Link to='/signin' className="bg-mtefop-blue hover:bg-blue-700 px-6 py-2 text-white rounded-lg text-sm font-semibold transition">
                                        Voir le profil
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}
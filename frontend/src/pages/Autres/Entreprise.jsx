import React, { useState, useEffect } from "react"
import { FaArrowRightLong, FaBuilding } from "react-icons/fa6" 
import { MdOutlinePlace } from "react-icons/md"
import { FaBriefcase } from "react-icons/fa6"
import { IoMdBusiness } from "react-icons/io"
import { Link } from 'react-router-dom'
import { getEntreprisesPubliques } from '../../Services/Service'

export default function Entreprise() {
    const [entreprises, setEntreprises] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                setLoading(true)
                const data = await getEntreprisesPubliques()
                setEntreprises(data)
            } catch (err) {
                setError("Impossible de charger les entreprises pour le moment.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchEntreprises()
    }, [])

    if (loading) {
        return (
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-lg">Chargement des entreprises en cours...</p>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Entreprises Partenaires</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entreprises.map((entreprise) => (
                        <div key={entreprise.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">

                            <div className="flex items-start gap-4 p-5">
                                
                                {entreprise.urlLogo ? (
                                    <img 
                                        src={entreprise.urlLogo} 
                                        alt={`Logo de ${entreprise.nomSociete}`} 
                                        className="w-16 h-16 object-contain rounded-md bg-gray-50 p-1" 
                                    />
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 flex-shrink-0">
                                        <FaBuilding className="text-3xl" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-800 truncate"> 
                                        {entreprise.nomSociete || "Nom non précisé"} 
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate flex items-center gap-2 mt-1"> 
                                        <span><IoMdBusiness className="text-[#3730A3]" /></span>
                                        <span>{entreprise.secteurActivite || "Secteur non précisé"}</span> 
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 px-5 pb-5 text-sm text-gray-600">
                                <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2">
                                    <MdOutlinePlace />
                                    <span>{entreprise.ville || "Adresse non précisée"}</span> 
                                </span>

                                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2"> 
                                    <FaBriefcase />
                                    <span>Voir les offres</span> 
                                </span>
                            </div>

                            <div className="border-t border-gray-100 px-5 py-4 flex justify-between items-center bg-gray-50/50">
                                <Link to="/offre" className="text-sm text-gray-600 hover:text-[#3730A3] underline transition">
                                    Voir les offres
                                </Link>
                                <Link 
                                    to={`/detailEntreprise/${entreprise.id}`} 
                                    className="bg-[#3730A3] hover:bg-[#2e2885] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                                >
                                    <span>Consulter</span>
                                    <FaArrowRightLong />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>         

                {entreprises.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Aucune entreprise n'a complété son profil pour le moment.
                    </div>
                )}
            </div>
        </section>
    )
}
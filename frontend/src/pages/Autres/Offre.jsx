import React, { useState, useEffect } from "react"
import { IoDocumentTextOutline } from "react-icons/io5"
import { MdAccessTime, MdOutlinePlace } from "react-icons/md"
import { FaPaperPlane, FaBuilding } from "react-icons/fa6"
import { Link } from 'react-router-dom'
import { useSearchParams } from "react-router-dom"
import { getOffresPubliques, getLogoUrl } from '../../Services/Service'

export default function Offre({limite}) {
    const [offres, setOffres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchParams] = useSearchParams()
    const motCle = searchParams.get('motCle') || ''
    const ville = searchParams.get('ville') || ''
    const typeContrat = searchParams.get('typeContrat') || ''

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                setLoading(true)
                
                const data = await getOffresPubliques(motCle, ville, typeContrat)
                setOffres(data)
            } catch (err) {
                setError("Impossible de charger les offres pour le moment.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchOffres()
    }, [motCle, ville, typeContrat])

    if (loading && offres.length === 0) {
        return (
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-lg">Chargement des offres en cours...</p>
                </div>
            </section>
        )
    }

    const offresAffichees = limite ? offres.slice(0, limite) : offres

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
                
                {(motCle || ville || typeContrat) && (
                    <p className="text-sm text-gray-600 mb-4">
                        Résultats pour : 
                        {motCle && <span className="font-semibold text-[#3730A3]"> "{motCle}"</span>}
                        {ville && <span className="font-semibold text-[#3730A3]"> à {ville}</span>}
                        {typeContrat && <span className="font-semibold text-[#3730A3]"> ({typeContrat})</span>}
                    </p>
                )}

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dernières Offres d'Emploi</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offresAffichees.map((offre) => (
                        <div key={offre.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">

                            <div className="flex items-start gap-4 p-5">

                                {getLogoUrl(offre.logo) ? (
                                    <>
                                        <img 
                                            src={getLogoUrl(offre.logo)} 
                                            alt="Logo entreprise" 
                                            className="w-16 h-16 object-contain rounded-md bg-gray-50 p-1 flex-shrink-0" 
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.nextSibling.style.display = 'flex'
                                            }}
                                        />
                                        <div
                                            style={{ display: 'none' }}
                                            className="w-16 h-16 items-center justify-center rounded-md bg-gray-100 text-gray-400 flex-shrink-0"
                                        >
                                            <FaBuilding className="text-3xl" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 flex-shrink-0">
                                        <FaBuilding className="text-3xl" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">

                                    <h3 className="font-bold text-lg text-gray-800 truncate"> 
                                        {offre.titre} 
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate"> 
                                        {offre.entreprise} 
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-3">
                                        <div className="flex bg-gray-100 text-gray-500 px-2 py-1 rounded items-center gap-1">
                                            <MdOutlinePlace/> 
                                            <span>{offre.ville}</span>
                                        </div>

                                        <div className="flex bg-gray-100 text-gray-500 px-2 py-1 rounded items-center gap-1"> 
                                            <IoDocumentTextOutline />
                                            <span>{offre.typeContrat}</span>     
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-5 py-4 flex justify-between items-center bg-gray-50/50">
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <MdAccessTime className="text-base" />
                                    <span>
                                        Publié le {new Date(offre.datePublication).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                               
                                <Link 
                                    to={`/detailoffre/${offre.id}`} 
                                    className="bg-[#3730A3] hover:bg-[#2e2885] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                                >
                                    <FaPaperPlane />
                                    <span>Voir</span>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {offres.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        {(motCle || ville || typeContrat) 
                            ? "Aucune offre ne correspond à votre recherche." 
                            : "Aucune offre n'est disponible pour le moment."}
                    </div>
                )}
            </div>
        </section>
    )
}
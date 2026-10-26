import React from "react"
import { useState } from "react"
import { CgBriefcase } from "react-icons/cg"
import { FiUsers } from "react-icons/fi"
import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"

import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'


export default function Search () {

    const offresExemples = [
        { id: 'E1', titre: 'Matching Intelligent', entreprise: 'Offres ciblées par notre algorithme.', type: 'IA', couleur: 'bg-green-100 text-green-700' },
        { id: 'E2', titre: '100% Gratuit', entreprise: 'Postulez sans aucune limite.', type: 'Gratuit', couleur: 'bg-yellow-100 text-yellow-700' },
        { id: 'E3', titre: 'Suivi en Temps Réel', entreprise: 'Historique complet de vos candidatures.', type: 'Live', couleur: 'bg-purple-100 text-purple-700' }
    ]

    // const [active, setActive] = useState('offre')

    return(
        <section className="bg-gradient-to-br from-[#3730A3] via-[#3F3FB8] to-[#0369A1] text-white py-20">
            {/* <div className="max-w-5xl mx-auto px-4 mb-8 mt-14">

                <h1 className="text-white text-2xl font-bold mb-8">Plusieurs opportunités de stages & premiers emplois à Madagascar</h1>

                <div className="flex">
                        <button
                            onClick={()=>setActive('offre')}
                            className={`font-semibold ${active === 'offre' ? 'bg-white rounded-tl-lg px-6 py-3 flex items-center gap-2' : 'flex items-center gap-2 px-6 py-3 text-white bg-[#D4AF37] rounded-tl-l'}`}
                        >
                            <CgBriefcase />
                            <span>Trouver des offres</span>
                        </button>

                        <button
                            onClick={()=> setActive('candidat')}
                            className={`font-semibold ${active === 'candidat' ? 'bg-white rounded-tr-lg px-6 py-3 flex items-center gap-2' : 'flex items-center gap-2 px-6 py-3 text-white bg-[#D4AF37] rounded-tr-lg'}`}
                        >
                            <FiUsers />
                            <span>Trouver des candidats</span>
                        </button>
                </div>

                <div className="max-w-5xl mx-auto w-full bg-white rounded-tl-none rounded-xl shadow-2xl p-4">

                    {active === 'offre' ?
                    <div className=" ">
                        <p className="text-gray-600 mb-6">Trouver votre premier emploi</p>

                        <div className="border border-gray-300 py-2 px-4 rounded-lg flex flex-col md:flex-row gap-4">

                            <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-4 py-3 flex items-center gap-2">
                                <IoIosSearch /><input className="focus:outline-none" type="search" placeholder="Rechercher un poste, une entreprise..." name="" id="" />
                            </div>

                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <MdOutlinePlace className="ml-2"/>
                                <select name="" id="" className="px-1 py-3 focus:outline-none cursor-pointer">
                                    <option value="">Lieu</option>
                                </select>
                            </div>

                            <div className="border border-gray-300 rounded-lg flex items-center pl-3">
                                <RiContractLine />
                                <select name="" id="" className="px-1 py-3 focus:outline-none cursor-pointer">
                                    <option value="">Type de contrat</option>
                                </select>
                            </div>

                            <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2 text-white cursor-pointer">
                                <IoIosSearch />
                                <span>Rechercher</span>
                            </button>
                        
                        </div>
                    </div>
                    :
                    <div className=" ">
                        <p className="text-gray-600 mb-6">Trouver votre prochain candidat</p>

                        <div className="border border-gray-300 py-2 px-4 rounded-lg flex flex-col md:flex-row gap-4">
                            
                            <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-4 py-3 flex items-center gap-2">
                                <IoIosSearch /><input className="" type="search" placeholder="Rechercher un demandeur d'emploi..." name="" id="" />
                            </div>

                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <MdOutlinePlace className="ml-2"/>
                                <select name="" id="" className="px-1 py-1 focus:outline-none cursor-pointer">
                                    <option value="">Lieu</option>
                                </select>
                            </div>

                            <div className="border border-gray-300 rounded-lg flex items-center pl-3">
                                <RiContractLine />
                                <select name="" id="" className="px-1 py-1 focus:outline-none cursor-pointer">
                                    <option value="">Type de contrat</option>
                                </select>
                            </div>

                            <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-1 text-white cursor-pointer">
                                <IoIosSearch />
                                <span>Rechercher</span>
                            </button>
                        
                        </div>
                    </div>
                    }
                </div>

            </div> */}

                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                            Emplois, stages et premiers postes
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Lancez votre carrière dès aujourd'hui
                        </h1>
                        
                        <p className="text-xl text-gray-200 mb-8">
                            Parcourez les offres, postulez en quelques clics et suivez vos candidatures au même endroit.
                        </p>

                        {/* Barre de recherche */}
                        <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                                <FaSearch className="text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Métier ou mot-clé" 
                                    className="bg-transparent w-full outline-none text-gray-700"
                                />
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-l border-gray-200">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Ville" 
                                    className="bg-transparent w-full outline-none text-gray-700"
                                />
                            </div>
                            <button className="bg-[#3730A3] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2e2885] transition">
                                Rechercher
                            </button>
                        </div>

                        <div className="mt-6 flex items-center gap-3 text-sm">
                            <span className="text-gray-300">Populaires :</span>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer hover:bg-white/30 transition">Développeur</span>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer hover:bg-white/30 transition">Marketing</span>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer hover:bg-white/30 transition">Comptabilité</span>
                        </div>
                    </div>

                    {/* Offres en vedette */}
                    <div className="mt-12 md:mt-0 md:absolute md:right-20 md:top-32 space-y-4">
                        {offresExemples.map((offre) => (
                            <div key={offre.id} className="bg-white rounded-2xl p-5 shadow-xl flex items-center gap-4 hover:scale-105 transition transform">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                                    {offre.id}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{offre.titre}</h3>
                                    <p className="text-sm text-gray-500">{offre.entreprise} · {offre.lieu}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${offre.couleur}`}>
                                    {offre.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
        </section>
    )
}
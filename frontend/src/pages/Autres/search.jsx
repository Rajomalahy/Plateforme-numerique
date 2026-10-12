import React from "react"
import { useState } from "react"
import { CgBriefcase } from "react-icons/cg"
import { FiUsers } from "react-icons/fi"
import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"


export default function Search () {

    const [active, setActive] = useState('offre')

    return(
        <section className="bg-[#082A49] py-16">
            <div className="max-w-5xl mx-auto px-4 mb-8 mt-14">

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

            </div>
        </section>
    )
}
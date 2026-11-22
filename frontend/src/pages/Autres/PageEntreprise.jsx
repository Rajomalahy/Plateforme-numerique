import { useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { FaHome } from "react-icons/fa"
import Entreprise from "./Entreprise"

export default function PageEntreprise() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    
    // Récupère les valeurs de l'URL pour les pré-remplir
    const [motCle, setMotCle] = useState(searchParams.get('motCle') || '')
    const [ville, setVille] = useState(searchParams.get('ville') || '')

    const handleSearch = (e) => {
        e.preventDefault() 
        const params = new URLSearchParams()
        if (motCle.trim()) params.append('motCle', motCle.trim())
        if (ville.trim()) params.append('ville', ville.trim())
        
        navigate(`/entreprise?${params.toString()}`)
    }

    return (
        <div className="mt-30">
            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                    <Link to="/" className="hover:text-gray-900 transition flex items-center gap-1">
                        <FaHome className="text-gray-500" />
                    </Link>
                    <span className="text-gray-400">›</span>
                    <Link to="/entreprise" className="hover:text-gray-900 transition">
                        Entreprises qui recrutent
                    </Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900 font-medium truncate">
                        Emploi
                    </span>
                </nav>
            </div>

            <div className="text-center py-6">
                <h1 className="text-2xl font-medium">Découvrez les Entreprises qui recrutent</h1>
                <p className="text-sm text-gray-500 mt-2">Découvrez les organisations et établissements au coeur du monde professionnel</p>
            </div>

            <form onSubmit={handleSearch} className="shadow-sm border border-gray-300 max-w-4xl mx-auto py-2 px-2 rounded-lg flex flex-col md:flex-row gap-4">
                <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-4 py-2 flex items-center gap-2">
                    <IoIosSearch />
                    <input 
                        className="focus:outline-none w-full" 
                        type="search" 
                        placeholder="Rechercher une entreprise, un secteur..." 
                        value={motCle}
                        onChange={(e) => setMotCle(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto flex items-center border border-gray-300 rounded-lg">
                    <MdOutlinePlace className="ml-2"/>
                    {/* Changé en input pour permettre la saisie libre du filtre, avec les mêmes classes que votre select */}
                    <input 
                        type="text"
                        placeholder="Ville"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className="w-full md:w-auto px-1 py-2 focus:outline-none cursor-pointer bg-transparent"
                    />
                </div>

                <button type="submit" className="w-full md:w-auto flex items-center gap-2 rounded-lg bg-[#3730A3] hover:bg-[#2e2885] px-5 py-2 text-white cursor-pointer transition">
                    <IoIosSearch />
                    <span>Rechercher</span>
                </button>
            </form>

            <div className="mt-8">
                <Entreprise />
            </div>
        </div>
    )
}
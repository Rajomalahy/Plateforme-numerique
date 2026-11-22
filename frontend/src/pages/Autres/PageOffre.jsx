import { useState, useEffect } from "react" // ✅ MODIFIÉ : ajout de useEffect
import { useSearchParams, Link } from "react-router-dom" // ✅ MODIFIÉ : useNavigate retiré
import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"
import { FaHome } from "react-icons/fa"
import Offre from "./Offre"

export default function PageOffre() {
    const [searchParams, setSearchParams] = useSearchParams() // ✅ MODIFIÉ

    const [motCle, setMotCle] = useState(searchParams.get('motCle') || '')
    const [ville, setVille] = useState(searchParams.get('ville') || '')
    const [typeContrat, setTypeContrat] = useState(searchParams.get('typeContrat') || '')

    // ✅ AJOUTÉ : met à jour l'adresse (et donc les résultats) avec les valeurs données
    const appliquer = (m, v, t) => {
        const params = new URLSearchParams()
        if (m.trim()) params.append('motCle', m.trim())
        if (v.trim()) params.append('ville', v.trim())
        if (t.trim()) params.append('typeContrat', t.trim())
        setSearchParams(params, { replace: true })
    }

    // ✅ AJOUTÉ : recherche en direct, 0,4 seconde après la dernière frappe
    useEffect(() => {
        const timer = setTimeout(() => appliquer(motCle, ville, typeContrat), 400)
        return () => clearTimeout(timer)
    }, [motCle, ville, typeContrat])

    // ✅ MODIFIÉ : le bouton Rechercher applique tout de suite
    const handleSearch = (e) => {
        e.preventDefault()
        appliquer(motCle, ville, typeContrat)
    }

    return (
        <div className="mt-30">

            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">

                    <Link to="/" className="hover:text-gray-900 transition">
                        <FaHome className="text-gray-500" />
                    </Link>

                    <span className="text-gray-400">›</span>

                    <Link to="/offre" className="hover:text-gray-900 transition">
                        Offres d'emploi
                    </Link>

                    <span className="text-gray-400">›</span>

                    <span className="text-gray-900 font-medium truncate">
                        Emploi
                    </span>

                </nav>
            </div>

            <div className="text-center py-8">
                <h1 className="text-2xl font-medium">Offres de stages et premiers emplois</h1>
                <p className="text-sm text-gray-500 mt-2">Découvrez des offres de stages et premiers emplois régulièrement actualisées dans divers secteurs d'activité.
                    <br/>Trouvez les meilleures opportunités auprès des entreprises les plus dynamiques du marché.
                </p>
            </div>

            <form onSubmit={handleSearch} className="shadow-sm border border-gray-300 max-w-4xl mx-auto py-2 px-2 rounded-lg flex flex-col md:flex-row gap-4">

                <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-2 py-2 flex items-center gap-2">
                    <IoIosSearch />
                    <input
                        className="focus:outline-none w-full"
                        type="search"
                        placeholder="Rechercher un poste, une entreprise..."
                        value={motCle}
                        onChange={(e) => setMotCle(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto flex items-center border border-gray-300 rounded-lg">
                    <MdOutlinePlace className="ml-2"/>
                    <input
                        type="search" // ✅ MODIFIÉ : "search" pour avoir le X d'effacement
                        placeholder="Lieu"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className="w-full md:w-auto px-1 py-2 focus:outline-none bg-transparent"
                    />
                </div>

                {/* ✅ MODIFIÉ : liste de choix à la place du texte libre */}
                <div className="w-full md:w-auto border border-gray-300 rounded-lg flex items-center pl-3">
                    <RiContractLine />
                    <select
                        value={typeContrat}
                        onChange={(e) => setTypeContrat(e.target.value)}
                        className="w-full md:w-auto px-1 py-2 focus:outline-none cursor-pointer bg-transparent"
                    >
                        <option value="">Tous les contrats</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Temporaire">Temporaire</option>
                    </select>
                </div>

                <button type="submit" className="w-full md:w-auto flex items-center gap-2 rounded-lg bg-[#3730A3] hover:bg-[#2e2885] px-5 py-2 text-white cursor-pointer transition">
                    <IoIosSearch />
                    <span>Rechercher</span>
                </button>

            </form>

            <div>
                <Offre/>
            </div>

        </div>
    )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'

export default function Search() {
    const navigate = useNavigate()

    const [motCle, setMotCle] = useState('')
    const [ville, setVille] = useState('')

    const handleSearch = (e) => {
        e.preventDefault() 
        
        const params = new URLSearchParams()
        if (motCle.trim()) params.append('motCle', motCle.trim())
        if (ville.trim()) params.append('ville', ville.trim())
        
        navigate(`/offre?${params.toString()}`)
    }

    const offresExemples = [
        { id: 'E1', titre: 'Développeur Fullstack', entreprise: 'Tech Madagascar', lieu: 'Tana', type: 'CDI', couleur: 'bg-green-100 text-green-700' },
        { id: 'E2', titre: 'Comptable Junior', entreprise: 'Cabinet Audit', lieu: 'Tamatave', type: 'Stage', couleur: 'bg-yellow-100 text-yellow-700' },
        { id: 'E3', titre: 'Community Manager', entreprise: 'Agence Digital', lieu: 'Fianarantsoa', type: 'Freelance', couleur: 'bg-purple-100 text-purple-700' }
    ]

    return(
        <section className="bg-gradient-to-br from-[#3730A3] via-[#3F3FB8] to-[#0369A1] text-white py-20 relative">
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

                    <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                            <FaSearch className="text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Métier, mot-clé ou entreprise" 
                                className="bg-transparent w-full outline-none text-gray-700"
                                value={motCle}
                                onChange={(e) => setMotCle(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-l border-gray-200">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Ville (ex: Tana, Tamatave)" 
                                className="bg-transparent w-full outline-none text-gray-700"
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-[#3730A3] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2e2885] transition">
                            Rechercher
                        </button>
                    </form>

                    <div className="mt-6 flex items-center gap-3 text-sm flex-wrap">
                        <span className="text-gray-300">Populaires :</span>
                        {['Développeur', 'Marketing', 'Comptabilité', 'Stage'].map((tag) => (
                            <button 
                                key={tag}
                                onClick={() => { setMotCle(tag); handleSearch({ preventDefault: () => {} }); }}
                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer hover:bg-white/30 transition"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block mt-12 md:absolute md:right-20 md:top-32 space-y-4">
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
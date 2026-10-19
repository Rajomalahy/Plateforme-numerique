import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa'
import { getMesOffres } from '../../Services/Service'

export default function MesOffres() {
    const [offres, setOffres] = useState([])

    useEffect(() => {
        getMesOffres(localStorage.getItem('token')).then(setOffres).catch(console.error)
    }, [])

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mes Offres d'emploi</h2>
                <Link to="/dashboardentreprise/publier" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    <FaPlus /> Nouvelle offre
                </Link>
            </div>

            {offres.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 mb-4">Vous n'avez pas encore publié d'offres.</p>
                    <Link to="/dashboardentreprise/publier" className="text-blue-600 font-medium hover:underline">Publier ma première offre</Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {offres.map(offre => (
                        <div key={offre.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{offre.titre}</h3>
                                <div className="flex gap-3 mt-2 text-sm text-gray-500">
                                    <span>{offre.ville}</span>
                                    <span>•</span>
                                    <span>{offre.typeContrat}</span>
                                    <span>•</span>
                                    <span className="text-blue-600 font-medium">{offre.nbCandidatures} candidature(s)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${offre.statut === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {offre.statut}
                                </span>
                                <button className="p-2 text-gray-400 hover:text-blue-600 transition"><FaEye /></button>
                                <button className="p-2 text-gray-400 hover:text-red-600 transition"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
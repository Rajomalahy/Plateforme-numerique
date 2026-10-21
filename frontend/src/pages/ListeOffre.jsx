import { useState, useEffect } from 'react'
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaPaperPlane } from 'react-icons/fa'
import { postuler, getOffresPubliques } from '../Services/Service'

export default function ListeOffres() {
    const [offres, setOffres] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    useEffect(() => {
        const loadOffres = async () => {
            try {
                const data = await getOffresPubliques()
                setOffres(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadOffres()
    }, [])

    const handlePostuler = async (idOffre) => {
        setMessage('')
        setErreur('')
        try {
            const token = localStorage.getItem('token')
            await postuler(idOffre, token)
            setMessage(`✅ Candidature envoyée pour l'offre !`)
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la candidature.")
        }
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaBriefcase /> Offres d'emploi disponibles
            </h2>

            {message && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">{message}</div>}
            {erreur && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{erreur}</div>}

            {loading ? (
                <div className="text-center py-10">Chargement des offres...</div>
            ) : offres.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Aucune offre disponible pour le moment.</div>
            ) : (
                <div className="grid gap-4">
                    {offres.map(offre => (
                        <div key={offre.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800">{offre.titre}</h3>
                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-1"><FaBuilding /> {offre.entreprise}</span>
                                    <span className="flex items-center gap-1"><FaMapMarkerAlt /> {offre.ville}</span>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{offre.typeContrat}</span>
                                </div>
                                <p className="text-gray-500 text-sm mt-3 line-clamp-2">{offre.description}</p>
                            </div>
                            <button 
                                onClick={() => handlePostuler(offre.id)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shrink-0"
                            >
                                <FaPaperPlane /> Postuler
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
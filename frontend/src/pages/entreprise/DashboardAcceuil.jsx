import { useState, useEffect } from 'react'
import { FaBriefcase, FaUsers, FaClock, FaChartLine } from 'react-icons/fa'
import { getMesOffres, getMesCandidatures } from '../../Services/Service'

export default function DashboardEntrepriseAccueil() {
    const [stats, setStats] = useState({ offres: 0, candidatures: 0, enAttente: 0 })
    const [recentCandidatures, setRecentCandidatures] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token')
            try {
                const [offres, candidatures] = await Promise.all([
                    getMesOffres(token),
                    getMesCandidatures(token)
                ])
                setStats({
                    offres: offres.length,
                    candidatures: candidatures.length,
                    enAttente: candidatures.filter(c => c.statut === 'En attente').length
                })
                setRecentCandidatures(candidatures.slice(0, 5))
            } catch (err) { console.error(err) }
            // En cas d'erreur (pas encore d'offres), on met des 0
        }
        loadData()
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
            
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FaBriefcase className="text-2xl" /></div>
                    <div><p className="text-gray-500 text-sm">Offres actives</p><p className="text-3xl font-bold text-gray-800">{stats.offres}</p></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FaUsers className="text-2xl" /></div>
                    <div><p className="text-gray-500 text-sm">Candidatures reçues</p><p className="text-3xl font-bold text-gray-800">{stats.candidatures}</p></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><FaClock className="text-2xl" /></div>
                    <div><p className="text-gray-500 text-sm">En attente de traitement</p><p className="text-3xl font-bold text-gray-800">{stats.enAttente}</p></div>
                </div>
            </div>

            {/* Dernières candidatures */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaChartLine /> Candidatures récentes</h3>
                {recentCandidatures.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucune candidature pour le moment.</p>
                ) : (
                    <div className="space-y-3">
                        {recentCandidatures.map(c => (
                            <div key={c.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                <div>
                                    <p className="font-medium text-gray-800">{c.nomCandidat}</p>
                                    <p className="text-xs text-gray-500">Postulé pour : {c.titreOffre}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    c.statut === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 
                                    c.statut === 'Accepté' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {c.statut}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
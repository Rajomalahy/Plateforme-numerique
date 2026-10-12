import { useState } from 'react'
import { FaCalendarCheck, FaBriefcase, FaRegCommentDots, FaExclamationCircle } from 'react-icons/fa'

export default function Notifications () {

    const [filtre, setFiltre] = useState('toutes')

    const [notifs, setNotifs] = useState([
        { id: 1, type: 'convocation', texte: 'TanaMedia vous a envoyé une convocation pour le 27 juillet.', temps: 'Il y a 1 heure', lu: false },
        { id: 2, type: 'offre', texte: 'Nouvelle offre : Ingénieur Génie Civil chez Star Brew Construction.', temps: 'Il y a 3 heures', lu: false },
        { id: 3, type: 'message', texte: 'Nouveau message de Vola Mada Bank — RH.', temps: 'Hier, 10:24', lu: true },
        { id: 4, type: 'rappel', texte: 'Votre profil est complété à 72 % seulement.', temps: 'Il y a 2 jours', lu: true }
    ])

    const onglets = [
        { id: 'toutes', label: 'Toutes' },
        { id: 'offre', label: 'Offres' },
        { id: 'message', label: 'Messages' },
        { id: 'convocation', label: 'Convocations' },
        { id: 'rappel', label: 'Rappels' }
    ]

    const styles = {
        convocation: { icon: <FaCalendarCheck />, couleur: 'bg-amber-100 text-amber-600' },
        offre: { icon: <FaBriefcase />, couleur: 'bg-blue-100 text-blue-600' },
        message: { icon: <FaRegCommentDots />, couleur: 'bg-emerald-100 text-emerald-600' },
        rappel: { icon: <FaExclamationCircle />, couleur: 'bg-rose-100 text-rose-600' }
    }

    // choisir quelles notifications afficher
    const visibles = filtre === 'toutes' ? notifs : notifs.filter((n) => n.type === filtre)

    // marquer une notification comme lue
    const marquerLu = (id) =>
        setNotifs(notifs.map((n) => (n.id === id ? { ...n, lu: true } : n)))

    return (
        <div className="px-4 md:px-10 py-4">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <p className="text-gray-500 text-sm mt-2">Restez informé(e) de votre recherche d'emploi.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl">

                {/* onglets */}
                <div className="overflow-x-auto border-b border-gray-200">
                    <div className="flex gap-2 md:gap-6 px-4 md:px-6 min-w-max">
                        {onglets.map((o) => (
                            <button
                                key={o.id}
                                onClick={() => setFiltre(o.id)}
                                className={`py-3 md:py-4 text-xs md:text-sm whitespace-nowrap border-b-2 -mb-px transition flex-shrink-0 ${
                                    filtre === o.id
                                        ? 'border-[#1e3a5f] text-[#1e3a5f] font-semibold'
                                        : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* liste */}
                <div className="divide-y divide-gray-100">
                    {visibles.length === 0 && (
                        <p className="text-center text-gray-400 py-10 text-sm">Aucune notification.</p>
                    )}

                    {visibles.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => marquerLu(n.id)}
                            className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 ${
                                n.lu ? '' : 'bg-blue-50/50'
                            }`}
                        >
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${styles[n.type].couleur}`}>
                                {styles[n.type].icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-gray-800 leading-relaxed">{n.texte}</p>
                                <p className="text-xs text-gray-400 mt-1">{n.temps}</p>
                            </div>

                            {!n.lu && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
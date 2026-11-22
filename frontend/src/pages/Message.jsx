import { useState, useRef, useEffect } from 'react'
import { FaSearch, FaPaperPlane, FaArrowLeft, FaArchive, FaPaperclip, FaRegImage } from 'react-icons/fa'

export default function Messages () {

    const [actifId, setActifId] = useState(1)
    const [onglet, setOnglet] = useState('toutes')
    const [recherche, setRecherche] = useState('')
    const [texte, setTexte] = useState('')
    const [chatOuvert, setChatOuvert] = useState(false)
    const finRef = useRef(null)

    const [conversations, setConversations] = useState([
        {
            id: 1, nom: 'Vola Mada Bank — RH', initiales: 'VM', couleur: 'bg-yellow-500', archivee: false,
            messages: [
                { id: 1, de: 'recruteur', texte: 'Bonjour, merci pour votre candidature au poste de Chargé(e) de Clientèle.', heure: '14:21', jour: 'Mercredi 9 février' },
                { id: 2, de: 'moi', texte: 'Bonjour, merci à vous de l’avoir étudiée avec attention.', heure: '14:35', jour: 'Mercredi 9 février' },
                { id: 3, de: 'recruteur', texte: 'Pouvez-vous confirmer votre disponibilité pour un entretien le 29 juillet à 14h30 ?', heure: '09:40', jour: 'Jeudi 10 février' },
                { id: 4, de: 'moi', texte: 'Oui, je confirme. Merci beaucoup !', heure: '09:52', jour: 'Jeudi 10 février' }
            ]
        },
        {
            id: 2, nom: 'TanaMedia — Recrutement', initiales: 'TM', couleur: 'bg-green-700', archivee: false,
            messages: [
                { id: 1, de: 'recruteur', texte: 'Votre entretien est confirmé pour le 27 juillet à 10h00.', heure: '16:10', jour: 'Hier' }
            ]
        },
        {
            id: 3, nom: 'Orange Digital Center', initiales: 'OD', couleur: 'bg-blue-900', archivee: false,
            messages: [
                { id: 1, de: 'recruteur', texte: 'Bonjour, merci de nous transmettre votre portfolio.', heure: '11:05', jour: 'Lundi' }
            ]
        },
        {
            id: 4, nom: 'Agri Sud SARL', initiales: 'AS', couleur: 'bg-rose-500', archivee: true,
            messages: [
                { id: 1, de: 'recruteur', texte: 'Félicitations, votre candidature a été retenue.', heure: '08:30', jour: '22 juillet' }
            ]
        }
    ])

    const actif = conversations.find((c) => c.id === actifId)

    const filtrees = conversations.filter((c) =>
        (onglet === 'archivees' ? c.archivee : !c.archivee) &&
        c.nom.toLowerCase().includes(recherche.toLowerCase())
    )

    const ouvrir = (id) => {
        setActifId(id)
        setChatOuvert(true)
    }

    const basculerArchive = () => {
        setConversations(conversations.map((c) =>
            c.id === actifId ? { ...c, archivee: !c.archivee } : c
        ))
    }

    const envoyer = () => {
        if (texte.trim() === '') return

        const heure = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        const nouveau = { id: Date.now(), de: 'moi', texte: texte.trim(), heure, jour: "Aujourd'hui" }

        setConversations(conversations.map((c) =>
            c.id === actifId ? { ...c, messages: [...c.messages, nouveau] } : c
        ))
        setTexte('')
    }

    useEffect(() => {
        finRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [actif.messages, actifId])

    return (
        <div className="px-4 md:px-10 py-4">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 ">Messages</h1>
                <p className="text-gray-500 text-sm mt-2">Échangez directement avec les recruteurs qui vous ont contacté(e).</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex h-[calc(100vh-220px)] min-h-[520px]">

                {/* colonne de gauche */}
                <div className={`${chatOuvert ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-80 bg-gray-50 border-r border-gray-200`}>

                    {/* recherche */}
                    <div className="relative border-b border-gray-200 bg-white">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            placeholder="Rechercher..."
                            className="w-full pl-10 pr-4 py-4 text-sm outline-none"
                        />
                    </div>

                    {/* onglets */}
                    <div className="flex border-b border-gray-200 bg-white text-sm">
                        <button
                            onClick={() => setOnglet('toutes')}
                            className={`flex-1 py-3 border-b-2 -mb-px ${onglet === 'toutes' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}
                        >
                            Toutes
                        </button>
                        <button
                            onClick={() => setOnglet('archivees')}
                            className={`flex-1 py-3 border-b-2 -mb-px ${onglet === 'archivees' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}
                        >
                            Archivées
                        </button>
                    </div>

                    {/* liste */}
                    <div className="flex-1 overflow-y-auto">
                        {filtrees.map((c) => {
                            const dernier = c.messages[c.messages.length - 1]
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => ouvrir(c.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                                        c.id === actifId ? 'bg-white' : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full ${c.couleur} text-white text-xs font-semibold flex items-center justify-center flex-shrink-0`}>
                                        {c.initiales}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{c.nom}</p>
                                        <p className="text-xs text-gray-500 truncate">{dernier.texte}</p>
                                    </div>
                                </button>
                            )
                        })}

                        {filtrees.length === 0 && (
                            <p className="text-center text-gray-400 text-sm py-8">Aucune conversation.</p>
                        )}
                    </div>
                </div>

                {/* colonne de droite */}
                <div className={`${chatOuvert ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0`}>

                    {/* en-tête */}
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200">
                        <button onClick={() => setChatOuvert(false)} className="md:hidden text-gray-500 p-1">
                            <FaArrowLeft />
                        </button>
                        <div className={`w-9 h-9 rounded-full ${actif.couleur} text-white text-xs font-semibold flex items-center justify-center`}>
                            {actif.initiales}
                        </div>
                        <p className="flex-1 text-sm font-semibold text-gray-800 truncate">{actif.nom}</p>
                        <button
                            onClick={basculerArchive}
                            title={actif.archivee ? 'Désarchiver' : 'Archiver'}
                            className="text-gray-400 hover:text-blue-600 p-2"
                        >
                            <FaArchive />
                        </button>
                    </div>

                    {/* messages */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
                        {actif.messages.map((m, index) => {
                            const afficherDate = index === 0 || actif.messages[index - 1].jour !== m.jour
                            const estMoi = m.de === 'moi'
                            const auteur = estMoi ? 'Vous' : actif.nom.split(' — ')[0]

                            return (
                                <div key={m.id}>

                                    {afficherDate && (
                                        <div className="flex items-center gap-3 my-4">
                                            <div className="flex-1 h-px bg-gray-200" />
                                            <span className="text-xs text-gray-400">{m.jour}</span>
                                            <div className="flex-1 h-px bg-gray-200" />
                                        </div>
                                    )}

                                    <div className={`flex gap-3 ${estMoi ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0 ${
                                            estMoi ? 'bg-gray-700' : actif.couleur
                                        }`}>
                                            {estMoi ? 'MOI' : actif.initiales}
                                        </div>

                                        <div className={`max-w-[75%] flex flex-col ${estMoi ? 'items-end' : 'items-start'}`}>
                                            <p className="text-xs mb-1">
                                                <span className="font-semibold text-gray-700">{auteur}</span>
                                                <span className="text-gray-400 ml-2">{m.heure}</span>
                                            </p>
                                            <div className={`px-4 py-3 text-sm rounded-md ${
                                                estMoi ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {m.texte}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={finRef} />
                    </div>

                    {/* zone d'écriture */}
                    <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                        <div className="flex-1 flex items-center gap-2 md:gap-3 bg-gray-100 rounded-md px-3 md:px-4 min-w-0">
                            <input
                                value={texte}
                                onChange={(e) => setTexte(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && envoyer()}
                                placeholder="Écrivez votre message..."
                                className="flex-1 bg-transparent py-3 text-sm outline-none"
                            />
                            <FaPaperclip className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
                            <FaRegImage className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
                        </div>
                        <button
                            onClick={envoyer}
                            className="w-10 h-10 md:w-11 md:h-11 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0"
                        >
                            <FaPaperPlane className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
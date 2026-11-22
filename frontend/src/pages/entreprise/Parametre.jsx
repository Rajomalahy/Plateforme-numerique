import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaLock } from 'react-icons/fa'
import { ChangerMotDePasse } from '../../Services/Service'

export default function ParametresEntreprise() {
    const navigate = useNavigate()

    const [ancien, setAncien] = useState('')
    const [nouveau, setNouveau] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')
    const [loading, setLoading] = useState(false)

    const handleDeleteAccount = () => {
        if (window.confirm("Êtes-vous sûr ? Cette action supprimera définitivement votre entreprise et toutes vos offres.")) {
            // Appel API de suppression ici
            localStorage.clear()
            navigate('/signin')
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setErreur('')
        setMessage('')

        if (nouveau.length < 6) {
            setErreur("Le nouveau mot de passe doit contenir au moins 6 caractères.")
            return
        }
        if (nouveau !== confirmation) {
            setErreur("La confirmation ne correspond pas au nouveau mot de passe.")
            return
        }

        setLoading(true)
        try {
            await ChangerMotDePasse(
                { ancienMotDePasse: ancien, nouveauMotDePasse: nouveau },
                localStorage.getItem('token')
            )
            setMessage("Mot de passe modifié avec succès.")
            setAncien('')
            setNouveau('')
            setConfirmation('')
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la modification.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du compte</h2>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaLock /> Sécurité</h3>
                <p className="text-sm text-gray-500 mb-4">La modification du mot de passe sera disponible prochainement via l'administrateur.</p>
            </div>

            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <h3 className="font-semibold text-red-800 mb-2">Zone de danger</h3>
                <p className="text-sm text-red-600 mb-4">La suppression de votre compte est irréversible. Toutes vos offres d'emploi et données seront définitivement effacées.</p>
                <button onClick={handleDeleteAccount} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    <FaTrash /> Supprimer mon compte
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-10">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaLock /> Sécurité</h3>

                {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{message}</div>}
                {erreur && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{erreur}</div>}

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
                        <input type="password" value={ancien} onChange={(e) => setAncien(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                        <input type="password" value={nouveau} onChange={(e) => setNouveau(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                        <input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-70">
                        {loading ? 'Modification...' : 'Modifier le mot de passe'}
                    </button>
                </form>
            </div>
        </div>
    )
}
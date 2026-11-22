import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { reinitialiserMotDePasse } from '../Services/Service'

export default function ReinitialiserMotDePasse() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') || ''

    const [nouveau, setNouveau] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErreur('')

        if (nouveau.length < 6) {
            setErreur("Le mot de passe doit contenir au moins 6 caractères.")
            return
        }
        if (nouveau !== confirmation) {
            setErreur("La confirmation ne correspond pas au mot de passe.")
            return
        }

        setLoading(true)
        try {
            const res = await reinitialiserMotDePasse(token, nouveau)
            setMessage(res.message)
            setTimeout(() => navigate('/signin'), 2000)
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la réinitialisation.")
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC] px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-700 mb-4">Lien invalide : le code est manquant.</p>
                    <Link to="/mot-de-passe-oublie" className="text-[#3730A3] hover:underline">Refaire une demande</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Nouveau mot de passe</h1>

                {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{message}</div>}
                {erreur && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{erreur}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={nouveau}
                            onChange={(e) => setNouveau(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3730A3]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3730A3]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3730A3] hover:bg-[#2e2885] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70"
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
    )
}
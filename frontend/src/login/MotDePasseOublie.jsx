import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motDePasseOublie } from '../Services/Service'

export default function MotDePasseOublie() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setErreur('')
        setLoading(true)
        try {
            const res = await motDePasseOublie(email)
            setMessage(res.message)
        } catch (err) {
            setErreur(err.response?.data?.message || "Erreur lors de la demande.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Mot de passe oublié</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Entrez votre email. Nous vous enverrons un lien pour choisir un nouveau mot de passe.
                </p>

                {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{message}</div>}
                {erreur && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{erreur}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3730A3]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3730A3] hover:bg-[#2e2885] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70"
                    >
                        {loading ? 'Envoi...' : 'Envoyer le lien'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link to="/signin" className="text-[#3730A3] hover:underline">Retour à la connexion</Link>
                </p>
            </div>
        </div>
    )
}
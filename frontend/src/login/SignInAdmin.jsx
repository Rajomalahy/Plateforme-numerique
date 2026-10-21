import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa'
import { loginUser } from '../Services/Service'

export default function SignInAdmin() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const responseData = await loginUser({
                email: formData.email,
                motDePasse: formData.password
            })

            if (responseData.role !== 'Administrateur') {
                setError('Accès refusé. Ce compte n\'est pas administrateur.')
                localStorage.clear()
                return
            }

            localStorage.setItem('token', responseData.token)
            localStorage.setItem('user', JSON.stringify({
                id: responseData.userId,
                email: responseData.email,
                role: responseData.role,
                nom: responseData.nom
            }))

            navigate('/admin')
        } catch (err) {
            setError(err.message || 'Erreur de connexion')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <FaUserShield className="text-3xl text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Espace Administrateur</h1>
                    <p className="text-gray-600 text-sm mt-2">Ministère de la Fonction Publique</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="admin@ministere.mg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/signin')}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        ← Retour à la connexion utilisateur
                    </button>
                </div>
            </div>
        </div>
    )
}
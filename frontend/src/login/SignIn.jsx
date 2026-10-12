import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Signin() {
    const navigate = useNavigate() // ✅ AJOUT
    const [showPassword, setShowPassword] = useState(false)
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Connexion:', formData)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 md:p-10">
                
                {/* Tabs */}
                <div className="flex justify-center gap-8 mb-8">
                    
                    <button className="text-base font-medium pb-2 border-b-2 border-gray-800 text-gray-800">
                        Se connecter
                    </button>
                    
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-base font-medium pb-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition"
                    >
                        S'inscrire
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Connectez-vous</h1>
                    <p className="text-gray-600 text-sm md:text-base">pour accéder à l'espace de demandeur</p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@adresse.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="********" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                        <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">Resté connecté</label>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-lg transition duration-200 text-sm md:text-base">Se connecter</button>

                    {/* LIEN QUI REDIRIGE VERS SIGNUP */}
                    <p className="text-center text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <button type="button" onClick={() => navigate('/signup')} className="text-blue-500 hover:text-blue-700 font-semibold transition">
                            S'inscrire
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}
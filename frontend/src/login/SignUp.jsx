import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { registerUser } from '../Services/Service'

export default function Signup() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Demandeur', // Valeur par défaut
        acceptTerms: false
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // 1. Vérifications locales (Frontend uniquement)
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        if (!formData.acceptTerms) {
            setError('Vous devez accepter les conditions générales.')
            return
        }

        setLoading(true)

        // 2. Préparation des données pour le backend (RG6 respecté : on n'envoie PAS confirmPassword)
        const dataToSend = {
            email: formData.email,
            motDePasse: formData.password,
            role: formData.role
        }

        try {
            // 3. Appel au service (plus propre que fetch)
            await registerUser(dataToSend)
            
            // 4. Succès
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.')
            navigate('/signin')
            
        } catch (err) {
            // 5. Gestion de l'erreur (le message vient du service ou du backend)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {

        console.log('Connexion avec Google')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 md:p-10">
                
                {/* Tabs */}
                <div className="flex justify-center gap-8 mb-8">
                    <button
                        onClick={() => navigate('/signin')}
                        className="text-base font-medium pb-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition"
                    >
                        Se connecter
                    </button>
                    <button className="text-base font-medium pb-2 border-b-2 border-gray-800 text-gray-800">
                        S'inscrire
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Créez votre compte</h1>
                    <p className="text-gray-600 text-sm md:text-base">pour accéder à l'espace Recruteur</p>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition mb-6"
                >
                    <FcGoogle className="text-xl" />
                    Se connecter avec Google
                </button>

                {/* Séparateur */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Ou</span>
                    </div>
                </div>  

                {/* Message d'erreur global */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}        

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                title="Veuillez entrer une adresse email valide (ex: nom@gmail.com)"
                                placeholder="email@adresse.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                required
                            />
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={6}
                                    placeholder="********"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Nom de l'entreprise - ✅ CORRIGÉ : En 2 colonnes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type de compte <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                            >
                                <option value="Demandeur">Demandeur d'emploi</option>
                                <option value="Entreprise">Entreprise</option>
                                {/* J'ai retiré "Admin" car selon ta RG5, l'admin est créé de manière sécurisée, pas via ce formulaire public */}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmer le mot de passe <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox conditions */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                        <label className="text-sm text-gray-600">
                            J'accepte les conditions générales
                        </label>
                    </div>

                    {/* Bouton submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition duration-200 text-sm md:text-base flex items-center justify-center gap-2 ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <>
                                {/* ✅ SPINNER TAILWIND PUR (Aucune installation requise) */}
                                <svg 
                                    className="animate-spin h-5 w-5 text-white" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                    ></circle>
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Inscription en cours...</span>
                            </>
                        ) : (
                            "S'inscrire"
                        )}
                    </button>

                    {/* Lien vers login */}
                    <p className="text-center text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Se connecter
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}
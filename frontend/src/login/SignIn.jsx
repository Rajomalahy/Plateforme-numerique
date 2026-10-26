import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google' 
import { loginUser, loginWithGoogle } from '../Services/Service'

export default function Signin() {
    const navigate = useNavigate() 
    const [showPassword, setShowPassword] = useState(false)
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
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

        setLoading(true)

        const dataToSend = {
            email: formData.email,
            motDePasse: formData.password
        }

        try {
            const responseData = await loginUser(dataToSend)
            
            localStorage.setItem('token', responseData.token)
            localStorage.setItem('role', responseData.role) 

            if (responseData.role === 'Entreprise') {

                navigate('/dashboardentreprise') 

            } else {

                navigate('/dashboard')

            }
        } catch (err) {

            setError(err.message || "Email ou mot de passe incorrect.")

        } finally {

            setLoading(false)
            
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true)
        setError('')
        try {

            const response = await loginWithGoogle(credentialResponse.credential, 'Demandeur') 
            
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            
            if (response.role === 'Entreprise') {
                navigate('/dashboardentreprise')
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            setError(err.message || "Erreur lors de la connexion Google.")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleError = () => {
        setError("La connexion avec Google a échoué. Veuillez réessayer.")
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-4 md:p-10">
                
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

                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Connectez-vous</h1>
                    <p className="text-gray-600 text-sm md:text-base">pour accéder à votre espace</p>
                </div>

                {/* <div className="flex justify-center mb-6">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        text="signin_with" 
                        theme="outline"
                        size="large"
                        width="350"
                    />
                </div> */}

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Ou</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@adresse.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                        <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">Resté connecté</label>
                    </div>

                    <button type="submit" disabled={loading} className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition duration-200 text-sm md:text-base flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Connexion en cours...</span>
                            </>
                        ) : "Se connecter"}
                    </button>

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
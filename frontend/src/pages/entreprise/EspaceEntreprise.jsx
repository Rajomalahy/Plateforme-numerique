import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaBuilding, FaCheckCircle, FaUpload, FaIndustry, FaGlobe, FaUsers, FaIdCard, FaSave, FaCog, FaCamera, FaTrash } from 'react-icons/fa'
import { MdOutlineEmail } from "react-icons/md"

import {getProfilEntreprise, updateProfilEntreprise, uploadLogo } from "../../Services/Service"

export default function EspaceEntreprise() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [uploadingLogo, setUploadingLogo] = useState(false)

    const [message, setMessage] = useState({ type: '', text: '' })

    const [entrepriseData, setEntrepriseData] = useState({
        nomSociete: '',
        secteurActivite: '',
        telephoneRH: '',
        description: '',
        urlLogo: '',
        nbEmployes: '',
        adresse: '',
        numeroFiscal: ''
    })

    const [userEmail, setUserEmail] = useState('')

    // Chargement des données
    useEffect(() => {
        const fetchData = async () => {

            const token = localStorage.getItem('token')

            const localUser = JSON.parse(localStorage.getItem('user'))

            if (localUser) setUserEmail(localUser.email || '')

            if (token) {
                try {

                    const data = await getProfilEntreprise(token)

                    setEntrepriseData({
                        nomSociete: data.nomSociete || '',
                        secteurActivite: data.secteurActivite || '',
                        telephoneRH: data.telephoneRH || '',
                        description: data.description || '',
                        urlLogo: data.urlLogo || '',
                        nbEmployes: data.nbEmployes ? data.nbEmployes.toString() : '',
                        adresse: data.adresse || '',
                        numeroFiscal: data.numeroFiscal || ''
                    })

                } catch (error) {

                    console.error("Erreur chargement entreprise :", error)

                }
            }
        }

        fetchData()

    }, [])

    const handleLogoUpload = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        if (file.size > 5 * 1024 * 1024) {

            setMessage({ type: 'error', text: 'Le logo ne doit pas dépasser 5 Mo.' })
            return

        }

        setUploadingLogo(true)

        try {

            const token = localStorage.getItem('token')
            const response = await uploadLogo(file, token)
            
            setEntrepriseData(prev => ({ ...prev, urlLogo: response.url }))
            setMessage({ type: 'success', text: 'Logo mis à jour ! N\'oubliez pas d\'enregistrer.' })

        } catch (error) {

            setMessage({ type: 'error', text: error.message || 'Erreur upload logo' })
        
        } finally {

            setUploadingLogo(false)

        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target
        setEntrepriseData(prev => ({ ...prev, [name]: value }))

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        setMessage({ type: '', text: '' })

        try {

            const token = localStorage.getItem('token')
            const responseData = await updateProfilEntreprise(entrepriseData, token)
            
            setMessage({ type: 'success', text: responseData.message })
            alert("Profil entreprise enregistré avec succès !")
            
            const user = JSON.parse(localStorage.getItem('user'))

            localStorage.setItem('user', JSON.stringify({
                ...user,
                nomSociete: entrepriseData.nomSociete,
                urlLogo: entrepriseData.urlLogo,
                estProfilComplet: responseData.estProfilComplet
            }))

        } catch (error) {

            setMessage({ type: 'error', text: error.message })

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="px-4 md:px-10 py-4">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Espace Entreprise</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Complétez votre profil pour pouvoir publier des offres d'emploi
                </p>
            </div>

            {message.text && (
                <div className={`mb-4 p-4 rounded-lg text-sm font-medium border flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.type === 'success' ? <FaCheckCircle /> : <FaTrash />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

                <div className="md:col-span-12">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
   
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 gap-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 overflow-hidden border-2 border-gray-100">
                                            {entrepriseData.urlLogo ? (
                                                <img src={entrepriseData.urlLogo} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaBuilding className="text-4xl" />
                                            )}
                                        </div>
                                        <label className="absolute -right-2 -bottom-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center rounded-full cursor-pointer transition shadow-md">
                                            <FaCamera className="text-xs" />
                                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" disabled={uploadingLogo} />
                                        </label>
                                    </div>
                                    <div className="text-center sm:text-left flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800">{entrepriseData.nomSociete || "Nom de votre société"}</h2>
                                        <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1">
                                            <MdOutlineEmail /> {userEmail}
                                        </p>
                                    </div>
                                </div>            

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la société <span className="text-red-500">*</span></label>
                                        <input type="text" name="nomSociete" value={entrepriseData.nomSociete} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité <span className="text-red-500">*</span></label>
                                        <select name="secteurActivite" value={entrepriseData.secteurActivite} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                            <option value="">Sélectionner...</option>
                                            <option value="Informatique & Tech">Informatique & Tech</option>
                                            <option value="Agriculture & Agroalimentaire">Agriculture & Agroalimentaire</option>
                                            <option value="BTP & Construction">BTP & Construction</option>
                                            <option value="Santé & Social">Santé & Social</option>
                                            <option value="Commerce & Distribution">Commerce & Distribution</option>
                                            <option value="Administration Publique">Administration Publique</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone RH</label>
                                        <input type="tel" name="telephoneRH" value={entrepriseData.telephoneRH} onChange={handleChange} placeholder="+261 34 00 000 00" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'employés</label>
                                        <select name="nbEmployes" value={entrepriseData.nbEmployes} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="">Sélectionner...</option>
                                            <option value="1-10">1 à 10 employés</option>
                                            <option value="11-50">11 à 50 employés</option>
                                            <option value="51-200">51 à 200 employés</option>
                                            <option value="200+">Plus de 200 employés</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du siège <span className="text-red-500">*</span></label>
                                        <input type="text" name="adresse" value={entrepriseData.adresse} onChange={handleChange} placeholder="Ville, Quartier, Rue..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'Identification Fiscale (NIF/STAT)</label>
                                        <div className="relative">
                                            <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="text" name="numeroFiscal" value={entrepriseData.numeroFiscal} onChange={handleChange} placeholder="Ex: 123456789" className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
                                        <div className="relative">
                                            <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="url" name="siteWeb" placeholder="https://..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'entreprise <span className="text-red-500">*</span></label>
                                        <textarea name="description" value={entrepriseData.description} onChange={handleChange} rows="4" placeholder="Présentez votre entreprise, votre mission et vos valeurs..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                                        <p className="text-xs text-gray-400 mt-1">Obligatoire pour publier des offres (RG8).</p>
                                    </div>

                                    <div className="flex justify-end md:col-span-2 mt-4">
                                        <button type="submit" disabled={loading} className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-bold transition shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            {loading ? (
                                                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Enregistrement...</>
                                            ) : (
                                                <><FaSave /> Enregistrer les modifications</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
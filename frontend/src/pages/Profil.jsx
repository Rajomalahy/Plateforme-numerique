import { useState, useEffect } from "react"
import { FaUser, FaCheckCircle , FaUpload, FaFilePdf, FaGraduationCap, FaImage, FaFileUpload, FaCalendar, FaMapMarkerAlt, FaUniversity, FaClock, FaSave, FaCog, FaCamera} from 'react-icons/fa'
import { MdOutlineEmail } from "react-icons/md"
import { FaEnvelope } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"

import { updateProfil, uploadCv, uploadPhoto, getProfil, deleteCompte } from "../Services/Service"


export default function Profil () {

    const [sectionActive, setSectionActive] = useState('profil')

    const [cvFile, setCvFile] = useState(null)
    const [cvUrl, setCvUrl] = useState(null)

    const [loading, setLoading] = useState(false)
    const [uploadingCv, setUploadingCv] = useState(false) 
    const [uploadingPhoto, setUploadingPhoto] = useState(false)

    const [message, setMessage] = useState({ type: '', text: '' })

     const [deletingAccount, setDeletingAccount] = useState(false)

    const [profilData, setProfilData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        dateNaissance: '',
        adresse: '',
        ville: '',
        nationalite: 'Malagasy',
        genre: '',
        typeContrat: '',
        disponibilite: '',
        niveauEtude: '',
        dureeExperience: '',
        reference: '',
        photoProfil: null,
        urlCv: '',
        photoProfil: ''
    })

    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const fetchProfilData = async () => {

            const token = localStorage.getItem('token')
            const localUser = JSON.parse(localStorage.getItem('user'))
            
            if (localUser) {
                setUserEmail(localUser.email || '')
            }

            if (token) {
                try {
                    
                    const data = await getProfil(token);
                    
                    setProfilData({
                        nom: data.nom || '',
                        prenom: data.prenoms || '', 
                        telephone: data.telephone || '',
                        dateNaissance: data.dateNaissance ? data.dateNaissance.split('T')[0] : '', 
                        adresse: data.adresse || '',
                        ville: data.ville || '',
                        nationalite: data.nationalite || 'Malagasy',
                        genre: data.genre || '',
                        typeContrat: data.typeContrat || '',
                        disponibilite: data.disponibilite || '',
                        niveauEtude: data.niveauEtude || '',
                        dureeExperience: data.dureeExperience ? data.dureeExperience.toString() : '',
                        reference: data.reference || '',
                        photoProfil: data.photoProfil || '',
                        urlCv: data.urlCv || ''
                    })

                    if (data.urlCv) setCvUrl(data.urlCv)

                } catch (error) {
                    console.error("Erreur lors du chargement du profil :", error)
                }
            }
        }

        fetchProfilData()
    }, [])

    const handlePhotoUpload = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        if (file.size > 5 * 1024 * 1024) { 
            setMessage({ type: 'error', text: 'La photo ne doit pas dépasser 5 Mo.' })
            return
        }

        setUploadingPhoto(true)  

        setMessage({ type: '', text: '' })

        try {
            const token = localStorage.getItem('token')
            
            const response = await uploadPhoto (file, token)           

            setProfilData(prev => ({ ...prev, photoProfil: response.url }))
            
            setMessage({ type: 'success', text: ' Photo de profil mise à jour ' })

        } catch (error) {

            setMessage({ type: 'error', text: error.message || 'Erreur lors de l\'upload de la photo' })
        
        } finally {

            setUploadingPhoto(false)

        }
    }

    const handleCvUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Le fichier ne doit pas dépasser 5 Mo.' })
            return
        }

        setUploadingCv(true)
        setMessage({ type: '', text: '' })

        try {
            const token = localStorage.getItem('token')
           
            const response = await uploadCv(file, token)
            
            setCvFile(file)
            setCvUrl(response.url)

            setProfilData(prev => ({ ...prev, urlCv: response.url }))
            
            setMessage({ type: 'success', text: 'CV uploadé avec succès !' })
        
        } catch (error) {

            setMessage({ type: 'error', text: error.message || 'Erreur lors de l\'upload du CV' })
        
        } finally {

            setUploadingCv(false)

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfilData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        setMessage({ type: '', text: '' })

        try {
            // Récupérer le token
            const token = localStorage.getItem('token')

            // Préparer les données 
            const dataToSend = {
                nom: profilData.nom,
                prenom: profilData.prenom,
                telephone: profilData.telephone,
                dateNaissance: profilData.dateNaissance,
                adresse: profilData.adresse,
                ville: profilData.ville,
                nationalite: profilData.nationalite,
                genre: profilData.genre,
                typeContrat: profilData.typeContrat,
                disponibilite: profilData.disponibilite,
                niveauEtude: profilData.niveauEtude,
                dureeExperience: profilData.dureeExperience,
                reference: profilData.reference,
                urlCv: profilData.urlCv,
                photoProfil: profilData.photoProfil
            }

            const responseData = await updateProfil(dataToSend, token)
            
            setMessage({ type: 'success', text: responseData.message })
            alert(" Profil enregistré avec succès dans la base de données !")
            
            const user = JSON.parse(localStorage.getItem('user'))
            localStorage.setItem('user', JSON.stringify({
                ...user,
                nom: profilData.nom,
                prenom: profilData.prenom,
                urlCv: profilData.urlCv,
                photoProfil: profilData.photoProfil,
                estProfilComplet: responseData.estProfilComplet 
            }))

        } catch (error) {
            
            setMessage({ type: 'error', text: error.message })

        } finally {
            
            setLoading(false)
        }
    }

    const getInitial = () => {
        if (profilData.prenom) return profilData.prenom.charAt(0).toUpperCase();
        if (userEmail) return userEmail.charAt(0).toUpperCase();
        return 'U';
    }

        // suppression compte
    const handleDeleteAccount = async () => {
      
        const isConfirmed = window.confirm("Êtes-vous ABSOLUMENT sûr de vouloir supprimer votre compte ?\n\nCette action est IR RÉVERSIBLE. Toutes vos données, votre CV et votre historique seront définitivement effacés.")
        
        if (!isConfirmed) return

        setDeletingAccount(true)
        setMessage({ type: '', text: '' })

        try {
            const token = localStorage.getItem('token')
            
            await deleteCompte(token)

            localStorage.removeItem('token')
            localStorage.removeItem('user')

            setMessage({ type: 'success', text: 'Votre compte a été supprimé avec succès. Redirection...' })

            setTimeout(() => {
                navigate('/signin') 
            }, 1500)

        } catch (error) {

            setMessage({ type: 'error', text: error.message || 'Erreur lors de la suppression du compte.' })
        
        } finally {

            setDeletingAccount(false)

        }
    }

    // Menu de navigation
    const menuItems = [
        { id: 'profil', label: 'Profil', icon: <FaUser /> },
        { id: 'parcours', label: 'Parcours', icon: <FaGraduationCap /> },
        { id: 'image', label: 'Image', icon: <FaImage /> },
        { id: 'cv', label: 'CV', icon: <FaFileUpload /> },
        { id: 'parametres', label: 'Paramètres', icon: <FaCog /> }
    ]

    return(
        <div className="px-10 py-4">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Paramètres</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gérez les informations de votre profil et de votre parcours.
                </p>
            </div>

            {message.text && (
                <div className={`mb-4 p-4 rounded-lg text-sm font-medium border flex items-center gap-2 ${
                    message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                    {message.type === 'success' ? <FaCheckCircle /> : <FaTrash />}
                    {message.text}
                </div>
            )}

            {/* layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-3">
                    <div className="bg-white border border-gray-200 rounded-xl">
                        {menuItems.map((item) => (
                            <button key={item.id} onClick={() => setSectionActive(item.id)} className= {`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${sectionActive === item.id ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'} `} >
                                {item.icon}
                                {item.label}
                            </button>
                        ) )}
                    </div>
                </div>
            

                {/* conteneur */}
                <div className="md:col-span-9">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        {/* section profil */}
                        {
                            sectionActive === 'profil' && (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 gap-4">
                                        
                                            <div className="relative">
                                                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 overflow-hidden">
                                                    {profilData.photoProfil ? (
                                                        <img src={profilData.photoProfil} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        getInitial()
                                                    )}
                                                </div>
                                                <label className="absolute right-0 bottom-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center rounded-full cursor-pointer transition">
                                                    <FaCamera className="text-xs" />
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        onChange={handlePhotoUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>

                                            <div className="text-center sm:text-left flex-1">
                                                <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1">
                                                    <MdOutlineEmail /> {userEmail}
                                                </p>
                                            </div>

                                        </div>            

                                            {/* formulaire */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Prénom <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex border border-gray-300 rounded-lg px-3 focus-with:ring-2 focus-with:ring-blue-500 focus-with:border-transparent">
                                                        <input 
                                                            type="text" 
                                                            name="prenom"
                                                            value={profilData.prenom}
                                                            onChange={handleChange}
                                                            placeholder="Votre prénom"
                                                            className="w-full py-2.5 text-sm focus:outline-none"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nom <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="border border-gray-300 rounded-lg px-3 flex focus-with:ring-2 focus-with:ring-blue-500 focus-with:border-transparent">
                                                        <input 
                                                            type="text" 
                                                            name="nom"
                                                            value={profilData.nom}
                                                            onChange={handleChange}
                                                            placeholder="Votre nom"
                                                            className="w-full py-2.5 text-sm focus:outline-none"
                                                            required
                                                        />
                                                    </div>
                                                </div>


                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Téléphone <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex">
                                                        <select className="border border-gray-300 border-r-0 rounded-l-lg px-2 py-2.5 text-sm focus:outline-none bg-gray-50">
                                                            <option>🇲🇬 +261</option>
                                                            <option>🇫🇷 +33</option>
                                                        </select>
                                                        <input 
                                                            type="tel" 
                                                            name="telephone"
                                                            value={profilData.telephone}
                                                            onChange={handleChange}
                                                            placeholder="34 89 684 32"
                                                            className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                                                    <select 
                                                        name="nationalite"
                                                        value={profilData.nationalite}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="Malagasy">Malagasy</option>
                                                        <option value="Francaise">Française</option>
                                                        <option value="Autre">Autre</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                                                    <select 
                                                        name="genre"
                                                        value={profilData.genre}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Sélectionner</option>
                                                        <option value="Feminin">Féminin</option>
                                                        <option value="Masculin">Masculin</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Date de naissance
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type="date" 
                                                            name="dateNaissance"
                                                            value={profilData.dateNaissance}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <FaCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Ville de résidence <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            name="ville"
                                                            value={profilData.ville}
                                                            onChange={handleChange}
                                                            placeholder="Fianarantsoa"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                        <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Adresse complète */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                                                    <textarea 
                                                        name="adresse"
                                                        value={profilData.adresse}
                                                        onChange={handleChange}
                                                        placeholder="Quartier, rue, boîte postale..."
                                                        rows="2"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Type de contrat recherché
                                                    </label>
                                                    <select 
                                                        name="typeContrat"
                                                        value={profilData.typeContrat}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Sélectionner</option>
                                                        <option value="CDI">CDI</option>
                                                        <option value="CDD">CDD</option>
                                                        <option value="Stage">Stage</option>
                                                        <option value="Alternance">Alternance</option>
                                                        <option value="Freelance">Freelance</option>
                                                        <option value="Temporaire">Temporaire</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Disponibilité
                                                    </label>
                                                    <select 
                                                        name="disponibilite"
                                                        value={profilData.disponibilite}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Sélectionner</option>
                                                        <option value="Immediate">Immédiate</option>
                                                        <option value="2 semaines">2 semaines</option>
                                                        <option value="1 mois">1 mois</option>
                                                        <option value="3 mois">3 mois</option>
                                                        <option value="6 mois">6 mois</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Niveau d'étude
                                                    </label>
                                                    <div className="relative">
                                                        <select 
                                                            name="niveauEtude"
                                                            value={profilData.niveauEtude}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                        >
                                                            <option value="">Sélectionner</option>
                                                            <option value="Bac">Bac</option>
                                                            <option value="Bac+1">Bac+1</option>
                                                            <option value="Bac+2">Bac+2</option>
                                                            <option value="Bac+3">Bac+3 (Licence)</option>
                                                            <option value="Bac+4">Bac+4 (Master 1)</option>
                                                            <option value="Bac+5">Bac+5 (Master 2)</option>
                                                            <option value="Doctorat">Doctorat</option>
                                                        </select>
                                                        <FaUniversity className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Durée d'expérience
                                                    </label>
                                                    <div className="relative">
                                                        <select 
                                                            name="dureeExperience"
                                                            value={profilData.dureeExperience}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                                        >
                                                            <option value="">Sélectionner</option>
                                                            <option value="0">Débutant (0 an)</option>
                                                            <option value="1">1 an</option>
                                                            <option value="2">2 ans</option>
                                                            <option value="3">3 ans</option>
                                                            <option value="5">5 ans</option>
                                                            <option value="10">10 ans et plus</option>
                                                        </select>
                                                        <FaClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Référence (optionnel) */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Référence personnelle (optionnel)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="reference"
                                                        value={profilData.reference}
                                                        onChange={handleChange}
                                                        placeholder="Nom et coordonnées d'une personne de référence"
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>

                                                   <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Curriculum Vitae (CV) <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                            <label className={`cursor-pointer inline-flex items-center text-gray-700 gap-2 transition font-medium shadow-sm w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${uploadingCv ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                                                {uploadingCv ? (
                                                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Upload en cours...</>
                                                                ) : (
                                                                    <><FaUpload /> Choisir un fichier (PDF/DOC)</>
                                                                )}
                                                                <input type="file" onChange={handleCvUpload} accept=".pdf,.doc,.docx" className="hidden" disabled={uploadingCv} />
                                                            </label>
                                                            
                                                            {profilData.urlCv && (
                                                                <span className="text-sm text-green-600 flex items-center gap-1 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                                                    <FaCheckCircle /> CV sélectionné (sera enregistré)
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-2">Le fichier sera sauvegardé définitivement quand vous cliquerez sur le bouton "Enregistrer les modifications" ci-dessous.</p>
                                                    </div>


                                                {/* Bouton Enregistrer */}
                                                <div className="flex justify-end md:col-span-2 mt-4">
                                                    <button 
                                                        type="submit"
                                                        disabled={loading}
                                                        className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                                                            loading ? 'opacity-70 cursor-not-allowed' : ''
                                                        }`}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                Enregistrement...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaSave />
                                                                Enregistrer les modifications
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                            </div>

                                    </div>
                                </form>
                            )
                        }

                        {/* section parametre */}
                        {
                            sectionActive === 'parametres' && (
                                <div className="space-y-6">

                                    <div className="">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="email" 
                                                    value={userEmail} 
                                                    disabled
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                                />
                                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Contactez le support pour modifier votre email
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-xl p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                                                    Supprimer mon compte
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    Action irréversible — toutes vos données seront effacées.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={handleDeleteAccount}
                                                disabled={deletingAccount}
                                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {deletingAccount ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Suppression...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaTrash />
                                                        Supprimer
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {/* image */}
                        {
                            sectionActive === 'image' && (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 md:p-16 flex flex-col items-center justify-center">
                                    <label className="cursor-pointer flex flex-col items-center">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handlePhotoUpload}
                                        disabled={uploadingPhoto}
                                        className="hidden"
                                    />
                                    <div className="relative w-64 h-64 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden group hover:border-gray-400 transition">
                                        
                                        {profilData.photoProfil ? (
                                            <img 
                                                src={profilData.photoProfil}
                                                alt="Photo de profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-8xl font-bold text-gray-400">R</span>
                                        )}

                                        {/* Overlay au survol */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                            <div className="text-white flex flex-col items-center gap-2">
                                                {uploadingPhoto ? (
                                                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <>
                                                        <FaCamera className="text-3xl" />
                                                        <span className="text-sm font-medium">Changer la photo</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Dégradé + Icône caméra en bas */}
                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-600 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition">
                                            <FaCamera className="text-white text-xl" />
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-4">
                                        Cliquez sur la photo pour télécharger
                                    </p>
                                    </label>
                                </div>
                            )
                        }

                        {/* cv */}
                        {sectionActive === 'cv' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">Visualisation du CV</h2>
                                        <p className="text-sm text-gray-500">Voici le CV actuellement enregistré dans votre profil.</p>
                                    </div>
                                </div>

                                {!profilData.urlCv ? (
                                    <div className="h-[400px] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                                        
                                        <FaFilePdf className="text-6xl text-gray-300 mb-4" />
                                        <p className="text-gray-500 text-sm mb-2 text-center">Aucun CV n'a encore été enregistré.</p>
                                        
                                        
                                        <label className={`mt-4 cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition text-sm font-medium shadow-sm ${uploadingCv ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            {uploadingCv ? (
                                                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Upload en cours...</>
                                            ) : (
                                                <><FaUpload /> Ajouter mon CV</>
                                            )}
                                            <input type="file" onChange={handleCvUpload} accept=".pdf,.doc,.docx" className="hidden" disabled={uploadingCv} />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white h-[500px] md:h-[600px] shadow-sm">
                                            <iframe src={profilData.urlCv} className="w-full h-full border-0" title="CV Preview" />
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                <FaCheckCircle /> Ce CV est enregistré et visible par les recruteurs.
                                            </p>

                                            
                                            <label className={`cursor-pointer inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg transition text-sm font-medium shadow-sm ${uploadingCv ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                                {uploadingCv ? 'Mise à jour en cours...' : 'Remplacer le CV'}
                                                <input type="file" onChange={handleCvUpload} accept=".pdf,.doc,.docx" className="hidden" disabled={uploadingCv} />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
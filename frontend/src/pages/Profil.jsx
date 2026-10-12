import { useState } from "react"
import { FaUser,FaEye,FaUpload,FaExpandAlt,FaFilePdf, FaGraduationCap, FaImage, FaFileUpload, FaCog, FaCamera} from 'react-icons/fa'
import { MdOutlineEdit } from "react-icons/md"
import { MdOutlineEmail } from "react-icons/md"
import { FaEnvelope } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"


export default function Profil () {

     // État pour savoir quelle section est active
    const [sectionActive, setSectionActive] = useState('profil')
    const [photo, setPhoto] = useState(null)
    const [cvFile, setCvFile] = useState(null)
    const [cvUrl, setCvUrl] = useState(null)

    // Menu de navigation
    const menuItems = [
        { id: 'profil', label: 'Profil', icon: <FaUser /> },
        { id: 'parcours', label: 'Parcours', icon: <FaGraduationCap /> },
        { id: 'image', label: 'Image', icon: <FaImage /> },
        { id: 'cv', label: 'CV', icon: <FaFileUpload /> },
        { id: 'parametres', label: 'Paramètres', icon: <FaCog /> }
    ]

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPhoto(URL.createObjectURL(file))
        }
    }

    const handleCvUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCvFile(file)
            setCvUrl(URL.createObjectURL(file))
        }
    }

    return(
        <div className="px-10 py-4">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Paramètres</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gérez les informations de votre profil et de votre parcours.
                </p>
            </div>

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
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 gap-4">
                                    
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                                                R
                                            </div>
                                            <button className="absolute right-6 bottom-0 w-7 h-7 text-black  flex items-center justify-center rounded-full transition">
                                                <FaCamera className="text-xs" />
                                            </button>
                                        </div>

                                        <div className="text-center sm:text-left">
                                            <h2 className="text-md font-medium text-gray-800">Ratovonirina Nancy RAJOMALAHY</h2>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                               <MdOutlineEmail /> nancyrato@gmail.com
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Cliquez sur votre photo pour la modifier</p>
                                        </div>

                                    </div>            

                                        {/* formulaire */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                                <div className="flex border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <input 
                                                        type="text" 
                                                        defaultValue="Ratovonirina Nancy"
                                                        className="w-full  py-2.5 text-sm focus:outline-none "
                                                    />
                                                    <button className=" text-gray-400">
                                                        <MdOutlineEdit />
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                                <div className="border border-gray-300 rounded-lg px-4 flex focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <input 
                                                        type="text" 
                                                        defaultValue="RAJOMALAHY"
                                                        className="w-full  py-2.5 text-sm focus:outline-none "
                                                    />
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <MdOutlineEdit />
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                                <input 
                                                    type="email" 
                                                    defaultValue="nancyrato@gmail.com"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">GSM</label>
                                                <div className="flex">
                                                    <select className="border border-gray-300 border-r-0 rounded-l-lg px-2 py-2.5 text-sm focus:outline-none">
                                                        <option>🇲🇬</option>
                                                    </select>
                                                    <input 
                                                        type="tel" 
                                                        defaultValue="+261 34 89 684 32"
                                                        className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                                                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-red-600">
                                                    <option> Malagasy</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                                                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option>Sélectionner</option>
                                                    <option>Féminin</option>
                                                    <option>Masculin</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                <input 
                                                    type="date" 
                                                    defaultValue="2002-02-05"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Ville de résidence</label>
                                                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-red-600">
                                                    <option>📍 Fianarantsoa</option>
                                                </select>
                                            </div>

                                            {/* Bouton Enregistrer */}
                                            <div className="flex justify-end md:col-span-2">
                                                <button className="bg-gray-200 text-gray-500 px-6 py-2.5 rounded-lg text-sm font-medium">
                                                    Enregistrer
                                                </button>
                                            </div>

                                        </div>

                                </div>
                            )
                        }

                        {/* section parcours */}
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
                                                    value="nancyrato@gmail.com"
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
                                            <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
                                                <FaTrash />
                                                Supprimer
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
                                        className="hidden"
                                    />
                                    <div className="relative w-64 h-64 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden group hover:border-gray-400 transition">
                                        
                                        {photo ? (
                                            <img 
                                                src={photo} 
                                                alt="Photo de profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-8xl font-bold text-gray-400">R</span>
                                        )}
                                        
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
                                {/* En-tête */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">Prévisualisation CV</h2>
                                        <p className="text-sm text-gray-500">Visualisez et gérez votre CV</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1 text-sm text-gray-600 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                                            Infos
                                        </button>
                                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                            <FaExpandAlt className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Zone de prévisualisation */}
                                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white h-[400px] sm:h-[500px] md:h-[600px]">
                                    {!cvFile ? (
                                        <div className="h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                                            <FaFilePdf className="text-5xl sm:text-6xl md:text-7xl text-gray-300 mb-3 md:mb-4" />
                                            <p className="text-gray-500 text-sm mb-2 text-center">Aucun CV uploadé</p>
                                            <p className="text-gray-400 text-xs mb-4 md:mb-6 text-center px-4">Glissez votre CV ici ou</p>
                                            
                                            <label htmlFor="cv-upload" className="cursor-pointer inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-gray-50 transition text-xs md:text-sm font-medium shadow-sm w-full sm:w-auto">
                                                <input 
                                                    type="file" 
                                                    onChange={handleCvUpload} 
                                                    id="cv-upload"
                                                    accept=".pdf,.doc,.docx" 
                                                    className="hidden"
                                                />
                                                Choisir un fichier
                                            </label>
                                            <p className="text-xs text-gray-400 mt-4">PDF, DOC, DOCX (max 5MB)</p>
                                        </div>
                                    ) : (
                                        <div className="relative h-full">
                                            <iframe 
                                                src={cvUrl} 
                                                className="w-full h-full border-0"
                                                title="CV Preview"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Boutons en bas */}
                                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-3 md:mt-4">
                                    <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700  rounded-lg hover:bg-gray-50 transition font-medium">
                                        <FaUpload className="text-xs md:text-sm" />
                                        Change
                                    </button>
                                    <label className="flex-1 flex items-center justify-center gap-2 bg-[#1e3a5f] text-white py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition font-medium">
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx" 
                                            onChange={handleCvUpload}
                                            className="hidden"
                                        />
                                        <FaUpload className="text-xs md:text-sm" />
                                        Upload CV
                                    </label>
                                    <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700  rounded-lg hover:bg-gray-50 transition">
                                        <FaEye className="text-xs md:text-sm" />
                                        <span className="hidden sm:inline">Voir</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
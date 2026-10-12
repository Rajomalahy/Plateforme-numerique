import { FaExpandAlt, FaEye, FaExchangeAlt, FaChartLine, FaExclamationCircle} from 'react-icons/fa'
import { useState, useEffect } from 'react'



export default function Cv () {

    const [cvFile, setCvFile] = useState(null)
    const [cvUrl, setCvUrl] = useState(null)

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCvFile(file)
            setCvUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        return () => {
            if (cvUrl) URL.revokeObjectURL(cvUrl)
        }
    }, [cvUrl])

    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        "Compatibilité ATS (6)",
        "Coordonnées du candidat (5)",
        "Softs Skills du candidat (5)",
        "Expériences du candidat (2)",
        "Impact du candidat (3)"
    ]

    const niveaux = [
        
        {
            nom: "Niveau A",
            couleur: "bg-green-500",
            couleurTexte: "text-green-500",
            questions: [
                "La photo est-elle de bonne qualité ?",
                "Le fond de la photo de profil est-il neutre ?"
            ]
        },
        {
            nom: "Niveau B",
            couleur: "bg-yellow-500",
            couleurTexte: "text-yellow-500",
            questions: [
                "L'expression faciale de la photo de profil est-elle positive ?",
                "La photo de profil est-elle bien cadrée ?",
                "La photo de profil est-elle récente ?"
            ],
            voirPlus: 2
        },
        {
            nom: "Niveau C",
            couleur: "bg-red-500",
            couleurTexte: "text-red-500",
            questions: [
                "Le CV dispose-t-il d'une photo de profil ?"
            ]
        }
    ]

    return (
        <div className="rounded-t-md bg-[#F5F6FA] p-2 md:p-4">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">

                    {/* deux grid */}
                    <div className="xl:col-span-6">
                        {/* colonne gauche */}
                        <div className="bg-white border border-gray-200 rounded-lg px-3 md:px-6 py-3 md:py-4">
                            <div className="flex sm:flex-row justify-between items-center sm:items-center gap-3 mb-4">
                                <div>
                                    <h2 className="text-base md:text-lgfont-semibold text-gray-800">Prévisualisation CV</h2>
                                    <p className="text-xs md:text-sm text-gray-500">Visualisez et gérez votre CV</p>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none border border-gray-300 px-3 py-1.5 rounded-lg text-xs md:text-sm">Info</button>
                                    <button className="p-1 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg">
                                        <FaExpandAlt className=" text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <div className='h-[400px] md:h-[600px] relative'>
                                {!cvFile ? (
                                    <div className="h-full border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center text-center">
                                        <label className="text-xs md:text-sm  text-gray-600 cursor-pointer transition">
                                            <input 
                                                type="file" 
                                                accept=".pdf,.doc,.docx" 
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                            Choisir un fichier
                                        </label>
                                    </div>
                                ) : (
                                    <div className="h-full ">
                                        {/* Ici, tu afficheras le PDF avec react-pdf ou un iframe */}
                                        <iframe 
                                            src={(cvUrl)} 
                                            className="w-full h-full "
                                            title="CV Preview"
                                        />
                                                                           
                                    </div>
                                ) }
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-3 md:mt-4">
                                <button onClick={() => {setCvUrl(null)} } className="flex-1 flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 py-2 rounded-lg text-xs md:text-sm">
                                    <FaExchangeAlt />
                                        Changer
                                </button>
                                <label className='flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 cursor-pointer text-xs md:text-sm'>
                                    <input type="file" accept=".pdf,.doc,.docx"   onChange={handleFileUpload} className="hidden"/>
                                    Upload CV
                                </label>
                                <button className='flex-1 sm:flex-none flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2'>
                                    <FaEye/>
                                </button>
                            </div>
                        </div>
                    </div>

                        {/* colonne droite */}
                    <div className="xl:col-span-6 space-y-4 md:space-y-6">
                        <div>
                            <div>

                                <h2 className="text-base md:text-lg font-medium text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                                    <FaChartLine className="text-blue-500" />
                                    Analyse de votre CV
                                </h2>
                                
                                <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-3 md:py-4">
                                    <div className="">
                                        <p className="text-xs md:text-sm text-gray-600 ">Score global</p>
                                        <div className="flex items-baseline gap-1 mt-2 md:mt-3">
                                            <span className="text-lg md:text-xl font-bold text-gray-800">76</span>
                                            <span className="text-xs md:text-sm text-gray-400">/100</span>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className="h-full rounded-full bg-linear-to-r from-pink-500 to-orange-500 transition-all duration-500"
                                            style={{ width: '76%' }}
                                        ></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-3 md:py-4">
                            
                            <h3 className="text-base md:text-lg font-medium text-gray-800 flex items-center gap-2">
                                <FaExclamationCircle className="text-blue-500" />
                                Éléments à améliorer
                            </h3>

                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">Erreurs détectées dans votre CV</p>
                            
                            <div className='overflow-x-auto pb-2 -mx-2 px-2'>
                                <div className="flex min-w-max gap-1">
                                    {tabs.map((tab, id) => (
                                        <button key={id} onClick={() => setActiveTab(id)} className={ `text-xs md:text-sm font-medium whitespace-nowrap border-b-2 px-2 md:px-3 pb-2 transition ${activeTab === id ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'}` }>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 mt-3">
                                {niveaux.map((niveau, id) => (
                                    <div key={id}>
                                        <div className='flex items-center gap-2'>
                                            <div className={`w-2.5 h-2.5 rounded-full ${niveau.couleur}`}></div>
                                            <h4 className="font-medium text-gray-800 text-sm md:text-base">{niveau.nom}</h4>
                                        </div>

                                        <div className='shadow-md border border-gray-200 rounded-xl mb-3 md:mb-4 mt-2 px-3 md:px-4 py-2 md:py-3'>
                                            <p className="text-xs md:text-sm font-medium text-green-600 mb-2">
                                                Questions correctes :
                                            </p>

                                            <ul className="space-y-2">
                                                {niveau.questions.map((question,id) => (
                                                    <li key={id}  className="flex items-start gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${niveau.couleur} mt-1.5 flex-shrink-0`}></div>
                                                        <span className="text-xs md:text-sm text-gray-700 flex-1">{question}</span>
                                                        <span className="text-xs text-green-600 font-medium flex-shrink-0">correcte</span>
                                                    </li>
                                                ) )}
                                            </ul>

                                            {niveau.voirPlus && (
                                                <button className="w-full text-center text-xs md:text-sm mt-3 pt-2 md:pt-3 border-t border-gray-100 text-blue-500 hover:text-blue-700">
                                                    Voir plus ({niveau.voirPlus})
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) )}
                            </div>

                        </div>
                    </div>
                    
            </div>
        </div>
    )
}
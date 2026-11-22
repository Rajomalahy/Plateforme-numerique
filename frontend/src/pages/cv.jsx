import { FaExpandAlt, FaChartLine, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { analyserCv, getMonCv } from '../Services/Service'

export default function Cv() {
    const [cvFile, setCvFile] = useState(null)
    const [cvUrl, setCvUrl] = useState(null)
    const [analyse, setAnalyse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('compatibiliteATS')

    const categories = {
        compatibiliteATS: "Compatibilité ATS",
        coordonnees: "Coordonnées",
        softSkills: "Soft Skills",
        experiences: "Expériences",
        impact: "Impact"
    }

    // ✅ MODIFIÉ : Charge le CV ET son analyse au démarrage
    useEffect(() => {
        const chargerCvExistant = async () => {
            try {
                const data = await getMonCv()
                if (data.urlCv) {
                    const fullUrl = `http://localhost:5103${data.urlCv}`
                    setCvUrl(fullUrl)
                    setCvFile({ name: "CV enregistré" })

                    // ✅ NOUVEAU : Si l'analyse est présente, on l'affiche immédiatement
                    if (data.analyse) {
                        setAnalyse(data.analyse)
                    }
                }
            } catch (err) {
                console.log("Aucun CV existant trouvé.")
            }
        }
        chargerCvExistant()
    }, [])

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setCvFile(file)
        setCvUrl(URL.createObjectURL(file))
        setLoading(true)
        setError('')
        setAnalyse(null)

        try {
            const result = await analyserCv(file)
            setAnalyse(result)
        } catch (err) {
            console.error("Erreur analyse CV:", err)
            setError(err.message || "Une erreur est survenue. Vérifiez que c'est un PDF texte.")
        } finally {
            setLoading(false)
        }
    }

    const getProgressColor = (score, maxScore) => {
        const percentage = (score / maxScore) * 100
        if (percentage >= 70) return 'bg-green-500'
        if (percentage >= 40) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    return (
        <div className="rounded-t-md bg-[#F5F6FA] p-2 md:p-4 min-h-screen">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">

                {/* === COLONNE GAUCHE : Prévisualisation === */}
                <div className="xl:col-span-6">
                    <div className="bg-white border border-gray-200 rounded-lg px-3 md:px-6 py-3 md:py-4 h-full flex flex-col">
                        <div className="flex justify-between items-center gap-3 mb-4">
                            <div>
                                <h2 className="text-base md:text-lg font-semibold text-gray-800">Mon CV</h2>
                                <p className="text-xs md:text-sm text-gray-500">Visualisez et analysez votre document</p>
                            </div>
                        </div>

                        <div className='flex-1 relative min-h-[400px] md:min-h-[600px]'>
                            {!cvFile ? (
                                <div className="h-full border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center text-center p-6">
                                    {loading ? (
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                                            <p className="text-sm text-gray-600">Analyse en cours...</p>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer bg-[#1e3a5f] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition shadow-sm">
                                            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                                            Choisir un fichier CV (PDF)
                                        </label>
                                    )}
                                    {error && <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded border border-red-200">{error}</p>}
                                </div>
                            ) : (
                                <div className="h-full border border-gray-200 rounded-md overflow-hidden bg-gray-100">
                                    <iframe src={cvUrl} className="w-full h-full" title="CV Preview" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* === COLONNE DROITE : Analyse === */}
                <div className="xl:col-span-6 space-y-4 md:space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-4">
                        <h2 className="text-base md:text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <FaChartLine className="text-blue-500" />
                            Analyse de votre CV
                        </h2>

                        {analyse ? (
                            <div>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-3xl font-bold text-gray-800">{analyse.scoreGlobal}</span>
                                    <span className="text-sm text-gray-400">/ 100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${getProgressColor(analyse.scoreGlobal, 100)}`}
                                        style={{ width: `${analyse.scoreGlobal}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mt-2 italic">Uploadez votre CV pour obtenir une analyse détaillée.</p>
                        )}
                    </div>

                    {analyse && (
                        <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-4">
                            <h3 className="text-base md:text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
                                <FaExclamationCircle className="text-blue-500" />
                                Éléments à améliorer
                            </h3>

                            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 border-b border-gray-100">
                                {Object.entries(categories).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`text-xs md:text-sm font-medium whitespace-nowrap px-3 py-2 rounded-t-lg transition ${activeTab === key ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {(() => {
                                    const currentCategory = analyse[activeTab];
                                    const percentage = (currentCategory.score / currentCategory.maxScore) * 100;

                                    return (
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-700">Score de la catégorie</span>
                                                <span className="text-sm font-bold text-gray-800">{currentCategory.score} / {currentCategory.maxScore}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(currentCategory.score, currentCategory.maxScore)}`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>

                                            {currentCategory.elementsAmeliorer.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {currentCategory.elementsAmeliorer.map((element, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                                                            <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-gray-700">{element}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
                                                    <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                                                    <span className="text-sm font-medium text-green-800">Excellent ! Aucun élément à améliorer.</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
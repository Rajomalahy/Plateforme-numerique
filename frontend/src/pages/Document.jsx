import { useState, useEffect } from 'react'
import { FaCloudUploadAlt, FaIdCard, FaGraduationCap, FaFileAlt, FaAward, FaDownload, FaTrash, FaFile, FaSpinner } from 'react-icons/fa'
import { getMesDocuments, uploadDocument, deleteDocument } from '../Services/Service'

export default function Document() {
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [selectedType, setSelectedType] = useState('diplome')

    const API_BASE_URL = 'http://localhost:5137' // Adapte si ton port est différent

    useEffect(() => {
        loadDocuments()
    }, [])

    const loadDocuments = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const data = await getMesDocuments(token)
            setDocuments(data)
        } catch (err) {
            console.error("Erreur chargement documents:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        try {
            const token = localStorage.getItem('token')
            await uploadDocument(file, selectedType, token)
            
            // Réinitialiser l'input et recharger la liste
            e.target.value = null
            await loadDocuments()
        } catch (err) {
            alert(err.response?.data?.message || "Erreur lors de l'upload")
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce document ?")) return
        try {
            const token = localStorage.getItem('token')
            await deleteDocument(id, token)
            setDocuments(documents.filter(doc => doc.id !== id))
        } catch (err) {
            alert(err.response?.data?.message || "Erreur lors de la suppression")
        }
    }

    // ✅ CORRECTION : FaFile est bien utilisé ici comme fallback
    const getIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'cv': return <FaIdCard className="text-3xl text-blue-600" />
            case 'diplome': return <FaGraduationCap className="text-3xl text-blue-600" />
            case 'attestation': return <FaFileAlt className="text-3xl text-blue-600" />
            case 'certificat': return <FaAward className="text-3xl text-blue-600" />
            default: return <FaFile className="text-3xl text-blue-600" /> 
        }
    }

    return (
        <div className="px-6 md:px-10 py-4">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Mes documents</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gérez votre CV, vos diplômes, attestations et certificats.
                </p>
            </div>

            {/* Zone d'upload */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                    <FaCloudUploadAlt className="text-gray-600" />
                    Importer un nouveau document
                </h2>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[200px]"
                    >
                        <option value="diplome">Diplôme</option>
                        <option value="certificat">Certificat / Formation</option>
                        <option value="attestation">Attestation de travail</option>
                        <option value="cv">CV (Version mise à jour)</option>
                        <option value="autre">Autre document</option>
                    </select>

                    <label className="flex-1 block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition w-full">
                        <input 
                            type="file" 
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <FaSpinner className="animate-spin text-3xl text-blue-600 mb-2" />
                                <p className="text-sm text-blue-600">Upload en cours...</p>
                            </div>
                        ) : (
                            <>
                                <FaCloudUploadAlt className="text-3xl text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-blue-600">Cliquez pour parcourir</span> ou glissez un fichier
                                </p>
                                <p className="text-xs text-gray-400">PDF, JPG, PNG, DOC — 5 Mo max</p>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Grille des documents */}
            {loading ? (
                <div className="text-center py-10"><FaSpinner className="animate-spin text-3xl text-blue-600" /></div>
            ) : documents.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 text-gray-500">
                    Aucun document ajouté pour le moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-md transition relative group">
                            
                            <div className="mb-3 p-3 bg-blue-50 rounded-full">
                                {getIcon(doc.typeDocument)}
                            </div>

                            <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 w-full" title={doc.titre}>
                                {doc.titre}
                            </h3>

                            <p className="text-xs text-gray-500 mb-4">
                                {doc.dateAjout}
                            </p>

                            <div className="flex gap-2 mt-auto w-full">
                                <a 
                                    href={`${API_BASE_URL}${doc.urlFichier}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition text-gray-600 flex items-center justify-center gap-1 text-sm"
                                >
                                    <FaDownload /> Voir
                                </a>
                                <button 
                                    onClick={() => handleDelete(doc.id)}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition text-gray-600 flex items-center justify-center gap-1 text-sm"
                                >
                                    <FaTrash /> Suppr.
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
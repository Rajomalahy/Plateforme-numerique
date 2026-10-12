import { useState } from 'react'
import { FaCloudUploadAlt, FaIdCard, FaGraduationCap, FaFileAlt, FaAward, FaDownload, FaTrash } from 'react-icons/fa'

export default function Document () {

    const [documents, setDocuments] = useState([
        {
            id: 1,
            titre: 'CV — Hery Andrianina.pdf',
            date: 'Mis à jour le 10 juil. 2026',
            type: 'cv',
            icon: <FaIdCard className="text-3xl text-blue-600" />
        },
        {
            id: 2,
            titre: 'Diplôme — Master Informatique.pdf',
            date: 'Ajouté le 2 mars 2024',
            type: 'diplome',
            icon: <FaGraduationCap className="text-3xl text-blue-600" />
        },
        {
            id: 3,
            titre: 'Attestation de travail — StartUp Mada.pdf',
            date: 'Ajouté le 14 déc. 2022',
            type: 'attestation',
            icon: <FaFileAlt className="text-3xl text-blue-600" />
        },
        {
            id: 4,
            titre: 'Certificat — Azure Fundamentals.pdf',
            date: 'Ajouté le 5 sept. 2023',
            type: 'certificat',
            icon: <FaAward className="text-3xl text-blue-600" />
        }
    ])

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const newDoc = {
                id: Date.now(),
                titre: file.name,
                date: 'Ajouté à l\'instant',
                type: 'document',
                icon: <FaFileCheck className="text-3xl text-blue-600" />
            }
            setDocuments([...documents, newDoc])
        }
    }

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id))
    }

    return (
        <div className="px-10 py-4">

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

                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                    <input 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                        Glissez-déposez un fichier ici, ou <span className="text-blue-600">cliquez pour parcourir</span>
                    </p>
                    <p className="text-xs text-gray-400">
                        PDF, JPG, PNG — 5 Mo maximum
                    </p>
                </label>
            </div>

            {/* Grille des documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-md transition">
                        
                        {/* Icône */}
                        <div className="mb-3">
                            {doc.icon}
                        </div>

                        {/* Titre */}
                        <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                            {doc.titre}
                        </h3>

                        {/* Date */}
                        <p className="text-xs text-gray-500 mb-4">
                            {doc.date}
                        </p>

                        {/* Boutons */}
                        <div className="flex gap-2 mt-auto">
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600">
                                <FaDownload />
                            </button>
                            <button 
                                onClick={() => handleDelete(doc.id)}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition text-gray-600"
                            >
                                <FaTrash />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaLock } from 'react-icons/fa'

export default function ParametresEntreprise() {
    const navigate = useNavigate()
    
    const handleDeleteAccount = () => {
        if(window.confirm("Êtes-vous sûr ? Cette action supprimera définitivement votre entreprise et toutes vos offres.")) {
            // Appel API de suppression ici
            localStorage.clear()
            navigate('/signin')
        }
    }

    return (
        <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du compte</h2>
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaLock /> Sécurité</h3>
                <p className="text-sm text-gray-500 mb-4">La modification du mot de passe sera disponible prochainement via l'administrateur.</p>
            </div>

            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <h3 className="font-semibold text-red-800 mb-2">Zone de danger</h3>
                <p className="text-sm text-red-600 mb-4">La suppression de votre compte est irréversible. Toutes vos offres d'emploi et données seront définitivement effacées.</p>
                <button onClick={handleDeleteAccount} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    <FaTrash /> Supprimer mon compte
                </button>
            </div>
        </div>
    )
}
import axios from 'axios'


const API_URL = 'http://localhost:5137/api'

export const registerUser = async (userData) => {
    try {

        const response = await axios.post(`${API_URL}/Auth/register`, userData)
        return response.data;

    } catch (error) {

        if (error.response) {
            // Cas 1 : Erreurs de validation du modèle (ex: mot de passe < 6 caractères)
            if (error.response.data.errors) {
                // On prend le premier message d'erreur du dictionnaire
                const firstErrorKey = Object.keys(error.response.data.errors)[0];
                const errorMessage = error.response.data.errors[firstErrorKey][0];
                throw new Error(errorMessage);
            } 
            // Cas 2 : Erreurs logiques (ex: "Cet email est déjà utilisé")
            else if (error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        } else if (error.request) {
            throw new Error('Impossible de joindre le serveur. Vérifiez que le backend est lancé.');
        } else {
            throw new Error('Une erreur inattendue est survenue.');
        }
    }

}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Auth/login`, userData);
        return response.data; // Contient : { token, userId, email, role, estProfilComplet }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error('Impossible de joindre le serveur. Vérifiez que le backend est lancé.');
        } else {
            throw new Error('Une erreur inattendue est survenue.');
        }
    }
}

export const updateProfil = async (dataToSend, token) => {
    const response = await axios.put(`${API_URL}/User/profil`, dataToSend, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const uploadCv = async (file, token) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(`${API_URL}/Upload/cv`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const uploadPhoto = async (file, token) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(`${API_URL}/Upload/cv`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const getProfil = async (token) => {
    const response = await axios.get(`${API_URL}/User/profil`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return response.data
}

export const deleteCompte = async (token) => {
    const response = await axios.delete(`${API_URL}/User/compte`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return response.data
}

export const getCandidats = async () => {
    const response = await axios.get(`${API_URL}/User/candidats`)
    return response.data
}

export const getProfilEntreprise = async (token) => {
    const response = await axios.get(`${API_URL}/User/profil-entreprise`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

export const updateProfilEntreprise = async (dataToSend, token) => {
    const response = await axios.put(`${API_URL}/User/profil-entreprise`, dataToSend, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const uploadLogo = async (file, token) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(`${API_URL}/Upload/cv`, formData, { 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

// Créer un nouvel administrateur
export const creerAdmin = async (data, token) => {
    const response = await axios.post(`${API_URL}/Admin/creer`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

// Modifier un administrateur
export const updateAdmin = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/Admin/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    return response.data;
}

// Supprimer un administrateur
export const deleteAdmin = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Admin/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Récupérer la liste des administrateurs
export const getAdmins = async (token) => {
    const response = await axios.get(`${API_URL}/Admin/liste`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Récupérer toutes les villes (public)
export const getVilles = async () => {
    const response = await axios.get(`${API_URL}/Ville`);
    return response.data;
}

// Créer une ville (admin)
export const createVille = async (data, token) => {
    const response = await axios.post(`${API_URL}/Ville`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

// Modifier une ville (admin)
export const updateVille = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/Ville/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

// Supprimer une ville (admin)
export const deleteVille = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Ville/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

// Compétences
export const getCompetences = async () => {
    const response = await axios.get(`${API_URL}/Competence`)
    return response.data
}

export const createCompetence = async (data, token) => {
    const response = await axios.post(`${API_URL}/Competence`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

export const updateCompetence = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/Competence/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

export const deleteCompetence = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Competence/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}


export const getMesOffres = async (token) => {
    const res = await axios.get(`${API_URL}/Offre/mes-offres`, { headers: { 'Authorization': `Bearer ${token}` } })
    return res.data
}

export const creerOffre = async (data, token) => {
    const res = await axios.post(`${API_URL}/Offre/creer`, data, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } })
    return res.data
}

export const updateOffre = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/Offre/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    return response.data
}

export const deleteOffre = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Offre/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

export const getOffreById = async (id, token) => {
    const response = await axios.get(`${API_URL}/Offre/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Voir les candidatures reçues sur mes offres (Entreprise)
export const getMesCandidaturesEntreprise = async (token) => {
    const response = await axios.get(`${API_URL}/Offre/mes-candidatures`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Changer le statut d'une candidature (Entreprise)
export const updateStatutCandidature = async (id, nouveauStatut, token) => {
    const response = await axios.put(`${API_URL}/Offre/candidature/${id}/statut`, `"${nouveauStatut}"`, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

// Postuler à une offre
export const postuler = async (idOffre, token) => {
    const response = await axios.post(`${API_URL}/Candidature/postuler/${idOffre}`, null, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Voir mes candidatures (Candidat)
export const getMesCandidaturesCandidat = async (token) => {
    const response = await axios.get(`${API_URL}/Candidature/mes-candidatures`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Récupérer toutes les offres actives (pour la liste publique)
export const getOffresPubliques = async () => {
    const response = await axios.get(`${API_URL}/Offre/offres-publiques`)
    return response.data
}

// Annuler une candidature (Candidat)
export const annulerCandidature = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Candidature/${id}`, {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    })
    return response.data
}

// Récupérer tous les utilisateurs
export const getUtilisateurs = async (token) => {
    const response = await axios.get(`${API_URL}/Admin/utilisateurs`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Bloquer/Débloquer un utilisateur
export const bloquerUtilisateur = async (id, token) => {
    const response = await axios.put(`${API_URL}/Admin/utilisateur/${id}/bloquer`, null, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Supprimer un utilisateur
export const supprimerUtilisateur = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Admin/utilisateur/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Voir le profil détaillé d'un utilisateur
export const getProfilUtilisateur = async (id, token) => {
    const response = await axios.get(`${API_URL}/Admin/utilisateur/${id}/profil`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}


// Récupérer toutes les offres (Admin)
export const getAllOffresAdmin = async (token) => {
    const response = await axios.get(`${API_URL}/Offre/admin/toutes`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}

// Supprimer une offre (Admin)
export const adminDeleteOffre = async (id, token) => {
    const response = await axios.delete(`${API_URL}/Offre/admin/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
}
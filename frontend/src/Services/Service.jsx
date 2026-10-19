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

export const getMesOffres = async (token) => {
    const res = await axios.get(`${API_URL}/Offre/mes-offres`, { headers: { 'Authorization': `Bearer ${token}` } });
    return res.data;
}

export const creerOffre = async (data, token) => {
    const res = await axios.post(`${API_URL}/Offre/creer`, data, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    return res.data;
}

export const getMesCandidatures = async (token) => {
    const res = await axios.get(`${API_URL}/Offre/mes-candidatures`, { headers: { 'Authorization': `Bearer ${token}` } });
    return res.data;
}

export const updateStatutCandidature = async (id, statut, token) => {
    const res = await axios.put(`${API_URL}/Offre/candidature/${id}/statut`, `"${statut}"`, { 
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } 
    });
    return res.data;
}
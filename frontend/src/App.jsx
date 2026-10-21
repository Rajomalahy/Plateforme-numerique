import DashboardLayout from './layouts/DashboardLayout'
import DashboardCandidat from './pages/DashboardCandidat'
import DashboardEntreprise from './layouts/DashboardEntreprise'
import Cv from './pages/cv'
import Candidature from './pages/Candidature'
import Recommandation from './pages/Recommandation'
import Entretien from './pages/Entretien'
import Profil from './pages/Profil'
import Document from './pages/Document'
import Notifications from './pages/Notification'
import Messages from './pages/Message'
import ListeOffres from './pages/ListeOffre'

import { Routes, Route } from 'react-router-dom'

import Header from './layouts/Header'
import Acceuil from './pages/Autres/Acceuil'

import PageEntreprise from './pages/Autres/PageEntreprise'
import PageDemandeur from './pages/Autres/PageDemandeur'
import PageOffre from './pages/Autres/PageOffre'

import DetailOffre from './pages/Detail/DetailOffre'
import DetailEntreprise from './pages/Detail/DetailEntreprise'

import Signin from './login/SignIn'
import Signup from './login/SignUp'

import EspaceEntreprise from './pages/entreprise/EspaceEntreprise'
import DashboardEntrepriseAccueil from './pages/entreprise/DashboardAcceuil'
import PublierOffre from './pages/entreprise/Publier'
import MesOffres from './pages/entreprise/MesOffres'
import MesCandidatures from './pages/entreprise/Candidature'
import ParametresEntreprise from './pages/entreprise/Parametre'

import GestionAdmins from './pages/admin/GestionAdmins'
import DashboardAdmin from './layouts/DashboardAdmin'
import SignInAdmin from './login/SignInAdmin'
import Compétences from './pages/admin/Competence'
import Ville from './pages/admin/Ville'
import ModerationOffres from './pages/admin/ModerationOffres'
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs'
import Search from './pages/Autres/search'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route index element={<Acceuil />} />
          <Route path="offre" element={<PageOffre />} /> 
          <Route path="entreprise" element={<PageEntreprise />} />
          <Route path="demandeur" element={<PageDemandeur />} /> 
          <Route path="detailoffre" element={<DetailOffre />} />
          <Route path="detailEntreprise" element={<DetailEntreprise />} />

        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardCandidat />} />
          <Route path="cv" element={<Cv />} />
          <Route path="profil" element={<Profil />} />

          <Route path="offre" element={<Recommandation />} />
          <Route path="candidature" element={<Candidature />} />
          <Route path="listeOffre" element={<ListeOffres />} />
          <Route path="entretien" element={<Entretien />} />

          <Route path="message" element={<Messages />} />
          <Route path="notification" element={<Notifications />} />

          <Route path="document" element={<Document />} />

          <Route path="*" element={<Search />} />
        </Route>

        <Route path="/dashboardentreprise" element={<DashboardEntreprise />}>
          <Route index element={<DashboardEntrepriseAccueil />} />
          <Route path="profil" element={<EspaceEntreprise />} />
          <Route path="offres" element={<MesOffres />} />
          <Route path="publier" element={<PublierOffre />} />
          <Route path="offres/modifier/:id" element={<PublierOffre />} />
          <Route path="candidatures" element={<MesCandidatures />} />
          <Route path="parametres" element={<ParametresEntreprise />} />
        </Route>

        <Route path="/admin/login" element={<SignInAdmin />} />

        <Route path="/admin" element={<DashboardAdmin />}>
            <Route index element={
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue dans le panneau d'administration</h2>
                    <p className="text-gray-600">Sélectionnez une option dans le menu pour commencer.</p>
                </div>
            } />
            <Route path="villes" element={<Ville />} />
            <Route path="admins" element={<GestionAdmins />} />
            <Route path="competences" element={<Compétences />} />
            <Route path="utilisateurs" element={<GestionUtilisateurs />} />
            <Route path="moderation-offres" element={<ModerationOffres />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App

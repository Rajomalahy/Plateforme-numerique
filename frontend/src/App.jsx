import DashboardLayout from './layouts/DashboardLayout'
import DashboardCandidat from './pages/DashboardCandidat'
import Cv from './pages/cv'
import Candidature from './pages/Candidature'
import Recommandation from './pages/Recommandation'
import Entretien from './pages/Entretien'
import Profil from './pages/Profil'
import Document from './pages/Document'
import Notifications from './pages/Notification'
import Messages from './pages/Message'

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
          <Route path="entretien" element={<Entretien />} />

          <Route path="message" element={<Messages />} />
          <Route path="notification" element={<Notifications />} />

          <Route path="document" element={<Document />} />

          {/* <Route path="deconnexion" element={<Contact />} /> */}

          <Route path="*" element={<Search />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

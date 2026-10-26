import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function Footer() {
    
    const secteurs = [
        'Informatique / Numérique',
        'Agronomie / Agriculture',
        'Biologie / Sciences',
        'Commercial / Vente',
        'Confection / Artisanat',
        'Conseiller client / Call center',
        'Consultant / Enquêteur',
        'Droit / Juriste',
        'Enseignement / Formation',
        'Événementiel',
        'Gestion / Comptabilité / Finance',
        'Humanitaire / Social',
        'Import / Export',
        'Marketing / Communication',
        'Ressources humaines',
        'Santé / Médical'
    ]

    return (
        <footer className="bg-[#0f172a] text-gray-300">
            
            {/* ========== PARTIE PRINCIPALE ========== */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* Colonne 1 : Logo + Description + Réseaux */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <h2 className="text-2xl font-extrabold text-white">
                                Job<span className="text-[#3730A3]">MADA</span>
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Portail pour l'emploi et l'insertion professionnelle à Madagascar. Nous connectons les talents aux opportunités.
                        </p>
                        
                        {/* Réseaux sociaux */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#3730A3] rounded-lg flex items-center justify-center transition-colors duration-300">
                                <FaLinkedinIn className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#3730A3] rounded-lg flex items-center justify-center transition-colors duration-300">
                                <FaFacebookF className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#3730A3] rounded-lg flex items-center justify-center transition-colors duration-300">
                                <FaInstagram className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 : Accès rapide */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-5">Accès rapide</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Accueil</Link>
                            </li>
                            <li>
                                <Link to="/offre" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Offres d'emploi</Link>
                            </li>
                            <li>
                                <Link to="/entreprise" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Entreprises</Link>
                            </li>
                            <li>
                                <Link to="/demandeur" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Espace candidat</Link>
                            </li>
                            <li>
                                <Link to="/article" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Conseils carrière</Link>
                            </li>
                            <li>
                                <Link to="/apropos" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Qui sommes-nous ?</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Contactez-nous */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-5">Contactez-nous</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#3730A3] mt-1 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">Lot II J 123, Antananarivo 101, Madagascar</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="text-[#3730A3] mt-1 flex-shrink-0" />
                                <a href="mailto:contact@jobmada.mg" className="text-gray-400 hover:text-white text-sm transition">contact@jobmada.mg</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="text-[#3730A3] mt-1 flex-shrink-0" />
                                <a href="tel:+261340000000" className="text-gray-400 hover:text-white text-sm transition">+261 34 00 000 00</a>
                            </li>
                            <li className="pt-3">
                                <Link 
                                    to="/contact" 
                                    className="inline-block bg-[#3730A3] hover:bg-[#2e2885] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
                                >
                                    Formulaire de contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Offres par secteurs (2 sous-colonnes) */}
                    <div className="md:col-span-1 lg:col-span-1">
                        <h3 className="text-white font-bold text-lg mb-5">Offres par secteurs</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {secteurs.map((secteur, index) => (
                                <Link 
                                    key={index} 
                                    to={`/offre?secteur=${encodeURIComponent(secteur)}`}
                                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm inline-block"
                                >
                                    {secteur}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ========== BARRE LÉGALE ========== */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {/* Liens légaux */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm">
                            <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition">Mentions légales</Link>
                            <Link to="/cgv" className="text-gray-400 hover:text-white transition">Conditions générales</Link>
                            <Link to="/confidentialite" className="text-gray-400 hover:text-white transition">Protection des données</Link>
                        </div>

                        <p className="text-sm text-gray-500 text-center md:text-right">
                            © 2024 - 2026 JobMADA Madagascar. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>

        </footer>
    )
}
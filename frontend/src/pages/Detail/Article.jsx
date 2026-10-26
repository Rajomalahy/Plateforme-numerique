import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaUser, FaShareAlt, FaCheckCircle, FaLightbulb } from 'react-icons/fa'

export default function Article() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen mt-20 bg-gray-50 pb-20">
            
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3730A3] transition mb-4"
                    >
                        <FaArrowLeft /> Retour aux conseils
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="hover:text-[#3730A3] cursor-pointer">Accueil</span>
                        <span>/</span>
                        <span className="hover:text-[#3730A3] cursor-pointer">Conseils Carrière</span>
                        <span>/</span>
                        <span className="text-gray-800 font-medium">Fonction Publique</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                
                <article className="max-w-4xl mx-auto">
                    {/* Badge Catégorie */}
                    <span className="inline-block bg-[#3730A3] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        Fonction Publique
                    </span>

                    {/* Titre */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Comment réussir un entretien pour un poste dans la Fonction Publique à Madagascar ?
                    </h1>

                    {/* Méta-données (Auteur, Date, Lecture) */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500 mb-6 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <FaUser className="text-gray-500" />
                            </div>
                            <span>Par <span className="font-semibold text-gray-800">Service RH</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#3730A3]" />
                            <span>15 Octobre 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">5 min de lecture</span>
                        </div>
                        <button className="ml-auto flex items-center gap-2 text-[#3730A3] hover:underline">
                            <FaShareAlt /> Partager
                        </button>
                    </div>

                    {/* Image Principale */}
                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                        <img 
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                            alt="Entretien fonction publique" 
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>

                    {/* ========== CONTENU PRINCIPAL (2 Colonnes sur Desktop) ========== */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Colonne Gauche : Le Texte de l'article (Prend 2/3 de la largeur) */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed">
                                
                                <p className="text-xl text-gray-600 font-medium mb-6 border-l-4 border-[#3730A3] pl-4 italic">
                                    Décrocher un poste dans la fonction publique demande une préparation spécifique. Voici les clés pour faire la différence le jour J.
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Comprenez les valeurs du service public</h2>
                                <p className="mb-4">
                                    Contrairement au secteur privé où la rentabilité est souvent le mot d'ordre, la fonction publique met l'accent sur <strong>l'intérêt général, la neutralité et la continuité du service</strong>. Lors de votre entretien, montrez que vous avez intégré ces notions.
                                </p>
                                <p className="mb-6">
                                    Renseignez-vous sur le ministère ou l'institution spécifique que vous visez. Connaître ses missions récentes ou ses projets en cours est un atout majeur qui prouve votre sérieux.
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Maîtrisez votre parcours et le concours</h2>
                                <p className="mb-4">Les recruteurs attendent une cohérence totale entre :</p>
                                <ul className="list-none space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span>Votre formation académique (Diplômes, spécialités).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span>Vos expériences passées, même les stages.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span>Le référentiel métier du poste visé.</span>
                                    </li>
                                </ul>

                                {/* Encadré Conseil Pro */}
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-8 flex gap-4">
                                    <FaLightbulb className="text-[#3730A3] text-2xl flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-[#3730A3] mb-2">Le Conseil en Or</h3>
                                        <p className="text-sm text-gray-700">
                                            Préparez 2 ou 3 questions pertinentes à poser au jury à la fin de l'entretien (ex: "Quelles sont les priorités de ce service pour l'année à venir ?"). Cela montre votre proactivité.
                                        </p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. La posture et la présentation</h2>
                                <p className="mb-6">
                                    La fonction publique reste un milieu formel. Une tenue professionnelle (costume-cravate pour les hommes, tailleur ou tenue de ville sobre pour les femmes) est fortement recommandée. Arrivez 15 minutes en avance, soyez poli avec tout le monde, du gardien au membre du jury.
                                </p>

                            </div>

                            {/* Tags en bas d'article */}
                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3">Mots-clés :</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Entretien', 'Fonction Publique', 'Concours', 'Madagascar', 'Conseils RH'].map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 cursor-pointer transition">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Colonne Droite : Sidebar (Prend 1/3 de la largeur, Sticky sur Desktop) */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                
                                {/* Sommaire */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-[#3730A3] rounded-full"></span>
                                        Sommaire
                                    </h3>
                                    <ul className="space-y-3 text-sm">
                                        <li><a href="#" className="text-gray-600 hover:text-[#3730A3] hover:underline transition">1. Comprenez les valeurs du service public</a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-[#3730A3] hover:underline transition">2. Maîtrisez votre parcours et le concours</a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-[#3730A3] hover:underline transition">3. La posture et la présentation</a></li>
                                    </ul>
                                </div>

                                {/* Carte CTA (Appel à l'action) */}
                                <div className="bg-gradient-to-br from-[#3730A3] to-[#0369A1] rounded-xl shadow-lg p-6 text-white text-center">
                                    <h3 className="font-bold text-lg mb-2">Vous cherchez un poste ?</h3>
                                    <p className="text-sm text-blue-100 mb-4">
                                        Des centaines d'offres dans la fonction publique et le privé vous attendent.
                                    </p>
                                    <button 
                                        onClick={() => navigate('/offre')}
                                        className="w-full bg-white text-[#3730A3] font-bold py-3 rounded-lg hover:bg-gray-100 transition shadow-md"
                                    >
                                        Voir les offres d'emploi
                                    </button>
                                </div>

                            </div>
                        </aside>

                    </div>
                </article>
            </div>

            {/* ========== SECTION CTA FINAL ========== */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Prêt à décrocher votre prochain poste ?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Créez votre profil dès maintenant et laissez les meilleures opportunités venir à vous grâce à notre système de recommandation intelligent.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate('/signup')}
                            className="bg-[#3730A3] hover:bg-[#2e2885] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
                        >
                            Créer un compte candidat
                        </button>
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            Nous contacter
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}
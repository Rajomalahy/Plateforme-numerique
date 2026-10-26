import { useState } from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaChevronRight } from 'react-icons/fa'


export default function Contact() {
    const [openFaq, setOpenFaq] = useState(null) 

    const [formData, setFormData] = useState({ nom: '', email: '', sujet: 'Question générale', message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        alert("Message envoyé !")

        setFormData({ nom: '', email: '', sujet: 'Question générale', message: '' })

    }

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    const faqs = [
        { question: "Comment publier une offre ?", reponse: "Connectez-vous à votre espace Entreprise, cliquez sur 'Publier une offre' et remplissez le formulaire. Votre offre sera soumise à la modération de l'administrateur avant publication." },
        { question: "Comment suivre mes candidatures ?", reponse: "Rendez-vous dans votre espace Candidat, rubrique 'Mes candidatures'. Vous y verrez le statut en temps réel de chaque envoi (En attente, En entretien, Accepté, Refusé)." },
        { question: "Sous quel délai vous répondez-vous ?", reponse: "Notre équipe s'efforce de répondre à toutes les demandes de support sous 24 à 48 heures ouvrables." }
    ]

    return (
        <div className="min-h-screen mt-10 bg-gray-50">            

            <section className="bg-gradient-to-br from-[#3730A3] via-[#3F3FB8] to-[#0369A1] text-white py-16 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
                    <p className="text-md text-gray-200 max-w-2xl mx-auto mb-10">
                        Une question, une suggestion ou une offre à publier ? Écrivez-nous, nous répondons dès que possible.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 -mt-16 relative z-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3730A3] focus:border-transparent outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nom@exemple.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3730A3] focus:border-transparent outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                                <select name="sujet" value={formData.sujet} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3730A3] focus:border-transparent outline-none bg-white">
                                    <option>Question générale</option>
                                    <option>Problème technique</option>
                                    <option>Partenariat entreprise</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Écrivez votre message ici..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3730A3] focus:border-transparent outline-none resize-none" required></textarea>
                            </div>
                            <button type="submit" className="w-full md:w-auto bg-[#3730A3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2e2885] transition shadow-md">
                                Envoyer le message
                            </button>
                        </form>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0369A1] rounded-2xl shadow-xl p-8 md:p-10 text-white flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                        
                        <div className="space-y-6 flex-1">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200">Adresse</p>
                                    <p className="font-medium">Lot II J 123, Antananarivo<br/>Madagascar</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200">E-mail</p>
                                    <p className="font-medium">contact@votre-site.mg</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200">Téléphone</p>
                                    <p className="font-medium">+261 34 00 000 00</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaClock className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200">Horaires</p>
                                    <p className="font-medium">Lundi au vendredi<br/>08h00 - 17h00</p>
                                </div>
                            </div>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="mt-8 pt-6 border-t border-white/20 flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white hover:text-[#1e3a8a] rounded-full flex items-center justify-center transition"><FaFacebookF /></a>
                            <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white hover:text-[#1e3a8a] rounded-full flex items-center justify-center transition"><FaLinkedinIn /></a>
                            <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white hover:text-[#1e3a8a] rounded-full flex items-center justify-center transition"><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION FAQ ========== */}
            <section className="container mx-auto px-6 py-10 mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Questions fréquentes</h2>
                    <p className="text-gray-500">Peut-être que la réponse est déjà ici.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-800">{faq.question}</span>
                                <FaChevronRight className={`text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                            </button>
                            
                            {openFaq === index && (
                                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                                    {faq.reponse}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
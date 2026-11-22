import { useState, useEffect } from 'react'
import { LuLayoutDashboard, LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu"
import { FaFileAlt, FaBars, FaCalendarAlt, FaGraduationCap, FaSignOutAlt,FaHeart, FaMagic } from "react-icons/fa"
import { CiUser } from "react-icons/ci"
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom'

import { getProfil } from '../Services/Service'

export default function DashboardLayout() {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        // Sécurité : si pas de token, on redirige vers la connexion
        if (!token) {
            navigate('/signin')
            return
        }

        const initialData = {
            role: localStorage.getItem('role') || 'Demandeur',
            nom: localStorage.getItem('nom') || '',
            prenom: localStorage.getItem('prenom') || '',
            email: localStorage.getItem('email') || 'Email non disponible'
        }
        setUser(initialData)

        if (!initialData.nom && !initialData.prenom) {
            const fetchNom = async () => {
                try {
                    const data = await getProfil(token)
                    const nom = data.nom || ''
                    const prenom = data.prenoms || data.prenom || ''  // votre backend renvoie "prenoms"
                    const email = data.email || initialData.email

                    // On met à jour l'état ET le localStorage pour les prochaines visites
                    setUser({ ...initialData, nom, prenom, email })
                    localStorage.setItem('nom', nom)
                    localStorage.setItem('prenom', prenom)
                    if (email) localStorage.setItem('email', email)
                } catch (error) {
                    console.error("Impossible de récupérer le nom via l'API :", error)
                }
            }
            fetchNom()
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')
        localStorage.removeItem('nom')
        localStorage.removeItem('prenom')
        localStorage.removeItem('user')
        navigate('/signin')
    }

    // Calcul dynamique de l'initiale pour l'avatar (Prénom > Nom > Email > 'U')
    const initialLetter = (user?.prenom || user?.nom || user?.email || 'U').charAt(0).toUpperCase()
    
    // Nom complet à afficher
    const displayName = `${user?.prenom || ''} ${user?.nom || ''}`.trim() || user?.email

    // Si l'utilisateur n'est pas encore chargé, on affiche un loader
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
            </div>
        )
    }

    const lienMenu = (isSidebarOpen) => ({ isActive }) =>
    `${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3 py-2.5 px-3 rounded-lg transition ${
        isActive
            ? 'bg-blue-100 text-[#1e3a5f] font-semibold'
            : 'text-gray-700 hover:bg-blue-50 hover:text-[#1e3a5f]'
    }`

    return (
        <>
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className="flex h-screen overflow-hidden bg-[#F5F6FA]">
                
                <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                        overflow-y-auto bg-white border-r border-gray-200 flex flex-col px-4 py-4 transition-all 
                        duration-300 fixed lg:static inset-y-0 left-0 z-50`}>
                    
                    <div className={`text-gray-800 ${isSidebarOpen ? 'gap-3 justify-start' : 'justify-center'} mb-6 flex items-center py-2 gap-3 border-b border-gray-100 pb-4`}>
                        <div className="w-10 h-10 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold flex-shrink-0">
                            {initialLetter}
                        </div>

                        {isSidebarOpen && (
                            <div className='whitespace-nowrap overflow-hidden'>
                                <p className="font-semibold text-sm truncate capitalize">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.role === 'Demandeur' ? "Demandeur d'emploi" : "Entreprise"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        <div>
                            <NavLink to="/dashboard" end className={lienMenu(isSidebarOpen)}>
                                <LuLayoutDashboard className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Dashboard</span>}
                            </NavLink>

                            <NavLink to="/dashboard/cv" className={lienMenu(isSidebarOpen)}>
                                <FaFileAlt className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Mon CV</span>}
                            </NavLink>

                            <NavLink to="/dashboard/profil" className={lienMenu(isSidebarOpen)}>
                                <CiUser className="text-xl" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Profil</span>}
                            </NavLink>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <NavLink to="/dashboard/offre" className={lienMenu(isSidebarOpen)}>
                                <FaMagic className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Recommandées</span>}
                            </NavLink>

                            <NavLink to="/dashboard/candidature" className={lienMenu(isSidebarOpen)}>
                                <FaGraduationCap className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Candidatures</span>}
                            </NavLink>

                            <NavLink to="/dashboard/listeOffre" className={lienMenu(isSidebarOpen)}>
                                <FaFileAlt className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Toutes les offres</span>}
                            </NavLink>

                            <NavLink to="/dashboard/favori" className={lienMenu(isSidebarOpen)}>
                                <FaHeart className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Mes favoris</span>}
                            </NavLink>

                            <NavLink to="/dashboard/entretien" className={lienMenu(isSidebarOpen)}>
                                <FaCalendarAlt className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Entretiens</span>}
                            </NavLink>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <NavLink to="/dashboard/document" className={lienMenu(isSidebarOpen)}>
                                <FaFileAlt className="text-lg" />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Documents</span>}
                            </NavLink>
                        </div>
                    </nav>

                    {/* Déconnexion */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button 
                            onClick={handleLogout}
                            className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} w-full flex text-sm items-center gap-3 py-2.5 px-3 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer`}
                        >
                            <FaSignOutAlt className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium whitespace-nowrap">Déconnexion</span>}
                        </button>
                    </div>
                </aside>

                <main className="w-full min-w-0 flex flex-col overflow-y-auto">
                    
                    <div className="w-full bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-30">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
                            >
                                <FaBars className="text-xl" />
                            </button>

                            <div className="hidden lg:block text-gray-500 hover:text-[#1e3a5f] border-r border-gray-300 pr-3 mr-1">
                                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
                                    {isSidebarOpen ? <LuPanelLeftClose className="text-xl" /> : <LuPanelLeftOpen className="text-xl" />}
                                </button>
                            </div>
                            <h1 className="hidden md:block text-gray-800 font-semibold text-sm">Espace Personnel</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* <div className="flex gap-3 text-gray-500">
                                <FaRegEnvelope className="text-lg cursor-pointer hover:text-[#1e3a5f] transition" />
                                <FaRegBell className="text-lg cursor-pointer hover:text-[#1e3a5f] transition" />
                            </div> */}
                            
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1e3a5f] flex items-center justify-center font-bold text-sm border border-blue-200" title={user.email}>
                                {initialLetter}
                            </div>
                        </div>
                    </div>

                    {/* Zone d'affichage des pages enfants (Outlet) */}
                    <div className="flex-1 p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}
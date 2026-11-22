import { useState, useEffect } from 'react'
import { LuLayoutDashboard, LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu"
import { FaBars, FaSignOutAlt, FaBriefcase, FaUsers, FaCog, FaPlusCircle, FaUser } from 'react-icons/fa'
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom'
import { getProfilEntreprise } from '../Services/Service'

export default function DashboardEntreprise() {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (!token || localStorage.getItem('role') !== 'Entreprise') {
            navigate('/signin')
            return
        }

        const initialData = {
            role: 'Entreprise',
            nom: localStorage.getItem('nomSociete') || 'Mon Entreprise',
            email: localStorage.getItem('email') || 'contact@entreprise.com'
        }
        setUser(initialData)

        if (initialData.nom === 'Mon Entreprise') {
            const fetchProfil = async () => {
                try {
                    const data = await getProfilEntreprise(token)
                    
                    const nomSociete = data.nomSociete || data.nom || 'Mon Entreprise'
                    const email = data.email || initialData.email

                    const updatedUser = { ...initialData, nom: nomSociete, email }
                    setUser(updatedUser)

                    localStorage.setItem('nomSociete', nomSociete)
                    if (email) localStorage.setItem('email', email)
                    
                } catch (error) {
                    console.error("Erreur récupération profil entreprise:", error)
                }
            }
            fetchProfil()
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role') 
        localStorage.removeItem('email')
        localStorage.removeItem('nomSociete') 
        navigate('/signin')
    }

    const initialLetter = (user?.nom || user?.email || 'E').charAt(0).toUpperCase()
    
    const displayName = user?.nom || user?.email

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    const lienMenu = (isSidebarOpen) => ({ isActive }) =>
    `${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3 py-2.5 px-3 rounded-lg transition ${
        isActive
            ? 'bg-blue-100 text-blue-700 font-semibold'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
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
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                            {initialLetter}
                        </div>

                        {isSidebarOpen && (
                            <div className='whitespace-nowrap overflow-hidden'>
                                <p className="font-semibold text-sm truncate capitalize">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Espace Recruteur
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        <NavLink to="/dashboardentreprise" end className={lienMenu(isSidebarOpen)}>
                            <LuLayoutDashboard className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Dashboard</span>}
                        </NavLink>

                        <NavLink to="/dashboardentreprise/profil" className={lienMenu(isSidebarOpen)}>
                            <FaUser className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Profil</span>}
                        </NavLink>

                        <NavLink to="/dashboardentreprise/offres" className={lienMenu(isSidebarOpen)}>
                            <FaBriefcase className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Mes Offres</span>}
                        </NavLink>

                        <NavLink to="/dashboardentreprise/candidatures" className={lienMenu(isSidebarOpen)}>
                            <FaUsers className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Candidatures</span>}
                        </NavLink>

                        <NavLink to="/dashboardentreprise/publier" className={lienMenu(isSidebarOpen)}>
                            <FaPlusCircle className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Publier</span>}
                        </NavLink>

                        <NavLink to="/dashboardentreprise/parametres" className={lienMenu(isSidebarOpen)}>
                            <FaCog className="text-lg" />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Paramètres</span>}
                        </NavLink>
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

                {/* === CONTENU PRINCIPAL === */}
                <main className="w-full min-w-0 flex flex-col overflow-y-auto">

                    <div className="w-full bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-30">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
                            >
                                <FaBars className="text-xl" />
                            </button>

                            <div className="hidden lg:block text-gray-500 hover:text-blue-600 border-r border-gray-300 pr-3 mr-1">
                                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
                                    {isSidebarOpen ? <LuPanelLeftClose className="text-xl" /> : <LuPanelLeftOpen className="text-xl" />}
                                </button>
                            </div>
                            <h1 className="hidden md:block text-gray-800 font-semibold text-sm">Espace Entreprise</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200" title={user.email}>
                                {initialLetter}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}
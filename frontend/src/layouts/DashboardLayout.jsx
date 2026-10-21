import { useState, useEffect } from 'react'

import { LuLayoutDashboard,LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu"
import { FaFileAlt, FaBars } from "react-icons/fa"
import { CiUser } from "react-icons/ci"
import { FaCalendarAlt } from "react-icons/fa"
import { FaGraduationCap } from "react-icons/fa"
import { FaSignOutAlt } from "react-icons/fa"
import { FaRegBell } from "react-icons/fa6"
import { FaRegEnvelope } from "react-icons/fa"
import { FaMagic } from "react-icons/fa"

import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout () {

    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
   
    // État pour le menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [user, setUser] = useState(null)

    useEffect(() => {

        const storedUser = localStorage.getItem('user')

        if (storedUser) {

            setUser(JSON.parse(storedUser))

        } else {
            // Si aucun utilisateur n'est trouvé, on le renvoie à la page de connexion
            navigate('/signin')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/signin')
    }

    // Si l'utilisateur n'est pas encore chargé, on affiche un petit loader pour éviter les erreurs
    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
    }

    return (
        <>
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className="flex min-h-screen bg-[#F5F6FA]">
                <aside className= {`${isSidebarOpen ? 'w-64' : 'w-20'} 
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                        h-full overflow-y-auto bg-gray-100 flex flex-col px-6 transition-all 
                        duration-300 fixed lg:static inset-y-0 left-0 z-50`}>
                    
                    {/* info utilisateur */}
                    <div className={`text-gray-800 ${isSidebarOpen ? 'gap-3 justify-start' : 'justify-center'} mb-4 flex items-center py-4 gap-3 border-b border-gray-200 `}>

                        <div>
                            <p className='rounded-full border border-gray-400 text-slate-500 px-2 w-8 h-8 flex items-center justify-center font-bold'>
                                {(user.nom || user.email).charAt(0).toUpperCase()}
                            </p>
                        </div>

                        {isSidebarOpen && (
                            <div className='whitespace-nowrap overflow-hidden'>
                             
                                <p className="font-semibold text-sm truncate">
                                    {user.nom || user.prenom ? `${user.nom} ${user.prenom}`.trim() : user.email}
                                </p>
                              
                                <p className="text-xs text-gray-500">
                                    {user.role === 'Demandeur' ? "Demandeur d'emploi" : "Entreprise"}
                                </p>
                            </div>
                        )}

                    </div>
                    <nav className="flex-1 space-y-1">
                        {/* Menu principal */}
                        <div>
                            {/* <p className=" hidden lg:block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4 mb-2">PRINCIPAL</p> */}                        
                            <Link to="/dashboard" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <LuLayoutDashboard />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Dashboard</span>}
                            </Link>
                            

                            <Link to="/dashboard/cv" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaFileAlt />
                                {isSidebarOpen && <span className='hidden lg:block text-sm font-medium'>CV</span>}
                            </Link>

                            <Link to="/dashboard/profil" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <CiUser />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Profil</span>}
                            </Link>
                        </div>

                        {/* Emploi */}
                        <div>
                        {/* <p className="hidden lg:block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4 mb-2">EMPLOI</p>  */}

                            <Link to="/dashboard/offre" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaMagic />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Offres recommandés</span>}
                            </Link>

                            <Link to="/dashboard/candidature" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaGraduationCap />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Candidatures</span>}
                            </Link>

                            <Link to="/dashboard/listeOffre" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaGraduationCap />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Offres</span>}
                            </Link>

                            <Link to="/dashboard/entretien" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaCalendarAlt />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Entretiens</span>}
                            </Link>
                        </div>

                        {/* Communication */}
                        <div>
                            {/* <p className="hidden lg:block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">COMMUNICATION</p>  */}

                            <Link to="/dashboard/message" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaRegEnvelope />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Messages</span>}
                            </Link>

                            <Link to="/dashboard/notification" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaRegBell />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Notifications</span>}
                            </Link>
                        </div>

                        {/* Compte */}
                        <div>
                            {/* <p className="hidden lg:block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4 mb-2">Compte</p>  */}

                            <Link to="/dashboard/document" className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} flex text-sm items-center gap-3  py-2.5 rounded-lg text-gray-800  transition`}>
                                <FaFileAlt />
                                {isSidebarOpen && <span className="hidden lg:block text-sm font-medium">Documents</span>}
                            </Link>
                        </div>
                    </nav>
                    {/* Deconnexion */}
                    <div className="mb-4">
                        <button 
                            onClick={handleLogout}
                            className={`${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} w-full flex text-sm items-center gap-3 py-2.5 rounded-lg text-gray-800 hover:bg-red-50 transition cursor-pointer`}
                        >
                            <FaSignOutAlt />
                            {isSidebarOpen && <span className="hidden lg:block text-sm font-medium whitespace-nowrap">Déconnexion</span>}
                        </button>
                    </div>

                </aside>

                <main className=" w-full min-w-0 flex flex-col mt-2">
                    <div className="w-full bg-white border border-gray-200 rounded-lg mt-2  py-2">
                {/* haut */}
                        <div className="flex justify-between items-center px-3">

                            {/* gauche */}
                            <div className="flex items-center gap-2">

                                <button 
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="lg:hidden text-gray-500 hover:text-gray-600 p-2"
                                >
                                    <FaBars className="text-xl" />
                                </button>

                                <div className="hidden lg:block text-gray-500 hover:text-gray-600 border-r border-gray-500 mt-1 px-1">
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
                                        {isSidebarOpen ? <LuPanelLeftClose /> : <LuPanelLeftOpen />}
                                    </button>
                                </div>
                                <h1 className="hidden md:block text-gray-500 font-medium text-sm">Dashboard</h1>
                            </div>

                            {/* droite */}
                            <div className="flex items-center gap-4">

                                <div className="flex gap-1">
                                    <div className="hidden md:block text-gray-500 hover:text-gray-600">
                                        <FaRegEnvelope />
                                    </div>

                                    <div className="hidden md:block text-gray-500 hover:text-gray-600 border-r border-gray-500  px-4">
                                        <FaRegBell />
                                    </div>

                                </div>

                                <div className="border rounded-full border-gray-300 px-2">
                                    <p className="text-gray-500 font-semibold">R</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className=" overflow-y-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}
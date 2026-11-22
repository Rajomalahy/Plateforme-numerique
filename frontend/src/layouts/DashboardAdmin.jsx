import { useState, useEffect } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { FaCity, FaBriefcase, FaUsers, FaChartBar, FaSignOutAlt, FaBars, FaTimes, FaUserShield } from 'react-icons/fa'

export default function DashboardAdmin() {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const userData = JSON.parse(storedUser)
            if (userData.role !== 'Administrateur') {
                navigate('/admin/login')
            } else {
                setUser(userData)
            }
        } else {
            navigate('/admin/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/admin/login')
    }

    if (!user) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>

    const menuItems = [
        { path: '/admin', label: 'Tableau de bord', icon: <FaChartBar /> },
        { path: '/admin/villes', label: 'Gestion des Villes', icon: <FaCity /> },
        { path: '/admin/competences', label: 'Compétences', icon: <FaBriefcase /> },
        { path: '/admin/admins', label: 'Administrateurs', icon: <FaUserShield /> },
        { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: <FaUsers /> },
        { path: '/admin/moderation-offres', label: 'Offres', icon: <FaUsers /> },
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    {sidebarOpen && <h2 className="font-bold text-lg">Admin Panel</h2>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-300 hover:text-white">
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                location.pathname === item.path
                                    ? 'bg-red-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800'
                            }`}
                        >
                            {item.icon}
                            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition w-full"
                    >
                        <FaSignOutAlt />
                        {sidebarOpen && <span className="text-sm font-medium">Déconnexion</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {menuItems.find(m => m.path === location.pathname)?.label || 'Administration'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                            <p className="text-xs text-gray-500">Administrateur</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <FaUserShield className="text-red-600" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
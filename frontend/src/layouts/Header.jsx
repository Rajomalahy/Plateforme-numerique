import React from "react"
import { NavLink, Link, Outlet } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import { useState, useEffect } from "react"

import Footer from "../pages/Autres/Footer"

export default function Header() {

    const [scrolled, setScroll] = useState(false)

    const [menuOuvert, setMenuOuvert] = useState(false)

    useEffect(() => {

        const handlescroll = () => {

            if (window.scrollY > 50) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }

        window.addEventListener('scroll', handlescroll)
        return () => window.removeEventListener('scroll', handlescroll)
    }, [])


    const lienDesktop = (scrolled) => ({ isActive }) => {
        const base = "px-3 py-2 rounded-lg transition-colors duration-300"

        if (isActive) {
            return `${base} font-bold ${scrolled
                ? 'text-[#3730A3] bg-[#3730A3]/10'
                : 'text-white bg-white/20'}`
        }

        return `${base} ${scrolled
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-white hover:bg-white/10'}`
    }


    const lienMobile = ({ isActive }) =>
        `block px-4 py-3 font-medium rounded-lg transition ${isActive
            ? 'bg-[#3730A3]/10 text-[#3730A3] font-bold'
            : 'text-gray-800 hover:bg-gray-100'}`


    return (
        <div>
            <header className="fixed top-0 z-50 w-full transition-all duration-300 ">
                <div className={`flex  mx-auto py-4 px-2 justify-between items-center ${scrolled ? 'bg-white/90 mt-4 max-w-7xl rounded-lg backdrop-blur-md transition-all duration-500 shadow-lg' : 'bg-[linear-gradient(135deg,#3730A3_0%,#3F3FB8_50%,#0369A1_100%)]'}`}>

                    <Link to="/">
                        <h1 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-[#3730A3]' : 'text-white'
                            }`}>JobMADA</h1>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex font-sans text-white gap-4">
                                <li><NavLink to="/entreprise" className={lienDesktop(scrolled)}>Entreprise</NavLink></li>
                                <li><NavLink to="/offre" className={lienDesktop(scrolled)}>Offres</NavLink></li>
                                <li><NavLink to="/article" className={lienDesktop(scrolled)}>Articles</NavLink></li>
                                <li><NavLink to="/apropos" className={lienDesktop(scrolled)}>À propos</NavLink></li>
                                <li><NavLink to="/contact" className={lienDesktop(scrolled)}>Contact</NavLink></li>
                            </ul>
                        </nav>

                        {/* bouton connexion */}
                        <div className="hidden lg:block">
                            <Link to="/signin" className={`hidden lg:block rounded-lg px-5 py-2 font-bold transition-all duration-300 shadow-md ${scrolled
                                    ? 'bg-[#3730A3] text-white hover:bg-[#2e2885]'
                                    : 'bg-white text-[#3730A3] hover:bg-gray-100'
                                }`}>Se connecter</Link>
                        </div>
                    </div>

                    {/* Bouton burger - visible uniquement sur mobile */}
                    <button
                        onClick={() => setMenuOuvert(!menuOuvert)}
                        className="lg:hidden text-2xl text-gray-800 p-2"
                    >
                        {menuOuvert ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {/* Menu mobile - s'ouvre au clic sur le burger */}
                {menuOuvert && (
                    <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                        <nav className="max-w-7xl mx-auto px-4 py-4">
                            <ul className="space-y-3">
                                <li><NavLink to="/entreprise" onClick={() => setMenuOuvert(false)} className={lienMobile}>Entreprise</NavLink></li>
                                <li><NavLink to="/offre" onClick={() => setMenuOuvert(false)} className={lienMobile}>Offres</NavLink></li>
                                <li><NavLink to="/article" onClick={() => setMenuOuvert(false)} className={lienMobile}>Articles</NavLink></li>
                                <li><NavLink to="/apropos" onClick={() => setMenuOuvert(false)} className={lienMobile}>À propos</NavLink></li>
                                <li><NavLink to="/contact" onClick={() => setMenuOuvert(false)} className={lienMobile}>Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                )}

            </header>

            <main className=" w-full min-w-0 flex flex-col">
                <Outlet />
            </main>

            <footer className="mt-10">
                <Footer />
            </footer>
        </div>
    )
}
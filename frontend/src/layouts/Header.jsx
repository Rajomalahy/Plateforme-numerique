import React from "react"
import { Link, Outlet } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import logo from '../assets/logo.jpeg'
import { useState, useEffect } from "react";

export default function Header () {

    const [scrolled, setScroll] = useState(false)
    const [menuOuvert, setMenuOuvert] = useState(false)

    useEffect (() => {

        const handlescroll = () => {
            if(window.scrollY > 50) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }

        window.addEventListener('scroll', handlescroll)
        return () => window.removeEventListener('scroll', handlescroll)
    }, [])


    return(
        <div>
            <header className = {`fixed top-0 z-50 w-full ${scrolled ? 'bg-white/70 mt-4 rounded-lg backdrop-blur-md transition-all duration-300 shadow-lg' : 'bg-white shadow-md transition-all duration-300'}`} >
                <div className="flex max-w-7xl mx-auto px-2 justify-between items-center">
                    {/* logo */}
                    <Link to="/">
                        <img src={logo} className="w-16 h-16 md:h-16 object-cover" alt="" />
                    </Link>

                    <div className="flex gap-4">
                        {/* navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex font-sans gap-4">
                                <li>
                                    <Link to="/entreprise" className="px-4 py-2 hover:text-[#121212] hover:border-b-2 border-[#121212] focus:border-b-2 focus:border-[#121212]">Entreprise</Link>
                                </li>

                                <li>
                                    <Link to="/offre" className="px-4 py-2 hover:text-[#121212] hover:border-b-2 border-[#121212] focus:border-b-2 focus:border-[#121212]">Offres</Link>
                                </li>
                                
                                <li>
                                    <Link to="/demandeur" className="px-4 py-2 hover:text-[#121212] hover:border-b-2 border-[#121212] focus:border-b-2 focus:border-[#121212]">Demandeur</Link>
                                </li>
                                
                                <li>
                                    <Link to="/article" className="px-4 py-2 hover:text-[#121212] hover:border-b-2 border-[#121212] focus:border-b-2 focus:border-[#121212]">Articles</Link>
                                </li>
                                
                                <li>
                                    <Link href="/apropos" className="px-4 py-2 hover:text-[#121212] hover:border-b-2 border-[#121212] focus:border-b-2 focus:border-[#121212]">A propos</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* bouton connexion */}
                        <div className="hidden lg:block">
                            <Link to="/signin" className="rounded-lg bg-[#D4AF37] px-5 py-2 text-white">Se connecter</Link>
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
                                <li>
                                    <Link 
                                        to="/entreprise" 
                                        onClick={() => setMenuOuvert(false)}
                                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Entreprise
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/offre" 
                                        onClick={() => setMenuOuvert(false)}
                                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Offres
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/demandeur" 
                                        onClick={() => setMenuOuvert(false)}
                                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Demandeur
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/article" 
                                        onClick={() => setMenuOuvert(false)}
                                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Articles
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/apropos" 
                                        onClick={() => setMenuOuvert(false)}
                                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        À propos
                                    </Link>
                                </li>
                                <li className="pt-3 border-t border-gray-200">
                                    <Link 
                                        to="/connexion"
                                        onClick={() => setMenuOuvert(false)}
                                        className="block w-full text-center bg-[#D4AF37] hover:bg-yellow-600 text-white px-5 py-3 rounded-lg font-semibold transition"
                                    >
                                        Se connecter
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}

            </header>

            <main className=" w-full min-w-0 flex flex-col">
                <Outlet/>
            </main>
        </div>
    )
}
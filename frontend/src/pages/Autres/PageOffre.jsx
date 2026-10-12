import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { FaHome } from "react-icons/fa"
import { Link } from 'react-router-dom'
import Offre from "./Offre"


export default function PageOffre () {

    const offres = [
        {
            id : 1,
            logo : un,
            nom : 'Stage pré-embauche',
            entreprise : 'work',
            lieu : 'Tamatave',
            type : 'Stage',
            travail : 'remote',
            date : 'il y a 3 jours',
            limite : 'Ajourd\'hui'
        },
        {
            id : 1,
            logo : deux,
            nom : 'Conseiller client bilingue',
            entreprise : 'work',
            lieu : 'Tana',
            type : 'CDI',
            travail : 'sur site',
            date : 'hier',
            limite : 'demain'
        },
        {
            id : 1,
            logo : trois,
            nom : 'Supervisieur call',
            entreprise : 'work',
            lieu : 'Diego',
            type : 'CDD',
            travail : 'Hybride',
            date : 'Lundi',
            limite : '12 octobre 2026'
        }
    ]

    return (
        <div className="mt-20">

            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">

                    <Link to="/" className="hover:text-gray-900 transition">
                        <FaHome className="text-gray-500" />
                    </Link>

                    <span className="text-gray-400">›</span>

                    <Link to="/entreprise" className="hover:text-gray-900 transition">
                        Entreprises qui recrutent
                    </Link>

                    <span className="text-gray-400">›</span>

                    <span className="text-gray-900 font-medium truncate">
                         Emploi
                    </span>
                    
                </nav>
            </div>

            <div className="text-center py-8">
                <h1 className="text-2xl font-medium">Offres de stages et premiers emplois</h1>
                <p className="text-sm text-gray-500 mt-2">Découvrez des offres de stages et premiers emplois régulièrement actualisées dans divers secteurs d'activité. 
                    <br/>Trouvez les meilleures opportunités auprès des entreprises les plus dynamiques du marché.
                </p>
            </div>

            <div className="shadow-sm border border-gray-300 max-w-4xl mx-auto py-2 px-2 rounded-lg flex flex-col md:flex-row gap-4">

                <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-2 py-2 flex items-center gap-2">
                    <IoIosSearch /><input className="focus:outline-none" type="search" placeholder="Rechercher un poste, une entreprise..." name="" id="" />
                </div>

                <div className="w-full md:w-auto flex items-center border border-gray-300 rounded-lg">
                    <MdOutlinePlace className="ml-2"/>
                    <select name="" id="" className="w-full md:w-auto px-1 py-2 focus:outline-none cursor-pointer">
                        <option value="">Lieu</option>
                    </select>
                </div>

                <div className="w-full md:w-auto border border-gray-300 rounded-lg flex items-center pl-3">
                    <RiContractLine />
                    <select name="" id="" className="w-full md:w-auto px-1 py-2 focus:outline-none cursor-pointer">
                        <option value="">Type de contrat</option>
                    </select>
                </div>

                <button type="submit" className="w-full md:w-auto flex items-center gap-2 rounded-lg bg-mtefop-blue px-5 py-2 text-white cursor-pointer">
                    <IoIosSearch />
                    <span>Rechercher</span>
                </button>

            </div>

            <div>
                <Offre/>
            </div>

        </div>
    )
}
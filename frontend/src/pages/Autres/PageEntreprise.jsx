import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { FaArrowRightLong } from "react-icons/fa6"
import { FaHome } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { IoMdBusiness } from "react-icons/io"
import Entreprise from "./Entreprise"

export default function PageEntreprise() {

        const entrepriseList = [
            {
                id : 1,
                logo : un,
                nom : 'La Gastronomie PIZZA',
                secteur : 'Restauration',
                ville : 'Antananarivo',
                offre : '12 Offres',
            },
    
            {
                id : 2,
                logo : deux,
                nom : 'up working',
                secteur : 'Informatique',
                ville : 'Fianarantsoa',
                offre : '2 Offres',
            },
    
            {
                id : 3,
                logo : trois,
                nom : 'SAKATA',
                secteur : 'Agriculture',
                ville : 'Tamatave',
                offre : '60 Offres',
            }
        ]
    
    return (
        <div className="mt-30">

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

            <div className="text-center py-6">
                <h1 className="text-2xl font-medium">Découvrez les Entreprises qui recrutent</h1>
                <p className="text-sm text-gray-500 mt-2">Découvrez les organisations et établissements au coeur du monde professionnel</p>
            </div>

            <div className="shadow-sm border border-gray-300 max-w-4xl mx-auto py-2 px-2 rounded-lg flex flex-col md:flex-row gap-4">

                <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-4 py-2 flex items-center gap-2">
                    <IoIosSearch />
                    <input className="focus:outline-none" type="search" placeholder="Rechercher un poste, une entreprise..." name="" id="" />
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

            <div className="mt-8">
                <Entreprise/>
            </div>
        </div>
    )
}
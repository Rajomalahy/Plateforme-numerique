import { IoIosSearch } from "react-icons/io"
import { MdOutlinePlace } from "react-icons/md"
import { RiContractLine } from "react-icons/ri"
import un from '../../assets/un.jpg'
import deux from '../../assets/deux.jpg'
import trois from '../../assets/trois.jpg'
import { IoDocumentTextOutline } from "react-icons/io5"
import { FaHome } from "react-icons/fa"
import { Link } from 'react-router-dom'

export default function PageDemandeur () {

        const demandeur = [
            {
                id : 1,
                profil : un,
                nom : 'Rajomalahy N.',
                diplome : 'Master2',
                adresse : 'Fianarantsoa',
                branche : 'Agronomie',
                lieu : 'sur site',
                type : 'CDD'
            },
            {
                id : 2,
                profil : deux,
                nom : 'Rajomalahy N.',
                diplome : 'Master2',
                adresse : 'Fianarantsoa',
                branche : 'Agronomie',
                lieu : 'sur site',
                type : 'CDD'
            },
            {
                id : 3,
                profil : trois,
                nom : 'Rajomalahy N.',
                diplome : 'Master2',
                adresse : 'Fianarantsoa',
                branche : 'Agronomie',
                lieu : 'sur site',
                type : 'CDD'
            }        
        ]

    return(
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
                <h1 className="text-2xl font-medium">Les personnes à la recherche d'emploi ou stage</h1>
                <p className="text-sm text-gray-500 mt-2">Découvrez des jeunes talentueux prêts à intégrer votre entreprise</p>
            </div>

            <div className="shadow-sm border border-gray-300 max-w-4xl mx-auto py-2 px-2 rounded-lg flex flex-col md:flex-row gap-4">
            
                <div className="w-full border border-gray-300 rounded-lg focus:outline-none transition px-4 py-2 flex items-center gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 px-8">
                    {
                        demandeur.map((demande) => (
                            <div key={demande.id} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                
                                <div >

                                    <div className="flex justify-center ">
                                        <img src={demande.profil} alt="" className="w-16 h-16 mt-2 object-contain rounded-full"/>
                                    </div>

                                    <div className="text-center">
                                        <div className="font-medium text-lg text-gray-800">
                                            {demande.nom}
                                        </div>

                                        <div className="text-gray-500 mt-3 text-sm text-center justify-center whitespace-nowrap flex items-center gap-6">
                                            <div>{demande.diplome}</div>

                                            <div className="flex items-center gap-1"> 
                                                <MdOutlinePlace/>
                                                {demande.adresse} 
                                            </div>

                                            <div> {demande.branche} </div>
                                        </div>

                                        <div className="text-gray-500 mt-3 justify-center text-sm whitespace-nowrap flex items-center gap-6">
                                            <div className="bg-gray-100 px-3 py-1 rounded-full"> {demande.lieu} </div>
                                            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"> 
                                                <IoDocumentTextOutline />
                                                {demande.type} 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-4 flex justify-center mt-8">
                                    <Link to="/dashboard" className="bg-mtefop-blue px-4 py-2 text-white rounded-lg text-sm font-semibold">Voir profil</Link>
                                </div>

                            </div>
                        ))
                    }
            </div>
        </div>
    )
}
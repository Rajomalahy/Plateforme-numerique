import { FaSearch, FaFilter, FaMapMarkerAlt, FaEye, FaTimes, FaBroadcastTower, FaBuilding, FaBullhorn, FaSeedling, FaCalculator, FaHardHat, FaHeadset } from 'react-icons/fa'


export default function Candidature() {

    const candidatures = [
        {
            id: 1,
            entreprise: 'Orange Digital Center',
            icon: <FaBroadcastTower />,
            iconBg: 'bg-blue-900',
            poste: 'Développeur Web Full-Stack',
            date: '12 juil. 2026',
            statut: 'Envoyée',
            statutClass: 'bg-blue-50 text-blue-700 border border-blue-200'
        },
        {
            id: 2,
            entreprise: 'Vola Mada Bank',
            icon: <FaBuilding />,
            iconBg: 'bg-yellow-500',
            poste: 'Chargé(e) de Clientèle',
            date: '08 juil. 2026',
            statut: 'En cours',
            statutClass: 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        },
        {
            id: 3,
            entreprise: 'TanaMedia',
            icon: <FaBullhorn />,
            iconBg: 'bg-green-700',
            poste: 'Community Manager',
            date: '05 juil. 2026',
            statut: 'Entretien',
            statutClass: 'bg-purple-50 text-purple-700 border border-purple-200'
        },
        {
            id: 4,
            entreprise: 'Agri Sud SARL',
            icon: <FaSeedling />,
            iconBg: 'bg-green-600',
            poste: 'Technicien Agricole',
            date: '28 juin 2026',
            statut: 'Acceptée',
            statutClass: 'bg-green-50 text-green-700 border border-green-200'
        },
        {
            id: 5,
            entreprise: 'Banky Fidiovana',
            icon: <FaCalculator />,
            iconBg: 'bg-gray-700',
            poste: 'Assistant(e) Comptable',
            date: '20 juin 2026',
            statut: 'Refusée',
            statutClass: 'bg-red-50 text-red-700 border border-red-200'
        },
        {
            id: 6,
            entreprise: 'Star Brew Construction',
            icon: <FaHardHat />,
            iconBg: 'bg-blue-800',
            poste: 'Ingénieur Génie Civil',
            date: '15 juin 2026',
            statut: 'Envoyée',
            statutClass: 'bg-blue-50 text-blue-700 border border-blue-200'
        },
        {
            id: 7,
            entreprise: 'Orange Telecom',
            icon: <FaHeadset />,
            iconBg: 'bg-blue-900',
            poste: 'Support Technique N2',
            date: '02 juin 2026',
            statut: 'En cours',
            statutClass: 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        }
    ]

    return (
        <div className="rounded-t-md bg-[#F5F6FA] min-h-screen">

            <div className="text-center py-4">
                <h1 className="text-xl font-bold text-gray-800 mb-2">Mes Candidatures</h1>
                <p className="text-gray-500 text-sm">
                    Retrouvez toutes vos candidatures envoyées aux entreprises
                </p>
            </div>

            <div className='max-w-5xl mx-auto px-6 mb-8'>
                <div className='bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row gap-3 items-center p-4'>

                    {/* recherche */}
                    <div className='w-full flex items-center gap-2 py-2 border border-gray-300 rounded-lg px-3'>
                        <FaSearch className=" text-gray-400" />
                        <input type="text" placeholder="Rechercher..." className='w-full text-sm focus:outline-none' name="" id="" />
                    </div>

                    {/* liste filtre */}
                    <div className='flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2'>
                        <FaMapMarkerAlt className="text-gray-400" />
                        <select name="" className='text-sm text-gray-700 focus:outline-none' id="">
                            <option value="">Toutes</option>
                            <option value="Envoyées">Envoyées</option>
                            <option value="En cours">En cours</option>
                            <option value="Entretien">Entretien</option>
                            <option value="Acceptées">Acceptées</option>
                            <option value="Refusées">Refisées</option>
                        </select>
                    </div>
                    {/* bouton filtre */}
                    <button className='flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-2.5 rounded-lg text-sm font-medium'>
                        <FaFilter />
                        Filtrer
                    </button>

                </div>
            </div>

            <div className='max-w-5xl mx-auto '>
                <div className='bg-white border border-gray-200 rounded-xl overflow-y-auto max-h-96'>
                    <table className='w-full overflow-y-auto'>
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="sticky top-0 bg-gray-50 text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Entreprise
                                </th>
                                <th className="sticky top-0 bg-gray-50 text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Poste
                                </th>
                                <th className="sticky top-0 bg-gray-50 text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="sticky top-0 bg-gray-50 text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="sticky top-0 bg-gray-50 text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {candidatures.map((candidature) => (
                                <tr key={candidature.id} className=''>
                                    <td className="flex items-center gap-3 px-6 py-4">
                                        <div> {candidature.icon} </div>
                                        <span className='text-sm font-medium text-gray-800'> {candidature.entreprise} </span>
                                    </td>

                                    <td className='px-6 py-4'>
                                        <span className="text-sm text-gray-700"> {candidature.poste} </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-500">
                                            {candidature.date}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={` px-3 py-1 rounded-full text-xs font-medium ${candidature.statutClass}`}>
                                            {candidature.statut}
                                        </span>
                                    </td>

                                    <td className="flex items-center justify-end gap-2 px-6 py-4">
                                        <button className="p-2 border border-gray-300 rounded-lg transition text-gray-600">
                                            <FaEye className="text-sm" />
                                        </button>
                                        {candidature.statut !== 'Acceptée' && candidature.statut !== 'Refusée' && (
                                                <button className="p-2 border border-gray-300 rounded-lg transition text-gray-600">
                                                    <FaTimes className="text-sm" />
                                                </button>
                                        )}
                                    </td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
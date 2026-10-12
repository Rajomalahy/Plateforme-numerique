import Search from "./search"
import Entreprise from "./Entreprise"
import Offre from "./Offre"
import Demandeur from "./Demandeur"

export default function Acceuil () {
    return (
        <div>

            <div>
                <Search/>
            </div>

            <div>
                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Découvrez les Entreprises qui recrutent</h1>
                    <p className="text-sm text-gray-500 mt-2">Découvrez les organisations et établissements au coeur du monde professionnel</p>
                </div>

                <Entreprise/>
            </div>

            <div className="">
                <div className="text-center py-8">
                    <h1 className="text-2xl font-medium">Découvrez les opportunités de stages et premier emploi</h1>
                    <p className="text-sm text-gray-500 mt-2">Consultez parmi nos plusieurs opportunités de premier emploi à Madagascar.</p>
                </div>
                
                <Offre/>
            </div>

            <div>
                <Demandeur/>
            </div>

        </div>
    )
}

import {useHistory} from "react-router-dom";
import AnnonceList from "components/Home/components/AnnonceList";
import {Button,Card } from "@mui/material";


const DisplayMyAds = ({adsAvailable, adsPending, adsSold, mapUrl, id_user, currentIdUser, currentUserRole}) => {

    const DisplayTable = ( {ads, mapUrl}) => {
        const history = useHistory();

        const handleButton = (e) => {
            history.push("/annonces/" + e.target.dataset.id);
        }
        return (
            <AnnonceList annonces={ads}/>
        )
    }

    if (id_user == currentIdUser || currentUserRole === "admin") {
        return (
            <>
                <h2>Annonces Disponible</h2>
                <DisplayTable ads={adsAvailable} mapUrl={mapUrl}/>
                <h2>Annonces en attente</h2>
                <DisplayTable ads={adsPending} mapUrl={mapUrl}/>
                <h2>Annonces vendue</h2>
                <DisplayTable ads={adsSold} mapUrl={mapUrl}/>
            </>
        )
    } else {
        return (
            <>
                <h2>Annonces Disponible</h2>
                <DisplayTable ads={adsAvailable} mapUrl={mapUrl}/>
            </>
        )
    }

}
export default DisplayMyAds;
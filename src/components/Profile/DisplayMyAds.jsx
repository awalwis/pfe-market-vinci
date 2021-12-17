
import {useHistory} from "react-router-dom";
import AnnonceList from "components/Home/components/AnnonceList";
import {Button,Card, Stack } from "@mui/material";


const DisplayMyAds = ({adsAvailable, adsPending, adsSold, mapUrl, id_user, currentIdUser, currentUserRole}) => {

    if (id_user == currentIdUser || currentUserRole === "admin") {
        return (
            
                <Stack spacing={3}>
                <h4>Annonces disponibles</h4>
                <AnnonceList annonces={adsAvailable}/>
                <h4>Annonces en attente</h4>
                <AnnonceList annonces={adsPending}/>
                <h4>Annonces vendues</h4>
                <AnnonceList annonces={adsSold}/>
                </Stack>
        
        )
    } else {
        return (
            <>
                <h4>Annonces disponibles</h4>
                <AnnonceList annonces={adsAvailable}/>
            </>
        )
    }

}
export default DisplayMyAds;

import {useHistory} from "react-router-dom";
import Card from "../../theme/overrides/Card";
import {Button} from "@mui/material";


const DisplayMyAds = ({adsAvailable, adsPending, adsSold, mapUrl, id_user, currentIdUser, currentUserRole}) => {

    const DisplayTable = ( {ads, mapUrl}) => {
        const history = useHistory();

        const handleButton = (e) => {
            history.push("/annonces/" + e.target.dataset.id);
        }
        return (
            ads.map((ad) => {
                return (
                    <Card key={ad.id_ad} style={{width: '18rem'}}>
                        <Card.Img variant="top" src={mapUrl[ad.id_ad]}/>
                        <Card.Body>
                            <Card.Title>{ad.title}</Card.Title>
                            <Card.Text>
                                {ad.description}
                            </Card.Text>
                            <Button data-id={ad.id_ad} onClick={handleButton} variant="primary">Plus info</Button>
                        </Card.Body>
                    </Card>
                )
            })
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
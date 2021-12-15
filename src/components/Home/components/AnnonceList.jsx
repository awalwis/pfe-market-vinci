import { useEffect, useState } from "react";
import AnnonceCard from "./AnnonceCard";
import {mediaService} from "../../../services/medias.service";
import { Grid } from "@mui/material";
const AnnonceList = ({annonces}) => {

    const [data, setData] = useState();

    // Functions
    function matchPicture(picture_id) {
        if(data){
            if(data.medias){
                data.medias.map((row) => {
                    if(row.id_media === picture_id){
                        return row;
                    }
                    return data.medias[0];
                })
            }
        }
        return null;
    }

    useEffect(() => {
        mediaService.getAll().then((elt) => setData(elt))
    }, [])

    return(
        // <Container className="d-inline-flex flex-wrap flex-row justify-content-start">
        //     {annonces.map((annonce) => {
        //         return(
        //             <AnnonceCard key={annonce.id_ad} annonce={annonce} picture={matchPicture(annonce.displayed_picture)}/>
        //         )
        //     }) }
        // </Container>
        <Grid container spacing={3}>
            {annonces.map((annonce) => (
            <Grid key={annonce.id_ad} item xs={12} sm={6} md={3}>
                <AnnonceCard annonce={annonce} picture={matchPicture(annonce.displayed_picture)}/>
            </Grid>
            ))}
        </Grid>
    )
}
export default AnnonceList;
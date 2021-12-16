import { useEffect, useState } from "react";
import AnnonceCard from "./AnnonceCard";
import {mediaService} from "../../../services/medias.service";
import { Grid } from "@mui/material";
const AnnonceList = ({annonces}) => {

    return(

        <Grid container spacing={3}>
            {annonces && (annonces.map((annonce) => (
                <Grid key={annonce.id_ad} item xs={12} sm={6} md={3}>
                    <AnnonceCard annonce={annonce}/>
                </Grid>
            )))}
        </Grid>
    )
}
export default AnnonceList;

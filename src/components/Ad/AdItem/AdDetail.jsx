import React from "react";



const AdDetail = ({ad})=>{ 
    return (
        <div>
            <p>Titre: {ad.ad.title}</p>
            <p>Description: {ad.ad.description}</p>
            <p>Prix: {ad.ad.price}</p>
            <p>Date de publication: {ad.ad.date}</p>
            <p>Catégorie: {ad.ad.category}</p>
            <p>Etat: {ad.ad.sate}</p>
            <p>Status: {ad.ad.type}</p>
        </div>
        )
}

export default AdDetail
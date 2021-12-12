import React from "react";
//import AdDisplayPictures from "components/Ad/AdDisplayPictures";


const AdDetail = ({ad,adPictures})=>{ 
    console.log(ad)
    return (
        <>
            <div>
                <p>Titre: {ad.ad.title}</p>
                <p>Description: {ad.ad.description}</p>
                <p>Prix: {ad.ad.price}</p>
                <p>Date de publication: {ad.ad.date}</p>
                <p>Catégorie: {ad.ad.category}</p>
                <p>Etat: {ad.ad.sate}</p>
                <p>Status: {ad.ad.type}</p>
                <p>Nombre de media: {ad.ad.displayed_picture}</p>
            </div>
            <div>
                <img src={adPictures[0].url}/>
            </div>      
        </>
    )
}

export default AdDetail

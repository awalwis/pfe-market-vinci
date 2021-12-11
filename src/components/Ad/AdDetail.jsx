import React from "react";



const AdDetail = ({ad})=>{ 
         
    return (
        <div>
            <p>Titre: {ad.title}</p>
            <p>Description: {ad.description}</p>
            <p>Prix:{ad.price}</p>
            <p>Date de publication{ad.date}</p>
            <p>Catégorie:{ad.category}</p>
            <p>Etat:{ad.sate}</p>
            <p>Status :{ad.type}</p>
        </div>
        )
}

export default AdDetail

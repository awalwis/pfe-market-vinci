import React, { useContext } from "react";


const AdDetail = (ad)=>{ 
    
    //categorie à modifier
    return (
        <div>
            <p>Titre: {ad.title}</p>
            <p>Description: {ad.description}</p>
            <p>Prix:{ad.price}</p>
            <p>Date de publication{ad.date}</p>
            <p>Localité :{ad.location}</p>
            <p>Catégorie:{ad.category}</p>
            <p>Etat:{ad.state}</p>
            <p>Status :{ad.type}</p>
        </div>
    )
}

export default AdDetail

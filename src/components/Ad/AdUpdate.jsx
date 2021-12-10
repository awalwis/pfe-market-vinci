import React, { useContext,useState } from "react";
import adsContext from "contexts/adsContext";
import {useParams} from "react-router-dom";
import AdDetail from "./AdDetail";
import AdUpdateForm from "./AdUpdateForm";

const AdUpdate = ()=>{ 

    const id = useParams().id;
    const {
        deleteAd,
        retrieveAd,
    } = useContext(adsContext);

    const ad = retrieveAd(id)
    console.log("test")
    console.log(ad)
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    // need to check if admin/ad's owner
    const handleDelete = () => {
        deleteAd(id);
    }
    return (
        <div>
        <AdDetail ad ={ad}/>
        <button onClick={handleDelete}> Supprimer l'annonce </button>
        <button onClick={togglePopup}> Modfier l'annonce </button>
        {isOpen && <AdUpdateForm
      content={<>
      </>}
      handleClose={togglePopup}
    />}
        </div>
    )
}

export default AdUpdate

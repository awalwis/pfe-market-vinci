import React, { useContext,useState } from "react";
import adsContext from "contexts/adsContext";
import {useParams} from "react-router-dom";
import AdDetail from "./AdDetail";
import AdUpdateForm from "./AdUpdateForm";
import { useNavigate } from 'react-router-dom';

const AdUpdate = ()=>{ 

    const {
        retrievedAd,
        deleteAd
    } = useContext(adsContext);
    const id = useParams().id;    
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    // need to check if admin/ad's owner
    const handleDelete = () => {
        deleteAd(id);
        navigate('/listAd')
    }
    return (
        <div>
        <AdDetail ad={retrievedAd}/>
        <button onClick={handleDelete}> Supprimer l'annonce </button>
        <button onClick={togglePopup}> Modfier l'annonce </button>
        {isOpen && <AdUpdateForm ad={retrievedAd}
      content={<>
      </>}
      handleClose={togglePopup}
    />}
        </div>
    )
}

export default AdUpdate

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
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
        </div>
    )
}

export default AdUpdate

import React, { useContext,useState } from "react";
import adsContext from "contexts/adsContext";
import {useParams} from "react-router-dom";
import AdDetail from "./AdDetail";
import AdUpdateForm from "./AdUpdateForm";
import { useNavigate } from 'react-router-dom';
import * as AdsApi from 'services/adsApi'

const AdUpdate = ()=>{ 

    const {
        deleteAd
    } = useContext(adsContext);
    const id = useParams().id;    
    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState("")
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    async function test(){
       await AdsApi
    .get(id)
    .then(res=>{
        setAd(res.ad)   
      })      
    }
    // need to check if admin/ad's owner
    const handleDelete = () => {
        deleteAd(id);
        navigate('/Home')
    }
    return (
        <div>
        <AdDetail ad={ad}/>
        <button onClick={handleDelete}> Supprimer l'annonce </button>
        <button onClick={togglePopup}> Modfier l'annonce </button>
        <button onClick={test}> Afficher les détails </button>
        {isOpen && <AdUpdateForm ad={ad}/>}
        </div>
    )
}

export default AdUpdate

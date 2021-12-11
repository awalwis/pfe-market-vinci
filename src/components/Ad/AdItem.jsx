import React, { useContext,useState } from "react";
import adsContext from "contexts/adsContext";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdDetail";
import AdUpdateForm from "components/Ad/AdUpdateForm";
import {authService} from "services/auth.service";
import * as AdsApi from 'services/adsApi'

const AdItem = ()=>{ 

    const {
        deleteAd,
        retrievedAd,
        
    } = useContext(adsContext);
    const id = useParams().id;    
    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState("")
    const user = authService.getCurrentUser()
    const history = useHistory()

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    async function ShowDetails(){
       await AdsApi
    .get(id)
    .then(res=>{
        setAd(res.ad)   
      })      
    }
    // need to check if admin/ad's owner
    const handleDelete = () => {
        deleteAd(id);
        alert("Annonce Supprimée")
        history.push('/Home')
    }
   // if(retrievedAd){
        return (
            <div>
            <AdDetail ad={ad}/>
            <button onClick={handleDelete}> Supprimer l'annonce </button>
            <button onClick={togglePopup}> Modfier l'annonce </button>
            <button onClick={ShowDetails}> Afficher les détails </button>
            {isOpen && <AdUpdateForm ad={ad}/>}
            </div>
        )
 //   }
    return(
        <div>
            <h2>Cette annonce n'existe pas</h2>
        </div>
    )

}

export default AdItem

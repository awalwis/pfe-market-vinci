import React, { useContext,useState,useEffect } from "react";
import adsContext from "contexts/adsContext";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdItem/AdDetail"
import AdUpdateForm from "components/Ad/AdItem/AdUpdateForm"
import {authService} from "services/auth.service";
import * as AdsApi from 'services/ads.service'
import * as mediasApi from 'services/mediasApi'
import { adService } from "services/ads.service";

const AdItem = ()=>{ 

    const {
        deleteAd,
        
    } = useContext(adsContext);
    
    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState("")
    const [isLoading,setIsLoading]=useState(true)
    const [adUserId,setAdUserId] =useState("")
    const [pictures,setPictures] = useState("")
    const user = authService.getCurrentUser()
    const id = useParams().id;  
    const history = useHistory()
   
    
  
    const togglePopup = () => {
        if(user.id_user===adUserId || user.role==="admin"){
            setIsOpen(!isOpen);
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la modifier")
        }

    }

    // need to check if admin/ad's owner
    const handleDelete = () => {
        if(user.id_user===adUserId || user.role==="admin"){
            deleteAd(id);
            alert("Annonce Supprimée")
            history.push('/Home')
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la supprimer")
        }
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            const retrievedAd = await adService.get(id);
            setAd(retrievedAd);
            setAdUserId(retrievedAd.ad.id_user) 
           const retrievedPictures= await mediasApi.getByAdId(id)
            setPictures(retrievedPictures.medias)
            setIsLoading(false);  
        }
        fetchData();
    },[id]);
  
    if(isLoading)
        return (
            <div>
                Loading...
            </div>
        )
    
    return(
        <div>
             <AdDetail ad={ad} adPictures={pictures}/>
            <button onClick={handleDelete}> Supprimer l'annonce </button>
            <button onClick={togglePopup}> Modfier l'annonce </button>
            {isOpen && <AdUpdateForm ad={ad}/>}
           
            </div>
        
    )
}

export default AdItem

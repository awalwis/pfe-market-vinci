import React, { useContext,useState,useEffect } from "react";
import adsContext from "contexts/adsContext";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdItem/AdDetail"
import AdUpdateForm from "components/Ad/AdItem/AdUpdateForm"
import {authService} from "services/auth.service";
import * as AdsApi from 'services/adsApi'


const AdItem = ()=>{ 

    const {
        deleteAd,
        
    } = useContext(adsContext);
    const id = useParams().id;    
    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState("")
    const user = authService.getCurrentUser()
    const history = useHistory()
    const [isLoading,setIsLoading]=useState(true)
    const [adUserId,setAdUserId] =useState("")
  
    const togglePopup = () => {
       /*  if(user.id_user===adUserId || user.role==="admin"){
            setIsOpen(!isOpen);
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la modifier")
        } */
        setIsOpen(!isOpen);

    }

    // need to check if admin/ad's owner
    const handleDelete = () => {
       /*  if(user.id_user===adUserId || user.role==="admin"){
            
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la supprimer")
        } */
        deleteAd(id);
            alert("Annonce Supprimée")
            history.push('/Home')
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            const retrievedAd = await AdsApi.get(id);
            setAd(retrievedAd);
            setAdUserId(retrievedAd.id_user)
            setIsLoading(false);
            console.log("dans le await ",retrievedAd.id_user)
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
             <AdDetail ad={ad}/>
            <button onClick={handleDelete}> Supprimer l'annonce </button>
            <button onClick={togglePopup}> Modfier l'annonce </button>
            {isOpen && <AdUpdateForm ad={ad}/>}
           
            </div>
        
    )
    

}

export default AdItem

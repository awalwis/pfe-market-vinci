import React, {useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdItem/AdDetail"
import AdUpdateForm from "components/Ad/AdItem/AdUpdateForm"
import {authService} from "services/auth.service";
import {adService} from 'services/ads.service'
import {mediaService} from 'services/medias.service'
import { userService } from "services/users.service";


const AdItem = ()=>{ 
    
    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState("")
    const [isLoading,setIsLoading]=useState(true)
    const [adUserId,setAdUserId] =useState("")
    const [medias,setMedias] = useState("")
    const [seller,SetSeller]=useState("")
    const [sellerInfo,setSellerInfo]=useState(false)
    const user = authService.getCurrentUser()
    const [refreshKey, setRefreshKey] = useState(0);
    const id = useParams().id;  
    const history = useHistory()
   
    
  
    const handleUpdate = () => {
        if(user.id_user===adUserId || user.role==="admin"){
            setIsOpen(!isOpen);
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la modifier")
        }

    }

    const handleDelete = () => {
        if(user.id_user===adUserId || user.role==="admin"){
            adService.remove(id);
            alert("Annonce Supprimée")
            history.push('/Home')
        }else{
            alert("Cette annonce ne vous appartient pas vous me pouvez pas la supprimer")
        }
    }
    const handleDetailSeller=()=>{ 
        setSellerInfo(!sellerInfo)
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            const retrievedAd = await adService.get(id);
            setAd(retrievedAd);
            setAdUserId(retrievedAd.ad.id_user)
            const retrievedMedias= await mediaService.getByAdId(id)
            setMedias(retrievedMedias.medias)
            retrievedAd.ad.displayed_picture = retrievedMedias.medias[0].id_media
            const retrievedAdSeller = await userService.getById(retrievedAd.ad.id_user)
            SetSeller(retrievedAdSeller) 
            setIsLoading(false);  
        }
        fetchData();
    },[refreshKey]);
    
    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
             <AdDetail ad={ad} adMedias={medias}/>
            <button onClick={handleDelete}> Supprimer l'annonce </button>
            <button onClick={handleUpdate}> Modfier l'annonce </button>
            <button onClick={handleDetailSeller}>Infos Vendeur</button>
            {isOpen && <AdUpdateForm ad={ad} setRefreshKey={setRefreshKey} refreshKey={refreshKey} adMedias={medias}/>}
            {sellerInfo &&
            <ul>
            <li>Nom: {seller.user.last_name}</li>
            <li>Prénom: {seller.user.first_name}</li>
            <li>Mail: {seller.user.email}</li>
            <li>Campus: {seller.user.campus}</li>
            </ul>}
         </div>
        
    )
}

export default AdItem

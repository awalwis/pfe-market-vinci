import React, { useContext,useState } from "react";
import adsContext from "contexts/adsContext";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdDetail";
import AdUpdateForm from "components/Ad/AdUpdateForm";
import {authService} from "services/auth.service";
import * as AdsApi from 'services/adsApi'
import render from "enzyme/build/render";


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
    const [loading,setLoading]=useState(true)

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
   /*  async function ShowDetails(){
       await AdsApi
    .get(id)
    .then(res=>{
        setAd(res.ad)   
      })      
    } */
    // need to check if admin/ad's owner
    function componentDidMount(){
        this.loadAd()
    }
    const handleDelete = () => {
        deleteAd(id);
        alert("Annonce Supprimée")
        history.push('/Home')
    }
    if(loading){
        return (
             <div>
                <h2>Loading</h2>
                <button> Afficher les détails </button>
             </div>
        )
    }
    render()
    return(
        <div>
            <button onClick={handleDelete}> Supprimer l'annonce </button>
            <button onClick={togglePopup}> Modfier l'annonce </button>
            {isOpen && <AdUpdateForm ad={ad}/>}
            <AdDetail ad={ad}/>
            </div>
        
    )
    

}

export default AdItem

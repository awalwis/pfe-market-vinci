import React, { useContext, useState } from "react";
import adsContext from "contexts/adsContext";
import {useHistory} from 'react-router-dom';
import {authService} from "services/auth.service";
import FileUploadComponent from "components/Ad/AdNewForm/fileUpload.component";

const AdNewForm = () => {

    const [adCreated,setAdCreated] =useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price,setPrice] = useState(0) 
    const [type, setType] = useState("")
    const [id_category,setCategory] = useState(0)
    const currentUser = authService.getCurrentUser()
    const id_user = currentUser.id_user
    const [isPaying, setIsPaying]= useState(false)
    const[displayed_picture,setDisplayedPicture] = useState(0)
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
    const history =useHistory();
    const {addNewAd,adId} = useContext(adsContext);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      
    }
    
    const handleIsPaying =(e)=>{
        if(e.target.value==="isPaying"){
            setIsPaying(true)
            setType("sell")
        }else{
            setIsPaying(false)
            setType("give")
        }
    }
    
    const handlePriceChange =(e)=>{
        setPrice(parseInt(e.target.value));
        
       
    }
    const handleDisplayPicture=()=>{
        console.log("ici handle pict")
        setDisplayedPicture(1)
    }

    const handleCategorieChange=(e)=>{
        setCategory(parseInt(e.target.value))
    }
    // à modifier à 'ajoute de l'image
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplayedPicture(0)   
        const newAd = {
            date,
            description,
            displayed_picture,
            id_category,
            price,
            state: "pending",
            title,
            type,
            id_user        
        };
        addNewAd(newAd)
        setAdCreated(true)
        setTitle("");
        setDescription("");
        setPrice(0)
        setCategory(0)  
       // history.push("/home")
       alert("Ajout effectué, Veuillez ajouté une image à cette annonce")
    }
    const showAddPrice=()=>{
       
            return(
                <div>
                Entrez un prix pour cette annonce <input type="number" value={price} onChange={handlePriceChange}/>
                </div>
            )
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>    
                Entrez un titre pour votre annonce <input type="text" value={title} onChange={handleTitleChange} required/> 
                Entrez une description pour votre annonce <input type="textarea" value={description} onChange={handleDescriptionChange} required/>
                    <div onChange={handleCategorieChange}>
                            <select id = "dropdown">
                                <option value="N/A">N/A</option>
                                <option value="1">Categorie 1</option>
                                <option value="2">Categorie 2</option>
                                <option value="3">Categorie 3</option>
                             </select>
                    </div>
                    <div onChange={event=>handleIsPaying(event)}>
                        Gratuit <input type="radio" name="type" value="isFree" required/>
                        Payant <input type="radio" name="type" value="isPaying" required/>
                    </div>
                     {isPaying && showAddPrice()}
           
                 <button type="submit">Créer</button>     
            </form>
            {adCreated &&<FileUploadComponent id={adId} handle={handleDisplayPicture}/>}
         </div>
       
    )
}

export default AdNewForm

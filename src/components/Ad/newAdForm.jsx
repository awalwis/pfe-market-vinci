import React, { useContext, useState } from "react";
import adsContext from "contexts/adsContext";
import { useNavigate } from 'react-router-dom';

const NewAdForm = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price,setPrice] = useState(0) 
    const [type, setType] = useState("")
    const [id_category,setCategory] = useState(0)
    const [id_user,setUser] = useState(0)
    const [isPaying, setIsPaying]= useState(false)
    const[displayed_picture,setDisplayedPicture] = useState(0)
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
    const navigate = useNavigate();

    

    const {addNewAd} = useContext(adsContext);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setUser(parseInt("14"))
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

    const handleCategorieChange=(e)=>{
        setCategory(parseInt(e.target.value))
    }
    // à modifier à 'ajoute de l'image
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplayedPicture(parseInt("0"))
      
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
        addNewAd(newAd);
        setTitle("");
        setDescription("");
        setPrice(0)
        setCategory(0)
        setUser(0)  
       // navigate("/listAd")
    }
    const showAddPrice=()=>{
       
            return(
                <div>
                Entrez un prix pour cette annonce <input type="number" value={price} onChange={handlePriceChange}/>
                </div>
            )
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Entrez un titre pour votre annonce <input type="text" value={title} onChange={handleTitleChange} required/> 
                Entrez une description pour votre annonce <input type="textarea" value={description} onChange={handleDescriptionChange} required/>
                    <div onChange={handleCategorieChange}>
                        Choisissez la catégorie de votre objet:                     
                        Categorie 1 <input type="checkbox" name="category" value="1" />
                        Categorie 2 <input type="checkbox" name="category" value="2" />
                        Categorie 3 <input type="checkbox" name="category" value="3" />
                    </div>
                    <div onChange={event=>handleIsPaying(event)}>
                        Gratuit <input type="radio" name="type" value="isFree" required/>
                        Payant <input type="radio" name="type" value="isPaying" required/>
                    </div>
                {isPaying && showAddPrice()}
            </div>
            <button type="submit">Créer</button>     
        </form>
    )
}

export default NewAdForm

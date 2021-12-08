import React, { useContext, useState } from "react";
import adsContext from "contexts/adsContext";

const NewAdForm = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [isPaying, setIsPaying]= useState(false)
    const [price,setPrice] = useState(0) 

    

    const {addNewAd} = useContext(adsContext);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }
    
    const handleIsPaying =(e)=>{
        if(e.target.value==="isPaying"){
            setIsPaying(true)
            setType("sold")
        }else{
            setIsPaying(false)
            setType("give")
        }
    }
    const handlePriceChange =(e)=>{
        setPrice(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewAd(title,type,description,location,price);
        setTitle("");
        setLocation("");
        setDescription("");
        setPrice(0)
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
                Entrez un titre pour votre annonce <input type="text" value={title} onChange={handleTitleChange}/> 
                Entrez une description pour votre annonce <input type="textarea" value={description} onChange={handleDescriptionChange} />
                Entrez une adresse pour votre annonce <input type="text" value={location} onChange={handleLocationChange} />
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

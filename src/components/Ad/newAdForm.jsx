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
        switch(e.target.value){
            case "Ixelles":
                setLocation("Av. Adolphe Buyl 87, 1000 Ixelles")
                return;
            case "Louvain-La-Neuve":
                setLocation("Pl. de l'Université 1, 1348 Ottignies-Louvain-la-Neuve")
                return;
            case "Woluwe":
                setLocation("Clos Chapelle-aux-Champs 43, 1200 Woluwe-Saint-Lambert")
                return;            
            default:
                setLocation("Av. Adolphe Buyl 87, 1000 Ixelles")
                return;
        }
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
                Entrez un titre pour votre annonce <input type="text" value={title} onChange={handleTitleChange} required/> 
                Entrez une description pour votre annonce <input type="textarea" value={description} onChange={handleDescriptionChange} required/>
                    <div onChange={handleLocationChange}>
                        Choisissez une localité:                     
                        Ixelles <input type="radio" name="localite" value="Ixelles" required/>
                        Louvain-La-Neuve <input type="radio" name="localite" value="Louvain-La-Neuve" required/>
                        Woluwe <input type="radio" name="localite" value="Woluwe" required/>
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

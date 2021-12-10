import React,{ useContext,useState }  from "react";
import adsContext from "contexts/adsContext"
 
const AdUpdateForm = (ad) => {

    const {
        updateAd     
    } = useContext(adsContext);

    const [title, setTitle] = useState(ad.title)
    const [description, setDescription] = useState(ad.description)
    const [price,setPrice] = useState(ad.price) 
    const [type, setType] = useState(ad.type)
    const [location, setLocation] = useState(ad.location)
    const [state, setState] = useState(ad.state)

    //besoin de check si admin/proprio
    
    const update = (e) => {
        const updatedAd = {
                title,
                description,
                price,
                type,
                location,
                state
        };
        updateAd(ad.id, updatedAd)
    };
    const handleUpdate =(e)=>{
        switch (e.target.name){
            case "title":
                setTitle(e.target.value)
                break;
            case "description":
                setDescription(e.target.value)
                break;
            case "price":
                setPrice(e.target.value)
                break;
            case "type":
                setType(e.target.value)
                break;
            case "location":
                setLocation(e.target.value)
                break; 
            case "state":
                setState(e.target.value)
                break;                       

        }

    }

  return (
    <div>
         <form onSubmit={update}>
         <input type="text" name="title"value={ad.title} onChange={handleUpdate}/>
         <input type="text" name="description" value={ad.description}onChange={handleUpdate}/>
         <input type="number"name="price" value={ad.price}onChange={handleUpdate}/>
         <input type="text" name="location" value={ad.location}onChange={handleUpdate}/>
         <input type="text" name="category" value={ad.category}onChange={handleUpdate}/>
         <input type="text" name="state" value={ad.state}onChange={handleUpdate}/>
         <input type="text" name="type" value={ad.type}onChange={handleUpdate}/>

         <button type="submit">Modifier</button>    
         </form>
         
    </div>
  );
};
 
export default AdUpdateForm;
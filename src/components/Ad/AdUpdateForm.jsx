import React,{ useContext,useState }  from "react";
import adsContext from "contexts/adsContext"
 
const AdUpdateForm = (ad) => {

    console.log(ad)
    const {
        updateAd     
    } = useContext(adsContext);

    const [title, setTitle] = useState(ad.title)
    const [description, setDescription] = useState(ad.description)
    const [price,setPrice] = useState(ad.price) 
    const [type, setType] = useState(ad.type)
    const [state, setState] = useState(ad.state)
    const [id_user,setUser] = useState(ad.id_user)
    const [id_category,setCategory] = useState(ad.id_category)
    const[displayed_picture,setDisplayedPicture] = useState(ad.displayed_picture)
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    //besoin de check si admin/proprio
    
    const update = (e) => {
        const updatedAd = {
                date,
                title,
                description,
                price,
                type,
                state,
                id_category,
                id_user,
                displayed_picture
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
                setCategory(e.target.value)
                break; 
            case "state":
                setState(e.target.value)
                break;                       
            default:
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
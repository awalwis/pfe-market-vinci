import React,{ useContext,useState }  from "react";
import adsContext from "contexts/adsContext"
 
const AdUpdateForm = ({ad}) => {

    const {
        updateAd     
    } = useContext(adsContext);

    const [title, setTitle] = useState(ad.title)
    const [description, setDescription] = useState(ad.description)
    const [price,setPrice] = useState(parseInt(ad.price)) 
    const [type, setType] = useState(ad.type)
    const [state, setState] = useState(ad.sate)
    const [id_user,setUser] = useState(parseInt(ad.id_user))
    const [id_category,setCategory] = useState(parseInt(ad.id_category))
    const[displayed_picture,setDisplayedPicture] = useState(parseInt(ad.displayed_picture))
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    //besoin de check si admin/proprio
    
    const handleSubmit = (e) => {
        e.preventDefault();
     
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
        updateAd(ad.id_ad, updatedAd)
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
            case "state":
                setState(e.target.value)
                break;                       
            default:
                break;
        }      
    }     
  return (
    <div>
         <form onSubmit={handleSubmit}>
            Titre: <input type="text" name="title"placeholder={ad.title} onChange={handleUpdate}/>
            Description: <input type="text" name="description" placeholder={ad.description}onChange={handleUpdate}/>
            Prix: <input type="number"name="price" placeholder={ad.price}onChange={handleUpdate}/>
            Category:<input type="text" name="category" placeholder={ad.category}onChange={handleUpdate}/>
            Etat:  <input type="text" name="state" placeholder={ad.sate}onChange={handleUpdate}/>
            Type: <input type="text" name="type" placeholder={ad.type}onChange={handleUpdate}/>
         <button type="submit">Modifier</button>    
         </form>    
    </div>
  );
};
 
export default AdUpdateForm;
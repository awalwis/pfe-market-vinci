import React,{ useContext,useState }  from "react";
import adsContext from "contexts/adsContext"
 
const AdUpdateForm = ({ad}) => {

    const {
        updateAd     
    } = useContext(adsContext);

   
    const [title, setTitle] = useState(ad.ad.title)
    const [description, setDescription] = useState(ad.ad.description)
    const [price,setPrice] = useState(parseInt(ad.ad.price)) 
    const [type, setType] = useState(ad.ad.type)
    const [state, setState] = useState(ad.ad.sate)
    const id_user = parseInt(ad.ad.id_user)
    const [id_category,setCategory] = useState(parseInt(ad.ad.id_category))
    const[displayed_picture,setDisplayedPicture] = useState(parseInt(ad.ad.displayed_picture))
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    
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
        
        updateAd(ad.ad.id_ad, updatedAd)
        alert("Mise à jour de l'annonce effectuée")
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
                setPrice(parseInt(e.target.value))
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
            Titre: <input type="text" name="title"placeholder={ad.ad.title} onChange={handleUpdate}/>
            Description: <input type="text" name="description" placeholder={ad.ad.description}onChange={handleUpdate}/>
            Prix: <input type="number"name="price" placeholder={ad.ad.price}onChange={handleUpdate}/>
            Category:<input type="text" name="category" placeholder={ad.ad.category}onChange={handleUpdate}/>
            Etat:  <input type="text" name="state" placeholder={ad.ad.sate}onChange={handleUpdate}/>
            Type: <input type="text" name="type" placeholder={ad.ad.type}onChange={handleUpdate}/>

         <button type="submit">Modifier</button>    
         </form>    
    </div>
  );
};
 
export default AdUpdateForm;
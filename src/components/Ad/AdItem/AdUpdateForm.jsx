import React,{ useState }  from "react";
import {adService} from 'services/ads.service'
import FileUploadComponent from "components/Ad/AdNewForm/fileUpload.component";
import Category from "components/Category/Category";
 
const AdUpdateForm = ({ad,setRefreshKey,refreshKey,adMedias}) => {

    const [title, setTitle] = useState(ad.title)
    const [description, setDescription] = useState(ad.description)
    const [price,setPrice] = useState(parseInt(ad.price)) 
    const [type, setType] = useState(ad.type)
    const [state, setState] = useState(ad.state)
    const id_user = parseInt(ad.id_user)
    const [id_category,setCategory] = useState(parseInt(ad.id_category))
    const[displayed_picture,setDisplayedPicture] = useState(parseInt(ad.displayed_picture))
    const[isChangeDisplayPicture,setIsChangeDisplayPicture]=useState(false)
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
            adService.update(ad.id_ad, updatedAd)
        setRefreshKey(refreshKey+1)
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
                if(e.target.value ==="a donner")
                setPrice(0)
                break;
            case "state":
                setState(e.target.value)
                break;                       
            default:
                break;
        }      
    }     
    const handlePictureChange=()=>{
        setIsChangeDisplayPicture(!isChangeDisplayPicture)
        adMedias.filter(medias=>
            medias.type==="image")
    }
    const handleDisplayPicture=(e)=>{
       setDisplayedPicture(e.target.value)
       setIsChangeDisplayPicture(!isChangeDisplayPicture)
     
    }
  return (
        <div>
            <form onSubmit={handleSubmit}>
                Titre: <input type="text" name="title"placeholder={ad.title} onChange={handleUpdate}/>
                Description: <input type="text" name="description" placeholder={ad.description}onChange={handleUpdate}/>
                Prix: <input type="number"name="price" placeholder={ad.price}onChange={handleUpdate}/>
                <div onChange={handleUpdate}>
                En attente  <input type="radio" name="type" value="en attente" required/>
                Disponible  <input type="radio" name="type" value="disponible" required/>
                Vendu  <input type="radio" name="type" value="vendu" required/>
                </div>
                <div onChange={handleUpdate}>
                A donner  <input type="radio" name="type" value="a donner" required/>
                A vendre  <input type="radio" name="type" value="a vendre" required/>
                <Category setCategory={setCategory}/>
                </div>
                <FileUploadComponent id ={ad.id_ad}/>
                <button type="submit">Modifier</button>    
            </form>  
            <button onClick={handlePictureChange}>Changer d'image de d'affichage pour l'annonce</button>
            {isChangeDisplayPicture &&
           <div>   
               <p>Choissez l'image que vous souhaiter utiliser</p>
                {adMedias.map(media => {
                        return (
                            <>
                            <img key={media.id_media} src={media.url} alt="" />
                            <button value={media.id_media} onClick={handleDisplayPicture}>Valider</button>
                            </>
                        )
                })}
            </div>
             }
        </div>
    );
};
export default AdUpdateForm;
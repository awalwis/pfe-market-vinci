import React,{ useState }  from "react";
import {adService} from 'services/ads.service'
import Category from "components/Category/Category";
import DropzoneAreaComponent from "../AdNewForm/DropzoneArea";
import { mediaService } from "services/medias.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Button, Stack,Container,
    FormLabel,RadioGroup,FormControlLabel,Radio,TextField } from '@mui/material';
import {Button as ButtonReact}  from "react-bootstrap";
import { notificationService } from "services/notifications.service";

 
const AdUpdateForm = ({ad,setRefreshKey,refreshKey,setIsOpen,adMedias}) => {

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
    const[medias,setMedias] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(medias.length<1){
            if(adMedias.filter(medias=>medias.type==="image").length<1){
                toast.error('Erreur : Image requise !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                return
            }
        }else{
            let img = false;
            if(adMedias.filter(medias=>medias.type==="image").length<1){
                medias.map((media)=>{
                    if(media['type'].includes('image')){
                        img=true;
                        return;
                    }
                })
            }else{
                img=true;
            }
            if(!img){
                toast.error('Erreur : Il faut au moins 1 image !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                return
            }
        }
        if(id_category===0){
            toast.error('Erreur : Categorie requise !', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            return
        }
        let idToast = toast.loading("Modification de l'annonce",{position: "bottom-right"})
        await addMediaAndUpdate();
        let currentDate = new Date();
        let date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
        let newNotif = {
            message:"Votre annonce ''"+title+"'' a été modifiée",
            date:date,
            id_user:id_user
        }
        console.log(newNotif);
        await notificationService.createNotification(newNotif);
        setRefreshKey(refreshKey+1);
        toast.update(idToast,{
            render: 'Annonce modifiée !',
            type: "success",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        setIsOpen(false);
    };

    const addMediaAndUpdate=async ()=>{
        const mediaPromise = medias.map(async (media)=>{
            let urlMedia = await mediaService.UploadMedias(media, id_user);
            let newMedia = {}
            if(media['type'].includes('video')){
                newMedia = {
                    url:urlMedia,
                    type:'video',
                    id_ad: ad.id_ad,
                }
            }else if(media['type'].includes('image')){
                newMedia = {
                    url:urlMedia,
                    type:'image',
                    id_ad: ad.id_ad,
                }
            }
            await mediaService.createNewMedia(newMedia);
        })
        await Promise.all(mediaPromise);
        let mediasChild = await mediaService.getByAdId(ad.id_ad);
        const mediaChildPromise = mediasChild.map(async (mediaChild)=>{
            if(mediaChild.type==="image"){
                const newAd = {
                    date,
                    title,
                    description,
                    price,
                    type,
                    state,
                    id_category,
                    id_user,
                    displayed_picture: mediaChild.id_media     
                };
                console.log(newAd)
                await adService.update(ad.id_ad, newAd)
                return
            }
        })
        await Promise.all(mediaChildPromise);
    }

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
            default:
                break;
        }      
    }     
    const handlePictureChange=()=>{
        library.add(faHeart, far)
        setIsChangeDisplayPicture(!isChangeDisplayPicture)
    }
    const handleDisplayPicture=async (e)=>{
        let id;
        if(e.currentTarget){
            id = e.currentTarget.id;
        }else{
            id = e;
        }
        if(id !== displayed_picture){
            let idToastModif = toast.loading("Modification de la photo favorite",{position: "bottom-right"})
            setDisplayedPicture(id)
            const newAd = {
                date,
                title,
                description,
                price,
                type,
                state,
                id_category,
                id_user,
                displayed_picture: parseInt(id)
            };
            await adService.update(ad.id_ad, newAd)
            toast.update(idToastModif,{
                render: 'Photo favorite modifiée !',
                type: "success",
                isLoading: false,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });            
        }
    }

    const deletePicture=async (e)=>{
        let idToast = toast.loading("Suppression de l'image",{position: "bottom-right"})
        if(e.target.dataset.type === "video"){
            await mediaService.deleteMedia(e.target.dataset.id);
            await mediaService.deleteBlob(e.target.dataset.url);
            toast.update(idToast,{
                render: 'Video supprimée !',
                type: "success",
                isLoading: false,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });    
            setRefreshKey(refreshKey+1);
            return;
        }
        if(adMedias.filter(medias=>medias.type==="image").length>1){
            if(e.target.dataset.fav){
                adMedias.filter(medias=>medias.type==="image").map((media)=>{
                    if(media.id_media!=e.target.dataset.id){
                        handleDisplayPicture(media.id_media);
                        return;
                    }
                })

            }
            await mediaService.deleteMedia(e.target.dataset.id);
            await mediaService.deleteBlob(e.target.dataset.url);
            toast.update(idToast,{
                render: 'Image supprimée !',
                type: "success",
                isLoading: false,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });    
            setRefreshKey(refreshKey+1);
        }else{
            toast.update(idToast,{
                render: '1 image minimum !',
                type: "error",
                isLoading: false,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });  
        }
    }

    return (
        
         <Container sx={{ maxWidth :'sm',border :"solid",borderRadius : 10}}>
             <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
                <TextField
                    id="outlined-required"
                    label="Titre de l'annonce"
                    name="title"
                    defaultValue={ad.title}
                    onChange={handleUpdate}
                    required
                    />
                <TextField
                    id="outlined-required"
                    label="Description de l'annonce"
                    name="description"
                    defaultValue={ad.description}
                    multiline
                    rows={3}
                    onChange={handleUpdate}
                    required
                />
                <TextField
                        fullWidth
                        id="outlined-number"
                        label="Prix de l'annonce"
                        type="number"
                        name="price"
                        defaultValue={ad.price}
                        onChange={handleUpdate}
                        required        
                />
              </Stack>
                <FormLabel component="legend">Type d'annonce</FormLabel>
                <RadioGroup row aria-label="adType" name="controlled-radio-buttons-group"
                    defaultValue={ad.type}
                    onChange={handleUpdate}
                >
                <FormControlLabel name="type" value="a donner" control={<Radio />} label="A donner" aria-required />
                <FormControlLabel name="type" value="a vendre" control={<Radio />} label="A vendre" aria-required />
                </RadioGroup>
             
            <Category setCategory={setCategory} idDefault={id_category}/>
            <DropzoneAreaComponent setMedias={setMedias} medias={medias}/>   
            <Button variant="contained" size="medium" type="submit">Modifier</Button> 
            </form>
            <br/>
            <Button variant="contained" size="medium" onClick={handlePictureChange}>Modifier vos images</Button> 
            {isChangeDisplayPicture &&
                 <div>   
                 <p>Choissez l'image que vous souhaiter utiliser</p>
                 {adMedias.map(media => {
                     if(media.type==="video"){
                         return (
                             <div key={media.id_media}>
                                 <img src={media.url} alt="" />
                                 <ButtonReact variant="danger" data-type={media.type} data-fav={true} data-url={media.url} data-id={media.id_media} onClick={deletePicture}>Supprimer</ButtonReact>
                             </div>
                         )
                     }
                     if(displayed_picture === media.id_media){
                         return (
                             <div key={media.id_media}>
                                 <img src={media.url} alt="" />
                                 <FontAwesomeIcon id={media.id_media} onClick={handleDisplayPicture} icon="heart"/>
                                 <ButtonReact variant="danger" data-type={media.type} data-fav={true} data-url={media.url} data-id={media.id_media} onClick={deletePicture}>Supprimer</ButtonReact>
                             </div>
                         )
                     }else{
                         return (
                             <div key={media.id_media}>
                                 <img src={media.url} alt="" />
                                 <FontAwesomeIcon id={media.id_media} onClick={handleDisplayPicture} icon={["far","heart"]}/>
                                 <ButtonReact variant="danger" data-type={media.type} data-fav={false} data-url={media.url} data-id={media.id_media} onClick={deletePicture}>Supprimer</ButtonReact>
                             </div>
                         )
                     }
                     
                 })}
             </div>
            }
        </Container>    
    );         
};
export default AdUpdateForm;
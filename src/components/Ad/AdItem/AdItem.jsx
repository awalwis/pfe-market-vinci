import React, {useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom";
import AdDetail from "components/Ad/AdItem/AdDetail"
import AdUpdateForm from "components/Ad/AdItem/AdUpdateForm"
import {authService} from "services/auth.service";
import {adService} from 'services/ads.service'
import {mediaService} from 'services/medias.service'
import {userService} from "services/users.service";
import { categoryService } from "services/categories.service";
import { ToastContainer, toast } from 'react-toastify';
import {Loader} from "components/Loading/Loading";
import Map from "./Map";
import NotFound from "pages/Page404"
import { notificationService } from "services/notifications.service";
import { Button, Container, Typography } from "@mui/material";
import ListInfosUser from "components/User/ListInfosUser";

const AdItem = ()=>{

    const history = useHistory()
    const user = authService.getCurrentUser();

    if(!user){
        history.push('/')
    }

    const [isOpen, setIsOpen] = useState(false);
    const [ad,setAd]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [adUserId,setAdUserId] =useState("")
    const [medias,setMedias] = useState([])
    const [seller,SetSeller]=useState("")
    const [category,setCategory]=useState("")
    const [sellerInfo,setSellerInfo]=useState(true)
    const [notExist,setNotExist] = useState(false)
    const userRole = authService.getRoleCurrentUser();
    const [refreshKey, setRefreshKey] = useState(0);
    const id = useParams().id;

    if(adUserId){
        if(ad.state==="en attente"){
            if(user.id_user!==adUserId && userRole!=="admin"){
                history.push('/')
            }
        }
    }
    
   
    const handleUpdate = () => {
        setIsOpen(!isOpen);
    }

    const handleDelete = async () => {
        let idToast = toast.loading("Suppression de l'annonce",{position: "bottom-right"})
        console.log(medias);
        const allPromise = medias.map(async (media) => {
            console.log(media.url);
            await mediaService.deleteBlob(media.url)
        })
        await Promise.all(allPromise);
        await adService.remove(id);
        let currentDate = new Date();
        let date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
        let newNotif = {
            message:"Votre annonce ''"+ad.title+"'' a été suprimée",
            date:date,
            id_user:ad.id_user
        }
        await notificationService.createNotification(newNotif);
        toast.update(idToast,{
            render: 'Annonce supprimée !',
            type: "info",
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
        setTimeout(() => {history.push('/')}, 3000)
    }

    const handleDetailSeller=()=>{ 
        setSellerInfo(!sellerInfo)
    }

    const handleSold=async ()=>{ 
        const newAd = {
            date: ad.date,
            title: ad.title,
            description: ad.description,
            price: parseInt(ad.price),
            type: ad.type,
            state: "vendu",
            id_category: ad.id_category,
            id_user: ad.id_user,
            displayed_picture: ad.displayed_picture    
        };
        console.log(newAd);
        await adService.update(ad.id_ad, newAd);
        setRefreshKey(refreshKey+1);
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setAd("");
                const retrievedAd = await adService.get(id);
                setAd(retrievedAd);
                setAdUserId(retrievedAd.id_user)
                const retrievedMedias= await mediaService.getByAdId(id)
                setMedias(retrievedMedias)
                const retrievedAdSeller = await userService.getById(retrievedAd.id_user)
                SetSeller(retrievedAdSeller)
                const retrievedCategory = await categoryService.getById(retrievedAd.id_category).then(res=>res.data.category)
                setCategory(retrievedCategory)
                setIsLoading(false);
            }catch(e){
                setNotExist(true)
            }
        }
        fetchData();
    },[refreshKey]);

    const buttonDisplay = () =>{
        if(user.id_user===adUserId || userRole==="admin"){
            if(ad.state==="disponible"){
                return(
                    <>
                        <Button variant="outlined" value="deleteAd" size="medium" onClick={handleDelete}> Supprimer l'annonce </Button>
                        <Button variant="outlined" value="editAd" size="medium" onClick={handleUpdate}> Modfier l'annonce </Button>
                        <Button variant="outlined" value="sellerInfos" size="medium" onClick={handleDetailSeller}>Infos Vendeur</Button>
                        <Button variant="outlined" value="sold" size="medium" onClick={handleSold}>Vendu</Button>
                    </>
                )
            }else{
                return(
                    <>
                        <Button variant="outlined" value="deleteAd" size="medium" onClick={handleDelete}> Supprimer l'annonce </Button>
                        <Button variant="outlined" value="editAd" size="medium" onClick={handleUpdate}> Modfier l'annonce </Button>
                        <Button variant="outlined" value="sellerInfos" size="medium" onClick={handleDetailSeller}>Infos Vendeur</Button>
                    </>
                )
            }
        }else{
            return(
                null
            )
        }
    }
    
    if(notExist && isLoading){
        return(
            <div>
               <NotFound/>
            </div>
        )
    }

    if(isLoading){
       
        return (
            <>
                <Loader.BigLoader />  
            </>
        )
    }

    return(
        <div>
            <AdDetail ad={ad} adMedias={medias} category={category}/>
            <Container>{buttonDisplay()}</Container>
            <br/>
            {isOpen && <AdUpdateForm ad={ad} setRefreshKey={setRefreshKey} refreshKey={refreshKey} setIsOpen={setIsOpen} adMedias={medias}/>}
            {sellerInfo &&
            <>
                <Container className="border-top-0 bg-white rounded border py-4 mt-4">
                    <Typography className="mb-2" variant="subtitle2">Infos vendeur</Typography>
                    <ListInfosUser user={seller.user}/>
                    <div id="map_canvas">
                    <Map seller={seller} />
                    </div>
                </Container>
            </>
            }   
            <ToastContainer />
            
        </div>
        
    )
}

export default AdItem

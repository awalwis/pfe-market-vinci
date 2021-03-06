import React from "react"; 
import { Table } from 'react-bootstrap';
import { adService } from "services/ads.service";
import {mediaService} from 'services/medias.service'
import { notificationService } from "services/notifications.service";
import {useHistory} from "react-router-dom";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import { toast } from 'react-toastify';
import { FormControl,InputLabel,MenuItem,Select,Button } from "@mui/material";
import DeleteIcone from "@material-ui/icons/DeleteRounded"

export default function Display(props) {

const DisplayAds = (props) => {

    const {ads} = props;
    const history = useHistory(); 

    const navigateToAdDetails = (id) =>{
        history.push("/annonces/"+id);
    }

    const changeSelectValue = async (ad, selectValue,id_user,title) => {
        let idToast = toast.loading("Changement d'etat",{position: "bottom-right"})
        let newAd = {
           title: ad.title,
           description: ad.description, 
           price: parseInt(ad.price), 
           date: ad.date,
           state: selectValue,
           type: ad.type,
           displayed_picture: ad.displayed_picture, 
           id_user: ad.id_user,
           id_category: ad.id_category
        }
        let currentDate = new Date();
        let date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
        let newNotif = {
            message:"L''etat de votre annonce ''"+ title +"'' a été changé par ''"+selectValue+"''",
            date:date,
            id_user:id_user
        }
        await notificationService.createNotification(newNotif);
        await adService.update(ad.id_ad, newAd);
        toast.update(idToast,{
            render: 'Etat changé !',
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

    const deleteAd = async (id, id_user, title) => {
        let idToast = toast.loading("Suppression de l'annonce",{position: "bottom-right"})
        let medias = await mediaService.getByAdId(id);
        console.log(medias);
        medias.map((media)=>{
            mediaService.deleteBlob(media.url);
        })
        let currentDate = new Date();
        let date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
        let newNotif = {
            message:"Votre annonce ''"+ title +"'' a été supprimée",
            date:date,
            id_user:id_user
        }
        await notificationService.createNotification(newNotif);
        await adService.remove(id);
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
        props.setRefreshKey(props.refreshKey+1);
    }

    if(props.isLoading){
        return(
            <tr>
                <td colSpan={6}>
                    <Loader.BigLoader />
                </td>
            </tr>    
            )
    }else if(ads.length > 0) {
        return (
            ads.map((ad) => {
                return(
                    <tr className="tuple" key={ad.id_ad} >
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.title}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.date}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.type}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.price}
                            </td>
                            <td>
                            <FormControl fullWidth>
                                    <InputLabel >Etat</InputLabel>
                                    <Select
                                        defaultValue={ad.state}   
                                        label="state"
                                        onChange={e => changeSelectValue(ad,e.target.value,ad.id_user,ad.title)}
                                    >
                                        <MenuItem value="en attente">en attente</MenuItem>
                                        <MenuItem value="disponible">disponible</MenuItem>
                                        <MenuItem value="vendu">vendu</MenuItem>
                                    </Select>
                                </FormControl>
                            </td>
                            <td className='tdDelete'>
                                <Button variant="outlined" color="error" onClick={e => deleteAd(ad.id_ad, ad.id_user, ad.title)} startIcon={<DeleteIcone />}>Supprimer</Button>
                            </td>
                    </tr>
                )
            })
        )
    }else{
        return(
        <tr>
            <td className="center" colSpan={6}>
                <p> Aucun résultat trouvé</p>
            </td>
        </tr>    
        )
    }

}

return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>titre</th>
                    <th>date</th>
                    <th>type</th>
                    <th>prix</th>
                    <th>etat</th>
                </tr>
            </thead>
            <tbody>
                    {DisplayAds(props)}
            </tbody>
        </Table>
    </>
)

}
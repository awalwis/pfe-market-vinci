import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import UpdatePwd from "components/Profile/UpdatePwd";
import {authService} from "services/auth.service"
import {adService} from "../../services/ads.service";
import {mediaService} from "../../services/medias.service";
import DisplayMyAds from "./DisplayMyAds";
import {Stack} from "@mui/material";
import ListinfosUser from "components/User/ListInfosUser";
import UpdateProfile from "./UpdateProfile";


const ProfileData =  () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email;
    const [page, setPage] = useState("displayUser")

    const [modifAuthorized, setModifAuthorized] = useState(false);
    const [adsAvailable, setAdsAvailbale] = useState([]);
    const [adsPending, setAdsPending] = useState([]);
    const [adsSold, setAdsSold] = useState([]);
    const [mapUrl, setMapUrl] = useState({});


    const fetchData = async ()=>{
        console.log("email ",email)
        const data = await userService.getByEmail(email);
        setData(data);
        // if(data.data.user.role === "admin"){
        //     setStatusColor("danger");
        // }else if(data.data.user.role === "mute"){
        //     setStatusColor("warning");
        // }else if(data.data.user.role === "banned"){
        //     setStatusColor("danger");
        // } else {
        //     setStatusColor("primary");
        // }
        setLoading(false);
        if(authService.getRoleCurrentUser()==="admin" || data.data.user.email===authService.getCurrentUser().email )setModifAuthorized(true);
        let adsUser;
        if(data.data.user.id_user === authService.getCurrentUser().id_user || authService.getRoleCurrentUser() === "admin"){
            adsUser = await adService.getAllUser(data.data.user.id_user)
            setAdsPending(adsUser.ads.filter(ad=>ad.state==="en attente"));
            setAdsSold(adsUser.ads.filter(ad=>ad.state==="vendu"));
        }else{
            adsUser = await adService.getAllAvailableUser(data.data.user.id_user)
        }
        setAdsAvailbale(adsUser.ads.filter(ad=>ad.state==="disponible"));
        let mapUrl = {}
        const allPromise = adsUser.ads.map(async (ad)=>{
            let medias = await mediaService.getByAdId(ad.id_ad)
            medias.map((media)=>{
                if(media.id_media===ad.displayed_picture){
                    mapUrl[ad.id_ad]=media.url
                }
            })
        }) 
        await Promise.all(allPromise);
        setMapUrl(mapUrl);
    }

    useEffect(()=>{
        if(!authService.getCurrentUser()){
            history.push("/")
        }else{
            fetchData();
        }
    },[email]);


    if(isLoading)
        return (
            <div>
                <Loader.BigLoader />
            </div>
        )
    if(page==="updatePwd")return (<UpdatePwd user={data.data.user}/>)
    if(page==="updateInfos")return (<UpdateProfile user={data.data.user}/>)

    return (
        <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{paddingX: "50px"}}>
                    <CardContent>
                        <Stack spacing={3}>
                            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                                Mon profil
                            </Typography>

                            <ListinfosUser user={data.data.user}/>

                            {modifAuthorized && <><Button onClick={(e)=>{setPage("updateInfos")}}>Modifier mes informations</Button></>}
                        </Stack>
                    </CardContent>
                </Card>
            <DisplayMyAds adsAvailable={adsAvailable} adsPending={adsPending} adsSold={adsSold} mapUrl={mapUrl} id_user={data.data.user.id_user} currentIdUser={authService.getCurrentUser().id_user}  currentUserRole={authService.getRoleCurrentUser()}/>
        </Box>
    )
}
export default ProfileData;

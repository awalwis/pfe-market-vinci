import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {Badge, Card, Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import UpdatePwd from "components/Profile/UpdatePwd";
import {authService} from "services/auth.service"
import { adService } from "services/ads.service";
import { mediaService } from "services/medias.service";

const DisplayTable = ({adsAvailable,adsPending,adsSold,mapUrl,id_user,currentIdUser,currentUserRole}) => {
    if(id_user === currentIdUser || currentUserRole === "admin"){
        return(
            <>
                <h2>Annonces Disponible</h2>
                <DisplayTableAvailable adsAvailable={adsAvailable} mapUrl={mapUrl} />
                <h2>Annonces en attente</h2>
                <DisplayTablePending adsPending={adsPending} mapUrl={mapUrl} />
                <h2>Annonces vendue</h2>
                <DisplayTableSold adsSold={adsSold} mapUrl={mapUrl} />
            </>
        )  
    }else{
        return(
            <>
                <h2>Annonces Disponible</h2>
                <DisplayTableAvailable adsAvailable={adsAvailable} mapUrl={mapUrl} />
            </>
        )  
    }
    
}

const DisplayTableAvailable = ({adsAvailable, mapUrl}) => {
    const history = useHistory();

    const handleButton = (e) =>{
        history.push("/annonces/"+e.target.dataset.id);
    }
    return(
        adsAvailable.map((ad)=>{
            return(
                <Card key={ad.id_ad} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mapUrl[ad.id_ad]} />
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.description}
                        </Card.Text>
                        <Button data-id={ad.id_ad} onClick={handleButton} variant="primary">Plus info</Button>
                    </Card.Body>
                </Card>
            )
        }) 
    )  
}

const DisplayTablePending = ({adsPending, mapUrl}) => {
    const history = useHistory();

    const handleButton = (e) =>{
        history.push("/annonces/"+e.target.dataset.id);
    }
    return(
        adsPending.map((ad)=>{
            return(
                <Card key={ad.id_ad} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mapUrl[ad.id_ad]} />
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.description}
                        </Card.Text>
                        <Button data-id={ad.id_ad} onClick={handleButton} variant="primary">Plus info</Button>
                    </Card.Body>
                </Card>
            )
        }) 
    )  
}

const DisplayTableSold = ({adsSold, mapUrl}) => {
    const history = useHistory();

    const handleButton = (e) =>{
        history.push("/annonces/"+e.target.dataset.id);
    }
    return(
        adsSold.map((ad)=>{
            return(
                <Card key={ad.id_ad} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mapUrl[ad.id_ad]} />
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.description}
                        </Card.Text>
                        <Button data-id={ad.id_ad} onClick={handleButton} variant="primary">Plus info</Button>
                    </Card.Body>
                </Card>
            )
        }) 
    )  
}

const Profile =  () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email;
    const [statusColor, setStatusColor] = useState('');
    const [statusModif, setStatusModif] = useState(false);
    const [modifPwd, setModifPwd] = useState(false);
    const [updatedUser, setUpdatedUser] = useState()
    const [modifAuthorized, setModifAuthorized] = useState(false);
    const [adsAvailable, setAdsAvailbale] = useState([]);
    const [adsPending, setAdsPending] = useState([]);
    const [adsSold, setAdsSold] = useState([]);
    const [mapUrl, setMapUrl] = useState({});

    const modifierStatusModif = (e) => {
        e.preventDefault();
        setStatusModif(!statusModif);
    }
    const toggleModifPwd = (e) => {
        e.preventDefault();
        setModifPwd(!modifPwd);
    }

    function submitUpdate(e) {
        e.preventDefault();
        //todo  !! mettre un token dans le header !!
        userService.update(updatedUser.id_user,updatedUser).then(async ()=>{
            await fetchData();
            setStatusModif(false);
        })
        console.log("to submit: ", updatedUser)
    }

    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "last_name":
                setUpdatedUser({...updatedUser, last_name: event.target.value});
                break;
            case "first_name":
                setUpdatedUser({...updatedUser, first_name: event.target.value});
                break;
            case "email":
                setUpdatedUser({...updatedUser, email: event.target.value});
                break;
            case "password1":
                setUpdatedUser({...updatedUser, password1: event.target.value});
                break;
            case "password2":
                setUpdatedUser({...updatedUser, password2: event.target.value});
                break;
            case "campus":
                setUpdatedUser({...updatedUser, campus: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }
    }

    const fetchData = async ()=>{
        console.log("email ",email)
        const data = await userService.getByEmail(email);
        setData(data);
        if(data.data.user.role === "admin"){
            setStatusColor("danger");
        }else if(data.data.user.role === "mute"){
            setStatusColor("warning");
        }else if(data.data.user.role === "banned"){
            setStatusColor("danger");
        } else {
            setStatusColor("primary");
        }
        setLoading(false);
        setUpdatedUser(data.data.user)
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
    if(modifPwd)return (<UpdatePwd/>)

    return (
        <>
            <form>
                <Card border="primary" className={"customForm"}>
                    <Card.Header className="center">Mes informations</Card.Header>
                    <Card.Body>
                        <ul>
                            <li>Nom: {!statusModif && data.data.user.last_name} {statusModif && <input name="last_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.last_name}/>} </li>
                            <li>Prénom: {!statusModif && data.data.user.first_name} {statusModif && <input  name="first_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.first_name}/>} </li>
                            <li>Mail: {!statusModif && data.data.user.email} {statusModif && <input name="email" onChange={handleUserChange} type="text"  defaultValue={data.data.user.email}/>} </li>
                            <li>Campus: {!statusModif && data.data.user.campus} {statusModif && <select name="campus" onChange={handleUserChange} defaultValue={data.data.user.campus}>   <option>Woluwe</option>
                            <option>Ixelles</option>
                            <option>Louvain la neuve</option></select> }</li> 
                            {statusModif && <li>Mot de passe: <input name="password" onChange={handleUserChange} type="text" /></li>}
                        </ul>
                        {modifAuthorized && <><button onClick={(e)=>modifierStatusModif(e)}>{!statusModif && "Modifier profil"}{statusModif && "Annuler"}</button> <button onClick={(e)=>toggleModifPwd(e)}>modif Pwd</button></>}
                        {statusModif && <button onClick={(e)=>submitUpdate(e)}>Confirmer</button>}
                    </Card.Body>
                    <Card.Footer>
                        Statut du compte :  
                            <Badge pill bg={statusColor}> 
                                {data.data.user.role}
                            </Badge> 
                    </Card.Footer>
                </Card>
            </form>
            <DisplayTable adsAvailable={adsAvailable} adsPending={adsPending} adsSold={adsSold} mapUrl={mapUrl} id_user={data.data.user.id_user} currentIdUser={authService.getCurrentUser().id_user}  currentUserRole={authService.getRoleCurrentUser()}/>
        </>
    )
}

   
   


export default Profile;

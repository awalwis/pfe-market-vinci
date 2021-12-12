import { useEffect, useState } from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";


const Profile =  () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email
    const [statusColor, setStatusColor] = useState('');
    const [statusModif, setStatusModif] = useState(false);
    const [updatedUser, setUpdatedUser] = useState()

    const modifierStatusModif = () => {
        setStatusModif(!statusModif);
    }

    function submitUpdate() {
        //todo appeler userService pour la requete put avec updateUser !! mettre un token dans le header !!
        console.log("todo submit")
    }
    const handleUserChange = (event) => {

        //todo handle tous les inputs
        switch (event.target.name) {
            case "email":
                setUpdatedUser({...updatedUser, email: event.target.value});
                break;
            case "password":
                setUpdatedUser({...updatedUser, password: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }
    }

    useEffect(()=>{
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
            console.log(statusColor);
            setLoading(false);
        }
        fetchData();
    },[email]);


    if(isLoading)
        return (
            <div>
                <Loader.BigLoader />
            </div>
        )


    if (data)
        return (
            <>
                <Card border="primary" className={"customForm"}>
                    <Card.Header className="center">Mes informations</Card.Header>
                    <Card.Body>
                        <ul>
                            <li>Nom: {!statusModif && data.data.user.last_name} {statusModif && <input name="last_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.last_name}/>} </li>
                            <li>Prénom: {!statusModif && data.data.user.first_name} {statusModif && <input  name="first_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.first_name}/>} </li>
                            <li>Mail: {!statusModif && data.data.user.email} {statusModif && <input name="email" onChange={handleUserChange} type="text"  defaultValue={data.data.user.email}/>} </li>
                            <li>Campus: {!statusModif && data.data.user.campus} {statusModif && <input name="campus" onChange={handleUserChange} type="text"  defaultValue={data.data.user.campus}/>} </li>
                            {statusModif && <li>Mot de passe: <input password onChange={handleUserChange} type="text" /></li>}
                        </ul>
                        <button onClick={modifierStatusModif}>{!statusModif && "Modifier profil"}{statusModif && "Annuler"}</button>
                        {statusModif && <button onClick={submitUpdate}>Confirmer</button>}
                    </Card.Body>
                    <Card.Footer>
                        Statut du compte :  
                            <Badge pill bg={statusColor}> 
                                {data.data.user.role}
                            </Badge> 
                    </Card.Footer>
                </Card>
            </>
        )
        else 
            return (
            <>
                <p>Veuillez vous connecter</p>
                <Button href="/login" variant="outline-primary" type="submit">
                    Se connecter
                </Button>
            </>
            )
}

   
   


export default Profile;

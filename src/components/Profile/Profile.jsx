import { useEffect, useState } from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import Loader from "components/Loading/Loading";
const Profile =  () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email

    let statusColor; 

    useEffect(()=>{
        const fetchData = async ()=>{
            console.log("email ",email)
            const data = await userService.getByEmail(email);
            setData(data);
            setLoading(false);
            {/*if(data.data.user.role === "admin"){
                statusColor = "danger";
            }else if(data.data.user.role === "mute"){
                statusColor = "warning";
            }else if(data.data.user.role === "banned"){
                statusColor = "danger";
            } else {
                statusColor = "primary";
            }
            console.log(statusColor)*/}  
        }
        fetchData();
    },[email]);


    if(isLoading)
        return (
            <div>
                <Loader />
            </div>
        )


    if (data)
        return (
            <>
                <Card border="primary" style={{ width: '18rem' }}> 
                    <Card.Header className="center">Mes informations</Card.Header>
                    <Card.Body>
                        <ul>
                            <li>Nom: {data.data.user.last_name}</li>
                            <li>Prénom: {data.data.user.first_name}</li>
                            <li>Mail: {data.data.user.email}</li>
                            <li>Campus: {data.data.user.campus}</li>
                            <li>Mot de passe: {data.data.user.password}</li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        Statut du compte :  
                            <Badge pill bg="primary"> 
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

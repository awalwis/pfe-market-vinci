import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";

const Profile =  () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email

    useEffect(()=>{
        const fetchData = async ()=>{
            console.log("email ",email)
            const data = await userService.getByEmail(email);
            setData(data);
            setLoading(false);
        }
        fetchData();
    },[email]);

    if(isLoading)
        return (
            <div>
                Loading...
            </div>
        )


    if (data)
        return (
            <div>
                <p>Nom: {data.data.user.last_name}</p>
                <p>Prenom: {data.data.user.first_name}</p>
                <p>Mail: {data.data.user.email}</p>
                <p>Campus: {data.data.user.campus}</p>
                <p>Role: {data.data.user.role}</p>
                <p>Mot de passe: {data.data.user.password}</p>
            </div>
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

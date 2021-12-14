import { useEffect, useState } from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import {authService} from "services/auth.service"

const UpdatePwd = () => {

    const [updatedUser, setUpdatedUser] = useState()
    const [modifPwd, setModifPwd] = useState(false);


    const checkPassword = (e) =>{
        e.preventDefault();
        if(updatedUser.new_password1===updatedUser.new_password2)alert("ok")
        console.log(updatedUser)
    }


    const toggleModifPwd = (e) => {
        e.preventDefault();
        setModifPwd(!modifPwd);
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "password":
                setUpdatedUser({...updatedUser, password: event.target.value});
                break;
            case "new_password1":
                setUpdatedUser({...updatedUser, new_password1: event.target.value});
                break;
            case "new_password2":
                setUpdatedUser({...updatedUser, new_password2: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }

    }

    return(<form>
        <Card border="primary" className={"customForm"}>
            <Card.Header className="center">Mes informations</Card.Header>
            <Card.Body>
                <ul>
                    <li>Mot de passe actuel: <br/><input name="password" onChange={handleUserChange} type="text"  /> </li>
                    <li>Nouveau mot de passe: <br/><input  name="new_password1" onChange={handleUserChange} type="text"  /> </li>
                    <li>Confirmer nouveau mot de passe: <br/><input name="new_password2" onChange={handleUserChange} type="text"  /> </li>
                </ul>
                <button onClick={(e)=>toggleModifPwd(e)}>Annuler</button>
                <button onClick={(e)=>checkPassword(e)}>Confirmer</button>
            </Card.Body>

        </Card>
    </form>)
}

export default UpdatePwd;


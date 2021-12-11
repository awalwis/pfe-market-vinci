import {Button} from "react-bootstrap";
import {authService} from "services/auth.service";

const Profile = () => {
    const currentUser = authService.getCurrentUser()
    if (currentUser)
    return (
        <div>
            <p>Nom: {currentUser.last_name}</p>
            <p>Prenom: {currentUser.first_name}</p>
            <p>Mail: {currentUser.email}</p>
            <p>Campus: {currentUser.campus}</p>
            <p>Role: {currentUser.role}</p>
            <p>Mot de passe: {currentUser.password}</p>
        </div>
    )
    else return <>
        <p>Veuillez vous connecter</p>
        <Button href="/login" variant="outline-primary" type="submit">
            Se connecter
        </Button>
    </>
}

export default Profile;

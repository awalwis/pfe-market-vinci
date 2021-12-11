import {Button} from "react-bootstrap";
import {authService} from "services/auth.service";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
const Navbar= ({loggedIn}) => {
    const currentUser = authService.getCurrentUser();
    let logBtn;

    if (loggedIn) {
        logBtn =  <><Nav.Item> <Nav.Link  href="/home" eventKey="logout">Deconnexion</Nav.Link> </Nav.Item>  <Nav.Item>

            <Nav.Link href="/profile" eventKey="profile">Profil</Nav.Link>
            <Nav.Link href="/newAd" eventKey="newAd">Créer une annonce</Nav.Link></Nav.Item>
            <Nav.Item>  <Nav.Link eventKey="disabled" disabled>  {currentUser.email}   </Nav.Link>
        </Nav.Item></>;
    }else{
        logBtn = <>
            <Nav.Item> <Nav.Link>  <Link to="/login" >Connexion</Link>  </Nav.Link> </Nav.Item>
        <Nav.Item>  <Nav.Link href="/register" eventKey="register">Inscription</Nav.Link>   </Nav.Item>
        </>
    }


    return( <Nav
        activeKey="/home"
        onSelect={(selectedKey) => {
            if (selectedKey=='logout')authService.logout();
        }}
    >
        <Nav.Item>
            <Nav.Link href="/home">Acceuil</Nav.Link>
        </Nav.Item>
        {logBtn}
    </Nav>  )
}



export default Navbar;

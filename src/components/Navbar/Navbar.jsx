
import {authService} from "services/auth.service";
import {Nav} from "react-bootstrap";
import {Link, NavLink, useHistory} from "react-router-dom";
import "styles/style.css"
const Navbar= ({loggedIn}) => {
    const currentUser = authService.getCurrentUser();
    let logBtn;
    const history = useHistory();

    if (loggedIn) {
        logBtn =  
        <>   
            <Nav.Item>  <Nav.Link eventKey="logout" className="navBtn nav-link">Deconnexion</Nav.Link>  </Nav.Item>
            <Nav.Item>  <NavLink to={`/profile/${currentUser.email}`} className="navBtn nav-link">Profil</NavLink>  </Nav.Item>
            <Nav.Item>  <NavLink to="/ajouter" className="navBtn nav-link">Créer</NavLink>  </Nav.Item>
            <Nav.Item>  <Nav.Link href="/Admin">Zone administrateur</Nav.Link> </Nav.Item>   
            <Nav.Item>  <Nav.Link eventKey="disabled" disabled>  {currentUser.email}  </Nav.Link></Nav.Item>
        </>;
    }else{
        logBtn = <>
            <Nav.Item>  <Link to="/login" className="navBtn nav-link">Connexion</Link>  </Nav.Item>
            <Nav.Item>  <NavLink to="/register" className="navBtn nav-link">Inscription</NavLink>  </Nav.Item>
        </>
    }


    return( <Nav
        activeKey="/home"
        onSelect={(selectedKey) => {
            if (selectedKey==='logout') {
                authService.logout();
                history.push("/");
            }
        }}
    >
        <Nav.Item>
            <NavLink to="/home" className="navBtn nav-link">Accueil</NavLink>
        </Nav.Item>
        {logBtn}
    </Nav>  )
}



export default Navbar;

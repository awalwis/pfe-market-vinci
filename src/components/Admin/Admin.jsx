import "styles/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faComments } from '@fortawesome/free-solid-svg-icons'
import { authService } from "services/auth.service";
import {useHistory} from "react-router-dom";

const Admin = () => {

    library.add(faUsers, faComments)

    const history = useHistory();

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser(currentUser.token)
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const navigateToUsers = () =>{
        history.push("/admin/utilisateurs");
    }


    return (
        <>
            <h1 className="center">Zone administrateur</h1>
            <div className="main-part">
                <div className="cpanel" onClick={e => navigateToUsers()}>
                    <div className="icon-part">
                        <FontAwesomeIcon icon="users" /><br/>
                        <small>Utilisateurs</small>
                        <p>985</p>
                    </div>
                </div>
                <div className="cpanel-blue cpanel">
                    <div className="icon-part">
                        <FontAwesomeIcon icon="comments" /><br/>
                        <small>Annonces</small>
                        <p>104</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;
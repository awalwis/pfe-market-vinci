
import "styles/style.css"
import {useHistory} from "react-router-dom";
import {authService} from "services/auth.service";


const Logout = () => {
    const history = useHistory();
    authService.logout();

    history.push("/")

    return <></>
}
export default Logout;

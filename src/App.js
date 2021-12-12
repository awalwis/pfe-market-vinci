import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";
import Admin from "components/Admin/Admin";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import AdNewForm from "components/Ad/AdNewForm/AdNewForm"
import AdItem from "components/Ad/AdItem/AdItem";
import { authService } from "services/auth.service";
import Navbar from "components/Navbar/Navbar";
import AdminUser from "components/Admin/AdminUser";



const App = () => {
    useRouteMatch("/");
    let loggedIn = false;
    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        loggedIn = true;
        roleCurrentUser = authService.getRoleCurrentUser(currentUser.token)
    }
    console.log("App.js: ", loggedIn);


    return (
        <>
            <Navbar loggedIn={loggedIn} roleCurrentUser={roleCurrentUser} />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/ajouter" component={AdNewForm} />
                <Route path="/annonces/:id" component={AdItem} />
                <Route path="/admin/utilisateurs" component={AdminUser} />
                <Route path="/admin" component={Admin} />
                <Route path="/profile/:email" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
        </>
    )
}
export default App;

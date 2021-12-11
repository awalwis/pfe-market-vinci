import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";

import {Route, Switch, useRouteMatch} from "react-router-dom";
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import {authService} from "services/auth.service";
import Navbar from "components/Navbar/Navbar";
import Logout from "./components/Logout/Logout";



const App = () => {
    useRouteMatch("/");
    let loggedIn = false;
    if (authService.getCurrentUser()) loggedIn =true;
    console.log("App.js: ", loggedIn)


    return (
            <>
                <Navbar loggedIn={loggedIn}/>
                <Switch>
                    <Route path="/profile"  component={ Profile }/>
                    <Route path="/login"  component={ Login } />
                    <Route path="/logout"  component={ Logout } />
                    <Route path="/register"  component={ Register }/>
                    <Route path="/home"  component={ Home }/>
                    <Route path="/"  component={ Home }/>
                </Switch>
            </>
    )
}
export default App;

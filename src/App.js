import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";
import Admin from "components/Admin/Admin";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import AdNewForm from "components/Ad/AdNewForm"
import AdItem from "components/Ad/AdItem";
import {authService} from "services/auth.service";
import Navbar from "components/Navbar/Navbar";
import AdTest from "components/Ad/AdTest"

const App = () => {
    let loggedIn = false;
    if (authService.getCurrentUser()) loggedIn =true;
    console.log("App.js")

    return (
        <Router>
            <Navbar loggedIn={loggedIn}/>
            <Switch>
                <Route path="/login"  component={Login} />
                <Route path="/register"  component={Register}/>
                <Route path="/home"  component={Home}/>
                <Route path="/profile"  component={Profile}/>
                <Route path="/AjouterAnnonce"  component={AdNewForm}/>
                <Route path="/annonces/:id" component={AdItem} />
                <Route path="/test" component={AdTest}/>
                <Route path="/admin" component={Admin} />
                <Route path="/"  component={Home}/>
            </Switch>
        </Router>
    )
}
export default App;

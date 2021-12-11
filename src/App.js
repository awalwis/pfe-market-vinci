import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import {authService} from "services/auth.service";
import Navbar from "components/Navbar/Navbar";


const App = () => {
    let loggedIn = false;
    if (authService.getCurrentUser()) loggedIn =true;
    console.log("App.js")

    return (
        <Router>
            <Navbar loggedIn={loggedIn}/>
            <Routes>
                <Route path="/login"  element={ <Login />} />
                <Route path="/register"  element={ <Register />}/>
                <Route path="/home"  element={ <Home />}/>
                <Route path="/"  element={ <Home />}/>
                <Route path="/profile"  element={ <Profile />}/>
            </Routes>
        </Router>
    )
}
export default App;

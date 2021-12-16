
import Register from "pages/Register";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ThemeConfig from 'theme';
import GlobalStyles from 'theme/globalStyles';

// components

import ScrollToTop from 'components/ScrollToTop';
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import AdItem from "components/Ad/AdItem/AdItem";
import AdminUser from "components/Admin/AdminUser";
import AdminCategory from "components/Admin/AdminCategory";
import AdminAd from "components/Admin/AdminAd";
import Navbar from "components/Navbar/Navbar"
import Login from "pages/Login";
import Admin from "components/Admin/Admin";
import CreateAd from "pages/CreateAd"
import Footer from "pages/Footer"
import NotificationsPopover from 'layouts/dashboard/NotificationsPopover';


//services
import { authService } from "services/auth.service";
import { useState, useEffect } from "react";


const App = () => {
    useRouteMatch("/");
    const [loggedIn, setLoggedIn] = useState(false);
    const [roleCurrentUser, setRoleCurrentUser] = useState();
    const [currentUser, setCurrentUser] = useState();

    useEffect(()=>{
        fetchData()
    },[])

    async function fetchData() {
        let user = await authService.getCurrentUser()
        setCurrentUser(user)
        if (currentUser) {
            setLoggedIn(true)
            await authService.getRoleCurrentUser().then((role) => setRoleCurrentUser(role))
        }
        if(roleCurrentUser ==="banni"){
            setLoggedIn(false)
        }
        console.log("App.js: ", loggedIn);
    }


    return (
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <Navbar loggedIn={loggedIn} roleCurrentUser={roleCurrentUser} />
            {currentUser && <NotificationsPopover />}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/ajouter" component={CreateAd} />
                <Route path="/annonces/:id" component={AdItem} />
                <Route path="/admin/categories" component={AdminCategory} />
                <Route path="/admin/utilisateurs" component={AdminUser} />
                <Route path="/admin/annonces" component={AdminAd} />
                <Route path="/admin" component={Admin} />
                <Route path="/profile/:email" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </ThemeConfig>

    )
}
export default App;

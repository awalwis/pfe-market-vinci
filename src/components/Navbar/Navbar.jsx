import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import {authService} from "services/auth.service";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcone from "@mui/icons-material/People"
import LogOutIcone from "@mui/icons-material/Logout"
import HomeIcone from "@mui/icons-material/Home"
import AdIcone from "@mui/icons-material/Add"
import UserIcone from "@mui/icons-material/EmojiPeople"
import AdminIcone from "@mui/icons-material/AdminPanelSettings"
import {NavLink, useHistory} from "react-router-dom";
import {Nav} from "react-bootstrap";
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer({loggedIn, roleCurrentUser}) {
  const [state, setState] = useState({
    left: false,
  });
  const currentUser = authService.getCurrentUser();
  const history = useHistory();
 
  let isAdmin=false
  

  if(roleCurrentUser==="admin")
      isAdmin=true

  const handleLogout=()=>{
    authService.logout();
    history.push("/login");
  }
  const handleHome=()=>{
    history.push("/home")
  }
  
  const handleProfil=()=>{
      history.push(`/profile/${currentUser.email}`)  
  }
  const handleCreateAd=()=>{
    history.push("/ajouter")
  }
  const handleAdmin=()=>{
    history.push("/admin")
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  if(loggedIn===true){    

       const list = (anchor) => ( 
           
            <Box
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
            
            <List>  
                <ListItem button onClick={handleHome} >
                    <ListItemIcon>
                        <HomeIcone/>
                    </ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem button onClick={handleProfil}>
                    <ListItemIcon>
                        <PeopleIcone/>
                    </ListItemIcon>
                    <ListItemText primary="Profil" />
                </ListItem>
                <ListItem button onClick={handleCreateAd}>
                    <ListItemIcon>
                        <AdIcone/>
                    </ListItemIcon>
                    <ListItemText primary="Créer une annonce" />
                </ListItem>
                {isAdmin &&
                <ListItem button onClick={handleAdmin}>
                    <ListItemIcon>
                        <AdminIcone/>
                    </ListItemIcon>
                    <ListItemText primary="Zone administrative" />
                </ListItem>
                }
            </List>
            <Divider/>
            <List>
            <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                    <LogOutIcone/>
                </ListItemIcon>
                <ListItemText primary="Deconnexion" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <UserIcone/>
                </ListItemIcon>
                <ListItemText secondary={currentUser.email} />
            </ListItem>
            </List>
            </Box>
        );
    
        return (
            <div>
            {['Menu'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button className ="btn-drawer"onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
            </div>
        );
    }else{
        return(
            <></>
        )
    }
}


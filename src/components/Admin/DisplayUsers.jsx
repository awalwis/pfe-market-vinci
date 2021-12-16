import React from "react"; 
import { Table } from 'react-bootstrap';
import {userService} from 'services/users.service'
import { adService } from "services/ads.service";
import {mediaService} from 'services/medias.service'
import {useHistory} from "react-router-dom";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import { toast } from 'react-toastify';
import DeleteIcone from "@material-ui/icons/DeleteRounded"
import PeopleIcone from "@material-ui/icons/PeopleRounded"
import { FormControl,InputLabel,MenuItem,Select,Button } from "@mui/material";
export default function Display(props) {

const DisplayUsers = (props) => {

    const {users} = props;
    const history = useHistory(); 

    const navigateToUserProfile = (email) =>{
        history.push("/profile/"+email);
    }

    const changeSelectValue = async (user, selectValue) => {
        let idToast = toast.loading("Changement du role",{position: "bottom-right"})
        let newUser = {
           id_user: user.id_user,
           email: user.email,
           last_name: user.last_name, 
           first_name: user.first_name, 
           password: user.password,
           campus: user.campus,
           role: selectValue
        }
        await userService.update(user.id_user, newUser)
        toast.update(idToast,{
            render: 'Role changé !',
            type: "success",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    const deleteUser = async (id) => {
        let idToast = toast.loading("Suppression de l'utilisateur",{position: "bottom-right"})
        let adsUser = await adService.getAllUser(id);
        console.log(adsUser);
        const allPromise = adsUser.ads.map(async (ad)=>{
            let mediasAds = await mediaService.getByAdId(ad.id_ad);
            console.log(mediasAds);
            mediasAds.map(async (media)=>{
                console.log(media.url);
                await mediaService.deleteBlob(media.url);
            })
        })
        await Promise.all(allPromise);
        await userService.deleteUser(id);
        toast.update(idToast,{
            render: 'Utilisateur supprimé !',
            type: "success",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        props.setRefreshKey(props.refreshKey+1)
    }

    if(props.isLoading){
        return(
            <tr>
                <td colSpan={6}>
                    <Loader.BigLoader />
                </td>
            </tr>    
            )
    }else if(users.length > 0) {
        return (
            users.map((user) => {
                return(
                    <tr className="tuple" key={user.id_user} >
                          
                            
                           <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.last_name}
                                
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.first_name}
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.email}
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.campus}
                            </td>
                            <td>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                                    <Select
                                        defaultValue={user.role}   
                                        label="role"
                                        onChange={e => changeSelectValue(user ,e.target.value)}
                                    >
                                        <MenuItem value="utilisateur">utilisateur</MenuItem>
                                        <MenuItem value="admin">admin</MenuItem>
                                        <MenuItem value="limite">limité</MenuItem>
                                        <MenuItem value="banni">banni</MenuItem>
                                    </Select>
                                </FormControl>
                            </td>
                            <td className='tdDelete'>
                            <Button variant="outlined" color="error" onClick={e => deleteUser(user.id_user)} startIcon={<DeleteIcone />}>Supprimer</Button>
                            </td>
                    </tr>
                )
            })
        )
    }else{
        return(
        <tr>
            <td className="center" colSpan={6}>
                <p> Aucun résultat trouvé</p>
            </td>
        </tr>    
        )
    }

}

return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>email</th>
                    <th>campus</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                    {DisplayUsers(props)}
            </tbody>
        </Table>
    </>
)

}

/**
 *    <List>
                               <ListItem  onClick={e => navigateToUserProfile(user.email)}>
                               <ListItemIcon>
                               <PeopleIcone/>
                                
                            </ListItemIcon>
                               <ListItemText primary={user.last_name}/>
                               </ListItem>

                           </List>
 */

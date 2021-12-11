import { useState } from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";

/* const GetCurrentUser= ()=>{

    const email = useParams().email
    console.log("email ",email)

     userService.getByEmail(email).then(response => {
     let currentUser
     currentUser = response.data.user;
     console.log(currentUser)
     if (currentUser)
         return (
             <div>
                 <p>Nom: {currentUser.last_name}</p>
                 <p>Prenom: {currentUser.first_name}</p>
                 <p>Mail: {currentUser.email}</p>
                 <p>Campus: {currentUser.campus}</p>
                 <p>Role: {currentUser.role}</p>
                 <p>Mot de passe: {currentUser.password}</p>
             </div>
         )
     else return <>
         <p>Veuillez vous connecter</p>
         <Button href="/login" variant="outline-primary" type="submit">
             Se connecter
         </Button>
          </>
      })
      return(
          <></>
      )
    } */
const Profile =  () => {

    
   

    return(
        <div>
            à implémenter
        </div>
        
    )
}

   
   


export default Profile;

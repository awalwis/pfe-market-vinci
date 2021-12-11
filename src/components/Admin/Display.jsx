import React from 'react'
import { Table } from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import "styles/style.css"
export default function Display(props) {

const DisplayUsers = (props) => {

    const {users} = props; 
    const history = useHistory(); 

    const navigateToUserProfile = (email) =>{
        history.push("/profile/"+email);
    }

    if(users.length > 0) {
        return (
            users.map((user) => {
                return(
                    <tr className="tuple" key={user.id_user} onClick={e => navigateToUserProfile(user.email)} >
                            <td>
                                {user.last_name}
                            </td>
                            <td>
                                {user.first_name}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.campus}
                            </td>
                            <td>
                                {user.role}
                            </td>
                    </tr>
                )
            })
        )
    }else{
        return(
        <tr>
            <td className="center" colSpan={5}>
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
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>email</th>
                    <th>Campus</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                    {DisplayUsers(props)}
            </tbody>
        </Table>
    </>
)

}
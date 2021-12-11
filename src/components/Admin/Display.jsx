import React from "react"; 
import {useState} from "react";
import { Form, Table } from 'react-bootstrap';
import {userService} from 'services/users.service'
import {useHistory} from "react-router-dom";
import "styles/style.css"
export default function Display(props) {

const DisplayUsers = (props) => {

    const {users} = props; 
    const history = useHistory(); 

    const navigateToUserProfile = (email) =>{
        history.push("/profile/"+email);
    }

    const changeSelectValue = (user, selectValue) => {
        let newUser = {
           id_user: user.id_user,
           email: user.email,
           last_name: user.last_name, 
           first_name: user.first_name, 
           password: user.password,
           campus: user.campus,
           role: selectValue
        }
        userService.update(user.id_user, newUser)
    }

    if(users.length > 0) {
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
                                <Form.Select 
                                    onChange={e => changeSelectValue(user ,e.target.value)}
                                >
                                    <option value="user" selected={user.role==='user' ? true : false}>utilisateur</option>
                                    <option value="admin" selected={user.role==='admin' ? true : false}>admin</option>
                                    <option value="mute" selected={user.role==='mute' ? true : false}>limité</option>
                                    <option value="banned" selected={user.role==='banned' ? true : false}>banni</option>
                                </Form.Select> 
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
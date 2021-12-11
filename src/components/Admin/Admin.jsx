import {useEffect, useState} from "react";
import userService from 'services/users'
import {Col, Row, Button, Form} from "react-bootstrap";
import "components/formStyle.css"
import { useNavigate } from 'react-router-dom';
import Test from "./Test"

const Admin = () => {


    let [users, getUsers] = useState('')

    useEffect(() => {
        getAllUsers();
    }, []); 

    const getAllUsers = () => {
        userService.getAll().then((response) => {
            const allUsers = response.data.users; 
            getUsers(allUsers); 
            console.log(allUsers)
        })
    }

    

    return (
        
        <div>
            <h1>Zone administrateur</h1>
            <Test users={users} />

        </div>

    )

}

export default Admin;
import {useState} from "react";
import userService from 'services/users'
import {Col, Row, Button, Form} from "react-bootstrap";
import "components/formStyle.css"


function Login() {
    const bcrypt = require('bcryptjs');

    const emptyUser = {
        email: "Adresse mail",
        password: "Mot de passe",
    }
    const [newUser, setNewUser] = useState(emptyUser)

    const login = (event) => {
        event.preventDefault();
        //console.log(newUser)
        userService.getByEmail(newUser.email).then(response => {
            console.log(response.data.user.password)
            if (bcrypt.compareSync(newUser.password, response.data.user.password))alert("connected");
        })
        //get mdp
        //check mdp
        //return
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "email":
                setNewUser({...newUser, email: event.target.value});
                break;
            case "password":
                setNewUser({...newUser, password: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }
    }
    return (
        <div className="customForm" id="loginForm">
            <h1>Connexion</h1>
            <Form onSubmit={login}>
                    <Form.Group  className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Addresse e-mail institutionnelle</Form.Label>
                        <Form.Control placeholder="email" onChange={handleUserChange} name="email" required pattern="[A-Za-z0-9-_.]+@(student.){0,1}vinci.be"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword" >
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control onChange={handleUserChange} name="password"  type="password" required/>
                    </Form.Group>
                <Button variant="outline-primary" type="submit">
                    Se connecter
                </Button>
            </Form>
        </div>
    )
}
export default Login;

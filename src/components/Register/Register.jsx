import {useState} from "react";
import User from "../User/User";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import "./Register.css"

function Register() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState(
    {
        name: "Nom",
        firstName: "Prenom",
        email: "Adresse mail",
        password: "Mot de passe",
        campus: "Campus"
    }
    )
    const promise = axios.get('http://localhost:3001/users')
    console.log(promise)

    const register = (event) => {
        event.preventDefault();
        alert("register")
        const userObject = {
            name: newUser.name,
            firstName: newUser.firstName,
            email: newUser.email,
            password: newUser.password,
            campus: newUser.campus,
            id: users.length + 1,
        }
        setUsers(users.concat(userObject))
        setNewUser(    {
            name: "Nom",
            firstName: "Prenom",
            email: "Adresse mail",
            campus: "Campus",
            password: "Mot de passe",
        })
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "name":
                setNewUser({...newUser, name: event.target.value});
                break;
            case "firstName":
                setNewUser({...newUser, firstName: event.target.value});
                break;
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
        <div className="registerForm">
            <h1>Registration form</h1>
            <ul>
                {users.map(user =>
                    <User key={user.id} user={user} />
                )}
            </ul>

            <Form onSubmit={register}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="Nom" onChange={handleUserChange} name="name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="" placeholder="Prenom" onChange={handleUserChange} name="firstName"/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Addresse e-mail institutionnelle</Form.Label>
                        <Form.Control placeholder="email" onChange={handleUserChange} name="email"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Campus</Form.Label>
                        <Form.Select defaultValue="Woluwe" onChange={handleUserChange} name="campus">
                            <option>Woluwe</option>
                            <option>Ixelles</option>
                            <option>Louvain la neuve</option>
                        </Form.Select>
                    </Form.Group>
                </Row>



                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword1" onChange={handleUserChange} name="password1">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridConfirmedPassword2" onChange={handleUserChange} name="password2">
                        <Form.Label>Confirmer mot de Passe</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>
                <Button variant="outline-primary" type="submit">
                    Valider
                </Button>
            </Form>
        </div>
    )
}

export default Register;

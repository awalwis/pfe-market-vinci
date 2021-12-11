import {useState} from "react";
import {Col,  Button, Form} from "react-bootstrap";
import "styles/style.css"
import {useHistory} from "react-router-dom";
import {authService} from "services/auth.service";

const Login = () => {
    const history = useHistory();
    const emptyUser = {
        email: "Adresse mail",
        password: "Mot de passe",
    }
    const [newUser, setNewUser] = useState(emptyUser)

    const login = (event) => {
        event.preventDefault();
        let user = authService.login(newUser.email,newUser.password).then(()=>{
            console.log("usr: ",user);
            if(user){
                console.log("history push")
                history.push("/");
            }
        });
        
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

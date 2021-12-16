import {useEffect, useState} from "react";
import {userService} from 'services/users.service'
import {Col, Row, Form} from "react-bootstrap";
import "styles/style.css"
import { authService } from "services/auth.service";
import Display from "./DisplayUsers"
import {useHistory} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import PeopleIcone from "@material-ui/icons/PeopleRounded"
import { MenuItem,Select,InputLabel,FormControl,TextField } from "@mui/material";

const AdminUser = () => {

    const history = useHistory();

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser()
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState('');
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('email');
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setLoading(true);
        setUsers('');
        getAllUsers();
    }, [refreshKey]); 

    const getAllUsers = () => {
        userService.getAll().then((response) => {
            const allUsers = response.data.users; 
            setUsers(allUsers); 
            setLoading(false);
        })
    }

    const getFiltredUsers = (query, u) => {
        if(!query) {
            return users; 
        }
        const queryLowerCase = query.toLowerCase(); 
        if(select === "email"){
            return u.filter(user => String(user.email).toLowerCase().startsWith(queryLowerCase))
        }else if(select ==="campus"){
            return u.filter(user => String(user.campus).toLowerCase().startsWith(queryLowerCase))
        }else{
            return u.filter(user => String(user.role).toLowerCase().startsWith(queryLowerCase))
        }
        
    }

    const filtredUsers = getFiltredUsers(query, users)

    const changeSelectValue = (selectValue) => {
        setSelect(selectValue);
    }

    return (
        <div>
            <h2 className="center">Utilisateurs <PeopleIcone/></h2>
            
            <Form>
                <Row className="g-2">
                    <Col xs={11}>
                         <FormControl fullWidth>
                            <TextField
                                fullWidth
                                label="Entrez votre recherche"
                                placeholder="Entrez votre recherche : email, role  ou par campus de l'utilisateur"
                                type="search"
                                onChange={e => setQuery(e.target.value)}    
                            />  
                        </FormControl>
                    </Col>
                    <Col xs={1}>
                    <FormControl fullWidth>
                        <InputLabel >Filtre</InputLabel>
                            <Select onChange={e => changeSelectValue(e.target.value)}
                            defaultValue="email"
                            >
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="role">Role</MenuItem>
                                <MenuItem value="campus">Campus</MenuItem>
                            </Select>              
                      </FormControl>
                    </Col>
                </Row>
            </Form>

            <Display users={filtredUsers} setRefreshKey={setRefreshKey} refreshKey={refreshKey} isLoading={isLoading}/>

            <ToastContainer />
        </div>
    )
}

export default AdminUser;
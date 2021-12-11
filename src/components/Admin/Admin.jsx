import {useEffect, useState} from "react";
import {userService} from 'services/users.service'
import {Col, Row, Form, FormControl, FloatingLabel} from "react-bootstrap";
import "styles/style.css"
import Display from "./Display"

const Admin = () => {


    const [users, setUsers] = useState('');
    const [query, setquery] = useState(''); 
    const [select, setSelect] = useState('email');

    useEffect(() => {
        getAllUsers();
    }, []); 

    const getAllUsers = () => {
        userService.getAll().then((response) => {
            const allUsers = response.data.users; 
            setUsers(allUsers); 
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
            <h1 className="center">Zone administrateur</h1>
            
            <Form>
                <Row className="g-2">
                    <Col xs={11}>
                        <FloatingLabel controlId="floatingInputGrid" label="Entrez votre recherche">
                            <FormControl
                                type="search"
                                placeholder="Entrez votre recherche : email, campus ou le role"
                                className="me-2"
                                aria-label="Search"
                                onChange={e => setquery(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={1}>
                        <FloatingLabel label="Filtres">
                            <Form.Select 
                                onChange={e => changeSelectValue(e.target.value)}
                            >
                                <option value="email">Email</option>
                                <option value="role">Role</option>
                                <option value="campus">Campus</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>

            <Display users={filtredUsers} />
        </div>

    )
}

export default Admin;
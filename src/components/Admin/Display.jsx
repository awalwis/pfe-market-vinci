import React from 'react'
import { Table } from 'react-bootstrap';
import "styles/style.css"

export default function Display(props) {

const displayUsers = (props) => {

    const {users} = props; 

    if(users.length > 0) {
        return (
            users.map((user) => {
                return(
                    <tr className="tuple" key={user.id_user} >
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
                    {displayUsers(props)}
            </tbody>
        </Table>
    </>
)

}
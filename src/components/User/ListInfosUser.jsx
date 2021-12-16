import { Typography } from "@mui/material";

function ListInfosUser({user}) {
    return (
        <ul>
            <li><Typography variant="subtitle1">Nom: {user.last_name}</Typography></li>
            <li><Typography variant="subtitle1">Prénom: {user.first_name}</Typography></li>
            <li><Typography variant="subtitle1">Mail: {user.email}</Typography></li>
            <li><Typography variant="subtitle1">Campus: {user.campus}</Typography></li>
        </ul>
    )
}

export default ListInfosUser;

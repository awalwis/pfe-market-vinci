import userService from 'services/users'
import { handleResponse } from 'helpers/handle-response';
import jwt from 'jsonwebtoken'
import Navbar from "../components/Navbar/Navbar";
import ReactDOM from "react-dom";

async function login(email, password) {

    const bcrypt = require('bcryptjs');
    let user;
    await userService.getByEmail(email).then(response => {
        user=response.data.user;            
        console.log(user)
    })
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)){
        console.log("connected");
        const token = jwt.sign({ user: user.id, role: user.role }, "sdkfh5464sdfjlskdjfntmdjfhskjfdhs", { algorithm: 'HS256'});
        let userDto={
            id_user:user.id_user,
            last_name:user.last_name,
            first_name:user.first_name,
            token:token,
            email:user.email,
            campus:user.campus,
        }
        user=userDto;
        localStorage.setItem("currentUser", JSON.stringify(user) );
    }

    window.location.reload();


    return user;
}

const logout = () =>{
    console.log("logout !")
    localStorage.removeItem('currentUser');
}
const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    return user;
}

async function register(user){
    await userService
        .create(user)
        .then(response => {
            console.log(response)
            return true;
        })
    return false;
}

export const authService = {
    login,
    logout,
    getCurrentUser,
    register,
};
export default{
    login: login,
    logout: logout,
}

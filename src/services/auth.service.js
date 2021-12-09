import userService from 'services/users'
import { handleResponse } from 'helpers/handle-response';
import jwt from 'jsonwebtoken'



export const authService = {
    login,
    logout,
    getCurrentUserValue () { return }
};

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
        var token = jwt.sign({ user: user.id, role: user.role }, "sdkfh5464sdfjlskdjfntmdjfhskjfdhs", { algorithm: 'HS256'});
        let userDto={
            last_name:user.last_name,
            first_name:user.first_name,
            token:token,
            email:user.email,
            campus:user.campus,
        }

        console.log(userDto)
        user=userDto;
        localStorage.setItem('currentUser', JSON.stringify(user) );
    }
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

export default{
    login: login,
    logout: logout,
}

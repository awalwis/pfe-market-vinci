import React from 'react'

export default function Test(props) {

const displayUsers = (props) => {

    const {users} = props; 

    if(users.length > 0) {
        return (
            users.map((user, index) => {
                console.log(user);
                return(
                    <div  >
                        <p>{user.email}</p>

                    </div>
                )
            })
        )
    }else{
        return(<h3>Pas d'utilisateurs enregistrés</h3>)
    }

}

return (
    <>
        {displayUsers(props)}
    </>
)

}
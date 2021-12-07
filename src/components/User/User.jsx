
function User({user}) {
    return (
        <div>
            <p>Nom: {user.name}</p>
            <p>Prenom: {user.firstName}</p>
            <p>Mail: {user.email}</p>
            <p>Mot de passe: {user.password}</p>
        </div>
    )
}

export default User;

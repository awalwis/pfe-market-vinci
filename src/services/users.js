import axios from 'axios'
const apiurl = 'https://pfe-market-vinci.herokuapp.com/api/utilisateurs'

const getAll = () => {
    return axios.get(apiurl)
}

const getByEmail = (email) => {
    return axios.get(`${apiurl}/${email}`)
}

const create = newObject => {
    return axios.post(apiurl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${apiurl}/${id}`, newObject)
}

//TODO delete ?

export default {
    getAll: getAll,
    create: create,
    update: update,
    getByEmail: getByEmail
}

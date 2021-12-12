import axios from 'axios'
const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/utilisateurs'

const getAll = () => {
    return axios.get(apiurl)
}

const getByEmail = (email) => {
    return axios.get(`${apiurl}/${email}`)
}
const getById = (id) => {
    return axios.get(`${apiurl}/${id}`)
    .then(response => response.data);
}

const create = newObject => {
    return axios.post(apiurl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${apiurl}/${id}`, newObject)
}

const deleteUser = (id) => {
    return axios.delete(`${apiurl}/${id}`)
}

export const userService = {
    getAll,
    create,
    update,
    getByEmail,
    getById,
    deleteUser
}


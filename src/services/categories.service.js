import axios from 'axios'
const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/categories'

const getAll = () => {
    return axios.get(apiurl)
}

const getById = (id) => {
    return axios.get(`${apiurl}/${id}`)
}

const create = newObject => {
    return axios.post(apiurl, newObject)
}

export const categoryService = {
    getAll,
    create,
    getById
}


import axios from 'axios'
//const apiurl = process.env.REACT_APP_URL_API + '/api/categories'
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

const deleteCategory = (id) => {
    console.log("ID ", id)
    return axios.delete(`${apiurl}/${id}`)
}

export const categoryService = {
    getAll,
    create,
    getById,
    deleteCategory
}

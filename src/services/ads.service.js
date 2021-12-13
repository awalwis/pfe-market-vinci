import axios from "axios";
const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/annonces'


/*create a ad*/

const createNewAd = (newAd) => {
    console.log(JSON.stringify(newAd))
   return axios
    .post(apiurl,newAd)
    .then( response => response.data );
}

/*update a ad*/
const update = (id, updatedAd) => {
    return axios
        .put(`${apiurl}/${id}`, updatedAd)
}

/*delete a ad*/
const remove = (id) => {
    return axios
        .delete(`${apiurl}/${id}`)
        .then(response => response.data);
}
/*get a ad by id*/
const get = (id) => {
    try {
        return axios
        .get(`${apiurl}/${id}`)
        .then(response => response.data.ad);
    } catch (error) {
       console.log("Ad inexistant pour l'id" ,id) 
    }
   
}

/*get all ad*/
const getAll = () => {
    return axios
        .get(apiurl + "/all")
        .then(response => response.data);
}

export const adService = {
    createNewAd,
    remove,
    update,
    get,
    getAll
}
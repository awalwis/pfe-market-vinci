import axios from "axios";
import { useEffect } from "react";
const apiurl ='https://pfe-market-vinci-backend.herokuapp.com/api/annonces'


/*create a ad*/

const createNewAd = (newAd) => {
    console.log(JSON.stringify(newAd))
   return axios
    .post(apiurl,newAd)
    .then( response => response.data );
}

/*update a ad*/
const update = (id, updatedAd) => {
    console.log(`${apiurl}/${id}`)
    return axios
    .put(`${apiurl}/${id}`, updatedAd)
    .then( response => response.data );
}

/*delete a ad*/
const remove = (id) => {
    return axios
    .delete(`${apiurl}/${id}`)
    .then( response => response.data );
}
/*get a ad by id*/ 
const get = (id)=>{
   return  axios
   .get(`${apiurl}/${id}`)
   .then( response => response.data );
}

/*get all ad*/
const getAll = () => {
    return axios
    .get(apiurl)
    .then( response => response.data );
}

export {
    createNewAd,
    remove,
    update,
    get,
    getAll

}
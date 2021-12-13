import axios from "axios";
import { authService } from "./auth.service";
const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/annonces'

let currentUser = authService.getCurrentUser(); 

let config = {  
    headers: {
        Authorization: currentUser["token"]
    }
}


/*create a ad*/

const createNewAd = (newAd) => {
    console.log(JSON.stringify(newAd))
   return axios
    .post(apiurl,newAd,)
    .then( response => response.data );
}

/*update a ad*/
const update = (id, updatedAd) => {
    console.log(config); 
    return axios
        .put(`${apiurl}/${id}`, updatedAd, config)
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
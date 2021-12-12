import axios from "axios";
const apiurl ='https://pfe-market-vinci-backend.herokuapp.com/api/medias'

const createNewMedia = (newMedia) => {
   return axios
    .post(apiurl,newMedia)
    .then( response => response.data );
}

/*get a ad by id*/ 
const get = (id)=>{
    return  axios
    .get(`${apiurl}/${id}`)
    .then( response => response.data );
 }

 /*get all media for this id_ad*/ 
const getByAdId = (id_ad)=>{
    return  axios
    .get(`${apiurl}/ad/${id_ad}`)
    .then( response => response.data );
 }
 
const getAll = () => {
    return axios
    .get(apiurl)
    .then( response => response.data );
}

export {
    createNewMedia,
    get,
    getByAdId,
    getAll

}
import axios from "axios";

//const apiurl ='https://pfe-market-vinci-backend.herokuapp.com/api/categories'

const apiurl= "http://127.0.0.1:5000/"
/*
const ad = axios.create({
    baseURL: "http://localhost:3001/ads"
})
*/

const createNewCategory = (newCategory) => {
   return axios
    .post(apiurl,newCategory)
    .then( response => response.data );
   /* return ad
    .post("/", newAd)
    .then( response => response.data );*/
}


/*get a category by id*/ 
const getCategory =(id)=>{
   return axios
   .get(`${apiurl}/${id}`)
   .then( response => response.data );
}

const getAll = () => {
    return axios
    .get(apiurl)
    .then( response => response.data );
}

export {
    createNewCategory,
    getCategory,
    getAll
}
import axios from "axios";

const ad = axios.create({
    baseURL: "http://localhost:3001/ads"
})

/*create a ad*/
const createNewAd = (title,type,description,location,price) => {
    const payload = {
        title,
        type,
        description,
        location,
        price,
        state: "pending" ,
        id:2
    };

    return ad
    .post("/", payload)
    .then( response => response.data );
}

/*get all ad*/
const retrieveAll = () => {
    return ad
    .get("/")
    .then( response => response.data );
}

/*get a ad*/
const retrieveAd = (id) => {
    return ad
    .get(`/${id}`)
    .then( response => response.data );
}

/*update a ad*/
const update = (id, payload) => {
    return ad
    .patch(`/${id}`, payload)
    .then( response => response.data );
}

/*delete a ad*/
const remove = (id) => {
    return ad
    .delete(`/${id}`)
    .then( response => response.data );
}
const getAd =(id)=>{
    return ad
    .get(`/${id}`)
    .then( response => response.data );
}

export {
    createNewAd,
    remove,
    update,
    getAd

}
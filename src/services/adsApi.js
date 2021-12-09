import axios from "axios";

const ad = axios.create({
    baseURL: "http://localhost:3001/ads"
})

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

const update = (id, payload) => {
    return ad
    .patch(`/${id}`, payload)
    .then( response => response.data );
}

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
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

export {
    createNewAd,
}
import React, { useContext } from "react";
import adsContext from "contexts/adsContext";
import {useParams} from "react-router-dom";

const AdDetail = ()=>{ 

    const id = useParams().id;
    const {
        updateAd,
        deleteAd,
        retrieveAd
    } = useContext(adsContext);

    const ad = retrieveAd(id)
    console.log("test")
    console.log(ad)
    

    // need to check if admin/ad's owner
    const handleDelete = () => {
        deleteAd(id);
    }
     // need to check if admin/ad's owner
    const handleUpdate = (e) => {
        const propertyName = e.target.name;
        const propertyValue = e.target.value;
        const payload = {
            [propertyName]: propertyValue
        };
        updateAd(ad.id, payload)
    };
    const handleDoneChange = (e) => {
        const done = e.target.checked;
        const payload = {
            done,
        }
        updateAd(ad.id, payload);
    }

    return (
        <li>
             <input 
                type="text" 
                name="title"
                value={id} 
                onChange={handleUpdate}
            />
            &nbsp;
            <button onClick={handleDelete}> Delete </button>
        </li>
    )
}

export default AdDetail

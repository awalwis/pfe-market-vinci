import React from "react"
import AdDetail from "./AdDetail";

const AdItem = ({
    ad,
}) => {
    const {
        id,
        title,
        type,
        description,
        location,
        price
    } = ad;

    const handleDetail=(e)=>{
        console.log("test")
       return( 
           <div>
        <AdDetail />
        </div>
       )
    }

    return(
        <li>
        <button value={id} onClick={event=>handleDetail(event)}> {title} </button>
    </li>
    )}
export default AdItem
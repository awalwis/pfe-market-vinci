import React from "react";
import AdDetail from "components/Ad/AdDetail";


const AdItem = ({ad})=>{
    

    const handleDetail=(e)=>{
        console.log("test")
       return( 
           <div>
        <AdDetail/>
        </div>
       )
    }

    return(
        <li>
        <button value={ad.id} onClick={event=>handleDetail(event)}> {ad.title} </button>
    </li>
    )}
export default AdItem
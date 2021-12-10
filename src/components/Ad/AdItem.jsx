import React from "react";
import { useNavigate } from 'react-router-dom';


const AdItem = ({ad})=>{
    
    const navigate = useNavigate();

    const handleDetail=(e)=>{
        console.log("test")
       const id = e.target.value
       navigate(`/ads/:${id}`)
    }

    return(
        <li>
        <button value={ad.id} onClick={event=>handleDetail(event)}> {ad.title} </button>
    </li>
    )}
export default AdItem
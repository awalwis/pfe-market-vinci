import React from 'react'
import *as AdsApi from "services/adsApi"
import AdDetail from 'components/Ad/AdDetail'

const AdTest=()=>{


    async function ShowDetails(e){
        await AdsApi
     .get(e.target.value)
     .then(res=>{
        <AdDetail ad={(res.ad)}/>   
       })      
     }

    return(
        <button onClick={ShowDetails} value={15}>Test</button>
    )
}

export default AdTest
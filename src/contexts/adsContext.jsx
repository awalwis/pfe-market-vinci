import React,{useEffect, useState} from "react";
import {adService} from "services/ads.service";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  
  const [ads, setAds] = useState([]);
  const [adId,setAdId] = useState();
  const [ad, setAd] = useState([]);

  const addNewAd =(newAd) =>{
      adService
      .createNewAd(newAd)
      .then(res=>
        setAdId(res.id_ad))
  }
  
  const updateAd = (id, changeSet) => {
    adService
      .update(id, changeSet)
  }
  const deleteAd = (id) => {
    adService
    .remove(id)
  };

  const getAdById =(id)=>{
     adService
    .get(id)
    .then(res=>{
        setAd(res.ad)   
      })      
    };

  const exposedValue = {  
    adId,

    addNewAd,
    updateAd,
    deleteAd,
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

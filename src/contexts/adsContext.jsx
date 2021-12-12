import React,{useEffect, useState} from "react";
import * as AdsApi from "services/adsApi";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  
  const [ads, setAds] = useState([]);
  const [adId,setAdId] = useState();
  const [ad, setAd] = useState([]);

  const addNewAd =(newAd) =>{
      AdsApi
      .createNewAd(newAd)
      .then(res=>
        setAdId(res.id_ad))
  }
  
  const updateAd = (id, changeSet) => {
    AdsApi
      .update(id, changeSet)
  }
  const deleteAd = (id) => {
    AdsApi
    .remove(id)
  };

  const getAdById =(id)=>{
     AdsApi
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

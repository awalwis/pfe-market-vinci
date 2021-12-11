import React,{useState} from "react";
import * as AdsApi from "services/adsApi";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  
  const [ads, setAds] = useState([]);
  const [retrievedAd,setAd] = useState();

  const addNewAd =(newAd) =>{
      AdsApi
      .createNewAd(newAd)
  }
  
  const updateAd = (id, changeSet) => {
    AdsApi
      .update(id, changeSet)
      .then((updatedAd) => {
        const newAds = ads.map((ad) => {
          if (ad.id !== id) return ad;
          return updatedAd;
        });
        setAds(newAds);
      });
  };

  const deleteAd = (id) => {
    AdsApi
    .remove(id)
  };

  const getAdById = async (id)=>{
    await AdsApi
    .get(id)
    .then(res=>{
        setAd(res.ad)   
      })      
    };
  const exposedValue = {  
    addNewAd,
    updateAd,
    deleteAd,
    getAdById,
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

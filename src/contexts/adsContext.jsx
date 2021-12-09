import React,{useState} from "react";
import * as AdsApi from "services/adsApi";

const defaultSortAd = (a,b) => {
  
  if(a.title.toLowerCase() < b.title.toLowerCase())
     return -1;
  if(a.title.toLowerCase() > b.title.toLowerCase())
     return 1;
  return 0;
}

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  
  const [ads, setAds] = useState([]);
  const [ad,setAd] = useState([])
  
  const defaultSortedAd=ads
    .sort(defaultSortAd)
  

  const addNewAd =(title,type,description,location,price) =>{
      AdsApi
      .createNewAd(title,type,description,location,price)
      .then((newAd) =>setAds([...ads, newAd])
      );
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
    .then(() => {
      const newAds = ads.filter((ad) => ad.id !== id);
      setAds(newAds);
    });  
  };

  const retrieveAd =(id)=>{
    AdsApi
    .getAd(id)
    .then(res=>{
        const ad = res.data;
        setAd(ad);
      })
    }
  const exposedValue = {
    defaultSortedAd,

    addNewAd,
    updateAd,
    deleteAd,
    retrieveAd
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

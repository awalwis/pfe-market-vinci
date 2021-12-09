import React,{useState,useEffect} from "react";
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

  const addNewAd =(newAd) =>{
      AdsApi
      .createNewAd(newAd)
      .then((ad) =>setAds([...ads, ad])
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
        console.log("context")
      })
    }

    const retrieveAllAd=()=>{
      AdsApi
      .getAll()
      .then((fetchedTasks) => setAds(fetchedTasks));
  };
  useEffect(retrieveAllAd, []);
    
  const exposedValue = {
    defaultSortedAd,

    addNewAd,
    updateAd,
    deleteAd,
    retrieveAd,
    retrieveAllAd
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

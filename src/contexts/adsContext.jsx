import React from "react";
import * as AdsApi from "services/adsApi";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {

  const addNewAd =(title,type,description,location,price) =>{
      AdsApi
      .createNewAd(title,type,description,location,price)
    
  }
  const exposedValue = {
    addNewAd,
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

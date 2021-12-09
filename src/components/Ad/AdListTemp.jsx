import React,{useContext} from "react";
import AdItem from "components/Ad/AdItem";
import Context from "contexts/adsContext";

const AdListTemp = () => {

    const {defaultSortedAd} = useContext(Context);
    const ads = defaultSortedAd

  return (
    <ul>
      {ads.map((ad) => (
        <AdItem key={ad.id} ad={ad} />
      ))}
    </ul>
  );
};

export default AdListTemp;

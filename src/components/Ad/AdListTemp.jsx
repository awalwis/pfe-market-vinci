import React from "react";
import { useNavigate } from 'react-router-dom';

const AdListTemp = () => {

    /* const {retrieveAllAd} = useContext(Context);
    const ads = retrieveAllAd()

  return (
    <ul>
      {ads.map((ad) => (
        <AdItem key={ad.id} ad={ad} />
      ))}
    </ul>
  ); */
  const navigate = useNavigate()
  const handleAdDetails=(e)=>{
     const id = parseInt(e.target.value)
     navigate(`/ads/${id}`)
  }
        return(
          <div>
            <button value={5} onClick={handleAdDetails}> Annonce </button>
          </div>
        )
};

export default AdListTemp;

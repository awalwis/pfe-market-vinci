import React,{ useContext }  from "react";
import adsContext from "contexts/adsContext"
 
const AdUpdateForm = (ad) => {

    const {
        updateAd     
    } = useContext(adsContext);

    //besoin de check si admin/proprio
    
    const update = (e) => {
        const propertyTile = e.target.title;
        const propertyDescription = e.target.description;
        const payload = {
            [propertyTile]: propertyDescription
            
        };
        updateAd(ad.id, payload)
    };
    const handleUpdate =(e)=>{
        switch (e.target.name){
            case "title":

                break;
            case "title":

                break;
            case "description":

                break;
            case "price":

                break;
            case "date":

                break;
            case "location":

                break;                    

        }

    }

  return (
    <div>
         <form onSubmit={update}>
         <input type="text" name="title"value={ad.title} onChange={handleUpdate}/>
         <input type="text" name="description" value={ad.description}onChange={handleUpdate}/>
         <input type="number"name="price" value={ad.price}onChange={handleUpdate}/>
         <input type="text" name="date" value={ad.date}onChange={handleUpdate}/>
         <input type="text" name="location" value={ad.location}onChange={handleUpdate}/>
         <input type="text" name="category" value={ad.category}onChange={handleUpdate}/>
         <input type="text" name="state" value={ad.state}onChange={handleUpdate}/>
         <input type="text" name="type" value={ad.type}onChange={handleUpdate}/>

         <button type="submit">Modifier</button>    
         </form>
         
    </div>
  );
};
 
export default AdUpdateForm;
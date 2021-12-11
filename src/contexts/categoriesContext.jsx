import React,{useState,useEffect} from "react";
import * as CategoryApi from "services/categoryApi";



const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  
  const [categories, setCategories] = useState([]);
  const [category,setCategory] = useState([])
  

  const addNewCategory =(newCategory) =>{
    CategoryApi
      .createNewCategory(newCategory)
      .then((category) =>setCategories([...categories, category])
      );
  }
  
  const retrieveAd =(id)=>{
    CategoryApi
    .getCategory(id)
    .then(res=>{
        const ad = res.data;
        setCategory(ad);
        console.log("context")
      })
    }

    const retrieveAllAd=()=>{
        CategoryApi
      .getAll()
      .then((fetchedTasks) => setCategories(fetchedTasks));
  };
  useEffect(retrieveAllAd, []);
    
  const exposedValue = {
    addNewCategory,
    retrieveAd,
    retrieveAllAd
    };

  return (
  <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};
export { Context, ProviderWrapper };
export default Context;

import React, { useState,useEffect } from "react"
import { categoryService } from "services/categories.service"

const Category=({setCategory})=>{

    const [categories,setCategories]=useState([])
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const retrievedCategory = await categoryService.getAll().then(res=>res.data.categories)
            setCategories(retrievedCategory)
        }
        fetchData();
    },[]);
    
    const handleCategoryChange=(e)=>{
      setCategory(parseInt(e.target.value))
    }

    return(
        <div onChange={handleCategoryChange}>
        <select id = "dropdown" required>
           {categories.map(category => {
            return <option key={category.id_category} value={category.id_category}>{category.name}</option>;
            })}
        </select>
        </div>                                           
    )
}
export default Category
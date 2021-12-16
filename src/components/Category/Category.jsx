import React, { useState,useEffect } from "react"
import { categoryService } from "services/categories.service"
import { Box, FormControl, NativeSelect,InputLabel } from '@mui/material';

const Category=({setCategory, idDefault})=>{

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
    if(idDefault){
        //when update
        return(           
           <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                    Categorie
                </InputLabel>
                <NativeSelect onChange={handleCategoryChange}
                value={idDefault}
                inputProps={{
                  name: 'category',
                  id: 'uncontrolled-native',
                }}
                >
                  <option value='0'>---Choisir une categorie---</option>
                  {categories.map(category => {
                      if(!category.parent_category){
                          return(
                              <option key={category.id_category} disabled>--{category.name}--</option>
                          )
                      }else{
                          return(
                              <option key={category.id_category} value={category.id_category}>{category.name}</option>
                          )
                      }
                  })}
               </NativeSelect>
            </FormControl>
          </Box>              
        )
    }else{
        return(
            //when create
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Categorie
              </InputLabel>
              <NativeSelect onChange={handleCategoryChange}
                defaultValue={0}
                inputProps={{
                  name: 'category',
                  id: 'uncontrolled-native',
                }}
              >
                <option value='0'>---Choisir une categorie---</option>
                {categories.map(category => {
                    if(!category.parent_category){
                        return(
                            <option key={category.id_category} disabled>--{category.name}--</option>
                        )
                    }else{
                        return(
                            <option key={category.id_category} value={category.id_category}>{category.name}</option>
                        )
                    }
                })}
              </NativeSelect>
            </FormControl>
          </Box>                 
        )
    }
}
export default Category


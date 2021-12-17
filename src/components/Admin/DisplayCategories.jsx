import React from "react";
import {useState} from "react";
import {categoryService} from 'services/categories.service'
import {ListGroup,Badge} from "react-bootstrap";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { TextField,FormControl,Button,Stack } from "@mui/material";


const ConstructP = (props) => {
    let value = props.value;

    const deleteSubCategory = async (e)=>{
        let idToast = toast.loading("Suppression d'une sous categorie",{position: "bottom-right"})
        let idDelete=-1;
        let children = e.target.parentNode.childNodes;
        for(let i =0; i<children.length;i++){
            if(children[i].dataset.id){
                idDelete = children[i].dataset.id;
            }
        }
        await categoryService.deleteCategory(idDelete)
        toast.update(idToast,{
            render: 'Sous categorie Supprimée !',
            type: "info",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        props.setRefreshKey(props.refreshKey+1);
    }

    let i = 0;
    let nameParent = '';
    return(
        value.map((e)=>{
            if(i>1){
                i++;
                return(
                    <div key={'child'+nameParent+i}>
                        <Stack spacing={-2}>
                            {parse(e)}
                             <Button variant="contained"color="error" size="small" onClick={e => {deleteSubCategory(e)}}  >DELETE</Button>      
                         </Stack>
                    </div>
                )
            }else if(i===0){
                nameParent = e;
                i++;
            }else{
                i++;
            }
        })
    )
}

const DisplayCategories = (props) => {

    const {categories} = props;
    const [categoriesSubMap, setCategoriesSubMap] = useState({});
    const [valueInput, setValueInput] = useState('');
    let empty = false;

    const constructMap = () => {
        let categoriesMap = {};
        if(!isObjEmpty(categories)){
            categories.map((category) => {
                if(!category.parent_category){
                    if(!categoriesMap[category.id_category]){
                        categoriesMap[category.id_category]=new Array(category.name);
                    }else{
                        categoriesMap[category.id_category][0]=category.name
                    }
                }else{
                    if(!categoriesMap[category.parent_category] ){
                        categoriesMap[category.id_category]=new Array('');
                    }
                    if(categoriesMap[category.parent_category][1]){
                        categoriesMap[category.parent_category][1] = categoriesMap[category.parent_category][1]+1;
                    }else{
                        categoriesMap[category.parent_category].push(1);
                    }
                    categoriesMap[category.parent_category].push('<p data-id='+category.id_category+'>'+category.name+'</p>');
                    
                }
            })
            setCategoriesSubMap(categoriesMap);
        }else{
            empty = true;
        }
    }

    function isObjEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) return false;
        }
      
        return true;
    }

    if(!props.isLoading){
        if(isObjEmpty(categoriesSubMap)&&!empty){
            constructMap();
        }
    }

    const deleteCategory = async (e)=>{
        
        let idToast = toast.loading("Suppression d'une categorie",{position: "bottom-right"})
        let idDelete = e.target.parentNode.parentNode.dataset.key;
        await categoryService.deleteCategory(idDelete)
        toast.update(idToast,{
            render: 'Categorie Supprimée !',
            type: "info",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        props.setRefreshKey(props.refreshKey+1)
    }
    
    const addSubCategory = async (e) => {
        e.preventDefault();
        let idToast = toast.loading("Ajout d'une sous categorie",{position: "bottom-right"})
        setCategoriesSubMap([]);
        let id = parseInt(e.target.parentNode.parentNode.dataset.key);
        let category = {
            name:valueInput,
            parent_category:id
        }
        await categoryService.create(category)
        toast.update(idToast,{
            render: 'Sous categorie Ajoutée !',
            type: "success",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        props.setRefreshKey(props.refreshKey+1)
    }
    
    if(props.isLoading){
        return(
            <Loader.BigLoader />  
        )
    }else if(!isObjEmpty(categoriesSubMap) && !empty) {
        return (
            Object.entries(categoriesSubMap).map(([key, value]) =>{
                return(
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={key}
                        data-key={key}
                    >
                        <div className="ms-2 me-auto">     
                        <div className="fw-bold">{value[0]}</div>
                            <Button onClick={e => {deleteCategory(e)}} variant="contained" color="error">DELETE</Button> 
                            <ConstructP value={value} setRefreshKey={props.setRefreshKey} refreshKey={props.refreshKey}/>
                            <form onSubmit={addSubCategory}>
                            <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                fullWidth
                                placeholder="Ajouter une sous catégorie"
                                type="search"
                                onChange={e => {setValueInput(e.target.value)}}  
                                required 
                            />  
                        </FormControl>
                            </form>
                        </div>
                        <Badge variant="primary" pill>
                        {value[1]}
                        </Badge>
                    </ListGroup.Item>
                )
            })            
        )
    }else{
        return(
            <p> Aucun résultat trouvé</p>
        )
    }

}

export default DisplayCategories;


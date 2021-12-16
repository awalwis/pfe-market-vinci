import {useEffect, useState} from "react";
import {categoryService} from 'services/categories.service'
import { authService } from "services/auth.service";
import {ListGroup} from "react-bootstrap";
import "styles/style.css"
import {useHistory} from "react-router-dom";
import {Loader} from "components/Loading/Loading";
import DisplayCategories from "./DisplayCategories"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { TextField,FormControl } from "@mui/material";


const AdminCategory = () => {

    const history = useHistory();

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser(currentUser.token)
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [valueInput, setValueInput] = useState('');

    useEffect(() => {
        setLoading(true);
        setCategories('');
        getAllCategories();
    }, [refreshKey]); 

    const getAllCategories = () => {
        categoryService.getAll().then((response) => {
            const allCategories = response.data.categories; 
            setCategories(allCategories);
            setLoading(false);
        })
    }

    const addCategory = async () => {
        let idToast = toast.loading("Ajout d'une categorie",{position: "bottom-right"})
        let category = {
            name:valueInput,
            parent_category:0
        }
        await categoryService.create(category)
        toast.update(idToast,{
            render: 'Categorie Ajoutée !',
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
        setRefreshKey(refreshKey+1)
    }

    if(isLoading){
        return(
            <>
                <Loader.BigLoader />
            </>
        )
    }else{
        return (
            <>
                <ListGroup as="ol" numbered>
                    <DisplayCategories categories={categories} setRefreshKey={setRefreshKey} refreshKey={refreshKey} isLoading={isLoading}/>
                </ListGroup>
                <form onSubmit={e => {e.preventDefault(); addCategory()}}>
                <FormControl fullWidth>
                            <TextField
                                fullWidth
                                label="Catégorie"
                                placeholder="Ajouter une catégorie"
                                type="search"
                                onChange={e => {setValueInput(e.target.value)}}  
                                required 
                            />  
                        </FormControl>
                </form>
                <ToastContainer />
            </>
        )
    }
}

export default AdminCategory;

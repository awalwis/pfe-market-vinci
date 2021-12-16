import {useEffect, useState} from "react";
import { adService } from "services/ads.service";
import {Col, Row, Form} from "react-bootstrap";
import "styles/style.css"
import { authService } from "services/auth.service";
import DisplayAds from "components/Admin/DisplayAds"
import {useHistory} from "react-router-dom";
import AdIcone from "@material-ui/icons/ChangeHistory"
import { MenuItem,Select,InputLabel,FormControl,TextField } from "@mui/material";
import { ToastContainer } from 'react-toastify';

const AdminAd = () => {

    const history = useHistory(); 

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser()
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true); 
    const [ads, setAds] = useState([]);
    const [query, setQuery] = useState('');
    const [select, setSelect] = useState('state');
    const [refreshKey, setRefreshKey] = useState(0);
    

    useEffect(() => {
        setLoading(true);
        setAds([]);
        getAllAds(); 
    }, [refreshKey]);

    const getAllAds = () => {
        adService.getAll().then((response) => {
            const allAds = response.ads; 
            setAds(allAds);
            setLoading(false); 
        })
    }

    const getFiltredAds = (query, a) => {
        if(!query) {
            return ads; 
        }
        const queryLowerCase = query.toLowerCase(); 
        if(select === "state"){
            return a.filter(ad => String(ad.state).toLowerCase().startsWith(queryLowerCase))
        }else if(select ==="title"){
            return a.filter(ad => String(ad.title).toLowerCase().startsWith(queryLowerCase))
        }
    }

    const filtredAds = getFiltredAds(query, ads)
    const changeSelectValue = (selectValue) => {
        setSelect(selectValue);
    }
  

    return (
        <div>
            <h2 className="center">Annonces <AdIcone/></h2>

            <Form>
                <Row className="g-2">
                    <Col xs={11}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                label="Entrez votre recherche"
                                placeholder="Entrez votre recherche : titre ou état de l'annonce"
                                type="search"
                                onChange={e => setQuery(e.target.value)}    
                            />  
                        </FormControl>
                    </Col>
                    <Col xs={1}>
                    <FormControl fullWidth>
                        <InputLabel>Filtre</InputLabel>
                            <Select onChange={e => changeSelectValue(e.target.value)}
                                defaultValue="state"
                            >   
                                <MenuItem value="state">Etat</MenuItem>
                                <MenuItem value="title">Titre</MenuItem>
                            </Select>              
                      </FormControl>
                    </Col>
                </Row>
            </Form>
            <DisplayAds ads={filtredAds} setRefreshKey={setRefreshKey} refreshKey={refreshKey} isLoading={isLoading}/>
            <ToastContainer />
        </div>
    )
} 

export default AdminAd;
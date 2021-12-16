
import { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { AnnoncesAPI } from "services/annonces";
import AnnonceFilters from "components/Home/components/AnnonceFilters";
import AnnonceList from "components/Home/components/AnnonceList";
import AnnonceSort from "components/Home/components/AnnonceSort";
import { ToastContainer } from 'react-toastify';
import { authService } from 'services/auth.service';
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Home = () => {


    const [data, setData] = useState();
    const [filter, setFilter] = useState("?categorie=&tri=ASC&prixMin=0&prixMax=3000");
    const [tri, setTri] = useState(true);
    const [category, setCategory] = useState("");
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const user = authService.getCurrentUser()
    const history = useHistory()

    // Functions
    async function handleCategoryChange(event){
        let nameCategory = event.target.value;
        if(nameCategory !== "Tout"){
            await setCategory(event.target.value)
            await setFilter(`?categorie=${event.target.value}&tri=${tri?"ASC":"DESC"}&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        }else{
            await setCategory(event.target.value)
            await setFilter(`?categorie=&tri=${tri?"ASC":"DESC"}&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        }
    }
    async function handleTriChange(newTri){
        if(newTri){
            // change à prix décroissant
            await setTri(false)
            await setFilter(`?categorie=${category}&tri=DESC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        } else {
            // change à prix croissant
            await setTri(true)
            await setFilter(`?categorie=${category}&tri=ASC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        }
    }
    async function handleMinPriceChange(event){
        await setPrixMin(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri?"ASC":"DESC"}&prixMin=${event.target.value}&prixMax=${prixMax}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    async function handleMaxPriceChange(event){
        await setPrixMax(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri?"ASC":"DESC"}&prixMin=${prixMin}&prixMax=${event.target.value}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    const HandleRedirection=(e)=>{
        if(e.target.value ==="login"){
            history.push("/login")
        }else{
            history.push("/register")
        }
    }
    useEffect(() => {
        AnnoncesAPI.getAds(filter).then((elt) => setData(elt));
    }, [])

    return (
        <>
            <Container>
                {!user &&
                <>
            <Button variant="outlined" value="login" size="medium" onClick={HandleRedirection}>Connexion</Button>
            <Button variant="outlined" value="register" size="medium"onClick={HandleRedirection}>S'inscrire</Button>
                </>
                }
                <h1>Market Vinci</h1>
                <h4>Annonces</h4>
                <Container className="d-flex flex-column">
                    <Container style={{"float":"right"}}>
                        <AnnonceFilters isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} category={category} prixMin={prixMin} prixMax={prixMax} handleCategoryChange={handleCategoryChange}
                            handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange}/>
                        <AnnonceSort tri={tri} handleTriChange={handleTriChange}/>
                    </Container>

                    <Container>
                        {data && <AnnonceList annonces={data.ads}/>}
                    </Container>
                </Container>
            </Container>
            <ToastContainer/>
        </>
    )
}
export default Home;
/**<Button variant="outlined" size="small">
          Sign up
        </Button> */
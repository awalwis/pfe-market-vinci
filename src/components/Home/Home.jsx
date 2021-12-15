
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { AnnoncesAPI } from "services/annonces";
import AnnonceFilters from "./components/AnnonceFilters";
import AnnonceList from "./components/AnnonceList";
import { authService } from "services/auth.service";

const Home = () => {


    const [data, setData] = useState();
    const [filter, setFilter] = useState("?categorie=&tri=ASC&prixMin=0&prixMax=3000");
    const [tri, setTri] = useState("ASC");
    const [category, setCategory] = useState("");
    const [prixMin, setPrixMin] = useState("0");
    const [prixMax, setPrixMax] = useState("3000"); 
    const [openFilter, setOpenFilter] = useState(false);

    // Functions
    async function handleCategoryChange(event){
        await setCategory(event.target.value)
        await setFilter(`?categorie=${event.target.value}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    async function handleTriChange(){
        if(tri==="ASC"){
            await setTri("DESC")
            await setFilter(`?categorie=${category}&tri=DESC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        } else {
            await setTri("ASC")
            await setFilter(`?categorie=${category}&tri=ASC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        }
    }
    async function handleMinPriceChange(event){
        await setPrixMin(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${event.target.value}&prixMax=${prixMax}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    async function handleMaxPriceChange(event){
        await setPrixMax(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${event.target.value}`)
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
    useEffect(() => {
        AnnoncesAPI.getAds(filter).then((elt) => setData(elt));
    }, [])

    return (
        <Container>
            <h1>Market Vinci</h1>
            <h4>Annonces</h4>
            <Container className="d-flex flex-column">
                <Container style={{"float":"right"}}>
                    <AnnonceFilters isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} handleCategoryChange={handleCategoryChange} handleTriChange={handleTriChange}
                        handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange}/>
                </Container>
                
                <Container>
                    {data && <AnnonceList annonces={data.ads}/>}
                </Container>
            </Container>
            
        </Container>
    )
}
export default Home;

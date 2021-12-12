
import "components/formStyle.css"
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { AnnoncesAPI } from "services/annonces";
import AnnonceList from "./components/AnnonceList";

function Home() {


    const [data, setData] = useState();
    const [filter, setFilter] = useState("");
    const [tri, setTri] = useState("ASC");
    const [category, setCategory] = useState("Velos");
    const [prixMin, setPrixMin] = useState("100");
    const [prixMax, setPrixMax] = useState("300"); 

    // Functions
    async function handleCategoryChange(event){
        await setCategory(event.target.value)
        await setFilter(`?categorie=${category}?&tri=${tri}?&prixMin=${prixMin}?&prixMax=${prixMax}?`)
    }
    async function handleTriChange(){
        if(tri==="ASC"){
            await setTri("DESC")
            setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
        } else {
            await setTri("ASC")
            await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
        }
    }
    async function handleMinPriceChange(event){
        await setPrixMin(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
    }
    async function handleMaxPriceChange(event){
        await setPrixMax(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
    }

    useEffect(() => {
        console.log(filter)
        AnnoncesAPI.getAds(filter).then((elt) => setData(elt));
    }, [filter])

    return (
        <Container>
            <h1>Market Vinci - 2021</h1>
            <h2>Filtres</h2>
            <Container className="d-flex flex-row justify-content-start">
                <Form.Select defaultValue="Velos" onChange={handleCategoryChange} className="border" style={{"width":"100px"}}>
                    {/* <option>Maison et Jardin</option>
                    <option>Famille</option>
                    <option>Vêtements et accessoires</option>
                    <option>Loisirs - hobbys</option>
                    <option>Electronique</option> */}
                    <option>Velos</option>
                    {/* <option>Trottinettes</option> */}
                </Form.Select>
                <Container onClick={(e) => {e.preventDefault(); handleTriChange()}} className="border rounded" style={{"width":"100px", "cursor":"pointer"}}>Tri</Container>
                <Form.Control onChange={handleMinPriceChange} placeholder="Prix min" className="border" style={{"width":"100px"}}/>
                <Form.Control onChange={handleMaxPriceChange} placeholder="Prix max" className="border" style={{"width":"100px"}}/>
            </Container>
            {data ? <AnnonceList annonces={data.ads}/>:null}
        </Container>
    )
}
export default Home;

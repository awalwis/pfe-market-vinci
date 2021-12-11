
import "components/formStyle.css"
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AnnoncesAPI } from "services/annonces";
import AnnonceList from "./components/AnnonceList";

function Home() {


    const [data, setData] = useState();
    const [filter, setFilter] = useState("");

    useEffect(() => {
    AnnoncesAPI.getAds(filter).then((elt) => setData(elt));
      
    }, [])

    return (

        <Container>
            <h1>Market Vinci - 2021</h1>
            {data && <AnnonceList annonces={data.ads}/>}
        </Container>

    )
}
export default Home;

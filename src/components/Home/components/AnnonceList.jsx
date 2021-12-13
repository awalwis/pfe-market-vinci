import { Container } from "react-bootstrap";
import AnnonceCard from "./AnnonceCard";
const AnnonceList = ({annonces}) => {

    return(
        <Container className="d-inline-flex flex-wrap flex-row justify-content-start">
            {annonces.map((annonce) => {
                return(
                    <AnnonceCard key={annonce.id_ad} annonce={annonce}/>
                )
            }) }
        </Container>
    )
}
export default AnnonceList;<div className="a"></div>
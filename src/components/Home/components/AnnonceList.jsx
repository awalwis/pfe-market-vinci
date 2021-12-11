import { Container } from "react-bootstrap";
import AnnonceCard from "./AnnonceCard";
const AnnonceList = ({annonces}) => {

    return(
        <Container className="d-flex flex-wrap flex-row">
            {annonces.map((annonce) => {
                return(
                    <AnnonceCard annonce={annonce}/>
                )
            }) }
        </Container>
    )
}
export default AnnonceList;<div className="a"></div>
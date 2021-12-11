import { Container } from "react-bootstrap";

const AnnonceCard = ({annonce}) => {

    // TODO: renvoyer vers la page de details
    function showDetails(id){
        console.log(id)
    }
    
    return(
        <Container className="border" style={{"height":"200px", "width":"150px"}}
            onClick={(e) =>
                {e.preventDefault()
                showDetails(annonce.id_ad)}}>
            <div>{annonce.title}</div>
            <div>{annonce.description}</div>
            <div>{annonce.price}</div>
            <div>{annonce.date}</div>
            <div>{annonce.type==="give"?"À donner":"À vendre"}</div>
        </Container>
    )
}
export default AnnonceCard;
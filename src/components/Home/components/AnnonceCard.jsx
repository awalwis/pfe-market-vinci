import { Box, Card } from "@mui/material";
imp
import { Container } from "react-bootstrap";
import Label from "./Label";

const AnnonceCard = ({annonce}) => {

    // TODO: renvoyer vers la page de details
    function showDetails(id){
        console.log(id)
    }
    
    return(
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {status && (
                <Label
                    variant="filled"
                    color={(status === 'sale' && 'error') || 'info'}
                    sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase'
                    }}
                >
                    {status}
                </Label>
                )}
                <ProductImgStyle alt={name} src={cover} />
            </Box>
            <Container className="border" style={{"height":"200px", "width":"150px", "cursor":"pointer"}}
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
        </Card>
        
}
export default AnnonceCard;
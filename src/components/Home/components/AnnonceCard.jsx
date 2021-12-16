import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, } from 'react-router-dom';
import { fCurrency } from 'utils/formatNumber';
import { authService } from 'services/auth.service';
import { mediaService } from 'services/medias.service';
import { useEffect, useState } from 'react';

const AnnonceCard = ({annonce}) => {

    const user = authService.getCurrentUser()

    const [picture, setPicture] = useState()

    const ProductImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute'
      });

    useEffect(()=>{
        mediaService.get(annonce.displayed_picture??1).then((elt) => setPicture(elt.url))
    },[])

    return(
        picture && 
        (<Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={"Image produit"} src={picture} />
            </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={`${user?`/annonces/${annonce.id_ad}`:"/login"}`} color="inherit" underline="hover" component={RouterLink}>
                <Typography variant="subtitle1" noWrap>
                    {annonce.title}
                </Typography>
                </Link>
                <Typography variant="subtitle2" noWrap>
                    {annonce.description}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">
                    {fCurrency(Number(annonce.price))}
                </Typography>
                </Stack>
            </Stack>
        </Card>)

    )
}
export default AnnonceCard;

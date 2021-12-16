import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, } from 'react-router-dom';
import { fNumber } from 'utils/formatNumber';
import { authService } from 'services/auth.service';
import { mediaService } from 'services/medias.service';
import { useEffect, useState } from 'react';

const AnnonceCard = ({annonce}) => {

    const user = authService.getCurrentUser()
    const [picture, setPicture] = useState(undefined)

    const fetchData = async (annonce) => {
        if(annonce) {
            let media = await mediaService.get(annonce.displayed_picture)
            setPicture(media)
        }
    }

    const ProductImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute'
      });

    useEffect(() => {
        fetchData(annonce)
    }, [])


    return(
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {picture && <ProductImgStyle alt={"Image produit"} src={picture.media.url} />}
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
                    {Number(annonce.price)===0?"Gratuit":fNumber(Number(annonce.price))+"€"}
                </Typography>
                </Stack>
            </Stack>
        </Card>)
}
export default AnnonceCard;

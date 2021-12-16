import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  title :"404 Page Not Found",
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle>
      <Container>
        
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
         
              <Typography variant="h3" paragraph>
              Désolé, cette page est introuvable!
              </Typography>
          
            <Typography sx={{ color: 'text.secondary' }}>
            Nous somme navrés de ne pas avoir trouver la page que vous cherchiez. Il se peut qu'il ait 
            une erreur dans l'URL. Veuillez vérifier et réessayer.
            </Typography>
            <br/>
            <Button to="/home" size="large" variant="contained" component={RouterLink}>
              Revenir à l'accueil
            </Button>
          </Box>
      
      </Container>
    </RootStyle>
  );
}

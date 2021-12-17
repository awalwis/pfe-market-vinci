
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';

import  RegisterForm  from 'components/authentication/register/RegisterForm';
import {Link as RouterLink} from "react-router-dom";


// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Inscription Market Vinci">
      <Container>
        <ContentStyle >
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Formulaire d'inscription
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Entrez vos informations ci-dessous.
            </Typography>
          </Box>

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Déjà inscrit ? &nbsp;
            <Link component={RouterLink} underline="always" sx={{ color: 'text.primary' }} to="/login">
              Connectez-vous ici !
            </Link>
          </Typography>

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

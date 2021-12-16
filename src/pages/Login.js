// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';

// components
import Page from 'components/Page';

import LoginForm  from 'components/authentication/login/LoginForm';
import {Link as RouterLink} from "react-router-dom";


const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

export default function Login() {
  return (
    <RootStyle title="Connexion Market Vinci">
      <Container maxWidth="sm">
        <ContentStyle >
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Connexion à Market Vinci
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entre tes informations ci-dessous.</Typography>
          </Stack>

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Pas encore inscrit ? &nbsp;
            <Link component={RouterLink} underline="always" sx={{ color: 'text.primary' }} to="/register">
              Inscrivez-vous ici !
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

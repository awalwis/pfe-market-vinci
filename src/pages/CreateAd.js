import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from 'layouts/AuthLayout';
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import AdNewForm  from 'components/Ad/AdNewForm/AdNewForm';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
  }));

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  
export default function CreateAd() {
    return (
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                Création d'une annonce
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Entre tes informations ci-dessous.</Typography>
            </Stack>
  
            <AdNewForm />
  
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
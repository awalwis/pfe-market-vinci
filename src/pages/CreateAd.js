
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts

// components
import Page from 'components/Page';

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
        <Container sx={{ maxWidth :'sm',border :"solid"}}>
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
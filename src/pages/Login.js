import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from 'layouts/AuthLayout';
// components
import Page from 'components/Page';
import LoginForm  from 'components/Login/LoginForm';


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

export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Connexion à Market Vinci
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entre tes informations ci-dessous.</Typography>
          </Stack>
          <LoginForm />

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

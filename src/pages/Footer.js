import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function FooterContent() {
  return (
    <>
      <Typography variant="body2" color="text.secondary"> 
      <Link color="inherit" href="mailto: adminMarketVinci@gmail.com">
        Contacter nous
      </Link>
      
    </Typography>
    </>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
     
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Market Vinci
          </Typography>
          <FooterContent />
        </Container>
      </Box>
    </Box>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';


function Header(props) {
  const { sections, title } = props;
  const history =useHistory()

  const handleButton =(e)=>{
      if(e.target.value ==="login"){
      history.push("/login")
      }else{
      history.push("/register")
      }
  }
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
    
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Button variant="outlined" size="small" value="login" onClick={handleButton}>
          Connexion
        </Button>
        <Button variant="outlined" size="small" value ="register" onClick={handleButton}>
          S'inscrire
        </Button>
      </Toolbar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header
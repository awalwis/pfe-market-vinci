import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';

export default function AnnonceSort({tri, handleTriChange}){

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    
    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
          <Button
            color="inherit"
            disableRipple
            onClick={handleOpen}
            className="ml-2 mb-4"
            endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
          >
            Trier par:&nbsp;
            <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {tri?"Le moins cher":"Le plus cher"}
            </Typography>
          </Button>
          <Menu
            keepMounted
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
                key={1}
                selected={tri===true}
                onClick={(e) => {e.preventDefault();handleTriChange(false);handleClose()}}
                sx={{ typography: 'body2' }}
            >
                Le moins cher
            </MenuItem>
            <MenuItem
                key={2}
                selected={tri===false}
                onClick={(e) => {e.preventDefault();handleTriChange(true);handleClose()}}
                sx={{ typography: 'body2' }}
            >
                Le plus cher
            </MenuItem>
          </Menu>
        </>
      );
}
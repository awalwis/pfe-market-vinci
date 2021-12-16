import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { CategoriesAPI } from "services/categories";
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import Scrollbar from './Scrollbar'
AnnonceFilters.propTypes = {
    isOpenFilter: PropTypes.bool,
    onResetFilter: PropTypes.func,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
};

export default function AnnonceFilters({ 
    isOpenFilter,
    onOpenFilter,
    onCloseFilter,
    category,
    handleCategoryChange, handleMinPriceChange, handleMaxPriceChange}) {
    const [categories, setCategories] = useState();


    useEffect(() => {
        CategoriesAPI.getCategories().then((elt) => setCategories(elt));
    }, [])
    return(
        <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
        className="mb-4"
      >
        Filtres&nbsp;
      </Button>

          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filtres
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar sx={{p:3}}>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Catégorie
                  </Typography>
                  <Form.Select defaultValue={"Tout"} onChange={(e) => handleCategoryChange(e)} className="d-flex border" style={{"width":"200px"}}>
                    <option key={0}>Tout</option>
                    {categories && categories.categories.map((row) => {
                      if(!row.parent_category){
                        return(
                          <option key={row.id_category} disabled>--{row.name}--</option>
                        )
                      } else {
                        return(
                          <option key={row.id_category}>{row.name}</option>
                        )
                      }
                      
                    })}
                  </Form.Select>
                </div>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Prix minimum
                  </Typography>
                  <Form.Control onChange={(e) => {handleMinPriceChange(e)}} 
                    placeholder="Prix minimum" className="d-flex border" style={{"width":"200px"}}/>
                </div>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Prix maximum
                  </Typography>
                  <Form.Control onChange={(e) => {handleMaxPriceChange(e)}} 
                    placeholder="Prix maximum" className="d-flex border" style={{"width":"200px"}}/>
                </div>
              </Stack>
            </Scrollbar>

          </Drawer>
    </>
    )
}
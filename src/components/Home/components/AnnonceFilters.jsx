import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
    onResetFilter,
    onOpenFilter,
    onCloseFilter,
    handleCategoryChange, handleTriChange, handleMinPriceChange, handleMaxPriceChange}) {
    const [categories, setCategories] = useState();


    useEffect(() => {
        CategoriesAPI.getCategories().then((elt) => setCategories(elt));
    }, [])
    return(
        // <Container className="d-flex flex-row justify-content-start">
        //             <Form.Select defaultValue={categories?categories.categories[0]:""} onChange={(e) => handleCategoryChange(e)} className="d-flex border" style={{"width":"200px"}}>
        //                 {categories && categories.categories.map((row) => {
        //                     return(
        //                         <option>{row.name}</option>
        //                     )
        //                 }) }
        //             </Form.Select>
        //             <Container onClick={(e) => {e.preventDefault(); handleTriChange()}} className="d-flex border rounded" style={{"width":"100px", "cursor":"pointer"}}>Tri</Container>
        //             <Form.Control onChange={(e) => {handleMinPriceChange(e)}} placeholder="Prix min" className="d-flex border" style={{"width":"100px"}}/>
        //             <Form.Control onChange={(e) => handleMaxPriceChange(e)} placeholder="Prix max" className="d-flex border" style={{"width":"100px"}}/>
        //         </Container>
        <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
              HELLO MOTHERFUCKER
          </Drawer>
    </>
    )
}
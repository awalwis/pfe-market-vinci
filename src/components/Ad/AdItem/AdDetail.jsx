import { Typography } from "@material-ui/core";
import { Container } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const AdDetail = ({ad,adMedias,category})=>{ 

    return (
        <>
            <Container>
                <Typography variant="h3">
                    {ad.title}
                </Typography>
            </Container>
            <Container className="d-flex flex-row border py-4">
                <Container>
                    <Carousel>
                        {adMedias.map(m => {
                            return(
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={m.url}
                                    alt="slide"
                                    />
                                </Carousel.Item>)
                        })}
                    </Carousel>
                </Container>
                <Container>
                    <Typography variant="h3">{ad.price}€</Typography>
                    <Typography variant="h5" className="mb-2">{ad.description}</Typography>
                    <ul>
                        <li><Typography>Date de publication: {ad.date}</Typography></li>
                        <li><Typography>Catégorie: {category.name}</Typography></li>
                        <li><Typography>{ad.state}</Typography></li>
                        <li><Typography>{ad.type}</Typography></li>
                    </ul>
                </Container>
            </Container>   
        </>
    )
}

export default AdDetail

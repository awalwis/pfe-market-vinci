import { Typography } from "@material-ui/core";
import { Container } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
import { fNumber } from "utils/formatNumber";

const AdDetail = ({ad,adMedias,category})=>{ 

    return (
        <>
            <Container className="mb-4">
                <Typography variant="h3">
                    {ad.title}
                </Typography>
            </Container>
            <Container className="d-flex flex-row justify-content-between border bg-white rounded py-4" style={{minHeight:"25rem"}}>
                <Container className="d-flex">
                    <Carousel>
                        {adMedias.map(m => {
                            return(
                                <Carousel.Item key={m.id_media}>
                                    {m.type==="image"?
                                        <img
                                        className="d-block w-100"
                                        src={m.url}
                                        alt="slide"
                                        />
                                    :   <ReactPlayer
                                        url={m.url}
                                        controls={true}
                                        />
                                    }
                                </Carousel.Item>)
                        })}
                    </Carousel>
                </Container>
                <Container className="d-flex flex-column">
                    <Typography variant="h3">{Number(ad.price)===0?"À donner":fNumber(Number(ad.price))+"€"}</Typography>
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

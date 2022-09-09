import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
const ImagesDiv = styled.div`
    padding-top:50px;
    width:600px;
    height:600px;
`
const Poster = styled.img`
    width:400px;
    height:600px;
`
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const REACT_API_KEY = "ec16f51aa2aeb34f870ccabdaf00a523";

export default function Images() {
    const API_URL = "https://api.themoviedb.org/3/";
    const [images, setimages] = useState([]);
    const fetchImages = async () => {
        const { data: { results } } = await axios.get(`${API_URL}trending/all/week?`
            , {
                params: {
                    api_key: REACT_API_KEY
                }
            })
        setimages(results);
    }
    useEffect(() => {
        fetchImages()
    }, [])
    return (
        <ImagesDiv>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >

                {images.map(images => (
                    <Poster src={`${IMAGE_PATH}${images.poster_path}`} />
                ))}
            </Carousel>
        </ImagesDiv>
    )
}
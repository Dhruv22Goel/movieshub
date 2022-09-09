import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import NOIMAGE from "../no_image.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
const ReviewsDiv = styled.div`
    overflow-x:auto !important;
    height:fit-content !important;
` 
const ReviewNameImg = styled.div`
  display:flex;
  flex-direction:row;
  padding:10px;
`
const ReviewName = styled.div`
  font-size:25px;
  margin-left:10px;
  color:white;
`
const ReviewImg = styled.img`
  height:50px;
  width:50px;
  max-width:50px;
`
const ReviewDiv = styled.div`
    text-align:center;
`
const API_URL = "https://api.themoviedb.org/3/";
const IMAGE_PATH_W200 = "https://image.tmdb.org/t/p/w200"
export default function Reviews(props) {
    const { id } = useParams();
    const type = props.media_type;
    const [review, setreview] = useState([]);
    const fetchReviews = async () => {
        const { data } = await axios.get(`${API_URL}${type}/${id}/reviews?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
            .catch((exception) => {
                console.log(exception);
            })
        setreview(data.results);
    }
    useEffect(() => {
        fetchReviews()
    }, [id])
    return (
        <ReviewsDiv>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={5}
                infiniteLoop={true}
                showStatus={false}
            >
            {review.map((review) => {
                return (
                    <div>
                        <ReviewNameImg>
                            <ReviewImg src={review.author_details.avatar_path?`${IMAGE_PATH_W200}${review.author_details.avatar_path}`:NOIMAGE} />
                            <ReviewName>{review.author_details.username}</ReviewName>
                        </ReviewNameImg>
                        <ReviewDiv>{review.content}</ReviewDiv>
                    </div>
                )
            })}
            </Carousel>
        </ReviewsDiv>
    )
}
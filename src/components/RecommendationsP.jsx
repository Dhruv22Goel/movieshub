import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import NOIMAGE from "../no_image.jpg"
import { Link } from "react-router-dom"

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const Movie = styled.div`
    display: inline-block;
    transition: transform .2s;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin: 0.19rem;
    cursor:pointer;
    min-width:200px;
    height:300px;
    z-index:0;
    border: 1px solid grey;
    :hover{
        background-color:#000;
        transform: scale(1.2);
        z-index: 1000;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
`
const MovieName = styled.div`
    margin-top:10px;
    min-height:20px;
    width:100%;
    font-family:sans-serif;
    font-size:20px;
    text-align:center;
`
const MoviePosterDiv = styled.div``
const MoviePoster = styled.img`
    height:330px;
    width:100%;
    border-radius:10px;
`
const MovieRating = styled.div``
const BottomDiv = styled.div`
    text-align:center;
    position: absolute;
    padding: 0 1rem 1rem 1rem;
    bottom: 0px;
    height: 290px;
    display: flex;
    flex-direction: column;
    width: 85%;
    justify-content: flex-end;
    background-image: linear-gradient(rgb(0,0,0,0), rgb(0,0,0,1));
    opacity: 0;
    transition: opacity .2s;
    :hover{
        opacity: 1;
    }
`
const MovieType = styled.div`
    text-transform: uppercase;
    font-family:sans-serif;
`
export default function Recommendations(props) {
	const [isLoading, setIsLoading] = useState(true)

	const id = props.recommendations.id;
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [])

	function scroll() {
		window.scrollTo(0, 0);
	}
	return (
		<>
			{
				isLoading
					?
					<Movie>
						<SkeletonTheme baseColor="#000000" highlightColor="#2d313a">
							<Skeleton height={300} duration={0.5} />
						</SkeletonTheme>
					</Movie>
					:
					<Link to={`/${props.type}/${id}`} className="link" onClick={scroll}>
						<Movie>
							<MoviePosterDiv>
								<MoviePoster src={props.recommendations.profile_path ? `${IMAGE_PATH}${props.recommendations.profile_path}` : NOIMAGE} />
							</MoviePosterDiv>
							<BottomDiv>
								<MovieName>{props.recommendations.name}</MovieName>
								<MovieType>{props.recommendations.gender === 1 ? "Female" : "Male"}</MovieType>
								<MovieRating>{props.recommendations.vote_average}</MovieRating>
								<MovieType>{props.recommendations.known_for_department}</MovieType>
							</BottomDiv>
						</Movie>
					</Link>
			}
		</>)
}
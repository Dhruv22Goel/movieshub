import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery/Gallery";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import MovieCritis from "./MovieCritics";
import MovieCollection from "./MovieCollection";
import NoImageLS from "../NoImageLS.png";
import Trailer from "./Trailer";
import Similar from "./Similar";
import Reviews from "./Reviews";
const MovieDetailsDiv = styled.div`
    min-width:99.6vw;
    max-width:99.6vw;
    font-family:sans-serif;
    color:white;
    overflow-y: hidden;
`
const MovieLanding = styled.div`
  display:flex;
  flex-direction:row;
  margin-top:10vh;
  height:100vh;
  align-items:flex-end;
  margin-bottom:10vh;
`
const Background = styled.img`
  height:110vh;
  min-width:99.6vw;
  max-width:99.6vw;
  align-content:right;
  opacity:0.6;

`
const BackgroundDiv = styled.div`
  z-index:2;
  height:110vh;
  min-width:99.6vw;
  max-width:99.6vw;
`
const MoviePoster = styled.img`
  border-radius:10px;
  height:450px;
  width:300px;
  z-index:110;
  margin-left:-1250px;
  margin-bottom:50px;
`
const MovieName = styled.div`
    margin-bottom:150px;
    margin-left:50px;
    font-size:70px;
    font-family:sans-serif;
    color:white;
    font-weight:bold;
    height: fit-content;
    z-index:100;
`
const MovieInfo = styled.div`
    padding:0px 50px 50px 50px;
    display:flex;
    flex-direction:row;
    overflow-y: hidden;
    
`
const MovieInfoLeft = styled.div`
    margin-right:50px;
`
const MovieInfoRight = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: hidden;
`
const MoviePlot = styled.div`
    font-family:sans-serif;
    background-color:#111111;
    border-radius:10px;
    height: fit-content;
    font-size:20px;
    padding:10px;
    width:63.7vw;
`
const MoviePlotSpan = styled.div`
    padding-bottom:10px;
    font-weight:bold;
`
const ReviewandTrailer = styled.div`
  height:70vh;
  padding-top:50px;
  display:flex;
  flex-direction:column;
`
const ReviewandTrailerSpan = styled.div`
  height:10vh;
  padding:10px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  gap:30%
`
const ReviewText = styled.div`
    padding:50px;
    // padding-right:20px;
    text-align:center;
    justify-content:center;
    // margin-right:200px;
    font-weight:bolder;
    font-size:40px;
`
const TrailerText = styled.div`
    padding:50px;
    // padding-left:20px;
    text-align:center;
    justify-content:center;
    // margin-left:10%;
    font-weight:bolder;
    font-size:40px;
`
const ReviewandTrailerBottom = styled.div`
    display:flex;
    flex-direction:row;
`
const Review = styled.div`
    // border:1px solid grey;
    background-color:#111111;
    border-radius:10px;
    padding:10px;
    margin-right:25px;
    width:48%;
    height:40vh;
    overflow-y:auto;
`
const WatchProviderDiv = styled.div`
	display:flex;
	flex-direction:row;
	gap :10px;
	justify-content:center;
`
const H3 = styled.h3`
  padding:10px;
  text-align:center;
  margin:0px;
  font-weight: lighter;
`
const IMAGE_PATH_W500 = "https://image.tmdb.org/t/p/w500"
const IMAGE_PATH_ORIGINAL = "https://image.tmdb.org/t/p/original"

export default function Movie(props) {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [])

	return (
		<MovieDetailsDiv>

			<MovieLanding>
				{
					isLoading
						?
						<BackgroundDiv>
							<SkeletonTheme baseColor="#000000" highlightColor="#2d313a">
								<Skeleton height={750} duration={0.5} />
							</SkeletonTheme>
						</BackgroundDiv>
						:
						<BackgroundDiv>
							<Background src={props.movies.backdrop_path ? `${IMAGE_PATH_ORIGINAL}${props.movies.backdrop_path}` : NoImageLS} />
						</BackgroundDiv>
				}
				<MoviePoster src={`${IMAGE_PATH_W500}${props.movies.poster_path}`} />
				<MovieName>{props.movies.title}</MovieName>
			</MovieLanding>

			<MovieInfo>
				<MovieInfoLeft>
					<MovieCritis key={id} id={id} />
				</MovieInfoLeft>

				<MovieInfoRight>
					<MoviePlot>
						<MoviePlotSpan>Overview</MoviePlotSpan>
						{props.movies.overview}
					</MoviePlot>
					<Gallery id={id} media_type={"movie"} />

					<ReviewandTrailer>

						<ReviewandTrailerSpan>
							<ReviewText>Review</ReviewText>
							<TrailerText>Trailer</TrailerText>
						</ReviewandTrailerSpan>

						<ReviewandTrailerBottom>
							<Review>
						<Reviews key={id} media_type={"movie"}/>
							</Review>
							<Trailer id={id} media_type={"movie"} />
						</ReviewandTrailerBottom>
					</ReviewandTrailer>
					{props.movies.belongs_to_collection ?
						<MovieCollection /> :
						<div></div>
					}
					<Similar id={id} media_type={"movie"} />
				</MovieInfoRight>

			</MovieInfo>
		</MovieDetailsDiv>
	)
}
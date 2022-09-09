import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery/Gallery";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import TvCritis from "./TvCritics";
import TvSeasons from "./TvSeasons";
import NoImageLS from "../NoImageLS.png"
import Similar from "./Similar";
import Trailer from "./Trailer";
import Reviews from "./Reviews";
const TvDetailsDiv = styled.div`
  min-width:99.6vw;
  max-width:99.6vw;
  font-family:sans-serif;
  color:white;
  overflow-y: hidden;
`
const TvLanding = styled.div`
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
const TvPoster = styled.img`
  border-radius:10px;
  height:450px;
  width:300px;
  z-index:110;
  margin-left:-1250px;
  margin-bottom:50px;
`
const TvName = styled.div`
  margin-bottom:150px;
  margin-left:50px;
  font-size:70px;
  font-family:sans-serif;
  color:white;
  font-weight:bold;
  height: fit-content;
  z-index:100;
`
const TvInfo = styled.div`
  padding:0px 50px 50px 50px;
  display:flex;
  flex-direction:row;
  overflow-y: hidden;
  
`
const TvInfoLeft = styled.div`
  margin-right:50px;
`
const TvInfoRight = styled.div`
  display:flex;
  flex-direction:column;
  overflow-y: hidden;
  overflow-x: hidden;
`
const TvPlot = styled.div`
  font-family:sans-serif;
  background-color:#111111;
  border-radius:10px;
  height: fit-content;
  font-size:20px;
  padding:10px;
  width:63.7vw;
`
const TvPlotSpan = styled.div`
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
  background-color:#111111;
  border-radius:10px;
  padding:10px;
  margin-right:25px;
  width:48%;
  height:40vh;
  overflow-y:auto;
`
const TvSeasonsDiv = styled.div`
  overflow-x: auto;
  padding:20px 0px 0px 10px;
`
const H3 = styled.h3`
  padding:10px;
  text-align:center;
  margin:0px;
  font-weight: lighter;
`
const IMAGE_PATH_W500 = "https://image.tmdb.org/t/p/w500"
const IMAGE_PATH_ORIGINAL = "https://image.tmdb.org/t/p/original"

export default function Tv(props) {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id])

  return (
    <TvDetailsDiv>

      <TvLanding>
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
              <Background src={props.tvs.backdrop_path?`${IMAGE_PATH_ORIGINAL}${props.tvs.backdrop_path}`:NoImageLS} />
            </BackgroundDiv>
        }
        <TvPoster src={`${IMAGE_PATH_W500}${props.tvs.poster_path}`} />
        <TvName>{props.tvs.name}</TvName>
      </TvLanding>

      <TvInfo>
        <TvInfoLeft>
          <TvCritis />
        </TvInfoLeft>

        <TvInfoRight>
          <TvPlot>
            <TvPlotSpan>Overview</TvPlotSpan>
            {props.tvs.overview}
          </TvPlot>
          
          <Gallery
            id={id}
            media_type={"tv"} />

          <ReviewandTrailer>
            <ReviewandTrailerSpan>
              <ReviewText>Review</ReviewText>
              <TrailerText>Trailer</TrailerText>
            </ReviewandTrailerSpan>
            <ReviewandTrailerBottom>
              <Review>
                <Reviews media_type={"tv"}/>
              </Review>
              <Trailer id={id} media_type={"tv"} />
            </ReviewandTrailerBottom>
          </ReviewandTrailer>

        <H3>SEASONS</H3>
          <TvSeasonsDiv>
            <TvSeasons />
          </TvSeasonsDiv>

          <Similar id={id} media_type={"tv"}/>
        </TvInfoRight>
      </TvInfo>

    </TvDetailsDiv>
  )
}
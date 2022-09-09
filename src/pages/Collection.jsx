import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import NOIMAGE from "../no_image.jpg"
import NoImageLS from "../NoImageLS.png"
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Recommendations from "../components/Recommendations";
const CollectionDeatilsDiv = styled.div`
    min-width:99.6vw;
    max-width:99.6vw;
    font-family:sans-serif;
    color:white;
    overflow-y: hidden;
`
const CollectionLanding = styled.div`
  display:flex;
  flex-direction:row;
  height:100vh;
  align-items:flex-end;
  margin-bottom:10vh;
  color:white;
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
const CollectionPoster = styled.img`
  border-radius:10px;
  height:450px;
  width:300px;
  z-index:110;
  margin-left:-1250px;
  margin-bottom:50px;
`
const CollectionName = styled.div`
  margin-bottom:150px;
  margin-left:50px;
  font-size:70px;
  font-family:sans-serif;
  color:white;
  font-weight:bold;
  height: fit-content;
  z-index:100;
`
const CollectionInfo = styled.div`
    padding:0px 50px 50px 50px;
    display:flex;
    flex-direction:column;
    overflow-y: hidden; 
`
const CollectionPlot = styled.div`
    font-family:sans-serif;
    background-color:#111111;
    border-radius:10px;
    height: fit-content;
    font-size:20px;
    padding:10px;
    width:90vw;
`
const MoviePlotSpan = styled.div`
    padding-bottom:10px;
    font-weight:bold;
`
const CollectionMovie = styled.div``
const API_URL = "https://api.themoviedb.org/3/";
const IMAGE_PATH_W500 = "https://image.tmdb.org/t/p/w500"
const IMAGE_PATH_ORIGINAL = "https://image.tmdb.org/t/p/original"
export default function Collection() {
    const { id } = useParams()
    const [collection, setcollection] = useState([]);
    const [movie, setmovie] = useState([]);
    const fetchRecommendations = async () => {
        const { data } = await axios.get(`${API_URL}collection/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
            .catch((exception) => {
                console.log(exception);
            })
        setcollection(data)
        setmovie(data.parts);
    }
    useEffect(() => {
        fetchRecommendations()
    }, [])
    return (
        <div>
            <CollectionDeatilsDiv>
                <CollectionLanding>
                    <BackgroundDiv>
                        <Background src={collection.backdrop_path ? `${IMAGE_PATH_ORIGINAL}${collection.backdrop_path}` : NoImageLS} />
                    </BackgroundDiv>
                    <CollectionPoster src={collection.poster_path ? `${IMAGE_PATH_W500}${collection.poster_path}` : NOIMAGE} />
                    <CollectionName>
                        {collection.name}
                    </CollectionName>
                </CollectionLanding>
                <CollectionInfo>
                    <CollectionPlot>
                        <MoviePlotSpan>Overview</MoviePlotSpan>
                        {collection.overview}
                    </CollectionPlot>
                    <CollectionMovie>
                        <div className="recommendations2">
                            {movie.map(recommendations => (
                                <Recommendations
                                    key={recommendations.id}
                                    recommendations={recommendations}
                                    type={"movie"}
                                />
                            ))}
                        </div>
                    </CollectionMovie>
                </CollectionInfo>
            </CollectionDeatilsDiv>
            <NavBar />
        </div>
    )
}


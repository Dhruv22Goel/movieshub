import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import NOIMAGE from "../no_image.jpg"

const SeasonsDiv = styled.div`
	display:flex;
	flex-direction:row;
	height:350px;
	margin:10px auto;
	// overflow-x: visible;
`
const Seasons = styled.div`
	height:300px;
	width:200px;
	background-color:#111111;
	border-radius:10px;
  margin:5px;
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
const SeasonsImg = styled.img``
const SeasonsTextDiv = styled.div`
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
		z-index:1000;
		opacity: 1;
	}
`
const SeasonsText = styled.div`
	margin:2px;
`
const API_URL = "https://api.themoviedb.org/3/";
const IMAGE_PATH_W200 = "https://image.tmdb.org/t/p/w200"
export default function TvSeasons() {
	const { id } = useParams()
	const [season, setseason] = useState([]);
	const fetchRecommendations = async () => {
		const { data } = await axios.get(`${API_URL}tv/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&append_to_response=alternative_titles,credits`)
			.catch((exception) => {
				console.log(exception);
			})
		setseason(data.seasons)
	}
	useEffect(() => {
		fetchRecommendations()
	}, [id])
	return (
		<>
			<SeasonsDiv>
				{season.map((season) => {
					return (<Seasons>
						<SeasonsImg src={season.poster_path ? `${IMAGE_PATH_W200}${season.poster_path}` : NOIMAGE} />
						<SeasonsTextDiv>
							<SeasonsText>
								{season.name}
							</SeasonsText>
							<SeasonsText>No. of Episodes {season.episode_count}</SeasonsText>
						</SeasonsTextDiv>
					</Seasons>)
				})}
			</SeasonsDiv>
		</>
	)
}
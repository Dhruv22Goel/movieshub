import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Recommendations from "../components/Recommendations.jsx";
import axios from "axios";
import Movie from "../components/MovieComponent.jsx";

const H1 = styled.h1`
    padding-top:20px;
    text-align:center;
    margin:0px;
    font-weight: lighter;
`
export default function Similar(props) {
	const id = props.id
	const type = props.media_type;
	const API_URL = "https://api.themoviedb.org/3/";
	const [recommendations, setRecommendations] = useState([]);
	const fetchRecommendations = async () => {
		const { data: { results } } = await axios.get(`${API_URL}${type}/${id}/similar?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
			.catch((exception) => {
				console.log(exception);
			})
		setRecommendations(results);
	}
	useEffect(() => {
		fetchRecommendations()
	}, [id])
	const [movies, setmovies] = useState({})
	const fetchMovie = async () => {
		const { data } = await axios.get(`${API_URL}${type}/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&page=1&append_to_response=reviews,similar,credits,alternative_titles,videos`)
			.catch((exception) => {
				console.log(exception);
			})
		setmovies(data)
	}
	alpha();
	function alpha() {
		<Movie
			movies={movies}
		/>
		fetchMovie();
	}
	return (
		<>
			<H1> Similar</H1>
			<div className="recommendations2">
				{recommendations.map(recommendations => (
					<Recommendations
						key={recommendations.id}
						recommendations={recommendations}
						type={type}
					/>
				))}
			</div>
		</>
	)
}
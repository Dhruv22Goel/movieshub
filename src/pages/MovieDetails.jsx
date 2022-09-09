import React, { useEffect, useState } from "react";
import Movie from "../components/MovieComponent.jsx";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
export default function App() {
	const { id } = useParams()
	const API_URL = "https://api.themoviedb.org/3/";
	const [movies, setmovies] = useState({})
	const fetchMovie = async () => {
		const { data } = await axios.get(`${API_URL}movie/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&page=1&append_to_response=reviews,similar,credits,alternative_titles,videos`)
			.catch((exception) => {
				console.log(exception);
			})
		setmovies(data)
	}
	useEffect(() => {
		fetchMovie()
	}, [id])
	console.log(movies)
	return (
		<div className="App">
			<Movie
				movies={movies}
			/>
			<NavBar />
		</div>
	);
}
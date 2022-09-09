import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";
const MovieCritis = styled.div`
    background-color:#111111;
    // border:1px solid grey;
    background-color:#111111;
    border-radius:10px;
    width:22vw;
    // max-height:90vh;
    padding:10px;
`
const Details = styled.div`padding:7px;`
const H3 = styled.h3`
    margin:2px 2px 2px 0px;
    font-weight:bold;
`
const H1 = styled.h1`
	text-align:center;
	border:1px solid grey;
	padding:5px;
`
const API_URL = "https://api.themoviedb.org/3/";
export default function Critis(props) {
	const id = props.id
	const [movie,setmovie] = useState([]);
	const [genre, setgenre] = useState([]);
	const [company, setcompany] = useState([]);
	const [country, setcountry] = useState([]);
	const [title, settitle] = useState([]);
	const [actor, setactor] = useState([]);
	const fetchRecommendations = async () => {
		const { data } = await axios.get(`${API_URL}movie/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&append_to_response=alternative_titles,credits`)
			.catch((exception) => {
				console.log(exception);
			})
		setmovie(data);
		setgenre(data.genres)
		setcompany(data.production_companies)
		setcountry(data.production_countries)
		settitle(data.alternative_titles.titles)
		setactor(data.credits.cast)
	}
	useEffect(() => {
		fetchRecommendations()
	}, [])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [])
	return (
		<>
			{
				isLoading
					?
					<MovieCritis>
						<SkeletonTheme baseColor="#000000" highlightColor="#2d313a">
							<Skeleton height={750} duration={0.5} />
						</SkeletonTheme>
					</MovieCritis>
					:
					<MovieCritis>
						<H1>{movie.title}</H1>
						<Details><H3>Adult:</H3>{String(movie.adult)}</Details>
						<Details><H3>Release Date:</H3>{movie.release_date}</Details>
						<Details><H3>Runtime:</H3>{movie.runtime} min</Details>
						<Details><H3>Genre:</H3>{genre.map((genre) => { return <div>{genre.name}</div> })}</Details>
						<Details><H3>Production Companies:</H3>{company.map((company) => { return <div>{company.name}</div> })}</Details>
						<Details><H3>Production Countries:</H3>{country.map((country) => { return <div>{country.name}</div> })}</Details>
						<Details><H3>Actors:</H3>{actor.slice(0,30).map((actor) => { return <div>{actor.name}</div> })}</Details>
						<Details><H3>Tagline:</H3>{movie.tagline}</Details>
						<Details><H3>Status:</H3>{movie.status}</Details>
						<Details><H3>Languages:</H3>{movie.original_language}</Details>
						<Details><H3>Budget($):</H3>{movie.budget}</Details>
						<Details><H3>Revenue($):</H3>{movie.revenue}</Details>
						<Details><H3>Popularity:</H3>{movie.popularity}</Details>
						<Details><H3>Vote Average:</H3>{movie.vote_average}</Details>
						<Details><H3>Vote Count:</H3>{movie.vote_count}</Details>
						<Details><H3>Alternative Title:</H3>{title.map((title) => { return <div>{title.title}</div> })}</Details>
					</MovieCritis>
			}
		</>
	)
}
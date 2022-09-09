import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams } from "react-router-dom";
import axios from "axios";
const TvCritis = styled.div`
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
export default function Critis() {
	const { id } = useParams()
	const [tv, settv] = useState([]);
	const [genre, setgenre] = useState([]);
	const [company, setcompany] = useState([]);
	const [country, setcountry] = useState([]);
	const [network, setnetwork] = useState([]);
	const [title, settitle] = useState([]);
	const [actor, setactor] = useState([]);
	const [creator, setcreator] = useState([]);
	const fetchRecommendations = async () => {
		const { data } = await axios.get(`${API_URL}tv/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&append_to_response=alternative_titles,credits`)
			.catch((exception) => {
				console.log(exception);
			})
		settv(data);
		setgenre(data.genres)
		setcompany(data.production_companies)
		setcountry(data.production_countries)
		setnetwork(data.networks)
		settitle(data.alternative_titles.results)
		setactor(data.credits.cast)
		setcreator(data.created_by)
		// setreview(data.reviews.results)
	}
	useEffect(() => {
		fetchRecommendations()
	}, [])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 500)
	}, [id])
	return (
		<>
			{
				isLoading
					?
					<TvCritis>
						<SkeletonTheme baseColor="#000000" highlightColor="#2d313a">
							<Skeleton height={750} duration={0.5} />
						</SkeletonTheme>
					</TvCritis>
					:
					<TvCritis>
						<H1>{tv.name}</H1>
						<Details><H3>Adult:</H3>{String(tv.adult)}</Details>
						<Details><H3>First Air Date:</H3>{tv.first_air_date}</Details>
						<Details><H3>Episode Runtime:</H3>{tv.episode_run_time} min</Details>
						<Details><H3>Number of Episodes:</H3>{tv.number_of_episodes}</Details>
						<Details><H3>Number of Seasons:</H3>{tv.number_of_seasons}</Details>
						<Details><H3>Created By:</H3>{creator.map((creator) => { return <div>{creator.name}</div> })}</Details>
						<Details><H3>Genre:</H3>{genre.map((genre) => { return <div>{genre.name}</div> })}</Details>
						<Details><H3>Avaliable On:</H3>{network.map((network) => { return <div>{network.name}</div> })}</Details>
						<Details><H3>Production Companies:</H3>{company.map((company) => { return <div>{company.name}</div> })}</Details>
						<Details><H3>Production Countries:</H3>{country.map((country) => { return <div>{country.name}</div> })}</Details>
						<Details><H3>Actors:</H3>{actor.slice(0, 30).map((actor) => { return <div>{actor.name}</div> })}</Details>
						<Details><H3>Tagline:</H3>{tv.tagline}</Details>
						<Details><H3>Status:</H3>{tv.status}</Details>
						<Details><H3>Languages:</H3>{tv.original_language}</Details>
						<Details><H3>Popularity:</H3>{tv.popularity}</Details>
						<Details><H3>Vote Average:</H3>{tv.vote_average}</Details>
						<Details><H3>Vote Count:</H3>{tv.vote_count}</Details>
						<Details><H3>Alternative Title:</H3>{title.map((title) => { return <div>{title.title}</div> })}</Details>
					</TvCritis>
			}
		</>
	)
}
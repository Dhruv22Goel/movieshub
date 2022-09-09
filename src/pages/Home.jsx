import axios from "axios"
import React, { useEffect, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom"
import styled from "styled-components"
import Credits from "../components/Credits"
import HomeImages from "../components/HomeImages"
import Images from "../components/Images";

const Intro = styled.div`
    height:100vh;
    font-family:sans-serif;
    font-weight:bold;
    display:grid;
    grid-template-columns: 1fr 1fr;
`
const Name = styled.div`
    text-align:center;
    font-size:50px;
    max-width:30vw;
    height:fit-content;
    min-width:fit-content;
    word-wrap: normal;
    margin:auto;
    margin-top:300px;
`
const CoverImg = styled.div`
    margin:30px 60px 50px 60px;
    padding:50px 0px;
    padding-top:0px;
    z-index:100;
    width:200px;
    height:200px;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`
const Top = styled.div`
    display:flex;
    flex-direction:row;
    align-items:flex-end;
`
const Button = styled.button`
    margin-left:25vw;
    background: #111111;
    color: #ffffff; 
    font-weight: 400;
    text-transform: uppercase;
    padding: 10px;
    border: 2px solid #4f4f4f; 
    transform: translate(0); 
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    }
    :before {
        content:"";
        position: absolute; 
        background: linear-gradient(to left, #2d313a, #1c1e24, #2d313a);
        top: 0; 
        bottom: 0;
        width: 8px;
        left: -32px; 
        transform: rotate(-16deg);
        filter: blur (6px);
    }
    :hover::before 
    { 
        left: calc(100% + 32px);
        transition: 0.75s;
        background:#ffffff;
    }
`
const H1 = styled.h1`
  padding:40px 50px 0px 90px;
  text-align:left;
  width:50vw;
  margin:0px;
  font-weight: lighter;
`

export default function Home() {
	const API_URL = "https://api.themoviedb.org/3/";

	const [recommendations, setRecommendations] = useState([]);
	const fetchRecommendations = async () => {
		const { data: { results } } = await axios.get
		(`${API_URL}movie/popular?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
		setRecommendations(results);
	}

	const [recommendations2, setRecommendations2] = useState([]);
	const fetchRecommendations2 = async () => {
		const { data: { results } } = await axios.get
		(`${API_URL}trending/movie/week?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
		setRecommendations2(results);
	}

	const [recommendations3, setRecommendations3] = useState([]);
	const fetchRecommendations3 = async () => {
		const { data: { results } } = await axios.get
		(`${API_URL}trending/tv/week?api_key=ec16f51aa2aeb34f870ccabdaf00a523`)
		setRecommendations3(results);
	}
	useEffect(() => {
		fetchRecommendations()
		fetchRecommendations2()
		fetchRecommendations3()
	}, [])

	function scroll(){
        window.scrollTo(0, 0);
	}
	return (
		<div>
			<Intro>
				<Name>
					🎬 MOVIES HUBB 🎥
				</Name>
				<Images />
			</Intro>
			<Top>
				<H1>POPULAR</H1>
				<Link to="/popular" className="link"><Button>View More</Button></Link>
			</Top>
			<CoverImg>
				{recommendations.slice(0, 6).map(recommendations => (
					<Link to={`/movie/${recommendations.id}`} className="link" onClick={scroll}>
						<HomeImages
							key={recommendations.id}
							recommendations={recommendations}
						/>
					</Link>
				))}
			</CoverImg>

			<Top>
				<H1>TRENDING MOVIES</H1>
				<Link to="/movies" className="link"><Button>View More</Button></Link>
			</Top>

			<CoverImg>
				{recommendations2.slice(0, 6).map(recommendations2 => (
					<Link to={`/movie/${recommendations2.id}`} className="link" onClick={scroll}>
						<HomeImages
							key={recommendations2.id}
							recommendations={recommendations2}
						/>
					</Link>
				))}
			</CoverImg>

			<Top>
				<H1>TRENDING TV SERIES</H1>
				<Link to="/tvseries" className="link"><Button>View More</Button></Link>
			</Top>

			<CoverImg>
				{recommendations3.slice(0, 6).map(recommendations3 => (
					<Link to={`/tv/${recommendations3.id}`} className="link" onClick={scroll}>
						<HomeImages
							key={recommendations3.id}
							recommendations={recommendations3}
						/>
					</Link>
				))}
			</CoverImg>
			<Credits />

		</div>
	)
}
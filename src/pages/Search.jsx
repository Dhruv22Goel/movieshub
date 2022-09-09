import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import styled from "styled-components";
import Recommendations from "../components/Recommendations.jsx";
import RecommendationsP from "../components/RecommendationsP.jsx";
const TrendingDiv = styled.div``
const H1 = styled.h1`
  padding-top:20px;
  text-align:center;
  margin:0px;
  font-weight: lighter;
`
const SearchBar = styled.div`
    display:flex;
    flex-direction:row;
    margin:10px;
    gap:10px;
`
const Input = styled.input`
    width:90vw;
    border:none;
    background-color:#202020;
    padding:10px;
    border-radius:10px;
    color:white;
`
const Button = styled.button`
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
    }
`
const Select = styled.select`
	border:1px solid white;
	border-radius:5px;
	height:fit-content;
	width:fit-content;
	background-color:black;
	color:white;
	padding:10px;
	:hover{
		transform:scale(1.2)
}
`
const Option = styled.option`
	padding:5px;
`
const ButtonDiv = styled.div`
  margin:20px;
  margin-left:35vw;
  display:flex;
  flex-direction:row;
  gap:175px;
`
const Page = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
    align-items:center;
`
const REACT_API_KEY = "ec16f51aa2aeb34f870ccabdaf00a523";

var type = "movie";
export default function Trending() {
	const API_URL = "https://api.themoviedb.org/3/";
	const [search, setseacrh] = useState("a");
	const [currentpage, setcurrentpage] = useState(1);
	const pages = "page=" + currentpage;
	let uname = document.querySelector("#uname");
	function send() {
		setseacrh(uname.value);
		fetchMovie();
		setcurrentpage(1);
	}

	function Changetype() {
		var a = document.getElementById("media_type")
		type = a.value;
	}
	const [movie, setmovie] = useState([]);
	const fetchMovie = async () => {
		const { data: { results } } =
			await axios.get(
				`${API_URL}search/${type}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&query=${search}&${pages}&include_adult=false`
			).catch((exception) => {
				console.log(exception);
			})
		setmovie(results);
	}
	useEffect(() => {
		fetchMovie()
	}, [pages])

	const incpage = () => {
		fetchMovie();
		setcurrentpage(prevpage => prevpage + 1);
		fetchMovie();
	}
	const decpage = () => {
		if (currentpage > 1) {
			setcurrentpage(prevpage => prevpage - 1);
		}
		fetchMovie()
	}
	return (
		<>
			<H1>SEARCH</H1>
			<SearchBar>
				<Input onChange={send} type="text" placeholder="Search" id="uname" autoFocus={true} autoComplete="off" />
				<Button type="submit" onClick={send}>Submit</Button>
				<Select onChange={Changetype} id="media_type">
					<Option>movie</Option>
					<Option>tv</Option>
					<Option>person</Option>
				</Select>
			</SearchBar>
			<TrendingDiv>
				{type === "person" ?
					<Page>
						{movie.slice(0,18).map(movie => (
							<RecommendationsP
								key={movie.id}
								recommendations={movie}
								type={type}
							/>
						))}
					</Page>
					:
					<Page>
						{movie.map(movie => (
							<Recommendations
								key={movie.id}
								recommendations={movie}
								type={type}
							/>
						))}
					</Page>
				}
				<ButtonDiv>
					<Button onClick={decpage}>Previous Page</Button>
					<Button onClick={incpage}>Next Page</Button>
				</ButtonDiv>
			</TrendingDiv>
			<NavBar />
		</>
	)
}
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import axios from "axios";
import Recommendations from "../components/Recommendations.jsx";
const DiscoverDiv = styled.div`
    padding:25px 100px;
    display:flex;
    flex-direction:row;
    gap:50px;
    align-items:center;
`
const Choise = styled.div`
    display:flex;
    flex-direction:column;
    width:fit-content;
`
const Select = styled.select`
    border:1px solid white;
    border-radius:5px;
    height:6vh;
    width:10vw;
    background-color:#111111;
    color:white;
    padding:10px;
`
const Lable = styled.label`
    font-weight:bold;
    // text-align:center;
    padding:10px;
`
const Input = styled.input`
    border:1px solid white;
    background-color:#202020;
    padding:10px;
    border-radius:5px;
    color:white;
    width:9vw;
    max-width:9vw;
`
const Option = styled.option`
	padding:5px;
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
        background:#ffffff;
    }
`
const Page = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    align-items:center;
    padding:7%;
`
const ButtonDiv = styled.div`
  margin:20px;
  margin-left:35vw;
  display:flex;
  flex-direction:row;
  gap:175px;
`
export default function Discover() {
    var type = "movie";
    var sort_by = "popularity";
    var sort_order = "desc";
    var include_adult = "false";
    var release_date_gte = "0";
    var release_date_lte = "2022";
    var year = "2022";
    const API_URL = "https://api.themoviedb.org/3/";
    const REACT_API_KEY = "ec16f51aa2aeb34f870ccabdaf00a523";
    const [movie, setmovie] = useState([])
    const [currentpage, setcurrentpage] = useState(1);
    const fetchMovie = async () => {
        const { data: { results } } =
            await axios.get(
                `${API_URL}discover/${type}?api_key=${REACT_API_KEY}&language=en-US&sort_by=${sort_by}.${sort_order}&include_adult=${include_adult}&page=${currentpage}&release_date.gte=${release_date_gte}&release_date.lte=${release_date_lte}&year=${year}&with_watch_monetization_types=flatrate`
            ).catch((exception) => {
                console.log(exception);
            })
        setmovie(results);
        console.log(movie)
    }
    function Changetype() {
        var a = document.getElementById("type");
        type = a.value;
        console.log(type);
        fetchMovie();
    }
    function ChangeSortBy() {
        var a = document.getElementById("sort_by");
        sort_by = a.value;
        console.log(sort_by);
        fetchMovie();
    }
    function ChangeSortOrder() {
        var a = document.getElementById("sort_order");
        sort_order = a.value;
        console.log(sort_order);
        fetchMovie();
    }
    function ChangeAdult() {
        var a = document.getElementById("include_adult");
        include_adult = a.value;
        console.log(include_adult);
        fetchMovie();
    }
    function ChangeYear() {
        var a = document.getElementById("year");
        year = a.value;
        console.log(year);
        fetchMovie();
    }
    function ChangeYearAfter() {
        var a = document.getElementById("aftre");
        release_date_lte = a.value;
        console.log(release_date_lte);
        fetchMovie();
    }
    const incpage = () => {
        setcurrentpage(prevpage => prevpage + 1);
        console.log(currentpage)
    }
    const decpage = () => {
        if (currentpage > 1) {
            setcurrentpage(prevpage => prevpage - 1);
        }
    }
    useEffect(() => {
        fetchMovie()
    }, [currentpage])
    return (
        <>
            <DiscoverDiv>
                <Choise>
                    <Lable for="type">Type</Lable>
                    <Select name="type" onChange={Changetype} id="type">;
                        <Option value="movie">Movie</Option>
                        <Option value="tv">TV</Option>
                    </Select>
                </Choise>
                <Choise>
                    <Lable for="sort_By">Sort By</Lable>
                    <Select name="sort_By" onChange={ChangeSortBy} id="sort_by">
                        <Option value="popularity">Popularity</Option>
                        <Option value="original_title">Title</Option>
                        <Option value="release_date">Release Date</Option>
                    </Select>
                </Choise>
                <Choise>
                    <Lable for="sort_By">Sort By</Lable>
                    <Select name="sort_By" onChange={ChangeSortOrder} id="sort_order">
                        <Option value="desc">Descending</Option>
                        <Option value="asc">Ascending</Option>
                    </Select>
                </Choise>
                <Choise>
                    <Lable for="include_adult">Include Adult</Lable>
                    <Select name="include_adult" onChange={ChangeAdult} id="include_adult">
                        <Option value="false">False</Option>
                        <Option value="true">True</Option>
                    </Select>
                </Choise>
                <Choise>
                    <Lable>Release Year</Lable>
                    <Input type="number" min="0" max="3000" placeholder="2022" autoComplete="off" id="year" onChange={ChangeYear} />
                </Choise>
                <Choise>
                    <Lable>Released After</Lable>
                    <Input type="date" placeholder="dd-mm-yyyy" id="after" onChange={ChangeYearAfter} />
                </Choise>
                
            </DiscoverDiv>
            <Page>
                {movie.map(movie => (
                    <Recommendations
                        key={movie.id}
                        recommendations={movie}
                        type={type}
                    />
                ))}
            </Page>
            <ButtonDiv>
					<Button onClick={decpage}>Previous Page</Button>
					<Button onClick={incpage}>Next Page</Button>
				</ButtonDiv>
            <NavBar />

        </>
    )
}
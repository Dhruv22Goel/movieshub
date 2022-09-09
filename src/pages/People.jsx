import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import Recommendations from "../components/Recommendations.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const PeopleDiv = styled.div`
    min-width:99.6vw;
    max-width:99.6vw;
    font-family:sans-serif;
    color:white;
    overflow-y: hidden;
`
const PeopleLanding = styled.div`
    display:flex;
    flex-direction:row;
    height:90vh;
    align-items:flex-end;
    margin-bottom:10vh;
    background-color:#0a0a0a;
`
const PeoplePoster = styled.img`
    border-radius:10px;
    height:450px;
    width:300px;
    z-index:110;
    margin:50px;
`
const PeopleName = styled.div`
    margin-bottom:150px;
    margin-left:50px;
    font-size:70px;
    font-family:sans-serif;
    color:white;
    font-weight:bold;
    height: fit-content;
    z-index:100;
`
const PeopleInfo = styled.div`
    padding:0px 50px 50px 50px;
    display:flex;
    flex-direction:row;
    overflow-y: hidden;
`
const PeopleInfoLeft = styled.div`
    margin-right:50px;
`
const PeopleDetails = styled.div`
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
const PeopleInfoRight = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: hidden;
`
const PeopleBio = styled.div`
    font-family:sans-serif;
    background-color:#111111;
    border-radius:10px;
    height: fit-content;
    font-size:20px;
    padding:10px;
    width:63.7vw;
`
const PeopleBioSpan = styled.div`
    padding-bottom:10px;
    font-weight:bold;
`
const H2 = styled.h2`
    padding-top:20px;
    margin:0px;
    margin-top:20px;
    font-weight: lighter;
`
const IMAGE_PATH_W500 = "https://image.tmdb.org/t/p/w500"
const API_URL = "https://api.themoviedb.org/3/";
export default function People() {
    const { id } = useParams()
    const [people, setpeople] = useState({})
    const [moivecredits, setmoviecredits] = useState([]);
    const [tvcredits, settvcredits] = useState([]);
    const fetchPeople = async () => {
        const { data } = await axios.get(`${API_URL}person/${id}?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US&page=1&append_to_response=movie_credits,tv_credits`)
            .catch((exception) => {
                console.log(exception);
            })
        setpeople(data)
        setmoviecredits(data.movie_credits.cast)
        settvcredits(data.tv_credits.cast)
        console.log(data)
    }
    useEffect(() => {
        fetchPeople()
    }, [1])
    function alpha() {
        fetchPeople();
    }
    return (
        <PeopleDiv>
            <PeopleLanding>
                <PeoplePoster src={`${IMAGE_PATH_W500}${people.profile_path}`} />
                <PeopleName>{people.name}</PeopleName>
            </PeopleLanding>
            <PeopleInfo>
                <PeopleInfoLeft>
                    <PeopleDetails>
                        <Details><H3>Gender:</H3>{people.gender === 1 ? "Female" : "Male"}</Details>
                        <Details><H3>Brithday:</H3>{people.birthday}</Details>
                        <Details><H3>Deathday:</H3>{people.deathday ? people.deathday : "Null"}</Details>
                        <Details><H3>Known For:</H3>{people.known_for_department}</Details>
                        <Details><H3>Place Of Birth:</H3>{people.place_of_birth}</Details>
                        <Details><H3>Popularity:</H3>{people.popularity}</Details>
                        <Details><H3>Worked In:</H3>{tvcredits.map((tvcredits) => { return <div>{tvcredits.name}</div> })}{moivecredits.map((moivecredits) => { return <div>{moivecredits.title}</div> })}</Details>
                    </PeopleDetails>
                </PeopleInfoLeft>
                <PeopleInfoRight>
                    <PeopleBio>
                        <PeopleBioSpan>Biography</PeopleBioSpan>
                        {people.biography}
                    </PeopleBio>
                    <H2>Featured Movies</H2>
                    <div className="recommendations2">
                        {moivecredits.map(moivecredits => (
                            <Link to={`/movie/${moivecredits.id}`} className="link" onClick={alpha}>
                                <Recommendations
                                    key={moivecredits.id}
                                    recommendations={moivecredits}
                                    type={"movie"}
                                />
                            </Link>
                        ))}
                    </div>
                    <H2>Featured TV Shows</H2>
                    <div className="recommendations2">
                        {tvcredits.map(tvcredits => (
                            <Link to={`/movie/${tvcredits.id}`} className="link" onClick={alpha}>
                                <Recommendations
                                    key={tvcredits.id}
                                    recommendations={tvcredits}
                                    type={"tv"}
                                />
                            </Link>
                        ))}
                    </div>
                </PeopleInfoRight>
            </PeopleInfo>

            <NavBar />
        </PeopleDiv>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FooterBG from "../footer-bg.jpg";
const NavBarDiv = styled.div`
    height:10vh;
    max-height:10vh;
    background-image:url(${FooterBG});
    display:flex;
    flex-direction:row;
    padding-left:230px;
`
export default function NavBar(){
    return(
        <NavBarDiv>
            <Link to="/" className="link2">Home</Link>
            <Link to="/popular" className="link2">Popular</Link>
            <Link to="/movies" className="link2">Movie</Link>
            <Link to="/tvseries" className="link2">TV Series</Link>
            <Link to="/search" className="link2">Search</Link>
        </NavBarDiv>
    )
}
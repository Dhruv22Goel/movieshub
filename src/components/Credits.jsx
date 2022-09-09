import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import FooterBG from "../footer-bg.jpg";
const CreditsDiv = styled.div`
    color:white;
    font-family:sans-serif;
    margin-top:100px;
    display:flex;
    flex-direction:column;
    background-image:url(${FooterBG});
    align-items:center;
`
const Text = styled.div`
    height:fit-content;
    width:fit-content;
`
const Redirects = styled.div`
    display:flex;
    flex-direction:row;
    padding:10px;
`
const Alpha = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`
export default function Credits() {
    function scroll() {
        window.scrollTo(0, 0);
    }
    return (
        <CreditsDiv>
            <Redirects>
                <Link to="/" className="link link3" exact onClick={scroll}>Home</Link>
                <Link to="/about" className="link link3">About Us</Link>
                <Alpha>
                    <Link to="/toprated" className="link link3">Top Rated</Link>
                    <Link to="/upcoming" className="link link3">Upcoming</Link>
                </Alpha>
                <Alpha>
                    <Link to="/search" className="link link3">Search</Link>
                    <Link to="/discover" className="link link3">Discover</Link>
                </Alpha>
            </Redirects>
            <Text>© 2022</Text>
        </CreditsDiv>
    )
}

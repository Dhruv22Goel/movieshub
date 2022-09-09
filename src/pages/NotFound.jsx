import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
const NotFoundDiv = styled.div`
    display:flex;
    justify-contetn:center;
    align-itmes:center;
    padding:300px;
`
const NotFoundTextDiv = styled.div`
    margin:auto;
    text-align:center;
    color:white;
    font-size:50px;
`
export default function NotFound() {
    return (
        <>
        <NotFoundDiv>
            <NotFoundTextDiv>
                ERROR! 404 NOT FOUND
            </NotFoundTextDiv>
        </NotFoundDiv>
        <NavBar/>
        </>
    )
}
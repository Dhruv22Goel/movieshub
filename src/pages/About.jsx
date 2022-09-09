import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import ProfilePic from "../ProfilePic (2).jpg";

const AboutDiv = styled.div`
    max-height:100vh;
`
const AboutMe = styled.div`
    padding:10vh;   
    height:70vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
`
const AboutMeImgDiv=styled.div`
    height:140px;
    width:140px;
    z-index:100;
    margin:0px 0px -70px 550px;
    // margin-bottom:-50px;
`
const AboutMeImg = styled.img`
    height:140px;
    border-radius:70px;
`
const AboutMeDiv = styled.div`
    height:400px;
    width:600px;
    background-color:white;
    margin:auto;
    border-radius:10px;
    padding:100px;
    color:black;
    text-align:center;
    display:flex;
    flex-direction:column;
    justify-content:center;
`
const P = styled.p`
    margin:auto;
    width:300px;
    font-size: 16px;
    text-align: left;
    word-wrap: break-word;
`
export default function About(){
    return(
        <>
        <AboutDiv>
            <AboutMe>
                <AboutMeImgDiv>
                    <AboutMeImg src={ProfilePic} />
                </AboutMeImgDiv>
                <AboutMeDiv>
                    <h3>DHRUV GOEL</h3>
                    <p><b>Student, Web Developer, and Software Engineer in Delhi,India</b></p>
                    <P>Greetings, I’m Dhruv . I’m a student living in Delhi,India. I am a fan of technology, food, and web development. I’m also interested in fitness and music.</P>
                </AboutMeDiv>
            </AboutMe>

        </AboutDiv>
        <NavBar/>
        </>
    )
}

import styled from "styled-components";
import Logo from "../logo.jpg";
import { Link } from "react-router-dom"
const HeaderDiv =styled.div`
  width: 100%;
  height:10vh;
  display: flex;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-size: 60px;
  padding-bottom: 15px;
  box-shadow: 0px 1px 5px black;
  color: white;
  z-index: 100;
`
const Img = styled.img`
  margin-left: 21vw;
  margin-right:0;
  margin-top:15px;
`
const Div = styled.div`
  margin-left:19vw;
`
const Img2 = styled.img`
  margin-top:15px;
  margin:5px;
  height:10vh;
`
const Header = (props) => {
  return (
  <HeaderDiv onClick={() => window.scroll(0, 0)}>
    <Img2 src={Logo}/>
    <Div>🎬 MOVIES HUBB 🎥</Div> <Img src={props.img}/>
  </HeaderDiv>
  );
};

export default Header;
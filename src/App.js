import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./pages/MovieDetails";
import Tv from "./pages/TvDetails";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular.jsx";
import TVSeries from "./pages/TVSeries.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import Login from "./pages/Login";
import People from "./pages/People";
import Collection from "./pages/Collection";
import Discover from "./pages/Discover";
import Header from "./components/Header";
import jwt_decode from "jwt-decode";
export default function App() {
  var exacts = true;
  // const [user, setUser] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log(" Encoded JWT ID token : " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // }

  // function handleSignOut(event){
  // setUser({});
  // document.getElementById("signInDiv").hidden = false;
  // }
  // useEffect(() => {
  //   /*global google*/
  //   google.accounts.id.initialize({
  //     client_id: "495034895553-u71f6niq96hkqpalje9n8do0sekfp6hd.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  //   );

  //   google.accounts.id.prompt();
  // }, []);

  return (
    <div>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact={`${exacts}`} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route path="/search" element={<Search />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/about" element={<About />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/person/:id" element={<People />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/tv/:id" element={<Tv />} />
          <Route path="/*" element={<NotFound />} exact />
        </Routes>
      </Router>
    </div>
  )
}
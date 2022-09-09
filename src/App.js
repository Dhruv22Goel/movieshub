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
import People from "./pages/People";
import Collection from "./pages/Collection";
import Discover from "./pages/Discover";
import Header from "./components/Header";
export default function App() {
  var exacts = true;

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

import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Gallery.css";
import NOIMAGE from "../../no_image.jpg"
import { Link } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const IMAGE_PATH_W200 = "https://image.tmdb.org/t/p/w200"
function Gallery({ id, media_type }) {
  function scroll() {
    window.scrollTo(0, 0);
  }
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <Link to={`/person/${c.id}`} className="link" onClick={scroll}>
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${IMAGE_PATH_W200}/${c.profile_path}` : NOIMAGE}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt1">{c?.name}</b>
        <p className="carouselItem__txt2">{c?.character}</p>
      </div>
    </Link>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, [id]);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;

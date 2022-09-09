import React, { useState, useEffect } from "react";
import axios from "axios";
import Youtube from 'react-youtube'
import { useParams } from "react-router-dom";
const API_URL = "https://api.themoviedb.org/3/";
export default function Trailer(props) {
    const type = props.media_type;
    const { id } = useParams();
    const [trailer, setTrailer] = useState([])
    const fetchvideos = async () => {
        const { data } = await axios.get(`${API_URL}${type}/${id}/videos?api_key=ec16f51aa2aeb34f870ccabdaf00a523&language=en-US`);
        setTrailer(data.results);
    };
    var key;
    function alpha() {
        trailer.map((trailer) => {
            if (trailer.type == "Trailer") {
                key = trailer.key;
            }
        })
    }
    alpha();
    useEffect(() => {
        fetchvideos()
    }, [id])
    const opts = {
        width: '420px',
        height: '300px',
        playerVars: {
            autoplay: 0,
            cc_load_policy: 0,
            fs: 1,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
        }
    }
    return (
        <>
            <Youtube
                videoId={key}
                id={key}
                opts={opts}
            />
        </>
    )
}
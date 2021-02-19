import React from 'react';
import ProTypes from 'prop-types';
import './Movie.css';
import {Link} from 'react-router-dom';

function Movie({id, year, title, summary, poster, genres}){
    return(
        <Link to={{
            pathname:`/movie/${id}`,
            state:{
                year:year,
                title:title,
                summary:summary,
                poster:poster,
                genres:genres
            }
        }}>
            <div className="movie">
                <img src={poster} alt={title} title={title}></img>
                <div className="movie__data">
                    <h3 className="movie__title">{title}</h3>
                    <h5 className="movie__year">{year}</h5>
                    <ul className="movie__genres">{genres.map((gen,index) => 
                        <li key={index} className="genres_genre">{gen}</li>
                    )}</ul>
                    <p className="movie__summary">{summary.slice(0,180)}...</p>
                </div>
            </div>
        </Link>
    ) 
}

Movie.ProTypes ={
    id: ProTypes.number.isRequired, 
    year: ProTypes.number.isRequired,
    title: ProTypes.string.isRequired,
    summary:ProTypes.string.isRequired,
    poster: ProTypes.string.isRequired,
    genres: ProTypes.arrayOf(ProTypes.string).isRequired
}

export default Movie;
import PropType from 'prop-types';
import {Link} from 'react-router-dom';
import styles from "./Movie.module.css";

function Movie({id, medium_cover_image, year, title, summary, genres}){
    return (
    <div className={styles.movie}>
        <img src={medium_cover_image} className={styles.movie__img}  />
        <h1 className={styles.movie__title}>
            <Link to={`/movie/${id}`}>{title}</Link>
        </h1>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0,235)}...`: summary }</p>
        <ul className={styles.movie__genres}>
            {genres.map((g) => <li key={g}>{g}</li>)}
        </ul>
    </div>)
}

Movie.PropType = {
    id: PropType.number.isRequired,
    medium_cover_image : PropType.string.isRequired, 
    title : PropType.string.isRequired, 
    summary : PropType.string.isRequired, 
    genres : PropType.arrayOf(PropType.string).isRequired
}

export default Movie;
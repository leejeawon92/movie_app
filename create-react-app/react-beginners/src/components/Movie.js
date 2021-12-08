import PropType from 'prop-types';
import {Link} from 'react-router-dom';

function Movie({id, medium_cover_image, title, summary, genres}){
    return (
    <div>
        <img src={medium_cover_image}  />
        <h1><Link to={`/movie/${id}`}>{title}</Link></h1>
        <p>{summary}</p>
        <ul>
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
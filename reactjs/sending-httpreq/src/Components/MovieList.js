import React from "react";
import Movie from "./Movie";

import styles from './MovieList.module.css';

const MovieList = (props) => {
    return(
        <ul className={styles['movies-list']}>
            {props.movies.map((movie)=>(
                <Movie key={movie.id} title={movie.title} openingText={movie.openingText} releaseDate={movie.releaseDate} />
            ))}
        </ul>
    );
};

export default MovieList;
import React, {useState} from "react";
import MovieList from "./Components/MovieList";
import './App.css';

const App = () => {

  const [movie, setmovie]= useState([]);

  function fetchMovieHandler(){
    fetch('https://swapi.dev/api/films/').then((response) => {
      return response.json();      
    })  
        
  }

  const DUMMY_DATA=[
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  return(
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={DUMMY_DATA} />
      </section>
    </React.Fragment>
  );
};

export default App;
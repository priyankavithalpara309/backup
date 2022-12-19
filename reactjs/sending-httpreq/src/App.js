import React, {useState, useEffect, useCallback} from "react";
import MovieList from "./Components/MovieList";
import './App.css';
import AddMovie from "./Components/AddMovie";

const App = () => {

  const [movie, setmovie]= useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //get http request

  // async function fetchMovieHandler(){    

  //   // fetch('https://swapi.dev/api/films/').then((response) => {
  //   //   return response.json();      
  //   // }).then((data) => {
  //   //   const transformedMovie = data.results.map((movieData) => {
  //   //     return{
  //   //       id: movieData.episode_id,
  //   //       title: movieData.title,
  //   //       openingText: movieData.opening_crawl,
  //   //       releaseDate: movieData.release_date
  //   //     }
  //   //   });  
  //   //   console.log(transformedMovie);
  //   //   setmovie(transformedMovie);
  //   // });        
    
  //   setIsLoading(true);
  //   setError(null);

  //   //try catch block

  //   try{
  //     const add = await fetch('https://swapi.dev/api/films/');

  //     if(!add.ok){
  //       throw new Error('Something went wrong!')
  //     }
  //     const a1 = await add.json();
      
  //       const transformedMovie = a1.results.map((movieData) => {
  //         return{
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date
  //         }
  //       });  
  //       console.log(transformedMovie);
  //       setmovie(transformedMovie);                
  //   }
  //   catch(error){
  //     setError(error.message);
  //   }

  //   setIsLoading(false);  
  // }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fir-19d8b-default-rtdb.firebaseio.com//movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setmovie(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://fir-19d8b-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movie.length > 0) {
    content = <MovieList movies={movie} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  // const DUMMY_DATA=[
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return(
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movie.length > 0 && <MovieList movies={movie} /> }
        {!isLoading && movie.length === 0 && !error && <p>Not data Found</p>}        
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}         */}
      </section>
    </React.Fragment>
  );
};

export default App;
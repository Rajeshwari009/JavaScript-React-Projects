import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";


function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://movies-fetch-60bf2-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const lodedMovies = [];
      for (const key in data) {
        lodedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
         
        });
      }

      setMovies(lodedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);




  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);





  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movies-fetch-60bf2-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/Json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(movie);
  }


  async function deleteMovieHandler(movieId){
    const response= await fetch("https://movies-fetch-60bf2-default-rtdb.firebaseio.com/movies.json", {
      method: 'DELETE'
    })
    setMovies(prevMovies => prevMovies.filter(movie=>movie.id!==movieId))

    console.log(response)

  }



  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies}
     onDelete={deleteMovieHandler}/>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
       
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

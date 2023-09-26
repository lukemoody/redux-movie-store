import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// type Movie = {
//     movies: [];
// }

// type Selector<T = string[]> = {
//     movies: T;
// }

// To make the type more dynamic and allow it to represent different props such as `basket` or `liked`, you can make use of an index signature in TypeScript
type UseSelector<T = string[]> = {
  [key: string]: T;
};

const IndexPage = () => {
  const [movieTitle, setMovieTitle] = useState<string>("");

  // Setup useDispatch for use in a similar way to a ref() for example
  const dispatch = useDispatch();
  const movies = useSelector<UseSelector>((state) => state.movies);
  const cart = useSelector<UseSelector>((state) => state.basket);
  const likedMovies = useSelector<UseSelector>((state) => state.likedMovies);

  //   useEffect(() => {
  //     console.log("movieTitle", movieTitle);
  //   }, [movieTitle]);

  const handleAddMovie = () => {
    // Add your data to Redux using dispatch
    dispatch({
      type: "ADD_MOVIE",
      payload: movieTitle,
    });

    // Reset state back to null once data has been set
    setMovieTitle("");
  };

  const handleAddToBasket = (item: string) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: item,
    });
  };

  const handleLikedMovies = (item: string) => {
    dispatch({
      type: "ADD_TO_LIKED_MOVIE",
      payload: item,
    });
  };

  return (
    <>
      <div>
        <h1>My Movie List</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div>
        <h2>My Movies</h2>
        <ul>
          {movies.map((movie: string, index: number) => (
            <li key={index}>
              {movie}
              <button onClick={() => handleAddToBasket(movie)}>
                Add to basket
              </button>
              <button onClick={() => handleLikedMovies(movie)}>Like</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Basket ({cart.length})</h2>
        <ul>
          {cart.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Liked Movies ({likedMovies.length})</h2>
        <ul>
          {likedMovies.map((movie: string, index: number) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IndexPage;

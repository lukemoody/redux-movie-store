import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { IsMovie, Cart, LikedMovies } from "../types/types";

// type Movie = {
//     movies: [];
// }

// type Selector<T = string[]> = {
//     movies: T;
// }

// To make the type more dynamic and allow it to represent different props such as `basket` or `liked`, you can make use of an index signature in TypeScript
// type UseSelector<T = string[]> = {
//   [key: string]: T;
// };

// type IsMovie = {
//   title: string;
//   inBasket: boolean;
//   liked: boolean;
// };

// type Cart = {
//   basket: string[];
// };

// type LikedMovies = {
//   likedMovies: string[];
// };

const IndexPage = () => {
  const [movieTitle, setMovieTitle] = useState<string>("");

  // Setup useDispatch for use in a similar way to a ref() for example
  const dispatch = useDispatch();
  const movies = useSelector((state: { movies: IsMovie[] }) => state.movies);
  const cart = useSelector((state: Cart) => state.basket);
  //   const likedMovies = useSelector<UseSelector>((state) => state.likedMovies);
  const likedMovies = useSelector((state: LikedMovies) => state.likedMovies);

  const handleAddMovie = () => {
    const addNewMovieObj = {
      title: movieTitle,
      inBasket: false,
      liked: false,
    };

    // Add your data to Redux using dispatch
    dispatch({
      type: "ADD_MOVIE",
      payload: addNewMovieObj, // OLD: movieTitle,
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
    /** OPTION ONE */
    // const checkIfExists = likedMovies.includes(item);
    // if (checkIfExists !== true) {
    //   dispatch({
    //     type: "ADD_TO_LIKED_MOVIE",
    //     payload: item,
    //   });
    // }

    /** OPTION TWO - logic has been included in the Reducer */
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
          {movies.map((movie: IsMovie, index: number) => (
            <li key={index}>
              {movie.title}
              <button onClick={() => handleAddToBasket(movie.title)}>
                {!movie.inBasket ? "Add to basket" : "Remove from basket"}
              </button>
              <button onClick={() => handleLikedMovies(movie.title)}>
                {!movie.liked ? "Like" : "Unlike"}
              </button>
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

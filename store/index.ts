import { createStore } from "redux";
import type { IsMovie, Cart, LikedMovies } from "../types/types";

// Create a type or interface to assign the correct types to the Reducer Actions
interface RootState {
  movies: IsMovie[];
  basket: Cart[];
  likedMovies: LikedMovies[];
  //   basket: string[];
  //   likedMovies: string[];
}

type RootAction =
  | {
      type: "ADD_MOVIE";
      payload: IsMovie;
    }
  | {
      type: "ADD_TO_BASKET";
      payload: Cart;
      //   payload: Cart | IsMovie;
    }
  | {
      type: "ADD_TO_LIKED_MOVIE";
      payload: LikedMovies;
      //   payload: LikedMovies | IsMovie;
    };

const initialState: RootState = {
  //   movies: [],
  //   basket: [],
  //   likedMovies: [],
  movies: [
    {
      title: "The Godfather",
      inBasket: false,
      liked: false,
    },
    {
      title: "The Terminator",
      inBasket: false,
      liked: false,
    },
    {
      title: "Star Wars",
      inBasket: false,
      liked: false,
    },
  ],
  basket: [],
  likedMovies: [],
};

function reducer(state = initialState, action: RootAction): RootState {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        // basket: [...state.basket, action.payload],
        basket: state.basket.includes(action.payload)
          ? state.basket.filter((movie) => movie !== action.payload)
          : [...state.basket, action.payload],
        movies: state.movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, inBasket: !movie.inBasket }
            : { ...movie, inBasket: movie.inBasket }
        ),
      };
    case "ADD_TO_LIKED_MOVIE":
      return {
        ...state,
        /** OPTION ONE */
        // likedMovies: [...state.likedMovies, action.payload],
        /** OPTION TWO */
        // If state includes value already, remove it else add to state []
        likedMovies: state.likedMovies.includes(action.payload)
          ? state.likedMovies.filter((movie) => movie !== action.payload)
          : [...state.likedMovies, action.payload],
        /** OPTION THREE */
        // We can update multiple state values witin each reducer case
        movies: state.movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, liked: !movie.liked }
            : { ...movie, liked: movie.liked }
        ),
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

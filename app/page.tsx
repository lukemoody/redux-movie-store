"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Take STATE and send it into REDUX

export default function Home() {
  const [movieTitle, setMovieTitle] = useState<string>("");

  useEffect(() => {
    console.log("hello");
    console.log("movieTitle", movieTitle);
  }, [movieTitle, setMovieTitle]);

  return (
    <>
      <h1>My Movie List</h1>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      {console.log("movieTitle", movieTitle)}
    </>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [movieTitle, setMovieTitle] = useState<string>("");

  // Setup useDispatch for use in a similar way to a ref() for example
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("movieTitle", movieTitle);
  }, [movieTitle]);

  const handleAddMovie = () => {
    // Add your data to Redux using dispatch
    dispatch({
      type: "ADD_MOVIE",
      payload: movieTitle,
    });

    // Reset state back to null once data has been set
    setMovieTitle("");
  };

  return (
    <>
      <h1>My Movie List</h1>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={handleAddMovie}>Add Movie</button>
    </>
  );
};

export default IndexPage;

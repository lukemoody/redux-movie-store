export type IsMovie = {
  title: string;
  inBasket: boolean;
  liked: boolean;
};

export type Cart = {
  basket: string[];
};

export type LikedMovies = {
  likedMovies: string[];
};

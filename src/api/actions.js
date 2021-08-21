import { API_KEY, API_URL } from "./constants";
import { genres } from "../utils/genres";

export const getAllMovies = async (page) => {
  const returnedMovies = await fetch(`${API_URL}${API_KEY}&page=${page}`).then(
    (data) => data.json()
  );
  return returnedMovies;
};

export const getImdbId = async (id) => {
  const returnedImdb = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${API_KEY}`
  ).then((data) => data.json());
  return returnedImdb.imdb_id;
};

export const getFilteredMovies = async (keyword, year, language, page) => {
  let keywordId;

  if (keyword) {
    const keywordIds = await fetch(
      `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${keyword}`
    ).then((data) => data.json());

    keywordId = keywordIds.results.find((keywordId) => {
      if (keywordId.name === keyword) {
        return keywordId;
      }
    });
  }

  console.log(keywordId);

  let filteredMovies;

  try {
    filteredMovies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&page=${page}&year=${year}&with_keywords=${
        keywordId ? keywordId.id : keyword ? keyword : ""
      }`
    ).then((data) => data.json());
  } catch (error) {
    filteredMovies = { results: [], total_pages: 1 };
  }

  console.log(filteredMovies);
  return filteredMovies;
};

export const getGenres = (genreIds) => {
  let genresByName = "";
  let firstEl = true;
  genreIds.forEach((genreId) => {
    genres.forEach((genre) => {
      if (genreId === genre.id) {
        if (firstEl) {
          genresByName = genresByName.concat(genre.name);
          firstEl = false;
        } else {
          genresByName = genresByName.concat(`, ${genre.name}`);
        }
      }
    });
  });
  return genresByName;
};

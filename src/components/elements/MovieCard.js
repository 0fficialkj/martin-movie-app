import React, { useEffect, useState } from "react";
import { getImdbId, getGenres } from "../../api/actions";
import { IMAGE_URL, IMDB_URL } from "../../api/constants";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Link,
  Typography,
  Button,
} from "@material-ui/core";

function MovieCard(movie) {
  const { id, title, overview, vote_average, poster_path, genre_ids } =
    movie.movie;

  const [imdbId, setImdbId] = useState();
  const [genres, setGenres] = useState([]);
  const [watched, setWatched] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const getId = async () => {
      setImdbId(await getImdbId(id));
    };

    getId();
    setGenres(getGenres(genre_ids));
    seenChecker();
  }, [id]);

  const seenChecker = () => {
    const seenList = JSON.parse(localStorage.getItem("martinsMovies"));
    if (seenList) {
      const result = seenList.filter((movie) => movie.id === id);
      if (result.length === 1) {
        setWatched(true);
      } else {
        setWatched(false);
      }
    }
  };

  const watchedHandler = () => {
    const seenList = JSON.parse(localStorage.getItem("martinsMovies"));
    if (seenList) {
      const updatedList = [...seenList, { id: id, title: title }];
      localStorage.setItem("martinsMovies", JSON.stringify(updatedList));
    } else {
      const seenMovie = [{ id: id, title: title }];
      localStorage.setItem("martinsMovies", JSON.stringify(seenMovie));
    }
    setWatched(true);
  };

  const unwatchedHandler = () => {
    const seenList = JSON.parse(localStorage.getItem("martinsMovies"));
    const updatedList = seenList.filter((movie) => movie.id !== id);
    localStorage.setItem("martinsMovies", JSON.stringify(updatedList));
    setWatched(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="300"
          image={`${IMAGE_URL}${poster_path}`}
          title={title}
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Box className={classes.ratingAndGenre}>
            <Typography variant="subtitle2">
              <StarIcon className={classes.ratingIcon} />
              {vote_average} / 10
            </Typography>
            <Box className={classes.genres}>
              <Typography variant="subtitle2" color="textSecondary">
                {genres}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.overview}>
            <Typography variant="body2" color="textSecondary" component="p">
              {overview}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionContainer}>
        {imdbId && (
          <Link
            className={classes.Link}
            href={`${IMDB_URL}${imdbId}`}
            target="_blank"
          >
            Details
          </Link>
        )}
        {watched ? (
          <Button
            className={`${classes.button} ${classes.watchedButton}`}
            onClick={unwatchedHandler}
          >
            <VisibilityIcon />
            Watched
          </Button>
        ) : (
          <Button
            className={`${classes.button} ${classes.unwatchedButton}`}
            onClick={watchedHandler}
          >
            <VisibilityOffIcon />
            Unwatched
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MovieCard;

const useStyles = makeStyles({
  root: {
    position: "relative",
    maxWidth: 360,
    height: 650,
    textAlign: "left",
  },
  overview: {
    height: 140,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::-webkit-scrollbar-track": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  ratingIcon: {
    color: "#FFC641",
    fontSize: "0.9rem",
    marginRight: 5,
  },
  ratingAndGenre: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionContainer: {
    position: "absolute",
    bottom: "10px",
    left: "5px",
  },
  genres: {
    width: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  Link: {
    height: 38,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#A55DCB",
    color: "white",
    fontWeight: 600,
    fontSize: "0.8rem",
    textTransform: "uppercase",
  },
  button: {
    width: 130,
    fontWeight: 400,
    fontSize: "0.8rem",
  },
  watchedButton: {
    border: "1px solid #4caf50",
    backgroundColor: "#4caf50",
    color: "white",
  },
  unwatchedButton: {
    border: "1px solid #A55DCB",
  },
});

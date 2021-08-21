import React, { useEffect, useState } from "react";
import MovieCard from "../../elements/MovieCard";
import { getAllMovies, getFilteredMovies } from "../../../api/actions";
import { EN_LANGUAGE, OTHER_LANGUAGE } from "./constants";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@material-ui/core";

function Home() {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(null);
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState(EN_LANGUAGE);
  const [error, setError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const getMovies = async () => {
      const returnedMovies = await getAllMovies(page);
      setMovies(returnedMovies.results);
      setPageLimit(returnedMovies.total_pages);
    };
    getMovies();
  }, []);

  const keywordHandler = (e) => {
    if (e.target.value.slice(-1) === " ") {
      setError(true);
    } else {
      setKeyword(e.target.value);
      setError(false);
    }
  };

  const yearHandler = (e) => {
    if (!isNaN(e.target.value) && e.target.value.length < 5) {
      setYear(e.target.value);
    }
  };

  const onSearchHandler = async () => {
    const returnedMovies = await getFilteredMovies(keyword, year, language, 1);
    setMovies(returnedMovies.results);
    setPageLimit(returnedMovies.total_pages);
  };

  const previousPageHandler = async () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
      if (keyword || year) {
        setMovies(
          await getFilteredMovies(keyword, year, language, page - 1)
        ).then((data) => data.results);
      } else {
        setMovies(await getAllMovies(page - 1)).then((data) => data.results);
      }
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const nextPageHandler = async () => {
    setPage((prevState) => prevState + 1);
    if (keyword || year) {
      const returnedMovies = await getFilteredMovies(
        keyword,
        year,
        language,
        page + 1
      );
      setMovies(returnedMovies.results);
    } else {
      const returnedMovies = await getAllMovies(page + 1);
      setMovies(returnedMovies.results);
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Container className={classes.banner} maxWidth="false">
        <Container className={classes.searchContainer} maxWidth="md">
          <box className={classes.textContainer}>
            <Typography className={classes.heading}>
              Search for a movie
            </Typography>
          </box>
          <Box className={classes.inputContainer} width={1}>
            <TextField
              className={classes.textField}
              size={"medium"}
              label="Keyword"
              variant="outlined"
              value={keyword}
              onChange={keywordHandler}
              error={error}
            />
            {error && (
              <FormHelperText className={classes.errorMessage}>
                Only one keyword allowed
              </FormHelperText>
            )}
            <TextField
              className={classes.textField}
              size={"medium"}
              label="Year"
              variant="outlined"
              value={year}
              onChange={yearHandler}
            />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Age"
              >
                <MenuItem value={EN_LANGUAGE}>English</MenuItem>
                <MenuItem value={OTHER_LANGUAGE}>Other</MenuItem>
              </Select>
            </FormControl>
            <Button
              className={`${classes.button} ${classes.searchButton}`}
              onClick={onSearchHandler}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Container>
      <Container className={classes.contentContainer} maxWidth="md">
        <Grid container spacing={3}>
          {movies.map((movie) => {
            return (
              <Grid item xs={12} sm={4}>
                <MovieCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>
        <Box className={classes.paginationContainer}>
          <Button
            className={`${classes.button} ${classes.previousButton}`}
            disabled={page === 1}
            onClick={previousPageHandler}
          >
            Previous page
          </Button>
          <Button
            className={`${classes.button} ${classes.nextButton}`}
            onClick={nextPageHandler}
            disabled={pageLimit === page}
          >
            Next page
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Home;

const useStyles = makeStyles({
  banner: {
    background:
      "linear-gradient(30deg, rgba(57,0,110,1) 0%, rgba(206,158,231,1) 100%, rgba(216,216,250,1) 100%)",
    height: 170,
    marginBottom: 40,
  },
  searchContainer: {
    height: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingBottom: 50,
  },
  paginationContainer: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 8,
  },
  previousButton: {
    border: "1px solid #A55DCB",
    color: "#A55DCB",
    margin: 5,
  },
  nextButton: {
    backgroundColor: "#A55DCB",
    color: "white",
    margin: 5,
  },
  searchButton: {
    backgroundColor: "gold",
    color: "#A55DCB",
    fontWeight: 700,
    flex: 1,
  },
  textContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    color: "white",
  },
  heading: {
    fontWeight: 900,
    fontSize: "2rem",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textField: {
    marginRight: 20,
    backgroundColor: "#E8F5FF",
    borderRadius: 4,
  },
  errorMessage: {
    position: "absolute",
    left: 5,
    bottom: -20,
    color: "red",
  },
});

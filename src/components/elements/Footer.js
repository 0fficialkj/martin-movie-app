import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Link, Typography } from "@material-ui/core";

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.footerContainer} maxWidth="md">
        <Box className={classes.boxContainer}>
          <Typography className={classes.heading} variant="h5">
            Martin's Movies
          </Typography>
          <Typography variant="body1" component="p">
            Welcome to Martin's Movies. Here you are add movies that you have
            watched and also search for movies you heard of!
          </Typography>
        </Box>
        <Box className={classes.boxContainer}>
          <Typography className={classes.heading} variant="h5">
            Useful links
          </Typography>
          <Link className={classes.link}>Instagram</Link>
          <Link className={classes.link}>Twitter</Link>
          <Link className={classes.link}>Facebook</Link>
        </Box>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "#A55DCB",
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 300,
    flexWrap: "wrap",
  },
  boxContainer: {
    height: 200,
    width: 250,
    color: "white",
    display: "flex",
    flexDirection: "column",
    marginRight: 70,
  },
  heading: {
    marginBottom: 20,
    fontWeight: 700,
  },
  link: {
    color: "white",
  },
});

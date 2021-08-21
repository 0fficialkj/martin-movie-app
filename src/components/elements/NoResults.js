import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

export const NoResults = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4">
        No results
      </Typography>
      <Typography>
        We searched far and wide and couldn't find any movies matching your
        search.
      </Typography>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    height: 370,
    textAlign: "center",
  },
  heading: {
    fontWeight: 700,
    marginBottom: 20,
  },
});

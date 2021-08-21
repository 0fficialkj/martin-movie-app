import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { makeStyles } from "@material-ui/core";

export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PacmanLoader color={"#36D7B7"} loading={true} size={25} />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

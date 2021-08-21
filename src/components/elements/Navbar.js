import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

export default function Navbar() {
  const classes = useStyles();

  const links = [
    { name: "Home", href: "http://localhost:3000/" },
    { name: "Pages", href: "#" },
    { name: "Movies & TV Shows", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.navbar}>
          <Typography className={classes.logo} variant="h6">
            Martin's Movies
          </Typography>
          <div className={classes.links}>
            {links.map((link) => (
              <Link className={classes.link} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 64,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    position: "absolute",
    left: 20,
    width: 200,
  },
  navbar: {
    backgroundColor: "white",
    color: "#A55DCB",
    display: "flex",
    justifyContent: "center",
  },
  links: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: 500,
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
}));

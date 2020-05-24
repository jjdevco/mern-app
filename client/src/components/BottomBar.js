import React from "react";
import { Link, useLocation } from "react-router-dom";

// MUI Components
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.light,
  },

  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "55px",
    width: "100%",
    minWidth: "210px",
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      width: "600px",
    },
  },

  button: {
    display: "flex",
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    borderRadius: "15px",
    borderWidth: "2px",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      borderWidth: "2px",
    },
  },
}));

function BottomBar(props) {
  const theme = useTheme();
  const classes = useStyles();
  const path = useLocation().pathname;
  const authenticationRoute =
    path === "/signin" || path === "/signup" ? true : false;
  const small = useMediaQuery(theme.breakpoints.only("xs"));

  return !authenticationRoute && small ? (
    <AppBar
      color="transparent"
      classes={{
        root: classes.appBar,
      }}
    >
      <Toolbar
        variant="dense"
        classes={{
          root: classes.root,
        }}
        disableGutters
      >
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          component={Link}
          to="/signin"
        >
          Sign In
        </Button>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="medium"
          component={Link}
          to="/signup"
          disableElevation
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  ) : (
    ""
  );
}

export default BottomBar;

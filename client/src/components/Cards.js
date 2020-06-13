import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Router
import { useParams } from "react-router-dom";

// Store
import { connect } from "react-redux";
import { getEntries } from "../store/actions/entriesActions";

// APP Components
import Card from "./Card";

// MUI Components
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
  },

  entries: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));

function Cards({ getEntries, entries }) {
  const classes = useStyles();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await getEntries(username);
      return setLoading(false);
    };
    fetch();
  }, [getEntries, username]);

  let recentEntries =
    entries.length > 0
      ? entries.map((entry) => (
          <Card
            key={entry.id}
            id={entry.id}
            username={entry.username}
            userAvatar={entry.userAvatar}
            body={entry.body}
            commentsCount={entry.commentsCount}
            likesCount={entry.likesCount}
            media={entry.media}
            createdAt={entry.createdAt}
          />
        ))
      : "";

  return loading ? (
    <CircularProgress className={classes.loading} color="primary" />
  ) : (
    <Fade in={!loading} timeout={400}>
      <div className={classes.entries}>{recentEntries}</div>
    </Fade>
  );
}

const mapStateToProps = (state) => ({
  entries: state.entries.entries,
});

const mapActionsToProps = {
  getEntries,
};

Card.propTypes = {
  entries: PropTypes.array,
  getEntries: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(Cards);
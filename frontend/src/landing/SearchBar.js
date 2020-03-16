import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    width: "60%",
    borderRadius: "50px",
    backgroundColor: "white",
    borderBottom: "0px",
    border: 0,
  },
  input: {
    height: "45px",
    borderRadius: "50px",
    border: 0,
  },
};

const SearchBar = (props) => {
  const { classes } = props;

  return (
    <TextField
      id="standard-search"
      variant="outlined"
      className={classes.root}
      InputProps={{
        className: classes.input,
      }}
      type="search"
    />
  );
};


export default withStyles(styles)(SearchBar);

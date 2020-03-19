import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

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
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        className: classes.input,
      }}
      type="search"
    />
  );
};


export default withStyles(styles)(SearchBar);

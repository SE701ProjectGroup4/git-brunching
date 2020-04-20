import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRestaurants, getSearchRestaurants } from "../store/restaurant/restaurantAction";

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
    padding: 0,
    paddingLeft: 5,
  },
};

const SearchBar = (props) => {
  const {
    getAll, getSearched, classes,
  } = props;
  const [searchText, searchChange] = React.useState("");
  const [clear, changeClear] = React.useState(false);

  const onTextChange = (e) => {
    if (e.target.value === "" && e.nativeEvent.inputType !== "deleteContentBackward") {
      changeClear(true);
    } else {
      changeClear(false);
    }
    searchChange(e.target.value);
  };

  const onSearchClicked = () => {
    if (searchText === "") {
      getAll();
    } else {
      getSearched(searchText);
    }
  };

  useEffect(() => {
    if (clear === true && searchText === "") {
      getAll();
    }
  }, [searchText, clear, getAll]);

  return (
    <TextField
      id="standard-search"
      variant="outlined"
      className={classes.root}
      placeholder="Search"
      value={searchText}
      onChange={onTextChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" onClick={onSearchClicked}>
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


const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAll: getRestaurants,
  getSearched: getSearchRestaurants,
}, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(SearchBar));

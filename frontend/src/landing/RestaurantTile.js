import React, { useEffect } from "react";
import { useHistory } from "react-router";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";
import { getRestaurants, selectRestaurant, setMode } from "../store/restaurant/restaurantAction";
import MenuPopupButton from "./menu/MenuPopupButton";

import NoRestaurants from "./NoRestaurants";
import { resetBooking } from "../store/booking/bookingActions";


/**
 * After the API has been loaded, we check if we have received any data.
 * @param restaurants
 * @param toBooking
 * @returns {*}
 */
const processEmpty = (restaurants, toBooking) => ((restaurants.length === 0)
  ? <NoRestaurants />
  : <Tiles restaurants={restaurants} toBooking={toBooking} />);

const RestaurantTile = (props) => {
  const {
    getAll, loading, restaurants, select, changeMode, reset,
  } = props;
  const history = useHistory();
  const toBooking = (restaurant) => {
    changePath("/booking", history);
    reset();
    select(restaurant);
    changeMode("CREATE");
  };

  useEffect(getAll, []);
  return (
    <div className={style.gridRoot}>
      {loading ? <CircularProgress />
        : processEmpty(restaurants, toBooking)}
    </div>
  );
};

const Tiles = ({ restaurants, toBooking }) => {
  const cellHeight = 250;
  const columns = 3;

  return (
    <GridList
      cellHeight={cellHeight}
      spacing={40}
      className={style.gridList}
      cols={columns}
    >
      {restaurants.map((data, index) => (
        <GridListTile key={data.Name} className={style.gridTile}>
          <Card onClick={() => toBooking(data)} className={style.card}>
            <CardActionArea>
              <CardMedia
                style={{ height: cellHeight }}
                image={data.Image ? data.Image : "./images/defaultRestaurantImage.jpg"}
                title={data.Name}
              />
            </CardActionArea>
            <GridListTileBar
                title={data.Name}
                actionIcon={<MenuPopupButton restaurantName={data.Name}/>}
            />
          </Card>
        </GridListTile>
      ))}
    </GridList>
  );
};

// Keep for testing purposes when you can't connect to API
// const fakeData = [
//   {
//     Id: 0,
//     Name: "KCF",
//   },
//   {
//     Id: 1,
//     Name: "NANDOZ",
//   },
// ];


const mapStateToProps = (state) => ({
  loading: state.restaurantReducer.isLoading,
  // Used for API calling
  restaurants: state.restaurantReducer.restaurants,
  // restaurants: fakeData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAll: getRestaurants,
  select: selectRestaurant,
  changeMode: setMode,
  reset: resetBooking,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTile);

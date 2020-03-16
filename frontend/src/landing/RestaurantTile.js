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
import { getRestaurants } from "../store/restaurant/restaurantAction";
import NoRestaurants from "./NoRestaurants";

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
    setRestaurant, getAll, loading, restaurants,
  } = props;
  const history = useHistory();
  const toBooking = (restaurant) => {
    changePath("/booking", history);
    setRestaurant(restaurant);
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
          <Card onClick={() => toBooking(data.Name)} className={style.card}>
            <CardActionArea>
              <CardMedia
                style={{ height: cellHeight }}
                // TODO: Swap this out with images from API
                image={index % 2 === 0 ? "./images/nandoz.png" : "./images/kcf.png"}
                title={data.Name}
              />
              <GridListTileBar title={data.Name} />
            </CardActionArea>
          </Card>
        </GridListTile>
      ))}
    </GridList>
  );
};


const mapStateToProps = (state) => ({
  loading: state.restaurantReducer.isLoading,
  restaurants: state.restaurantReducer.restaurants,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAll: getRestaurants,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTile);

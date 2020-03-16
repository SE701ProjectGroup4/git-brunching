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
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";
import { getRestaurants } from "../store/restaurant/restaurantAction";

const RestaurantTile = (props) => {
  const { setRestaurant } = props;
  const history = useHistory();
  const toBooking = (restaurant) => {
    changePath("/booking", history);
    setRestaurant(restaurant);
  };

  useEffect(props.getRestaurants, []);
  const fakeData = [
    {
      name: "NANDOZ",
      img: "./images/nandoz.png",
    },
    {
      name: "KCF",
      img: "./images/kcf.png",
    },
    {
      name: "MACDEEZ",
      img: "./images/kcf.png",
    },
    {
      name: "WENDEEZ",
      img: "./images/nandoz.png",
    },
  ];

  const columns = 3;
  const cellHeight = 250;
  // root height adjustment based on number of restaurants
  const rootHeight = {
    height: Math.ceil(fakeData.length / columns) * (cellHeight + 50),
  };

  return (
    <div className={style.gridRoot} style={rootHeight}>
      <GridList
        cellHeight={cellHeight}
        spacing={40}
        className={style.gridList}
        cols={columns}
      >
        {fakeData.map((data) => (
          <GridListTile key={data.name} className={style.gridTile}>
            <Card onClick={() => toBooking(data.name)} className={style.card}>
              <CardActionArea>
                <CardMedia
                  style={{ height: cellHeight }}
                  image={data.img}
                  title={data.name}
                />
                <GridListTileBar title={data.name} />
              </CardActionArea>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return ({
    ...state,
  });
};

const mapDispatchToProps = (dispatch) => {
  console.log("goes hereeee");
  return bindActionCreators({
    getRestaurants,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTile);

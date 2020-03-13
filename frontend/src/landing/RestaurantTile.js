 import React from "react";
 import GridList from "@material-ui/core/GridList"
 import style from "./LandingPage.module.css";
 import changePath from "../general/helperFunctions";
 import { useHistory } from "react-router";
 
 const RestaurantTile = (props) => {

    const { setRestaurant } = props;
    const history = useHistory();
    const toBooking = (restaurant) => {
        changePath("/booking", history);
        setRestaurant(restaurant);
      };
    const fakeData = [
        {
          name: "NANDOZ",
          times: [],
        },
        {
          name: "KCF",
          times: [],
        },
    ];

    return (
        <div className={style.tileContainer}>
            { fakeData.map((data) => (
            <div
                className={style.tile}
                key={`fake_data_${data.name}`}
                role="button"
                tabIndex={0}
                onClick={() => toBooking(data.name)}
            >
                {data.name}
            </div>
            ))}
        </div>
    );
 }

 export default RestaurantTile;
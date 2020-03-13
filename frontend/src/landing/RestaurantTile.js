 import React from "react";
 import GridList from "@material-ui/core/GridList"
 import GridListTile from "@material-ui/core/GridListTile";
 import Card from "@material-ui/core/Card";
 import CardActionArea from "@material-ui/core/CardActionArea";
 import CardContent from "@material-ui/core/CardContent";
 import CardMedia from "@material-ui/core/CardMedia";
 import Typography from "@material-ui/core/Typography";
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
          img: "",
        },
        {
          name: "KCF",
          times: [],
          img: "",
        },
    ];

    return (
        // <div className={style.tileContainer}>
        //     { fakeData.map((data) => (
        //     <div
        //         className={style.tile}
        //         key={`fake_data_${data.name}`}
        //         role="button"
        //         tabIndex={0}
        //         onClick={() => toBooking(data.name)}
        //     >
        //         {data.name}
        //     </div>
        //     ))}
        // </div>
        <GridList cellHeight={250} spacing={20} className={style.gridList}>
            {fakeData.map(data => (
            <GridListTile key={data.title}>
                <Card onClick={() => toBooking(data.name)}>
                <CardActionArea>
                    <CardMedia
                    style={{ height: 200 }}
                    image={data.img}
                    title={data.name}
                    />
                    <CardContent>
                    <Typography
                        variant="body2"
                        color="black"
                        component="p"
                    >
                        {data.name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </GridListTile>
            ))}
        </GridList>
    );
 }

 export default RestaurantTile;
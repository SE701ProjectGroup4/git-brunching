import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import messages from "./textHolder";
import style from "./NotFound.module.css";
import changePath from "./helperFunctions";
import { ReactComponent as Logo2 } from "./Logo2.svg";
import { ReactComponent as NotFound2 } from "./NotFoundImage.svg";

const notFoundMessage = messages.notFound;

const NotFound = () => {
  const history = useHistory();
  return (
    <div className={style.notFoundPageContainer}>
      <div className={style.header}>
        <div className={style.titleContainer}>
          <div className={style.logo}>
            <Logo2 />
          </div>
        </div>
      </div>
      <div className={style.content}>
        <NotFound2 />
        <h1>{notFoundMessage.message}</h1>
        <Button
          variant="outlined"
          className={style.restaurantButton}
          onClick={() => changePath("/", history)}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

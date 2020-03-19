import React from "react";
import classNames from "classnames";
import TimeContainer from "./TimeContainer";
import DetailsContainer from "./DetailsContainer";
import style from "./ContentContainer.module.css";
import ConfirmationContainer from "./ConfirmationContainer";


const renderContainer = (type, history) => {
  switch (type) {
    case "time":
      return <TimeContainer />;
    case "detail":
      return <DetailsContainer />;
    case "confirmation":
      return <ConfirmationContainer browserHistory={history} />;
    default:
      return null;
  }
};

const renderProgress = (type) => (
  <div className={style.progress}>
    <div className={classNames(style.nameContainer, type === "time" ? style.current : style.disabled)}>
      <p>Times</p>
    </div>
    <div className={classNames(style.nameContainer, type === "detail" ? style.current : style.disabled)}>
      <p>Details</p>
    </div>
    <div className={classNames(style.nameContainer, type === "confirmation" ? style.current : style.disabled)}>
      <p>Confirmation</p>
    </div>
  </div>
);

const ContentContainer = (props) => {
  const { type, history } = props;


  return (
    <div>
      {renderProgress(type)}
      {renderContainer(type, history)}
    </div>
  );
};

export default ContentContainer;

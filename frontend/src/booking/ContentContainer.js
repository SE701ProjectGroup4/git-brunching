import React from "react";
import classNames from "classnames";
import TimeContainer from "./TimeContainer";
import DetailsContainer from "./DetailsContainer";
import style from "./ContentContainer.module.css";
import ConfirmationContainer from "./ConfirmationContainer";


/**
 * Create a component depending on the type
 * This is done due to the memory history not storing a path
 * @param type
 * @param history
 * @returns {null|*}
 */
const renderContainer = (type, history, mainHistory) => {
  switch (type) {
    case "time":
      return <TimeContainer mainHistory={mainHistory} />;
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
  const { type, history, mainHistory } = props;


  return (
    <div>
      {renderProgress(type)}
      {renderContainer(type, history, mainHistory)}
    </div>
  );
};

export default ContentContainer;

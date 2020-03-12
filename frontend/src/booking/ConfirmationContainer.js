import React from "react";
import { useHistory } from "react-router";
import changePath from "../general/helperFunctions";

const ConfirmationContainer = ({ browserHistory }) => {
  const history = useHistory();
  return (
    <div>
      CONFIRM
      <button onClick={() => changePath("/details", history)}>Go back</button>
      <button onClick={() => changePath("/", browserHistory)}>Finish</button>
    </div>
  );
};

export default ConfirmationContainer;

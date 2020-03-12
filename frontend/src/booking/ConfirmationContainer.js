import React from "react";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const confirmationMessages = messages.confirmation;

const ConfirmationContainer = ({ browserHistory }) => (
  <div>
    {confirmationMessages.confirmText}
    <button onClick={() => changePath("/", browserHistory)}>{confirmationMessages.buttonNextText}</button>
  </div>
);

export default ConfirmationContainer;

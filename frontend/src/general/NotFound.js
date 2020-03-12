import React from "react";
import messages from "./textHolder";

const notFoundMessage = messages.notFound;

const NotFound = () => (
  <div>
    {notFoundMessage.message}
  </div>
);

export default NotFound;

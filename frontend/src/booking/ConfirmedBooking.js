import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import changePath from "../general/helperFunctions";

// TODO: persist the booking and open a modal giving the user the bookingID
// This confirms or rejects the booking (if another booking was made
// with same time very recently)
const ConfirmedBooking = (props) => {
  const { history } = props;
  const isLoading = false;
  const toLoad = isLoading ? <CircularProgress />
    : (
      <div>
        <p>YOUR CODE IS: 1111</p>
        <Button onClick={() => changePath("/", history)}>
          Completed
        </Button>
      </div>
    );
  return toLoad;
};

export default ConfirmedBooking;

import React from "react";
import { useHistory } from "react-router";
import style from "./BookingPage.module.css";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import changePath from "../general/helperFunctions";
import TimeContainer from "./TimeContainer";
import messages from "../general/textHolder";

const detailMessages = messages.details;
const DetailsContainer = () => {
  const history = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={style.contentContainer}>
      <div>{detailMessages.placeholder}</div>
      <div className={style.inputContainer}>
        <div>
          <TextField
            label="Number of Guests"
            variant="outlined"
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              label="Select a Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <TimeContainer />
      <div className={style.buttonContainer}>
        <button onClick={() => changePath("/", history)}>{detailMessages.buttonBackText}</button>
        <button onClick={() => changePath("/confirmation", history)}>{detailMessages.buttonNextText}</button>
      </div>
    </div>
  );
};

export default DetailsContainer;

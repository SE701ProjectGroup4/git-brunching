/**
 * A place to hold the hard coded strings
 * This is done so that if text needs to be changed, it'll be done in one spot
 * @type {{}}
 */
const messages = {
  landingPage: {
    header: "This is a header",
    search: "Search",
    footer: "Footer",
  },
  details: {
    buttonNextText: "Done",
    buttonBackText: "Back",
    infoMessage: "Tell me about about yourself :P",
    footerText: "* Required",
  },
  time: {
    buttonNextText: "Next",
    buttonReturnText: "Return",
    placeholder: "AT TIME",
    maxGuestMsg: "* Maximum guest number is ",
    minGuestMsg: "* Minimum guest number is ",
  },
  confirmation: {
    buttonBackText: "Back",
    buttonNextText: "Confirm",
    name: "Name",
    email: "Email",
    phone: "Phone",
    seats: "Seats",
    date: "Date",
    time: "Time",
    notes: "Notes",
  },
  bookingsPopup: {
    buttonText: "Edit Booking",
    popupCancel: "Cancel",
    popupConfirm: "Confirm",
    popupEdit: "Edit",
    popupOK: "OK",
    popupDelete: "Delete",
  },
  confirmed: {
    title: "Booking Complete!!!",
    buttonText: "Finish",
  },
  notFound: {
    message: "Oops! We can't seem to find the page you're looking for.",
  },

};

export default messages;

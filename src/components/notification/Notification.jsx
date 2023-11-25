import React from "react";
import { Snackbar } from "@mui/material";
// import { Alert } from "@mui/material/lab";
import Alert from "@mui/material/Alert";

function Notification(props) {
  const { notify } = props;

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
}

export default Notification;

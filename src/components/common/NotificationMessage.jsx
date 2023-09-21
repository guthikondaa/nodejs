import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { message } from "../../state/actions/notificationActions";
import MuiAlert from "@material-ui/lab/Alert";
import { MESSAGE } from "../../state/actions/types";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const messageInfo = useSelector((state) => state.notifications.notification);
  useEffect(() => {
    if (messageInfo.message) {
      setOpen(true);
    }
  }, [messageInfo]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(message(MESSAGE.CLEAN_ERROR, null));
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {messageInfo.message ? (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert onClose={handleClose} severity={messageInfo.severity}>
            {messageInfo.message}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
}

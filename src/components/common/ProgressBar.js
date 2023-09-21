import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Dialog as MuiDialog,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
export default function ProgressBar(props) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <MuiDialog
            open={props.open}
            maxWidth="xs"
            fullWidth
            classes={{
                paper: classes.dialogPaper
            }}
        >
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={2} ml={2} mt={2} mb={2}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35} mr={2}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
          )}%`}</Typography>
      </Box>
    </Box>
    </MuiDialog>
  );
}
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
      textAlign: "center",
      transition: ["transform"],
      transitionDuration: 100,
      width: 1000,
  }
}));
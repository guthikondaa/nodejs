import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  textTitle: {
    color: theme.palette.primary,
    
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    maxHeight: 220,
    overflowY: "overlay",
    overflowX: "hidden",
    margin: 0,
    padding: 0,
  },
}))(Tooltip);

const CustomTooltip = ({ data, children }) => {
  const classes = useStyles();
  const { title, description } = data;
  if (typeof description === "object") {
    return (
      <LightTooltip
        interactive
        placement="bottom-start"
        title={
          <Box
            p={2}
            bgcolor="background.paper"
            display="flex"
            alignItems="center"
            minHeight="100px"
            flexDirection="column"
            maxHeight="400px"
           
          >
            <Typography paragraph variant="body1"  className={classes.textTitle}>
              {title}
            </Typography>

            {Object.keys(description).map((key, i) => (
              <Box display="flex" >
                <Box>
                  <Typography
                    variant="caption"
                    color="primary"
                    
                     className={classes.textTitle}
                  >
                    <b>{`${key}: `}</b>
                  </Typography>
                </Box>
                <Box ml={2} >
                  <Typography  variant="caption" component="span">
                    {description[key]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        }
      >
        <div>{children}</div>
      </LightTooltip>
    );
  } else if(typeof description === "string") {
    return (
      <LightTooltip
        interactive
        placement="bottom-start"
        title={
          <Box
            p={2}
            bgcolor="background.paper"
            display="flex"
            alignItems="center"
            minHeight="100px"
            flexDirection="column"
            maxHeight="400px"
          >
            <Typography
              paragraph
              variant="body1"
              className={classes.textTitle}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="caption" component="span">
              {description}
            </Typography>
          </Box>
        }
      >
        <div>{children}</div>
      </LightTooltip>
    );
  }else {
    return (
        <div>{children}</div>
      );
  }
   
   
  
};

export default CustomTooltip;

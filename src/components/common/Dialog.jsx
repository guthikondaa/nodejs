import React from "react";
import PropTypes from "prop-types";

import { IoWarningOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

import { AiOutlineInfoCircle } from "react-icons/ai";

import {
    Dialog as MuiDialog,
    useTheme,
    Button,
    Box,
    makeStyles,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const Dialog = ({
    variant,
    title,
    description,
    exclamation,
    image,
    isOpen,
    width,
    primaryAction,
    severity,
    secondaryAction,
    backdropClick
}) => {
    const theme = useTheme();
    const classes = useStyles();

    const renderSeverityIcon = () => {
        switch (severity) {
            case "default":
            case "info":
                return <AiOutlineInfoCircle color="#fff" size={60} />;
            case "success":
                return <IoCheckmarkCircleOutline color="#fff" size={60} />;
            case "error":
                return "";
            case "warning":
                return <IoWarningOutline color="#fff" size={60} />;
        }
    };

    const getColorFromSeverity = (severity) => {
        let color = theme.palette.primary.default;
        switch (severity) {
            case "info":
                color = theme.palette.info.main;
                break;
            case "success":
                color = theme.palette.success.dark;
                break;
            case "error":
                color = theme?.palette.error.main;
                break;
            case "warning":
                color = theme.palette.error.dark;
        }
        return color;
    };

    return (
        <MuiDialog
            open={isOpen}
            onClose={secondaryAction.onClick}
            style={{ padding: theme.spacing(2) }}
            maxWidth="xs"
            fullWidth
            classes={{
                paper: classes.dialogPaper
            }}
            disableBackdropClick={backdropClick}
        >
            {variant !== "basic" && (
                <>
                    <Box
                        height="100px"
                        bgcolor={getColorFromSeverity(severity)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {renderSeverityIcon()}
                    </Box>
                    <Box
                        px={2}
                        mt={4}
                        mb={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {typeof exclamation === "string" && (
                            <Typography variant="h5">{exclamation}</Typography>
                        )}
                        {typeof exclamation === "object" && title}
                    </Box>
                </>
            )}
            {variant === "basic" && <Box height={30} />}
            <Box px={4} pb={0}>
                {typeof title === "string" && (
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        {title}
                    </Typography>
                )}
                {typeof title === "object" && title}
            </Box>
            <Box px={4} pb={0} display="flex" justifyContent="center" alignItems="center">
                {typeof description === "string" && (
                    <Typography variant="body1" color="textSecondary" align="center">
                        {description}
                    </Typography>
                )}
                {typeof description === "object" && { description }}
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={5}
                mb={4}
            >
                <Button
                    onClick={secondaryAction.onClick}
                    variant="outlined"
                    className={classes.buttons}
                >
                    {secondaryAction.actionName}
                </Button>
                <StyledButton
                    onClick={primaryAction.onClick}
                    variant="contained"
                    className={classes.buttons}
                    severity={getColorFromSeverity(severity)}
                >
                    {primaryAction.actionName}
                </StyledButton>
            </Box>
        </MuiDialog>
    );
};

const StyledButton = withStyles((theme) => {
    return {
        root: {
            backgroundColor: (props) => props.severity,
            color: "#ffffff",
            "&:hover": {
                backgroundColor: (props) => props.severity,
                color: "#ffffff"
            }
        }
    };
})(Button);

Dialog.propTypes = {
    variant: PropTypes.oneOf(["default", "basic"]),
    isOpen: PropTypes.bool.isRequired,
    exclamation: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.element,
    onClose: PropTypes.func,
    width: PropTypes.number,
    severity: PropTypes.string,
    primaryAction: PropTypes.shape({
        actionName: PropTypes.string,
        onClick: PropTypes.func
    }),
    secondaryAction: PropTypes.shape({
        actionName: PropTypes.string,
        onClick: PropTypes.func
    }),
    backdropClick: PropTypes.bool
};

Dialog.defaultProps = {
    isOpen: false,
    description: "",
    severity: "default",
    exclamation: "",
    onOpen: () => { },
    onClose: () => { },
    primaryAction: {
        actionName: "Ok",
        onClick: () => { }
    },
    secondaryAction: {
        actionName: "Cancel",
        onClick: () => { }
    },
    backdropClick: true
};

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        textAlign: "center",
        transition: ["transform"],
        transitionDuration: 100,
        width: 350
    },
    buttons: {
        minWidth: 120,
        height: 40,
        margin: 6,
        padding: "auto",
        textTransform: "none"
    }
}));

export default Dialog;
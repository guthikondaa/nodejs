import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Grid } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import LockIcon from "@material-ui/icons/Lock";
import Definition from "./steps/Definition";
import Table from "../../containers/Stepper/pages/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAsDraft,
  editAsDraft,
  resetAsDraft,
  provision,
} from "../../state/actions/projectOnboardingActions";
import { useLocation, useHistory } from "react-router";
import { projectData } from "../../state/actions/projectDataActions";
import { PROJECT_ONBOARD } from "../../state/actions/types";
import Review from "../Stepper/steps/Review";
import { getProjectDataByName } from "../../api/project_data";
import toast from "../../components/common/Toast";
import Chatbot from "../chatbot";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}
QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    marginTop: -6,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 35,
    height: 35,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <InfoIcon />,
    2: <LockIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperStyle: {
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 2,
    paddingBottom: 2,
    margin: 0,
  },
  title1: {
    color: "#595959",
  },
  body1: {
    color: "#434343",
    fontWeight: "bold",
  },
  button1: {
    backgroundColor: "#D4E3EC",
  },
  buttonProvision: {
    backgroundColor: "#C8C6C6",
    marginLeft: 10,
  },
}));

function getSteps() {
  return [
    {
      label: "Definition",
    },
    {
      label: "Access",
    },
    {
      label: "Review",
    },
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Definition />;
    case 1:
      return <Table />;
    case 2:
      return <Review />;
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();
  const { definition, projectsUnderProvision, provisionSuccessful } =
    useSelector((state) => state.projectOnboarding);
  const [progress, setProgress] = useState(0);
  const [toolList, setToolList] = useState([]);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.state.buttonText === "save as draft") {
      dispatch(resetAsDraft());
    }
  }, [location?.state?.buttonText]);

  const handleNext = (e) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (
      location?.state?.buttonText === "save as draft" &&
      e?.target?.innerText === "SAVE AS DRAFT"
    ) {
      const owner = [];
      definition["owner"]?.map((item) => {
        owner.push(item.name);
      });
      definition["owner"] = owner;

      const toolsData = {};
      if (definition.tools.jira === true) {
        toolsData["jira"] = definition["jira"];
      }
      if (definition.tools.bitbucket === true) {
        toolsData["bitbucket"] = definition["bitbucket"];
      }
      if (definition.tools.teams === true) {
        toolsData["teams"] = definition["teams"];
      }
      if (definition.tools.jenkins === true) {
        toolsData["jenkins"] = definition["jenkins"];
      }

      const payload = {
        projectName: definition["projectName"],
        owner: definition["owner"],
        startDate: definition["startDate"],
        endDate: definition["endDate"],
        tools: toolsData,
        members: definition["members"],
        status: definition["status"],
        softDeleteflag: definition["softDeleteflag"],
      };

      dispatch(saveAsDraft(payload));
      dispatch({
        type: PROJECT_ONBOARD.BASIC_DETAILS.RESET_STEPPER,
      });
      dispatch(projectData());
      // history.push("/projects");
    }

    if (
      location?.state?.buttonText === "edit as draft" &&
      e.target.innerText === "SAVE AS DRAFT"
    ) {
      const owner = [];
      definition["owner"]?.map((item) => {
        owner.push(item.name);
      });

      definition["owner"] = owner;

      const toolsData = {};

      if (definition.tools.jira === true) {
        toolsData["jira"] = definition["jira"];
      }
      if (definition.tools.bitbucket === true) {
        toolsData["bitbucket"] = definition["bitbucket"];
      }
      if (definition.tools.teams === true) {
        toolsData["teams"] = definition["teams"];
      }
      if (definition.tools.jenkins === true) {
        toolsData["jenkins"] = definition["jenkins"];
      }
      const payload = {
        projectName: definition["projectName"],
        owner: definition["owner"],
        startDate: definition["startDate"],
        endDate: definition["endDate"],
        tools: toolsData,
        members: definition["members"],
        status: definition["status"],
        projectKey: definition["projectKey"],
        softDeleteflag: definition["softDeleteflag"],
      };

      dispatch(editAsDraft(payload, definition["projectName"]));
      dispatch(projectData());
      dispatch(resetAsDraft());
      //history.push("/projects")
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleProvision = () => {
    const owner = [];
    definition["owner"]?.map((item) => {
      owner.push(item.name);
    });

    definition["owner"] = owner;

    const toolsData = {};

    if (definition.tools.jira === true) {
      toolsData["jira"] = definition["jira"];
    }
    if (definition.tools.bitbucket === true) {
      toolsData["bitbucket"] = definition["bitbucket"];
    }
    if (definition.tools.teams === true) {
      toolsData["teams"] = definition["teams"];
    }
    if (definition.tools.jenkins === true) {
      toolsData["jenkins"] = definition["jenkins"];
    }

    const payload = {
      projectName: definition["projectName"],
      owner: definition["owner"],
      startDate: definition["startDate"],
      endDate: definition["endDate"],
      tools: toolsData,
      members: definition["members"],
      status: "completed",
      projectKey: definition["projectKey"],
    };
    dispatch({
      type: PROJECT_ONBOARD.EVENTS.PROVISION,
      payload: payload["projectName"],
    });
    dispatch(editAsDraft(payload, definition["projectName"]));
    dispatch(provision(definition["projectName"]));
    //history.push("/projects");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container lg={12}>
        <Grid item lg={12} sm={12} xs={12} md={12} spacing={1}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            className={classes.stepperStyle}
          >
            {steps.map((item) => (
              <Step key={item.step}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography variant="body2" className={classes.body1}>
                    {item.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item lg={12} xs={12}>
          <div style={{ marginLeft: 10 }}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  {/* All steps completed - you&apos;re finished */}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => handleNext(e)}
                    className={classes.button1}
                  >
                    {activeStep === steps.length - 1 ? "Save as draft" : "Next"}
                  </Button>
                  {activeStep === steps.length - 1 && (
                    <Button
                      disabled={false}
                      variant="contained"
                      className={classes.buttonProvision}
                      onClick={(e) => handleProvision(e)}
                    >
                      {projectsUnderProvision[definition.projectName] ? (
                        <CircularProgress />
                      ) : (
                        "Provision"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      {toolList.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}

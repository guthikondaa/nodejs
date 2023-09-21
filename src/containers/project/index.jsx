import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import {
  Grid,
  Divider,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { BiPencil } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useDispatch, useSelector } from "react-redux";
import {
  projectData,
  deleteProject,
} from "../../state/actions/projectDataActions";
import { useHistory } from "react-router-dom";
import { PROJECT_ONBOARD } from "../../state/actions/types";
import store from "../../state/store";
import { getUsers } from "../../state/actions/userAction";
import { dateformatMMDDYYYY } from "../../utils/functions";
import Dialog from "../../components/common/Dialog";
import Chatbot from "../chatbot";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 6,
  },
});

const BlackTextTypography = withStyles({
  root: {
    color: "#434343",
    variant: "subtitle1",
  },
})(Typography);

export default function Project() {
  const classes = useStyles();
  const history = useHistory();
  const projectOnboarding = useSelector((state) => state.projectDataReducer);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUserReducer);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applicationName, setApplication] = useState("");
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    dispatch(projectData());
  }, []);

  console.log("ProOnbo: ",projectOnboarding);
  // const filteredProjects = projectOnboarding.filter(
  //   (project) => project.softDeleteflag !== true
  // );
  // console.log(filteredProjects);
  // setProjectList(filteredProjects);
  // console.log("res ",projectList.length);

  useEffect(() => {
    console.log("res");
    const filteredProjects = projectOnboarding.filter(
      (project) => project.softDeleteflag !== true
    );
    setProjectList(filteredProjects);
  }, [projectOnboarding]);

  console.log("PO: ",projectOnboarding);
  // setProjectList(projectOnboarding);

  const handleEdit = (project_details) => {
    // Owner email -> object
    const owner = [];
    project_details["owner"].map((item) => {
      const userData = store.getState().usersData;
      const user = userData.filter((user) => user?.name === item)[0];
      owner.push(user);
    });
    project_details["owner"] = owner;

    const payload = {
      definition: {
        projectName: project_details["projectName"],
        owner: project_details["owner"],
        startDate: project_details["startDate"],
        endDate: project_details["endDate"],
        teams: {
          teamsName:
            project_details["tools"]["teams"] !== undefined
              ? project_details["tools"]["teams"]["teamsName"]
              : "",
          channelName:
            project_details["tools"]["teams"] !== undefined
              ? project_details["tools"]["teams"]["channelName"]
              : "",
        },
        jira: {
          jiraboard:
            project_details["tools"]["jira"] !== undefined
              ? project_details["tools"]["jira"]["jiraboard"]
              : "",
        },
        bitbucket: {
          bitbucketName:
            project_details["tools"]["bitbucket"] !== undefined
              ? project_details["tools"]["bitbucket"]["bitbucketName"]
              : "",
          repoName:
            project_details["tools"]["bitbucket"] !== undefined
              ? project_details["tools"]["bitbucket"]["repoName"]
              : "",
        },
        jenkins: {},
        members: project_details["members"],
        status: project_details["status"],
        tools: {
          jira: project_details["tools"]["jira"] !== undefined ? true : false,
          bitbucket:
            project_details["tools"]["bitbucket"] !== undefined ? true : false,
          teams: project_details["tools"]["teams"] !== undefined ? true : false,
          jenkins:
            project_details["tools"]["jenkins"] !== undefined ? true : false,
        },
        projectKey: project_details["projectKey"],
      },
    };

    dispatch({
      type: PROJECT_ONBOARD.BASIC_DETAILS.ADD_DETAILS,
      data: payload,
    });

    history.push("/projects/edit", { buttonText: "edit as draft" });
  };

  const handleDelete = (projectName) => {
    // eslint-disable-next-line no-restricted-globals
    setDialogOpen(true);
    setApplication(projectName);
  };

  const deleteApplication = () => {
    dispatch(deleteProject(applicationName));

    setTimeout(() => {
      setDialogOpen(false);
      dispatch(projectData());
    }, 1000);
  };

  let [showChat, setShowChat] = useState(false);

  const startChat = () => {
    setShowChat(true);
  };
  const hideChat = () => {
    setShowChat(false);
  };

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
    refreshProjectData();
  };

  const theme = createTheme({
    palette: {
      primary: orange,
    },
  });

  const refreshProjectData = () => {
    dispatch(projectData());
  };
  console.log("PRO: ",projectList);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <h1> Projects </h1>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  // onClick={() => {
                  //   // history.push("/projects/create", {
                  //   //   buttonText: "save as draft",
                  //   // });
                  //   // history.push("/projects/create");
                  // }}
                  onClick={toggleChat}
                >
                  Add Projects
                </Button>
              </Box>
              <Box ml={3} mr={3}>
                <FilterListIcon fontSize="large" />
              </Box>
            </Box>
          </Box>
        </Grid>
        {projectList.length ? (
          projectList.map((item, i) => (
            <>
              <Grid item xs={12} sm={4} md={4} lg={3}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Box width="300px" p={1}>
                      <Box>
                        <Typography
                          className={classes.title}
                          color="textPrimary"
                          gutterBottom
                          noWrap
                        >
                          {item?.projectName}
                        </Typography>
                      </Box>
                      <Box width="300px">
                        <Typography>
                          Start Date:{dateformatMMDDYYYY(item?.startDate)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          End Date: {dateformatMMDDYYYY(item?.endDate)}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip
                          title={item?.owner?.map(
                            (owneritem) => owneritem + ", "
                          )}
                          placement="top"
                        >
                          <Typography>Owners: {item?.owner?.length}</Typography>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip
                          title={
                            item.members &&
                            item?.members?.map(
                              (memberItem) => memberItem?.name + ", "
                            )
                          }
                          placement="top"
                        >
                          <Typography>
                            Members: {item?.members?.length}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <br />
                      <Divider />
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                        mr={1}
                      >
                        <Chip label={item?.status} />
                        <Box>
                          <IconButton
                            size="small"
                            aria-label="Edit Campaign"
                            color="primary"
                            variant="outlined"
                            onClick={() => handleEdit(item)}
                          >
                            <BiPencil />
                          </IconButton>
                          <IconButton
                            size="small"
                            aria-label="Delete Campaign"
                            color="secondary"
                            variant="outlined"
                            onClick={() => handleDelete(item.projectName)}
                          >
                            <VscTrash />
                          </IconButton>{" "}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Dialog
                exclamation="Delete Application ?"
                description="Are you sure, you want to delete the application?"
                isOpen={dialogOpen}
                primaryAction={{
                  actionName: "Yes",
                  onClick: () => deleteApplication(),
                }}
                secondaryAction={{
                  actionName: "No, Discard",
                  onClick: () => setDialogOpen(false),
                }}
                severity="warning"
              />
            </>
          ))
        ) : (
          <Box display="flex" justifyContent="center" width="100%">
            {" "}
            <Typography> No Projects Created yet!</Typography>
          </Box>
        )}
      </Grid>
      <div style={{ position: "fixed", bottom: "43px", right: "20px" }}>
        <div style={{ display: showChat ? "" : "none" }}>
          <Chatbot toggleChat={toggleChat} />
        </div>
        <div>
          <ThemeProvider theme={theme}>
            {!showChat ? (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={() => startChat()}
              >
                Click To Chat
              </Button>
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ position: "fixed", right: "20px", bottom: "20px" }}
                onClick={() => hideChat()}
              >
                Click To Hide
              </Button>
            )}
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

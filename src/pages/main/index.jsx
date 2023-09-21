import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch,Redirect } from "react-router-dom";
import Appbar from "../../containers/navbar/Appbar";
import Navbar from "../../containers/navbar/index";
import { makeStyles } from "@material-ui/core/styles";
import Project from "../../containers/project";
import Tool from "../../containers/tools/Tool";
import Table from "../../containers/Stepper/pages/Table";
import AddMembersToOrg from "../../containers/project/AddMembersToOrg"
import Stepper from '../../containers/Stepper/Stepper';
import RoleMaster from "../../containers/roleMaster/index";
import Login from "../auth/Login";
import PrivateRoute from "../../components/routes/PrivateRoute";
import Chatbot from "../../containers/chatbot";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    width: "100%",
    marginLeft: "0px",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    maxWidth: "1470px", //or 1180
    minWidth: " 200px",
    margin: theme.spacing(1),
  },
}));

export default function MainComponent() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state)=> state.authentication.isAuthenticated);
  return (
    <div style={{ display: "flex" }}>
      
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      
      
      
      
      
      
      
      <Route path="/" component={Navbar} />
      <Route path="/" component={Appbar} />

      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
         
          <Switch>
            <Route exact path="/select-tools" component={Tool}></Route>
            <Route exact path="/projects" component={Project}></Route>
            <Route exact path="/add-members" component={Table}></Route>
            <Route exact path="/users" component={AddMembersToOrg}></Route>
            <Route exact path="/projects/create" component={Chatbot}></Route>
            <Route exact path="/projects/edit" component={Stepper}></Route>
            <Route exact path="/tools-roles-permission-mapper" component={RoleMaster} />
            {/* <Route path="/Login" component={Login}></Route> */}
           
          </Switch>
         
        </main>
      </div>
    </div>
  );
}

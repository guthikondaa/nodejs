import React , {useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUsers } from "../../state/actions/userAction";
import { getTools, bitbucketProject, jiraProject } from "../../state/actions/toolActions";
import { projectData } from "../../state/actions/projectDataActions";
import { getToolRoles } from "../../state/actions/toolRoleActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {isAuthenticated} = useSelector(state => state.authentication);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getTools());
    dispatch(getToolRoles())
    dispatch(projectData());
    dispatch(bitbucketProject())
    dispatch(jiraProject());
  }, [])
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

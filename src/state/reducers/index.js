import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";
import OrgReducer from "./OrgReducer";
import ToolReducer from "./toolsmockReducer";
import onBoardReducer from "./onBoardReducer";
import userReducer from "./userReducer";
import projectDataReducer from "./projectDataReducer";
import singleUserReducer from "./singleUserReducer";
import ToolDetailsReducer from "./toolDetailsReducer";
import toolReducer from "./toolReducer";
import toolRoleReducer from "./toolRoleReducer";
import authReducer from "./authReducer";
import loginReducer from "./loginReducer";

const reducer = combineReducers({
  username: loginReducer,
  notifications: notificationReducer,
  tools: ToolReducer,
  users: OrgReducer,
  projectOnboarding: onBoardReducer,
  usersData: userReducer,
  projectDataReducer: projectDataReducer,
  singleUserReducer: singleUserReducer,
  toolDetailsReducer: ToolDetailsReducer,
  toolReducer: toolReducer,
  toolRoleReducer: toolRoleReducer,
  authentication: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;

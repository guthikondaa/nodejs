import { Service } from "../../api/tool_details";
import { TOOLS} from "../actions/types";


export function addMandaryField(payload) {
  return async function (dispatch) {
    try {

      dispatch({
        type: TOOLS.ADD_MANDATORY,
        payload: payload
      });
    } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  };
}

// API FOR TOOLS DETAILS
export function addToolsDetails(payload) {
  return async function (dispatch) {
    try {
      const resp = Service.addToolsDetails(payload)
      // dispatch({
      //   type: TOOLS.ADD_MANDATORY,
      //   payload: payload
      // });
    } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  };
}




export function addRolesTools(payload){
  return async function (dispatch) {
    try {
      const resp = Service.addRolesTools(payload)
      // dispatch({
      //   type: TOOLS.ADD_MANDATORY,
      //   payload: payload
      // });
    } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  };
}


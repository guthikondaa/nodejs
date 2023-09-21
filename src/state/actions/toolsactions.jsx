import { PROJECT_ONBOARD } from "./types";

export function addTool(payload) {
    return async function (dispatch) {
    try {
        dispatch({ 
            type: PROJECT_ONBOARD.USERS.ADD_MEMBER ,
            payload: JSON.parse(payload)
        });
      } catch (error) {
        console.error("Error");
        return Promise.reject(error);
      }
    }
}

export function editTool(payload) {

    return async function (dispatch) {
    try {
        dispatch({ 
            type: PROJECT_ONBOARD.USERS.EDIT_MEMBER ,
            payload: JSON.parse(payload)
        });
     } catch (error) {
        console.error("Error");
        return Promise.reject(error);
      }
    }
}

export function deleteTool(payload) {

  return async function (dispatch) {
  try {
      dispatch({ 
          type: PROJECT_ONBOARD.USERS.DELETE_MEMBER,
          payload: payload
      });
   } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  }
}

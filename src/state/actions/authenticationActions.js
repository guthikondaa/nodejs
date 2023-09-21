import { LOGOUT, LOGIN_SUCCESS } from "./types";
import { authentication } from "../../api";
import { MESSAGE } from "../actions/types";
import Message from "../../utils/message";

export function logout() {
  return {
    type: LOGOUT
  };
}

export function login(body) {
  return async function (dispatch) {
    try {
      const data = await authentication.getAuthentication(body);

      dispatch({ type: LOGIN_SUCCESS, payload: data.data });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          dispatch({
            type: MESSAGE.SOMETHING_WENT_WRONG,
            payload: Message.en.somethingWentWrong
          });
        } else if (error.response.status === 401) {
          dispatch({
            type: MESSAGE.WRONG_LOGIN_CREDENTIALS,
            payload: Message.en.wrongLoginCredentials
          });
        } else if (error.response.status === 403) {
          dispatch({
            type: MESSAGE.ACCESS_DENIED,
            payload: Message.en.accessDenied
          });
        }
      } else {
        dispatch({
          type: MESSAGE.NETWORK_ERROR,
          payload: Message.en.networkError
        });
      }
    }
  };
}

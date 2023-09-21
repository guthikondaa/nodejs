import { SET_USER_NAME } from "./types";

export const setUserName = (userName) => ({
  type: SET_USER_NAME,
  payload: userName,
});

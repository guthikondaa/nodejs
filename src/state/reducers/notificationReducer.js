import { LOADER, MESSAGE } from "../actions/types";

const initialState = {
  isLoading: true,
  notification: {
    message: "",
    isOpen: false,
    severity: "",
  },
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE.DISPLAY: {
      return {
        ...state,
        notification: {
          ...state.notification,
          isOpen: true,
        },
      };
    }
    case LOADER.SHOW:
      return {
        ...state,
        isLoading: true,
      };
    case LOADER.HIDE:
      return {
        ...state,
        isLoading: false,
      };
    case MESSAGE.WRONG_DATA:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.NETWORK_ERROR:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.ERROR:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.SUCCESS:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "success",
        },
      };
    case MESSAGE.SOMETHING_WENT_WRONG:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.ACCESS_DENIED:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.WRONG_LOGIN_CREDENTIALS:
      return {
        ...state,
        notification: {
          message: action.payload,
          severity: "error",
        },
      };
    case MESSAGE.CLEAN_ERROR:
      return {
        ...state,
        notification: {
          message: "",
          severity: "",
        },
      };

    default:
      return state;
  }
}

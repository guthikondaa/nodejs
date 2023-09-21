import { ACTION_TYPES } from '../actions/types';
import { toolConfiguration } from '../../utils/mock';

const initialState = {
    modalData: {
      categories: "",
      tools: "",
      Host: "",
      Token: "",
      InstanceName: "",
      PropertyName: "",
      PropertyValue: ""
    },
    validationsConfigList: toolConfiguration
};

const ToolDetailsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_FORM_VALUE:
          return {
            ...state,
            modalData: action.modalData,
            validationsConfigList: action.validationsConfigList,
          };
        default:
          return state;
    }
}

export default ToolDetailsReducer;
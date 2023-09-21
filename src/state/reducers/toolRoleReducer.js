import { TOOL_ROLES } from "../actions/types";

const initialState ={
    data: []
}

function ToolRoleReducer(state=initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case TOOL_ROLES.GET_TOOL_ROLES:
            return {
                ...state,
                data: payload
            }


        case TOOL_ROLES.ADD_TOOL_ROLES:
            return {
                ...state,
                data: state.data.concat(payload)
            }

        case TOOL_ROLES.EDIT_TOOL_ROLES:
            return {
                ...state,
                data: state.data.map((item) => item.role_master === payload.role_master ? payload : item)
            }
            
        case TOOL_ROLES.DELETE_TOOL_ROLES:
            return {
                ...state,
                data: state.data.filter((item, index) => index !== payload)
            }

        default:
            return state;
    }
}

export default ToolRoleReducer;
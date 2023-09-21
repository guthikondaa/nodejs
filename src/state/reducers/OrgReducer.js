import { ORG_USERS } from "../actions/types";



const initialState = {
    data:[]
}

function OrgReducer(state=initialState, action) {

    const {type,payload} = action;
    switch (type) {
        case ORG_USERS.ADD:
            return {
                ...state,
                data: state.data.concat(payload)
            }
        
        case ORG_USERS.EDIT:
            return {
                ...state,
                data: state.data.map((item) => item.email === payload.email ? payload : item)
            }

        case ORG_USERS.DELETE:
            return {
                ...state,
                data: state.data.filter((item, index) => index !== payload)
            }

        case ORG_USERS.GET_ORG_USERS:
            return {
                ...state,
                data: payload
            }

        default:
            return state;
    
    }
}

export default OrgReducer;
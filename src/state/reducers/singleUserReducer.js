import { USERS } from "../actions/types";

const initialState = {}

function singleUserReducer(state=initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case USERS.GET_USER_BY_EMAIL:
            return payload
        default:
            return state;
    }
}

export default singleUserReducer;
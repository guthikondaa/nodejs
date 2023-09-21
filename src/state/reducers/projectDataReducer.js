import { PROJECT_DATA } from "../actions/types";

const initialState = []
const projectDataReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case PROJECT_DATA.GET_PROJECT:
            return action.payload
        default:
        return state;
    }
}

export default projectDataReducer;
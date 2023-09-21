import { TOOLS } from "../actions/types";
const initialState ={}

function ToolReducer(state = initialState, action)
{
    const { type, payload } = action;
    switch (type)
    {
        case TOOLS.ADD_TOOLS:
            return JSON.parse(payload);
        
        default:
            return state;
    }
}


export default ToolReducer;
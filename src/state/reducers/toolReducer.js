import { TOOL, BITBUCKET, JIRA } from "../actions/types";

const initialState = {
    data: [],
    existingTools:{}
}

function toolReducer(state = initialState, action)
{

    const { type, payload } = action;
    switch (type)
    {
        case TOOL.ADD:
            return {
                ...state,
                data: payload
            }

        case TOOL.EDIT:
            return {
              ...state,
              data: state.data.map(item =>
                  item.toolCategoryName === payload.toolCategoryName ? payload : item
              )
            };

        case TOOL.DELETE:
            return {
                ...state,
                data: state.data.filter((item, index) => index !== payload)
            }

        case TOOL.GET_TOOL:
            return {
                ...state,
                data: payload
            }
        case BITBUCKET.GET_BITBUCKET_DATA:
            return {
                ...state,
                existingTools:{
                    ...state.existingTools,
                    bitbucket: payload
                }
            }
        case JIRA.GET_JIRA_DATA:
            return {
                ...state,
                existingTools:{
                    ...state.existingTools,
                    jira: payload
                }
            }
        default:
            return state;

    }
}

export default toolReducer;
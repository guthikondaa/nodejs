import { TOOL, BITBUCKET, JIRA } from "./types";
import { ToolService } from '../../api/tool';
import { Service } from '../../api/bitbucket';

export function getTools(payload)
{
    return async function (dispatch)
    {
        try 
        {
          const res = await ToolService.getTools(payload);
          dispatch({
            type: TOOL.GET_TOOL,
            payload: res.data
          });
        } catch (error)
        {
            console.error("Error");
        }
    }
}


export function editTool(id, payload)
{
    return async function (dispatch)
    {
        try
        {
            const res = await ToolService.editTool(id, payload);
            dispatch({
                type: TOOL.EDIT,
                payload: res.data
            })
        } catch (error)
        {
            console.error("Error");
        }
    }
}


export function deleteTool(id)
{
    return async function (dispatch)
    {
        try
        {
            const res = await ToolService.deleteTool(id);
            dispatch({
                type: TOOL.DELETE,
                payload: res.data
            })
        } catch (error)
        {
            console.error("Error");
        }
    }
}

export function addTool(payload)
{
    return async function (dispatch)
    {
        try
        {   
            const { data } = await ToolService.addTool(payload);
            
            dispatch({
                type: TOOL.ADD,
                payload: data
            })
        } catch (error)
        {
            console.error("Error");
        }
    }
}

export function bitbucketProject() {
    return async function(dispatch) {
      try {
          const res = await Service.getBitbucketProjects();
        dispatch({
            type: BITBUCKET.GET_BITBUCKET_DATA,
            payload: res?.data
        });
        return Promise.resolve(res?.data);
      } catch (err) {
        return Promise.reject(err);
      }
    };
}


export function jiraProject() {
    return async function(dispatch) {
      try {
        const res = await Service.getJiraProjects();
          dispatch({
            type: JIRA.GET_JIRA_DATA,
            payload: res?.data
        });
        return Promise.resolve(res?.data);
      } catch (err) {
        return Promise.reject(err);
      }
    };
}


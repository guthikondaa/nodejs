import { serverInstance, jiraInstance } from "../axios/axios.config";

export async function getTools()
{
  try
  {
    return await serverInstance.get("/tools-config/");
  } catch (err)
  {
    console.log(err);
  }
}


export async function editTool(id, payload)
{
  try
  {
    return await serverInstance.put(`/tools-config/${ id }`, payload);
  } catch (err)
  {
    console.log(err);
  }
}

export async function deleteTool(id)
{
  try
  {
    return await serverInstance.delete(`/tools-config/${ id }`);
  } catch (err)
  {
    console.log(err);
  }
}

export async function addTool(payload)
{
  try
  {
    return await serverInstance.post("/tools-config/", payload);
  } catch (err)
  {
    console.log(err);
  }
}


// Jira call
export async function jiraTest(payload)
{
  try
  {
    const resp = await jiraInstance.get(`/jira/serverInfo/${ payload.host }/${ payload.token }`);
    if (resp.status === 200)
    {
      Promise.resolve(resp);
      return true;
    } else
    {
      Promise.reject(resp);
      return false;
    }
  } catch (err){
    console.log(err);
  }
}


export const ToolService = {
    getTools,
    editTool,
    deleteTool,
  addTool,
    jiraTest
} 
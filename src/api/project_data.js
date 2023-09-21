import { serverInstance } from "../axios/axios.config";

export async function getProjectData()
{
    try
    {
        return await serverInstance.get("/projects/project-onboarding/projectsearch");
    } catch (err)
    {
        console.log(err);
    }
}


export async function deleteProjectData(project_name)
{
    try
    {
        const response = await serverInstance.delete(`/projects/project-onboarding/${project_name}`);
        return response;
    } catch (err)
    {
        console.log(err);
    }
}
export async function getProjectDataByName(project_name)
{
    try
    {
        return await serverInstance.get(`/projects/project-onboarding/${project_name}`);
    } catch (err)
    {
        console.log(err);
    }
}

export const ProjectService = {
    getProjectData,
    deleteProjectData,
    getProjectDataByName
}   
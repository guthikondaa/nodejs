import { serverInstance} from "../axios/axios.config";
import toast from "../components/common/Toast";

export async function postSaveAsDraft(requestPayload){
    try{
        console.log("ProOnboarding: ",requestPayload);
        return await serverInstance.post("/projects/project-onboarding", requestPayload);
    }catch(err){
        console.log(err);
    }
}

export async function putEditAsDraft(requestPayload, project_name){
    try{
        const response = await serverInstance.put(`/projects/project-onboarding/${project_name}`, requestPayload);
        return response;
    }catch(err){
        console.log(err);
    }
}

export async function provision(project_name)
{
    try
    {
        const response = await serverInstance.post(`/launch/provision/${project_name}`);
        return response;
    } catch (err)
    {
        console.log(err);
    }
}


export const ProjectService = {
    postSaveAsDraft,
    putEditAsDraft,
    provision
} 
import { bitbucketInstance, jiraInstance} from "../axios/axios.config";

export async function getBitbucketProjects(){
    try{
       return await bitbucketInstance.get('/bitbucket/projects');
    }catch(err){
        console.log("errrrr:   ",err);
    }
}

export async function getJiraProjects(){
    try{
        return await jiraInstance.get('/jira/projects');
    }catch(err){
        console.log(err);
    }
}

export const Service = {   
    getBitbucketProjects,
    getJiraProjects
};
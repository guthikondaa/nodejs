import { serverInstance} from "../axios/axios.config";

export async function addToolsDetails(requestPayload){
    try{
        const response = await serverInstance.post("/tools-config/tool", requestPayload);
        return response;
    }catch(err){
        console.log(err);
    }
}



export async function addRolesTools(requestPayload){
    try{
        const response = await serverInstance.post("/tools/tools-roles", requestPayload);
        return response;
    }catch(err){
        console.log(err);
    }
}

export const Service = {
    addToolsDetails,
    addRolesTools
} 
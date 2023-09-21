import { serverInstance} from "../axios/axios.config";

export async function getToolRoles(){
    try{
        const response = await serverInstance.get("/tools/");
        return response;
    }catch(err){
        console.log(err);
    }
}
export async function addToolRoles(requestPayload){
    try{
        const response = await serverInstance.post("/tools/", requestPayload);
        return response;
    }catch(err){
        console.log(err);
    }
}


export async function editToolRoles(role_master,payload){
    try{
        const response = await serverInstance.put(`/tools/${role_master}`,payload);
        return response;
    }catch(err){
        console.log(err);
    }
}

export async function deleteToolRoles(role_master){
    try{
        const response = await serverInstance.delete(`/tools/${role_master}`);
        return response;
    }catch(err){
        console.log(err);
    }
}

export const ToolRoleService = {
    addToolRoles,
    getToolRoles,
    editToolRoles,
    deleteToolRoles
} 
import { serverInstance} from "../axios/axios.config";

export async function addBulkMembers(requestPayload){
    try{
        return await serverInstance.post("/users/bulkadd", requestPayload);
    }catch(err){
        console.log(err);
    }
}

export async function getUsers(){
    try{
        return await serverInstance.get("/add-members/");
    }catch(err){
        console.log(err);
    }
}

export async function getUserAction(email){
    try{
        return await serverInstance.get(`/add-members/member/${email}`);
    }catch(err){
        console.log(err);
    }
}

export async function editUser(id, payload){
    try{
        return await serverInstance.put(`/add-members/${id}`, payload);
    }catch(err){
        console.log(err);
    }
}

export async function deleteUser(id){
    try{
        return await serverInstance.delete(`/add-members/${id}`);
    }catch(err){
        console.log(err);
    }
}

export async function addUser(payload){
    try{
        return await serverInstance.post(`/add-members/`, payload);
    }catch(err){
        console.log(err);
    }
}
export const Service = {
    addBulkMembers,
    getUsers,
    getUserAction,
    editUser,
    deleteUser,
    addUser
} 
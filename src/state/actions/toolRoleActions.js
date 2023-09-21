import {TOOL_ROLES} from './types';
import { ToolRoleService } from '../../api/toolRole';

export function addToolRoles(payload) {
    return async function (dispatch) {
        try {
            const res = await ToolRoleService.addToolRoles(payload);
        } catch (error)
        {
            console.error("Error");
        }
    }
}

export function getToolRoles(){
    return async function (dispatch) {
        try {
            const res = await ToolRoleService.getToolRoles();
            dispatch({
                type: TOOL_ROLES.GET_TOOL_ROLES,
                payload: res?.data
            });
        } catch (error)
        {
            console.error("Error");
        }
    }
}

export function editToolRoles(role_master,payload){
    return async function (dispatch) {
        try {
            const res = await ToolRoleService.editToolRoles(role_master,payload);
        } catch (error)
        {
            console.error("Error");
        }
    }
} 

export function deleteToolRoles(role_master){
    return async function (dispatch) {
        try {
            const res = await ToolRoleService.deleteToolRoles(role_master);
            dispatch({
                type: TOOL_ROLES.DELETE_TOOL_ROLES,
                payload: res.data
            });
        } catch (error)
        {
            console.error("Error");
        }
    }
}

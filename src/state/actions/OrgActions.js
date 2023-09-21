import { ORG_USERS } from "./types";
import { Service }  from '../../api/Members';

export function addMember(payload)
{
    return async function (dispatch)
    {
        try
        {
            dispatch({
                type: ORG_USERS.ADD,
                payload: payload
            });
        } catch (error)
        {
            console.error("Error");
        }
    }
} 

//edit member
export function editMember(payload) {

    return async function (dispatch) {
    try {
        dispatch({ 
            type:ORG_USERS.EDIT ,
            payload: payload
        })
     } catch (error) {
        console.error("Error");
      }
    }
}

//delete member
export function deleteMember(payload) {

  return async function (dispatch) {
  try {
    
      dispatch({ 
          type: ORG_USERS.DELETE,
          payload: payload
      });
   } catch (error) {
      console.error("Error");
    }
  }
}

//Bulk Add
export function addBulkApi(payload) {
    return async function (dispatch) {
    try {
        const res = await Service.addBulkMembers(payload);
     } catch (error) {
        console.error("Error");
      }
    }
}

  
export function getUsers(payload) {
    return async function (dispatch) {
    try {
        const res = await Service.getUsers(payload);
        dispatch({
            type: ORG_USERS.GET_ORG_USERS,
            payload: res.data
        })
     } catch (error) {
        console.error("Error");
      }
    }
}


export function editUser(id, payload) {
    return async function (dispatch) {
    try {
        const res = await Service.editUser(id, payload);
        // dispatch({
        //     type: ORG_USERS.GET_ORG_USERS,
        //     payload: res.data
        // })
     } catch (error) {
        console.error("Error");
      }
    }
}


export function deleteUser(id) {
    return async function (dispatch) {
    try {
        const res = await Service.deleteUser(id);
        // dispatch({
        //     type: ORG_USERS.GET_ORG_USERS,
        //     payload: res.data
        // })
     } catch (error) {
        console.error("Error");
      }
    }
}


export function addUser(payload) {
    return async function (dispatch) {
    try {
        const res = await Service.addUser(payload);
        // dispatch({
        //     type: ORG_USERS.GET_ORG_USERS,
        //     payload: res.data
        // })
     } catch (error) {
        console.error("Error");
      }
    }
}




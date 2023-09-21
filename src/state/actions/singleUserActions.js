import {USERS} from './types';
import { Service } from '../../api/Members';

export function getUser(data) {
    return async function (dispatch) {
        try {
            const res = await Service.getUserAction(data);
            dispatch({
                type: USERS.GET_USER_BY_EMAIL,
                payload: res.data,
            });
            return Promise.resolve(res.data)
        } catch(err){
            return Promise.reject(err);
        }
    }
}
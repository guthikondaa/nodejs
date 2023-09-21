import { ProjectService } from "../../api/project_data";
import { PROJECT_DATA, TOAST } from './types';
import toast from "../../components/common/Toast";
//API CALLS
export function projectData() {
  return async function(dispatch) {
    try {
      const res = await ProjectService.getProjectData();
      dispatch({
          type: PROJECT_DATA.GET_PROJECT,
          payload: res?.data
      });
      return Promise.resolve(res?.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function deleteProject(data) {
  return async function(dispatch) {
    try {
      const res = await ProjectService.deleteProjectData(data);
      toast.success(data+" "+TOAST.DELETE_SUCCESS);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

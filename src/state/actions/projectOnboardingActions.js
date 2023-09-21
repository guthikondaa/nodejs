import { PROJECT_ONBOARD, TOAST } from "./types";
import { ProjectService } from "../../api/ProjectOnboarding";
import toast from "../../components/common/Toast";
import { getProjectDataByName } from "../../api/project_data";

export function newMember(payload) {
  return async function (dispatch) {
  try {
      dispatch({ 
          type: PROJECT_ONBOARD.USERS.NEW_MEMBER,
          payload: JSON.parse(payload)
      });
    } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  }
}

export function addMember(payload) {
    return async function (dispatch) {
    try {
        dispatch({ 
            type: PROJECT_ONBOARD.USERS.ADD_MEMBER ,
            payload: payload
        });
      } catch (error) {
        console.error("Error");
        return Promise.reject(error);
      }
    }
}

export function editMember(payload) {

    return async function (dispatch) {
    try {
        dispatch({ 
            type: PROJECT_ONBOARD.USERS.EDIT_MEMBER ,
            payload: JSON.parse(payload)
        });
     } catch (error) {
        console.error("Error");
        
        return Promise.reject(error);
      }
    }
}

export function deleteMember(payload) {
  return async function (dispatch) {
  try {
      dispatch({ 
          type: PROJECT_ONBOARD.USERS.DELETE_MEMBER,
          payload: payload
      });
   } catch (error) {
      console.error("Error");
      return Promise.reject(error);
    }
  }
}

export function resetAsDraft(){
  return async function (dispatch) {
    try {
        dispatch({ 
            type: PROJECT_ONBOARD.BASIC_DETAILS.RESET_STEPPER,
        });
     } catch (error) {
        console.error("Error");
        return Promise.reject(error);
      }
  }
} 


// API CALLS
export function saveAsDraft(data){
  return async function (dispatch) {
      try {
         
          const res = await ProjectService.postSaveAsDraft(data);
          toast.success(data["projectName"]+" "+TOAST.ADD_SUCCESS);
          return Promise.resolve(res);
         

      } catch(err){
          toast.error(err.response.data.error);
          return Promise.reject(err);
      }
    
  }
} 
  

export function editAsDraft(data, project_name){
  return async function (dispatch) {
      try {
          const res = await ProjectService.putEditAsDraft(data, project_name);
          toast.success(data["projectName"]+" "+TOAST.UPDATE_SUCCESS);
          return Promise.resolve(res)
      } catch(err){
          return Promise.reject(err);
      }
  }
} 

export function provision(project_name)
{
    return async function (dispatch)
    {
        try
        {
          dispatch({type: PROJECT_ONBOARD.EVENTS.PROVISION, payload: project_name })
          toast.success(project_name + " " + TOAST.UPDATE_SUCCESS);
            const res = await ProjectService.provision(project_name);
            if (res.status === 200){
              const resp_project = await getProjectDataByName(project_name);
              const project_data = resp_project.data
              const jira = project_data.tools.jira !== undefined ? true : false;
              const bitbucket = project_data.tools.bitbucket !== undefined ? true : false;
              let jiraStatus = false;
              let bitbucketStatus = false;
              let status = false;// provision success
              if (jira && project_data.tools.jira.projectStatus === "JIRA_PROJECT_CREATED") {
                console.log("Jirrraa Project created")
                jiraStatus = true;
              }
              if (bitbucket && project_data.tools.bitbucket.projectStatus === "BITBUCKET_PROJECT_CREATED" && project_data.tools.bitbucket.repoStatus === "BITBUCKET_REPOSITORY_CREATED" && project_data.tools.bitbucket.memberStatus === "BITBUCKET_MEMBER_ADDED") {
                console.log("Bitbucket Everything created")
                bitbucketStatus = true;
              }
              if (jira && bitbucket) {
                console.log("Jira and bitbucket")
                if (jiraStatus && bitbucketStatus) {
                  console.log("Jira and bitbucket status")
                  status = true
                }
              } else {
                if (jira && jiraStatus) {
                  console.log("Jira and jiraStatus")
                  status = true
                }
                if (bitbucket && bitbucketStatus) {
                  console.log("bitbucket and bitbucketStatus")
                  status = true
                }
              }
              // provision toast
              if (status) {
                toast.success(`Provision Successful`);
                toast.success("JIRA_PROJECT_CREATED");
                toast.success("BITBUCKET_PROJECT_CREATED");
                toast.success("BITBUCKET_REPOSITORY_CREATED");
                toast.success("BITBUCKET_MEMBER_ADDED");
              } else {
                toast.error("Provision Unsuccessful");
              }
            }
            // get check status
            return Promise.resolve(res)
        } catch (err)
        {
            return Promise.reject(err);
        } 
        finally {
          dispatch({type: PROJECT_ONBOARD.EVENTS.PROVISION, payload: project_name })
        }
    }
} 



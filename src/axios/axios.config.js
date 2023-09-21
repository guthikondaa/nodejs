import axios from "axios";
import { API_SERVER_INSTANCE, API_BITBUCKET_INSTANCE, API_JIRA_INSTANCE } from "../config";
import Toast from "../components/common/Toast";

const serverInstance = axios.create({
  baseURL: API_SERVER_INSTANCE,
  timeout: 60000,
});

const bitbucketInstance = axios.create({
  baseURL: API_BITBUCKET_INSTANCE,
  timeout: 10000,
});

const jiraInstance = axios.create({
  baseURL: API_JIRA_INSTANCE,
  timeout: 10000,
})

serverInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers["x-auth-token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


function errorResponseHandler(error) {
  // check for errorHandle config
  if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
      return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
    Toast.error(error.response.data.error);
    return Promise.reject(error);
  }
}

function successResponseHandler(response){
  return Promise.resolve(response);
}

serverInstance.interceptors.response.use(  
  successResponseHandler,
  errorResponseHandler  
)

export { serverInstance, bitbucketInstance, jiraInstance };
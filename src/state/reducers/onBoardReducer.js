import { PROJECT_ONBOARD } from '../actions/types';

const initialState = {
  definition: {
    projectName: "",
    owner: [],
    startDate: new Date(),
    endDate: new Date(),
    teams: {
      teamsName: "",
      channelName: ""
    },
    jira: {
      jiraName: "",
      projectTemplateKey: ""
    },
    bitbucket: {
      bitbucketName: "",
      repoName: ""
    },
    jenkins: {},
    members: [],
    status: "draft_inprogress",
    tools: {
      jira: false,
      bitbucket: false,
      teams: false,
      jenkins: false
    },
      softDeleteflag: false,
      loader: false,


    },
    projectsUnderProvision: {}
  }

const onBoardReducer = (state=initialState, action) => {
    switch(action.type){
        case PROJECT_ONBOARD.BASIC_DETAILS.ADD_DETAILS:
            return {...state, ...action.data};

        case PROJECT_ONBOARD.BASIC_DETAILS.PROJECTNAME:
            return {
                ...state,
                definition: {
                    ...state.definition,
                    projectName: action.data,
                    teams: {
                        ...state.definition.teams,
                        teamsName: action.data,
                    },
                    bitbucket: {
                        ...state.definition.bitbucket,
                        bitbucketName: action.data,
                    },
                    jira: {
                        ...state.definition.jira,
                        jiraboard: action.data,
                    }
                }
            }
        
        case PROJECT_ONBOARD.BASIC_DETAILS.DEFINITION: 
            return {
                ...state,
                definition: {
                    ...state.definition,
                    [action.apiName]: action.data
                }
            }

        
        case PROJECT_ONBOARD.BASIC_DETAILS.TOOLS:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    tools:{
                        ...state.definition.tools,
                        [action.apiName]: action.data
                    }
                }
            }

        case PROJECT_ONBOARD.BASIC_DETAILS.JIRA:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    jira: {
                        ...state.definition.jira,
                        [action.apiName]: action.data
                    }
                }
            }
        
        case PROJECT_ONBOARD.BASIC_DETAILS.BITBUCKET:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    bitbucket: {
                        ...state.definition.bitbucket,
                        [action.apiName]: action.data
                    }
                }
            }
        
        case PROJECT_ONBOARD.BASIC_DETAILS.TEAMS:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    teams: {
                        ...state.definition.teams,
                        [action.apiName]: action.data
                    }
                }
            }
        

        // Members: Stepper 2
        case PROJECT_ONBOARD.USERS.ADD_MEMBER:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    members: [...state.definition.members, action.payload]
                }
            }
        
        case PROJECT_ONBOARD.USERS.EDIT_MEMBER:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    members: state.definition.members.map((item, index) => index === action.payload.col_id ? {...item, roles: action.payload.roles, jira: action.payload.jira, bitbucket: action.payload.bitbucket, teams: action.payload.teams, jenkins: action.payload.jenkins}:item)
                }
            }

        case PROJECT_ONBOARD.USERS.DELETE_MEMBER:
            return {
                ...state,
                definition:{
                    ...state.definition,
                    members: state.definition.members.filter((item, index) => index !== action.payload)
                }
            }
        
        case PROJECT_ONBOARD.USERS.NEW_MEMBER:
            return {
                ...state,
                data: action.payload
            }

            
            case PROJECT_ONBOARD.BASIC_DETAILS.RESET_STEPPER:
                return initialState;


            case PROJECT_ONBOARD.API.SAVE_AS_DRAFT:
                return {
                    ...state,
                    loader: true
            }  
            case PROJECT_ONBOARD.EVENTS.PROVISION:
                const name = action.payload
                let _projectsUnderProvision = {...state.projectsUnderProvision}
                if(_projectsUnderProvision[name]){
                    delete _projectsUnderProvision[name]
                } else {
                    _projectsUnderProvision[name]= true
                }
                return {
                    ...state,
                    projectsUnderProvision: _projectsUnderProvision
                    
            }     
            case PROJECT_ONBOARD.EVENTS.PROVISION_SUCCESS:
                return {
                    ...state,
                    provisionSuccessful: true
                }
            
            case PROJECT_ONBOARD.EVENTS.PROVISION_RESET:
                return {
                    ...state,
                    provisionSuccessful: false
                }
            
        default: 
            return state;
    }
}

export default onBoardReducer;
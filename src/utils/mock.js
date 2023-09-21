// source, ci/cd => Onchange (src)
//  toolName["Gitlab", "Bitbucket"]
//  mandatory
// item.subCategories
export const toolConfiguration = [
  {
    toolCategoryId: "scm",
    toolCategoryName: "Source Code Management",
    subCategories: [
      {
        toolId: "gitlab",
        toolName: "Gitlab",
        mandatoryFields: [
          {
            type: "input",
            name: "InstanceName",
            maxLength: 40,
            minLength: 5,
            validation: "specialChar",
            hasError: false,
            isRequired: true,
            title: "Instance Name"
          },
          {
            type: "input",
            name: "Host",
            minLength: 0,
            hasError: false,
            isRequired: true,
            title: "Host"
          },
          {
            type: "input",
            name: "Token",
            maxLength: 40,
            minLength: 5,
            hasError: false,
            isRequired: true,
            title: "Token"
          },
        ],
        optionalFields: [],
      },
      {
        toolId: "bitbucket",
        toolName: "Bitbucket",
        mandatoryFields: [
          {
            type: "input",
            name: "InstanceName",
            maxLength: 40,
            minLength: 5,
            validation: "specialChar",
            hasError: false,
            isRequired: true,
          },
          {
            type: "input",
            name: "Host",
            minLength: 0,
            hasError: false,
            isRequired: true,
          },
          {
            type: "input",
            name: "Token",
            maxLength: 40,
            minLength: 5,
            hasError: false,
            isRequired: true,
          },
        ],
        optionalFields: [],
      },
    ],
  },
  {
    toolCategoryId: "ci/cd",
    toolCategoryName: "CI/CD",
    subCategories: [
      {
        toolId: "jenkins",
        toolName: "Jenkins",
        mandatoryFields: [
          {
            type: "input",
            name: "InstanceName",
            maxLength: 40,
            minLength: 5,
            validation: "specialChar",
            hasError: false,
            isRequired: true,
          },
          {
            type: "input",
            name: "Host",
            minLength: 0,
            hasError: false,
            isRequired: true,
          },
          {
            type: "input",
            name: "Token",
            maxLength: 40,
            minLength: 5,
            hasError: false,
            isRequired: true,
          },
        ],
        optionalFields: [],
      },
    ],
  },
];
// ADD MEMBERS: AUTOCOMPLETE
export const optionsUpdated = [
  {
    username: "ashekhar",
    name: "Ayush Shekhar",
    email: "ashekhar@altimetrik.com",
  },
  {
    username: "skathade",
    name: "Suraj Kathade",
    email: "skathade@altimetrik.com",
  },
  {
    username: "trajendra",
    name: "Tejashree Salvi",
    email: "trajendra@altimterik.com",
  },
  {
    username: "sbhasin",
    name: "Sidharth Bhasin",
    email: "sbhasin@altimetrik.com",
  },
];

// ADD MEMBERS: SELECT

export const getRolesCollection = [
  { id: "Architect", title: "Architect" },
  { id: "Developer", title: "Developer" },
  { id: "DevOps Engineer", title: "DevOps Engineer" },
  { id: "Operations", title: "Operations" },
  { id: "Read Only", title: "Read Only" },
  { id: "Write", title: "Write" },
];

export const role_master = ["Architect","Developer","Devops_Engineer"];

export const Jira = ["Administrator","Developer","User"];

export const Bitbucket = ["read","write","admin"];

export const Jenkins = ["Read","Build","Configure"];

export const Teams = ["read","write","admin"];

export const getToolCollection = [
  
  { id: 'Bitbucket', title: 'Bitbucket' },
  { id: 'Jira', title: 'Jira' },
  { id: 'Jenkins', title: 'Jenkins' },
]


export const getTool = [
  { id: "scm", title: "Source Code Management" },
  { id: "ci-cd", title: "CI-CD" },
  { id: "projectmanagement", title: "Project Management" },
  { id: "communication", title: "Communication" }
];

export const getSCM = [
  { id: "Bitbucket", title: "Bitbucket" },
];

export const getCICD = [
  { id: "Jenkins", title: "Jenkins" },
];

export const getProjectManagement = [
  { id: "Jira", title: "Jira" },
];
export const getCommunication = [
  { id: "Teams", title: "Teams" },
];


export const tools = ["Bitbucket", "Jira", "Gitlab"]
export const addMembers = [""]


export const owner = ["ayush", "sachin", "nayan"]
export const definition = [""]

export const toolsConfigured = ["Jira", "Bitbucket", "Teams"]
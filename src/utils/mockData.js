export const projectDetails = [
        {
            name: 'projectname',   
            fieldType: "TextField",
            label: "Project Name",
            minLength: 0,
            maxLength: 20,
            hasError: false,
            isRequired: true,
            errorMessage: "This field is required!",
        },
        {
            name: "owner",
            fieldType: "Autocomplete",
            label: "Owner",
            isRequired: true,
            hasError: false,
            options:["ayush", "sachin", "nayan"],
            errorMessage: "This field is required!",
        },
        {
            name: "startDate",
            fieldType: "Date",
            label: "Start Date",
            format:"MM/dd/yyyy",
            hasError: false,
            errorMessage: '',
            isRequired: true,
        },
        {
            name: "endDate",
            fieldType: "Date",
            label: "End Date",
            format:"MM/dd/yyyy",
            errorMessage: '',   
            isRequired: true,
            dependantAPIName: 'startDate;endDate',
            constraints: (modal) => {
                const hasError = modal.endDate && modal.startDate &&
                        (new Date(modal.endDate) < new Date(modal.startDate))
                return {
                value: (hasError && '') || modal.endDate,
                variables: {
                    errorMessage: (hasError && 
                        'End date cannot be greater than Start date') || '',
                    hasError,
                },
                }
            },
        },
        {
            name: "teams",
            fieldType: "Checkbox",
            label: "Teams",
            checked: false,
            isRequired: true,
            hasError: false,
            errorMessage: "This field is required!",
            fields:[
                {
                    name: 'teamName',   
                    fieldType: "TextField",
                    label: "Team Name",
                    minLength: 0,
                    maxLength: 20,
                    hasError: false,
                    isRequired: true,
                    errorMessage: "This field is required!",   
                },
                {
                    name: 'channelName',   
                    fieldType: "TextField",
                    label: "Channel Name",
                    minLength: 0,
                    maxLength: 20,
                    hasError: false,
                    isRequired: true,
                    errorMessage: "This field is required!",   
                }
            ]
        },
        {
            name: "jira",
            fieldType: "Checkbox",
            label: "Jira",
            checked: false,
            isRequired: true,
            hasError: false,
            errorMessage: "This field is required!",
            fields:[
                {
                    name: 'jiraProject',   
                    fieldType: "TextField",
                    label: "Board Name",
                    minLength: 0,
                    maxLength: 20,
                    hasError: false,
                    isRequired: true,
                    errorMessage: "This field is required!",   
                },
            ]
        },
        {
            name: 'bitbucket',
            fieldType: "Checkbox",
            label: "Bitbucket",
            checked: false,
            isRequired: true,
            hasError: false,
            errorMessage: "This field is required!",
            fields:[
                {
                    name: 'projectName',   
                    fieldType: "TextField",
                    label: "Project Name",
                    minLength: 0,
                    maxLength: 20,
                    hasError: false,
                    isRequired: true,
                    errorMessage: "This field is required!",   
                },
                {
                    name: 'repoName',   
                    fieldType: "TextField",
                    label: "Repository Name",
                    minLength: 0,
                    maxLength: 20,
                    hasError: false,
                    isRequired: true,
                    errorMessage: "This field is required!",   
                }
            ]
        },
    ]

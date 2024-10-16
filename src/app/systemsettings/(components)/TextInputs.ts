// interface ITextInput {
//     [title: string]: {
//         disabled:   boolean,
//         defaultValue:   string,
//         label:  string,
//         dataAttribute: string,
//         name: string
//     }
// } 

export const Inputs = {
    applicationURL: {
        dataAttribute: "Application URL",
        label:         "Application URL",
        defaultValue:  "http://localhost:4000",
        disabled:       true,
        name:           "applicationURL",
    },
    emailHandlerURL: {
        dataAttribute: "Email Handler URL",
        label:         "Email Handler URL",
        defaultValue:  "http://localhost:4001",
        disabled:       true,
        name:           "emailHandlerURL",
    },
    workflowHandlerURL: {
        dataAttribute: "Workflow Handler URL",
        label:         "Workflow Handler URL",
        defaultValue:  "http://localhost:4002",
        disabled:       true,
        name:           "workflowHandlerURL",
    },
    defaultImportChunkPageSize: {
        dataAttribute: "Default Import Chunk (Page) Size",
        label:         "Default Import Chunk (Page) Size",
        defaultValue:  "",
        disabled:       true,
        name:           "defaultImportChunkPageSize",
    },
    storedProceduresTimeoutSeconds: {
        dataAttribute: "Stored Procedures Timeout (seconds)",
        label:         "Stored Procedures Timeout (seconds)",
        defaultValue:  "",
        disabled:       true,
        name:           "storedProceduresTimeoutSeconds",
    },
    domainName: {
         dataAttribute: "Domain name",
         label:         "Domain name",
         defaultValue:  "local.demo",
         disabled:       true,
         name:           "domainName",
    },
    machineName: {
        dataAttribute: "Machine name",
        label:         "Machine name",
        defaultValue:  "AZURE2020",
        disabled:       true,
        name:           "machineName",
    },
    entityName: {
        dataAttribute: "Entity name",
        label:         "Entity name",
        defaultValue:  "BTYON",
        disabled:       true,
        name:           "entityName",   
    },
    licenceExpireDate: {
        dataAttribute: "Licence expire date",
        label:         "Licence expire date",
        defaultValue:  "Unlimited",
        disabled:       true,
        name:           "licenceExpireDate",   
    },
    handlersExpireDate: {
        dataAttribute: "Handlers expire date",
        label:         "Handlers expire date",
        defaultValue:  "",
        disabled:       true,
        name:           "handlersExpireDate",   
    },
    applicationTitle: {
        dataAttribute: "Application title",
        label:         "Application title",
        defaultValue:  "Dev Team IMS",
        disabled:       true,
        name:           "applicationTitle",   
    },
    eventLogViewerPageSize: {
        dataAttribute: "Event Log Viewer Page Size",
        label:         "Event Log Viewer Page Size",
        defaultValue:  "20",
        disabled:       true,
        name:           "eventLogViewerPageSize",   
    },
    errorReportAdress: {
        dataAttribute: "Error Report Adress(es)",
        label:         "Error Report Adress(es)",
        defaultValue:  "dev@btyon.com",
        disabled:       true,
        name:           "errorReportAdress",   
    },
    userSearchTimeout: {
        dataAttribute: "User Search Timeout(ms)",
        label:         "User Search Timeout(ms)",
        defaultValue:  "120000",
        disabled:       true,
        name:           "userSearchTimeout",   
    },
    sessionTimeoutWarning: {
        dataAttribute: "Session Timeout Warning(minutes)",
        label:         "Session Timeout Warning(minutes)",
        defaultValue:  "555",
        disabled:       true,
        name:           "sessionTimeoutWarning",   
    },
    userSearchInputDelay: {
        dataAttribute: "User Search Input Delay(ms)",
        label:         "User Search Input Delay(ms)",
        defaultValue:  "500",
        disabled:       true,
        name:           "userSearchInputDelay",  
    },
    sMTPServerPort: {
        dataAttribute: "SMTP Server Port",
        label:         "SMTP Server Port",
        defaultValue:  "25",
        disabled:       true,
        name:           "sMTPServerPort",  
    },
    sMTPServer: {
        dataAttribute: "SMTP Server",
        label:         "SMTP Server",
        defaultValue:  "",
        disabled:       true,
        name:          "sMTPServer",
    },
    formEmailAdressDefault: {
        dataAttribute: "Form Email Adress (default)",
        label:         "Form Email Adress (default)",
        defaultValue:  "ims@btyon.com",
        disabled:       true,
        name:          "formEmailAdressDefault",
    },
    completedTasksMaxAge: {
        dataAttribute: "Completed Tasks Max Age(days)",
        label:         "Completed Tasks Max Age(days)",
        defaultValue:  "30",
        disabled:       true,
        name:          "completedTasksMaxAge",
    },
    absoluteMaxAge: {
        dataAttribute: "Absolute Max Age(days)",
        label:         "Absolute Max Age(days)",
        defaultValue:  "180",
        disabled:       true,
        name:          "absoluteMaxAge",
    },
    retryPeriodYears: {
        dataAttribute: "Retry Period (Year)",
        label:      "Retry Period (Year)",
        defaultValue: "0",
        disabled:      false,
        name:       "retryPeriodYears"       
    },
    retryPeriodMonths: {
        dataAttribute: "Retry Period (Month)",
        label:      "Retry Period (Month)",
        defaultValue: "0",
        disabled:      false,
        name:       "retryPeriodMonths"       
    },
    retryPeriodDays: {
        dataAttribute: "Retry Period (Day)",
        label:      "Retry Period (Day)",
        defaultValue: "0",
        disabled:      false,
        name:       "retryPeriodDays"       
    },
    retryPeriodHours: {
        dataAttribute: "Retry Period (Hour)",
        label:      "Retry Period (Hour)",
        defaultValue: "0",
        disabled:      false,
        name:       "retryPeriodHours"       
    },
    retryPeriodMinutes: {
        dataAttribute: "Retry Period (Minute)",
        label:      "Retry Period (Minute)",
        defaultValue: "1",
        disabled:      false,
        name:       "retryPeriodMinutes"       
    },
    retryPeriodSeconds: {
        dataAttribute: "Retry Period (Second)",
        label:      "Retry Period (Second)",
        defaultValue: "0",
        disabled:      false,
        name:       "retryPeriodSeconds"       
    },
    executionPeriodYears: {
        dataAttribute: "execution Period (Year)",
        label:      "execution Period (Year)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodYears"       
    },
    executionPeriodMonths: {
        dataAttribute: "execution Period (Month)",
        label:      "execution Period (Month)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodMonths"       
    },
    executionPeriodDays: {
        dataAttribute: "execution Period (Day)",
        label:      "execution Period (Day)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodDays"       
    },
    executionPeriodHours: {
        dataAttribute: "execution Period (Hour)",
        label:      "execution Period (Hour)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodHours"       
    },
    executionPeriodMinutes: {
        dataAttribute: "execution Period (Minute)",
        label:      "execution Period (Minute)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodMinutes"       
    },
    executionPeriodSeconds: {
        dataAttribute: "execution Period (Second)",
        label:      "execution Period (Second)",
        defaultValue: "10",
        disabled:      false,
        name:       "executionPeriodSeconds"       
    },
    maxRetry: {
        dataAttribute: "Max Retry",
        label:      "Max Retry",
        defaultValue: "3",
        disabled:      false,
        name:       "executionPeriodSeconds"       
    },
    executionPeriodYearsWorkflowHandler: {
        dataAttribute: "execution Period (Year)",
        label:      "execution Period (Year)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodYearsWorkflowHandler"       
    },
    executionPeriodMonthsWorkflowHandler: {
        dataAttribute: "execution Period (Month)",
        label:      "execution Period (Month)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodMonthsWorkflowHandler"       
    },
    executionPeriodDaysWorkflowHandler: {
        dataAttribute: "execution Period (Day)",
        label:      "execution Period (Day)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodDaysWorkflowHandler"       
    },
    executionPeriodHoursWorkflowHandler: {
        dataAttribute: "execution Period (Hour)",
        label:      "execution Period (Hour)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodHoursWorkflowHandler"       
    },
    executionPeriodMinutesWorkflowHandler: {
        dataAttribute: "execution Period (Minute)",
        label:      "execution Period (Minute)",
        defaultValue: "0",
        disabled:      false,
        name:       "executionPeriodMinutesWorkflowHandler"       
    },
    executionPeriodSecondsWorkflowHandler: {
        dataAttribute: "execution Period (Second)",
        label:      "execution Period (Second)",
        defaultValue: "10",
        disabled:      false,
        name:       "executionPeriodSecondsWorkflowHandler"       
    },
    // applicationURL: {
    //     dataAttribute: "Application URL",
    //     label:         "Application URL",
    //     defaultValue:  "http://localhost:4000",
    //     disabled:       true,
    //     name:           "applicationURL",
    //     size:           "medium"   
    // },
    defaultLanguage: {
        id:             "defaultLanguage",
        name:             "defaultLanguage",
        label:          "Default language",
        dataAttribute:  "Default language",
    },
    colorTheme: {
        id:          "colorTheme",
        name:          "colorTheme",
        label:             "Color Theme",
        dataAttribute:  "Color Theme"
    },
    logMode: {
        id:             "logMode",
        name:             "logMode",
        label:          "Log Mode",
        dataAttribute:  "Log Mode"
    },
    diagnosticLogmode: {
        id:             "diagnosticLogmode",
        name:             "diagnosticLogmode",
        label:          "Formula Diagnostik Log Mode",
        dataAttribute:  "Formula Diagnostik Log Mode"
    },
    clientUilogs: {
        id:             "clientUilogs",
        name:           "clientUilogs",
        label:          "Client UI Logs",
        dataAttribute:  "Client UI Logs"
    },
    globalFilter: {
        id:             "globalFilter",
        name:             "userSearchFilterGroupId",
        label:          "User Search Global Filter IMS Group",
        dataAttribute:  "User Search Global Filter IMS Group"
    },
    anonymousLinkAccess: {
        dataAttribute: "Anonymous Link Access",
        label:      "Anonymous Link Access",
        id:     "anonymousLinkAccess",
        name:   "anonymousLinkAccess"
    },
    showLogoutButtonOnBanner: {
        dataAttribute:  "Show logout button on banner",
        label:      "Show logout button on banner",
        id:         "showLogoutButtonOnBanner",
        name:       "showLogoutButtonOnBanner",
        defaultChecked: true
    },
    showLogoutButtonLabelOnBanner: {
        dataAttribute:  "Show logout button label on banner",
        label:      "Show logout button label on banner",
        id:         "showLogoutButtonOnBanner",
        name:       "showLogoutButtonOnBanner"
    },
    enableExecuteQueryTool: {
        dataAttribute:  "Enable execute query tool",
        label:      "Enable execute query tool",
        id:        "enableExecuteQueryTool",
        name:      "enableExecuteQueryTool",
        defaultChecked: true
    } ,
    runHealthCheckToolsOnArchitectLoad: {
        dataAttribute: "Run Health-check Tools on Architect Load",
        name:       "Run Health-check Tools on Architect Load",
        id:     "runHealthCheckToolsOnArchitectLoad",
        label:  "Run health-check tools on architect load"
    } ,
    enableEmailReference: {
        dataAttribute: "Enable Email Reference",
        label:      "Enable Email Reference",
        id:     "enableEmailReference",
        name:   "enableEmailReference"
    } ,
    enableFormReference: {
        dataAttribute:  "Enable Form Reference",
        label:      "Enable Form Reference",
        id:     "enableFormReference",
        name:   "enableFormReference",
        defaultChecked: true
    } ,
    enableApplicationDiagnosticLog: {
        dataAttribute: "Enable Application Diagnostic Log",
        label:      "Enable Application Diagnostic Log",
        id:     "enableApplicationDiagnosticLog",
        name:   "enableApplicationDiagnosticLog",
        defaultChecked: true
    } ,
    enableSessionTimeoutLog: {
        dataAttribute:  "Enable Session Timeout Log",
        label:      "Enable Session Timeout Log",
        id:     "enableSessionTimeoutLog",
        name:   "enableSessionTimeoutLog"         
    },
    enableVerboseCacheLog: {
        dataAttribute:  "Enable Verbose Cache Log",
        label:      "Enable Verbose Cache Log",
        id:     "enableVerboseCacheLog",
        name:   "enableVerboseCacheLog"
    },
    ignoreDisabledActiveDirectoryUsers: {
        dataAttribute: "Ignore Disabled Active Directory Users",
        label:      "Ignore Disabled Active Directory Users",
        id:     "ignoreDisabledActiveDirectoryUsers",
        name:   "ignoreDisabledActiveDirectoryUsers"
    },
    disableAutoSearchUsersOnInput: {
        dataAttribute: "Disable Auto Search Users On Input",
        label:      "Disable Auto Search Users On Input",
        id:     "disableAutoSearchUsersOnInput",
        name:   "disableAutoSearchUsersOnInput"
    },
    enforceSingleActivePlatformSession: {
        dataAttribute: "Enforce Single Active Platform Session (per user)",
        label:      "Enforce Single Active Platform Session (per user)",
        id:     "enforceSingleActivePlatformSession",
        name:   "enforceSingleActivePlatformSession"
    },
    enforceSingleActiveArchitectSession: {
        dataAttribute:  "Enforce Single Active Architect Session ",
        label:      "Enforce Single Active Architect Session ",
        id:     "enforceSingleActiveArchitectSession",
        name:   "enforceSingleActiveArchitectSession"
    },
    formLog: {
        dataAttribute:  "Form Log",
        label:      "Form Log",
        id:     "formLog",
        name:   "formLog",         
    },
    viewLog: {
        dataAttribute: "View Log",
        label:      "View Log",
        id:     "viewLog",
        name:   "viewLog"
    },
    saveLog: {
        dataAttribute: "Save Log",
        label:      "Save Log",
        id:     "saveLog",
        name:   "saveLog"   
    } 
}
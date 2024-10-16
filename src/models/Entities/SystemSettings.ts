export interface SystemSettings extends SystemSettingsForCreate{
    id:                                                                 string;
    createTime:                                                         Date;
    updateTime?:                                                        Date;
    systemSettingsReferenceId:                                          string;
}

export interface SystemSettingsForCreate {
    defaultLanguage:                                                    string;
    workflowUserId:                                                     string;
    defaultWorkDocumentTemplateId?:                                     string;
    privilegedCompanyProfileId?:                                        string;  
    architectsProfileId?:                                               string;  
    allLocalUsersIMSGroupId?:                                           string;  
    initialUsersProfileId?:                                             string;  
    anonymousUserId?:                                                   string;  
    anonymousProfileId?:                                                string;  
    eventLogViewersProfileId?:                                          string;  
    eventLogManagersProfileId:                                          string;
    eventLogAdministratorsProfileId?:                                   string;
    logMode:                                                            LogMode;
    applicationTitle?:                                                  string;
    errorReportTo?:                                                     string;
    colorTheme:                                                         ColorTheme;
    activeDirectorySearchTimeoutMiliSeconds:                            number;
    sessionTimeoutWarningMinutes:                                       number;
    enableEmailReference:                                               boolean;
    enableFormReference:                                                boolean;
    formulaDiagnosticLogMode:                                           DiagnosticFormulaLoggingMode;
    enableSessionTimeoutLog:                                            boolean;
    showLogoutButtonOnBanner:                                           boolean;
    showLogoutButtonLabelOnBanner:                                      boolean;
    applicationURL?:                                                    string;
    workflowHandlerURL?:                                                string;
    emailHandlerURL?:                                                   string;
    defaultImportChunkSize?:                                            number;
    jobHandlerPort?:                                                    number;
    smtpServerPort?:                                                    number;
    smtpServer?:                                                        string;
    defaultEmailAddress?:                                               string;
    synchronizeADUsersIntervalSeconds?:                                 number;
    synchronizeAzureUsersIntervalSeconds?:                              number;
    enableAnonymousLinkAccess:                                          boolean;
    enableVerboseCacheLog:                                              boolean;
    eventLogViewerPageSize:                                             number;
    disableAutoSearchUsersOnInput:                                      boolean;
    userSearchInputDelayMiliseconds:                                    number;
    emailHandlerExecutePeriodSeconds:                                   number;
    emailHandlerRetryPeriodSeconds:                                     number;
    emailHandlerMaxRetryCount:                                          number;
    workflowHandlerExecutePeriodSeconds:                                number;
    platformConfigTransferDate?:                                        Date;
    workflowHandlerConfigTransferDate?:                                 Date;
    emailHandlerConfigTransferDate?:                                    Date;
    clientUILogs?:                                                      ClientUILog;
    uIDiagnosticLogViewersId?:                                          string;
    userSearchFilterGroupId?:                                           string;
    licenceExtendedExpirationDate?:                                     Date;
    exportTaskMaxAge:                                                   number;
    exportTaskDownloadedMaxAge:                                         number;
    enforceSingleActivePlatformSession:                                 boolean;
    enforceSingleActiveArchitectSession:                                boolean;
    userSearchLimit?:                                                   number;
    storedProcContextCommandTimeout?:                                   number;
    passwordPolicy_MaxPasswordLength?:                                  number;
    workflowHandlerTimeBasedProcessorMaxDegreeOfParallelism?:           number;
    workflowHandlerAsyncOperationsProcessorMaxDegreeOfParallelism?:     number;
    isAnonymous:                                                        boolean;
    runToolsOnArchitectLoad:                                            boolean;
    enableExecuteQueryTool:                                             boolean;
    ignoreDisabledUsers:                                 boolean;
    enableApplicationDiagnosticLog:                                     boolean;
}

export interface SystemSettingsForUpdate extends SystemSettingsForCreate{
    id:             string;
}

export enum LogMode {
    DEFAULT ,
    STANDARD ,
    FULL ,
    OFF
}

export enum ColorTheme {
    Default ,
    Red
}

export enum DiagnosticFormulaLoggingMode
{
    DoNotLog = 0,
    LogEventsOnly = 1,
    LogEventsAndStackTrace = 2,
}

export enum ClientUILog {
    FormLog = 1,
    ViewLog = 2,
    SaveLog = 4
}
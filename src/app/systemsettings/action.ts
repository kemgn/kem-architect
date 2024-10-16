import { ClientUILog, ColorTheme, DiagnosticFormulaLoggingMode, LogMode, SystemSettings, SystemSettingsForCreate, SystemSettingsForUpdate } from "@/models/Entities/SystemSettings";
import { Inputs } from "./(components)/TextInputs";
import { TreeService } from "@/services/Tree";
import { zeroBit } from "./(components)/systemsettings";
import { SystemSettingsService } from "@/services/SystemSettings";
import { Jersey_10 } from "next/font/google";

const systemSettingID = process.env.SYSTEMSETTING_ID
const open = 'on';
const emptyStr = "";
const yearToSecond = 60*60*24*365;
const monthToSecond = 60*60*24*30;
const dayToSecond = 60*60*24;
const hourToSecond = 60*60;
const minuteToSecond = 60;

export async function updateSystemSettings (formData: FormData , id: string) {
    console.log((formData.get(Inputs.defaultLanguage.name) as string) , "DEFAULTLANGUAGE");
    const handlersExpireDateTmp = (formData.get(Inputs.handlersExpireDate.name) as string);
    const handlersExpireDate = new Date(handlersExpireDateTmp);
    const formLogToggle = (formData.get(Inputs.formLog.name) as string) === open ? true : false;
    const viewLogToggle = (formData.get(Inputs.viewLog.name) as string) === open ? true : false;
    const saveLogToggle = (formData.get(Inputs.saveLog.name) as string) === open ? true : false;
    const formLogToggleStatus = formLogToggle ? ClientUILog.FormLog : zeroBit;
    const viewLogToggleStatus = viewLogToggle ? ClientUILog.ViewLog : zeroBit;
    const saveLogToggleStatus = saveLogToggle ? ClientUILog.SaveLog : zeroBit;
    const clientUiLog = formLogToggleStatus | viewLogToggleStatus | saveLogToggleStatus;
    const executionperiodYear = parseInt(formData.get(Inputs.executionPeriodYears.name) as string)*yearToSecond;
    const executionperiodMonth = parseInt(formData.get(Inputs.executionPeriodMonths.name) as string)*monthToSecond;
    const executionperiodDay = parseInt(formData.get(Inputs.executionPeriodDays.name) as string)*dayToSecond;
    const executionperiodHour = parseInt(formData.get(Inputs.executionPeriodHours.name) as string)*hourToSecond;
    const executionperiodMinute = parseInt(formData.get(Inputs.executionPeriodMinutes.name) as string)*minuteToSecond;
    const executionperiodSecond = parseInt(formData.get(Inputs.executionPeriodYears.name) as string);
    const emailHandlerExecutePeriodSecond = parseInt(formData.get("emailHandlerExecutePeriodSecond") as string);;
    const retryPeriodYears = parseInt(formData.get(Inputs.retryPeriodYears.name) as string)*yearToSecond;
    const retryPeriodMonths = parseInt(formData.get(Inputs.retryPeriodMonths.name) as string)*monthToSecond;
    const retryPeriodDays = parseInt(formData.get(Inputs.retryPeriodDays.name) as string)*dayToSecond;
    const retryPeriodHours = parseInt(formData.get(Inputs.retryPeriodHours.name) as string)*hourToSecond;
    const retryPeriodMinutes = parseInt(formData.get(Inputs.retryPeriodMinutes.name) as string)*minuteToSecond;
    const retryPeriodSeconds = parseInt(formData.get(Inputs.retryPeriodSeconds.name) as string);
    const emailHandlerRetryPeriodSecond = parseInt(formData.get("emailHandlerRetryPeriodSeconds") as string);
    const executionPeriodYearsWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodYearsWorkflowHandler.name) as string)*yearToSecond;
    const executionPeriodMonthsWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodMonthsWorkflowHandler.name) as string)*monthToSecond;
    const executionPeriodDaysWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodDaysWorkflowHandler.name) as string)*dayToSecond;
    const executionPeriodHoursWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodHoursWorkflowHandler.name) as string)*hourToSecond;
    const executionPeriodMinutesWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodMinutesWorkflowHandler.name) as string)*minuteToSecond;
    const executionPeriodSecondsWorkflowHandler = parseInt(formData.get(Inputs.executionPeriodSecondsWorkflowHandler.name) as string);
    const workflowHandlerExecutePeriodSecond = parseInt(formData.get("workflowHandlerExecutePeriodSeconds") as string);
    const defaultimportchunksize = parseInt((formData.get(Inputs.defaultImportChunkPageSize.name) as string))|| undefined;
    const eventlogviewerpagesize = parseInt(formData.get(Inputs.eventLogViewerPageSize.name) as string);
    const sessiontimeoutwarningminutes = parseInt(formData.get("sessionTimeoutWarningMinutes") as string);
    const storedproccontextcommandtimeout = parseInt((formData.get(Inputs.storedProceduresTimeoutSeconds.name) as string)) || undefined;
    const usersearchinputdelaymiliseconds = parseInt(formData.get("userSearchInputDelayMiliseconds") as string);
    const usersearchfiltergroupid = formData.get(Inputs.globalFilter.name) as string || undefined;
    const dateString = "Tue Jan 20 2026 00:00:00 GMT+0300 (GMT+03:00)";
    const dateTime = new Date(dateString);

    const systemSettings: SystemSettingsForUpdate = {
        id: id, // normalde authantica olduktan sonra systemSettings'e bir kere getAsync atılmalı başta ve id ordan alınıp .env veya başka bir yerde saklanmalı
        applicationURL: (formData.get(Inputs.applicationURL.name) as string),
        emailHandlerURL: (formData.get(Inputs.emailHandlerURL.name) as string),
        workflowHandlerURL: (formData.get(Inputs.workflowHandlerURL.name) as string),
        enableAnonymousLinkAccess: (formData.get(Inputs.anonymousLinkAccess.name) as string) === open ? true : false,
        defaultImportChunkSize: defaultimportchunksize,
        storedProcCOntextCommandTimeout: storedproccontextcommandtimeout,
        // licenceExtendedExpirationDate: handlersExpireDate,
        defaultLanguage:    formData.get(Inputs.defaultLanguage.name) as string,
        applicationTitle: formData.get(Inputs.applicationTitle.name) as string || undefined,
        colorTheme:    parseInt(formData.get(Inputs.colorTheme.name) as string),
        showLogoutButtonOnBanner: (formData.get(Inputs.showLogoutButtonOnBanner.name) as string) === open ? true : false,
        showLogoutButtonLabelOnBanner: (formData.get(Inputs.showLogoutButtonLabelOnBanner.name) as string) === open ? true : false,         
        eventLogViewerPageSize: !!eventlogviewerpagesize ? eventlogviewerpagesize : 0, 
        errorReportTo: formData.get(Inputs.errorReportAdress.name) as string || undefined,
        logMode: parseInt(formData.get(Inputs.logMode.name) as string),
        formulaDiagnosticLogMode: parseInt(formData.get(Inputs.diagnosticLogmode.name) as string),
        clientUILogs: clientUiLog,
        runToolsOnArchitectLoad: (formData.get(Inputs.runHealthCheckToolsOnArchitectLoad.name) as string) === open ? true : false,
        enableExecuteQueryTool: (formData.get(Inputs.enableExecuteQueryTool.name) as string) === open ? true : false,
        enableApplicationDiagnosticLog: (formData.get(Inputs.enableApplicationDiagnosticLog.name) as string) === open ? true : false,
        ignoreDisabledUsers: (formData.get("ignoreDisabledUsers") as string) === open ? true : false,
        // handlers expire data (bu yok)
        // userSearchFilterGroupId enum haline getirilcek BB'ye sor??????!!!!!
        enableEmailReference: (formData.get(Inputs.enableEmailReference.name) as string) === open ? true : false,
        enableFormReference: (formData.get(Inputs.enableFormReference.name) as string) === open ? true : false,
        enableSessionTimeoutLog: (formData.get(Inputs.enableSessionTimeoutLog.name) as string) === open ? true : false,
        enableVerboseCacheLog: (formData.get(Inputs.enableVerboseCacheLog.name) as string) === open ? true : false,
        userSearchLimit: parseInt(formData.get("userSearchLimit") as string) || undefined,
        sessionTimeoutWarningMinutes:  !!sessiontimeoutwarningminutes ? sessiontimeoutwarningminutes : 0,
        userSearchInputDelayMiliseconds: !!usersearchinputdelaymiliseconds ? usersearchinputdelaymiliseconds : 0,
        userSearchFilterGroupId: usersearchfiltergroupid, // bakılcak
        smtpServerPort:    parseInt(formData.get(Inputs.sMTPServerPort.name) as string) || undefined,
        smtpServer:    formData.get(Inputs.sMTPServer.name) as string || undefined,
        defaultEmailAddress: formData.get(Inputs.formEmailAdressDefault.name) as string || undefined,         
        exportTaskDownloadedMaxAge: parseInt(formData.get(Inputs.completedTasksMaxAge.name) as string), // 30 (küçük olan)
        exportTaskMaxAge:  parseInt(formData.get(Inputs.absoluteMaxAge.name) as string),
        disableAutoSearchUsersOnInput:  (formData.get(Inputs.disableAutoSearchUsersOnInput.name) as string) === open ? true : false,
        enforceSingleActivePlatformSession:    (formData.get(Inputs.enforceSingleActivePlatformSession.name) as string) === open ? true : false,
        enforceSingleActiveArchitectSession:   (formData.get(Inputs.enforceSingleActiveArchitectSession.name) as string) === open ? true : false,
        emailHandlerExecutePeriodSeconds:  emailHandlerExecutePeriodSecond,
        emailHandlerRetryPeriodSeconds: emailHandlerRetryPeriodSecond,
        emailHandlerMaxRetryCount: parseInt(formData.get(Inputs.maxRetry.name) as string) ,
        workflowHandlerExecutePeriodSeconds: workflowHandlerExecutePeriodSecond,
        // -------------- default atamaları olacak kısım (bu kısımdakileri sor)
        activeDirectorySearchTimeoutMiliSeconds: parseInt(formData.get("activeDirectorySearchTimeoutMiliSeconds") as string),        
        eventLogManagersProfileId: emptyStr,
        // isAnonymous: false,        
        // workflowUserId: emptyStr,
        // allLocalUsersIMSGroupId: emptyStr,
        // anonymousProfileId: emptyStr,
        // anonymousUserId: emptyStr,
        // architectsProfileId: emptyStr,
        // defaultWorkDocumentTemplateId: emptyStr,
        // emailHandlerConfigTransferDate: new Date(2025,12,20),
        // eventLogAdministratorsProfileId: emptyStr,
        // eventLogViewersProfileId:  emptyStr,
        // initialUsersProfileId: emptyStr,
        // jobHandlerPort: 0,
        passwordPolicy_MaxPasswordLength: parseInt(formData.get("passwordPolicy_MaxPasswordLength") as string) || undefined,
        // platformConfigTransferDate: new Date(2025,2,20),
        privilegedCompanyProfileId: emptyStr,
        // synchronizeADUsersIntervalSeconds: 0,
        // synchronizeAzureUsersIntervalSeconds: 0,
        // uIDiagnosticLogViewersId: emptyStr, // !!!!!
        workflowHandlerTimeBasedProcessorMaxDegreeOfParallelism: parseInt(formData.get("workflowHandlerTimeBasedProcessorMaxDegreeOfParallelism") as string) || undefined,
        workflowHandlerAsyncOperationsProcessorMaxDegreeOfParallelism: parseInt(formData.get("workflowHandlerAsyncOperationsProcessorMaxDegreeOfParallelism") as string) || undefined,
        // workflowHandlerConfigTransferDate: new Date(2025,12,20)
     }
debugger
     const response = await SystemSettingsService.updateSystemSettings(systemSettings);
     return response;
}

export async function createSystemSettings (formData: FormData) {
    // const systemSettings: SystemSettingsForCreate = {

    // }
}
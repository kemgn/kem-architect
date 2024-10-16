import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput, Toggle } from '@ims/component-library'
import Accordion from "@/app/(components)/Accordion/Accordion"
import "@/app/(components)/_ComponentStyles/globalstyles.css";
import { Accordions } from './Accordions';
import { Inputs } from './TextInputs';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { updateSystemSettings } from '../action';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ClientUILog, ColorTheme, DiagnosticFormulaLoggingMode, LogMode, SystemSettings } from '@/models/Entities/SystemSettings';
import { SystemSettingsService } from '@/services/SystemSettings';
import localstyle from './SystemSettings.module.css';
import { useToast } from '@/ToastAlertProvider';
import { alertSeverity } from '@/models/Enums/Enums';
import { messages } from '@/AlertMessages';
import dayjs, { Dayjs } from 'dayjs';
import { globalFilterGroupOptions } from './globalFilterGroupOptions';
import { GroupService } from '@/services/Group';
import LanguageSelect from '@/app/(components)/Form/Fields/LanguageSelect';

export const zeroBit = 0;

export default function SystemSettings() {

    const [systemSetting, setSystemSetting] = useState<SystemSettings>();
    const [globalFilterOptions, setGlobalFilterOptions] = useState<globalFilterGroupOptions[]>();
    const [isLoading, setIsLoading] = useState(true);


    const { showToastAlert } = useToast();

    const accordionStyle: React.CSSProperties | undefined = { display: 'flex', flexDirection: 'row' };
    const rightSideSection: React.CSSProperties | undefined = { marginLeft: '5%' };
    const expireDate: React.CSSProperties = { width: '100%', height: '100%' };
    const textInputSize = 'medium';
    const labelField = 'labelb';
    const valueField = 'valuea';
    const buttonLabel = 'Save';
    const buttonType = 'submit';
    const buttonColor = "primary";
    const pageTitle = "System Settings";

    const uilogOptions = [
        {
            valuea: "formlog",
            labelb: "Form Log"
        },
    ]
    const colorThemeOptions = [
        {
            valuea: ColorTheme.Default.toString(),
            labelb: "Default",
        },
        {
            valuea: ColorTheme.Red.toString(),
            labelb: "Red",
        },
    ]
    const logmodeOptions = [
        {
            value: LogMode.DEFAULT,
            label: "Default"
        },
        {
            value: LogMode.FULL,
            label: "Full"
        },
        {
            value: LogMode.OFF,
            label: "Off"
        },
        {
            value: LogMode.STANDARD,
            label: "Standart"
        },
    ]
    const diagnosticLogmodeOpions = [
        {
            valuea: DiagnosticFormulaLoggingMode.DoNotLog.toString(),
            labelb: "Do not log"
        },
        {
            valuea: DiagnosticFormulaLoggingMode.LogEventsAndStackTrace.toString(),
            labelb: "Log Events and Stack Trace"
        },
        {
            valuea: DiagnosticFormulaLoggingMode.LogEventsOnly.toString(),
            labelb: "Log Events Only"
        },
    ]

    const getAllGroups = async () => {
        const response = await GroupService.getAllGroups();
        setGlobalFilterOptions(response.map((group) => {
            return {
                labelb: group.systemName,
                valuea: group.id
            }
        }
        ))
    }

    useEffect(() => {
        getSystemSettings();
        getAllGroups();
        // set_GlobalFilterGroupOptions(props.globalFilterGroups)
    }, [])

    const getSystemSettings = async () => {
        setIsLoading(true); // Set loading to false once data is fetched
        const response = await SystemSettingsService.getSystemSettings();
        if (response.isSuccess) {
            debugger
            setSystemSetting(response.data);
        }
        setIsLoading(false); // Set loading to false once data is fetched
    }



    // const filterHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const elements = document.querySelectorAll(`[data-attribute*="${event.currentTarget.value}"]`);
    // }

    // const filterHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const elements = document.querySelectorAll(`[data-attribute]`);
    //     const filterText = event.currentTarget.value.toLowerCase();
    //     elements.forEach(element => {
    //         const dataAttributeValue = element.getAttribute('data-attribute')?.toLowerCase() || '';
    //         if (dataAttributeValue.includes(filterText)) {
    //             (element as HTMLElement).style.display = 'block';
    //         } else {
    //             (element as HTMLElement).style.display = 'none';
    //         }
    //     });
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!!systemSetting) {
            const result = await updateSystemSettings(formData, systemSetting?.id);
            if (result.isSuccess) {
                showToastAlert(alertSeverity.success, messages.updateSystemSettingSuccess.content, messages.updateSystemSettingSuccess.title);
            }
            else {
                showToastAlert(alertSeverity.error, messages.updateSystemSettingError.content, messages.updateSystemSettingError.title);
            }
            getSystemSettings();
        }
    }

    function getGlobalFilterGroup() {
        const globalfiltergroup = globalFilterOptions && globalFilterOptions.find(group => group.valuea === systemSetting?.userSearchFilterGroupId)?.labelb;
        return globalfiltergroup;
    }
    return (
        <>
            {isLoading ? (
                <p>Loading...</p> // Show loading state
            ) : (
                <div className="inputContainer">
                    <form onSubmit={handleSubmit}>
                        <div className={globalStyles.headerButtonGroup}>
                            <PageHeader pageTitle={pageTitle} />
                            <Button
                                label={buttonLabel}
                                color={buttonColor}
                                type={buttonType}
                                loading={false}
                            />

                        </div>
                        <Accordion title={Accordions.AccordionGeneralSettings.title} id={Accordions.AccordionGeneralSettings.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput
                                        name={Inputs.applicationURL.name}
                                        dataAttribute={Inputs.applicationURL.dataAttribute}
                                        label={Inputs.applicationURL.label}
                                        size={textInputSize}
                                        defaultValue={systemSetting?.applicationURL}
                                        disabled={Inputs.applicationURL.disabled}
                                    />
                                    <TextInput dataAttribute={Inputs.emailHandlerURL.dataAttribute} label={Inputs.emailHandlerURL.label} size={textInputSize} defaultValue={systemSetting?.emailHandlerURL} disabled={Inputs.emailHandlerURL.disabled} />
                                    <TextInput dataAttribute={Inputs.workflowHandlerURL.dataAttribute} label={Inputs.workflowHandlerURL.label} size={textInputSize} defaultValue={systemSetting?.workflowHandlerURL} disabled={Inputs.workflowHandlerURL.disabled} />
                                </div>
                                <div style={rightSideSection}>
                                    <Toggle dataAttribute={Inputs.anonymousLinkAccess.dataAttribute} label={Inputs.anonymousLinkAccess.label} id={Inputs.anonymousLinkAccess.id} name={Inputs.anonymousLinkAccess.name} defaultChecked={systemSetting?.enableAnonymousLinkAccess} />
                                    <TextInput name={Inputs.defaultImportChunkPageSize.name} dataAttribute={Inputs.defaultImportChunkPageSize.dataAttribute} label={Inputs.defaultImportChunkPageSize.label} size={textInputSize} type='number' defaultValue={systemSetting?.defaultImportChunkSize} />
                                    <TextInput name={Inputs.storedProceduresTimeoutSeconds.name} dataAttribute={Inputs.storedProceduresTimeoutSeconds.dataAttribute} label={Inputs.storedProceduresTimeoutSeconds.label} size={textInputSize} type='number' defaultValue={systemSetting?.storedProcContextCommandTimeout} />
                                    <TextInput label={"Max password length"} size={textInputSize} defaultValue={systemSetting?.passwordPolicy_MaxPasswordLength} name="passwordPolicy_MaxPasswordLength" />
                                </div>
                            </div>}
                        ></Accordion>
                        <Accordion title={Accordions.AccordionLicenceInformation.title} id={Accordions.AccordionLicenceInformation.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput name={Inputs.domainName.name} dataAttribute={Inputs.domainName.dataAttribute} label={Inputs.domainName.label} size={textInputSize} defaultValue={Inputs.domainName.defaultValue} disabled={Inputs.domainName.disabled} />
                                    <TextInput name={Inputs.machineName.name} dataAttribute={Inputs.machineName.dataAttribute} label={Inputs.machineName.label} size={textInputSize} defaultValue={Inputs.machineName.defaultValue} disabled={Inputs.machineName.disabled} />
                                    <TextInput name={Inputs.entityName.name} dataAttribute={Inputs.entityName.dataAttribute} label={Inputs.entityName.label} size={textInputSize} defaultValue={Inputs.entityName.defaultValue} disabled={Inputs.entityName.disabled} />
                                </div>
                                <div style={rightSideSection}>
                                    <TextInput name={Inputs.licenceExpireDate.name} dataAttribute={Inputs.licenceExpireDate.dataAttribute} label={Inputs.licenceExpireDate.label} size={textInputSize} defaultValue={Inputs.licenceExpireDate.defaultValue} disabled={Inputs.licenceExpireDate.disabled} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker name={Inputs.handlersExpireDate.name} data-Attribute={Inputs.handlersExpireDate.dataAttribute} label={Inputs.handlersExpireDate.label} disabled={Inputs.handlersExpireDate.disabled} sx={expireDate} defaultValue={dayjs(systemSetting?.licenceExtendedExpirationDate)} />
                                        {/* TextInputs.handlersExpireDate.disabled */}
                                    </LocalizationProvider>
                                </div>
                            </div>}
                        ></Accordion>
                        <Accordion title={Accordions.AccordionVisualSettings.title} id={Accordions.AccordionVisualSettings.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    {/* <Select
                                    id={Inputs.defaultLanguage.id}
                                    values={defaultLanguageOptions}
                                    label={Inputs.defaultLanguage.label}
                                    labelField={labelField}
                                    valueField={valueField}
                                    dataAttribute={Inputs.defaultLanguage.dataAttribute}
                                    name={Inputs.defaultLanguage.name}
                                    defaultValue={systemSetting?.defaultLanguage}
                                /> */}
                                    <LanguageSelect label="Default language" name={Inputs.defaultLanguage.name} languageId={systemSetting?.defaultLanguage} />
                                    <TextInput name={Inputs.applicationTitle.name} dataAttribute={Inputs.applicationTitle.dataAttribute} label={Inputs.applicationTitle.label} size={textInputSize} defaultValue={systemSetting?.applicationTitle ?? Inputs.applicationTitle.defaultValue} />
                                    <Select
                                        id={Inputs.colorTheme.id}
                                        name={Inputs.colorTheme.name}
                                        label={Inputs.colorTheme.label}
                                        values={colorThemeOptions}
                                        labelField={labelField}
                                        valueField={valueField}
                                        dataAttribute={Inputs.colorTheme.dataAttribute}
                                        defaultValue={systemSetting?.colorTheme as unknown as string ?? ColorTheme.Default}
                                    />
                                </div>
                                <div style={rightSideSection}>
                                    <Toggle dataAttribute={Inputs.showLogoutButtonOnBanner.dataAttribute} label={Inputs.showLogoutButtonOnBanner.label} id={Inputs.showLogoutButtonOnBanner.id} name={Inputs.showLogoutButtonOnBanner.name} defaultChecked={systemSetting?.showLogoutButtonOnBanner ?? Inputs.showLogoutButtonOnBanner.defaultChecked} />
                                    <Toggle dataAttribute={Inputs.showLogoutButtonLabelOnBanner.dataAttribute} label={Inputs.showLogoutButtonLabelOnBanner.label} id={Inputs.showLogoutButtonLabelOnBanner.id} name={Inputs.showLogoutButtonLabelOnBanner.name} defaultChecked={systemSetting?.showLogoutButtonLabelOnBanner} />
                                    <Toggle dataAttribute={Inputs.enableExecuteQueryTool.dataAttribute} label={Inputs.enableExecuteQueryTool.label} id={Inputs.enableExecuteQueryTool.id} name={Inputs.enableExecuteQueryTool.name} defaultChecked={systemSetting?.enableExecuteQueryTool} />
                                    {/* Toggles.enableExecuteQueryTool.name'in propertysini yok ama uida var */}
                                </div>
                            </div>}
                        ></Accordion>
                        <Accordion title={Accordions.AccordionDiagnosticErrorReporting.title} id={Accordions.AccordionDiagnosticErrorReporting.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput name={Inputs.eventLogViewerPageSize.name} dataAttribute={Inputs.eventLogViewerPageSize.dataAttribute} label={Inputs.eventLogViewerPageSize.label} size={textInputSize} type='number' defaultValue={systemSetting?.eventLogViewerPageSize ?? Inputs.eventLogViewerPageSize.defaultValue} />
                                    <TextInput name={Inputs.errorReportAdress.name} dataAttribute={Inputs.errorReportAdress.dataAttribute} label={Inputs.errorReportAdress.label} size={textInputSize} defaultValue={systemSetting?.errorReportTo ?? Inputs.errorReportAdress.defaultValue} />
                                    <Select
                                        name={Inputs.logMode.name}
                                        values={logmodeOptions}
                                        label={Inputs.logMode.label}
                                        dataAttribute={Inputs.logMode.dataAttribute}
                                        defaultValue={systemSetting?.logMode?.toString()}
                                    // value={kek?.toString()}
                                    />
                                    <Select
                                        id={Inputs.diagnosticLogmode.id}
                                        name={Inputs.diagnosticLogmode.name}
                                        values={diagnosticLogmodeOpions}
                                        label={Inputs.diagnosticLogmode.label}
                                        labelField={labelField}
                                        valueField={valueField}
                                        dataAttribute={Inputs.diagnosticLogmode.dataAttribute}
                                        defaultValue={systemSetting?.formulaDiagnosticLogMode as unknown as string}
                                    />
                                    {/* <Select
                                        id={Inputs.clientUilogs.id}
                                        name={Inputs.clientUilogs.name}
                                        values={uilogOptions}
                                        label={Inputs.clientUilogs.label}
                                        labelField={labelField}
                                        valueField={valueField}
                                        dataAttribute={Inputs.clientUilogs.dataAttribute}
                                    // defaultValue={systemSetting?.clientUILogs}
                                    /> */}
                                    <div className={localstyle.titlewithlines}>
                                        <hr />
                                        <span>Client Ui Logs</span>
                                        <hr />
                                    </div>
                                    <Toggle dataAttribute={Inputs.formLog.dataAttribute} label={Inputs.formLog.label} id={Inputs.formLog.id} name={Inputs.formLog.name} defaultChecked={systemSetting?.clientUILogs ? (systemSetting.clientUILogs & ClientUILog.FormLog) !== zeroBit : false} />
                                    <Toggle dataAttribute={Inputs.viewLog.dataAttribute} label={Inputs.viewLog.label} id={Inputs.viewLog.id} name={Inputs.viewLog.name} defaultChecked={systemSetting?.clientUILogs ? (systemSetting.clientUILogs & ClientUILog.ViewLog) !== zeroBit : false} />
                                    <Toggle dataAttribute={Inputs.saveLog.dataAttribute} label={Inputs.saveLog.label} id={Inputs.saveLog.id} name={Inputs.saveLog.name} defaultChecked={systemSetting?.clientUILogs ? (systemSetting.clientUILogs & ClientUILog.SaveLog) !== zeroBit : false} />
                                </div>
                                <div style={rightSideSection}>
                                    <Toggle dataAttribute={Inputs.runHealthCheckToolsOnArchitectLoad.dataAttribute} label={Inputs.runHealthCheckToolsOnArchitectLoad.label} id={Inputs.runHealthCheckToolsOnArchitectLoad.id} name={Inputs.runHealthCheckToolsOnArchitectLoad.name} defaultChecked={systemSetting?.runToolsOnArchitectLoad} />
                                    <Toggle dataAttribute={Inputs.enableEmailReference.dataAttribute} label={Inputs.enableEmailReference.label} id={Inputs.enableEmailReference.id} name={Inputs.enableEmailReference.name} defaultChecked={systemSetting?.enableEmailReference} />
                                    <Toggle dataAttribute={Inputs.enableFormReference.dataAttribute} label={Inputs.enableFormReference.label} id={Inputs.enableFormReference.id} name={Inputs.enableFormReference.name} defaultChecked={systemSetting?.enableFormReference ?? Inputs.enableFormReference.defaultChecked} />
                                    <Toggle dataAttribute={Inputs.enableApplicationDiagnosticLog.dataAttribute} label={Inputs.enableApplicationDiagnosticLog.label} id={Inputs.enableApplicationDiagnosticLog.id} name={Inputs.enableApplicationDiagnosticLog.name} defaultChecked={systemSetting?.enableApplicationDiagnosticLog ?? Inputs.enableApplicationDiagnosticLog.defaultChecked} />
                                    <Toggle dataAttribute={Inputs.enableSessionTimeoutLog.dataAttribute} label={Inputs.enableSessionTimeoutLog.label} id={Inputs.enableSessionTimeoutLog.id} name={Inputs.enableSessionTimeoutLog.name} defaultChecked={systemSetting?.enableSessionTimeoutLog} />
                                    <Toggle dataAttribute={Inputs.enableVerboseCacheLog.dataAttribute} label={Inputs.enableVerboseCacheLog.label} id={Inputs.enableVerboseCacheLog.id} name={Inputs.enableVerboseCacheLog.name} defaultChecked={systemSetting?.enableVerboseCacheLog} />
                                </div>
                            </div>}
                        ></Accordion>
                        <Accordion title={Accordions.AccordionSessionAndActiveDirectory.title} id={Accordions.AccordionSessionAndActiveDirectory.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <Toggle dataAttribute={Inputs.ignoreDisabledActiveDirectoryUsers.dataAttribute} label={Inputs.ignoreDisabledActiveDirectoryUsers.label} id={Inputs.ignoreDisabledActiveDirectoryUsers.id} name={"ignoreDisabledUsers"} defaultChecked={systemSetting?.ignoreDisabledActiveDirectoryUsers} />
                                    <Toggle dataAttribute={Inputs.disableAutoSearchUsersOnInput.dataAttribute} label={Inputs.disableAutoSearchUsersOnInput.label} id={Inputs.disableAutoSearchUsersOnInput.id} name={Inputs.disableAutoSearchUsersOnInput.name} defaultChecked={systemSetting?.disableAutoSearchUsersOnInput} />
                                    <Toggle dataAttribute={Inputs.enforceSingleActivePlatformSession.dataAttribute} label={Inputs.enforceSingleActivePlatformSession.label} id={Inputs.enforceSingleActivePlatformSession.id} name={Inputs.enforceSingleActivePlatformSession.name} defaultChecked={systemSetting?.enforceSingleActivePlatformSession} />
                                    <Toggle dataAttribute={Inputs.enforceSingleActiveArchitectSession.dataAttribute} label={Inputs.enforceSingleActiveArchitectSession.label} id={Inputs.enforceSingleActiveArchitectSession.id} name={Inputs.enforceSingleActiveArchitectSession.name} defaultChecked={systemSetting?.enforceSingleActiveArchitectSession} />
                                </div>
                                <div>
                                    <TextInput name="activeDirectorySearchTimeoutMiliSeconds" dataAttribute={Inputs.userSearchTimeout.dataAttribute} label={Inputs.userSearchTimeout.label} size={textInputSize} defaultValue={systemSetting?.activeDirectorySearchTimeoutMiliSeconds} type='number' />
                                    <TextInput name="sessionTimeoutWarningMinutes" dataAttribute={Inputs.sessionTimeoutWarning.dataAttribute} label={Inputs.sessionTimeoutWarning.label} size={textInputSize} type='number' defaultValue={systemSetting?.sessionTimeoutWarningMinutes} />
                                    <TextInput name="userSearchLimit" label={"User search limit"} size={textInputSize} type='number' defaultValue={systemSetting?.userSearchLimit} />
                                    <TextInput dataAttribute={Inputs.userSearchInputDelay.dataAttribute} label={Inputs.userSearchInputDelay.label} size={textInputSize} defaultValue={systemSetting?.userSearchInputDelayMiliseconds} type='number' name="userSearchInputDelayMiliseconds" />
                                    <Select
                                        id={Inputs.globalFilter.id}
                                        name={Inputs.globalFilter.name}
                                        values={globalFilterOptions}
                                        label={Inputs.globalFilter.label}
                                        labelField={labelField}
                                        valueField={valueField}
                                        dataAttribute={Inputs.globalFilter.dataAttribute}
                                        defaultValue={systemSetting?.userSearchFilterGroupId}
                                    />
                                    {/* <Select
                            id='adUsersPeriod'
                            values={adUsersPeriodOptions}
                            label='Synchronize AD Users Period'
                            labelField="labelb"
                            valueField="valuea"
                        /> */}
                                    <div>

                                    </div>
                                </div>
                            </div>}
                        ></Accordion>
                        <Accordion title={Accordions.AccordionEmailHandler.title} id={Accordions.AccordionEmailHandler.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput name={Inputs.sMTPServerPort.name} dataAttribute={Inputs.sMTPServerPort.dataAttribute} label={Inputs.sMTPServerPort.label} size={textInputSize} defaultValue={systemSetting?.smtpServerPort} type='number' />
                                    <TextInput name={Inputs.sMTPServer.name} dataAttribute={Inputs.sMTPServer.dataAttribute} label={Inputs.sMTPServer.label} size={textInputSize} defaultValue={systemSetting?.smtpServer} />
                                    <TextInput name={Inputs.formEmailAdressDefault.name} dataAttribute={Inputs.formEmailAdressDefault.dataAttribute} label={Inputs.formEmailAdressDefault.label} size={textInputSize} defaultValue={systemSetting?.defaultEmailAddress} />
                                    <div className={localstyle.period}>
                                        <TextInput name={"emailHandlerExecutePeriodSecond"} dataAttribute={Inputs.executionPeriodYears.dataAttribute} label={"Execution period seconds"} size={textInputSize} defaultValue={systemSetting?.emailHandlerExecutePeriodSeconds} type='number' />
                                    </div>
                                    <div className={localstyle.period}>
                                        <TextInput name={"emailHandlerRetryPeriodSeconds"} dataAttribute={Inputs.retryPeriodSeconds.dataAttribute} label={"Retry period seconds"} size={textInputSize} defaultValue={systemSetting?.emailHandlerRetryPeriodSeconds} type='number' />
                                    </div>
                                    <TextInput name={Inputs.maxRetry.name} dataAttribute={Inputs.maxRetry.dataAttribute} label={Inputs.maxRetry.label} size={textInputSize} defaultValue={systemSetting?.emailHandlerMaxRetryCount} type='number' />
                                </div>
                            </div>}
                        ></Accordion>

                        <Accordion title={Accordions.AccordionWorkflowHandler.title} id={Accordions.AccordionWorkflowHandler.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput name={"workflowHandlerExecutePeriodSeconds"} dataAttribute={Inputs.executionPeriodYearsWorkflowHandler.dataAttribute} label={"Execution period seconds"} size={textInputSize} defaultValue={systemSetting?.workflowHandlerExecutePeriodSeconds} type='number' />
                                    <TextInput name={"workflowHandlerTimeBasedProcessorMaxDegreeOfParallelism"} dataAttribute={Inputs.formEmailAdressDefault.dataAttribute} label={"Time based processor max degree of parallelism"} size={textInputSize} defaultValue={systemSetting?.workflowHandlerTimeBasedProcessorMaxDegreeOfParallelism} type="number" />
                                    <TextInput name={"workflowHandlerAsyncOperationsProcessorMaxDegreeOfParallelism"} dataAttribute={Inputs.formEmailAdressDefault.dataAttribute} label={"Async operations processor max degree of parallelism"} size={textInputSize} defaultValue={systemSetting?.workflowHandlerAsyncOperationsProcessorMaxDegreeOfParallelism} type="number" />
                                </div>
                            </div>
                        }
                        ></Accordion>
                        <Accordion title={Accordions.AccordionExportTasks.title} id={Accordions.AccordionExportTasks.id} content={
                            <div style={accordionStyle}>
                                <div>
                                    <TextInput name={Inputs.completedTasksMaxAge.name} dataAttribute={Inputs.completedTasksMaxAge.dataAttribute} label={Inputs.completedTasksMaxAge.label} size={textInputSize} defaultValue={systemSetting?.exportTaskDownloadedMaxAge} type='number' />
                                    <TextInput name={Inputs.absoluteMaxAge.name} dataAttribute={Inputs.absoluteMaxAge.dataAttribute} label={Inputs.absoluteMaxAge.label} size={textInputSize} defaultValue={systemSetting?.exportTaskMaxAge} type='number' />
                                </div>
                            </div>}
                        ></Accordion>
                    </form>
                </div>
            )
            }
        </>
    )
}


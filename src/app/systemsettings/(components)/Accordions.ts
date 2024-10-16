export interface IAccordion {
    [accordion: string]: {
        title:  string;
        id:     string;
    }
}

export const Accordions:IAccordion = {
    AccordionGeneralSettings: {
        title:  "General settings",
        id:     "generalSettings",
    },
    AccordionLicenceInformation: {
        title:   "Licence information",
        id:      "licenceInfo"         
    },
    AccordionVisualSettings: {
        title:   "Visual Settings",
        id:      "visualSettings"         
    },
    AccordionDiagnosticErrorReporting: {
        title:    "Diagnostics & Error Reporting",
        id:       "DiagnosticsErrorReporting"
    },
    AccordionSessionAndActiveDirectory: {
        title:    "Session and Active Directory",
        id:       "sessionActiveDirectory"
    },
    AccordionEmailHandler: {
        title:    "EmailHandler",
        id:       "emailHandler"
    },
    AccordionWorkflowHandler: {
        title:      'Workflow Handler',
        id:         'workflowHandler'
    },
    AccordionExportTasks: {
        title:    "ExportTasks",
        id:       "exportTask"
    },

}


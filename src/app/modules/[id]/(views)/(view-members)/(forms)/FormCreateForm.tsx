
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Button, FormFooter, Select, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from 'react'
import Box from "@mui/material/Box";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { DataContractService } from '@/services/DataContract';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { ColumnSummaryFunction, DataContract, DataContractForCreate, DataContractForUpdate, DataContractPropertyForCreate, DataContractUIPropertiesForUpdate, EditorResizeMode, ExportMode, FileAccessConfigurationMode, FormPropertyForCreate, FormUsage, HistoryLogViewMode, HtmlDisplayMode, HtmlHeaderMode, HtmlShowMode, UsageScope, ViewPropertyExportModeType } from '@/models/Entities/DataContract';
import "@/app/(components)/_ComponentStyles/globalstyles.css";
import { messages } from '@/AlertMessages';
import { useToast } from '@/ToastAlertProvider';
import { ArchitectDataContext } from '@/app/(components)/_Contexts/ArchitectDataContext';
import { HistoryLogPlacementMode } from '@/models/Enums/Enums';
import styles from "../views.module.css";
import { FormsContext } from './FormsContext';
import { ArrangeLabelsPack } from '@/utils/Helpers';

const formUsage: EnumForSelect[] = [
    {
        label: "Readonly",
        value: FormUsage.Readonly,
    },
    {
        label: "Create",
        value: FormUsage.Create,
    },
    {
        label: "Edit",
        value: FormUsage.Edit,
    },
    {
        label: "Create & Edit",
        value: FormUsage.Create + FormUsage.Edit,
    }
]
const historyLogViewOptions: EnumForSelect[] = [
    {
        label: "Standard",
        value: HistoryLogViewMode.Standard,
    },
    {
        label: "Time flow",
        value: HistoryLogViewMode.TimeFlow,
    },
]
const historyLogPlacementMode: EnumForSelect[] = [
    {
        label: "Do not show",
        value: HistoryLogPlacementMode.DoNotShow
    },
    {
        label: "Add button",
        value: HistoryLogPlacementMode.AddButton
    },
    {
        label: "Add content",
        value: HistoryLogPlacementMode.AddContent
    }
]

const editorResizeMode= [
    {
        value: EditorResizeMode.NotResizable,
        label: "Not resizable"
    },
    {
        value: EditorResizeMode.Resizable,
        label: "Resizable"
    },
    {
        value: EditorResizeMode.Grow,
        label: "Auto grow/shrink"
    },
];
interface ViewCreateFormProps {
    onClose: Function;
    form?: DataContractForUpdate;
    // onSuccessfulFormSubmit: Function;
}
export default function FormCreateForm(props: ViewCreateFormProps) {
    const [open, setOpen] = useState(true);
    const [createDataContractLoading, setCreateDataContractLoading] = useState<boolean>(false);
    const { showToastAlert } = useToast();

    const formsContext = useContext(FormsContext);
    if (!formsContext) {
        throw new Error("formsContext must be used within a FormsContextProvider");
    }
    const { selectedForm, setSelectedForm } = formsContext;

    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { formDataContracts, setFormDataContracts, selectedView, moduleId, refreshAllDataContracts } = dataContractsContext;

    const architectData = useContext(ArchitectDataContext);
    if (!architectData) {
        throw new Error("architectData must be used within a architectDataProvider");
    }
    const { modules } = architectData;


    const properties = modules.find(x => x.id === moduleId)?.properties;
    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    // const isUpdate = !!props.groupData;
    const labelFieldsPrefix = "formLabel";
    const languages = useContext(LanguagesContext);
    const isUpdate = !!props.form;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setCreateDataContractLoading(true);
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const viewId = selectedView?.id;
            const form: DataContractForUpdate = {
                parentDataContractId: viewId,
                allowGettingDirectLink: false,
                allowGettingDirectLink_AllCharts: false,
                allowSavingViewState: false,
                cellCssStyle: "",
                exportHeaderBgColor: "#ff0000",
                exportHeaderTextColor: "#ffffff",
                exportMode: ExportMode.SyncDownload,
                filterAvailableInitially: false,
                headerCssStyle: "",
                helpID: "",
                helpItemID: "",
                helpNavigationPreference: 0,
                hideBottomBar: false,
                hideTopBar: false,
                hideViewChangeCombo: false,
                htmlHeaderMode: HtmlHeaderMode.DoNotRepeat,
                chunkCapacity: 50,
                pageSize: 25,
                rowAlternateColor: "",
                showBulkUpdateButtonLabel: false,
                showCalendarButtonLabel: false,
                showChartButton: false,
                showChartsButtonLabel: false,
                showFilterButtonLabel: false,
                showHelpButtonLabel: false,
                showImportExportButtonLabel: false,
                showInViewChangeCombo: true,
                showRecordHistoryButtonLabel: (formData.get("showRecordHistoryButtonLabel") as string === "on" ? true : false),
                showRefreshButtonLabel: false,
                showSortButton: false,
                showSortButtonLabel: false,
                showSummary: false,
                systemName: formData.get("systemName") as string,
                usageScopeType: UsageScope.MainGrid,
                allowLocalFiltering: true,
                bigIconPath: "",
                disableGridEditing: true,
                hideHeaders: false,
                historyLogViewMode: parseInt(formData.get("historyLogViewMode") as string),
                iconPath: "",
                showDeleteButtonInTopBar: false,
                showDeleteCommandInGridCommands: false,
                showInstanceId: false,
                singleClickToEdit: false,
                splitCharts: false,
                labels: languages?.map(language => {
                    return {
                        LanguageID: language.id,
                        Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                        Description: "",
                    }
                }) || [],

                allowDownloadingPDF: (formData.get("allowDownloadingPDF") as string === "on" ? true : false),
                pdfLandscapePageOrientation: (formData.get("pdfLandscapePageOrientation") as string === "on" ? true : false),
                allowWindowResize: (formData.get("allowWindowResize") as string === "on" ? true : false),
                hideFromMainView: (formData.get("hideFromMainView") as string === "on" ? true : false),
                hideInitially: (formData.get("hideInitially") as string === "on" ? true : false),
                isMaximizable: (formData.get("isMaximizable") as string === "on" ? true : false),
                isMaximized: (formData.get("isMaximized") as string === "on" ? true : false),
                showInBarCommandGroup: (formData.get("showInBarCommandGroup") as string === "on" ? true : false),
                showInBarCommands: (formData.get("showInBarCommands") as string === "on" ? true : false),
                showInGridCommands: (formData.get("showInGridCommands") as string === "on" ? true : false),
                showInGridContextMenu: (formData.get("showInGridContextMenu") as string === "on" ? true : false),
                historyLogPlacementMode: parseInt(formData.get("historyLogPlacementMode") as string),
                htmlLabelColumnWidthPercentage: parseInt(formData.get("htmlLabelColumnWidthPercentage") as string),
                height: parseInt(formData.get("height") as string) || undefined,
                maxHeight: parseInt(formData.get("maxHeight") as string) || undefined,
                maxWidth: parseInt(formData.get("maxWidth") as string) || undefined,
                minHeight: parseInt(formData.get("minHeight") as string) || undefined,
                minWidth: parseInt(formData.get("minWidth") as string) || undefined,
                defaultDisplayPropertyId: formData.get("defaultDisplayPropertyId") as string,
                formUsage: parseInt(formData.get("formUsage") as string),
                width: parseInt(formData.get("width") as string),

            }
            let createdDataContract;
            debugger;
            if (!isUpdate) {
                createdDataContract = await DataContractService.createDataContract(form as unknown as DataContractForCreate, dataContractsContext.moduleId)
                if (formDataContracts) {
                    setFormDataContracts([...formDataContracts, createdDataContract]);
                } else {
                    setFormDataContracts([createdDataContract]);
                }
            } else {
                form.id = formData.get("id") as string;
                // form.labels = {
                //     updated: languages?.map(language => {
                //         return {
                //             Id: (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
                //             LanguageID: language.id,
                //             Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                //             Description: "",
                //         }
                //     }) || []
                // }
                debugger;
                if (languages) {
                    form.labels = ArrangeLabelsPack(formData, labelFieldsPrefix, languages);
                }

                createdDataContract = await DataContractService.updateDataContract(form);
            }


            setSelectedForm(createdDataContract);
            refreshAllDataContracts(moduleId);
            setCreateDataContractLoading(false);
            props.onClose();
            setOpen(false);
            showToastAlert(messages.createFormSuccess.severity, messages.createFormSuccess.content, messages.createFormSuccess.title);

        } catch (error) {
            setCreateDataContractLoading(false);
            showToastAlert(messages.createFormError.severity, messages.createFormError.content, messages.createFormError.title);
        }
    }
    debugger
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal} sx={{ width: "700px !important" }}>
                    <FormHeader title={"Create form"} variant="h5" />
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <div className={styles.formContainer}>

                                <div className={styles.formLeftContainer}>
                                    <TextInput id="systemName" name="systemName" label="System name" type="string" size="medium" defaultValue={props.form?.systemName} />
                                    <LabelFields namePrefix={labelFieldsPrefix} labels={props.form?.labels}/>

                                    <Select
                                        values={formUsage}
                                        label="Usage scope"
                                        name="formUsage"
                                        defaultValue={props.form?.formUsage.toString() || FormUsage.Readonly.toString()}
                                    />
                                    <Select
                                        label="Default display property"
                                        values={properties?.filter((x) => {
                                            const valueType = x.id.split(':').pop() || "";
                                            return ["AutoCode", "Subject", "String"].includes(valueType);
                                        })}
                                        name="defaultDisplayPropertyId"
                                        labelField="systemName"
                                        valueField="id"
                                        defaultValue={props.form?.defaultDisplayPropertyId}
                                    />
                                    <Select
                                        values={historyLogPlacementMode}
                                        label="History log placement"
                                        name="historyLogPlacementMode"
                                        defaultValue={props.form?.historyLogPlacementMode.toString() || HistoryLogPlacementMode.DoNotShow.toString()}
                                    />
                                     
                                    <Select
                                        values={historyLogViewOptions}
                                        label="History Log View"
                                        name="historyLogViewMode"
                                        defaultValue={props.form?.historyLogViewMode.toString() || HistoryLogViewMode.Standard.toString()}
                                    />
                                    <TextInput
                                        label="Width"
                                        size="medium"
                                        name="width"
                                        defaultValue={props.form?.width || "800"}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Max width"
                                        size="medium"
                                        name="maxWidth"
                                        defaultValue={props.form?.maxWidth}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Min width"
                                        size="medium"
                                        name="minWidth"
                                        defaultValue={props.form?.minWidth}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Height"
                                        size="medium"
                                        name="height"
                                        defaultValue={props.form?.height}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Min height"
                                        size="medium"
                                        name="minHeight"
                                        defaultValue={props.form?.minHeight}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Max height"
                                        size="medium"
                                        name="maxHeight"
                                        defaultValue={props.form?.maxHeight}
                                        type="number"
                                    />
                                    <TextInput
                                        label="Label column width %"
                                        size="medium"
                                        name="htmlLabelColumnWidthPercentage"
                                        defaultValue={props.form?.htmlLabelColumnWidthPercentage || "20"}
                                        type="number"
                                    />
                                </div>

                                <div className={styles.formRightContainer}>


                                    <Toggle
                                        name={"isMaximizable"}
                                        label="Maximizable"
                                        defaultChecked={props.form?.isMaximizable === undefined ? true : props.form?.isMaximizable}
                                    />
                                    <Toggle
                                        name={"isMaximized"}
                                        label="Maximized"
                                        defaultChecked={props.form?.isMaximized}
                                    />
                                    <Toggle
                                        name={"allowWindowResize"}
                                        label="Allow window resize"
                                        defaultChecked={props.form?.allowWindowResize === undefined ? true : props.form?.allowWindowResize}
                                    />
                                    <Toggle
                                        name={"showInGridCommands"}
                                        label="Show in grid commands"
                                        defaultChecked={props.form?.showInGridCommands}
                                    />

                                    <Toggle
                                        name={"showInBarCommands"}
                                        label="Show in bar commands"
                                        defaultChecked={props.form?.showInBarCommands === undefined ? true : props.form?.showInBarCommands}
                                    />
                                    <Toggle
                                        name={"showInBarCommandGroup"}
                                        label="Show in bar command group"
                                        defaultChecked={props.form?.showInBarCommandGroup}
                                    />
                                    <Toggle
                                        name={"showInGridContextMenu"}
                                        label="Show in grid context menu"
                                        defaultChecked={props.form?.showInGridContextMenu ? true : props.form?.showInGridContextMenu}
                                    />
                                    <Toggle
                                        name={"hideInitially"}
                                        label="Hide initially"
                                        defaultChecked={props.form?.hideInitially}
                                    />
                                    <Toggle
                                        name={"hideFromMainView"}
                                        label="Hide from main view"
                                        defaultChecked={props.form?.hideFromMainView}
                                    />
                                    <Toggle
                                        name={"showRecordHistoryButtonLabel"}
                                        label="Show record history button label"
                                        defaultChecked={props.form?.showRecordHistoryButtonLabel}
                                    />
                                    <Toggle
                                        name={"allowDownloadingPDF"}
                                        label="Allow download as pdf file"
                                        defaultChecked={props.form?.allowDownloadingPDF}
                                    />
                                    <Toggle
                                        name={"pdfLandscapePageOrientation"}
                                        label="Landscape PDF page orientation"
                                        defaultChecked={props.form?.pdfLandscapePageOrientation}
                                    />
                                </div>
                                <div className="display-none">
                                    <TextInput defaultValue={props.form?.id} name="id" />
                                    {languages?.map(language => (
                                        <TextInput key={language.id} id={language.id} defaultValue={props.form?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                    ))}
                                </div>
                            </div>
                            <FormFooter loading={createDataContractLoading} className="groupFooter" cancelOnClick={onClose} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}



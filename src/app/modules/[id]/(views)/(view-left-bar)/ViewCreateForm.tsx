
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Button, FormFooter, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from 'react'
import Box from "@mui/material/Box";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { DataContractService } from '@/services/DataContract';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { DataContract, DataContractForCreate, DataContractForUpdate, ExportMode, HistoryLogViewMode, HtmlHeaderMode, UsageScope } from '@/models/Entities/DataContract';
import "@/app/(components)/_ComponentStyles/globalstyles.css";
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';
import { ArrangeLabelsPack } from '@/utils/Helpers';
interface ViewCreateFormProps {
    onClose: Function;
    dataContract?: DataContract;
    // onSuccessfulFormSubmit: Function;
}

export default function ViewCreateForm(props: ViewCreateFormProps) {
    const [open, setOpen] = useState(true);
    const [createDataContractLoading, setCreateDataContractLoading] = useState<boolean>(false);
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { moduleId, setSelectedRow, viewDataContracts, setViewDataContracts, refreshAllDataContracts, setDataContractsLoading } = dataContractsContext;

    const { showToastAlert } = useToast();

    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    // const isUpdate = !!props.groupData;
    const labelFieldsPrefix = "viewLabel";
    const languages = useContext(LanguagesContext);
    const isUpdate = !!props.dataContract;
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setDataContractsLoading(true);
            debugger
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            let processedDataContract;
            if (!isUpdate) {
                const dataContract: DataContractForCreate = {
                    allowGettingDirectLink: false,
                    allowGettingDirectLink_AllCharts: false,
                    allowSavingViewState: true,
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
                    chunkCapacity: undefined,
                    pageSize: 25,
                    rowAlternateColor: "",
                    showBulkUpdateButtonLabel: false,
                    showCalendarButtonLabel: false,
                    showChartButton: false,
                    showChartsButtonLabel: true,
                    showFilterButtonLabel: false,
                    showHelpButtonLabel: false,
                    showImportExportButtonLabel: true,
                    showInViewChangeCombo: true,
                    showRecordHistoryButtonLabel: false,
                    showRefreshButtonLabel: true,
                    showSortButton: false,
                    showSortButtonLabel: true,
                    showSummary: false,
                    systemName: formData.get("systemName") as string,
                    usageScopeType: UsageScope.MainGrid,
                    allowLocalFiltering: true,
                    bigIconPath: "",
                    disableGridEditing: true,
                    hideHeaders: false,
                    historyLogViewMode: HistoryLogViewMode.Standard,
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
                }
                processedDataContract = await DataContractService.createDataContract(dataContract, dataContractsContext.moduleId)
                processedDataContract.remoteFilterUIs = undefined;
                processedDataContract.dataContractUIProperties = undefined;
                processedDataContract.remoteSortUIs = undefined;
                if (viewDataContracts) {
                    setViewDataContracts([...viewDataContracts, processedDataContract]);
                } else {
                    setViewDataContracts([processedDataContract]);
                }
            } else {
                const deepCopy = props.dataContract
                    ? JSON.parse(JSON.stringify(props.dataContract))
                    : [];
                // deepCopy.labels = {
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
                    deepCopy.labels = ArrangeLabelsPack(formData, labelFieldsPrefix, languages);
                }
                processedDataContract = await DataContractService.updateDataContract(deepCopy!)
            }
            debugger;
            showToastAlert(messages.createViewSuccess.severity, messages.createViewSuccess.content, messages.createViewSuccess.title);
            setSelectedRow(processedDataContract)
            refreshAllDataContracts(moduleId);
            props.onClose();
            setOpen(false);
            setDataContractsLoading(false);
        } catch (error) {
            setDataContractsLoading(false);
            showToastAlert(messages.createViewError.severity, messages.createViewError.content, messages.createViewError.title);
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
                <Box className={globalStyles.muiModal}>
                    <FormHeader title={"Create view"} variant="h5" />
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <TextInput id="systemName" name="systemName" label="System name" type="string" size="medium" disabled={isUpdate} defaultValue={props.dataContract?.systemName} />
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.dataContract?.labels} />
                            <FormFooter loading={createDataContractLoading} className="groupFooter" cancelOnClick={onClose} />
                        </div>
                        {
                            isUpdate && <div className="display-none">
                                <TextInput id="id" defaultValue={props.dataContract?.id} name="id" />
                                {languages?.map(language => (
                                    <TextInput key={language.id} id={language.id} defaultValue={props.dataContract?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                ))}
                            </div>
                        }
                    </form>
                </Box>
            </Modal>
        </>
    )
}

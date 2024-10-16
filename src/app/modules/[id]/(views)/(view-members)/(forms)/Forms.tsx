/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, DataGrid, GridColDef, GridRowOrderChangeParams, GridRowParams, GridRowSelectionModel, Select, TextInput, Toggle } from '@ims/component-library';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import FormLeftBar from './FormLeftBar';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { DataContractProperty, EditorResizeMode, FileAccessConfigurationMode, FormProperty, FormPropertyForCreate, FormPropertyForUpdate, HtmlDisplayMode, HtmlShowMode, ViewProperty, ViewPropertyExportModeType, Visibility } from '@/models/Entities/DataContract';
import { Property } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import { FormsContext } from './FormsContext';
import { DataContractService } from '@/services/DataContract';
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import { GetEnumValue } from '@/utils/Helpers';

const columnsAvailable: GridColDef[] = [
    {
        field: "systemName",
        headerName: "Available properties",
        flex: 1,
        minWidth: 100,
    },
]
const columnsViewProp: GridColDef[] = [
    {
        field: "systemName",
        headerName: "System name",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "label",
        headerName: "Label",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "visibility",
        headerName: "Visibility",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "width",
        headerName: "Width",
        flex: 1,
        minWidth: 100,
    },
]

export default function Forms() {

    const dataContractsContext = useContext(DataContractsContext);
    const formsContext = useContext(FormsContext);

    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    if (!formsContext) {
        throw new Error("formsContext must be used within a FormsContextProvider");
    }

    const { formDataContracts, selectedView, refreshAllDataContracts, moduleId, initialDataContractState, setDataContractsLoading } = dataContractsContext;
    const { selectedForm, setSelectedForm } = formsContext;

    const [availableFormProperties, setAvailableFormProperties] = useState<Property[]>([]);
    const [existingFormProperties, setExistingFormProperties] = useState<string[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(existingFormProperties);
    const [selectedFormProperty, setSelectedFormProperty] = useState<FormPropertyForUpdate | undefined>();
    const [resizeMode, setResizeMode] = useState<EditorResizeMode | undefined>(EditorResizeMode.NotResizable);
    const [oLShowDetailedSearchTrigger, setOLShowDetailedSearchTrigger] = useState<boolean>(selectedFormProperty?.oLShowDetailedSearchTrigger || false)
    const [formProperties, setFormProperties] = useState<DataContractProperty[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [formPropDeleted, setFormPropDeleted] = useState<boolean>(false);

    useEffect(() => {
        setSelectedForm(undefined);
    }, [selectedView])

    useEffect(() => {
        const fun = async () => {
            const formProps = initialDataContractState?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.dataContractProperties;
            const propertyIds = formProps?.map(x => (x as FormProperty).propertyId);
            const properties = await ModulesService.getAllProperties(moduleId); 
            setAvailableFormProperties(properties.data.filter(x => propertyIds?.includes(x.id)));
        }
        fun();
    }, [])

    useEffect(() => {
        if (selectedRowIds.length === 0) {
            setSelectedFormProperty(undefined);
        }

        const fillAvailableProperties = async () => {
            debugger
            const props = (await ModulesService.getAllProperties(moduleId)).data;
            if (properties?.length === 0) {
                setProperties(props)
            }

            const dataContractProperties = initialDataContractState.find(x => x.dataContractId === selectedForm?.dataContractReferenceId)?.dataContractProperties;

            const propRows = dataContractProperties?.filter(formProp => selectedRowIds?.includes((formProp as FormProperty).propertyId));

            propRows?.forEach(element => {
                const propSystemName = props.find(x => x.id === (element as FormProperty).propertyId)?.systemName;
                element.systemName = propSystemName;
            });
            debugger;
            const sorted = propRows?.sort((a, b) => a.rowIndex - b.rowIndex);
            setFormProperties(sorted);
        }

        fillAvailableProperties();
    }, [selectedRowIds])

    useEffect(() => {
        const update = async () => {
            debugger
            if (formPropDeleted) {
                setFormPropDeleted(false);
                const rowsWithUpdatedIndexes = (formProperties as FormProperty[]).map((row, index) => ({
                    ...row,
                    rowIndex: index,
                }));

                const selectedRow = selectedForm;
                selectedRow!.dataContractUIProperties = {};
                selectedRow!.dataContractUIProperties!.updated = Object.values(rowsWithUpdatedIndexes);
                selectedRow!.dataContractUIProperties?.updated?.forEach(element => delete element.labels)
                selectedRow!.labels = {};
                selectedRow!.labels!.updated = Object.values(selectedRow?.labels)

                const test = await DataContractService.updateDataContract(selectedRow);
            }
        }
        update();
    }, [formProperties])

    useEffect(() => {
        const dc = initialDataContractState?.find(x => x.dataContractId === selectedForm?.dataContractReferenceId);
        const props = dc?.dataContractProperties.map(x => (x as FormProperty).propertyId);
        setExistingFormProperties(props || []);
        const filteredProperties = availableFormProperties
            .filter(x => {
                return props?.includes(x.id);
            });
        const mappedPropertyIds = filteredProperties.map(x => {
            return x.id;
        });

        setSelectedRowIds(mappedPropertyIds);
    }, [initialDataContractState, selectedForm])

    const rowOrderChange = async (params: GridRowOrderChangeParams) => {
        setDataContractsLoading(true);
        debugger
        try {

            const movedRow = params.row;
            const updatedRows = initialDataContractState.find(x => x.dataContractId === selectedForm?.dataContractReferenceId)?.dataContractProperties?.sort((a, b) => a.rowIndex - b.rowIndex);
            debugger
            updatedRows?.splice(params.oldIndex, 1);

            updatedRows?.splice(params.targetIndex, 0, movedRow);

            const rowsWithUpdatedIndexes = updatedRows?.map((row, index) => ({
                ...row,
                rowIndex: index,
            }));

            const selectedRow = selectedForm;
            selectedRow!.dataContractUIProperties = {};
            selectedRow!.dataContractUIProperties!.updated = Object.values(rowsWithUpdatedIndexes);
            // selectedRow!.dataContractUIProperties = rowsWithUpdatedIndexes;
            console.log(selectedRow!.dataContractUIProperties);
            selectedRow!.dataContractUIProperties?.updated?.forEach(element => delete element.labels)
            selectedRow!.labels = {};
            selectedRow!.labels!.updated = Object.values(selectedRow?.labels)
            const test = await DataContractService.updateDataContract(selectedRow);
            setDataContractsLoading(false)
            refreshAllDataContracts(moduleId);
        } catch (error) {
            setDataContractsLoading(false)
        }
    }
    const onRowSelectionModelChange = async (newRowSelection: GridRowSelectionModel) => {
        setSelectedRowIds(newRowSelection);
        setDataContractsLoading(true)
        try {
            const addedElement = newRowSelection.filter(item => !selectedRowIds?.includes(item))?.[0];
            const removedElement = selectedRowIds?.filter(item => !newRowSelection.includes(item?.toString()))?.[0];
            if (addedElement) {
                const property: FormPropertyForCreate = {
                    displayPlainValueOnFormIfReadonly: false,
                    helpID: "",
                    helpItemID: "",
                    helpNavigationPreference: 0,
                    isReadonly: false,
                    fileAccessConfigurationMode: FileAccessConfigurationMode.Inherit,
                    htmlShowMode: HtmlShowMode.ShowAlways,
                    htmlDisplayMode: HtmlDisplayMode.Default,
                    chatHistoryEditorHeight: null,
                    formSectionItemID: 0,
                    oLShowDetailedSearchTrigger: false,
                    hideIfEmptyAndNotEditable: true,
                    oLMaximizeDetailedSearchWindow: false,
                    editorMinHeight: null,
                    editorMaxHeight: null,
                    chatHistoryEditorMinHeight: null,
                    chatHistoryEditorMaxHeight: null,
                    editorResizeMode: EditorResizeMode.NotResizable,
                    showSimpleMultiOLForms: false,
                    chatHistoryEditorIsResizable: false,
                    propertyId: availableFormProperties.find(x => x.id === addedElement.toString())?.id!,
                    searchAllOnEmptyValueClick: false,
                    inheritFromModuleProperty: false,
                    prohibitSetValueByLinking: false,
                    updatePermissions: 0,
                    createPermissions: 0,
                    formSectionFarmID: "",
                    formSectionGroupID: "",
                    formSectionID: "",
                    inheritConditionalFormatters: false,
                    labels: [],
                    rowIndex: formProperties?.length,
                    editorHeight: null
                }
                if (!selectedView?.id || !selectedForm?.id) {
                    return;
                }
                await DataContractService.createDataContractProperty(selectedForm?.id, property)
                refreshAllDataContracts(moduleId);
            } else if (removedElement) {

                const foundId = (initialDataContractState
                    ?.find(x => x.dataContractId === selectedForm?.dataContractReferenceId)
                    ?.dataContractProperties
                    .find(x => (x as FormProperty).propertyId === removedElement.toString()) as FormProperty)
                    ?.id;

                if (foundId) {
                    await DataContractService.deleteDataContractProperty({ id: foundId });
                    refreshAllDataContracts(moduleId);
                }
                setFormPropDeleted(true);

            }
            setDataContractsLoading(false)
        } catch (error) {
            setDataContractsLoading(false)

        }

    }

    const handleInputChange = async (value: unknown, propertyName: keyof FormProperty) => {
        if (!formDataContracts) {
            return;
        }
        const newDataContracts = [...formDataContracts]

        if (!selectedView || !selectedForm) {
            return;
        }
        const index = newDataContracts.map(x => x.id).indexOf(selectedForm.id);
        if (index === -1) {
            return;
        }

        const selectedDataContract = initialDataContractState.find(x => x.dataContractId === selectedForm.dataContractReferenceId);
        let selectedDataContractProperty = selectedDataContract?.dataContractProperties.find(x => (x as ViewProperty).id === selectedFormProperty?.id)
        selectedDataContractProperty = {
            ...selectedDataContractProperty,
            [propertyName]: value,
            labels: undefined,
        }
        // newDataContracts[index] = {
        //     ...newDataContracts[index],
        //     dataContractUIProperties: {
        //         ...newDataContracts[index].dataContractUIProperties,
        //         [propertyName]: value,
        //     }
        // }
        // setSelectedRow(newDataContracts[index]);
        await DataContractService.updateDataContractProperty(selectedDataContractProperty as FormPropertyForUpdate);
        refreshAllDataContracts(moduleId);
        setSelectedFormProperty(selectedDataContractProperty as FormPropertyForUpdate);
    }
    const htmlShowMode = [
        {
            label: "Hide always",
            value: HtmlShowMode.HideAlways,
        },
        {
            label: "Hide if empty",
            value: HtmlShowMode.HideIfEmpty,
        },
        {
            label: "Show always",
            value: HtmlShowMode.ShowAlways,
        },
    ]
    const htmlDisplayMode = [
        {
            label: "Combine label and value",
            value: HtmlDisplayMode.CombineLabelAndValue,
        },
        {
            label: "Default",
            value: HtmlDisplayMode.Default,
        },
    ]
    const editorResizeMode = [
        {
            label: "Not resizable",
            value: EditorResizeMode.NotResizable,
        },
        {
            label: "Resizable",
            value: EditorResizeMode.Resizable,
        },
        {
            label: "Grow",
            value: EditorResizeMode.Grow,
        },
    ]
    useEffect(() => {
        console.log(selectedFormProperty);

    }, [selectedFormProperty])
    const onFormPropertyRowClick = (event: GridRowParams) => {
        debugger
        if (event.row.propertyId === selectedFormProperty?.propertyId) {
            setSelectedFormProperty(undefined);
        } else {
            const formProps = initialDataContractState.find(x => x.dataContractId === selectedForm?.dataContractReferenceId);
            const formProp = formProps?.dataContractProperties?.find(x => x.propertyId === event.row.propertyId);
            setSelectedFormProperty(formProp as FormPropertyForUpdate);
        }
    }
    return (
        <>
            <div className="inputContainer noPadding">
                <div className="flex">
                    <FormLeftBar />
                    {
                        selectedForm && (
                            <>
                                <div>
                                    <div className="flex">
                                        <div className="ml-12" style={{ width: "25%" }}>
                                            <DataGrid
                                                columns={columnsAvailable}
                                                rows={availableFormProperties}
                                                // handleRowOrderChange={RowOrderChangeAvaiable}
                                                rowSelectionModel={selectedRowIds}
                                                checkboxSelection={true}
                                                onRowSelectionModelChange={onRowSelectionModelChange}
                                                density="compact"
                                                height={selectedFormProperty ? "20vh" : "59vh"}
                                                getRowId={(row) => row.id}
                                            />
                                        </div>
                                        <div style={{ width: "74%", marginLeft: "1%" }}>
                                            <DataGrid
                                                columns={columnsViewProp}
                                                rows={formProperties}
                                                // rows={availableFormProperties.filter(property => selectedRowIds?.includes(property.id!))}
                                                rowReordering={true}
                                                handleRowOrderChange={rowOrderChange}
                                                density="compact"
                                                onRowClick={onFormPropertyRowClick}
                                                height={selectedFormProperty ? "20vh" : "59vh"}
                                            />
                                        </div>
                                    </div>
                                    {
                                        selectedFormProperty && (
                                            <div>
                                                <h4 style={{ textAlign: "center" }}>Form properties</h4>
                                                <hr style={{ width: "60%" }}></hr>
                                                <div className="ml-24" style={{ display: "flex", flexDirection: "row" }}>
                                                    <div>
                                                        <Select
                                                            id="htmlShowMode"
                                                            name="htmlShowMode"
                                                            values={htmlShowMode}
                                                            label="HTML show mode"
                                                            labelField="label"
                                                            valueField="value"
                                                            value={selectedFormProperty?.htmlShowMode.toString()}
                                                            handleChange={(value: string) => handleInputChange(value, "htmlShowMode")}
                                                        />
                                                        <Select
                                                            id="htmlDisplayMode"
                                                            name="htmlDisplayMode"
                                                            values={htmlDisplayMode}
                                                            label="HTML display mode"
                                                            labelField="label"
                                                            valueField="value"
                                                            value={selectedFormProperty?.htmlDisplayMode.toString()}
                                                            handleChange={(value: string) => handleInputChange(value, "htmlDisplayMode")}
                                                        />
                                                        <Select
                                                            values={editorResizeMode}
                                                            label="Editor resize mode"
                                                            value={selectedFormProperty?.editorResizeMode.toString()}
                                                            handleChange={(value: string) => { handleInputChange(value, "editorResizeMode"); setResizeMode(parseInt(value)) }}
                                                            className={["String"].includes(selectedFormProperty.propertyId.split(":").pop() || "") ? "" : "display-none"}
                                                        />
                                                        <TextInput
                                                            label="Height (fixed)"
                                                            size="medium"
                                                            type="number"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "editorHeight")}
                                                            value={selectedFormProperty?.editorHeight?.toString()}
                                                            className={resizeMode !== EditorResizeMode.Grow ? "" : "display-none"}
                                                        />
                                                        <TextInput
                                                            label="Editor min height"
                                                            size="medium"
                                                            name="editorMinHeight"
                                                            type="number"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "editorMinHeight")}
                                                            value={selectedFormProperty?.editorMinHeight?.toString()}
                                                            sx={{ display: ["ObjectLink", "SubjectLink", "File"].includes(selectedFormProperty.propertyId.split(":").pop() || "") || resizeMode === EditorResizeMode.Resizable ? "flex" : "none" }}
                                                        />
                                                        <TextInput
                                                            label="Editor max height"
                                                            size="medium"
                                                            name="editorMaxHeight"
                                                            type="number"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "editorMaxHeight")}
                                                            value={selectedFormProperty?.editorMaxHeight?.toString()}
                                                            sx={{ display: ["ObjectLink", "SubjectLink", "File"].includes(selectedFormProperty.propertyId.split(":").pop() || "") || resizeMode === EditorResizeMode.Resizable ? "flex" : "none" }}
                                                        />

                                                    </div>
                                                    <div className="ml-24">
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "displayPlainValueOnFormIfReadonly")}
                                                            name="displayPlainValueOnFormIfReadonly"
                                                            label="Display plain value on form if readonly"
                                                            id="displayPlainValueOnFormIfReadonly"
                                                            checked={selectedFormProperty?.displayPlainValueOnFormIfReadonly}
                                                        />

                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideIfEmptyAndNotEditable")}
                                                            name="hideIfEmptyAndNotEditable"
                                                            label="Hide if empty and not editable"
                                                            id="hideIfEmptyAndNotEditable"
                                                            checked={selectedFormProperty?.hideIfEmptyAndNotEditable}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "isReadonly")}
                                                            name="isReadonly"
                                                            label="Readonly column"
                                                            id="isReadonly"
                                                            checked={selectedFormProperty?.isReadonly}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideFieldLabel")}
                                                            name="hideFieldLabel"
                                                            label="Hide field label"
                                                            checked={selectedFormProperty?.hideFieldLabel}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showEmptyText")}
                                                            name="showEmptyText"
                                                            label="Show empty text"
                                                            checked={selectedFormProperty?.showEmptyText}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showDescriptionNote")}
                                                            name="showDescriptionNote"
                                                            label="Show description note"
                                                            checked={selectedFormProperty?.showDescriptionNote}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showDescriptionTooltip")}
                                                            name="showDescriptionTooltip"
                                                            label="Show description tooltip"
                                                            checked={selectedFormProperty?.showDescriptionTooltip}
                                                        />
                                                        {/* <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showListOptionDescriptions")}
                                                            name="showListOptionDescriptions"
                                                            label="Show list option descriptions"
                                                            checked={selectedFormProperty?.showListOptionDescriptions}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showDescriptions")}
                                                            name="showDescriptions"
                                                            label="Show list root descriptions"
                                                            checked={selectedFormProperty?.showDescriptions}
                                                        /> */}
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => { handleInputChange(checked, "oLShowDetailedSearchTrigger"); setOLShowDetailedSearchTrigger(checked) }}
                                                            label="Show detailed search trigger"
                                                            checked={selectedFormProperty?.oLShowDetailedSearchTrigger}
                                                            sx={{ display: ["ObjectLink"].includes(selectedFormProperty.propertyId.split(":").pop() || "") ? "flex" : "none" }}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "oLMaximizeDetailedSearchWindow")}
                                                            label="Maximize search window"
                                                            checked={selectedFormProperty?.oLMaximizeDetailedSearchWindow}
                                                            sx={{ display: ["ObjectLink"].includes(selectedFormProperty.propertyId.split(":").pop() || "") && oLShowDetailedSearchTrigger ? "flex" : "none" }}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "prohibitSetValueByLinking")}
                                                            label="Prohibit set value by linking/searching"
                                                            checked={selectedFormProperty?.prohibitSetValueByLinking}
                                                            sx={{ display: ["ObjectLink"].includes(selectedFormProperty.propertyId.split(":").pop() || "") ? "flex" : "none" }}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "disableSearch")}
                                                            label="Disable search"
                                                            checked={selectedFormProperty?.disableSearch}
                                                            sx={{ display: ["ObjectLink"].includes(selectedFormProperty.propertyId.split(":").pop() || "") ? "flex" : "none" }}
                                                        />
                                                        <Toggle
                                                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "searchAllOnEmptyValueClick")}
                                                            name="searchAllOnEmptyValueClick"
                                                            label="Search all on empty value click"
                                                            id="searchAllOnEmptyValueClick"
                                                            checked={selectedFormProperty?.searchAllOnEmptyValueClick}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}
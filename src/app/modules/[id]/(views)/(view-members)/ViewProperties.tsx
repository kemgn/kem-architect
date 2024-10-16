/* eslint-disable react-hooks/exhaustive-deps */
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";
import { DataContractForUpdate, DataContractProperty, DataContractPropertyForCreate, DataContractPropertyForUpdate, ExportMode, FileAccessConfigurationMode, HtmlDisplayMode, HtmlShowMode, ViewProperty, ViewPropertyExportModeType, ViewPropertyForCreate, ViewPropertyForUpdate, Visibility } from "@/models/Entities/DataContract";
import { Property } from "@/models/Entities/Property";
import { ModulesService } from "@/services/Modules";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowModel, GridRowOrderChangeParams, GridRowParams, GridRowSelectionModel, GridRowsProp, Select, TextInput, Toggle } from "@ims/component-library"
import React, { useContext, useEffect, useRef, useState } from "react"
import "@/app/(components)/_ComponentStyles/globalstyles.css";
import { DataContractService } from "@/services/DataContract";
import { ColumSummaryFunction } from "@/models/Enums/Enums";
import { loadingTrue } from "@/app/(user-management)/subjects/(components)/Statics";

export default function ViewProperties() {

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
        // {
        //     field: "label",
        //     headerName: "Label",
        //     flex: 1,
        //     minWidth: 100,
        // },
        // {
        //     field: "visibility",
        //     headerName: "Visibility",
        //     flex: 1,
        //     minWidth: 100,
        // },
        // {
        //     field: "width",
        //     headerName: "Width",
        //     flex: 1,
        //     minWidth: 100,
        // },
    ]
    // const requiredOptions = [
    //     {
    //         value: required,
    //         label: "Not Required",
    //     },
    //     {
    //         value: "saveFormTime",
    //         label: "Save And Form Time",
    //     },
    //     {
    //         value: "formTimeOnly",
    //         label: "Form Time Only",
    //     },
    // ]

    const fileAccessConfigurationMode = [
        {
            label: "Inherit",
            value: FileAccessConfigurationMode.Inherit,
        },
        {
            label: "PreviewAllow_DownloadAllow",
            value: FileAccessConfigurationMode.PreviewAllow_DownloadAllow,
        },
        {
            label: "PreviewAllow_DownloadDeny",
            value: FileAccessConfigurationMode.PreviewAllow_DownloadDeny,
        },
        {
            label: "PreviewAllow_DownloadOnFailure",
            value: FileAccessConfigurationMode.PreviewAllow_DownloadOnFailure,
        },
        {
            label: "PreviewDeny_DownloadAllow",
            value: FileAccessConfigurationMode.PreviewDeny_DownloadAllow,
        },
    ]

    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { viewDataContracts, setViewDataContracts, selectedView, setSelectedRow, moduleId, initialDataContractState, refreshAllDataContracts, setDataContractsLoading } = dataContractsContext;

    const RowOrderChangeAvaiable = async (params: GridRowOrderChangeParams) => {

    };


    const [existingViewProperties, setExistingViewProperties] = useState<string[]>();
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>();
    const [selectedViewProperty, setSelectedViewProperty] = useState<ViewPropertyForUpdate>();
    const [selectedProperty, setSelectedProperty] = useState<Property>();
    const [viewProperties, setViewProperties] = useState<DataContractProperty[]>([]);
    const [viewPropDeleted, setViewPropDeleted] = useState<boolean>(false);

    useEffect(() => {
        const prop = properties.find(x => x.id === selectedViewProperty?.propertyId);
        setSelectedProperty(prop);
    }, [selectedViewProperty])

    useEffect(() => {
        const update = async () => {
            if (viewPropDeleted) {
                setViewPropDeleted(false);
                debugger
                const rowsWithUpdatedIndexes = (viewProperties as ViewProperty[]).map((row, index) => ({
                    ...row,
                    colIndex: index + 1, // colIndex'i güncelle
                }));

                const selectedRow = selectedView;
                selectedRow!.dataContractUIProperties = {};
                selectedRow!.dataContractUIProperties!.updated = Object.values(rowsWithUpdatedIndexes);
                // selectedRow!.dataContractUIProperties = rowsWithUpdatedIndexes;
                console.log(selectedRow!.dataContractUIProperties);
                selectedRow!.dataContractUIProperties?.updated?.forEach(element => delete element.labels)
                selectedRow!.labels = {};
                selectedRow!.labels!.updated = Object.values(selectedRow?.labels)

                const test = await DataContractService.updateDataContract(selectedRow);
            }
        }
        update();
    }, [viewProperties])

    useEffect(() => {
        const test = initialDataContractState?.filter(x => x.dataContractId === selectedView?.dataContractReferenceId)?.[0]?.dataContractProperties.map(x => (x as ViewProperty).propertyId);
        setExistingViewProperties(test);
    }, [selectedView, initialDataContractState])

    useEffect(() => {
        if (selectedRowIds?.length === 0) {
            setSelectedViewProperty(undefined);
        }
        const fillAvailableProperties = async () => {
            const props = (await ModulesService.getAllProperties(moduleId)).data;
            if (properties?.length === 0) {
                setProperties(props)
            }

            // const propertyRows = properties?.filter(property => selectedRowIds?.includes(property.propertyReferenceId!));
            const dataContractProperties = initialDataContractState.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.dataContractProperties;

            const propRows = dataContractProperties?.filter(viewProperty => selectedRowIds?.includes((viewProperty as ViewProperty).propertyId));

            propRows?.forEach(element => {
                const propSystemName = props.find(x => x.id === (element as ViewProperty).propertyId)?.systemName;
                element.systemName = propSystemName;
            });
            debugger;
            const sorted = propRows?.sort((a, b) => a.colIndex - b.colIndex);
            setViewProperties(sorted);
        }

        fillAvailableProperties();


    }, [selectedRowIds])
    useEffect(() => {
        if (!properties || properties.length === 0 || !existingViewProperties) {
            return;
        }
        const filteredProperties = properties
            .filter(x => {
                return existingViewProperties?.includes(x.id);
            });
        const mappedPropertyIds = filteredProperties.map(x => {
            return x.id;
        });
        debugger;
        setSelectedRowIds(mappedPropertyIds);
    }, [properties, existingViewProperties])

    const RowOrderChangeViewProp = async (params: GridRowOrderChangeParams) => {
        setDataContractsLoading(true);
        try {

            const movedRow = params.row;
            const updatedRows = initialDataContractState.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.dataContractProperties?.sort((a, b) => a.colIndex - b.colIndex);
            debugger
            updatedRows?.splice(params.oldIndex, 1);

            updatedRows?.splice(params.targetIndex, 0, movedRow);

            const rowsWithUpdatedIndexes = updatedRows?.map((row, index) => ({
                ...row,
                colIndex: index + 1,
            }));

            const selectedRow = selectedView;
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
    };

    const onRowSelectionModelChange = async (newRowSelection: GridRowSelectionModel) => {
        setSelectedRowIds(newRowSelection);
        setDataContractsLoading(true);
        const addedElement = newRowSelection.filter(item => !selectedRowIds?.includes(item))?.[0];
        const removedElement = selectedRowIds?.filter(item => !newRowSelection.includes(item?.toString()))?.[0];
        debugger
        if (addedElement) {
            const property: ViewPropertyForCreate = {
                displayPlainValueOnFormIfReadonly: false,
                helpID: "",
                helpItemID: "",
                helpNavigationPreference: 0,
                isReadonly: false,
                fileAccessConfigurationMode: FileAccessConfigurationMode.Inherit,
                htmlShowMode: HtmlShowMode.ShowAlways,
                htmlDisplayMode: HtmlDisplayMode.Default,
                visibility: Visibility.Show,
                colIndex: viewProperties?.length + 1,
                width: null,
                minWidth: 200,
                maxWidth: undefined,
                flex: 1,
                wrapText: true,
                showListOptionDescriptions: false,
                menuDisabled: false,
                showValueSummary: true,
                summarizeAfter: 3,
                showDescriptions: false,
                showSummaryFunctionText: false,
                delimeter: ",",
                trimText: loadingTrue,
                cellCssStyle: "",
                headerCssStyle: "",
                preloadOptions: false,
                sortable: true,
                refreshPageAfterEdit: false,
                propertyId: properties.find(x => x.id === addedElement.toString())?.id!,
                searchAllOnEmptyValueClick: false,
                inheritFromModuleProperty: true,
                prohibitSetValueByLinking: false,
                updatePermissions: 0,
                createPermissions: 0,
                bulkUpdatePermissions: 0,
                summaryFunction: 0,
            }
            if (!selectedView?.id) {
                return;
            }
            const test = await DataContractService.createDataContractProperty(selectedView?.id, property)
            refreshAllDataContracts(moduleId);
        } else if (removedElement) {
            const foundId = (initialDataContractState
                ?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)
                ?.dataContractProperties
                .find(x => (x as ViewProperty).propertyId === removedElement.toString()) as ViewProperty)
                ?.id;

            if (foundId) {
                await DataContractService.deleteDataContractProperty({ id: foundId });
                refreshAllDataContracts(moduleId);
            }
            setViewPropDeleted(true);

        }
        setDataContractsLoading(false);

    }

    const handleInputChange = async (value: unknown, propertyName: keyof ViewProperty, type?: "number") => {
        if (!viewDataContracts) {
            return;
        }
        debugger
        const newDataContracts = [...viewDataContracts]

        if (!selectedView) {
            return;
        }
        const index = newDataContracts.map(x => x.id).indexOf(selectedView.id);
        if (index === -1) {
            return;
        }


        const selectedDataContract = initialDataContractState.find(x => x.dataContractId === selectedView.dataContractReferenceId);
        let selectedDataContractProperty = selectedDataContract?.dataContractProperties.find(x => (x as ViewProperty).id === selectedViewProperty?.id)
        selectedDataContractProperty = {
            ...selectedDataContractProperty,
            [propertyName]: type === "number" ? parseInt(value as string) : value,
            labels: undefined,
        }
        debugger;
        // newDataContracts[index] = {
        //     ...newDataContracts[index],
        //     dataContractUIProperties: {
        //         ...newDataContracts[index].dataContractUIProperties,
        //         [propertyName]: value,
        //     }
        // }
        // setSelectedRow(newDataContracts[index]);
        await DataContractService.updateDataContractProperty(selectedDataContractProperty as ViewPropertyForUpdate);
        refreshAllDataContracts(moduleId);
        setSelectedViewProperty(selectedDataContractProperty as ViewPropertyForUpdate);
    }

    const onViewPropertyRowClick = (event: GridRowParams) => {
        debugger
        if (event.row.propertyId === selectedViewProperty?.propertyId) {
            setSelectedViewProperty(undefined);
        } else {
            const viewProps = initialDataContractState.find(x => x.dataContractId === selectedView?.dataContractReferenceId);
            const viewProp = viewProps?.dataContractProperties?.find(x => (x as ViewPropertyForUpdate).propertyId === event.row.propertyId);

            setSelectedViewProperty(viewProp as ViewPropertyForUpdate);
        }
    }
    const visibility = [
        {
            label: "Show",
            value: Visibility.Show,
        },
        {
            label: "Hidden",
            value: Visibility.Hidden,
        },
        {
            label: "Invisible",
            value: Visibility.InVisible,
        },
    ]
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
    const viewPropertyExportModeType = [
        {
            label: "Always export",
            value: ViewPropertyExportModeType.AlwaysExport,
        },
        {
            label: "Inherit",
            value: ViewPropertyExportModeType.Inherit,
        },
        {
            label: "Never export",
            value: ViewPropertyExportModeType.NeverExport,
        },
    ]
    const summaryFuncOptions = [
        {
            value: ColumSummaryFunction.None,
            label: "None",
        },
        {
            value: ColumSummaryFunction.Sum,
            label: "Sum",
        },
        {
            value: ColumSummaryFunction.Min,
            label: "Minimum value",
        },
        {
            value: ColumSummaryFunction.Max,
            label: "Maximum value",
        },
        {
            value: ColumSummaryFunction.Avg,
            label: "Avarage",
        },
        {
            value: ColumSummaryFunction.CountNoneEmpty,
            label: "Non-empty values count",
        },
        {
            value: ColumSummaryFunction.CountEmpty,
            label: "Empty values count",
        },
        {
            value: ColumSummaryFunction.TotalRecords,
            label: "Total record count",
        },
    ]
    return (
        <>
            <div className="inputContainer noPadding">
                <div style={{ display: "flex" }}>
                    <div style={{ width: "25%" }}>
                        <DataGrid
                            columns={columnsAvailable}
                            rows={properties}
                            // handleRowOrderChange={RowOrderChangeAvaiable}
                            checkboxSelection={true}
                            rowSelectionModel={selectedRowIds}
                            onRowSelectionModelChange={onRowSelectionModelChange}
                            density="compact"
                            height={selectedViewProperty ? "20vh" : "58vh"}
                            getRowId={(row) => row.id}
                        />
                    </div>
                    <div style={{ width: "74%", marginLeft: "1%" }}>
                        <DataGrid
                            columns={columnsViewProp}
                            rows={viewProperties}
                            // rows={Array.from(new Set([...properties.filter(property => selectedRowIds?.includes(property.propertyReferenceId!)), ...properties?.filter(x => existingViewProperties?.includes(x.propertyReferenceId))]))}
                            rowReordering={true}
                            handleRowOrderChange={RowOrderChangeViewProp}
                            density="compact"
                            height={selectedViewProperty ? "20vh" : "58vh"}
                            onRowClick={onViewPropertyRowClick}
                        />
                    </div>
                </div>
                {
                    selectedViewProperty && (
                        <>
                            <h4 style={{ textAlign: "center" }}>View Properties</h4>
                            <hr style={{ width: "60%" }}></hr>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div>
                                    <TextInput
                                        label="Width"
                                        size="medium"
                                        name="width"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "width")}
                                        value={selectedViewProperty?.width?.toString()}
                                    />
                                    <TextInput
                                        label="Min width"
                                        size="medium"
                                        name="minWidth"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "minWidth")}
                                        value={selectedViewProperty?.minWidth?.toString()}
                                    />
                                    <TextInput
                                        label="Max width"
                                        size="medium"
                                        name="maxWidth"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "maxWidth")}
                                        value={selectedViewProperty?.maxWidth?.toString()}
                                    />
                                    <TextInput
                                        label="Flex"
                                        size="medium"
                                        name="flex"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "flex")}
                                        value={selectedViewProperty?.flex?.toString()}
                                    />
                                    {/* <Select
                                        id="required"
                                        values={requiredOptions}
                                        label="Required"
                                        labelField="labelb"
                                        valueField="valuea"
                                    /> */}
                                    <Select
                                        values={visibility}
                                        label="Visibility"
                                        handleChange={(value: string) => { handleInputChange(value, "visibility") }}
                                        name="visibility"
                                        value={selectedViewProperty?.visibility?.toString()}
                                    />
                                    <TextInput
                                        label="Cell CSS style"
                                        size="medium"
                                        name="cellCssStyle"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "cellCssStyle")}
                                        value={selectedViewProperty?.cellCssStyle?.toString()}
                                    />
                                    <TextInput
                                        label="Summarize after (#records)"
                                        size="medium"
                                        name="summarizeAfter"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "summarizeAfter", "number")}
                                        value={selectedViewProperty?.summarizeAfter?.toString()}
                                        type="number"
                                        sx={{ display: selectedProperty?.isMultiSelect ? "flex" : "none" }}
                                    />
                                    <TextInput
                                        label="Delimeter"
                                        size="medium"
                                        name="delimeter"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "delimeter")}
                                        value={selectedViewProperty?.delimeter?.toString()}
                                        sx={{ display: selectedProperty?.isMultiSelect ? "flex" : "none" }}
                                    />
                                    <TextInput
                                        label="Header CSS style"
                                        size="medium"
                                        name="headerCssStyle"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "headerCssStyle")}
                                        value={selectedViewProperty?.headerCssStyle?.toString()}
                                    />
                                    {/* <Select
                                        id="fileAccessConfigurationMode"
                                        values={fileAccessConfigurationMode}
                                        label="Column summary function"
                                        labelField="label"
                                        valueField="value"
                                    /> */}
                                    <Select
                                        values={summaryFuncOptions}
                                        label="Column summary function"
                                        handleChange={(value: string) => handleInputChange(value, "summaryFunction")}
                                        value={selectedViewProperty?.summaryFunction?.toString() || ColumSummaryFunction.None.toString()}
                                        className={selectedProperty?.isMultiSelect ? "" : "display-none"}
                                    />
                                    {/* <Select
                                        id="helpID"
                                        values={[]}
                                        label="Help content"
                                        labelField="labelb"
                                        valueField="valuea"
                                    /> 
                                    <Select
                                        id="helpItemID"
                                        values={[]}
                                        label="Help content"
                                        labelField="labelb"
                                        valueField="valuea"
                                    />*/}
                                    {/* <Select
                                        id="exportMode"
                                        values={viewPropertyExportModeType}
                                        label="Export mode"
                                        labelField="label"
                                        valueField="value"
                                        value={selectedViewProperty?.usageScopeType.toString()}
                                    /> */}
                                    <Select
                                        name="htmlShowMode"
                                        values={htmlShowMode}
                                        label="HTML show mode"
                                        labelField="label"
                                        valueField="value"
                                        handleChange={(value: string) => handleInputChange(value, "htmlShowMode")}
                                        value={selectedViewProperty?.htmlShowMode.toString()}
                                    />
                                    <Select
                                        id="htmlDisplayMode"
                                        name="htmlDisplayMode"
                                        values={htmlDisplayMode}
                                        label="HTML display mode"
                                        labelField="label"
                                        valueField="value"
                                        handleChange={(value: string) => handleInputChange(value, "htmlDisplayMode")}
                                        value={selectedViewProperty?.htmlDisplayMode.toString()}
                                    />
                                </div>
                                <div style={{ marginLeft: "5%" }}>
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "wrapText")}
                                        name="wrapText"
                                        label="Wrap text"
                                        checked={selectedViewProperty.wrapText}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "trimText")}
                                        name="trimText"
                                        label="Trim text"
                                        checked={selectedViewProperty.trimText}
                                        sx={{ display: ["SubjectLink", "ObjectLink", "List", "String", "Tree"].includes(selectedViewProperty.propertyId.split(":").pop() || "") ? "flex" : "none" }}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "displayPlainValueOnFormIfReadonly")}
                                        name="displayPlainValueOnFormIfReadonly"
                                        label="Display plain value on form if readonly"
                                        checked={selectedViewProperty.displayPlainValueOnFormIfReadonly}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "isReadonly")}
                                        name="isReadonly"
                                        label="Readonly column"
                                        checked={selectedViewProperty.isReadonly}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showValueSummary")}
                                        name="showValueSummary"
                                        label="Show value summary"
                                        checked={selectedViewProperty.showValueSummary}
                                        sx={{ display: selectedProperty?.isMultiSelect ? "initial" : "none" }}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "sortable")}
                                        name="sortable"
                                        label="Sortable"
                                        checked={selectedViewProperty.sortable}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "menuDisabled")}
                                        name="menuDisabled"
                                        label="Menu disabled"
                                        id="menuDisabled"
                                        checked={selectedViewProperty.menuDisabled}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "inheritFromModuleProperty")}
                                        name="inheritFromModuleProperty"
                                        label="Conditional formatter inherit from module"
                                        checked={selectedViewProperty.inheritFromModuleProperty}
                                    />
                                    <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "refreshPageAfterEdit")}
                                        name="refreshPageAfterEdit"
                                        label="Refresh page after edit"
                                        id="refreshPageAfterEdit"
                                        checked={selectedViewProperty.refreshPageAfterEdit}
                                    />
                                    {/* <Toggle
                                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "displayPlainValueOnFormIfReadonly")}
                                        name=""
                                        label="Conditional formatter inherit from module"
                                        id="consitionalFormatter"
                                        checked={selectedViewProperty.displayPlainValueOnFormIfReadonly}
                                    /> */}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}


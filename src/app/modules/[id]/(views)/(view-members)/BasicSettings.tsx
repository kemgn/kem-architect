import { Select, TextInput, Toggle } from "@ims/component-library"
import React, { useContext, useEffect, useState } from "react"
import Accordion from "@/app/(components)/Accordion/Accordion"
import styles from "./views.module.css";
import "./views.css";
import "@/app/(components)/_ComponentStyles/globalstyles.css";
import { DataContract, DataContractForUpdate, ExportMode, HistoryLogViewMode, HtmlHeaderMode, UsageScope } from "@/models/Entities/DataContract";
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";
import { DataContractService } from "@/services/DataContract";
import { ConvertEnumToObject, GetEnumKey, GetEnumValue } from "@/utils/Helpers";
import { ModulesService } from "@/services/Modules";
import { debounce } from "lodash";
import { ArchitectDataContext } from "@/app/(components)/_Contexts/ArchitectDataContext";

const usageScopeOptions: EnumForSelect[] = [
    {
        label: "Main grid",
        value: UsageScope.MainGrid,
    },
    {
        label: "Object link",
        value: UsageScope.ObjectLink,
    },
    {
        label: "None",
        value: UsageScope.None,
    },
    {
        label: "All",
        value: UsageScope.All,
    }
]
const htmlHeaderModeOptions: EnumForSelect[] = [
    {
        label: "Do not repeat",
        value: HtmlHeaderMode.DoNotRepeat,
    },
    {
        label: "Repeat for each record",
        value: HtmlHeaderMode.RepeateForEachRecord,
    },
    {
        label: "Repeat if displaying row values",
        value: HtmlHeaderMode.RepeatIfDisplayingRowValues,
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
const exportModeOptions: EnumForSelect[] = [
    {
        label: "Sync download",
        value: ExportMode.SyncDownload,
    },
    {
        label: "Async task",
        value: ExportMode.AsyncTask,
    },
]

interface BasicSettingsProps {
}

export default function BasicSettings(props: BasicSettingsProps) {

    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { viewDataContracts: dataContracts, setViewDataContracts: setDataContracts, selectedView: selectedRow, setSelectedRow, moduleId,refreshAllDataContracts } = dataContractsContext;


    const architectData = useContext(ArchitectDataContext);
    if (!architectData) {
        throw new Error("architectData must be used within a architectDataProvider");
    }
    const { modules } = architectData;
    const properties = modules.find(x => x.id === moduleId)?.properties;
    enum InputType {
        NullableNumber,
        NonNullableNumber,
    }
    const handleInputChange = async (value: unknown, propertyName: keyof DataContract, inputType?: InputType) => {
        if (!dataContracts) {
            return;
        }
        const newDataContracts = [...dataContracts]

        if (!selectedRow) {
            return;
        }
        const index = newDataContracts.map(x => x.id).indexOf(selectedRow.id);
        if (index === -1) {
            return;
        }
        debugger
        let value_ = value;
        if (value_ === "") {
            switch (inputType) {
                case InputType.NonNullableNumber:
                    value_ = 0;
                    break;
                case InputType.NullableNumber:
                    value_ = null;
            }
        }

        newDataContracts[index] = {
            ...newDataContracts[index],
            [propertyName]: value_,
        }
        debugger
        newDataContracts[index].labels = {};
        await updateDataContractDebounced(newDataContracts[index]);
        refreshAllDataContracts(moduleId);
        setSelectedRow(newDataContracts[index]);
        // setDataContracts(newDataContracts);
    }
    const updateDataContractDebounced = debounce(async (dataContract: DataContractForUpdate) => {
        await DataContractService.updateDataContract(dataContract);
        refreshAllDataContracts(moduleId);
    }, 300);

    console.log(selectedRow, "selected row");
    
    return (
        <div className="inputContainer">
            <Accordion title="General settings" id="generalSettings" content={
                <div className="flex">
                    <div className={styles.leftContainer}>
                        <Select
                            id="usageScopeType"
                            values={usageScopeOptions}
                            label="Usage scope"
                            labelField="label"
                            valueField="value"
                            handleChange={(value: string) => {
                                return handleInputChange(value, "usageScopeType")
                            }}
                            name="usageScopeType"
                            value={selectedRow?.usageScopeType.toString()}
                        />
                        <Select
                            label="Default display property"
                            values={properties?.filter((x) => {
                                const valueType = x.id.split(':').pop() || "";
                                return ["AutoCode", "Subject", "String"].includes(valueType);
                            })}
                            handleChange={(value: string) => {
                                return handleInputChange(value, "defaultDisplayPropertyId")
                            }}
                            id="properties"
                            name="properties"
                            labelField="systemName"
                            valueField="id"
                            value={selectedRow?.defaultDisplayPropertyId}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "allowSavingViewState")}
                            name={"allowSavingViewState"}
                            label="Allow saving view state"
                            id="allowSavingViewState"
                            // checked={selectedRow?.allowSavingViewState}
                            checked={selectedRow?.allowSavingViewState}
                        />
                    </div>
                </div>}
            />
            <Accordion title="Appearance & Style" id="appearanceStyle" content={
                <div className="flex">
                    <div className={styles.leftContainer}>
                        <Select
                            id="htmlHeaderMode"
                            values={htmlHeaderModeOptions}
                            label="HTML header mode"
                            labelField="label"
                            valueField="value"
                            handleChange={(value: string) => handleInputChange(value, "htmlHeaderMode")}
                            name="htmlHeaderMode"
                            value={selectedRow?.htmlHeaderMode.toString()}
                        />
                        <TextInput
                            label="Column cell CSS"
                            size="medium"
                            name="cellCssStyle"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "cellCssStyle")}
                            // value={selectedRow?.cellCssStyle}
                            value={selectedRow?.cellCssStyle}
                        />
                        <TextInput
                            label="Header cell CSS"
                            size="medium"
                            name="headerCssStyle"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "headerCssStyle")}
                            value={selectedRow?.headerCssStyle}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showInstanceId")}
                            name={"showInstanceId"}
                            label="Show instance id"
                            id="showInstanceId"
                            checked={selectedRow?.showInstanceId}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showDeleteButtonInTopBar")}
                            name={"showDeleteButtonInTopBar"}
                            label="Show delete button in top bar"
                            id="showDeleteButtonInTopBar"
                            checked={selectedRow?.showDeleteButtonInTopBar}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showDeleteCommandInGridCommands")}
                            name={"showDeleteCommandInGridCommands"}
                            label="Show delete command in grid actions"
                            id="showDeleteCommandInGridCommands"
                            checked={selectedRow?.showDeleteCommandInGridCommands}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideViewChangeCombo")}
                            name={"hideViewChangeCombo"}
                            label="Hide view change combo"
                            id="hideViewChangeCombo"
                            checked={selectedRow?.hideViewChangeCombo}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideTopBar")}
                            name={"hideTopBar"}
                            label="Hide top bar"
                            id="hideTopBar"
                            checked={selectedRow?.hideTopBar}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideHeaders")}
                            name={"hideHeaders"}
                            label="Hide headers"
                            id="hideHeaders"
                            checked={selectedRow?.hideHeaders}
                        />
                        <Toggle onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "hideBottomBar")}
                            name={"hideBottomBar"}
                            label="Hide bottom bar"
                            id="hideBottomBar"
                            checked={selectedRow?.hideBottomBar}
                        />
                    </div>
                </div>}
            />
            <Accordion title="Table & Interaction" id="tableInteraction" content={
                <div className="flex">
                    <div className={styles.leftContainer}>
                        <TextInput
                            label="Row alternate color"
                            size="medium"
                            name="rowAlternateColor"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "rowAlternateColor")}
                            value={selectedRow?.rowAlternateColor}
                        />
                        <TextInput
                            label="Page size"
                            size="medium"
                            name="pageSize"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "pageSize", InputType.NonNullableNumber)}
                            type="number"
                            value={selectedRow?.pageSize.toString() == null ? "" : selectedRow?.pageSize?.toString()}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "disableGridEditing")}
                            name={"disableGridEditing"}
                            label="Disable grid editing"
                            id="disableGridEditing"
                            checked={selectedRow?.disableGridEditing}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "singleClickToEdit")}
                            name={"singleClickToEdit"}
                            label="Single click to edit"
                            id="singleClickToEdit"
                            checked={selectedRow?.singleClickToEdit}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "allowLocalFiltering")}
                            name={"allowLocalFiltering"}
                            label="Allow local filtering"
                            id="allowLocalFiltering"
                            checked={selectedRow?.allowLocalFiltering}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showSummary")}
                            name={"showSummary"}
                            label="Show summary row"
                            id="showSummary"
                            checked={selectedRow?.showSummary}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "splitCharts")}
                            name={"splitCharts"}
                            label="Split charts"
                            id="splitCharts"
                            checked={selectedRow?.splitCharts}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showSortButton")}
                            name={"showSortButton"}
                            label="Show sort button"
                            id="showSortButton"
                            checked={selectedRow?.showSortButton}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showChartButton")}
                            name={"showChartButton"}
                            label="Show charts button"
                            id="showChartButton"
                            checked={selectedRow?.showChartButton}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showInViewChangeCombo")}
                            name={"showInViewChangeCombo"}
                            label="Show in view change combo"
                            id="showInViewChangeCombo"
                            checked={selectedRow?.showInViewChangeCombo}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "filterAvailableInitially")}
                            name={"filterAvailableInitially"}
                            label="Filter available initially"
                            id="filterAvailableInitially"
                            checked={selectedRow?.filterAvailableInitially}
                        />
                    </div>
                </div>}
            />
            <Accordion title="Data Management & Tools" id="dataManagmentTools" content={
                <div className="flex">
                    <div className={styles.leftContainer}>
                        <Select
                            id="historyLogViewMode"
                            values={historyLogViewOptions}
                            label="History Log View Options"
                            labelField="label"
                            valueField="value"
                            name="historyLogViewMode"
                            handleChange={(value: string) => handleInputChange(value, "historyLogViewMode")}
                            value={selectedRow?.historyLogViewMode.toString()}
                        />
                        <TextInput
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "chunkCapacity", InputType.NullableNumber)}
                            name={"chunkCapacity"}
                            label="Import chunk row capacity"
                            size="medium"
                            type="number"
                            value={selectedRow?.chunkCapacity?.toString() == null ? "" : selectedRow?.chunkCapacity?.toString() }
                        />
                        <TextInput
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "exportHeaderBgColor")}
                            name={"exportHeaderBgColor"}
                            label="Export header background color"
                            size="medium"
                            value={selectedRow?.exportHeaderBgColor}
                        />
                        <TextInput
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "exportHeaderTextColor")}
                            name={"exportHeaderTextColor"}
                            label="Export header text color"
                            size="medium"
                            value={selectedRow?.exportHeaderTextColor}
                        />
                        {/* //select olacak
                        <TextInput
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value, "allowSavingViewState")}
                            name={"helpID"}
                            label="Help Content"
                            size="medium"
                        /> */}
                        <Select
                            id="exportMode"
                            values={exportModeOptions}
                            label="Export mode"
                            labelField="label"
                            valueField="value"
                            name="exportMode"
                            handleChange={(value: string) => handleInputChange(value, "exportMode")}
                            value={selectedRow?.exportMode.toString()}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                    </div>
                </div>}
            />
            <Accordion title="Button Labels" id="buttonLabels" content={
                <div className="flex">
                    <div>
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showRecordHistoryButtonLabel")}
                            name={"showRecordHistoryButtonLabel"}
                            label="Show record history button label"
                            id="showRecordHistoryButtonLabel"
                            checked={selectedRow?.showRecordHistoryButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showBulkUpdateButtonLabel")}
                            name={"showBulkUpdateButtonLabel"}
                            label="Show bulk update button label"
                            id="showBulkUpdateButtonLabel"
                            checked={selectedRow?.showBulkUpdateButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showRefreshButtonLabel")}
                            name={"showRefreshButtonLabel"}
                            label="Show refresh button label"
                            id="showRefreshButtonLabel"
                            checked={selectedRow?.showRefreshButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showFilterButtonLabel")}
                            name={"showFilterButtonLabel"}
                            label="Show filter button label"
                            id="showFilterButtonLabel"
                            checked={selectedRow?.showFilterButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showImportExportButtonLabel")}
                            name={"showImportExportButtonLabel"}
                            label="Show import/export button label"
                            id="showImportExportButtonLabel"
                            checked={selectedRow?.showImportExportButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showChartsButtonLabel")}
                            name={"showChartsButtonLabel"}
                            label="Show charts button label"
                            id="showChartsButtonLabel"
                            checked={selectedRow?.showChartsButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showHelpButtonLabel")}
                            name={"showHelpButtonLabel"}
                            label="Show help button label"
                            id="showHelpButtonLabel"
                            checked={selectedRow?.showHelpButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showSortButtonLabel")}
                            name={"showSortButtonLabel"}
                            label="Show sort button label"
                            id="showSortButtonLabel"
                            checked={selectedRow?.showSortButtonLabel}
                        />
                        <Toggle
                            onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleInputChange(checked, "showCalendarButtonLabel")}
                            name={"showCalendarButtonLabel"}
                            label="Show calendar button label"
                            id="showCalendarButtonLabel"
                            checked={selectedRow?.showCalendarButtonLabel}
                        />
                    </div>
                </div>}
            />
        </div>
    )
}

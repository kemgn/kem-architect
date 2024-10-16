import { ColumSummaryFunction, HistoryLogPlacementMode } from "../Enums/Enums";
import { RemoteFilter, RemoteFiltersPack } from "./RemoteFilter";
import { RemoteSort, RemoteSortPack } from "./RemoteSort";

export interface DataContract {
    id: string;
    createTime: Date;
    updateTime?: Date;
    dataContractReferenceId: string;
    dataContractUIProperties?: DataContractProperty[];
    systemName: string;
    parentDataContractId?: string;
    showSummary: boolean;
    chunkCapacity?: number;
    showInViewChangeCombo: boolean;
    showHelpButtonLabel: boolean;
    pageSize: number;
    usageScopeType: UsageScope;
    formUsage: FormUsage;
    exportMode: ExportMode;

    showSortButton: boolean;
    showChartButton: boolean;
    exportHeaderBgColor: string;
    exportHeaderTextColor: string;
    cellCssStyle: string;
    headerCssStyle: string;
    rowAlternateColor: string;
    allowSavingViewState: boolean;
    hideViewChangeCombo: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    hideTopBar: boolean;
    hideBottomBar: boolean;
    showRecordHistoryButtonLabel: boolean;
    showBulkUpdateButtonLabel: boolean;
    showRefreshButtonLabel: boolean;
    showFilterButtonLabel: boolean;
    showImportExportButtonLabel: boolean;
    showChartsButtonLabel: boolean;
    showSortButtonLabel: boolean;
    showCalendarButtonLabel: boolean;
    filterAvailableInitially: boolean;
    allowGettingDirectLink: boolean;
    allowGettingDirectLink_AllCharts: boolean;
    htmlHeaderMode: HtmlHeaderMode;

    showInstanceId: boolean;
    showDeleteButtonInTopBar: boolean;
    showDeleteCommandInGridCommands: boolean;
    disableGridEditing: boolean;
    singleClickToEdit: boolean;
    iconPath: string;
    hideHeaders: boolean;
    allowLocalFiltering: boolean;
    bigIconPath: string;
    splitCharts: boolean;
    historyLogViewMode: HistoryLogViewMode;

    remoteFilterUIs?: RemoteFilter[];
    remoteSortUIs?: RemoteSort[];

    labels: Label[];
    
    defaultDisplayPropertyId?: string;
    historyLogPlacementMode: HistoryLogPlacementMode;
    isMaximized: boolean;
    isMaximizable: boolean;

    allowWindowResize: boolean;
    showInGridCommands: boolean;
    showInBarCommands: boolean;
    showInBarCommandGroup: boolean;
    showInGridContextMenu: boolean;
    hideInitially: boolean;
    hideFromMainView: boolean;
    allowDownloadingPDF: boolean;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeigh?: number;
    width?: number;
    maxHeigh?: number;
    htmlLabelColumnWidthPercentage: number;
    pdfLandscapePageOrientation: boolean;
}
export interface DataContractProperty {

}
export interface ViewProperty {
    id: string;
    createTime: Date;
    visibility: Visibility;
    colIndex: number;
    updateTime?: Date;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: number;
    wrapText?: boolean;
    showListOptionDescriptions: boolean;
    menuDisabled: boolean;
    showValueSummary: boolean;
    summarizeAfter: number;
    showDescriptions: boolean;
    showSummaryFunctionText: boolean;
    delimeter: string;
    trimText: boolean;
    cellCssStyle: string;
    headerCssStyle: string;
    preloadOptions: boolean;
    sortable: boolean;
    refreshPageAfterEdit: boolean;
    dataContractPropertyReferenceId: string;
    displayPlainValueOnFormIfReadonly: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    isReadonly: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    updatePermissions: number;
    createPermissions: number;
    bulkUpdatePermissions: number;
    summaryFunction: number;
    exportMode: ViewPropertyExportModeType;
    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    prohibitSetValueByLinking: boolean;
    columnSummaryFunction: ColumSummaryFunction;

}
export interface FormProperty {
    rowIndex: number;
    showListOptionDescriptions: boolean;
    showDescriptionNote: boolean;
    disableSearch: boolean;
    id: string;
    createTime: Date;
    updateTime?: Date;
    prohibitSetValueByLinking: boolean;
    updatePermissions: number;
    createPermissions: number;
    inheritConditionalFormatters: boolean;
    formSectionGroupID: string;
    formSectionFarmID: string;
    formID: string;
    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    editorMinHeight?: number;
    editorMaxHeight?: number;
    chatHistoryEditorMinHeight?: number;
    chatHistoryEditorMaxHeight?: number;
    chatHistoryEditorHeight: number;
    formSectionItemID: number;
    oLShowDetailedSearchTrigger: boolean;
    hideIfEmptyAndNotEditable: boolean;
    oLMaximizeDetailedSearchWindow: boolean;
    editorResizeMode: EditorResizeMode;
    showSimpleMultiOLForms: boolean;
    chatHistoryEditorIsResizable: boolean;
    dataContractPropertyReferenceId: string;
    displayPlainValueOnFormIfReadonly: boolean;
    helpID: string;
    helpItemID: string;
    showDescriptionTooltip: boolean;
    showEmptyText: boolean;
    helpNavigationPreference: number;
    isReadonly: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    editorHeight: number;
    showDescriptions: boolean;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    hideFieldLabel: boolean;
}
//-----------


export interface DataContractForCreate {
    systemName: string;
    parentDataContractId?: string;
    chunkCapacity?: number;
    showSummary: boolean;
    showInViewChangeCombo: boolean;
    showHelpButtonLabel: boolean;
    pageSize: number;
    usageScopeType: UsageScope;
    exportMode: ExportMode;
    showSortButton: boolean;
    showChartButton: boolean;
    exportHeaderBgColor: string;
    exportHeaderTextColor: string;
    cellCssStyle: string;
    headerCssStyle: string;
    rowAlternateColor: string;
    allowSavingViewState: boolean;
    hideViewChangeCombo: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    hideTopBar: boolean;
    hideBottomBar: boolean;
    showRecordHistoryButtonLabel: boolean;
    showBulkUpdateButtonLabel: boolean;
    showRefreshButtonLabel: boolean;
    showFilterButtonLabel: boolean;
    showImportExportButtonLabel: boolean;
    showChartsButtonLabel: boolean;
    showSortButtonLabel: boolean;
    showCalendarButtonLabel: boolean;
    filterAvailableInitially: boolean;
    allowGettingDirectLink: boolean;
    allowGettingDirectLink_AllCharts: boolean;
    htmlHeaderMode: HtmlHeaderMode;
    dataContractUIProperties?: DataContractPropertyForCreate[];

    showInstanceId: boolean;
    showDeleteButtonInTopBar: boolean;
    showDeleteCommandInGridCommands: boolean;
    disableGridEditing: boolean;
    singleClickToEdit: boolean;
    iconPath: string;
    hideHeaders: boolean;
    allowLocalFiltering: boolean;
    bigIconPath: string;
    splitCharts: boolean;
    historyLogViewMode: HistoryLogViewMode;

    remoteFilters?: RemoteFilter[];
    remoteSorts?: RemoteSort[];
    labels: LabelForCreate[];

    defaultDisplayPropertyId?: string;
    historyLogPlacementMode: HistoryLogPlacementMode;
    isMaximized: boolean;
    isMaximizable: boolean;

    allowWindowResize: boolean;
    showInGridCommands: boolean;
    showInBarCommands: boolean;
    showInBarCommandGroup: boolean;
    showInGridContextMenu: boolean;
    hideInitially: boolean;
    hideFromMainView: boolean;
    allowDownloadingPDF: boolean;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeigh?: number;
    maxHeigh?: number;
    formUsage: FormUsage;
    width?: number;
    htmlLabelColumnWidthPercentage: number;
    pdfLandscapePageOrientation: boolean;
}
export interface DataContractPropertyForCreate {
}
export interface ViewPropertyForCreate extends DataContractPropertyForCreate {
    displayPlainValueOnFormIfReadonly: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    isReadonly: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    visibility: Visibility;
    colIndex: number;
    width?: number | null;
    minWidth?: number;
    maxWidth?: number;
    flex?: number;
    wrapText?: boolean;
    showListOptionDescriptions: boolean;
    menuDisabled: boolean;
    showValueSummary: boolean;
    summarizeAfter?: number;
    showDescriptions: boolean;
    showSummaryFunctionText: boolean;
    delimeter?: string;
    trimText: boolean;
    cellCssStyle: string;
    headerCssStyle: string;
    preloadOptions: boolean;
    sortable: boolean;
    refreshPageAfterEdit: boolean;


    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    prohibitSetValueByLinking: boolean;
    updatePermissions: number;
    createPermissions: number;
    bulkUpdatePermissions: number;
    summaryFunction: number;
    columnSummaryFunction: ColumSummaryFunction;
}
export interface FormPropertyForCreate extends DataContractPropertyForCreate {
    showDescriptionNote: boolean;
    displayPlainValueOnFormIfReadonly: boolean;
    rowIndex: number;
    showListOptionDescriptions: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    hideFieldLabel: boolean;
    isReadonly: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    chatHistoryEditorHeight: number | null;
    formSectionItemID: number;
    oLShowDetailedSearchTrigger: boolean;
    hideIfEmptyAndNotEditable: boolean;
    oLMaximizeDetailedSearchWindow: boolean;
    editorMinHeight?: number | null;
    editorMaxHeight?: number | null;
    chatHistoryEditorMinHeight?: number | null;
    chatHistoryEditorMaxHeight?: number | null;
    editorResizeMode: EditorResizeMode
    showSimpleMultiOLForms: boolean;
    chatHistoryEditorIsResizable: boolean;
    showEmptyText: boolean;

    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    prohibitSetValueByLinking: boolean;
    labels: LabelForCreate[];
    updatePermissions: number;
    createPermissions: number;
    inheritConditionalFormatters: boolean;
    formSectionGroupID: string;
    showDescriptions: boolean;
    formSectionFarmID: string;
    showDescriptionTooltip: boolean;
    editorHeight: number | null;
    formSectionID: string;
}
//-----------


export interface DataContractForUpdate {
    id: string;
    parentDataContractId?: string;
    showSummary: boolean;//
    chunkCapacity?: number;//
    showInViewChangeCombo: boolean;//
    showHelpButtonLabel: boolean;//
    pageSize: number;//
    usageScopeType: UsageScope;//
    exportMode: ExportMode;//
    showSortButton: boolean;//
    showChartButton: boolean;//
    exportHeaderBgColor: string;//
    exportHeaderTextColor: string;//
    cellCssStyle: string;//
    headerCssStyle: string;//
    rowAlternateColor: string;//
    allowSavingViewState: boolean;//
    hideViewChangeCombo: boolean;//
    helpID: string;//
    helpItemID: string;
    helpNavigationPreference: number;
    hideTopBar: boolean;//
    hideBottomBar: boolean;//
    showRecordHistoryButtonLabel: boolean;//
    showBulkUpdateButtonLabel: boolean;//
    showRefreshButtonLabel: boolean;//
    showFilterButtonLabel: boolean;//
    showImportExportButtonLabel: boolean;//
    showChartsButtonLabel: boolean;//
    showSortButtonLabel: boolean;//    
    showCalendarButtonLabel: boolean;//

    filterAvailableInitially: boolean;//
    allowGettingDirectLink: boolean;
    allowGettingDirectLink_AllCharts: boolean;
    htmlHeaderMode: HtmlHeaderMode;//
    dataContractUIProperties?: DataContractPropertyForUpdate;

    showInstanceId: boolean;//
    showDeleteButtonInTopBar: boolean;//
    showDeleteCommandInGridCommands: boolean;//
    disableGridEditing: boolean;//
    singleClickToEdit: boolean;//
    iconPath: string;
    hideHeaders: boolean;//
    allowLocalFiltering: boolean;//
    bigIconPath: string;
    splitCharts: boolean;//
    historyLogViewMode: HistoryLogViewMode;//

    remoteFilters?: RemoteFiltersPack;
    defaultDisplayPropertyId?: string;
    remoteSorts?: RemoteSortPack;
    labels?: LabelUpdated;
    
    historyLogPlacementMode: HistoryLogPlacementMode;
    isMaximized: boolean;
    isMaximizable: boolean;

    allowWindowResize: boolean;
    showInGridCommands: boolean;
    showInBarCommands: boolean;
    showInBarCommandGroup: boolean;
    showInGridContextMenu: boolean;
    hideInitially: boolean;
    hideFromMainView: boolean;
    allowDownloadingPDF: boolean;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    width?: number;
    maxHeight?: number;
    formUsage: FormUsage;
    htmlLabelColumnWidthPercentage: number;
    pdfLandscapePageOrientation: boolean;
}
export interface DataContractPropertyForUpdate {

}
export interface ViewPropertyForUpdate {
    displayPlainValueOnFormIfReadonly: boolean;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    isReadonly: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    visibility: Visibility;
    colIndex: number;
    width: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: number;
    wrapText?: boolean;
    showListOptionDescriptions: boolean;
    menuDisabled: boolean;
    showValueSummary: boolean;
    summarizeAfter: number;
    showDescriptions: boolean;
    showSummaryFunctionText: boolean;
    delimeter: string;
    trimText: boolean;
    cellCssStyle: string;
    headerCssStyle: string;
    preloadOptions: boolean;
    sortable: boolean;
    refreshPageAfterEdit: boolean;

    id: string;
    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    prohibitSetValueByLinking: boolean;
    updatePermissions: number;
    createPermissions: number;
    bulkUpdatePermissions: number;
    summaryFunction: number;
    labels: LabelUpdated;
    exportMode: ViewPropertyExportModeType;

    columnSummaryFunction: ColumSummaryFunction;

}
export interface FormPropertyForUpdate {
    showEmptyText: boolean;
    disableSearch: boolean;
    showListOptionDescriptions: boolean;
    displayPlainValueOnFormIfReadonly: boolean;
    rowIndex: number;
    helpID: string;
    helpItemID: string;
    helpNavigationPreference: number;
    isReadonly: boolean;
    hideFieldLabel: boolean;
    fileAccessConfigurationMode: FileAccessConfigurationMode;
    htmlShowMode: HtmlShowMode;
    htmlDisplayMode: HtmlDisplayMode;
    chatHistoryEditorHeight: number | null;
    formSectionItemID: number;
    oLShowDetailedSearchTrigger: boolean;
    hideIfEmptyAndNotEditable: boolean;
    oLMaximizeDetailedSearchWindow: boolean;
    editorMinHeight?: number;
    editorMaxHeight?: number;
    chatHistoryEditorMinHeight?: number;
    chatHistoryEditorMaxHeight?: number;
    editorResizeMode: EditorResizeMode;
    showSimpleMultiOLForms: boolean;
    chatHistoryEditorIsResizable: boolean;
    showDescriptions: boolean;
    editorHeight: number;

    id: string;
    propertyId: string;
    searchAllOnEmptyValueClick: boolean;
    inheritFromModuleProperty: boolean;
    prohibitSetValueByLinking: boolean;
    label: boolean;
    updatePermissions: boolean;
    createPermissions: boolean;
    inheritConditionalFormatters: boolean;
    formSectionGroupID: boolean;
    formSectionFarmID: boolean;
    formSectionID: boolean;
    showDescriptionNote: boolean;
    showDescriptionTooltip: boolean;
}
//-----------

export interface DataContractForDelete {
    id: string;
}



export enum ExportMode {
    SyncDownload = 0,
    AsyncTask = 1,
}
export enum HtmlHeaderMode {
    DoNotRepeat = 0,
    RepeateForEachRecord = 1,
    RepeatIfDisplayingRowValues = 2,
}
export enum FileAccessConfigurationMode {
    PreviewDeny_DownloadAllow = 0,
    PreviewAllow_DownloadDeny = 1,
    PreviewAllow_DownloadOnFailure = 2,
    PreviewAllow_DownloadAllow = 3,
    Inherit = 4,
}
export enum EditorResizeMode {
    NotResizable = 0,
    Resizable = 1,
    Grow = 2,
}
export enum Visibility {
    Show = 0,
    Hidden = 1,
    InVisible = 2,
}
export enum HtmlDisplayMode {
    Default = 0,
    CombineLabelAndValue = 1,
}
export enum HtmlShowMode {
    ShowAlways = 0,
    HideIfEmpty = 1,
    HideAlways = 2,
}
export enum UsageScope {
    MainGrid = 1,
    ObjectLink = 2,
    None = 0,
    All = 3,
}

export enum ViewPropertyExportModeType {
    Inherit = 0,
    NeverExport = 1,
    AlwaysExport = 2,
}

export enum HistoryLogViewMode {
    Standard = 0,
    TimeFlow = 1,
}

export enum Required {
    Passive = 0,
    SaveAndformTime = 1,
    FormTimeOnly = 2,
}
export enum FormUsage{
    Readonly = 0,
    Create = 1,
    Edit = 2,
}


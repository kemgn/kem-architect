import { IgnoreDisabledUsers, RenderStyle, SelectionPreference, SortOptionsBy } from "../Enums/Enums";
import { FileAccessConfigurationMode } from "./DataContract";

export interface Property {
    id: string;
    labels?: Label[];
    systemName: string;
    isSystem?: boolean;
    isCustomizable?: boolean;
    isSchema?: boolean;
    isVirtual?: boolean;
    isLabelsCustomizable?: boolean;
    isUnique?: boolean;
    isFormula?: boolean;
    keepHistory?: boolean;
    type: PropertyType;
    propertyReferenceId: string;
}

export interface PropertyForCreate {
    labels?: LabelForCreate[];
    systemName: string;
    isSystem?: boolean;
    isCustomizable?: boolean;
    isSchema?: boolean;
    isVirtual?: boolean;
    isLabelsCustomizable?: boolean;
    isUnique?: boolean;
    isFormula?: boolean;
    keepHistory?: boolean;
}

export interface PropertyForUpdate {
    id: string;
    labels?: LabelUpdated[];
    systemName: string;
    isSystem?: boolean;
    isCustomizable?: boolean;
    isSchema?: boolean;
    isVirtual?: boolean;
    isLabelsCustomizable?: boolean;
    isUnique?: boolean;
    isFormula?: boolean;
    keepHistory?: boolean;
}

export interface PropertyForDelete {
    id: string;
}
export enum StringType {
    SingleLine,
    MultiLine,
    RichText,
    Markdown
}
export enum InputMaskType {
    None = 0,
    IPAddress = 1,
    Email = 2,
    Port = 3,
    Netmask = 4,
    Phone = 5,
    MaskedValue = 6,
}
export enum SubjectDisplayMode {
    DisplayName = 0,
    DisplayNameAndAccountName = 1,
    DisplayNameAndDomainAndAccountName = 2,
    DisplayNameAndEmail = 3
}
export enum SearchAttributesExecutionRuleType {
    IntersectResults = 0,
    CombineResults = 1,
    CascadeAttributeResults = 2,
}
export interface ListOptionDescription {
    optionID: string
    languageID: string
    label?: string
    description?: string
}
export interface DataLinkReportConfig {
    infix: string;
    postfix: string;
}
export interface PropertyForAutoComplete extends Property {
    moduleSystemName: string;
}
export interface PropertyForAutoCompleteForUpdate extends Property {
    moduleSystemName: string;
    preAppend: string;
    postAppend: string;
    minIndexLength: number;
    increment: number;
    currentIndex: number;
    autoCodeResetPeriod: AutoCodeResetPeriod;
    autoCodePeriodLocation: PeriodLocation;
}
export enum AutoCodeResetPeriod {
    DoNotReset,
    ResetDaily,
    ResetMonthly,
    ResetYearly,
}
export enum PeriodLocation {
    AfterPreappend,
    BeforePreappend,
    BeforePostappend,
    AfterPostappend,
}
export interface PropertyForBoolForCreate extends Property {
    trueLabels: LabelForCreate;
    falseLabels: LabelForCreate;
}
export interface PropertyForBool extends Property {
    trueLabels: Label[];
    falseLabels: Label[];
}
export interface PropertyForBoolForUpdate extends Property {
    trueLabels: LabelUpdated;
    falseLabels: LabelUpdated;
}
export interface PropertyForChatForCreate extends Property {

}

export interface PropertyForDataLinkForCreate extends Property {
    isMultiData: boolean;
    isReport: boolean;
    dataLinkReportConfig?: DataLinkReportConfig;
}
export interface PropertyForDataLinkForUpdate extends Property {
    isMultiData: boolean;
    isReport: boolean;
    dataLinkReportConfig?: DataLinkReportConfig;
    fileAccessConfigurationModeType: FileAccessConfigurationMode
}
export interface PropertyForDateTimeForCreate extends Property {
    isDateOnly: boolean;
    setCreateTime: boolean;
    setModifyTime: boolean;
    autoSetToday: boolean;
}

export interface PropertyForFloatForCreate extends Property {
    valueUnitId?: string;
    precision?: number;
    doNotUseThousandsSeperator: boolean;
}


export interface PropertyForFloatForUpdate extends Property {
    valueUnitId?: string;
    precision?: number;
    doNotUseThousandsSeperator: boolean;
}

export interface PropertyForIntegerForCreate extends Property {
    valueUnitId?: string;
    doNotUseThousandsSeperator: boolean;
}
export interface PropertyForIntegerForUpdate extends Property {
    valueUnitId?: string;
    doNotUseThousandsSeperator: boolean;
}

export interface PropertyForListForCreate extends Property {
    listRootID: string;
    isMultiSelect: boolean;
    bindToPropertyID?: string
    bindToValueID?: string
    autoSetValuesOnParentChange: boolean;
    sortOptionsBy: number;
    listOptionDescriptions?: ListOptionDescription[];
    hideLabels: boolean;
    showIcons: boolean;
    sortOptionsByInt: number;
    renderStyle: RenderStyle;
}
export interface PropertyForObjectLinkForCreate extends Property {
    isMultiSelect: boolean;
    moduleID: string;
    reverseIsMultiSelect: boolean;
    createReverseProperty: boolean;
    displayPropertyID: string;
    reverseConfigID?: string;
    bindToPropertyID?: string;
    matchToValueID?: string;
    bindToValueID?: string;
    extraRemoteFilterID?: string;
    defaultProfileID?: string;
    oLDisplayFilterID?: string;
    contractDisplayPropertyID: string;
    contractID: string;
    reverseContractID: string;
    reverseContractPropertyID: string;
    autoSetValuesOnParentChange: boolean;
    actAsOwner: boolean;
    fixToDefaultProfile: boolean;
    childsCohesive: boolean;
    prohibitSetValueByLinking: boolean;
    searchAllOnEmptyValueClick: boolean;
}

export interface PropertyForStringForCreate extends Property {
    stringType: StringType;
    inputMaskType: InputMaskType;
}
export interface PropertyForSubjectLinkForCreate extends Property {
    isUsersOnly?: boolean;
    isCreator: boolean;
    isModifier: boolean;
    extendedProperties?: string;
    displayMode: SubjectDisplayMode;
    activeDirectorySearchRoot?: string;
    searchByLDAPAttributes: boolean;
    searchAttributes?: string;
    searchAttributesExecutionRule: SearchAttributesExecutionRuleType;
    bindToPropertyID?: string;
    bindToValueID?: string;
    autoSetValuesOnParentChange: boolean;
    ignoreDisabledActiveDirectoryUsers?: boolean;
    userSearchFilterGroupID?: string;
    isMultiSelect: boolean;
    displayModeTypeInt: number;
}
export interface PropertyForTimeForCreate extends Property {
    isDuration: boolean;
}
export interface PropertyForTreeForCreate extends Property {
    treeRootID: string;
    treeRootParentNodeID?: string;
    isMultiSelect: boolean;
    isLinkedListSelect: boolean;
}
///UPDATE
export interface PropertyForTimeForUpdate extends Property {
    isDuration: boolean;
}
export interface PropertyForListForUpdate extends Property {
    id: string;
    listRootID: string;
    isMultiSelect: boolean;
    bindToPropertyID?: string
    bindToValueID?: string
    autoSetValuesOnParentChange: boolean;
    sortOptionsBy: number;
    listOptionDescriptions?: ListOptionDescription[];
    hideLabels: boolean;
    showIcons: boolean;
    sortOptionsByInt: SortOptionsBy;
    renderStyle: RenderStyle;
}
export interface PropertyForStringForUpdate extends Property {
    stringType: StringType;
    inputMaskType: InputMaskType;
}
export interface PropertyForTreeForUpdate extends Property {
    treeRootID: string;
    treeRootParentNodeID?: string;
    isMultiSelect: boolean;
    isLinkedListSelect: boolean;
}
export interface PropertyForSubjectLinkForUpdate extends Property {
    isUsersOnly?: SelectionPreference;
    isCreator: boolean;
    isModifier: boolean;
    extendedProperties?: string;
    displayModeType: SubjectDisplayMode;
    activeDirectorySearchRoot?: string;
    searchByLDAPAttributes: boolean;
    searchAttributes?: string;
    searchAttributesExecutionRule: SearchAttributesExecutionRuleType;
    bindToPropertyID?: string;
    bindToValueID?: string;
    autoSetValuesOnParentChange: boolean;
    ignoreDisabledActiveDirectoryUsers?: IgnoreDisabledUsers;
    userSearchFilterGroupID?: string;
    isMultiSelect: boolean;
    displayModeTypeInt: number;
}
export interface PropertyForObjectLinkForUpdate extends Property {
    isMultiSelect: boolean;
    moduleID: string;
    reverseIsMultiSelect: boolean;
    createReverseProperty: boolean;
    displayPropertyID: string;
    reverseConfigID?: string;
    bindToPropertyID?: string;
    matchToValueID?: string;
    bindToValueID?: string;
    extraRemoteFilterID?: string;
    defaultProfileID?: string;
    oLDisplayFilterID?: string;
    contractDisplayPropertyID: string;
    contractID: string;
    reverseContractID: string;
    reverseContractPropertyID: string;
    autoSetValuesOnParentChange: boolean;
    actAsOwner: boolean;
    fixToDefaultProfile: boolean;
    childsCohesive: boolean;
    prohibitSetValueByLinking: boolean;
    searchAllOnEmptyValueClick: boolean;
}
///

///
export enum PropertyType {
    AutoCode,
    Bool,
    Chat,
    DateTime,
    DataLink,
    Integer,
    Float,
    List,
    ObjectLink,
    Tree,
    Time,
    SubjectLink,
    String,
}

export enum OperatorEnum {
    Empty,
    NotEmpty,
    Equals,
    NotEquals,
    SmallerThan,
    EqualSmallerThan,
    BiggerThan,
    EqualBiggerThan,
}

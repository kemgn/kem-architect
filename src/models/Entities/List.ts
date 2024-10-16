import { SortOptionsBy } from "../Enums/Enums";

export interface ListRoot {
    id                  : string;
    createTime?         : Date;
    updateTime?         : Date;
    systemName          : string;
    isSystem            : boolean;
    isThresholdDuration : boolean;
    isCustomizable      : boolean;
    isExtendable        : boolean;
    isLabelCustomizable : boolean;
    sortOptionsByType   : SortOptionsBy;
    description?        : string;
    listOptions?        : ListOption[];
    labels?             : Label[];
    listReferenceId?    : string;

}
export interface ListRootForCreate {
    description?        : string;
    systemName          : string;
    isSystem            : boolean;
    isThresholdDuration : boolean;
    isCustomizable      : boolean;
    isExtendable        : boolean;
    isLabelCustomizable : boolean;
    sortOptionsByType?  : SortOptionsBy;
    labels?             : LabelForCreate[];
}
export interface ListRootForUpdate {
    id                  : string;
    listOptionUIs?      : ListOption[];
    description?        : string;
    isSystem            : boolean;
    isThresholdDuration : boolean;
    isCustomizable      : boolean;
    isExtendable        : boolean;
    isLabelCustomizable : boolean;
    isSchema?           : boolean;
    sortOptionsByType   : SortOptionsBy;
    labels?             : LabelUpdated;
}
export interface ListRootForDelete {
    id : string;
}
export interface ListOption {
    id                  : string;
    createTime?         : Date;
    updateTime?         : Date;
    systemName          : string;
    weight?             : number;
    maxThreshold?       : number;
    minThreshold?       : number;
    isCustomizable      : boolean;
    isLabelCustomizable : boolean;
    isSystem            : boolean;
    labels?             : Label[];
    listRootId          : string

    colorcode?          : string;
    lightColorcode?     : string;
    chartColorCode?     : string;
    darkColorcode?      : string;
    fontColor?          : string;
    iconPath?           : string;
    rowIndex            : number;
    listOptionRefId?    : string;
}
export interface ListOptionForCreate {
    lightColorcode?     : string;
    darkColorcode?      : string;
    iconPath?           : string;
    rowIndex            : number;
    chartColorCode?     : string;

    listRootId          : string
    systemName          : string;
    weight              : number;
    maxThreshold?       : number | null;
    minThreshold?       : number | null;
    isCustomizable      : boolean;
    isLabelCustomizable : boolean;
    isSystem            : boolean;
    labels?             : LabelForCreate[];
}
export interface ListOptionForUpdate {
    id                  : string;
    iconPath?           : string;
    rowIndex?           : number;
    chartColorCode?     : string;
    lightColorcode?     : string;
    darkColorcode?      : string;
    weight?             : number;
    maxThreshold?       : number;
    minThreshold?       : number;
    isCustomizable      : boolean;
    isLabelCustomizable : boolean;
    isSystem            : boolean;
    labels?             : LabelUpdated;

}
export interface ListOptionForDelete {
    id : string;
}



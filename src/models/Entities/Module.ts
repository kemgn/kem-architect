// import { Property, PropertyForTreeView } from "./Property";

import { Property, PropertyForCreate, PropertyForUpdate } from "./Property";



export interface Module {
    systemName: string;
    labels?: Label[];
    id: string;
    isSystem?: boolean;
    isCustomizable?: boolean;
    isLabelsCustomizable?: boolean;
    isExtendable?: boolean;
    unionUniqueProperties?: boolean;
    keepHistory?: boolean;
    properties?: Property[];
    createTime: Date;
}

export interface ModuleForCreate {
    systemName: string;
    labels: LabelForCreate[];
    isSystem: boolean;
    isCustomizable: boolean;
    isLabelsCustomizable: boolean;
    isExtendable: boolean;
    unionUniqueProperties: boolean;
    keepHistory: boolean;
    properties?: PropertyForCreate[];
}


export interface ModuleForUpdate {
    labels?: LabelUpdated;
    id: string;
    isSystem: boolean;
    isCustomizable: boolean;
    isLabelsCustomizable: boolean;
    isExtendable: boolean;
    unionUniqueProperties: boolean;
    keepHistory: boolean;
    propserties?: PropertyForUpdate[];
}
export interface ModuleForDelete {
    id: string;
}
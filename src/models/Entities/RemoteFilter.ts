export interface RemoteFilter {
    id: string;
    createTime: Date;
    updateTime?: Date;
    customLogic: string;
    systemName: string;
    isMandatory: boolean;
    labels?: Label[];
    showAsAvailableFilter: boolean;
    remoteFilterUItems: RemoteFilterItem[];
    remoteFilterReferenceId: string;
}
export interface RemoteFilterItem {
    id: string;
    createTime: Date;
    updateTime?: Date;
    identifier: number;
    operator: FilterCriteria;
    propertySystemName: string;
    propertyId: string;
    propertyValue?: unknown;
    infix?: string;
    postfix?: string;
    remoteFilterItemReferenceId: string;
}


export interface RemoteFilterForUpdate {
    id: string;
    customLogic: string;
    customLogicPostfix?: string;
    systemName: string;
    isMandatory: boolean;
    showAsAvailableFilter: boolean;
    labels: LabelUpdated;
    remoteFilterUIItems?: RemoteFilterItemsPack;
}
export interface RemoteFilterItemForUpdate {
    id: string;
    identifier: number;
    operator: FilterCriteria;
    propertySystemName: string;
    propertyId: string;
    propertyValue?: unknown;
    infix?: string;
    postfix?: string;
}


export interface RemoteFilterForCreate {
    customLogic: string;
    customLogicPostfix?: string;
    systemName: string;
    isMandatory: boolean;
    labels?: LabelForCreate[];
    showAsAvailableFilter: boolean;
    remoteFilterUIItems?: RemoteFilterItemForCreate;
}
export interface RemoteFilterItemForCreate {
    identifier: number;
    operator: FilterCriteria;
    propertySystemName: string;
    propertyId: string;
    propertyValue?: unknown;
    infix?: string;
    postfix?: string;
}


export interface RemoteFilterItemForDelete {
    id: string;
}
export interface RemoteFilterForDelete {
    id: string;
}

export interface RemoteFilterItemsPack {
    added: RemoteFilterItemForCreate[];
    updated: RemoteFilterItemForUpdate[];
    deleted: RemoteFilterItemForDelete[];
}
export interface RemoteFiltersPack {
    added: RemoteFilterForCreate[];
    updated: RemoteFilterForUpdate[];
    deleted: RemoteFilterForDelete[];
}
export enum FilterCriteria {
    Contains = 0,
    NotContains = 1,
    Equals = 2,
    NotEquals = 3,
    SmallerThan = 4,
    EqualSmallerThan = 5,
    BiggerThan = 6,
    EqualBiggerThan = 7,
    StartsWith = 8,
    EndsWith = 9,
    Empty = 10,
    NotEmpty = 11,
    NotFiltered = -1,
    IsCurrentUser = 12,
}
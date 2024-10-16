export interface RemoteSort {
    id: string;
    createTime: Date;
    updateTime?: Date;
    remoteSortReferenceId: string;
    systemName: string;
    isDefault: boolean;
    doGrouping: boolean;
    groupCountVisibility: boolean;
    remoteSortUIItems: RemoteSortItem[];
    labels: Label[];
}
export interface RemoteSortItem {
    id: string;
    createTime: Date;
    updateTime?: Date;
    remoteSortItemReferenceId: string;
    isDescending: boolean;
    itemIndex: number;
    propertyId: string;
    propertySystemName: string;
    sortOnLabel: boolean;
}

export interface RemoteSortForUpdate {
    id: string;
    systemName: string;
    isDefault: boolean;
    doGrouping: boolean;
    groupCountVisibility: boolean;
    labels?: LabelUpdated;
    remoteSortUIItems?: RemoteSortItemsPack;
}

export interface RemoteSortItemForUpdate {
    id: string;
    isDescending: boolean;
    itemIndex: number;
    propertyId: string;
    propertySystemName: string;
    sortOnLabel: boolean;
}

export interface RemoteSortForCreate {
    systemName: string;
    isDefault: boolean;
    doGrouping: boolean;
    groupCountVisibility: boolean;
    labels?: LabelForCreate[];
    remoteSortUIItems?: RemoteSortItemForCreate[];
}

export interface RemoteSortItemForCreate {
    isDescending: boolean;
    itemIndex: number;
    propertyId: string;
    propertySystemName: string;
    sortOnLabel: boolean;
}

export interface RemoteSortItemForDelete {
    id: string;
}
export interface RemoteSortForDelete {
    id: string;
}

export interface RemoteSortItemsPack {
    added: RemoteSortItemForCreate[];
    updated: RemoteSortItemForUpdate[];
    deleted: RemoteSortItemForDelete[];
}

export interface RemoteSortPack {
    added: RemoteSortForCreate[];
    updated: RemoteSortForUpdate[];
    deleted: RemoteSortForDelete[];
}
import { GroupMemberType, SubjectSources } from "../Enums/Enums";
import { MemberForsave } from "./Profile";
import { SubjectTypes } from "./Subject";

export interface Group {
    id: string;
    groupReferenceId?: string;
    systemName: string;
    createTime?: Date;
    updateTime?: Date;
    gMemberUIs?: GroupMember[];
    labels?: Label[];
}
export interface GroupForCreate {
    gMemberUIs?: GroupMemberForCreate[];
    systemName: string;
    labels?: LabelForCreate[];
}
export interface GroupForUpdate {
    id: string;
    systemName: string;
    gMemberUIs?: MemberForsave;
    groupReferenceId?: string;
    labels?: LabelUpdated;
}
export interface GroupForDelete {
    id: string;
}

export interface GroupUpdated {
    added?: GroupMemberForCreate[];
    updated?: GroupMemberForUpdate[];
    deleted?: GroupMemberForDelete[];
}

export interface GroupMember {
    memberType: GroupMemberType;
    id?: string;
    createTime?: Date;
    updateTime?: Date;
}
export interface GroupMemberForCreate {
    id?: string;
    memberTypeInt: GroupMemberType;
}
export interface GroupMemberForUpdate {
    id?: string;
    memberTypeInt: GroupMemberType;
}
export interface GroupMemberForDelete {
    id?: string;
}

export interface GroupForDisplay {
    id: string;
    systemName?: string;
    isSystem?: boolean;
    gMemberUIs?: GroupMemberForDisplay[];
    labels?: Label[];
}

export interface GroupMemberForDisplay {
    id                 : string;
    // createTime         : string;
    // updateTime         : string;
    // pMemberReferenceId : string;
    displayName        : string;
    memberType         : GroupMemberType;
    domainName         : string;
    types              : SubjectTypes;
    gMemberReferenceId : string;
    source: SubjectSources;
}



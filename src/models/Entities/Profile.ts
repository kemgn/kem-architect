import { GroupMemberType, ProfileMemberType, SubjectSources, SubjectTypes } from "../Enums/Enums";

export interface Profile {
    id: string;
    systemName?: string;
    isSystem?: boolean;
    pMemberUIs?: ProfileMember[];
    labels?: Label[];
    profileReferenceId?: string;
}
export interface ProfileForCreate {
    systemName?: string;
    isSystem?: boolean;
    pMemberUIs?: ProfileMember[];
    labels?: LabelForCreate[];
}
export interface ProfileForUpdate {
    id: string;
    systemName?: string;
    isSystem?: boolean;
    pMemberUIs?: MemberForsave;
    labels?: LabelUpdated;
}

export interface MemberForsave {
    added?: MemberForTable[];
    updated?: MemberForTable[];
    deleted?: MemberForTable[];
}

export interface ProfileForDelete {
    id: string;
}



export interface ProfileMember {
    id: string;
    memberTypeInt?: ProfileMemberType | GroupMemberType;
}
export interface MemberForTable extends ProfileMember {
    displayName: string;
    domainName?: string;
    referenceId: string;
    sourceMemberType: SubjectTypes;
    sources: SubjectSources;
    isUser:boolean;
    groupReferenceId?: string;
}



export interface ProfileForDisplay {
    id: string;
    systemName?: string;
    isSystem?: boolean;
    pMemberUIs?: ProfileMemberForDisplay[];
    labels?: Label[];
}

export interface ProfileMemberForDisplay {
    id                 : string;
    // createTime         : string;
    // updateTime         : string;
    // pMemberReferenceId : string;
    displayName        : string;
    memberType         : ProfileMemberType;
    domainName         : string;
    types              : SubjectTypes;
    pMemberReferenceId : string;
    source: SubjectSources;
}